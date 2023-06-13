import {useSelector,useDispatch} from 'react-redux'
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdate } from '../store/calendar/calendarSlice';

export const useCelendarStore = () => {

    const dispatch = useDispatch();
    const {events,activeEvent}=useSelector(state=>state.calendar);

    const setActiveEvent = (calendarEvent)=>{
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent =(calendarEvent)=>{
      //TODO: llega info del backend

      if(calendarEvent._id){
        //Actualizas
        dispatch(onUpdate({...calendarEvent}) );
      }else{
        //creas 
        dispatch(onAddNewEvent({...calendarEvent,_id: new Date().getTime()}))
      }
    }
    const startDeleteEvent=()=>{
      dispatch(onDeleteEvent())
    }

  return {
    events,
    activeEvent,
    hasActiveEvent:!!activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent
  }
}
