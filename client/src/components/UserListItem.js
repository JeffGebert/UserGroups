import React, { useState } from "react";
import "./UserListItem.scss";



export default function UserListItem(props) {

    const [editing, setEditing] = useState(false)
    const [modifiedName, setmodifiedName] = useState({
        firstname:"",
        lastname:"",
        id:props.id

    })



return (
    <div className = "user-list-item">
        { editing ? (
                <div className = "input-enclosure-edit2">
                <form autoComplete ="off" onSubmit={event => props.modify(modifiedName)}>
                <input
                className = "edit-input"
                type = "text"
                placeholder = {props.firstname}
                value={modifiedName.firstname}
                onChange={event =>
                    setmodifiedName({ ...modifiedName, firstname: event.target.value})
                }
                />
                <input
                className = "edit-input"
                type = "text"
                placeholder = {props.lastname}
                value={modifiedName.lastname}
                onChange={event =>
                    setmodifiedName({ ...modifiedName, lastname: event.target.value})
                }
                />
                <button className = "save">Save</button>
                </form>
                <div className = "edit-delete-container">
                <button className = "delete" onClick={event => props.ondelete(event,props.id)} onClick={event => setEditing(false)}>Delete</button>
                </div>
                </div>


            ) : (
                <div className = "input-enclosure2">
                    <span className = "name">{props.firstname} {props.lastname}</span>
                    <div className = "buttons-enclosure2">
                    <button className = "edit" onClick={event => setEditing(true)}>Edit</button>
                    <button className = "delete" onClick={event => props.ondelete(event,props.id)}>Delete</button>
                    </div>
                </div>

            )}

    </div>
)

}
