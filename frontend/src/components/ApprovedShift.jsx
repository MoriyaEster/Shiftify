import React, { Component, useEffect, useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import heLocale from '@fullcalendar/core/locales/he';
import { Header } from './Header';
import { useUser } from '/src/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import UserConnectionChecker from './UserConnectionChecker';
import axios from 'axios';

const buttonClass = 'shift-button';

export const ApprovedShift = () => {

  //get events from backend!!!!
    //needs to be end:"2024-02-09T18:00:00" start:"2024-02-09T13:00:00" title:"noon Shift - 2024-02-09" 
  //save userID
  const { handleUserId ,handleWorkPlace } = useUser();
  const [userID, setUserID] = useState(handleUserId());
  const [WorkPlace, setWorkPlace] = useState(handleWorkPlace());
  const [events, setEvents] = useState([]);
  
  const handeljson = (jsondata) => {
    const eventsArray = JSON.parse(jsondata);
      // Modify the date format in the array
      const formattedArray = eventsArray.map((event) => ({
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
        date: event.date,
        type: event.type,
        userID: event.userID,
        workPlace: event.workPlace,
      }));
      setEvents(formattedArray);
      console.log("events from json: ", formattedArray);
      console.log("events: ", events);
  }

  //get  info from backend
  useEffect(() => {
    // Fetch events for the user
    const json  = '[{"title":"morning Shift - 2024-02-07","start":"2024-02-07T08:00:00","end":"2024-02-07T13:00:00","date":"2024-02-07","type":"morning","userID":"54335","WorkPlace":"Workplace 2"},{"title":"noon Shift - 2024-02-07","start":"2024-02-07T13:00:00","end":"2024-02-07T18:00:00","date":"2024-02-07","type":"noon","userID":"54335","WorkPlace":"Workplace 2"},{"title":"morning Shift - 2024-02-08","start":"2024-02-08T08:00:00","end":"2024-02-08T13:00:00","date":"2024-02-08","type":"morning","userID":"54335","WorkPlace":"Workplace 2"},{"title":"noon Shift - 2024-02-09","start":"2024-02-09T13:00:00","end":"2024-02-09T18:00:00","date":"2024-02-09","type":"noon","userID":"54335","WorkPlace":"Workplace 2"},{"title":"noon Shift - 2024-02-10","start":"2024-02-10T13:00:00","end":"2024-02-10T18:00:00","date":"2024-02-10","type":"noon","userID":"54335","WorkPlace":"Workplace 2"}]'
    handeljson(json);
    const fetchUserEvents = async () => {
      try {
        const apiUrl = `shifthify/api/ApprovedShift?userID=${userID}&WorkPlace=${WorkPlace}`;
        const response = await axios.get(apiUrl);
        console.log("response:", response);
        // setEvents(response.data.events);
        // handeljson(response.data.events);
        if (response.status === 200) {
          console.log("Data fetched successfully:", response.data);
          // Update state or perform other actions with the data
          // setEvents(response.data.events);
        } else {
          console.error(`Unexpected status code: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching user events:', error);
      }
    };
    // Call the fetchUserEvents function
    fetchUserEvents();
  }, [userID]);

  return (
    <div>
      <Header />
      <UserConnectionChecker />
      <h1>משמרות מאושרות</h1>
      <h4>{WorkPlace} :מקום העבודה הנבחר </h4>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"timeGridWeek"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"70vh"}
        //hebrew
        locales={[heLocale]}
        locale="he"
        events={events}
      />
    </div>
  );
};

export default ApprovedShift;
