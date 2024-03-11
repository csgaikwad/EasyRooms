import mongoose from 'mongoose';

const propertyDetailsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  numberOfGuests: {
    type: Number,
    required: true,
  },
  wifi: {
    type: Boolean,
    default: false,
  },
  parking: {
    type: Boolean,
    default: false,
  },
  tv: {
    type: Boolean,
    default: false,
  },
  radio: {
    type: Boolean,
    default: false,
  },
  pets: {
    type: Boolean,
    default: false,
  },
  entrance: {
    type: Boolean,
    default: false,
  },
  propertyPhotos: {
    type: [String],
    default: [],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const PropertyDetails = mongoose.model('PropertyDetails', propertyDetailsSchema);

export default PropertyDetails;
