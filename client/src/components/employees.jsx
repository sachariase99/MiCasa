import useEmployees from "../hooks/useEmployees";

const Employees = () => {
  const { employees, loading, error } = useEmployees();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center mt-32 mb-8">
        Mød vores ansatte
      </h2>
      <ul className="w-3/4 m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {employees.map((employee) => (
          <li
            key={employee.id}
            className="border-[1px] border-black overflow-hidden group select-none"
          >
            <div className="h-[300px] relative flex flex-col items-center">
              <img
                src={employee.image_url}
                alt={employee.firstname}
                className="h-full w-auto object-cover"
              />
              <div className="absolute bottom-0 bg-[#1D1E2C] w-full bg-opacity-90 py-2 px-4 text-white transition-all duration-300">
                <p>
                  {employee.firstname} {employee.lastname}
                </p>
                <p className="capitalize text-sm">{employee.position}</p>
                <div className="hidden group-hover:block transition-all duration-300">
                  <p className="text-sm mt-2">{employee.email}</p>
                  <p className="text-sm">{employee.phone}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Employees;
