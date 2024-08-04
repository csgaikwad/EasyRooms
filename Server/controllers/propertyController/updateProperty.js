import PropertyDetails from "../../models/Property.js";

export async function updateProperty(req, res) {
  try {
    const { propertyId } = req.params;
    const { user, ...updateObj } = req.body;

    if (user && user.id) {
      updateObj.user = user.id;
    }

    const updatedProperty = await PropertyDetails.updateOne(
      { _id: propertyId },
      updateObj
    );

    if (!updatedProperty)
      return res.status(404).json({ message: "Property not found" });
    res.status(200).json({ message: "Property updated successfully" });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ message: "An internal server error occurred" });
  }
}
