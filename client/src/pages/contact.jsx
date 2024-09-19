// Importing necessary libraries and hooks
import { useForm } from "react-hook-form"; // Import useForm for form handling
import { useState } from "react"; // Import useState for managing local state
import useEmployees from "../hooks/useEmployees"; // Custom hook to fetch employee data
import { useSupabase } from "../supabase/supabaseClient"; // Import Supabase client for database operations

// Contact component for handling user inquiries
const Contact = () => {
  const { supabase } = useSupabase(); // Get the Supabase client instance

  // Setting up react-hook-form
  const {
    register, // Function to register input fields
    handleSubmit, // Function to handle form submission
    formState: { errors }, // Object containing form validation errors
    reset, // Function to reset the form fields
  } = useForm();

  // Fetching employees using the custom hook
  const {
    employees, // Employee data
    loading: employeesLoading, // Loading state for employees
    error: employeesError, // Error state for employees
  } = useEmployees();

  const [submitStatus, setSubmitStatus] = useState(null); // State to hold submission status

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      // Insert the contact message into the database
      const { error } = await supabase
        .from("contact_messages")
        .insert({
          name: data.name,
          email: data.email,
          employee_id: data.employee,
          message: data.message,
        });

      if (error) {
        throw error; // Throw error if insertion fails
      }

      // Update submission status on success
      setSubmitStatus({ type: "success", message: "Besked sendt!" });
      reset(); // Reset the form fields
    } catch (error) {
      console.error("Error inserting contact message:", error.message);
      // Update submission status on error
      setSubmitStatus({
        type: "error",
        message: "Der opstod en fejl.",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 p-4 mb-8 mx-8 my-24 gap-16">
      <div>
        <h2 className="text-4xl font-bold mb-2">Kontakt os</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {/* Name Field */}
          <div className="mb-4 flex items-center justify-between relative">
            <label className="block text-sm font-medium mb-1">Navn</label>
            <input
              type="text"
              className={`w-2/3 p-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded`}
              {...register("name", { required: "Navn er påkrævet" })} // Registering the name input
              placeholder="Indtast dit navn"
            />
            {errors.name && ( // Display error message if validation fails
              <p className="text-red-500 text-sm absolute top-0 right-1/3 translate-x-1/2 -translate-y-1/2 bg-white shadow-xl py-2 px-4 rounded-md">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4 flex items-center justify-between relative">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className={`w-2/3 p-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded`}
              {...register("email", {
                required: "Email er påkrævet",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Indtast en gyldig email",
                },
              })} // Registering the email input with validation rules
              placeholder="Indtast din email"
            />
            {errors.email && ( // Display error message if validation fails
              <p className="text-red-500 text-sm absolute top-0 right-1/3 translate-x-1/2 -translate-y-1/2 bg-white shadow-xl py-2 px-4 rounded-md">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Employee Select Field */}
          <div className="mb-4 flex items-center justify-between relative">
            <label className="block text-sm font-medium mb-1">
              Vælg medarbejder
            </label>
            <select
              className={`w-2/3 p-2 border ${
                errors.employee ? "border-red-500" : "border-gray-300"
              } rounded bg-white text-black`}
              {...register("employee", {
                required: "Medarbejder er påkrævet",
              })} // Registering the employee select input
            >
              <option value="">Vælg en medarbejder</option>
              {employeesLoading ? ( // Show loading message while fetching employees
                <option value="">Indlæser medarbejdere...</option>
              ) : (
                employees.map((employee) => ( // Map through employees to create options
                  <option key={employee.id} value={employee.id}>
                    {employee.firstname} {employee.lastname}
                  </option>
                ))
              )}
            </select>
            {errors.employee && ( // Display error message if validation fails
              <p className="text-red-500 text-sm absolute top-0 right-12 -translate-y-1/2 bg-white shadow-xl py-2 px-4 rounded-md">
                {errors.employee.message}
              </p>
            )}
            {employeesError && <p className="text-red-500">{employeesError}</p>} {/* Show error if fetching employees fails */}
          </div>

          {/* Message Field */}
          <div className="mb-4 flex items-center justify-between relative">
            <label className="block text-sm font-medium mb-1">Besked</label>
            <textarea
              rows={5}
              className={`w-2/3 p-2 border resize-none ${
                errors.message ? "border-red-500" : "border-gray-300"
              } rounded`}
              {...register("message", { required: "Besked er påkrævet" })} // Registering the message textarea
              placeholder="Indtast din besked"
            />
            {errors.message && ( // Display error message if validation fails
              <p className="text-red-500 text-sm absolute top-0 right-1/3 translate-x-1/2 -translate-y-1/2 bg-white shadow-xl py-2 px-4 rounded-md">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button and Status Message */}
          <div className="flex items-end justify-end mt-4">
            {submitStatus && ( // Display submission status message
              <p
                className={`mr-auto text-lg font-semibold ${
                  submitStatus.type === "success"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {submitStatus.message}
              </p>
            )}
            <button
              type="submit"
              className="bg-[#F7EBEC] hover:bg-[#DDBDD5] w-1/3 py-2 uppercase font-semibold shadow-lg rounded-lg"
            >
              Send
            </button>
          </div>
        </form>
      </div>

      {/* Google Maps iframe for displaying location */}
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2170.2110979755284!2d9.964887877227746!3d57.04792609150054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464932b6a2b7696b%3A0x861634f2bf524040!2s%C3%98ster%20Uttrup%20Vej%201%2C%209000%20Aalborg!5e0!3m2!1sda!2sdk!4v1726639274420!5m2!1sda!2sdk"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[450px]" // Style for iframe
        ></iframe>
      </div>
    </div>
  );
};

// Exporting the Contact component for use in other parts of the application
export default Contact;
