import React, { useState } from "react";
import axios from "axios";
import "./UsersPage.scss";
import UserList from "./UserList";

import { Link } from "react-router-dom";



export default function UsersPage(props) {
    const [state, setState] = useState({
        firstname:"",
        lastname:""
    });
    
    const createUser = function(user) {
        console.log("state", state);
        return axios.post(`http://localhost:3000`, user);
    };
    
    function onSave(ev) {
        let user ="";
        ev.preventDefault();
        createUser(state)
    
    }
    return (
        <div>
        <div className="user-form">
            <form autoComplete ="off" onSubmit={event => onSave(event)}>
                <label>First Name:</label>
                <input
                type="text"
                className="input-field"
                placeholder="first name"
                value={state.firstname}
                onChange={event =>
                    setState({ ...state, firstname: event.target.value})
                }
                />
                <label>Last Name:</label>
                <input
                type="text"
                className="input-field"
                placeholder="last name"
                value={state.lastname}
                onChange={event =>
                    setState({ ...state, lastname: event.target.value})
                }
                />
                <button className="create-user">Add User</button>
            </form>
        </div>
        <div className="user-list">
            <UserList/>
        </div>
        </div>
    )
}