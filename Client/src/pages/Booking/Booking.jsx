import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Booking() {
  const { id: userId } = useParams();
  const [bookingRes, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pastBookings, setPastBookings] = useState([]);
  const [showPast, setShowPast] = useState(false);
  const navigate = useNavigate();
  const pastBookingsRef = useRef(null);

  async function getBookings() {
    try {
      const response = await axios.get("/booking/" + userId);
      const bookings = response.data.doc;

      const today = new Date().toISOString().split("T")[0];
      const upcoming = bookings.filter((booking) => booking.checkOut >= today);
      const past = bookings.filter((booking) => booking.checkOut < today);

      setBooking(upcoming);
      setPastBookings(past);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getBookings();
  }, [userId]);

  useEffect(() => {
    if (showPast && pastBookingsRef.current) {
      setTimeout(() => {
        pastBookingsRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }, 1);
    }
  }, [showPast]);

  return (
    <div className={`min-h-screen p-10 mb-10 lg:px-52 `}>
      <div>
        {loading ? (
          <div className="  h-screen flex justify-center items-center">
            <h1 className="text-pink-600 text-2xl pb-10">Loading...</h1>
            <img className="size-20" src="/loader.svg" alt="Loading..." />
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-6">
              {bookingRes.length ? (
                bookingRes.map((booking, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row gap-6 h-48 bg-gray-100 rounded-lg hover:scale-[102%] cursor-pointer duration-200"
                    onClick={() => navigate(`/places/${booking.propertyId.id}`)}
                  >
                    <img
                      className="size-full md:size-48 rounded-lg "
                      src={`${booking.propertyId.propertyPhoto}`}
                      alt="image"
                    />
                    <div className=" py-4 flex flex-col gap-1 text-left ">
                      <p className="text-xl font-serif text-gray-600 font-semibold">
                        {booking.propertyId.title}
                      </p>
                      <p className="text-md font-serif text-gray-600 font-semibold">
                        {booking.propertyId.location}
                      </p>
                      <p className="text-md font-serif text-gray-600">
                        From : {booking.checkIn.slice(0, 10)}
                      </p>
                      <p className="text-md font-serif text-gray-600">
                        To : {booking.checkOut.slice(0, 10)}
                      </p>
                      <p className="text-md font-serif text-gray-600">
                        Number of Guests : {booking.numGuests}
                      </p>
                      <p className="text-md font-serif text-gray-600 font-semibold">
                        Total ₹{booking.totalAmount} Paid
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  className="h-[18rem] bg-gray-200 flex flex-col justify-center items-center text-center pb-10 cursor-pointer rounded-md"
                  onClick={() => navigate("/")}
                >
                  <p className="text-[1.8rem] font-serif text-gray-600 font-semibold">
                    No bookings found
                  </p>
                  <p className="text-[1.8rem] font-serif text-gray-600 font-semibold">
                    Click here to see some properties
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-8">
              <div className="flex justify-center " ref={pastBookingsRef}>
                <button
                  className="flex justify-center items-center h-12  w-80 bg-red-500  rounded-md text-[1rem] font-serif text-white font-semibold hover:scale-105 duration-300"
                  onClick={() => {
                    setShowPast(!showPast);
                  }}
                >
                  {showPast
                    ? "✮ Hide Past Bookings ✮"
                    : "✮ Show Past Bookings ✮"}
                </button>
              </div>
              <AnimatePresence>
                {showPast && pastBookings.length > 0 && (
                  <motion.div
                    className="mt-4 flex flex-col gap-6 overflow-hidden"
                    initial={{ scale: 0, height: 0 }}
                    animate={{ scale: 1, height: "auto" }}
                    exit={{ scale: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {pastBookings.map((booking, index) => (
                      <div
                        key={index}
                        className="flex flex-col md:flex-row gap-6 h-48 bg-gray-100 rounded-lg cursor-pointer hover:scale-[97%] duration-200"
                      >
                        <img
                          className="size-full md:size-48 rounded-lg"
                          src={`${booking.propertyId.propertyPhoto}`}
                          alt="image"
                        />
                        <div className=" py-3 flex flex-col gap-1 text-left">
                          <p className="text-xl font-serif text-gray-600 font-semibold">
                            {booking.propertyId.title}
                          </p>
                          <p className="text-md font-serif text-gray-600 font-semibold">
                            {booking.propertyId.location}
                          </p>
                          <p className="text-md font-serif text-gray-600">
                            From : {booking.checkIn.slice(0, 10)}
                          </p>
                          <p className="text-md font-serif text-gray-600">
                            To : {booking.checkOut.slice(0, 10)}
                          </p>
                          <p className="text-md font-serif text-gray-600">
                            Number of Guests : {booking.numGuests}
                          </p>
                          <p className="text-md font-serif text-gray-600 font-semibold">
                            Total ₹{booking.totalAmount} Paid
                          </p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
