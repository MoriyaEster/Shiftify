import React, { useState, useEffect } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import heLocale from '@fullcalendar/core/locales/he';
import Button from '@mui/material/Button';
import { Header } from './Header';
import { useUser } from '/src/UserContext.jsx';
import { useNavigate } from 'react-router-dom';

const buttonClass = 'shift-button';

export const SelectShifts = () => {
  const { handleUserConnection } = useUser();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (handleUserConnection() === false) {
      // Redirect to /Registery
      navigate('/');
    }
  }, [handleUserConnection, navigate]);

  const calendarRef = React.createRef();

  const handleDateClick = (info) => {
    const { date } = info;
    if (date) {
      const formattedDate = changeDateFormat(date.toLocaleDateString('he-IL').replace(/\./g, '-'));
      setSelectedDate(formattedDate);
    }
  };

  const changeDateFormat = (date) => {
    const parts = date.split('-');
    const day = parts[0].padStart(2, '0');
    const month = parts[1].padStart(2, '0');
    const year = parts[2];
    return `${year}-${month}-${day}`;
  };

  const handleShiftSelection = (shift) => {
    if (!selectedDate) {
      console.error('Please select a date first.');
      return;
    }

    const existingEventIndex = events.findIndex(event => event.title.includes(selectedDate) && event.title.includes(shift));

    if (existingEventIndex !== -1) {
      const updatedEvents = [...events];
      updatedEvents.splice(existingEventIndex, 1);
      setEvents(updatedEvents);
    } else {
      const newEvent = {
        title: `${shift} Shift - ${selectedDate}`,
        start: `${selectedDate}T${shift === 'morning' ? '08:00:00' : shift === 'noon' ? '13:00:00' : '18:00:00'}`,
        end: `${selectedDate}T${shift === 'morning' ? '13:00:00' : shift === 'noon' ? '18:00:00' : '23:00:00'}`
      };
      setEvents(prevEvents => [...prevEvents, newEvent]);
    }
  };

  const handleShifts = () => {
    console.log("הגשת משמרות", events);
    //need to send to the backend the events
  };

  return (
    <div>
      <Header />
      <h1>בחירת משמרות</h1>
      <p>לחץ על תאריך רצוי ובחר זמינות עבור </p>
      <p> E-ערב , N-צהריים, M-בוקר </p>
      <p>(לחיצה על כפתור תוסיף משמרת ולחיצה נוספת תוריד משמרת)</p>
      <FullCalendar
        ref={calendarRef}
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
        dateClick={handleDateClick}
        events={events}
        dayCellContent={({ date }) => {
          const clickedDate = changeDateFormat(date.toLocaleDateString('he-IL').replace(/\./g, '-'));
          const today = new Date().toISOString().split('T')[0];
          return (
            <div>
              {(selectedDate === clickedDate) && (clickedDate >= today) && (
                <>
                  <button onClick={() => handleShiftSelection('morning')} className={`${buttonClass}`}>M</button>
                  <br />
                  <button onClick={() => handleShiftSelection('noon')} className={`${buttonClass}`}>N</button>
                  <br />
                  <button onClick={() => handleShiftSelection('evening')} className={`${buttonClass}`}>E</button>
                </>
              )}
            </div>
          );
        }}
      />
      <Button
        color="primary"
        variant="contained"
        onClick={handleShifts}
      > הגשת משמרות</Button>
    </div>
  );
};

export default SelectShifts;
