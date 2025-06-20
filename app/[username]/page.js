"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import pay from "../public/pay.png";

const Username = ({ params }) => {
  const { data: session } = useSession();
  const[animation, setAnimation] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [donations, setDonations] = useState([]);

  // Handle donation submit
  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("/api/donate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message, amount: Number(amount) }),
    });
    console.log(name, message, amount);
    setName("");
    setMessage("");
    setAmount("");
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 2000);
    // Refresh donations after submitting
    fetchDonations();
  }

  // Fetch donations from DB
  const fetchDonations = async () => {
    try {
      const res = await fetch("/api/donations");
      const data = await res.json();
      setDonations(data);
    } catch (err) {
      console.error("Error fetching donations:", err);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <>
      {params.username}
      <div className="cover relative">
        <img
          className="w-full h-[300px]"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeCQjp5OHEMcADUhVtBn8SFCpk5m6qfeiXzQ&s"
          alt=""
        />
        <img
          className="absolute right-[46%] h-[150px] w-[150px] -bottom-14 rounded-full border border-white"
          src={`${session?.user?.image}`}
          alt=""
        />
      </div>

      <div className="flex-col justify-center items-center text-center my-16">
        <div className="text-white font-bold">@ {params.username}</div>
        <div className="text-slate-600">
          donating funds to creators and open sources
        </div>
        <div className="text-white">
          9,176 members . 90 contributors . $13,876 donated
        </div>
      </div>

      <div className="payment flex gap-3 w-[80%] mx-auto">
        {/* Leaderboard */}
        <div className="leaderboard bg-slate-900 w-1/2 text-white p-4 rounded">
          <h2 className="font-bold text-center text-xl mb-3">Supporters</h2>
            <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300 scrollbar-bg-transparent">
            <ul className="space-y-2">
              {[...donations].reverse().map((donation, index) => (
                <li key={index} className="bg-transparent  rounded shadow text-white">
                  <p>
                    <strong>{donation.name}</strong> donated ₹{donation.amount}
                  </p>
                  <p className="text-sm text-gray-600">{donation.message}</p>
                </li>
              ))}
            </ul>
            </div>
        </div>

        {/* Donate Form */}
        <div className="pay bg-slate-900 w-1/2 text-white p-4 rounded">
          <h2 className="font-bold text-center">Donate Here</h2>
          <form className="flex flex-col gap-2 w-[90%] mx-auto" onSubmit={handleSubmit}>
            <input
              type="text"
              className="p-2 mt-2 text-white bg-transparent border-b"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="p-2 text-white bg-transparent border-b"
              placeholder="Enter Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <input
              type="text"
              className="p-2 text-white bg-transparent border-b"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              type="submit"
              className="bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer w-28 self-center mt-4"
            >
              Pay
            </button>
            <div className="flex gap-2 justify-center mt-2">
              {[10, 20, 30].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmount(amt.toString())}
                  className="bg-transparent border border-white font-medium rounded-lg text-sm px-4 py-2 cursor-pointer"
                >
                  Pay ₹{amt}
                </button>
              ))}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Username;
