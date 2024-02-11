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
import UserConnectionChecker from './UserConnectionChecker';
import axios from 'axios';
import * as links from '/src/axios-handler.jsx';

export const ShiftManagement = () => {

    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState({});
    const [selectedEmployeesM, setSelectedEmployeesM] = useState({});
    const [selectedEmployeesN, setSelectedEmployeesN] = useState({});
    const [selectedEmployeesE, setSelectedEmployeesE] = useState({});
    const [employees, setEmployees] = useState([]);
    const [employeesM, setEmployeesM] = useState([]);
    const [employeesN, setEmployeesN] = useState([]);
    const [employeesE, setEmployeesE] = useState([]);
	
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
      start: event.start,
      end: event.end,
      employees: event.employees,
      WorkPlace: event.WorkPlace,
    }));
    setEvents(formattedArray);
    console.log("events from json: ", formattedArray);
    console.log("events: ", events);
  };
  

  //get events from backend
  useEffect (() => {
    // Fetch events for the user
    // const json = '[{"title": "morning - 2024-02-08 - total 1- Employee 1","start": "2024-02-08T08:00:00","end": "2024-02-08T13:00:00","employees": ["Employee 1"],"WorkPlace": "Workplace 2","userID": "333"},{"title": "evening - 2024-02-08 - total 2 - Employee 1, Employee 2","start": "2024-02-08T18:00:00","end": "2024-02-08T23:00:00","employees": ["Employee 1", "Employee 2"],"WorkPlace": "Workplace 2","userID": "333"},{"title": "evening - 2024-02-09 - total 2 - Employee 1, Employee 2","start": "2024-02-09T18:00:00","end": "2024-02-09T23:00:00","employees": ["Employee 1", "Employee 2"],"WorkPlace": "Workplace 2","userID": "333"}]';
    // handeljsonevents(json);
    const fetchUserEvents = async () => {
      try {
        const response = await axios.get(links.url_managers_shifts + `?userID=${userID}&WorkPlace=${WorkPlace}`);
        console.log("response:", response);
        // handeljsonevents(response.data.events);
        if (response.status === 200) {
          console.log("Data fetched successfully:", response.data);
          // Update state or perform other actions with the data
          handeljsonevents(response.data.events);
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

    // Group the data by shift type
    const groupedData = data.reduce((acc, shift) => {
        if (!acc[shift.type]) {
            acc[shift.type] = [];
        }

        acc[shift.type] = acc[shift.type].concat(shift.employees);

        return acc;
    }, {});

    // Map each shift type and set it into state
    Object.keys(groupedData).forEach((shiftType) => {
        const formattedEmployees = groupedData[shiftType].map((employeeName, index) => ({
            id: index + 1,
            name: employeeName,
        }));

        // Set the employees into the corresponding state
        if (shiftType === "morning") {
            setEmployeesM(formattedEmployees);
        } else if (shiftType === "noon") {
            setEmployeesN(formattedEmployees);
        } else if (shiftType === "evening") {
            setEmployeesE(formattedEmployees);
        }

        console.log(`${shiftType.charAt(0).toUpperCase() + shiftType.slice(1)} employees from json: `, formattedEmployees);
    });
    console.log("Morning employees from json: ", employeesM);
    console.log("Noon employees from json: ", employeesN);
    console.log("Evening employees from json: ", employeesE);
};


  //get employees from backend
  useEffect(() => {
    // Fetch events for the user
    // const json  = '[{"date": "2024-02-08","type": "morning","employees": ["Employee 1"]},{"date": "2024-02-08","type": "noon","employees": ["Employee 1", "Employee 2"]},{"date": "2024-02-08","type": "evening","employees": ["Employee 1", "Employee 2"]}]';
    // handeljsonemployees(json);
    console.log("selected date:", selectedDate)
    const fetchUserEmployees = async () => {
      try {
        const response = await axios.get(links.url_managers_shifts + `?WorkPlace=${WorkPlace}&date=${selectedDate}`);
        console.log("response:", response);
        // handeljsonemployees(response.data.events);
        if (response.status === 200) {
          console.log("Data fetched successfully:", response.data);
          // Update state or perform other actions with the data
          handeljsonemployees(response.data);
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
    
        if (selectedEmployees.length === 0) {
            console.error('Selected employees array is empty.');
            // REMOVE THE EVENT
            setEvents((prevEvents) => prevEvents.filter(event => !(event.title.includes(date) && event.title.includes(shift))));
            return;
        }
    
        switch (shift) {
            case 'morning':
                setSelectedEmployeesM(()=>({[key]: [ ...selectedEmployees]}));
                break;
            case 'noon':
                setSelectedEmployeesN(()=>({[key]: [ ...selectedEmployees]}));
                break;
            case 'evening':
                setSelectedEmployeesE(()=>({[key]: [ ...selectedEmployees]}));
                break;
            default:
                break;
        }
    
        console.log("morning:", selectedEmployeesM);
        console.log("noon:", selectedEmployeesN);
        console.log("evening:", selectedEmployeesE);
    };
    
    useEffect(() => {
        // Call the function you want to execute after state update
        if (selectedEmployeesM && selectedEmployeesM[`${selectedDate}-morning`]) {
            handleShiftSelection('morning');
        }
        if (selectedEmployeesN && selectedEmployeesN[`${selectedDate}-noon`]) {
            handleShiftSelection('noon');
        }
        if (selectedEmployeesE && selectedEmployeesE[`${selectedDate}-evening`]) {
            handleShiftSelection('evening');
        }
    
    }, [selectedDate, selectedEmployeesM, selectedEmployeesN, selectedEmployeesE]);
    
    
    // Handle shift selection and create/update events accordingly
const handleShiftSelection = (shift) => {
    if (!selectedDate) {
        console.error('Please select a date first.');
        return;
    }
    
    console.log("mormimg:",selectedEmployeesM);
    console.log("noun:",selectedEmployeesN);
    console.log("evning:",selectedEmployeesE);

    const key = `${selectedDate}-${shift}`;

    // Remove existing event for the selected shift and date
    const updatedEvents = events.filter(
        (event) => !(event.title.includes(selectedDate) && event.title.includes(shift))
    );

    let selectedEmployeeObjects = [];

// Add the new event
switch (shift) {
    case 'morning':
        selectedEmployeeObjects = selectedEmployeesM[key] || [];
        break;
    case 'noon':
        selectedEmployeeObjects = selectedEmployeesN[key] || [];
        break;
    case 'evening':
        selectedEmployeeObjects = selectedEmployeesE[key] || [];
        break;
    default:
        break;
}

// Extract names from the objects
const selectedEmployeeNames = selectedEmployeeObjects.map(employee => employee.name);

    const numEmployees = selectedEmployeeNames.length;

    const newEvent = {
        title: `${shift} - ${selectedDate}<br /> total ${numEmployees}: <br /> ${selectedEmployeeNames.join(', ')}`,
        start: `${selectedDate}T${shift === 'morning' ? '08:00:00' : shift === 'noon' ? '13:00:00' : '18:00:00'}`,
        end: `${selectedDate}T${shift === 'morning' ? '13:00:00' : shift === 'noon' ? '18:00:00' : '23:00:00'}`,
        employees: selectedEmployeeNames,
        date: `${selectedDate}`,
        type: `${shift}`,
        WorkPlace: `${WorkPlace}`
    };

    setEvents([...updatedEvents, newEvent]);
    console.log("events", events);
};

    

    
    //send to the backend the events
    const handleShifts = async () => {
        console.log("הגשת משמרות", events);
        //need to send to the backend the events
        // Wrap jsonEvents in an object with the key "docs"
        const sendinpost = { docs: events };
        console.log("Wrapped JSON for sending:", sendinpost);
        
    
         //post
        const response = await axios.post(links.url_managers_shifts+ `userID=${userID}&WorkPlace=${WorkPlace}`, sendinpost)
        .then(response => {
        // Handle successful response if needed
        console.log("Data posted successfully:", response.data);
        })
        .catch(error => {
        // Handle error
        console.error('Error posting data:', error);
        // Optionally, provide user feedback or take specific actions based on the error
        });

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
                        // console.log("mormimg:",employeesM);
                        // console.log("noun:",employeesN);
                        // console.log("evning:",employeesE);
                        return (
                            <div>
                                {/* show dropdowns only on days that after today and not prev (today too) */}
                                {(selectedDate === clickedDate) && (clickedDate >= today) && (
                                    <>
                                        <Dropdown
                                            label="Morning"
                                            employees={employeesM}
                                            onSelect={(selectedEmployeesM) => handleEmployeeSelection(selectedDate, 'morning', selectedEmployeesM)}
                                            preselectedEmployees={selectedEmployeesM[`${selectedDate}-morning`] || []}
                                        />
                                        <br />
                                        <Dropdown
                                            label="Noon"
                                            employees={employeesN}
                                            onSelect={(selectedEmployeesN) => handleEmployeeSelection(selectedDate, 'noon', selectedEmployeesN)}
                                            preselectedEmployees={selectedEmployeesN[`${selectedDate}-noon`] || []}
                                        />
                                        <br />
                                        <Dropdown
                                            label="Evening"
                                            employees={employeesE}
                                            onSelect={(selectedEmployeesE) => handleEmployeeSelection(selectedDate, 'evening', selectedEmployeesE)}
                                            preselectedEmployees={selectedEmployeesE[`${selectedDate}-evening`] || []}
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
                renderValue={(selected) => `${new Set(selected.map(employee => employee.id)).size}`}
                style={{ fontSize: '12px', padding: '1px', margin: '1px' }}
            >
                {employees.map((employee) => (
                    <MenuItem key={employee?.id} value={employee} // Use entire employee object as value
                        style={{
                            backgroundColor: selectedEmployees.some((selectedEmployee) => selectedEmployee.id === employee?.id) ? 'lightblue' : 'inherit',
                        }}>
                        {employee?.name || ''}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};


export default ShiftManagement;