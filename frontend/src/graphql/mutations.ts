import { gql } from "@apollo/client";

export const UPDATE_TAGS = gql`
  mutation UpdateTags(
    $tag: String!
    $action: String!
    $filters: FilterInput!
    $dryRun: Boolean!
  ) {
    updateCustomerTags(
      tag: $tag
      action: $action
      filters: $filters
      dryRun: $dryRun
    ) {
      affectedCount
      customers {
        id
        email
      }
    }
  }
`;