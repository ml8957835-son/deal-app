import { useEffect, useState } from "react";
import axios from "axios";

function MyClaims() {
  const [claims, setClaims] = useState<any[]>([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/claims/${user.id}`
      );

      setClaims(response.data.claims);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-8 py-10">

      <h1 className="text-4xl font-bold mb-8">
        My Claimed Deals
      </h1>

      {claims.length === 0 ? (
        <p className="text-slate-400">
          You haven't claimed any deals yet.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {claims.map((claim: any) => (

            <div
              key={claim.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 p-6"
            >

              <p className="text-blue-400">
                {claim.store}
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                {claim.title}
              </h2>

              <p className="mt-3 text-slate-400">
                {claim.description}
              </p>

              <div className="mt-5 flex justify-between">

                <span className="rounded-lg bg-blue-600 px-3 py-1">
                  {claim.discount}
                </span>

                <span>
                  {claim.category}
                </span>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default MyClaims;