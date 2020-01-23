import React from "react";
import "./UserListItem.scss";


export default function UserListItem(props) {



return (
    <div className = "user-list-item">
        <span className = "name">{props.firstname} {props.lastname}</span>
        <button className = "edit">Edit</button>
        <button className = "Delete" onClick={event => props.ondelete(event,props.id)}>Delete</button>
    </div>
)

}




