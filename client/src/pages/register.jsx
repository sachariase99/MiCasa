import { useState, useContext, useEffect } from "react"; // Importing necessary hooks
import { useNavigate, Link } from "react-router-dom"; // Importing routing functionalities
import { useSupabase } from "../supabase/supabaseClient"; // Importing Supabase client
import { AuthContext } from "../context/authContext"; // Importing authentication context

// Main LoginPage component
const LoginPage = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState(null); // State for error messages
  const { isLoggedIn, login } = useContext(AuthContext); // Using AuthContext for login state
  const navigate = useNavigate(); // Hook for navigation

  const { supabase } = useSupabase(); // Getting Supabase instance

  // Effect to redirect if the user is already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/user"); // Redirect to user page
    }
  }, [isLoggedIn, navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(null); // Reset any existing errors

    try {
      // Attempt to sign in with Supabase
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message); // Set error message if sign in fails
      } else {
        login(email); // Update context on successful login
        navigate("/user"); // Redirect to user page
      }
    } catch (error) {
      setError("Error signing in. Please try again."); // Handle any unexpected errors
    }
  };

  return (
    <div className="p-4 mb-8 mx-8 my-24">
      <div>
        <h2 className="text-4xl font-bold mb-2">Login</h2> {/* Login header */}
        <p className="text-xl font-semibold mb-3">Indtast din email og adgangskode for at logge ind</p>
        <form onSubmit={handleSubmit} className="flex flex-col w-1/3"> {/* Form with submit handler */}
          {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error if it exists */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on change
            required
            placeholder="Indtast din email"
            className="hover:bg-[#eee] border-[#C52525] border-[1px] px-2 py-1 w-full mb-2 outline-none shadow-xl"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on change
            required
            placeholder="Indtast din adgangskode"
            className="hover:bg-[#eee] border-[#C52525] border-[1px] px-2 py-1 w-full outline-none shadow-xl"
          />
          <div className="flex flex-row-reverse items-end justify-between mt-4">
            <button
              type="submit" // Button to submit the form
              className="bg-[#F7EBEC] hover:bg-[#DDBDD5] w-1/3 justify-start py-2 rounded-lg uppercase font-bold shadow-xl"
            >
              Log in
            </button>
            <p>
              Not registered yet? <Link to="/register" className="text-blue-400 underline">Register</Link>
            </p> {/* Link to registration page */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage; // Exporting the LoginPage component for use in other parts of the application
