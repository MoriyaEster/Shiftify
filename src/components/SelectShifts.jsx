import React, { Component } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import heLocale from '@fullcalendar/core/locales/he';
import Button from '@mui/material/Button';


const buttonClass = 'shift-button';

export class SelectShifts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: null,
            events: []
        };
        this.calendarRef = React.createRef();
    }

    handleDateClick = (info) => {
        const { date } = info;
        console.log(info)
        if (date) {
            const selectedDate = date.toISOString().split('T')[0];
            console.log("selectedDate",selectedDate)
            this.setState({ selectedDate });
        }
    };

    //The shift parameter represents the type of shift (morning, noon, or evening) selected by the user.
    handleShiftSelection = (shift) => {
        const { selectedDate, events } = this.state;
        console.log("2selectedDate",selectedDate)
        if (!selectedDate) {
            console.error('Please select a date first.');
            return;
        }
    
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
    
            this.setState(prevState => ({
                events: [...prevState.events, newEvent]
            }));
        }
    };
    
    handleShifts = () => {
        console.log("הגשת משמרות", this.state.events)
    }
  

    render() {
        return (
            <div>
                <style>
                    {`
                        .${buttonClass} {
                            font-size: 10px;
                            padding: 3px 6px;
                            margin: 2px;
                        }
                    `}
                </style>
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
                    locales={[heLocale]}
                    locale="he"
                    dateClick={this.handleDateClick}
                    events={this.state.events}
                    dayCellContent={({ date }) => (
                        <div className="custom-day-cell-content">
                            {this.state.selectedDate && (
                                <>
                                    <button onClick={() => this.handleShiftSelection('morning')} className={`${buttonClass}`}>M</button>
                                    <br/>
                                    <button onClick={() => this.handleShiftSelection('noon')} className={`${buttonClass}`}>N</button>
                                    <br/>
                                    <button onClick={() => this.handleShiftSelection('evening')} className={`${buttonClass}`}>E</button>
                                </>
                            )}
                        </div>
                    )}
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
