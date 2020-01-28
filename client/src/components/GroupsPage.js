import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GroupsPage.scss";
import GroupList from "./GroupList";
import MemberList from "./MemberList";
import { Link } from "react-router-dom";




export default function GroupsPage(props) {

    const [name, setName] = useState({
        firstname:"",
        lastname:""
    });
    
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
            .get(`groupmembers`, {
                params: { groupname: selectedGroup }}).then(res =>{
                    setMembers(res.data)
                }) 
            axios
            .get(`groupmembers`, {
                params: { groupname: selectedGroup,
                            unselected:true,
                        }}).then(res =>{
                    setunselectedUsers(res.data)
                })   
            axios
            .get(`groups`)
            .then(res => {
                setGroups(res.data)
            });
                            
        } else {
            axios
                .get(`groups`)
                .then(res => {
                    setGroups(res.data)
                });
                
        }
    }

    const modify = function (modifiedName) {

        return axios.put(`users`, modifiedName).then(res =>{
            setTracker(tracker+1)
        })

    }
    
    function onDelete(ev, group) {

        ev.preventDefault();
        axios
        .delete(`groups`, { data: { group_id: group } }).then(response => {
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
        .delete(`groupmembers`, { data: { groupmembers_id: id } }).then(response => {
            setTracker(tracker+1)

        })
    }

    const addMember = function(ev, id, selectedGroup) {
        ev.preventDefault()
        axios
        .post(`groupmembers`, { data: {user_id: id, selected_group:selectedGroup, group_id:groupID }}).then(response => {
            setTracker(tracker+1)
        })


    }
    const modifyGroup = function(modifiedGroup) {
        return axios.put(`groups`, modifiedGroup).then(res =>{
            setTracker(tracker+1)
        })

    }
    
    const createGroup = function(groupname) {
        return axios.post(`groups`, groupname).then(res =>{
            setTracker(tracker+1)
        });
    };
    
    const selectGroup = function (group) {
        setSelectedGroup(group)
        axios
        .get(`groups`, {
            params: { group: group }}).then(res =>{
                setGroupID(res.data[0].id)
            })
        
        axios
        .get(`groupmembers`, {
            params: { groupname: group }}).then(res =>{
                setMembers(res.data)
            })
        axios
        .get(`groupmembers`, {
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
            <MemberList members={members} modify2={modify} name={name} ondeletegroupmember={onDeleteGroupMember} unselectedUsers={unselectedUsers} addmember={addMember} selectedgroup={selectedGroup}/>
            ) : (
                null
            )}

        </div>
        </div>
        </div>
    )

    }

  