import React, { useState } from "react";
import "./GroupListItem.scss";



export default function GroupListItem(props) {
    const [editing1, setEditing1] = useState(false)
    const [modifiedGroup, setmodifiedGroup] = useState({
        groupname:"",
        id:props.id

    })



return (
    <div className = "group-list-item2">
    {editing1 ? (

        <form className = "edit-group" autoComplete ="off" onSubmit={event => props.modifygroup(modifiedGroup)}>
        <input
                type = "text"
                placeholder = {props.groupname}
                value={modifiedGroup.groupname}
                onChange={event =>
                    setmodifiedGroup({ ...modifiedGroup, groupname: event.target.value})
                }
        />
        <div className = "buttons-enclosure">
        <button className = "save">Save</button>
        <button className = "delete" onClick={event => setEditing1(false)}>Cancel</button>
        </div>
        </form>

    ) : (
    
        <div className = "input-enclosure">
        <span className = "name" onClick={event => props.selectgroup(props.groupname)}>{props.groupname}</span>
        <div className = "buttons-enclosure">
        <button className = "edit" onClick={event => setEditing1(true)}>Edit</button>
        <button className = "delete" onClick={event => props.ondelete(event,props.id)}>Delete</button>
        </div>
        </div>

    )}
    </div>

)

}

