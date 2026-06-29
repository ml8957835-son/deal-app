function Admin() {
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

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Welcome back, Admin 👋
        </p>

      </main>

    </div>
  );
}

export default Admin;