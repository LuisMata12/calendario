import {useSelector} from 'react-redux'

export const useCelendarStore = () => {

    const {events}=useSelector(state=>state.calendar)

  return {
    events
  }
}
