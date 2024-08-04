import PropertyDetails from "../../models/Property.js";

export async function getProperties(req, res) {
  try {
    const properties = await PropertyDetails.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "An internal server error occurred" });
  }
}
