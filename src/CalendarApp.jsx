import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import { store } from './store/store'

import { AppRouter } from './router/AppRouter'

function CalendarApp() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </Provider>
  )
}

export default CalendarApp
