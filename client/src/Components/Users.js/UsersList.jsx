import React, { Component } from "react";

// GraphQl Imports
import gql from "graphql-tag";
import { Query } from "react-apollo";

//Utils
import { formatNumber } from "../../Utils/ConvertPhone";

//styles
import "./Users.css";

// Avatar
import Avatar from "./../../Assets/avatar.png";
export default class Users extends Component {
  state = {
    users: [],
  };

  render() {
    const USER_QUERY = gql`
      query {
        allUsers {
          id
          first_name
          last_name
          email
          phone_number
        }
      }
    `;
    return (
      <div className="user-list-container">
        <div className="user-details-header">Online Users</div>
        <Query query={USER_QUERY}>
          {(result) => {
            const { data } = result;
            if (data) {
              const { allUsers } = data;
              console.log(allUsers);
              return allUsers.map((user) => (
                <div key={user.id} className="user-card">
                  <div className="profile-image">
                    <img src={Avatar} alt="Avatar place holder" />
                  </div>
                  <div className="user-details">
                    <p className="user-details-name">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="online">Online: Yes</p>

                    <p className="user-details-username ">
                      Username: {user.email}
                    </p>
                    <p className="user-details-username ">
                      Phone Number: {formatNumber(user.phone_number)}
                    </p>
                  </div>
                </div>
              ));
            }
            // if (data.data.allUsers) {
            //   return <p>AllUser</p>;
            // } else {
            //   return <p>console.error;</p>;
            // }
            return <p>Hello</p>;
          }}
        </Query>
      </div>
    );
  }
}
