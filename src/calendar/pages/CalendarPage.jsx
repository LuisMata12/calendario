import { Calendar} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar } from '../components/Navbar'
import { addHours } from 'date-fns'
import { localizer } from '../../helpers/calendarLocalizer';
import { calendarMessages } from '../../helpers/calendarMessages';
import { CalendarEvent } from '../components/CalendarEvent';
import { useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';
import { useUiStore } from '../../hooks/useUiStore';
import { onOpenDateModal } from '../../store/ui/uiSlice';
import { useCelendarStore } from '../../hooks/useCelendarStore';



export const CalendarPage = () => {

    const {events}= useCelendarStore();
    const {openDateModal} = useUiStore();
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
        openDateModal()
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
