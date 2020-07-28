import React, { useState } from "react";
import Header from './header';
import './mainView.scss';

export const MainView = () => {

    const [location, setLocation] = useState("Cambridge");
    const [checkindate, setCheckindate] = useState(new Date());
    const [checkoutdate, setCheckoutdate] = useState(new Date());
    const [guestCount, setGuestCount] = useState(0);

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    }
    const handleCheckInDateChange = (e) => {
        setCheckindate(e.target.value);
    }
    const handleCheckOutDateChange = (e) => {
        setCheckoutdate(e.target.value);
    }
    const handleGuestCountChange = (e) => {
        setGuestCount(e.target.value);
    }

    const onSearchClicked = () => {
        const headers = {'Access-Control-Allow-Origin': '*'};
        fetch('http://localhost:8080/get?destination='+location, {headers})
        .then(response => response.json());
    }

    return (
        <>
        <div className="trl-main-view">
        <Header></Header>
            <form className="trl-search-form">
                <label className="trl-search-form-loc">Location</label>
                <select onChange={handleLocationChange}>
                    <option value="Cambridge">Cambridge</option>
                    <option value="London">London</option>
                </select>
                <label>Check In</label>
                <input type="date" id="checkin" name="checkin" onChange={handleCheckInDateChange}></input>
                <label>Check Out</label>
                <input type="date" id="checkout" name="checkout" onChange={handleCheckOutDateChange}></input>
                <label>Guest Count</label>
                <input  className="trl-search-form-gcount" type="number" id="guest-count" onChange={handleGuestCountChange}></input>
                <button className="search-btn" id="form-search-btn" type="button" onClick={onSearchClicked}>Search</button>
            </form>
            </div>
        </>
    )
}

export default MainView;