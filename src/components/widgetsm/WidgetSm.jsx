import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./widgetsm.css";
import { useNavigate } from "react-router-dom";
import { useData } from "../../UserContext";

const WidgetSm = () => {
  const data = useData();
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
            <div className="new-joinee-name new-joinee-info">
              <img src={user.profile.profile_pic} alt="profile-pic-joinee" />
              <div className="name-and-position">
                <h3>
                  {user.first_name} {user.last_name}
                </h3>
                <p>{user.profile.designation}</p>
              </div>
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
