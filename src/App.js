import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/index.css';

// component import
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LogIn from './components/authscreens/Login';
import Signup from './components/authscreens/Signup';
//import Calendar from './components/calendar/calendar';
// import Recover from './components/authscreens/Recover';

// page import
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import About from './pages/About';
import ExistUser from './pages/ExistUser';
import ExistAccount from './pages/ExistAccount';
import ExistActivity from './pages/ExistActivity';

function App() {
  return (
    <div className="App">
      <Navbar />
      <br />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/signin" component={LogIn} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/about" component={About} />
        <Route exact path="/ExistUser" component={ExistUser} />
        <Route exact path="/ExistAccount" component={ExistAccount} />
        <Route exact path="/ExistActivity" component={ExistActivity} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
