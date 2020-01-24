import React from "react";
import "./UnselectedUserListItem.scss";


export default function UnslectedUserListItem(props) {

return (
    <div className = "group-list-item">
        <span className = "first-name">{props.firstname} </span>
        <span className = "last-name">{props.lastname}</span>
        <button className = "add-user">Add User</button>
    </div>
)

}