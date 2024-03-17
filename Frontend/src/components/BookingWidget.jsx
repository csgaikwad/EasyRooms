import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingWidget(props) {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [numGuests, setNumGuests] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const today = new Date();
    const threeMonthsLater = new Date(
      today.getTime() + 90 * 24 * 60 * 60 * 1000
    );

    setCheckIn(today);
    setCheckOut(today);
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

  const handleNumGuestsChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value <= props.numberOfGuests) {
      setNumGuests(value);
      calculateTotalAmount(checkIn, checkOut, value);
    }
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
    <div className="flex flex-col items-center py-10">
      <h1 className="self-center text-[2rem] font-sans font-semibold mb-4">
        <span className="line-through text-gray-800">
          ${parseInt(props.price + props.price * 0.1)}
        </span>{" "}
        <span className=""> ${parseInt(props.price)} </span>
        <span className="text-gray-700 text-2xl font-normal font-serif">
          night
        </span>{" "}
      </h1>
      <div className="mb-4">
        <div className="flex flex-col my-4">
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
        <div className="flex flex-col my-4">
          <label
            htmlFor="check-out"
            className="text-lg font-semibold text-gray-700 my-1"
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
        <div className="flex flex-col my-4">
          <label
            htmlFor="num-guests"
            className="text-lg font-semibold text-gray-700 my-1"
          >
            Number of Guests
          </label>
          <input
            className="border border-gray-300 rounded-md p-2 cursor-pointer "
            min={1}
            max={props.numberOfGuests}
            type="number"
            id="num-guests"
            value={numGuests}
            onChange={handleNumGuestsChange}
            placeholder="Number of Guests"
          />
        </div>
        <div className="flex gap-2 text-2xl font-semibold text-gray-700 pl-3 m-1">
          <h1 className="">Total Amount: </h1>
          <h2>$ {totalAmount}</h2>
        </div>
      </div>
      <button className="basicButton bg-red-500">Book</button>
    </div>
  );
}
