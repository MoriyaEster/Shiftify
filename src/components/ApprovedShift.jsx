import React, { Component } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import heLocale from '@fullcalendar/core/locales/he';
import { Header } from './Header';

const buttonClass = 'shift-button';

export class ApprovedShift extends Component {
    state = {
        events: [],
    };

    calendarRef = React.createRef();

    //get events from backend!!!!
    //needs to be end:"2024-02-09T18:00:00" start:"2024-02-09T13:00:00" title:"noon Shift - 2024-02-09" 
   

    render() {
        return (
            <div>
                <Header/>
                <h1>משמרות מאושרות</h1>
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
                    events={this.state.events}
                />
            </div>
        );
    }
}

export default ApprovedShift;
