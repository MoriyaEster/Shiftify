import React, { useState, useEffect } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import heLocale from '@fullcalendar/core/locales/he';
import Button from '@mui/material/Button';
import { Header } from './Header';
import { useUser } from '/src/UserContext.jsx';
import UserConnectionChecker from './UserConnectionChecker';
import axios from 'axios';

const buttonClass = 'shift-button';

export const SelectShifts = () => {
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  //save userID
  const { handleUserId } = useUser();
  const [userID, setUserID] = useState(handleUserId());
  
  // //get  info from backend
  // useEffect(() => {
  //   // Fetch events for the user
  //   const fetchUserEvents = async () => {
  //     try {
  //       const apiUrl = `shifthify/api/SelectShifts?userID=${userID}&type=0`;
  //       const response = await axios.get(apiUrl);
  //       console.log("response:", response);
  //       setEvents(response.data.events);
  //     } catch (error) {
  //       console.error('Error fetching user events:', error);
  //     }
  //   };
  //   // Call the fetchUserEvents function
  //   fetchUserEvents();
  //   console.log("userID", userID);
  // }, [userID]);


  const calendarRef = React.createRef();

  //to handle the click date on the calendar.
    //extracts the selected date and updates the state with it.
  const handleDateClick = (info) => {
    const { date } = info;
    if (date) {
      const formattedDate = changeDateFormat(date.toLocaleDateString('he-IL').replace(/\./g, '-'));
      setSelectedDate(formattedDate);
    }
  };

  //do date as YYYY-MM-DD in Isreal timezone
  const changeDateFormat = (date) => {
    const parts = date.split('-');
    const day = parts[0].padStart(2, '0');
    const month = parts[1].padStart(2, '0');
    const year = parts[2];
    return `${year}-${month}-${day}`;
  };

  //The shift parameter represents the type of shift (morning, noon, or evening) selected by the user.
  const handleShiftSelection = (shift) => {
    if (!selectedDate) {
      console.error('Please select a date first.');
      return;
    }
    // Check if the event already exists, and either add or remove it
    const existingEventIndex = events.findIndex(event => event.title.includes(selectedDate) && event.title.includes(shift));
    // If the event already exists, remove it
    if (existingEventIndex !== -1) {
      const updatedEvents = [...events];
      updatedEvents.splice(existingEventIndex, 1);
      setEvents(updatedEvents);
    } else {
      // If the event doesn't exist, add it
      const newEvent = {
        title: `${shift} Shift - ${selectedDate}`,
        start: `${selectedDate}T${shift === 'morning' ? '08:00:00' : shift === 'noon' ? '13:00:00' : '18:00:00'}`,
        end: `${selectedDate}T${shift === 'morning' ? '13:00:00' : shift === 'noon' ? '18:00:00' : '23:00:00'}`
      };
        //add the new event to event state
      setEvents(prevEvents => [...prevEvents, newEvent]);
    }
  };

  const handleShifts = () => {
    console.log("הגשת משמרות", events);

    // //need to send to the backend the events
    // // Define the API endpoint
    // const apiUrl = `shifthify/api/SelectShifts?userID=${userID}&type=0`;
    // // Make a POST request using Axios
    // axios.post(apiUrl, events)
    //   .then(response => {
    //     // Handle successful response
    //     setResponseData(response.data);
    //   })
    //   .catch(error => {
    //     // Handle error
    //     console.error('Error posting data:', error);
    //   });
  };

  return (
    <div>
      <Header />
      <UserConnectionChecker />
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
        //hebrew
        locales={[heLocale]}
        locale="he"
        //when choose a specific date
        dateClick={handleDateClick}
        //show on the calander the events
        events={events}
         //when click on a specific date show the buttons
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
