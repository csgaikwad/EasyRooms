import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BookingWidget(props) {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [numGuests, setNumGuests] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    setCheckIn(today);
    setCheckOut(tomorrow);
  }, []);

  const handleCheckInChange = (date) => {
    setCheckIn(date);
    // Reset check-out date if it's before the selected check-in date
    if (checkOut < date) {
      setCheckOut(null);
    }
  };

  const handleCheckOutChange = (date) => {
    // Prevent selection of past dates and dates beyond 3 months
    const today = new Date();
    const threeMonthsLater = new Date(
      today.getTime() + 90 * 24 * 60 * 60 * 1000
    );
    if (date >= today && date <= threeMonthsLater) {
      setCheckOut(date);
    } else {
      alert("Please select a date within the next 3 months.");
    }
  };

  const handleBook = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/processPayment", {
        totalAmount: totalAmount,
      });

      var options = {
        key: response.data.key,
        amount: response.data.amount,
        currency: "INR",
        name: "Air Corp",
        description:
          "Stay like a local, anywhere you go - Air Corp, where every stay is a new adventure.",
        image: "/logo2.svg",
        order_id: response.data.order.id,
        handler: function (response) {
          axios.post("/verify", { response: response }).then((res) => {
            if (res.data) {
              axios
                .post("/booking", {
                  checkIn: checkIn.toISOString(),
                  checkOut: checkOut.toISOString(),
                  numGuests: numGuests,
                  totalAmount: totalAmount,
                  propertyId: props.propertyId,
                  userId: props.userId,
                })
                .then((res) => {
                  navigate("/booking/" + props.userId);
                })
                .catch((err) => {
                  alert(err);
                });
            }
          });
        },

        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#EF4444",
        },
        modal: {
          width: "1000px",
          height: "600px",
        },
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        console.log(response.error.code);
      });

      rzp1.open();
    } catch (error) {
      console.error("Error booking:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Calculate total amount based on check-in, check-out, number of guests, and price
    if (checkIn && checkOut && numGuests && props.price) {
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      const total = nights * numGuests * props.price;
      setTotalAmount(total);
    } else {
      setTotalAmount(0);
    }
  }, [checkIn, checkOut, numGuests, props.price]);

  return (
    <div className="flex flex-col justify-center items-center py-5">
      <h1 className=" text-xl lg:text-[2rem] font-sans font-semibold mb-4 text-center">
        <span className=" text-yellow-500 font-serif">🎉10% off🎉 </span> <br />
        <br />
        <p className="line-through text-gray-800 text-[1.5rem] mb-0">
          ₹{parseInt(props.price + props.price * 0.1)}{" "}
          <span className="text-gray-700 ">per night</span>
        </p>
        <br />
        <p className="">
          ₹{parseInt(props.price)}{" "}
          <span className="text-gray-700 lg:text-2xl  font-serif">
            per night
          </span>
        </p>
      </h1>
      <div className="mb-4 w-full flex flex-col items-center justify-center ">
        <div className="flex flex-col my-4 items-center">
          <label
            htmlFor="check-in"
            className="text-lg font-semibold text-gray-700 my-1"
          >
            Check In
          </label>
          <DatePicker
            selected={checkIn}
            onChange={handleCheckInChange}
            className="border border-gray-300 rounded-md p-2 cursor-pointer"
            placeholderText="Select Check In Date"
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            maxDate={new Date(new Date().getTime() + 90 * 24 * 60 * 60 * 1000)}
          />
        </div>
        <div className="flex flex-col my-4 items-center">
          <label
            htmlFor="check-out"
            className="text-lg font-semibold text-gray-700 my-1 "
          >
            Check Out
          </label>
          <DatePicker
            selected={checkOut}
            onChange={handleCheckOutChange}
            className="border border-gray-300 rounded-md p-2 cursor-pointer"
            placeholderText="Select Check Out Date"
            dateFormat="dd/MM/yyyy"
            minDate={checkIn} // Prevent selection of dates before the selected check-in date
            maxDate={new Date(new Date().getTime() + 90 * 24 * 60 * 60 * 1000)}
          />
        </div>
        <div className="flex flex-col my-4 items-center justify-center md:min-w-96">
          <label className="text-lg font-semibold text-gray-700 my-1">
            Number Of Guests
          </label>
          <h4 className="mb-2 text-sm font-semibold text-red-400">
          * Max Guests : {props.numberOfGuests} *
        </h4>
          <div className="flex justify-center w-full gap-2 mt-2 ">
            <button
              className=" rounded-full p-2 cursor-pointer bg-gray-400 shadow-sm outline-none  size-10  hover:scale-105 duration-300 "
              onClick={() =>
                setNumGuests((prevNumGuests) => Math.max(1, prevNumGuests - 1))
              }
            >
              <img className="" src="/minus.svg" alt="-" />
            </button>
            <div className="border-2 border-gray-300 rounded-full  cursor-default w-11 bg-gray-50 text-center p-2  shadow-sm   ">
              {numGuests}
            </div>
            <button
              className=" rounded-full p-2 cursor-pointer bg-gray-400 shadow-sm outline-none size-10  hover:scale-105 duration-300 "
              onClick={() =>
                setNumGuests((prevNumGuests) =>
                  Math.min(props.numberOfGuests, prevNumGuests + 1)
                )
              }
            >
              <img src="/plus.svg" alt="+" />
            </button>
          </div>
        </div>

        <h1 className="flex justify-center text-2xl font-semibold text-gray-700 pl-3 m-1 underline">
          Total Amount: ₹ {totalAmount}
        </h1>
      </div>
      <button
        className="basicButton bg-red-500"
        onClick={handleBook}
        disabled={loading || !checkIn || !checkOut || numGuests < 1}
      >
        {loading ? "Booking..." : "Book Now"}
      </button>
    </div>
  );
}
