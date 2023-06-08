import { addHours, differenceInSeconds } from 'date-fns';
import { useMemo, useState } from 'react';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'

import DatePiker,{registerLocale} from 'react-datepicker'
import Modal from 'react-modal'
import es from 'date-fns/locale/es';
import { useUiStore } from '../../hooks/useUiStore';

import 'react-datepicker/dist/react-datepicker.css';
import './styles/modal.css'


registerLocale('es',es)

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      overlay:{
        zIndex:4
      }
    },
  };

  Modal.setAppElement('#root');

export const CalendarModal = () => {

    //Estado del del modal (abierto/cerrado) 
    const {isDateModalOpen,closeDateModal} =useUiStore();
    const [formSubmitted, setformSubmitted] = useState(false)

    // Estado del formulario
    const [formValues, setFormValues] = useState({
        title:'Luis',
        notes: 'Mata',
        start: new Date(),
        end: addHours(new Date(),2)
    });

    const titleClass= useMemo(() => {
        if(!formSubmitted)return '';

        return(formValues.title.length >0)
            ?''
            :'is-invalid'

    }, [formValues.title,formSubmitted])

    // Manejo del formulario
    const onInputChange =({target})=>{

        const{name,value}=target;

        setFormValues({
            ...formValues,
            [name]:value
        })
    };

    const onDateChange=(event,changin)=>{
        setFormValues({
            ...formValues,
            [changin]:event
        })
    }

    const onCloseModal =()=>{
        closeDateModal();
    };

    //Submit y validaciones 
    const onSubmit =(e)=>{
        e.preventDefault();
        setformSubmitted(true);
        const difference = differenceInSeconds(formValues.end, formValues.start);

        if(isNaN(difference)||difference<=0){
            Swal.fire('fechas incorrectas', 'Revisar las fechas ingresadas','error');
            return;
        }

        if(formValues.title.length <= 0)return;

        console.log(formValues);

        // TODO:
        //cerrar modal
        //Remover Errores en pantalla
    }

  return (
    <Modal
    isOpen={isDateModalOpen}
    onRequestClose={onCloseModal}
    style={customStyles}
    className={'modal'}
    overlayClassName="modal-fondo"
    closeTimeoutMS={200}
    >
        <h1> Nuevo evento </h1>
        <hr />
        <form className="container" onSubmit={onSubmit}>

            <div className="form-group mb-2">
                <label>Fecha y hora inicio</label>
                <DatePiker
                    selected={formValues.start}
                    className='form-control'
                    onChange={(event)=>onDateChange(event,'start')}
                    dateFormat='Pp'
                    showTimeSelect
                    locale='es'
                    timeCaption='Hora'
                />
            </div>

            <div className="form-group mb-2">
                <label>Fecha y hora fin</label>
                <DatePiker
                    minDate={formValues.start}
                    selected={formValues.end}
                    className='form-control'
                    onChange={(event)=>onDateChange(event,'end')}
                    dateFormat='Pp'
                    showTimeSelect
                    locale='es'
                    timeCaption='Hora'
                />
            </div>

            <hr />
            <div className="form-group mb-2">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={`form-control ${titleClass}`}
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={formValues.title}
                    onChange={onInputChange}
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={formValues.notes}
                    onChange={onInputChange}
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>

    </Modal>
  )
}
