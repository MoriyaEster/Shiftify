import React, { Component } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import heLocale from '@fullcalendar/core/locales/he';
import Button from '@mui/material/Button';
import '/src/App.css' 

const buttonClass = 'shift-button';

export class SelectShifts extends Component {
    state = {
        selectedDate: null,
        events: [],
    };

    calendarRef = React.createRef();

    //to handle the click date on the calendar.
    //extracts the selected date and updates the state with it.
    handleDateClick = (info) => {
        const { date } = info;
        if (date) {
            const selectedDate = this.changeDateFormat(date.toLocaleDateString('he-IL').replace(/\./g, '-'));
            this.setState({ selectedDate });
        }
    };

    //do date as YYYY-MM-DD in Isreal timezone
    changeDateFormat = (Date) => {
        const originalDateString = Date;
        const parts = originalDateString.split('-');
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        // Ensure two-digit formatting for day and month
        const formattedDay = day.padStart(2, '0');
        const formattedMonth = month.padStart(2, '0');
        // Construct the YYYY-MM-DD format
        const formattedDateString = `${year}-${formattedMonth}-${formattedDay}`;
        return formattedDateString;
    }

    //The shift parameter represents the type of shift (morning, noon, or evening) selected by the user.
    handleShiftSelection = (shift) => {
        const { selectedDate, events } = this.state;
        
        if (!selectedDate) {
            console.error('Please select a date first.');
            return;
        }
        // Check if the event already exists, and either add or remove it
        const existingEventIndex = events.findIndex(event => event.title.includes(selectedDate) && event.title.includes(shift));
    
        if (existingEventIndex !== -1) {
            // If the event already exists, remove it
            const updatedEvents = [...events];
            updatedEvents.splice(existingEventIndex, 1);
            this.setState({ events: updatedEvents });
        } else {
            // If the event doesn't exist, add it
            const newEvent = {
                title: `${shift} Shift - ${selectedDate}`,
                start: `${selectedDate}T${shift === 'morning' ? '08:00:00' : shift === 'noon' ? '13:00:00' : '18:00:00'}`,
                end: `${selectedDate}T${shift === 'morning' ? '13:00:00' : shift === 'noon' ? '18:00:00' : '23:00:00'}`
            };
            //add the new event to event state
            this.setState(prevState => ({
                events: [...prevState.events, newEvent]
            }));
        }
    };
    
    //send to the backend the events
    handleShifts = () => {
        console.log("הגשת משמרות", this.state.events)
        //need to send to the backend the events
    }
  

    render() {
        return (
            <div>
                <h1>בחירת משמרות</h1>
                <p>לחץ על תאריך רצוי ובחר זמינות עבור </p>
                <p> E-ערב , N-צהריים, M-בוקר </p>
                <p>(לחיצה על כפתור תוסיף משמרת ולחיצה נוספת תוריד משמרת)</p>
                <FullCalendar
                    ref={this.calendarRef}
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
                    dateClick={this.handleDateClick}
                    //show on the calander the events
                    events={this.state.events}
                    //when click on a specific date show the buttons
                    dayCellContent={({ date }) => {
                        const clickedDate = this.changeDateFormat(date.toLocaleDateString('he-IL').replace(/\./g, '-'));
                        const today = new Date().toISOString().split('T')[0];              
                        return (
                            <div>
                                {/* show buttons only on days that after today and not prev (today too) */}
                                {(this.state.selectedDate === clickedDate) && (clickedDate >= today) && (
                                    <>
                                        <button onClick={() => this.handleShiftSelection('morning')} className={`${buttonClass}`}>M</button>
                                        <br/>
                                        <button onClick={() => this.handleShiftSelection('noon')} className={`${buttonClass}`}>N</button>
                                        <br/>
                                        <button onClick={() => this.handleShiftSelection('evening')} className={`${buttonClass}`}>E</button>
                                    </>
                                )}
                            </div>
                        );
                    }}
                    
                    
                />
                <Button
              color="primary"
              variant="contained"
              onClick={() => {
                this.handleShifts();
              }}
            > הגשת משמרות</Button>
            </div>
        );
    }
}

export default SelectShifts;
