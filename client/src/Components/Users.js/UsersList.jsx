import React, { Component } from "react";

// GraphQl Imports
import gql from "graphql-tag";
import { Query } from "react-apollo";

//styles
import "./Users.css";

// Avatar
import UserCard from "./UserCard";
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

              return allUsers.map((user) => (
                <UserCard user={user} key={user.id} />
              ));
            }
            return <p>Fetching Data</p>;
          }}
        </Query>
      </div>
    );
  }
}
