import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PropertyDetails",
    required: true,
  },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  numGuests: { type: Number, default: 1, required: true },
  totalAmount:{type: Number, required:true}
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
