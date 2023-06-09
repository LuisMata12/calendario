import {Navigate, Route, Routes} from 'react-router-dom'
import { LoginPage } from '../auth/pages/LoginPage';
import { CalendarPage } from '../calendar/pages/CalendarPage';

export const AppRouter = () => {
    const authStatus = 'aunthenticated';
  return (
    <Routes>
        {
            (authStatus==='no-aunthenticated')
            ?<Route path='/auth/*' element={<LoginPage/>}/>
            :<Route path='/*' element={<CalendarPage/>}/>
        }
        <Route path='/*' element={<Navigate to='/auth/login'/>}/>
    </Routes>
  )
}
