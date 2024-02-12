import React, { useState, useEffect } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ModelPopUp } from './ModelPopUp';
import heLocale from '@fullcalendar/core/locales/he';
import Button from '@mui/material/Button';
import { Header } from './Header';
import { useUser } from '/src/UserContext.jsx';
import UserConnectionChecker from './UserConnectionChecker';
import axios from 'axios';
import * as links from '/src/axios-handler.jsx';

const buttonClass = 'shift-button';

export const SelectShifts = () => {
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  //save userID
  const { handleUserId ,handleWorkPlace } = useUser();
  const [userID, setUserID] = useState(handleUserId());
  const [WorkPlace, setWorkPlace] = useState(handleWorkPlace());
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(null);
  const [contentPOPUP, setContentPOPUP] = useState(null);
  
  const handeljson = (jsondata) => {
    // const eventsArray = JSON.parse(jsondata);
      // Modify the date format in the array
      const formattedArray = jsondata.map((event) => ({
        title: event.title,
        start: event.start,
        end: event.end,
        date: event.date,
        type: event.type,
        userID: userID,
        WorkPlace: WorkPlace,
        
      }));
      setEvents(formattedArray);
      console.log("events from json: ", formattedArray);
      console.log("events: ", events);
  }

  //get  info from backend
  useEffect(() => {
    // // Fetch events for the user
    
    // handeljson(json);
    const fetchUserEvents = async () => {
      try {
        const response = await axios.get(links.url_select_shifts + `?userID=${userID}&WorkPlace=${WorkPlace}`);
        console.log("response:", response);
        if (response.status === 200) {
          console.log("Data fetched successfully:", response.data);
          // Update state or perform other actions with the data
          handeljson(response.data.docs);
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
        end: `${selectedDate}T${shift === 'morning' ? '13:00:00' : shift === 'noon' ? '18:00:00' : '23:00:00'}`,
        date: `${selectedDate}`, 
        type: `${shift}`,
        userID: `${userID}`,
        WorkPlace: `${WorkPlace}`,
      };
        //add the new event to event state
      setEvents(prevEvents => [...prevEvents, newEvent]);
    }
  };


  const handleShifts = async () => {
    
    console.log("הגשת משמרות", events);

  // Wrap jsonEvents in an object with the key "docs"
  const sendinpost = { docs: events };
  console.log("Wrapped JSON for sending:", sendinpost);
  
  //post
    const response = await axios.post(links.url_select_shifts, sendinpost)
      .then(async function(response) {
        // Handle successful response if needed
        if(response.status === 200)
        {
          setStatus(200);
          setContentPOPUP("המשמרות הוגשו בהצלחה");
          setShowModal(true);
        }
      })
      .catch(async function(error) {
        // Handle error
        setStatus(500);
        setContentPOPUP("תקלה בהגשת משמרות");
        setShowModal(true);
        // Optionally, provide user feedback or take specific actions based on the error
      });
  };
  
  

  return (
    <div>
      <Header />
      <UserConnectionChecker />
      <h1>בחירת משמרות</h1>
      <p>לחץ על תאריך רצוי ובחר זמינות עבור </p>
      <p> E-ערב , N-צהריים, M-בוקר </p>
      <p>(לחיצה על כפתור תוסיף משמרת ולחיצה נוספת תוריד משמרת)</p>
      <h4>{WorkPlace} :מקום העבודה הנבחר </h4>
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
      <ModelPopUp show={showModal} onClose={() => setShowModal(false)} status={status} content={contentPOPUP}/>
    </div>
  );
};

export default SelectShifts;
