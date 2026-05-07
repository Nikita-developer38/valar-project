import { gql } from "apollo-server";

export const typeDefs = gql`
  type AmountSpent {
    amount: Float!
    currencyCode: String!
  }

  type Customer {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    numberOfOrders: Int!
    amountSpent: AmountSpent!
    lastOrderDate: String
    tags: [String!]!
  }

  input FilterInput {
    minSpent: Float
    minOrders: Int
    lastOrderDays: Int
  }

  type TagResult {
    affectedCount: Int!
    customers: [Customer!]!
  }

  type History {
    timestamp: String!
    tag: String!
    action: String!
    count: Int!
  }

  type Query {
    filterCustomers(filters: FilterInput!): [Customer!]!
    getHistory: [History!]!
  }

  type Mutation {
    updateCustomerTags(
      tag: String!
      action: String!
      filters: FilterInput!
      dryRun: Boolean!
    ): TagResult!
  }
`;