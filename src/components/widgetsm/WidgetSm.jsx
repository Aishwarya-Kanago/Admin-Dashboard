import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./widgetsm.css";
import { Link, useNavigate } from "react-router-dom";

const WidgetSm = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/user/${id}`);
  };

  return (
    <div className="new-joinee-list">
      <div className="widgetsm-title">
        <h3 className="sub-title">New Members</h3>
      </div>
      {data.map((user, idx) => {
        return (
          <div className="new-joinee-info" key={idx}>
            <img src={user.profile.profile_pic} alt="profile-pic-joinee" />
            <div className="name-and-position">
              <h3>
                {user.first_name} {user.last_name}
              </h3>
              <p>{user.profile.designation}</p>
            </div>
            <button
              className="display-btn"
              onClick={() => {
                handleClick(user.id);
              }}
            >
              <VisibilityIcon />
              <span>View Profile</span>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default WidgetSm;
