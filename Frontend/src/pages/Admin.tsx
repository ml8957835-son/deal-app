import { useState, useEffect } from "react";
import axios from "axios";


function Admin() {
  const [title, setTitle] = useState("");
const [store, setStore] = useState("");
const [category, setCategory] = useState("");
const [discount, setDiscount] = useState("");
const [description, setDescription] = useState("");
const [deals, setDeals] = useState([]);
const handleAddDeal = async () => {
  if (
    !title ||
    !store ||
    !category ||
    !discount ||
    !description
  ) {
    alert("Please fill all fields.");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/deals",
      {
        title,
        store,
        category,
        discount,
        description,
      }
    );

    alert(response.data.message);
    await fetchDeals();


    // Clear the form
    setTitle("");
    setStore("");
    setCategory("");
    setDiscount("");
    setDescription("");
  } catch (error) {
    console.error(error);
    alert("Failed to add deal.");
  }
};
useEffect(() => {
  fetchDeals();
}, []);

const fetchDeals = async () => {
  try {
    const response = await axios.get("http://localhost:5000/deals");
    setDeals(response.data.deals);
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6">

        <h1 className="text-3xl font-bold text-blue-500">
          DealHub
        </h1>

        <p className="text-slate-400 mt-1">
          Admin Panel
        </p>

        <nav className="mt-10 space-y-3">

          <button className="w-full rounded-xl bg-blue-600 py-3 font-semibold hover:bg-blue-700 transition">
            Dashboard
          </button>

          <button className="w-full rounded-xl bg-slate-800 py-3 hover:bg-slate-700 transition">
            Deals
          </button>

          <button className="w-full rounded-xl bg-slate-800 py-3 hover:bg-slate-700 transition">
            Users
          </button>

          <button className="w-full rounded-xl bg-slate-800 py-3 hover:bg-slate-700 transition">
            Claims
          </button>

        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">

  {/* Top Navbar */}
<div className="flex items-center justify-between mb-10">

  <div>
    <h1 className="text-4xl font-bold">
      Dashboard
    </h1>

    <p className="text-slate-400 mt-2">
      Welcome back, Admin 👋
    </p>
  </div>

  <div className="flex items-center gap-4">

    <button className="rounded-xl bg-slate-900 border border-slate-700 px-4 py-2 hover:bg-slate-800 transition">
      🔔
    </button>

    <div className="rounded-xl bg-slate-900 border border-slate-700 px-5 py-2">
      <p className="font-semibold">Admin</p>
      <p className="text-sm text-slate-400">
        Administrator
      </p>
    </div>

    <button className="rounded-xl bg-blue-600 px-5 py-2 font-semibold hover:bg-blue-700 transition">
      Logout
    </button>

  </div>

</div>

  {/* Dashboard Cards */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
      <h2 className="text-slate-400">Total Users</h2>
      <p className="text-4xl font-bold mt-3">0</p>
    </div>

    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
      <h2 className="text-slate-400">Total Deals</h2>
      <p className="text-4xl font-bold mt-3">0</p>
    </div>

    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
      <h2 className="text-slate-400">Claimed Deals</h2>
      <p className="text-4xl font-bold mt-3">0</p>
    </div>

  </div>
{/* Add Deal Form */}
<div className="mt-10 rounded-2xl bg-slate-900 border border-slate-800 p-8">

  <h2 className="text-2xl font-bold mb-6">
    Add New Deal
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    <input
  type="text"
  placeholder="Deal Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  className="rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

    <input
  type="text"
  placeholder="Discount"
  value={discount}
  onChange={(e) => setDiscount(e.target.value)}
  className="rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
    <input
  type="text"
  placeholder="Store Name"
  value={store}
  onChange={(e) => setStore(e.target.value)}
  className="rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

    <input
  type="text"
  placeholder="Category"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

  </div>

  <textarea
  placeholder="Deal Description"
  rows={5}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="mt-6 w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

 <button
  onClick={handleAddDeal}
  className="mt-6 rounded-xl bg-blue-600 px-8 py-3 font-semibold hover:bg-blue-700 transition"
>
  Add Deal
</button>

</div>
{/* Current Deals */}
<div className="mt-10 rounded-2xl bg-slate-900 border border-slate-800 p-8">

  <h2 className="text-2xl font-bold mb-6">
    Current Deals
  </h2>

  <table className="w-full">

    <thead>
      <tr className="border-b border-slate-700 text-left">
        <th className="py-3">Title</th>
        <th>Store</th>
        <th>Category</th>
        <th>Discount</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
  {deals.map((deal: any) => (
    <tr key={deal.id} className="border-b border-slate-800">
      <td className="py-4">{deal.title}</td>
      <td>{deal.store}</td>
      <td>{deal.category}</td>
      <td>{deal.discount}</td>

      <td className="space-x-2">
        <button
          className="rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2 text-blue-400 backdrop-blur hover:border-blue-500"
        >
          Edit
        </button>

        <button
          className="rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2 text-red-400 backdrop-blur hover:border-red-500"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

  </table>

</div>
</main>


    </div>
  );
}

export default Admin;