import { faker } from "@faker-js/faker";
import fs from "fs";

const customers = [];

for (let i = 1; i <= 50; i++) {
  customers.push({
    id: String(i),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    numberOfOrders: faker.number.int({ min: 0, max: 20 }),
    amountSpent: {
      amount: faker.number.int({ min: 100, max: 10000 }),
      currencyCode: "INR",
    },
    lastOrderDate: faker.date.recent({ days: 90 }).toISOString(),
    tags: faker.helpers.arrayElements(
      ["VIP", "Premium", "Returning", "Wholesale"],
      faker.number.int({ min: 0, max: 2 })
    ),
    createdAt: faker.date.past().toISOString(),
  });
}

fs.writeFileSync(
  "../fixture/customer.json",
  JSON.stringify(customers, null, 2)
);

console.log("customers.json generated");