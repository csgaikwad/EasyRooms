import PropertyDetails from "../../models/Property.js";

export async function getPropertyById(req, res) {
  try {
    const { propertyId } = req.params;
    const property = await PropertyDetails.findById(propertyId);
    if (!property)
      return res.status(404).json({ message: "Property not found" });
    res.status(200).json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ message: "An internal server error occurred" });
  }
}
