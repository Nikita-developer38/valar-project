import { Customer, FilterInput } from "../types";
import {
  filterCustomersService,
  getCustomers,
  updateCustomers,
} from "./customerServise";
import { history } from "../data/history";

export const updateTagsService = (
  tag: string,
  action: string,
  filters: FilterInput,
  dryRun: boolean
) => {
  const matched = filterCustomersService(filters);

  if (dryRun) {
    return {
      affectedCount: matched.length,
      customers: matched,
    };
  }

  const allCustomers = getCustomers();

  const updatedCustomers = allCustomers.map((customer) => {
    const isMatch = matched.find((m) => m.id === customer.id);
    if (!isMatch) return customer;

    let newTags = [...customer.tags];

    if (action === "ADD" && !newTags.includes(tag)) {
      newTags.push(tag);
    }

    if (action === "REMOVE") {
      newTags = newTags.filter((t) => t !== tag);
    }

    return { ...customer, tags: newTags };
  });

  updateCustomers(updatedCustomers);

  history.push({
    timestamp: new Date().toISOString(),
    tag,
    action,
    count: matched.length,
  });

  return {
    affectedCount: matched.length,
    customers: matched,
  };
};