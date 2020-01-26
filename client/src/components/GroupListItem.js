import React, { useState } from "react";
import "./GroupListItem.scss";



export default function GroupListItem(props) {
    const [editing1, setEditing1] = useState(false)
    const [modifiedGroup, setmodifiedGroup] = useState({
        groupname:"",
        id:props.id

    })



return (
    <div className = "group-list-item">
    {editing1 ? (

        <form autoComplete ="off" onSubmit={event => props.modifygroup(modifiedGroup)}>
        <input
                type = "text"
                placeholder = {props.groupname}
                value={modifiedGroup.groupname}
                onChange={event =>
                    setmodifiedGroup({ ...modifiedGroup, groupname: event.target.value})
                }
        />
        <button className = "Save">Save</button>
        <button className = "Delete" onClick={event => props.ondelete(event,props.id)}>Delete</button>
        </form>

    ) : (
    
        <div className = "group-list-item">
        <span className = "name" onClick={event => props.selectgroup(props.groupname)}>{props.groupname}</span>
        <button className = "edit" onClick={event => setEditing1(true)}>Edit</button>
        <button className = "Delete" onClick={event => props.ondelete(event,props.id)}>Delete</button>
        </div>

    )}
    </div>

)

}

