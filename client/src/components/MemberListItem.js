import React from "react";
import "./MemberListItem.scss";


export default function MemberListItem(props) {

return (
    <div className = "group-list-item">
        <span className = "first-name">{props.memberfirstname} </span>
        <span className = "last-name">{props.memberlastname}</span>
        <button className = "edit">Edit</button>
        <button className = "Delete" onClick={event => props.ondeletegroupmember(event,props.groupmembersid)}>Delete</button>
    </div>
)

}