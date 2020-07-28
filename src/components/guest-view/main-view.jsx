import React, { useState } from "react";
import Header from './header';
import { useHistory } from 'react-router-dom'
import './mainView.scss';

export const MainView = () => {

    const history = useHistory();

    const [location, setLocation] = useState("Cambridge");
    const [checkindate, setCheckindate] = useState(null);
    const [checkoutdate, setCheckoutdate] = useState(null);
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

    const validateCheckinDate = () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        return yyyy + '-' + mm + '-' + dd;
    }

    const validateCheckoutDate = () => {
        return checkindate !== null ? checkindate : validateCheckinDate();
    }

    const validateAllFields = () => {
        return location !== null && checkindate !== null && checkoutdate !== null && guestCount !== 0;
    }

    const onSearchClicked = () => {
        if (validateAllFields()) {
            const headers = { 'Access-Control-Allow-Origin': '*' };
            fetch('http://ec2-3-18-107-155.us-east-2.compute.amazonaws.com:8080/get?destination=' + location, { headers })
                .then(response => response.json()).then(data => console.log(data));
            history.push({
                pathname: `hotels`
            });
        }
    }

    return (
        <>
            <div className="trl-main-view">
                <Header></Header>
                <div className="trl-empty-space"></div>
                <form className="trl-search-form">
                    <label className="trl-search-form-loc">Location</label>
                    <select onChange={handleLocationChange}>
                        <option value="Cambridge">Cambridge</option>
                        <option value="London">London</option>
                    </select>
                    <label>Check In</label>
                    <input type="date" id="checkindate" name="checkin" min={validateCheckinDate()} onChange={handleCheckInDateChange}></input>
                    <label>Check Out</label>
                    <input type="date" id="checkoutdate" name="checkout" min={validateCheckoutDate()} onChange={handleCheckOutDateChange}></input>
                    <label>Guest Count</label>
                    <input className="trl-search-form-gcount" type="number" id="guest-count" min={0} onChange={handleGuestCountChange}></input>
                    <button className="search-btn" id="form-search-btn" type="button" onClick={onSearchClicked}>Search</button>
                </form>
            </div>
        </>
    )
}

export default MainView;