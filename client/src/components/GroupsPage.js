import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GroupsPage.scss";
import GroupList from "./GroupList";




export default function GroupsPage(props) {
    const [groupname, setGroupname] = useState({
        groupname:""
    })
    const [group, setGroups] = useState([]);

    const [tracker, setTracker] = useState(0)


    function update() {
        axios
          .get(`http://localhost:3000/groups`)
          .then(res => {
              setGroups(res.data)
          });   
    }

    function onDelete(ev, group) {
        ev.preventDefault();
        axios
        .delete(`http://localhost:3000/groups`, { data: { group_id: group } }).then(response => {
            setTracker(tracker+1)
        })
    }

    const createGroup = function(groupname) {
        return axios.post(`http://localhost:3000/groups`, groupname).then(res =>{
            setTracker(tracker+1)
        });
    };

    function onSave(ev) {
        console.log("hi")
        ev.preventDefault();
        createGroup(groupname)
    
    }

    useEffect(() => {
        update()
        },[tracker])



    return (
        <div>
        <div className="group-form">
            <form autoComplete ="off" onSubmit={event => onSave(event)}>
                <label>Group Name:</label>
                <input
                type="text"
                className="input-field"
                placeholder="group name"
                value={groupname.groupname}
                onChange={event =>
                    setGroupname({ ...group, groupname: event.target.value})
                }
                />
                <button className="create-user">Add Group</button>

            </form>
        </div>
        <div className="group-list">
            <GroupList ondelete={onDelete} groups={group}/>
        </div>
        </div>
    )
}