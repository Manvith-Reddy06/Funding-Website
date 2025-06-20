"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const DashboardForm = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setform] = useState({
    name: "",
    email: "",
    username: "",
    profile: "",
    cover: "",
    razorpay: "",
    secret: ""
  });
  console.log(session, "session");

  // useEffect(() => {
  //   if (!session) {
  //     router.push("/login");
  //   }
  // }, [session, router]);
  useEffect(() => {
    if (status === "loading") return;
  
    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form className="max-w-2xl mx-auto bg-gray-900 p-6 rounded-xl shadow-md space-y-4 text-white">
      <h2 className="text-2xl font-bold text-center mb-4">Dashboard Form</h2>

      {Object.entries(form).map(([field, value]) => (
        <div key={field}>
          <label htmlFor={field} className="block mb-1 capitalize">{field}</label>
          <input
            type="text"
            name={field}
            id={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg"
            placeholder={`Enter your ${field}`}
          />
        </div>
      ))}

      <button type="submit" className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
        Save
      </button>
    </form>
  );
};

export default DashboardForm;
