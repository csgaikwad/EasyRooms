import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Booking() {
  const { id: userId } = useParams();

  async function getBookings() {
    try {
      const response = await axios.get("/booking/"+ userId);
      console.log(response.data.doc);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getBookings();
  });
  return (
    <div className="min-h-screen p-10">
      Booking
      <h1>{userId}</h1>
    </div>
  );
}
