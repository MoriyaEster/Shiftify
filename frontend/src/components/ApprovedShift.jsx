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
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';

export const ApprovedShift = () => {
  // save userID
  const { handleUserId, handleWorkPlace, handleUserEmail, handleUserName } = useUser();
  const [userID, setUserID] = useState("");
  const [WorkPlace, setWorkPlace] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
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
    const fetchData = async () => {
      setUserID(handleUserId());
      setUserEmail(handleUserEmail());
      setUserName(handleUserName());
      setWorkPlace(handleWorkPlace());
    };
    fetchData();
    const fetchUserEvents = async () => {
      try {
        if(userID != null){
        const response = await axios.get(links.url_approved_shifts + `?userID=${userID}&WorkPlace=${WorkPlace}`);
        console.log("response:", response);
        if (response.status === 200) {
          console.log("Data fetched successfully:", response.data);
          handeljson(response.data.docs);
        } else {
          console.error(`Unexpected status code: ${response.status}`);
        }}
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

  const session = useSession(); // tokens, when session exists we have a user
  const supabase = useSupabaseClient(); // talk to supabase!
  const { isLoading } = useSessionContext();
  
  if(isLoading) {
    return <></>
  }
  
  // useEffect(() => {
  //   console.log('session:', session);
  //   console.log('supabase:', supabase);
  // }, [session, supabase]);

  const handleGoogleCalendar = async () => {
    if (userEmail.endsWith('@gmail.com')) {
      const googleCalendarEvents = events.map((event) => ({
        summary: event.title,
        start:  {
          'dateTime': event.start.toISOString(), // Date.toISOString() ->
          'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // America/Los_Angeles
        },
        end:  {
          'dateTime': event.end.toISOString(), // Date.toISOString() ->
          'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // America/Los_Angeles
        },
        description: `Type: ${event.type}\nWorkplace: ${event.workPlace}\nUserID: ${event.userID}`,
      }));
  
      try {
        await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
        method: "POST",
        headers: {
        'Authorization':'Bearer ' + session.provider_token // Access token for google
      },
      body: JSON.stringify(googleCalendarEvents)
      }).then((data) => {
        return data.json();
      }).then((data) => {
        console.log(data);
        alert("Event created, check your Google Calendar!");
      });
      } catch (error) {
        console.error('Error adding events to Google Calendar:', error);
      }
    } else {
      console.log("User does not have a Gmail address");
    }
  };

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar'
      }
    });
    if(error) {
      alert("Error logging in to Google provider with Supabase");
      console.log(error);
    }
  }

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
      > שתף עם המייל </Button>
      {/* <Button
        color="primary"
        variant="contained"
        onClick={handleGoogleCalendar}
      > שתף עם יומן גוגל</Button> */}
      {/* {session ?
      <></> 
      : 
      <button onClick={() => googleSignIn()}>Sign In With Google</button>
      } */}
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
