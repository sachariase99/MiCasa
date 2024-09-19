// Importing React and necessary hooks from React Router and Supabase
import React, { useState } from "react"; // React and useState hook for state management
import { Link, useNavigate } from "react-router-dom"; // Link for navigation and useNavigate for programmatic navigation
import { useSupabase } from "../supabase/supabaseClient"; // Custom hook to access Supabase client

// RegisterPage component for user registration
const RegisterPage = () => {
  // State variables for email, password, error, and success messages
  const [email, setEmail] = useState(""); // Email state with initial empty string
  const [password, setPassword] = useState(""); // Password state with initial empty string
  const [error, setError] = useState(null); // Error state initialized to null
  const [successMessage, setSuccessMessage] = useState(null); // Success message state initialized to null
  
  // Using Supabase client from context
  const { supabase } = useSupabase();
  
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle registration
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    setError(null); // Resetting error state
    setSuccessMessage(null); // Resetting success message state

    try {
      // Calling Supabase's signUp method
      const { error } = await supabase.auth.signUp({
        email, // Using destructure assignment to access the email state
        password, // Using destructure assignment to access the password state
      });

      // Handling potential errors
      if (error) {
        setError(error.message); // Updating error state with the error message
      } else {
        setSuccessMessage("Registration successful! Redirecting to login..."); // Setting success message
        setTimeout(() => {
          navigate("/login"); // Redirecting to login page after 2 seconds
        }, 2000);
      }
    } catch (error) {
      // Catching any other errors
      setError("Error registering. Please try again."); // Setting error state
    }
  };

  return (
    <div className="p-4 mb-8 mx-8 my-24"> {/* Container for the form */}
      <div>
        <h2 className="text-4xl font-bold mb-2">Register</h2> {/* Title */}
        <p className="text-xl font-semibold mb-3">
          Indtast din email og adgangskode for at registrere {/* Instruction */}
        </p>
        <form onSubmit={handleRegister} className="flex flex-col w-1/3"> {/* Form for registration */}
          {error && <p style={{ color: "red" }}>{error}</p>} {/* Conditional rendering for error message */}
          {successMessage && (
            <p className="text-green absolute top-2 left-1/2 -translate-x-1/2 bg-[#c2c2c2] py-2 px-4">
              {successMessage} {/* Conditional rendering for success message */}
            </p>
          )}
          {/* Email input field */}
          <input
            id="email"
            type="email"
            value={email} // Binding input value to state
            onChange={(e) => setEmail(e.target.value)} // Updating state on input change
            required // HTML5 validation
            placeholder="Indtast din email"
            className="hover:bg-[#eee] border-[#C52525] border-[1px] px-2 py-1 w-full mb-2 outline-none shadow-xl"
          />

          {/* Password input field */}
          <input
            id="password"
            type="password"
            value={password} // Binding input value to state
            onChange={(e) => setPassword(e.target.value)} // Updating state on input change
            required // HTML5 validation
            minLength="6" // Minimum password length
            placeholder="Indtast din adgangskode"
            className="hover:bg-[#eee] border-[#C52525] border-[1px] px-2 py-1 w-full outline-none shadow-xl"
          />

          {/* Buttons and link to login page */}
          <div className="flex flex-row-reverse items-end justify-between mt-4">
            <button
              type="submit" // Button to submit the form
              className="bg-[#F7EBEC] hover:bg-[#DDBDD5] w-1/3 justify-start py-2 rounded-lg uppercase font-bold shadow-xl"
            >
              Register
            </button>
            <p>
              Already registered?{" "}
              <Link to="/login" className="text-blue-400 underline">
                Login {/* Link to login page */}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage; // Exporting the RegisterPage component
