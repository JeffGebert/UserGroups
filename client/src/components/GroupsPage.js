import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GroupsPage.scss";
import GroupList from "./GroupList";
import MemberList from "./MemberList"




export default function GroupsPage(props) {
    
    const [groupname, setGroupname] = useState({
        groupname:""
    })
    const [group, setGroups] = useState([]);
    const [members, setMembers] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState();
    const [tracker, setTracker] = useState(0)
    const [unselectedUsers, setunselectedUsers] = useState([]);
    const [groupID, setGroupID] = useState([]);
    
    function update() {

        console.log("selectedGroup", selectedGroup)
 
        if (selectedGroup!=null) {
            axios
            .get(`http://localhost:3000/groupmembers`, {
                params: { groupname: selectedGroup }}).then(res =>{
                    console.log("res.data", res.data)
                    setMembers(res.data)
                }) 
                
            } else {
            axios
                .get(`http://localhost:3000/groups`)
                .then(res => {
                    setGroups(res.data)
                });
                
            }
    }
    
    function onDelete(ev, group) {
        ev.preventDefault();
        axios
        .delete(`http://localhost:3000/groups`, { data: { group_id: group } }).then(response => {
            setTracker(tracker+1)
        })
    }
    
    function onDeleteGroupMember(ev, id) {
        ev.preventDefault();
        axios
        .delete(`http://localhost:3000/groupmembers`, { data: { groupmembers_id: id } }).then(response => {
        })
    }

    const addMember = function(ev, id, selectedGroup) {
        ev.preventDefault()
        axios
        .post(`http://localhost:3000/groupmembers`, { data: {user_id: id, selected_group:selectedGroup, group_id:groupID }}).then(response => {
            setTracker(tracker+1)
        })


    }
    const modifyGroup = function(modifiedGroup) {
        return axios.put(`http://localhost:3000/groups`, modifiedGroup).then(res =>{
            setTracker(tracker+1)
        })

    }
    
    const createGroup = function(groupname) {
        return axios.post(`http://localhost:3000/groups`, groupname).then(res =>{
            setTracker(tracker+1)
        });
    };
    
    const selectGroup = function (group) {
        setSelectedGroup(group)
        axios
        .get(`http://localhost:3000/groups`, {
            params: { group: group }}).then(res =>{
                setGroupID(res.data[0].id)
            })
        
        axios
        .get(`http://localhost:3000/groupmembers`, {
            params: { groupname: group }}).then(res =>{
                setMembers(res.data)
            })
        axios
        .get(`http://localhost:3000/groupmembers`, {
        params: { groupname: group,
                    unselected:true,
                }}).then(res =>{
            setunselectedUsers(res.data)
        })
    
        };
        
        
        function onSave(ev) {
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
            <GroupList ondelete={onDelete} groups={group} selectgroup={selectGroup} modifygroup={modifyGroup}/>
        </div>
        <div className="member-list">
            {members != [] ? (
                <MemberList members={members} ondeletegroupmember={onDeleteGroupMember} unselectedUsers={unselectedUsers} addmember={addMember} selectedgroup={selectedGroup}/>
            ) : (
                null
            )}

        </div>
        </div>
    )

    }

  