import React, { useState, useEffect, Component } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import heLocale from '@fullcalendar/core/locales/he';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Header } from './Header';
import { useUser } from '/src/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import UserConnectionChecker from './UserConnectionChecker';
import axios from 'axios';

export const ShiftManagement = () => {

    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState({});
    const [allSelectedEmployees, setAllSelectedEmployees] = useState({});
    const [employees, setEmployees] = useState([
    { id: 1, name: 'Employee 1' },
    { id: 2, name: 'Employee 2' },
    // need to change to only the employees that want that shift on a specific date
  ]);
	
    const calendarRef = React.createRef();

    //save userID
    const { handleUserId ,handleWorkPlace } = useUser();
    const [userID, setUserID] = useState(handleUserId());
    const [WorkPlace, setWorkPlace] = useState(handleWorkPlace());

      
const handeljsonevents = (jsondata) => {
    const eventsArray = JSON.parse(jsondata);
    // Modify the date format in the array
    const formattedArray = eventsArray.map((event) => ({
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
      employees: event.employees
    }));
    setEvents(formattedArray);
    console.log("events from json: ", formattedArray);
    console.log("events: ", events);
  };
  

  //get events from backend
  useEffect (() => {
    // Fetch events for the user
    const json = '[{"title": "morning - 2024-02-08 - סה\\"כ 1 - Employee 1","start": "2024-02-08T08:00:00","end": "2024-02-08T13:00:00","employees": ["Employee 1"]},{"title": "evening - 2024-02-08 - סה\\"כ 2 - Employee 1, Employee 2","start": "2024-02-08T18:00:00","end": "2024-02-08T23:00:00","employees": ["Employee 1", "Employee 2"]},{"title": "evening - 2024-02-09 - סה\\"כ 2 - Employee 1, Employee 2","start": "2024-02-09T18:00:00","end": "2024-02-09T23:00:00","employees": ["Employee 1", "Employee 2"]}]';
    handeljsonevents(json);
    const fetchUserEvents = async () => {
      try {
        const apiUrl = `shifthify/api/ShiftManagement?userID=${userID}&type=0`;
        const response = await axios.get(apiUrl);
        console.log("response:", response);
        // handeljsonevents(response.data.events);
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

  const handeljsonemployees = (jsondata) => {
    const data = JSON.parse(jsondata);
    const employeeNames = data.employees; // Extract employee names from the JSON

    // Modify the data structure and set it into state
    const formattedArray = employeeNames.map((employeeName, index) => ({
        id: index + 1, // You can use a unique identifier like index or any other appropriate method
        name: employeeName
    }));

    setEmployees(formattedArray);
    console.log("employees from json: ", formattedArray);
    console.log("employees in state: ", employees);
  }

  //get employees from backend
  useEffect(() => {
    // Fetch events for the user
    const json  = '{"employees": ["Employee 1","Employee 2"]}';
    handeljsonemployees(json);
    console.log("selected date:", selectedDate)
    const fetchUserEmployees = async () => {
      try {
        const apiUrl = `shifthify/api/ShiftManagement?userID=${userID}&date=${selectedDate}`;
        const response = await axios.get(apiUrl);
        console.log("response:", response);
        // handeljsonemployees(response.data.events);
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
    // Call the fetchUserEmployees function
    fetchUserEmployees();
  }, [selectedDate]);
	
    //to handle the click date on the calendar.
    //extracts the selected date and updates the state with it.
    const handleDateClick = (info) => {
        const { date } = info;
        if (date) {
            const selectedDate = changeDateFormat(date.toLocaleDateString('he-IL').replace(/\./g, '-'));
            setSelectedDate(selectedDate);
        }
    };

    //do date as YYYY-MM-DD in Isreal timezone
    const changeDateFormat = (Date) => {
        const originalDateString = Date;
        const parts = originalDateString.split('-');
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        const formattedDay = day.padStart(2, '0');
        const formattedMonth = month.padStart(2, '0');
        const formattedDateString = `${year}-${formattedMonth}-${formattedDay}`;
        return formattedDateString;
    };

    const handleEmployeeSelection = (date, shift, selectedEmployees) => {
        const key = `${date}-${shift}`;
    
        // Update selected employees for the specific key
        setSelectedEmployees((prevSelectedEmployees) => ({
            ...prevSelectedEmployees,
            [key]: selectedEmployees.map((id) => employees.find((employee) => employee.id === id).name),
        }));
    
        // Update all selected employees
        setAllSelectedEmployees((prevAllSelectedEmployees) => ({
            ...prevAllSelectedEmployees,
            [key]: selectedEmployees.map((id) => employees.find((employee) => employee.id === id).name),
        }));
    };
    
    useEffect(() => {
        // Call the function you want to execute after state update
        if (selectedEmployees && selectedEmployees[`${selectedDate}-morning`]) {
            handleShiftSelection('morning');
        }
        if (selectedEmployees && selectedEmployees[`${selectedDate}-noon`]) {
            handleShiftSelection('noon');
        }
        if (selectedEmployees && selectedEmployees[`${selectedDate}-evening`]) {
            handleShiftSelection('evening');
        }
    
    }, [selectedDate, selectedEmployees]);
    

    
    // Handle shift selection and create/update events accordingly
    const handleShiftSelection = (shift) => {
        if (!selectedDate) {
            console.error('Please select a date first.');
            return;
        }

        const key = `${selectedDate}-${shift}`;
        const existingEventIndex = events.findIndex((event) => event.title.includes(selectedDate) && event.title.includes(shift));

        // If the event already exists, remove it
        if (existingEventIndex !== -1) {
            const updatedEvents = [...events];
            updatedEvents.splice(existingEventIndex, 1);
            setEvents(updatedEvents);
        }

        // Add the new event
        const selectedEmployeeNames = selectedEmployees[key] || [];
        const numEmployees = selectedEmployeeNames.length; // Count the number of selected employees
        const newEvent = {
            id: events.length > 0 ? Math.max(...events.map((event) => event.id)) + 1 : 1, // Assign a unique ID
            title: `${shift} - ${selectedDate}<br />סה"כ ${numEmployees}: <br /> ${selectedEmployeeNames.join(', ')}`,
            start: `${selectedDate}T${shift === 'morning' ? '08:00:00' : shift === 'noon' ? '13:00:00' : '18:00:00'}`,
            end: `${selectedDate}T${shift === 'morning' ? '13:00:00' : shift === 'noon' ? '18:00:00' : '23:00:00'}`,
            employees: selectedEmployeeNames,
        };

        setEvents((prevEvents) => [...prevEvents, newEvent]);
    };

    
    //send to the backend the events
    const handleShifts = () => {
        console.log("הגשת משמרות", events);
        console.log("כל העובדים ", allSelectedEmployees);
        //need to send to the backend the events
    };


        return (
            <div>
                <UserConnectionChecker />
                <Header/>
                <h1>קביעת משמרות</h1>
                <p>לחץ על תאריך רצוי ובחר עובדים עבור כל משמרת</p>
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
                    height={"120vh"}
                    //hebrew
                    locales={[heLocale]}
                    locale="he"
                    //when choose a specific date
                    dateClick={handleDateClick}
                    //show on the calander the events
                    events={events}
                    //to calculate how many employees where choosen ans show it on the event
                    eventContent={({ event }) => (
                        <>
                            <div style={{ fontSize: '12px' }} dangerouslySetInnerHTML={{ __html: event.title }}></div>
                        </>
                    )}                    
                    eventClick={(info) => {
                        const existingEventIndex = events.findIndex(event => event.id === info.event.id);

                        if (existingEventIndex !== -1) {
                            // If the event exists, remove it
                            const updatedEvents = [...events];
                            updatedEvents.splice(existingEventIndex, 1);
                            setEvents(updatedEvents);
                        }
                    }}
                    //when click on a specific date show the dropdowns
                    dayCellContent={({ date }) => {
                        const clickedDate = changeDateFormat(date.toLocaleDateString('he-IL').replace(/\./g, '-'));
                        const today = new Date().toISOString().split('T')[0];
                        return (
                            <div>
                                {/* show dropdowns only on days that after today and not prev (today too) */}
                                {(selectedDate === clickedDate) && (clickedDate >= today) && (
                                    <>
                                        <Dropdown
                                            label="Morning"
                                            employees={employees} //need to change to only emploees that wanted that shift
                                            onSelect={(selectedEmployees) => handleEmployeeSelection(clickedDate, 'morning', selectedEmployees)}
                                            preselectedEmployees={allSelectedEmployees[`${clickedDate}-morning`] || []}
                                        />
                                        <br />
                                        <Dropdown
                                            label="Noon"
                                            employees={employees} //need to change to only emploees that wanted that shift
                                            onSelect={(selectedEmployees) => handleEmployeeSelection(clickedDate, 'noon', selectedEmployees)}
                                            preselectedEmployees={allSelectedEmployees[`${clickedDate}-noon`] || []}
                                        />
                                        <br />
                                        <Dropdown
                                            label="Evening"
                                            employees={employees} //need to change to only emploees that wanted that shift
                                            onSelect={(selectedEmployees) => handleEmployeeSelection(clickedDate, 'evening', selectedEmployees)}
                                            preselectedEmployees={allSelectedEmployees[`${clickedDate}-evening`] || []}
                                        />
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
}

// Component for handling shift dropdowns
const Dropdown = ({ label, employees, onSelect, preselectedEmployees }) => {
    const [selectedEmployees, setSelectedEmployees] = React.useState(preselectedEmployees || []);

    // Handle the change in selected employees
    const handleSelectChange = (event) => {
        const selectedOptions = event.target.value;
        setSelectedEmployees(selectedOptions);
        onSelect(selectedOptions);
    };

    return (
        <div>
            <label style={{ fontSize: '10px' }}>{label}</label>
            <Select
                multiple
                value={selectedEmployees}
                onChange={handleSelectChange}
                renderValue={(selected) => `${selected.length}`}
                style={{ fontSize: '12px', padding: '1px', margin: '1px' }}
            >
                {employees.map((employee) => (
                    <MenuItem key={employee.id} value={employee.id}
                    style={{
                        backgroundColor: selectedEmployees.includes(employee.id) ? 'lightblue' : 'inherit',
                    }}>
                        {employee.name}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};


export default ShiftManagement;