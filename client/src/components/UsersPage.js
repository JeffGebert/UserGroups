import React from "react";
import "./UsersPage.scss";

import { Link } from "react-router-dom";


export default function UsersPage(props) {
    return (
        <div className="user-form">
            <form>
                First name:<input type="text" name="fname"><br>
                Last name:<input type="text" name="lname"><br>
                <input type="submit" value="Submit">
            </form>

        </div>
    )
}