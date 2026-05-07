export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  numberOfOrders: number;
  amountSpent: {
    amount: number;
    currencyCode: string;
  };
  lastOrderDate: string | null;
  tags: string[];
  createdAt: string;
}

export interface FilterInput {
  minSpent?: number;
  minOrders?: number;
  lastOrderDays?: number;
}