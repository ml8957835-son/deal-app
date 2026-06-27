import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; 
function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/register",
      {
        fullName,
        email,
        username,
        password,
      }
    );

    alert(response.data.message);
  } catch (error) {
    console.error(error);
    alert("Registration failed");
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-slate-900/90 backdrop-blur-md border border-slate-700 p-10 shadow-[0_25px_80px_rgba(0,0,0,0.6)]">

        <h1 className="text-center text-4xl font-extrabold text-white tracking-tight">
          Create Account
        </h1>

        <p className="mt-3 text-center text-slate-400">
          Join DealHub and start saving today.
        </p>

<form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Full Name
            </label>
            <input
           type="text"
           placeholder="John Doe"
           value={fullName}
           onChange={(e) => setFullName(e.target.value)}
           className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Email
            </label>
            <input
            type="email"
            placeholder="john@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="john123"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Password
            </label>
            <input
            type="password"
  placeholder="••••••••"
   value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Confirm Password
            </label>
            <input
  type="password"
  placeholder="••••••••"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
          </div>
          {/* Register Button */}
<button
  type="submit"
  className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-95"
>
  Create Account
</button>

<p className="text-center text-slate-400">
  Already have an account?{" "}
  <Link
    to="/login"
    className="font-semibold text-blue-400 hover:text-blue-300"
  >
    Login
  </Link>
   </p>

   </form>


     </div>
    </div>
  );
}

export default Register;