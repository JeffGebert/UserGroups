import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GroupsPage.scss";
import GroupList from "./GroupList";
import MemberList from "./MemberList";
import { Link } from "react-router-dom";




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

 
        if (selectedGroup!=null) {
            axios
            .get(`http://localhost:3000/groupmembers`, {
                params: { groupname: selectedGroup }}).then(res =>{
                    setMembers(res.data)
                }) 
            axios
            .get(`http://localhost:3000/groupmembers`, {
                params: { groupname: selectedGroup,
                            unselected:true,
                        }}).then(res =>{
                    setunselectedUsers(res.data)
                })   
            axios
            .get(`http://localhost:3000/groups`)
            .then(res => {
                setGroups(res.data)
            });
                            
        } else {
            axios
                .get(`http://localhost:3000/groups`)
                .then(res => {
                    setGroups(res.data)
                });
                
        }
    }
    
    function onDelete(ev, group) {
        console.log("group", group)
        console.log("Selected Group", selectedGroup)
        ev.preventDefault();
        axios
        .delete(`http://localhost:3000/groups`, { data: { group_id: group } }).then(response => {
            //needed when group is selected to setSelected to null if you delete a group you currently have selected
            if (response.data.rows[0].id ===group && response.data.rows[0].name === selectedGroup) {
                setSelectedGroup();
            }
            setTracker(tracker+1)
        })
    }
    
    function onDeleteGroupMember(ev, id) {
        ev.preventDefault();
        axios
        .delete(`http://localhost:3000/groupmembers`, { data: { groupmembers_id: id } }).then(response => {
            setTracker(tracker+1)

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
        <div className="wrapper2">
        <div className="container2">
        <div className="group-form">
            <form className="form-entry" autoComplete ="off" onSubmit={event => onSave(event)}>
                <div className = "input-group">
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
                </div>
                <div className ="nav-bar">
                <Link to="/">
                <button className="home-button">Home</button>
                </Link>
                <Link to="/users">
                <button className="small-users-button2">Users</button>
                </Link>
                </div>

            </form>
        </div>
        <div className="group-list">
            <GroupList ondelete={onDelete} groups={group} selectgroup={selectGroup} modifygroup={modifyGroup}/>
        </div>
        <div className="member-list">
            {members !== [] ? (
            <MemberList members={members} ondeletegroupmember={onDeleteGroupMember} unselectedUsers={unselectedUsers} addmember={addMember} selectedgroup={selectedGroup}/>
            ) : (
                null
            )}

        </div>
        </div>
        </div>
    )

    }

  