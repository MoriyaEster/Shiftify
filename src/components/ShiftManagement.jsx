import React, { useState, useEffect } from 'react';
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

export const ShiftManagement = () => {
    const { handleUserConnection } = useUser();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState({});
    const [allSelectedEmployees, setAllSelectedEmployees] = useState({});
    const [employees] = useState([
        { id: 1, name: 'Employee 1' },
        { id: 2, name: 'Employee 2' },
        // ... add other employees as needed
    ]);

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
            const selectedDate = changeDateFormat(date.toLocaleDateString('he-IL').replace(/\./g, '-'));
            setSelectedDate(selectedDate);
        }
    };

    const changeDateFormat = (Date) => {
        const parts = Date.split('-');
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        const formattedDay = day.padStart(2, '0');
        const formattedMonth = month.padStart(2, '0');
        return `${year}-${formattedMonth}-${formattedDay}`;
    };

    const handleEmployeeSelection = (date, shift, selectedEmployees) => {
        const key = `${date}-${shift}`;
        setAllSelectedEmployees({
            ...allSelectedEmployees,
            [key]: selectedEmployees.map(id => employees.find(employee => employee.id === id).name),
        });

        setSelectedEmployees((prevSelected) => ({
            ...prevSelected,
            [key]: selectedEmployees.map(id => employees.find(employee => employee.id === id).name),
        }));

        handleShiftSelection(shift);
    };

    const handleShiftSelection = (shift) => {
        if (!selectedDate) {
            console.error('Please select a date first.');
            return;
        }

        const key = `${selectedDate}-${shift}`;
        const existingEventIndex = events.findIndex(event => event.title.includes(selectedDate) && event.title.includes(shift));

        if (existingEventIndex !== -1) {
            const updatedEvents = [...events];
            updatedEvents.splice(existingEventIndex, 1);
            setEvents(updatedEvents);
        }

        const selectedEmployeeNames = selectedEmployees[key] || [];
        const numEmployees = selectedEmployeeNames.length;
        const newEvent = {
            id: events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 1,
            title: `${shift} - ${selectedDate}<br />סה"כ ${numEmployees}: <br /> ${selectedEmployeeNames.join(', ')}`,
            start: `${selectedDate}T${shift === 'morning' ? '08:00:00' : shift === 'noon' ? '13:00:00' : '18:00:00'}`,
            end: `${selectedDate}T${shift === 'morning' ? '13:00:00' : shift === 'noon' ? '18:00:00' : '23:00:00'}`,
            employees: selectedEmployeeNames,
        };

        setEvents((prevEvents) => [...prevEvents, newEvent]);
    };

    const handleShifts = () => {
        console.log("הגשת משמרות", { events, selectedEmployees, allSelectedEmployees });
        //need to send to the backend the events
    };

    return (
        <div>
            <Header />
            <h1>קביעת משמרות</h1>
            <p>לחץ על תאריך רצוי ובחר עובדים עבור כל משמרת</p>
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
                locales={[heLocale]}
                locale="he"
                dateClick={handleDateClick}
                events={events}
                eventContent={({ event }) => (
                    <>
                        <div style={{ fontSize: '12px' }} dangerouslySetInnerHTML={{ __html: event.title }}></div>
                    </>
                )}
                eventClick={(info) => {
                    const existingEventIndex = events.findIndex(event => event.id === info.event.id);

                    if (existingEventIndex !== -1) {
                        const updatedEvents = [...events];
                        updatedEvents.splice(existingEventIndex, 1);
                        setEvents(updatedEvents);
                    }
                }}
                dayCellContent={({ date }) => {
                    const clickedDate = changeDateFormat(date.toLocaleDateString('he-IL').replace(/\./g, '-'));
                    const today = new Date().toISOString().split('T')[0];
                    return (
                        <div>
                            {(selectedDate === clickedDate) && (clickedDate >= today) && (
                                <>
                                    <Dropdown
                                        label="Morning"
                                        employees={employees}
                                        onSelect={(selectedEmployees) => handleEmployeeSelection(clickedDate, 'morning', selectedEmployees)}
                                        preselectedEmployees={allSelectedEmployees[`${clickedDate}-morning`] || []}
                                    />
                                    <br />
                                    <Dropdown
                                        label="Noon"
                                        employees={employees}
                                        onSelect={(selectedEmployees) => handleEmployeeSelection(clickedDate, 'noon', selectedEmployees)}
                                        preselectedEmployees={allSelectedEmployees[`${clickedDate}-noon`] || []}
                                    />
                                    <br />
                                    <Dropdown
                                        label="Evening"
                                        employees={employees}
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
};

const Dropdown = ({ label, employees, onSelect, preselectedEmployees }) => {
    const [selectedEmployees, setSelectedEmployees] = useState(preselectedEmployees || []);

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
                    <MenuItem key={employee.id} value={employee.id}>
                        {employee.name}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};

export default ShiftManagement;
