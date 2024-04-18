import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  checkIn: { type: Number, default: 0, required: true },
  checkOut: { type: Number, default: 0, required: true },
  numGuests: { type: Number, default: 0, required: true },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
