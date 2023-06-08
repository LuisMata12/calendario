import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns';

const tempEvent={
    title:'compleaños de luis',
    notes:'hay que comparar pastel',
    start:new Date(),
    end: addHours(new Date(),2),
    bgColor:'#fafafa',
    user:{
        id:'123',
        name:'Fernando'
    }
}

  
  export const calendarSlice = createSlice({
    name: 'calendar',
    initialState:{
        events:[
            tempEvent
        ],
        activeEvent:null
    },
    reducers: {
      onOpenDateModal: (state) => {
        state.isDateModalOpen=true;
      },
      onCloseDateModal: (state) => {
        state.isDateModalOpen=false;
      }
    },
  })
  

  export const { onOpenDateModal,onCloseDateModal } = calendarSlice.actions;