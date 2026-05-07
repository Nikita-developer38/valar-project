import { filterCustomersService } from "../services/customerServise";
import { updateTagsService } from "../services/tagSerices";
import { history } from "../data/history";

export const resolvers = {
  Query: {
    filterCustomers: (_: any, { filters }: any) => {
      return filterCustomersService(filters);
    },
    getHistory: () => history,
  },

  Mutation: {
    updateCustomerTags: (_: any, args: any) => {
      const { tag, action, filters, dryRun } = args;

      if (!tag || tag.trim() === "") {
        throw new Error("Tag cannot be empty");
      }

      if (!["ADD", "REMOVE"].includes(action)) {
        throw new Error("Invalid action");
      }

      return updateTagsService(tag, action, filters, dryRun);
    },
  },
};