import React from "react";

//Image
import Avatar from "./../../Assets/avatar.png";

//Utils
import { formatNumber } from "../../Utils/ConvertPhone";

function UserCard({ user }) {
  return (
    <div key={user.id} className="user-card">
      <div className="profile-image">
        <img src={Avatar} alt="Avatar place holder" />
      </div>
      <div className="user-details">
        <p className="user-details-name">
          {user.first_name} {user.last_name}
        </p>
        <p className="online">Online: Yes</p>

        <p className="user-details-username ">Username: {user.email}</p>
        <p className="user-details-username ">
          Phone Number: {formatNumber(user.phone_number)}
        </p>
      </div>
    </div>
  );
}

export default UserCard;
