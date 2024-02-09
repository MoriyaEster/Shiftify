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
    const [selectedEmployeesM, setSelectedEmployeesM] = useState({});
    const [selectedEmployeesN, setSelectedEmployeesN] = useState({});
    const [selectedEmployeesE, setSelectedEmployeesE] = useState({});
    const [allSelectedEmployees, setAllSelectedEmployees] = useState({});
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
    const json = '[{"title": "morning - 2024-02-08 - סה\\"כ 1 - Employee 1","start": "2024-02-08T08:00:00","end": "2024-02-08T13:00:00","employees": ["Employee 1"]},{"title": "evening - 2024-02-08 - סה\\\\\\"כ 2 - Employee 1, Employee 2","start": "2024-02-08T18:00:00","end": "2024-02-08T23:00:00","employees": ["Employee 1", "Employee 2"]},{"title": "evening - 2024-02-09 - סה\\\\\\"כ 2 - Employee 1, Employee 2","start": "2024-02-09T18:00:00","end": "2024-02-09T23:00:00","employees": ["Employee 1", "Employee 2"]}]';
    handeljsonevents(json);
    const fetchUserEvents = async () => {
      try {
        const apiUrl = `shifthify/api/ShiftManagement?userID=${userID}&WorkPlace=${WorkPlace}'`;
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

    // Assuming the JSON structure is like: {"date": "2024-02-08", "morning": ["Employee 1", "Employee 2"], ...}
    const { date, morning, noon, evening } = data;

    // Modify the data structure for each shift and set it into state
    const formattedMorning = morning.map((employeeName, index) => ({
        id: index + 1,
        name: employeeName,
    }));
    setEmployeesM(formattedMorning);

    const formattedNoon = noon.map((employeeName, index) => ({
        id: index + 1,
        name: employeeName,
    }));
    setEmployeesN(formattedNoon);

    const formattedEvening = evening.map((employeeName, index) => ({
        id: index + 1,
        name: employeeName,
    }));
    setEmployeesE(formattedEvening);

    console.log("Morning employees from json: ", formattedMorning);
    console.log("Noon employees from json: ", formattedNoon);
    console.log("Evening employees from json: ", formattedEvening);
};


  //get employees from backend
  useEffect(() => {
    // Fetch events for the user
    const json  = '{"date": "2024-02-08","morning": ["Employee 1"],"noon": ["Employee 1", "Employee 2"],"evening": ["Employee 1", "Employee 2"]}';
    handeljsonemployees(json);
    console.log("selected date:", selectedDate)
    const fetchUserEmployees = async () => {
      try {
        const apiUrl = `shifthify/api/ShiftManagement?WorkPlace=${WorkPlace}&date=${selectedDate}`;
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
    
        if (selectedEmployees.length === 0) {
            console.error('Selected employees array is empty.');
            // REMOVE THE EVENT
            setEvents((prevEvents) => prevEvents.filter(event => !(event.title.includes(date) && event.title.includes(shift))));
            return;
        }
    
        const existingEmployeesM = selectedEmployeesM[key] || [];
        const existingEmployeesN = selectedEmployeesN[key] || [];
        const existingEmployeesE = selectedEmployeesE[key] || [];
    
        switch (shift) {
            case 'morning':
                handleShiftEmployeeSelection(existingEmployeesM, selectedEmployees, key, setSelectedEmployeesM);
                break;
            case 'noon':
                handleShiftEmployeeSelection(existingEmployeesN, selectedEmployees, key, setSelectedEmployeesN);
                break;
            case 'evening':
                handleShiftEmployeeSelection(existingEmployeesE, selectedEmployees, key, setSelectedEmployeesE);
                break;
            default:
                break;
        }
    
        console.log("AllSelectedEmployees", allSelectedEmployees);
        console.log("morning:", selectedEmployeesM);
        console.log("noon:", selectedEmployeesN);
        console.log("evening:", selectedEmployeesE);
    };
    
    const handleShiftEmployeeSelection = (existingEmployees, uniqueSelectedEmployees, key, setShiftState) => {
        console.log("!!!!!!!!!!!!!handleShiftEmployeeSelection:");
        // Check if the employee is already in the shift by name
    // Check if the last employee in uniqueSelectedEmployees is in existingEmployees
const lastSelectedEmployee = uniqueSelectedEmployees[uniqueSelectedEmployees.length - 1];
const isEmployeeInShift = existingEmployees.length > 0 && existingEmployees.some(employee => employee.name === lastSelectedEmployee.name);

console.log("!isEmployeeInShift:", isEmployeeInShift);
console.log("!existingEmployees:", existingEmployees);
console.log("!uniqueSelectedEmployees:", uniqueSelectedEmployees);
console.log("!key:", key);

    // const isEmployeeInShift = false;
    console.log("!isEmployeeInShift:", isEmployeeInShift);
        console.log("!existingEmployees:", existingEmployees);
        console.log("!uniqueSelectedEmployees:", uniqueSelectedEmployees);
        console.log("!key:", key);
        console.log("!isEmployeeInShift:", isEmployeeInShift);
        if (isEmployeeInShift) {
            // Remove the employee from the shift
            setShiftState((prevSelectedEmployees) => ({
                ...prevSelectedEmployees,
                [key]: existingEmployees.filter(employee => !uniqueSelectedEmployees.some(selected => selected.name != employee.name)),
            }));
            console.log("added:", existingEmployees.filter(employee => !uniqueSelectedEmployees.some(selected => selected.name === employee.name)));
            
            console.log("morning:", selectedEmployeesM);
            console.log("noon:", selectedEmployeesN);
            console.log("evening:", selectedEmployeesE);
    
            // Remove the employee from allSelectedEmployees
            setAllSelectedEmployees((prevAllSelectedEmployees) => ({
                ...prevAllSelectedEmployees,
                [key]: allSelectedEmployees[key].filter(employee => !uniqueSelectedEmployees.some(selected => selected.name === employee.name)),
            }));
        } else {
            // Add the employee to the shift
            setShiftState((prevSelectedEmployees) => ({
                // ...prevSelectedEmployees,
                [key]: [ ...uniqueSelectedEmployees],
            }));
    
            // Add the employee to allSelectedEmployees
            setAllSelectedEmployees((prevAllSelectedEmployees) => ({
                ...prevAllSelectedEmployees,
                [key]: [...uniqueSelectedEmployees],
            }));
        }
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

console.log("selectedEmployeeNames:", selectedEmployeeNames);

    const numEmployees = selectedEmployeeNames.length;

    const newEvent = {
        // id: events.length > 0 ? Math.max(...events.map((event) => event.id)) + 1 : 1,
        title: `${shift} - ${selectedDate}<br />סה"כ ${numEmployees}: <br /> ${selectedEmployeeNames.join(', ')}`,
        start: `${selectedDate}T${shift === 'morning' ? '08:00:00' : shift === 'noon' ? '13:00:00' : '18:00:00'}`,
        end: `${selectedDate}T${shift === 'morning' ? '13:00:00' : shift === 'noon' ? '18:00:00' : '23:00:00'}`,
        employees: selectedEmployeeNames,
    };

    setEvents([...updatedEvents, newEvent]);
    console.log("events", events);
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
                renderValue={(selected) => `${selected.length}`}
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