// import { useState } from "react";
// import { useLazyQuery } from "@apollo/client";
// import { FILTER_CUSTOMERS } from "../graphql/queries";

// export default function FilterForm({ setFilters, setCustomers }: any) {
//   const [minSpent, setMinSpent] = useState("");
//   const [minOrders, setMinOrders] = useState("");
//   const [lastDays, setLastDays] = useState("");

//   const [fetchCustomers, { loading, error }] = useLazyQuery(FILTER_CUSTOMERS, {
//     onCompleted: (data) => {
//       setCustomers(data.filterCustomers);
//     },
//   });

//   const handleSubmit = () => {
//     const filters = {
//       minSpent: minSpent ? Number(minSpent) : null,
//       minOrders: minOrders ? Number(minOrders) : null,
//       lastOrderDays: lastDays ? Number(lastDays) : null,
//     };

//     setFilters(filters);
//     fetchCustomers({ variables: { filters } });
//   };

//   return (
//     <div>
//       <h2>Filters</h2>

//       <input
//         placeholder="Min Spent"
//         onChange={(e) => setMinSpent(e.target.value)}
//       />
//       <input
//         placeholder="Min Orders"
//         onChange={(e) => setMinOrders(e.target.value)}
//       />
//       <input
//         placeholder="Last Order Days"
//         onChange={(e) => setLastDays(e.target.value)}
//       />

//       <button onClick={handleSubmit}>Search</button>

//       {loading && <p>Loading...</p>}
//       {error && <p>Error fetching customers</p>}
//     </div>
//   );
// }

import {  useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { FILTER_CUSTOMERS } from "../graphql/queries";

export default function FilterForm({ setFilters, setCustomers }: any) {
  const [minSpent, setMinSpent] = useState("");
  const [minOrders, setMinOrders] = useState("");
  const [lastDays, setLastDays] = useState("");

  const [fetchCustomers, { loading, error }] = useLazyQuery(FILTER_CUSTOMERS, {
    onCompleted: (data) => {
      setCustomers(data.filterCustomers);
      
    },
  });

  

  const handleSubmit = () => {
    const filters = {
      minSpent: minSpent ? Number(minSpent) : null,
      minOrders: minOrders ? Number(minOrders) : null,
      lastOrderDays: lastDays ? Number(lastDays) : null,
    };

    setFilters(filters);

    fetchCustomers({
      variables: { filters },
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
      {/* HEADER */}
      <div className="bg-purple-600 px-6 py-5">
        <h2 className="text-2xl font-bold text-white">Customer Filters</h2>

        <p className="text-purple-100 mt-1 text-sm">
          Filter customers based on spending and orders
        </p>
      </div>

      {/* FORM */}
      <div className="p-6">
        <div className="grid md:grid-cols-3 gap-5">
          {/* MIN SPENT */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Minimum Spent
            </label>

            <input
              type="number"
              placeholder="e.g. 1000"
              value={minSpent}
              onChange={(e) => setMinSpent(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            />
          </div>

          {/* MIN ORDERS */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Minimum Orders
            </label>

            <input
              type="number"
              placeholder="e.g. 5"
              value={minOrders}
              onChange={(e) => setMinOrders(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            />
          </div>

          {/* LAST ORDER DAYS */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Last Order Within Days
            </label>

            <input
              type="number"
              placeholder="e.g. 30"
              value={lastDays}
              onChange={(e) => setLastDays(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            />
          </div>
        </div>

        {/* ACTION BUTTON */}
        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-200"
          >
            Search Customers
          </button>

          {loading && (
            <p className="text-purple-600 font-medium">Loading customers...</p>
          )}

          {error && (
            <p className="text-red-500 font-medium">Error fetching customers</p>
          )}
        </div>
      </div>
    </div>
  );
}
