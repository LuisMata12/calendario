import { addHours } from 'date-fns';
import { useCelendarStore } from '../../hooks/useCelendarStore';
import { useUiStore } from '../../hooks/useUiStore'
import './styles/modal.css'

export const FabAddNew = () => {

    const {openDateModal} = useUiStore();
    const {setActiveEvent}=useCelendarStore()

    const handleClickNew=()=>{
        setActiveEvent({
                title:'',
                notes:'',
                start:new Date(),
                end: addHours(new Date(),2),
                bgColor:'#fafafa',
                user:{
                    id:'123',
                    name:'Fernando'
                }
            });
        openDateModal();
    }

  return (
    <button
        className="btn btn-primary fab"
        onClick={handleClickNew}
    >
        <i className='fas fa-plus'></i>

    </button>
  )
}
