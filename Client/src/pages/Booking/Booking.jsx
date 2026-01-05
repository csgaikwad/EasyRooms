import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../utils/axios";

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
      const response = await api.get("/booking/" + userId);
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
    <div className="min-h-screen py-8 px-4 lg:px-20 pb-20 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {loading ? (
          <div className="h-screen flex flex-col justify-center items-center gap-6">
            <h1 className="text-3xl font-serif text-pink-600">
              Loading your bookings...
            </h1>
            <img
              className="w-24 h-24 animate-spin"
              src="/loader.svg"
              alt="Loading..."
            />
          </div>
        ) : (
          <>
            {/* Upcoming Bookings */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-8 text-center">
                Upcoming Bookings
              </h2>

              <div className="flex flex-col gap-8">
                {bookingRes.length > 0 ? (
                  bookingRes.map((booking, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col md:flex-row gap-6 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                      onClick={() =>
                        navigate(`/places/${booking.propertyId.id}`)
                      }
                    >
                      <img
                        src={
                          booking.propertyId.propertyPhoto || "/placeholder.jpg"
                        }
                        alt={booking.propertyId.title}
                        className="w-full h-48 md:w-56 md:h-56 object-cover rounded-lg"
                      />
                      <div className="px-6 py-2 flex flex-col justify-center flex-1">
                        <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">
                          {booking.propertyId.title}
                        </h3>
                        <p className="text-lg text-gray-600 mb-1">
                          📍 {booking.propertyId.location}
                        </p>
                        <div className="space-y-2 text-gray-700">
                          <p className="text-base">
                            <span className="font-medium">Check-in:</span>{" "}
                            {new Date(booking.checkIn).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                          <p className="text-base">
                            <span className="font-medium">Check-out:</span>{" "}
                            {new Date(booking.checkOut).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                          <p className="text-base">
                            <span className="font-medium">Guests:</span>{" "}
                            {booking.numGuests}
                          </p>
                          <p className="text-xl font-bold text-green-600 mt-4">
                            Total Paid: ₹
                            {booking.totalAmount.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div
                    className="h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex flex-col justify-center items-center text-center p-8 cursor-pointer hover:shadow-xl transition-shadow"
                    onClick={() => navigate("/")}
                  >
                    <p className="text-3xl font-serif text-gray-700 font-semibold mb-4">
                      No upcoming bookings
                    </p>
                    <p className="text-xl font-serif text-gray-600">
                      Discover amazing properties and plan your next stay!
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Past Bookings Toggle */}
            <div className="flex justify-center my-12">
              <button
                onClick={() => setShowPast(!showPast)}
                className="px-10 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-serif text-xl rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                {showPast ? "✦ Hide Past Bookings ✦" : "✦ View Past Bookings ✦"}
              </button>
            </div>

            {/* Past Bookings */}
            <AnimatePresence>
              {showPast && (
                <motion.section
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.6 }}
                  className="overflow-hidden"
                  ref={pastBookingsRef}
                >
                  <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-8 text-center">
                    Past Bookings
                  </h2>

                  {pastBookings.length > 0 ? (
                    <div className="flex flex-col gap-8">
                      {pastBookings.map((booking, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex flex-col md:flex-row gap-6 bg-gray-50 rounded-2xl shadow-md mb-2 hover:shadow-lg transition-shadow"
                        >
                          <img
                            src={
                              booking.propertyId.propertyPhoto ||
                              "/placeholder.jpg"
                            }
                            alt={booking.propertyId.title}
                            className="w-full h-48 md:w-60 object-cover rounded-xl"
                          />
                          <div className="flex-1 ">
                            <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">
                              {booking.propertyId.title}
                            </h3>
                            <p className="text-gray-600 mb-3">
                              📍 {booking.propertyId.location}
                            </p>
                            <div className="text-gray-600 space-y-1">
                              <p>
                                Check-in:{" "}
                                {new Date(booking.checkIn).toLocaleDateString()}
                              </p>
                              <p>
                                Check-out:{" "}
                                {new Date(
                                  booking.checkOut
                                ).toLocaleDateString()}
                              </p>
                              <p>Guests: {booking.numGuests}</p>
                              <p className="font-semibold text-lg text-gray-800 mt-3">
                                Total Paid: ₹
                                {booking.totalAmount.toLocaleString("en-IN")}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-gray-100 rounded-2xl">
                      <p className="text-2xl font-serif text-gray-600">
                        No past bookings yet
                      </p>
                    </div>
                  )}
                </motion.section>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}
