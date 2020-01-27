import React from "react";
import "./MemberListItem.scss";


export default function MemberListItem(props) {

return (
    <div className = "group-list-item">
        <div className="members">
        <span className = "first-name">{props.memberfirstname} </span>
        <span className = "last-name">{props.memberlastname}</span>
        </div>
        <div className = "members-buttons">
        <button className = "edit">Edit</button>
        <button className = "delete" onClick={event => props.ondeletegroupmember(event,props.groupmembersid)}>Delete</button>
        </div>
    </div>
)

}