import React, { useState } from "react";
import "./MemberListItem.scss";



export default function MemberListItem(props) {
    const [editing2, setEditing2] = useState(false)
    const [modifiedName2, setmodifiedName2] = useState({
        firstname:"",
        lastname:"",
        id:props.id
        
    })

return (
    <div className = "group-list-items">
    {editing2 ? (
        <div className= "group-list-item">
        <div>
        <form autoComplete ="off" className="members-edit" onSubmit={event => props.modify2(modifiedName2)}>
        <input
                className = "edit-input"
                type = "text"
                placeholder = {props.memberfirstname}
                value={modifiedName2.firstname}
                onChange={event =>
                    setmodifiedName2({ ...modifiedName2, firstname: event.target.value})
                }
                />
                <input
                className = "edit-input"
                type = "text"
                placeholder = {props.memberlastname}
                value={modifiedName2.lastname}
                onChange={event =>
                    setmodifiedName2({ ...modifiedName2, lastname: event.target.value})
                }
                />
        <div className = "members-buttons">
        <button className = "edit" >Save</button>
        <button className = "delete" onClick={event => props.ondeletegroupmember(event,props.groupmembersid)}>Delete</button>
        </div>
        </form>
        </div>
        </div>

        ) : (

        <div className = "group-list-item">
        <div className="members">
        <span className = "first-name">{props.memberfirstname} </span>
        <span className = "last-name">{props.memberlastname}</span>
        </div>
        <div className = "members-buttons">
        <button className = "edit" onClick={event=> setEditing2(true)}>Edit</button>
        <button className = "delete" onClick={event => props.ondeletegroupmember(event,props.groupmembersid)}>Delete</button>
        </div>
        </div>

    )}
    </div>

)
}

