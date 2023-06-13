
import { useCelendarStore } from '../../hooks/useCelendarStore';

import './styles/modal.css'

export const FabDelete = () => {

    const {startDeleteEvent,hasActiveEvent}=useCelendarStore()

    const handleClickNew=()=>{
       startDeleteEvent();
    }

  return (
    <button
        className="btn btn-danger fab-danger"
        onClick={handleClickNew}
        style={{
            display:hasActiveEvent?'':'none'
        }}
    >
        <i className='fas fa-trash-alt'></i>

    </button>
  )
}
