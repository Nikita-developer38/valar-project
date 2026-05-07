// import { useState } from "react";
// import { useMutation } from "@apollo/client";
// import { UPDATE_TAGS } from "../graphql/mutations";

// export default function TagAction({ filters, setCustomers }: any) {
//   const [tag, setTag] = useState("");
//   const [action, setAction] = useState("ADD");

//   const [updateTags] = useMutation(UPDATE_TAGS);

//   const handlePreview = async () => {
//     if (!tag) {
//       alert("Tag cannot be empty");
//       return;
//     }

//     const res = await updateTags({
//       variables: { tag, action, filters, dryRun: true },
//     });

//     alert(`Will affect ${res.data.updateCustomerTags.affectedCount} customers`);
//   };

//   const handleApply = async () => {
//     const confirm = window.confirm("Are you sure?");
//     if (!confirm) return;

//     await updateTags({
//       variables: { tag, action, filters, dryRun: false },
//     });

//     alert("Tags updated successfully");
//   };

//   return (
//     <div>
//       <h2>Tag Action</h2>

//       <input
//         placeholder="Enter tag"
//         value={tag}
//         onChange={(e) => setTag(e.target.value)}
//       />

//       <select
//         aria-label="Tag Action"
//         onChange={(e) => setAction(e.target.value)}
//       >
//         <option value="ADD">Add</option>
//         <option value="REMOVE">Remove</option>
//       </select>

//       <button onClick={handlePreview}>Preview</button>
//       <button onClick={handleApply}>Apply</button>
//     </div>
//   );
// }


import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_TAGS } from "../graphql/mutations";
import { toast } from "react-toastify";

export default function TagAction({ filters }: any) {
  const [tag, setTag] = useState("");
  const [action, setAction] = useState("ADD");
  const [previewCount, setPreviewCount] = useState<number | null>(null);

  const [updateTags, { loading }] = useMutation(UPDATE_TAGS);

  const handlePreview = async () => {
    if (!tag.trim()) {
      toast.warning("Tag cannot be empty");
      return;
    }

    try {
      const res = await updateTags({
        variables: {
          tag,
          action,
          filters,
          dryRun: true,
        },
      });

      setPreviewCount(res.data.updateCustomerTags.affectedCount);
    } catch (err) {
      console.error(err);
      toast.error("Failed to preview tag action");
    }
  };

  const handleApply = async () => {
    if (!tag.trim()) {
      toast.warning("Tag cannot be empty");
      return;
    }

    const confirmAction = window.confirm(
      `Are you sure you want to ${action} "${tag}" tag?`,
    );

    if (!confirmAction) return;

    try {
      await updateTags({
        variables: {
          tag,
          action,
          filters,
          dryRun: false,
        },
      });

      toast.success("Tags updated successfully");

      setPreviewCount(null);
      setTag("");
    } catch (err) {
      console.error(err);
      toast.warning("Failed to update tags");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
      {/* HEADER */}
      <div className="bg-purple-600 px-6 py-5">
        <h2 className="text-2xl font-bold text-white">Tag Actions</h2>

        <p className="text-purple-100 mt-1 text-sm">
          Add or remove tags from filtered customers
        </p>
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-6">
        {/* INPUTS */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* TAG INPUT */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tag Name
            </label>

            <input
              type="text"
              placeholder="e.g. VIP"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            />
          </div>

          {/* ACTION SELECT */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Action
            </label>

            <select
              aria-label="Tag Action"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition bg-white"
            >
              <option value="ADD">Add Tag</option>
              <option value="REMOVE">Remove Tag</option>
            </select>
          </div>
        </div>

        {/* PREVIEW CARD */}
        {previewCount !== null && (
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
            <p className="text-purple-700 font-semibold text-lg">
              {previewCount} customers will be affected
            </p>

            <p className="text-gray-600 mt-1 text-sm">
              Review carefully before applying changes
            </p>
          </div>
        )}

        {/* BUTTONS */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handlePreview}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition"
          >
            {loading ? "Loading..." : "Preview Changes"}
          </button>

          <button
            onClick={handleApply}
            disabled={loading}
            className="border border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
}