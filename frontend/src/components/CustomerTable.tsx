// export default function CustomerTable({ customers }: any) {
//   if (!customers.length) return <p>No customers found</p>;

//   return (
//     <table border={1} cellPadding={8}>
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Email</th>
//           <th>Spent</th>
//           <th>Orders</th>
//           <th>Last Order</th>
//           <th>Tags</th>
//         </tr>
//       </thead>
//       <tbody>
//         {customers.map((c: any) => (
//           <tr key={c.id}>
//             <td>
//               {c.firstName} {c.lastName}
//             </td>
//             <td>{c.email}</td>
//             <td>{c.amountSpent.amount}</td>
//             <td>{c.numberOfOrders}</td>
//             <td>{c.lastOrderDate}</td>
//             <td>{c.tags.join(", ")}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

import { useState } from "react";

export default function CustomerTable({ customers }: any) {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(customers.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedCustomers = customers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  if (!customers.length) {
    return (
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          No customers found
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-5 border-b bg-purple-600">
        <h2 className="text-2xl font-bold text-white">Customers</h2>

        <span className="bg-white text-purple-700 text-sm font-semibold px-4 py-2 rounded-full">
          {customers.length} Results
        </span>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-purple-50">
            <tr>
              <th className="text-left px-6 py-4">Name</th>
              <th className="text-left px-6 py-4">Email</th>
              <th className="text-left px-6 py-4">Spent</th>
              <th className="text-left px-6 py-4">Orders</th>
              <th className="text-left px-6 py-4">Last Order</th>
              <th className="text-left px-6 py-4">Tags</th>
            </tr>
          </thead>

          <tbody>
            {paginatedCustomers.map((c: any) => (
              <tr key={c.id} className="border-t hover:bg-purple-50 transition">
                <td className="px-6 py-4 font-medium">
                  {c.firstName} {c.lastName}
                </td>

                <td className="px-6 py-4">{c.email}</td>

                <td className="px-6 py-4 text-purple-700 font-semibold">
                  ₹{c.amountSpent.amount}
                </td>

                <td className="px-6 py-4">{c.numberOfOrders}</td>

                <td className="px-4 py-4">{c.lastOrderDate?.split("T")[0]}</td>

                <td className="px-6 py-4">
                  <div className="flex gap-2 flex-wrap">
                    {c.tags.map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-center gap-3 p-5 border-t bg-gray-50">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 rounded-lg border disabled:opacity-50"
        >
          Prev
        </button>

        <span className="font-semibold text-purple-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 rounded-lg border disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
