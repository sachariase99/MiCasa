import { useState, useEffect } from "react";
import { useSupabase } from "../supabase/supabaseClient";

const useEstates = () => {
  const { supabase } = useSupabase();
  const [estates, setEstates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEstates = async () => {
      setLoading(true);
      try {
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
              *
            )
          `);

        if (estatesError) throw estatesError;

        const transformedEstates = estatesData.map(estate => ({
          ...estate,
          images: estate.estate_image_rel.map(rel => rel.images ? rel.images.image_url : null),
          energyLabel: estate.energy_labels ? estate.energy_labels.letter : null,
          city: estate.cities ? estate.cities.name : null,
          zipcode: estate.cities ? estate.cities.zipcode : null,
          estateType: estate.estate_types ? estate.estate_types.name : null
        }));

        setEstates(transformedEstates);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEstates();
  }, [supabase]);

  return { estates, loading, error };
};

export default useEstates;
