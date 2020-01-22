import React, { useState, useEffect, useContext } from "react";
import "./UserListItem.scss";


export default function UserListItem(props) {

    const [state, setState] = useState({
        firstname:"",
        lastname:""
    });
    
    const deleteUser = function(user) {
        console.log("state", state);
        return axios.delete(`http://localhost:3000`, user);
    };
    
    function onDelete(ev) {
        let user ="";
        ev.preventDefault();
        createUser(state)
    
    }

return (
    <div className = "user-list-item">
        <span className = "name">{props.firstname} {props.lastname}</span>
        <button className = "edit">Edit</button>
        <button className = "Delete">Delete</button>
    </div>
)

}
