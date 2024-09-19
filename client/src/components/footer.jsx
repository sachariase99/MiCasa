// Importing necessary hooks and components
import { useState } from 'react'; // useState hook for managing state
import { Link } from "react-router-dom"; // Link for navigation
import { useSupabase } from '../supabase/supabaseClient'; // Custom hook to access Supabase client

// Footer functional component
const Footer = () => {
  const { supabase } = useSupabase(); // Accessing Supabase client
  const [email, setEmail] = useState(''); // State for managing email input

  // Async function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    if (!email) return; // Condition to ensure email is provided

    try {
      // Inserting the email into the newsletter_emails table
      const { data, error } = await supabase
        .from('newsletter_emails')
        .insert([{ email }]); // Using destructuring assignment to get data and error

      // Handling error if insert operation fails
      if (error) {
        throw new Error(error.message); // Throwing an error with message
      }

      setEmail(''); // Resetting the email input after successful submission
      alert('Tilmeldingen var en succes!'); // Alert for successful subscription
    } catch (error) {
      alert('Der opstod en fejl, prøv igen.'); // Alert for errors
    }
  };

  return (
    <footer className="bg-[#1D1E2C] text-white mt-20">
      <h2 className="font-bold text-4xl px-16 py-6">MiCasa</h2>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end px-16 pb-8">
        <div className='flex flex-col'>
          <p>Øster Uttrupvej 5</p> {/* Address line */}
          <p className="mb-2">9000 Aalborg</p> {/* City and postal code */}
          <p>Email: info@homelands.dk</p> {/* Contact email */}
          <p>Telefon: +45 1122 3344</p> {/* Contact phone number */}
        </div>
        <div className="flex flex-col mt-6 lg:mt-0">
          {/* Navigation links to different pages */}
          <Link to="/home">Forside</Link>
          <Link to="/estates">Boliger</Link>
          <Link to="/contact">Kontakt</Link>
          <Link to="/login">Login</Link>
        </div>
        <div className="mt-6 lg:mt-0 lg:text-end flex flex-col">
          <h2 className="text-2xl font-semibold">Få drømmehuset i din indbakke</h2> {/* Newsletter heading */}
          <p>
            Tilmeld dig til vores nyhedsbrev og få nye <br /> boliger sendt
            direkte til din indbakke {/* Newsletter description */}
          </p>
          <form onSubmit={handleSubmit}> {/* Form for email subscription */}
            <div className="flex mt-2 lg:justify-end">
              <span className="bg-[#AC9FBB] h-8 w-8 flex items-center justify-center rounded-l-lg">@</span>
              <input
                className="h-8 pl-3 text-black outline-none" // Styling for email input
                type="email"
                placeholder="Indtast din email" // Placeholder for email input
                value={email} // Controlled component value
                onChange={(e) => setEmail(e.target.value)} // Updating state on input change
                required // Making the input required
              />
              <input
                className="h-8 bg-[#AC9FBB] hover:bg-[#59656F] px-4 rounded-r-lg cursor-pointer" // Styling for submit button
                type="submit"
                value="Tilmeld" // Button text
              />
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
};

// Exporting the Footer component as a module for use in other parts of the application
export default Footer;
