// src/hooks/useEstates.js
import { useState, useEffect } from "react";
import { useSupabase } from "../supabase/supabaseClient";

const useEstates = (query) => {
  const { supabase } = useSupabase();
  const [estates, setEstates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEstates = async () => {
      setLoading(true);
      try {
        // Ensure query is a string
        const searchQuery = query ? query.toLowerCase() : "";

        // Fetch estates data
        const { data: estatesData, error: estatesError } = await supabase
          .from('estates')
          .select(`
            *,
            estate_image_rel (
              image_id,
              images (
                image_url
              )
            ),
            energy_labels (
              letter
            ),
            cities (
              name,
              zipcode
            ),
            estate_types (
              name
            ),
            employees (
              *
            )
          `);

        if (estatesError) throw estatesError;

        // Filter estates data
        const filteredEstates = estatesData.filter(estate => {
          const addressMatch = estate.address?.toLowerCase().includes(searchQuery);

          const cityMatch = estate.cities?.name?.toLowerCase().includes(searchQuery);
          const estateTypeMatch = estate.estate_types?.name?.toLowerCase().includes(searchQuery);

          return addressMatch || cityMatch || estateTypeMatch;
        });

        // Transform estates data
        const transformedEstates = filteredEstates.map(estate => ({
          ...estate,
          images: estate.estate_image_rel?.map(rel => rel.images?.image_url || null) || [],
          energyLabel: estate.energy_labels?.letter || null,
          city: estate.cities?.name || null,
          zipcode: estate.cities?.zipcode || null,
          estateType: estate.estate_types?.name || null,
          employee: estate.employees || null
        }));

        setEstates(transformedEstates);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEstates();
  }, [supabase, query]);

  return { estates, loading, error };
};

export default useEstates;
