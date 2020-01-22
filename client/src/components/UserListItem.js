import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./UserListItem.scss";


export default function UserListItem(props) {


    function onDelete(ev,user,update) {
        ev.preventDefault();
        console.log("this is the user id to be deleted", user)
        let userID = {data: {user_id: user}}
        axios
        .delete(`http://localhost:3000/users`, { data: { user_id: user } }).then(response => {
            console.log(response)
        })
    }

return (
    <div className = "user-list-item">
        <span className = "name">{props.firstname} {props.lastname}</span>
        <button className = "edit">Edit</button>
        <button className = "Delete" onClick={event => onDelete(event,props.id)}>Delete</button>
    </div>
)

}




