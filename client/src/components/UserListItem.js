import React, { useState } from "react";
import "./UserListItem.scss";



export default function UserListItem(props) {
    console.log("props from suerslistietm", props)

    const [editing, setEditing] = useState(false)
    const [modifiedName, setmodifiedName] = useState({
        firstname:"",
        lastname:"",
        id:props.id

    })



return (
    <div className = "user-list-item">
        { editing ? (
                <div className = "input-enclosure">
                <form autoComplete ="off" onSubmit={event => props.modify(modifiedName)}>
                <input
                type = "text"
                placeholder = {props.firstname}
                value={modifiedName.firstname}
                onChange={event =>
                    setmodifiedName({ ...modifiedName, firstname: event.target.value})
                }
                />
                <input
                type = "text"
                placeholder = {props.lastname}
                value={modifiedName.lastname}
                onChange={event =>
                    setmodifiedName({ ...modifiedName, lastname: event.target.value})
                }
                />
                <button className = "Save">Save</button>
                </form>
                <button className = "Delete" onClick={event => props.ondelete(event,props.id)}>Delete</button>
                </div>


            ) : (
                <div className = "input-enclosure">
                <span className = "name">{props.firstname} {props.lastname}</span>
                <button className = "edit" onClick={event => setEditing(true)}>Edit</button>
                <button className = "Delete" onClick={event => props.ondelete(event,props.id)}>Delete</button>
                </div>

            )}

    </div>
)

}
