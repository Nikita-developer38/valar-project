import fs from "fs";
import path from "path";
import { Customer, FilterInput } from "../types";
import { isWithinDays } from "../utils/data";

const dataPath = path.join(__dirname, "../../../fixture/customer.json");

let customers: Customer[] = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

export const filterCustomersService = (filters: FilterInput): Customer[] => {
  return customers.filter((c) => {
    const matchSpent =
      !filters.minSpent || c.amountSpent.amount > filters.minSpent;

    const matchOrders =
      !filters.minOrders || c.numberOfOrders > filters.minOrders;

    const matchDate =
      !filters.lastOrderDays ||
      (c.lastOrderDate &&
        isWithinDays(c.lastOrderDate, filters.lastOrderDays));

    return matchSpent && matchOrders && matchDate;
  });
};

export const getCustomers = () => customers;

export const updateCustomers = (updated: Customer[]) => {
  customers = updated;
};