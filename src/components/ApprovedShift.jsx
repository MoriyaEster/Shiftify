import React, { Component, useEffect } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import heLocale from '@fullcalendar/core/locales/he';
import { Header } from './Header';
import { useUser } from '/src/UserContext.jsx';
import { useNavigate } from 'react-router-dom';

const buttonClass = 'shift-button';

export const ApprovedShift = () => {
  const { handleUserConnection } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (handleUserConnection() === false) {
      // Redirect to /Registery
      navigate('/');
    }
  }, [handleUserConnection, navigate]);

  //get events from backend!!!!
    //needs to be end:"2024-02-09T18:00:00" start:"2024-02-09T13:00:00" title:"noon Shift - 2024-02-09" 

  return (
    <div>
      <Header />
      <h1>משמרות מאושרות</h1>
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
        events={[]}
      />
    </div>
  );
};

export default ApprovedShift;
