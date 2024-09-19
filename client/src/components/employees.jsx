// Importing the custom hook for fetching employee data
import useEmployees from "../hooks/useEmployees"; // Using the useEmployees hook to access employee data

// Employees functional component
const Employees = () => {
  // Destructuring employees, loading, and error from the useEmployees hook
  const { employees, loading, error } = useEmployees();

  // Conditions to handle loading and error states
  if (loading) return <div>Loading...</div>; // Displays loading text while fetching data
  if (error) return <div>Error: {error}</div>; // Displays error message if there was an issue

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center mt-32 mb-8">
        Mød vores ansatte {/* Heading for the employees section */}
      </h2>
      {/* Unordered list to display employee cards */}
      <ul className="w-3/4 m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {/* Iterating over employees to create a list item for each */}
        {employees.map((employee) => (
          <li
            key={employee.id} // Unique key for each list item
            className="border-[1px] border-black overflow-hidden group select-none" // Styles for the list item
          >
            <div className="h-[300px] relative flex flex-col items-center">
              <img
                src={employee.image_url} // Image source for employee profile
                alt={employee.firstname} // Alt text for accessibility
                className="h-full w-auto object-cover" // Styles for the image
              />
              <div className="absolute bottom-0 bg-[#1D1E2C] w-full bg-opacity-90 py-2 px-4 text-white transition-all duration-300">
                <p>
                  {employee.firstname} {employee.lastname} {/* Displaying employee's full name */}
                </p>
                <p className="capitalize text-sm">{employee.position}</p> {/* Displaying employee's position */}
                <div className="hidden group-hover:block transition-all duration-300">
                  {/* Hidden details that appear on hover */}
                  <p className="text-sm mt-2">{employee.email}</p> {/* Displaying employee's email */}
                  <p className="text-sm">{employee.phone}</p> {/* Displaying employee's phone number */}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Exporting the Employees component as a module for use in other parts of the application
export default Employees;
