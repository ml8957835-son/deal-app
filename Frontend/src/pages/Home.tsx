import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Home() {
  const [deals, setDeals] = useState([]);
const navigate = useNavigate();
useEffect(() => {
  fetchDeals();
}, []);

const fetchDeals = async () => {
  try {
   const response = await axios.get("http://localhost:5000/deals");

    console.log(response.data);

setDeals(response.data.deals);
  } catch (error) {
    console.error(error);
  }
};
  return (
<div className="min-h-screen bg-slate-950 text-white">

  {/* Navbar */}
  <nav className="border-b border-slate-800 bg-slate-900">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

      <h1 className="text-3xl font-bold text-blue-500">
        DealHub
      </h1>

      <button
  onClick={() => navigate("/my-claims")}
  className="rounded-xl bg-blue-600 px-5 py-2 font-semibold hover:bg-blue-700"
>
  My Claims
</button>

    </div>
  </nav>

  {/* Hero */}

  <section className="mx-auto max-w-7xl px-8 py-12">

    <h1 className="text-5xl font-bold">
      Discover Today's Best Deals
    </h1>

    <p className="mt-4 text-slate-400 text-lg">
      Save money with exclusive discounts from top stores.
      </p>
      <div className="mt-10">
  <input
    type="text"
    placeholder="Search deals..."
    className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>
  

  </section>
<div className="mt-6 flex flex-wrap gap-3">

  <button className="rounded-xl bg-blue-600 px-5 py-2 font-semibold">
    All
  </button>

  <button className="rounded-xl bg-slate-800 px-5 py-2 hover:bg-slate-700">
    Electronics
  </button>

  <button className="rounded-xl bg-slate-800 px-5 py-2 hover:bg-slate-700">
    Fashion
  </button>

  <button className="rounded-xl bg-slate-800 px-5 py-2 hover:bg-slate-700">
    Food
  </button>

  <button className="rounded-xl bg-slate-800 px-5 py-2 hover:bg-slate-700">
    Travel
  </button>

</div>
{/* Deals Grid */}
<div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-6 px-8 md:grid-cols-2 lg:grid-cols-3">

  {deals.map((deal: any) => (

    <div
      key={deal.id}
      className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
    >

      <p className="text-sm text-blue-400">
        {deal.store}
      </p>

      <h2 className="mt-2 text-2xl font-bold">
        {deal.title}
      </h2>

      <p className="mt-2 text-slate-400">
        {deal.description}
      </p>

      <div className="mt-4 flex items-center justify-between">

        <span className="rounded-lg bg-blue-600 px-3 py-1 text-sm font-semibold">
          {deal.discount}
        </span>

        <span className="text-sm text-slate-400">
          {deal.category}
        </span>

      </div>

      <button
  onClick={() => navigate(`/deal/${deal.id}`)}
  className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold hover:bg-blue-700"
>
  View Deal
</button>
    </div>

  ))}

</div>
</div>  );
}

export default Home;