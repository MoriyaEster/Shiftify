import React, { Component } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import heLocale from '@fullcalendar/core/locales/he';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const buttonClass = 'shift-button';

export class ShiftManagement extends Component {
    state = {
        selectedDate: null,
        events: [],
        selectedEmployees: {}, // Changed to store employees for each day and shift
        allSelectedEmployees: {}, // To store selected employees across different days
        employees: [
            { id: 1, name: 'Employee 1' },
            { id: 2, name: 'Employee 2' },
            // Add more employees as needed
        ],
    };

    calendarRef = React.createRef();

    handleDateClick = (info) => {
        const { date } = info;
        if (date) {
            const selectedDate = this.changeDateFormat(date.toLocaleDateString('he-IL').replace(/\./g, '-'));
            this.setState({ selectedDate });
        }
    };

    changeDateFormat = (Date) => {
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

    handleEmployeeSelection = (date, shift, selectedEmployees) => {
        const key = `${date}-${shift}`;
        const allSelectedEmployees = { ...this.state.allSelectedEmployees };
        allSelectedEmployees[key] = selectedEmployees.map(id => this.state.employees.find(employee => employee.id === id).name);
    
        this.setState(
            (prevState) => ({
                selectedEmployees: {
                    ...prevState.selectedEmployees,
                    [key]: selectedEmployees.map(id => this.state.employees.find(employee => employee.id === id).name),
                },
                allSelectedEmployees,
            }),
            () => {
                this.handleShiftSelection(shift);
            }
        );
    };
    
    handleShiftSelection = (shift) => {
        const { selectedDate, events, selectedEmployees, allSelectedEmployees } = this.state;
    
        if (!selectedDate) {
            console.error('Please select a date first.');
            return;
        }
    
        const key = `${selectedDate}-${shift}`;
        const existingEventIndex = events.findIndex(event => event.title.includes(selectedDate) && event.title.includes(shift));
    
        // If the event already exists, remove it
        if (existingEventIndex !== -1) {
            const updatedEvents = [...events];
            updatedEvents.splice(existingEventIndex, 1);
            this.setState({ events: updatedEvents });
        }
    
        // Add the new event
        const selectedEmployeeNames = selectedEmployees[key] || [];
        const numEmployees = selectedEmployeeNames.length;
        const newEvent = {
            id: events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 1, // Assign a unique ID
            title: `${shift} - ${selectedDate}<br />סה"כ ${numEmployees}: <br /> ${selectedEmployeeNames.join(', ')}`,
            start: `${selectedDate}T${shift === 'morning' ? '08:00:00' : shift === 'noon' ? '13:00:00' : '18:00:00'}`,
            end: `${selectedDate}T${shift === 'morning' ? '13:00:00' : shift === 'noon' ? '18:00:00' : '23:00:00'}`,
            employees: selectedEmployeeNames,
        };
    
        this.setState(prevState => ({
            events: [...prevState.events, newEvent],
        }));
    };
    
    

    handleShifts = () => {
        console.log("הגשת משמרות", this.state);
    };

    render() {
        const { selectedDate, employees, events, allSelectedEmployees } = this.state;

        return (
            <div>
                <style>
                    {`
                        .${buttonClass} {
                            font-size: 8px; /* Adjust the font size */
                            padding: 2px 2px; /* Adjust the padding */
                            margin: 1px; /* Adjust the margin */
                        }
                    `}
                </style>

                <h1>קביעת משמרות</h1>
                <p>לחץ על תאריך רצוי ובחר עובדים עבור כל משמרת</p>
                <FullCalendar
                    ref={this.calendarRef}
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
                    dateClick={this.handleDateClick}
                    events={this.state.events}
                    eventContent={({ event }) => (
                        <>
                            <div style={{ fontSize: '12px' }} dangerouslySetInnerHTML={{ __html: event.title }}></div>
                        </>
                    )}
                    
                    eventClick={(info) => {
                        const existingEventIndex = this.state.events.findIndex(event => event.id === info.event.id);

                        if (existingEventIndex !== -1) {
                            // If the event exists, remove it
                            const updatedEvents = [...this.state.events];
                            updatedEvents.splice(existingEventIndex, 1);
                            this.setState({ events: updatedEvents });
                        }
                    }}
                    dayCellContent={({ date }) => {
                        const clickedDate = this.changeDateFormat(date.toLocaleDateString('he-IL').replace(/\./g, '-'));
                        const today = new Date().toISOString().split('T')[0];
                        return (
                            <div>
                                {(selectedDate === clickedDate) && (clickedDate >= today) && (
                                    <>
                                        <Dropdown
                                            label="Morning"
                                            employees={employees}
                                            onSelect={(selectedEmployees) => this.handleEmployeeSelection(clickedDate, 'morning', selectedEmployees)}
                                            preselectedEmployees={allSelectedEmployees[`${clickedDate}-morning`] || []}
                                        />
                                        <br />
                                        <Dropdown
                                            label="Noon"
                                            employees={employees}
                                            onSelect={(selectedEmployees) => this.handleEmployeeSelection(clickedDate, 'noon', selectedEmployees)}
                                            preselectedEmployees={allSelectedEmployees[`${clickedDate}-noon`] || []}
                                        />
                                        <br />
                                        <Dropdown
                                            label="Evening"
                                            employees={employees}
                                            onSelect={(selectedEmployees) => this.handleEmployeeSelection(clickedDate, 'evening', selectedEmployees)}
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
                    onClick={this.handleShifts}
                > הגשת משמרות</Button>
            </div>
        );
    }
}

const Dropdown = ({ label, employees, onSelect, preselectedEmployees }) => {
    const [selectedEmployees, setSelectedEmployees] = React.useState(preselectedEmployees || []);

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
