import React from "react";
import "./GroupList.scss";
import GroupListItem from "./GroupListItem";


export default function GroupList(props) {


    
    const list = props.groups.map((groups,index) => {
        return (
            <GroupListItem
              key={index}
              id={groups.id}
              groupname={groups.name}
              ondelete={props.ondelete}
              selectgroup={props.selectgroup}
              modifygroup={props.modifygroup}
            />
        );
    });
        return (

        <div>
            <h1>Groups</h1>
            <div className="groups-list">{list}</div>
        </div>
        )
}