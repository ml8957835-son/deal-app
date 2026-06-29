import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function DealDetail() {
  const { id } = useParams();

  const [deal, setDeal] = useState<any>(null);

  useEffect(() => {
    fetchDeal();
  }, []);

  const fetchDeal = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/deals/${id}`
      );

      setDeal(response.data.deal);
    } catch (error) {
      console.error(error);
    }
  };

  if (!deal) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-8 py-12">

      <Link
        to="/"
        className="text-blue-400 hover:text-blue-300"
      >
        ← Back
      </Link>

      <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 p-8">

        <p className="text-blue-400">
          {deal.store}
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          {deal.title}
        </h1>

        <p className="mt-6 text-slate-300">
          {deal.description}
        </p>

        <div className="mt-8 flex items-center justify-between">

          <span className="rounded-lg bg-blue-600 px-4 py-2 font-semibold">
            {deal.discount}
          </span>

          <span className="text-slate-400">
            {deal.category}
          </span>

        </div>

        <button className="mt-10 w-full rounded-xl bg-green-600 py-3 font-semibold hover:bg-green-700">
          Claim Deal
        </button>

      </div>

    </div>
  );
}

export default DealDetail;