import { Calendar} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar } from '../components/Navbar'
import { addHours } from 'date-fns'
import { localizer } from '../../helpers/calendarLocalizer';
import { calendarMessages } from '../../helpers/calendarMessages';
import { CalendarEvent } from '../components/CalendarEvent';
import { useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';

const events  = [{
    title:'compleaños de luis',
    notes:'hay que comparar pastel',
    start:new Date(),
    end: addHours(new Date(),2),
    bgColor:'#fafafa',
    user:{
        id:'123',
        name:'Fernando'
    }
}];



export const CalendarPage = () => {

    const [lastView, setlastView] = useState(localStorage.getItem('lastView')||'week')

    const eventStyleGetter =(event, start, end, isSelected)=>{
        const style = {
            background:'#347CF7',
            borderRadius: '0px',
            opacity:0.8,
            color: 'white'
        }
        return{
            style
        }
    }

    const onDoubleClick = (event) =>{
        console.log({onDoubleClick:event})
    }

    const onSelect = (event) =>{
        console.log({click:event})
    }
    const onViewChanged = (event) =>{
        localStorage.setItem('lastView',event)
        setlastView(event)
    }

  return (
    <>
        <Navbar/>
        <Calendar
            culture='es'
            localizer={localizer}
            events={events}
            defaultView={lastView}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 'calc(100vh - 80px)' }}
            messages={calendarMessages()}
            eventPropGetter={eventStyleGetter}
            components={{
                event:CalendarEvent
            }}
            onDoubleClickEvent={onDoubleClick}
            onSelectEvent={onSelect}
            onView={onViewChanged}
         />
         <CalendarModal/>
    </>
  )
}
