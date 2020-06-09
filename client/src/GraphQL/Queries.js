import gql from "graphql-tag";

//Fetch Query
export const GET_TICKETS_QUERY = gql`
  query {
    allTickets {
      id
      title
      description
      category
      created_at
      created_by {
        first_name
        last_name
      }
    }
  }
`;

export const ADD_TICKET_MUTATION = gql`
  mutation Add_mutation(
    $title: String!
    $description: String!
    $category: String
    $created_by: String
  ) {
    addTicket(
      title: $title
      description: $description
      category: $category
      created_by: $created_by
    ) {
      id
      title
      description
      category
      created_at
      created_by {
        first_name
        last_name
      }
    }
  }
`;

export const DELETE_MUTATION = gql`
  mutation Delete_mutation($id: ID!) {
    deleteTicket(id: $id) {
      id
      info
    }
  }
`;
