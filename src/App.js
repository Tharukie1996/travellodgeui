import React from 'react';
import './App.css';
import MainView from './components/guest-view/main-view';
import HotelView from './components/hotel/hotel-view'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={MainView} />
          <Route path="/hotels" component={HotelView} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
