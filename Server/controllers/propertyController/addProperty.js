import PropertyDetails from "../../models/Property.js";

export async function addProperty(req, res) {
  try {
    const {
      title,
      location,
      details,
      price,
      numberOfGuests,
      wifi,
      parking,
      tv,
      radio,
      pets,
      entrance,
      propertyPhotos,
      user,
    } = req.body;

    const property = new PropertyDetails({
      title,
      location,
      details,
      price,
      numberOfGuests,
      wifi: wifi || false,
      parking: parking || false,
      tv: tv || false,
      radio: radio || false,
      pets: pets || false,
      entrance: entrance || false,
      propertyPhotos,
      user: user.id,
    });

    await property.save();
    res.status(201).json({
      property,
      photoUrls: propertyPhotos,
      message: "Property Created Successfully",
    });
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({ message: "An internal server error occurred" });
  }
}
