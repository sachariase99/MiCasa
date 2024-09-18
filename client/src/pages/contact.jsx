import { useForm } from "react-hook-form";
import { useState } from "react";
import useEmployees from "../hooks/useEmployees";
import { useSupabase } from "../supabase/supabaseClient";

const Contact = () => {
  const { supabase } = useSupabase();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    employees,
    loading: employeesLoading,
    error: employeesError,
  } = useEmployees();

  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (data) => {
    try {
      const { error } = await supabase
        .from("contact_messages")
        .insert({
          name: data.name,
          email: data.email,
          employee_id: data.employee,
          message: data.message,
        });

      if (error) {
        throw error;
      }

      setSubmitStatus({ type: "success", message: "Besked sendt!" });
      reset();
    } catch (error) {
      console.error("Error inserting contact message:", error.message);
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
              {...register("name", { required: "Navn er påkrævet" })}
              placeholder="Indtast dit navn"
            />
            {errors.name && (
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
              })}
              placeholder="Indtast din email"
            />
            {errors.email && (
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
              })}
            >
              <option value="">Vælg en medarbejder</option>
              {employeesLoading ? (
                <option value="">Indlæser medarbejdere...</option>
              ) : (
                employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.firstname} {employee.lastname}
                  </option>
                ))
              )}
            </select>
            {errors.employee && (
              <p className="text-red-500 text-sm absolute top-0 right-12 -translate-y-1/2 bg-white shadow-xl py-2 px-4 rounded-md">
                {errors.employee.message}
              </p>
            )}
            {employeesError && <p className="text-red-500">{employeesError}</p>}
          </div>

          {/* Message Field */}
          <div className="mb-4 flex items-center justify-between relative">
            <label className="block text-sm font-medium mb-1">Besked</label>
            <textarea
              rows={5}
              className={`w-2/3 p-2 border resize-none ${
                errors.message ? "border-red-500" : "border-gray-300"
              } rounded`}
              {...register("message", { required: "Besked er påkrævet" })}
              placeholder="Indtast din besked"
            />
            {errors.message && (
              <p className="text-red-500 text-sm absolute top-0 right-1/3 translate-x-1/2 -translate-y-1/2 bg-white shadow-xl py-2 px-4 rounded-md">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button and Status Message */}
          <div className="flex items-end justify-end mt-4">
            {submitStatus && (
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

      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2170.2110979755284!2d9.964887877227746!3d57.04792609150054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464932b6a2b7696b%3A0x861634f2bf524040!2s%C3%98ster%20Uttrup%20Vej%201%2C%209000%20Aalborg!5e0!3m2!1sda!2sdk!4v1726639274420!5m2!1sda!2sdk"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[450px]"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
