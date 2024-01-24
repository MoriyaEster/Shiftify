import React from 'react';
import { ConnectionForm } from './components/ConnectionForm';
import './App.css'
import { RegisteryForm } from './components/RegisteryForm';
import { Calendar } from './components/Calendar';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';


function App() {

  return (
    // <div className='App'>
    //   <ConnectionForm />
    //   {/* <RegisteryForm/> */}
    //   {/* <Calendar /> */}
    // </div>
    <Router>
      <Switch>
      <Route path="/">
          <ConnectionForm />
        </Route>
        <Route path="Registery" element={<RegisteryForm />}>
        </Route>
      </Switch>
    </Router>
  )
}

export default App