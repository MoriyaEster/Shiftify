import React, { useEffect, useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import heLocale from '@fullcalendar/core/locales/he';
import { Header } from './Header';
import { useUser } from '/src/UserContext.jsx';
import UserConnectionChecker from './UserConnectionChecker';
import axios from 'axios';
import * as links from '/src/axios-handler.jsx';
import Button from '@mui/material/Button';
import emailjs from 'emailjs-com';
import { ModelPopUp } from './ModelPopUp';

export const ApprovedShift = () => {
  // save userID
  const { handleUserId, handleWorkPlace, handleUserEmail, handleUserName } = useUser();
  const [userID, setUserID] = useState(handleUserId());
  const [WorkPlace, setWorkPlace] = useState(handleWorkPlace());
  const [userEmail, setUserEmail] = useState(handleUserEmail());
  const [userName, setUserName] = useState(handleUserName());
  const [events, setEvents] = useState([]);

  //popup
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(null);
  const [contentPOPUP, setContentPOPUP] = useState(null);

  const handeljson = (jsondata) => {
    const formattedArray = jsondata.map((event) => ({
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
      date: event.date,
      type: event.type,
      userID: event.username,
      workPlace: event.workplace,
    }));
    setEvents(formattedArray);
    console.log("events from json: ", formattedArray);
    console.log("events: ", events);
  }

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const response = await axios.get(links.url_approved_shifts + `?userID=${userID}&WorkPlace=${WorkPlace}`);
        console.log("response:", response);
        if (response.status === 200) {
          console.log("Data fetched successfully:", response.data);
          handeljson(response.data.docs);
        } else {
          console.error(`Unexpected status code: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching user events:', error);
      }
    };
    fetchUserEvents();
  }, [userID]);

  const handleSendMail = async () => {
    const formattedEvents = events
  .filter((event) => {
    const eventDate = new Date(event.date);
    const currentDate = new Date();
    return (
      eventDate.getMonth() === currentDate.getMonth() &&
      eventDate.getFullYear() === currentDate.getFullYear()
    );
  })
  .map((event) => ({
    date: event.date,
    type: event.type,
    start: event.start.toLocaleTimeString(),
    end: event.end.toLocaleTimeString(),
    workPlace: event.workPlace,
  }));

let eventsHTML;
if (formattedEvents.length > 0) {
  eventsHTML = `
    <table border="1">
      <tr>
        <th>Date</th>
        <th>Type</th>
        <th>Start</th>
        <th>End</th>
        <th>Workplace</th>
      </tr>
      ${formattedEvents
        .map(
          (event) => `
            <tr>
              <td>${event.date}</td>
              <td>${event.type}</td>
              <td>${event.start}</td>
              <td>${event.end}</td>
              <td>${event.workPlace}</td>
            </tr>
          `
        )
        .join('')}
    </table>`;
} else {
  eventsHTML = 'There are no shifts this month.';
}
    console.log('formattedEvents:', formattedEvents);
    try {
      const response = await emailjs.send(
        'service_g8ko9ga', 
        'template_uvs2lzw', 
        {
          to_email: userEmail,
          subject: 'משמרות חודשיות',
          userName: userName,
          eventsHTML: eventsHTML,
        },
        'iJnFNnGWJKF7hbMSK'
      );

      console.log('Email sent successfully:', response);
      if(response.status === 200)
        {
          setStatus(200);
          setContentPOPUP("המשמרות נשלחו בהצלחה");
          setShowModal(true);
        }
    } catch (error) {
      console.error('Error sending email:', error);
        setStatus(500);
        setContentPOPUP("תקלה בהגשת משמרות");
        setShowModal(true);
    }

    console.log("Sending email to:", userEmail);
  };

  const handleGoogleCalendar = () => {
    if (userEmail.endsWith('@gmail.com')) {
      console.log("Connecting events to Google Calendar");
    } else {
      console.log("User does not have a Gmail address");
    }
  };

  return (
    <div>
      <Header />
      <UserConnectionChecker />
      <h1>משמרות מאושרות</h1>
      <h4>{WorkPlace} :מקום העבודה הנבחר </h4>
      <Button
        color="primary"
        variant="contained"
        onClick={handleSendMail}
      > שתף עם המייל (gmail)</Button>
      <Button
        color="primary"
        variant="contained"
        onClick={handleGoogleCalendar}
      > שתף עם יומן גוגל</Button>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"timeGridWeek"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"70vh"}
        locales={[heLocale]}
        locale="he"
        events={events}
        eventContent={({ event }) => (
          <>
            <div style={{ fontSize: '12px' }} dangerouslySetInnerHTML={{ __html: event.title }}></div>
          </>
        )}
      />
      <ModelPopUp show={showModal} onClose={() => setShowModal(false)} status={status} content={contentPOPUP}/>
    </div>
  );
};

export default ApprovedShift;
