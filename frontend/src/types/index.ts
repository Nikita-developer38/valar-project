export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  numberOfOrders: number;
  amountSpent: {
    amount: number;
  };
  lastOrderDate: string;
  tags: string[];
}