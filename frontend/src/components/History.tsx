// import { useQuery } from "@apollo/client";
// import { GET_HISTORY } from "../graphql/queries";

// export default function History() {
//   const { data, loading, error } = useQuery(GET_HISTORY);

//   if (loading) return <p>Loading history...</p>;

//   if (error) return <p>Error loading history</p>;

//   return (
//     <div>
//       <h2>History</h2>

//       {data?.getHistory?.length === 0 && <p>No history found</p>}

//       {data?.getHistory?.map((h: any, i: number) => (
//         <div key={i}>
//           <p>
//             {h.timestamp} - {h.action} "{h.tag}" → {h.count} customers
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }


import { useQuery } from "@apollo/client";
import { GET_HISTORY } from "../graphql/queries";

export default function History() {
  const { data, loading, error } = useQuery(GET_HISTORY);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
        <p className="text-purple-600 font-medium text-lg">
          Loading history...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
        <p className="text-red-500 font-medium text-lg">
          Error loading history
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
      {/* HEADER */}
      <div className="bg-purple-600 px-6 py-5">
        <h2 className="text-2xl font-bold text-white">Tag History</h2>

        <p className="text-purple-100 mt-1 text-sm">
          Track all customer tag actions
        </p>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        {data?.getHistory?.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">No history found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data?.getHistory?.map((h: any, i: number) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl p-5 hover:bg-purple-50 transition"
              >
                <div className="flex items-center justify-between flex-wrap gap-3">
                  {/* LEFT */}
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-semibold ${
                          h.action === "ADD"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {h.action}
                      </span>

                      <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-semibold">
                        {h.tag}
                      </span>
                    </div>

                    <p className="text-gray-600 mt-3">
                      Applied to{" "}
                      <span className="font-semibold text-purple-700">
                        {h.count}
                      </span>{" "}
                      customers
                    </p>
                  </div>

                  {/* RIGHT */}
                  <div className="text-sm text-gray-500">
                    {new Date(h.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}