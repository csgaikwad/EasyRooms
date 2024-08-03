import Booking from '../models/Booking.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export async function createBooking(req, res) {
  try {
    const { userId, propertyId, checkIn, checkOut, totalAmount, numGuests } = req.body;
    let validUserId = userId;

    if (!validUserId) {
      const token = req.cookies.jwt;
      if (!token) return res.status(401).json({ message: "Unauthorized" });
      const decoded = jwt.verify(token, config.secrets.jwtSecret);
      validUserId = decoded.userId;
      const foundUser = await User.findById(validUserId);
      if (!foundUser) return res.status(404).json({ message: "User not found" });
    }

    const booking = await Booking.create({ userId: validUserId, propertyId, checkIn, checkOut, totalAmount, numGuests });
    res.status(200).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "An internal server error occurred" });
  }
}

export async function getUserBookings(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: "User not found, try logging in again" });

    const bookingDoc = await Booking.find({ userId: id }).populate('propertyId');
    if (!bookingDoc || bookingDoc.length === 0) return res.status(404).json({ message: "No bookings found for this user" });

    const sanitizedBookingDoc = bookingDoc.map(booking => ({
      ...booking._doc,
      propertyId: {
        id: booking.propertyId._id,
        title: booking.propertyId.title,
        location: booking.propertyId.location,
        propertyPhoto: booking.propertyId.propertyPhotos && booking.propertyId.propertyPhotos[0],
      },
    }));

    res.status(200).json({ doc: sanitizedBookingDoc });
  } catch (error) {
    console.error("Error retrieving bookings:", error);
    res.status(500).json({ message: "An internal server error occurred" });
  }
}
