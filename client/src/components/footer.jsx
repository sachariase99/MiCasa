import { useState } from 'react';
import { Link } from "react-router-dom";
import { useSupabase } from '../supabase/supabaseClient';

const Footer = () => {
  const { supabase } = useSupabase();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      const { data, error } = await supabase
        .from('newsletter_emails')
        .insert([{ email }]);

      if (error) {
        throw new Error(error.message);
      }

      setEmail('');
      alert('Tilmeldingen var en succes!');
    } catch (error) {
      alert('Der opstod en fejl, prøv igen.');
    }
  };

  return (
    <footer className="bg-[#1D1E2C] text-white mt-20">
      <h2 className="font-bold text-4xl px-16 py-6">MiCasa</h2>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end px-16 pb-8">
        <div className='flex flex-col'>
          <p>Øster Uttrupvej 5</p>
          <p className="mb-2">9000 Aalborg</p>
          <p>Email: info@homelands.dk</p>
          <p>Telefon: +45 1122 3344</p>
        </div>
        <div className="flex flex-col mt-6 lg:mt-0">
          <Link to="/home">Forside</Link>
          <Link to="/estates">Boliger</Link>
          <Link to="/contact">Kontakt</Link>
          <Link to="/login">Login</Link>
        </div>
        <div className="mt-6 lg:mt-0 lg:text-end flex flex-col">
          <h2 className="text-2xl font-semibold">Få drømmehuset i din indbakke</h2>
          <p>
            Tilmeld dig til vores nyhedsbrev og få nye <br /> boliger sendt
            direkte til din indbakke
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex mt-2 lg:justify-end">
              <span className="bg-[#AC9FBB] h-8 w-8 flex items-center justify-center rounded-l-lg">@</span>
              <input
                className="h-8 pl-3 text-black outline-none"
                type="email"
                placeholder="Indtast din email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="h-8 bg-[#AC9FBB] hover:bg-[#59656F] px-4 rounded-r-lg cursor-pointer"
                type="submit"
                value="Tilmeld"
              />
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
