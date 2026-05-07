import { useState } from "react";
import FilterForm from "./components/FilterForm";
import CustomerTable from "./components/CustomerTable";
import TagAction from "./components/TagAction";
import History from "./components/History";
import { useQuery } from "@apollo/client";
import { FILTER_CUSTOMERS } from "./graphql/queries";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type TabType = "customer" | "filter" | "history";

function App() {
  const [filters, setFilters] = useState<any>(null);
  const [customers, setCustomers] = useState<any[]>([]);
  const [allCustomers, setAllCustomers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>("customer");

  const { loading } = useQuery(FILTER_CUSTOMERS, {
    variables: {
      filters: {},
    },
    onCompleted: (data) => {
      setAllCustomers(data.filterCustomers);
    },
  });

  return (
    <>
      <div className="h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex overflow-hidden">
        <div className="w-[25%] h-screen bg-gradient-to-b from-purple-600 to-purple-900 text-white p-8 shadow-2xl flex flex-col ">
          <div className="mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight">
              Valar Admin
            </h1>

            <p className="text-purple-200 mt-3 text-sm leading-relaxed">
              Customer segmentation & tag management dashboard
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => setActiveTab("customer")}
              className={`text-left px-5 py-4 rounded-2xl transition-all duration-200 font-semibold ${
                activeTab === "customer"
                  ? "bg-white text-purple-700 shadow-lg"
                  : "bg-purple-800/40 hover:bg-purple-700 text-purple-100"
              }`}
            >
              All Customers
            </button>
            <button
              onClick={() => setActiveTab("filter")}
              className={`text-left px-5 py-4 rounded-2xl transition-all duration-200 font-semibold ${
                activeTab === "filter"
                  ? "bg-white text-purple-700 shadow-lg"
                  : "bg-purple-800/40 hover:bg-purple-700 text-purple-100"
              }`}
            >
              Filter Customers
            </button>

            <button
              onClick={() => setActiveTab("history")}
              className={`text-left px-5 py-4 rounded-2xl transition-all duration-200 font-semibold ${
                activeTab === "history"
                  ? "bg-white text-purple-700 shadow-lg"
                  : "bg-purple-800/40 hover:bg-purple-700 text-purple-100"
              }`}
            >
              History
            </button>
          </div>
        </div>

        <div className="w-[75%] h-screen overflow-y-auto p-8">
          <div className="mb-8">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
              Customer Segmentation Tool
            </h1>

            <p className="text-gray-600 mt-3 text-lg">
              Manage customer filters, bulk tag operations, and activity history
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-purple-100 p-6">
            {activeTab === "customer" && (
              <div className="space-y-6">
                <CustomerTable customers={allCustomers} />
              </div>
            )}

            {activeTab === "filter" && (
              <div className="space-y-6">
                <FilterForm
                  setFilters={setFilters}
                  setCustomers={setCustomers}
                />
                <TagAction filters={filters} setCustomers={setCustomers} />
                <CustomerTable customers={customers} />
              </div>
            )}

            {activeTab === "history" && (
              <div className="space-y-6">
                <History />
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
