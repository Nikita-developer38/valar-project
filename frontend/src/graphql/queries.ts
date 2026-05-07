import { gql } from "@apollo/client";

export const FILTER_CUSTOMERS = gql`
  query FilterCustomers($filters: FilterInput!) {
    filterCustomers(filters: $filters) {
      id
      firstName
      lastName
      email
      numberOfOrders
      amountSpent {
        amount
      }
      lastOrderDate
      tags
    }
  }
`;

export const GET_HISTORY = gql`
  query {
    getHistory {
      timestamp
      tag
      action
      count
    }
  }
`;