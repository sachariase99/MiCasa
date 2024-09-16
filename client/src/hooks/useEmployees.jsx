import { useState, useEffect } from "react";
import { useSupabase } from "../supabase/supabaseClient";

const useEmployees = () => {
  const { supabase } = useSupabase();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const { data: employeesData, error: employeesError } = await supabase
          .from('employees')
          .select('*');

        if (employeesError) throw employeesError;

        setEmployees(employeesData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [supabase]);

  return { employees, loading, error };
};

export default useEmployees;
