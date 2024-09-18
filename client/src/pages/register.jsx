import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSupabase } from "../supabase/supabaseClient";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { supabase } = useSupabase();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setError("Error registering. Please try again.");
    }
  };

  return (
    <div className="p-4 mb-8 mx-8 my-24">
      <div>
        <h2 className="text-4xl font-bold mb-2">Register</h2>
        <p className="text-xl font-semibold mb-3">
          Indtast din email og adgangskode for at registrere
        </p>
        <form onSubmit={handleRegister} className="flex flex-col w-1/3">
          {error && <p style={{ color: "red" }}>{error}</p>}
          {successMessage && (
            <p className="text-green absolute top-2 left-1/2 -translate-x-1/2 bg-[#c2c2c2] py-2 px-4">
              {successMessage}
            </p>
          )}
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Indtast din email"
            className="hover:bg-[#eee] border-[#C52525] border-[1px] px-2 py-1 w-full mb-2 outline-none shadow-xl"
          />

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            placeholder="Indtast din adgangskode"
            className="hover:bg-[#eee] border-[#C52525] border-[1px] px-2 py-1 w-full outline-none shadow-xl"
          />

          <div className="flex flex-row-reverse items-end justify-between mt-4">
            <button
              type="submit"
              className="bg-[#F7EBEC] hover:bg-[#DDBDD5] w-1/3 justify-start py-2 border-[#C52525] border-[1px] uppercase font-bold shadow-xl"
            >
              Register
            </button>
            <p>
              Already registered?{" "}
              <Link to="/login" className="text-blue-400 underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
