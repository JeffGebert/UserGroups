import React from "react";
import "./LandingPage.scss";
import { Link } from "react-router-dom";


export default function HomePage(props) {
    return (
        <div className="home-page-container">
            <div className="links-container">
            <Link to="/users">
              <button className="users-button" type ="submit">
                Users
              </button>
            </Link>
            <Link to="/groups">
            <button className="groups-button" type = "submit">
                Groups
              </button>
            </Link>
            </div>
        </div>
    )
}