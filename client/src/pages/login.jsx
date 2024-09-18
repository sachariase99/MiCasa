import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSupabase } from "../supabase/supabaseClient";
import { AuthContext } from "../context/authContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { isLoggedIn, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { supabase } = useSupabase();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/user");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        login(email);
        navigate("/user");
      }
    } catch (error) {
      setError("Error signing in. Please try again.");
    }
  };

  return (
    <div className="p-4 mb-8 mx-8 my-24">
      <div>
        <h2 className="text-4xl font-bold mb-2">Login</h2>
        <p className="text-xl font-semibold mb-3">Indtast din email og adgangskode for at logge ind</p>
        <form onSubmit={handleSubmit} className="flex flex-col w-1/3">
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Indtast din email"
            className="hover:bg-[#eee] border-[#C52525] border-[1px] px-2 py-1 w-full mb-2 outline-none shadow-xl"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Indtast din adgangskode"
            className="hover:bg-[#eee] border-[#C52525] border-[1px] px-2 py-1 w-full outline-none shadow-xl"
          />
          <div className="flex flex-row-reverse items-end justify-between mt-4">
            <button
              type="submit"
              className="bg-[#F7EBEC] hover:bg-[#DDBDD5] w-1/3 justify-start py-2 border-[#C52525] border-[1px] uppercase font-bold shadow-xl"
            >
              Log in
            </button>
            <p>
              Not registered yet? <Link to="/register" className="text-blue-400 underline">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
