import React from "react";
import "./GroupListItem.scss";


export default function GroupListItem(props) {

return (
    <div className = "group-list-item">
        <span className = "name" onClick={event => props.selectgroup(event,props.groupname)}>{props.groupname}</span>
        <button className = "edit">Edit</button>
        <button className = "Delete" onClick={event => props.ondelete(event,props.id)}>Delete</button>
    </div>
)

}