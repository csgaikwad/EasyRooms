import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Booking() {
  const { id: userId } = useParams();
  const [bookingRes, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function getBookings() {
    try {
      const response = await axios.get("/booking/" + userId);
      setBooking(response.data.doc);
      console.log(bookingRes);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getBookings();
    setLoading(false);
    console.log(bookingRes);
  }, [loading]);
  return (
    <div className={`min-h-screen p-10 mb-10  `}>
      <div>
        {loading ? (
          <div className="  h-screen flex justify-center items-center">
            <h1 className="text-pink-600 text-2xl pb-10">Loading...</h1>
            <img className="size-20" src="/loader.svg" alt="Loading..." />
          </div>
        ) : bookingRes.length ? (
          <div className="flex flex-col gap-6 ">
            {bookingRes.map((booking, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-6 bg-gray-100 rounded-lg hover:scale-[101%] cursor-pointer duration-200"
                onClick={() => {
                  navigate(`/places/${booking.propertyId.id}`);
                }}
              >
                <img
                  className="size-32 md:size-64 rounded-lg"
                  src={`${booking.propertyId.propertyPhoto}`}
                  alt="image"
                />
                <div className="px-4 md:px-0 py-4 flex flex-col gap-2">
                  <p className="text-xl md:text-2xl font-serif text-gray-600 font-semibold">
                    {" "}
                    {booking.propertyId.title}
                  </p>
                  <p className="text-lg font-serif text-gray-600 font-semibold">
                    {" "}
                    {booking.propertyId.location}
                  </p>
                  <p className="text-xl font-serif text-gray-600 ">
                    From : {booking.checkIn.slice(0, 10)}
                  </p>
                  <p className="text-xl font-serif text-gray-600 ">
                    To : {booking.checkOut.slice(0, 10)}
                  </p>
                  <p className="text-xl font-serif text-gray-600 ">
                    Number of Guests : {booking.numGuests}
                  </p>
                  <p className="text-xl font-serif text-gray-600 font-semibold">
                    {" "}
                    {booking.totalAmount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="h-screen flex flex-col justify-center items-center pb-10"
            onClick={() => navigate("/")}
          >
            <p className="text-[2rem] font-serif text-gray-600 font-semibold">
              No bookings found
            </p>
            <p className="text-[2rem] font-serif text-gray-600 font-semibold">
              Click here to book some properties
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
