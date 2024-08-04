import axios from "axios";

// Function to handle file change and preview
export const handleFileChange = async (
  event,
  setPreviews,
  setSelectedFiles
) => {
  const selectedFile = event.target.files[0];
  const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB

  if (selectedFile && selectedFile.size > maxSizeInBytes) {
    alert("File size exceeds the maximum allowed size (10MB).");
    event.target.value = "";
  } else {
    try {
      const formData = new FormData();
      formData.append("propertyPhoto", selectedFile);

      const res = await axios.post("/properties/preview", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const imageUrl = res.data.imageUrl;
      setPreviews((prevPreviews) => [...prevPreviews, imageUrl]);
      setSelectedFiles((prevFiles) => [...prevFiles, selectedFile]);
    } catch (error) {
      console.error(error);
    }
  }
};

// Function to handle deleting an image
export const handleDeleteImage = async (
  event,
  index,
  previews,
  setPreviews,id
) => {
  event.preventDefault();
  try {
    const url = previews[index];
    const response = await axios.delete(`/properties/deletePhoto`, {
      data: { url, propertyId: id },
    });
    const updatedPreviews = [...previews];
    updatedPreviews.splice(index, 1);
    setPreviews(updatedPreviews);
    if (response.data && response.data.message) {
      alert(response.data.message);
    }
  } catch (error) {
    alert("Image could not be deleted");
    console.error("Error deleting image:", error);
  }
};

// Function to handle form submission
export const handleSubmit = async (event, id, propertyData, navigate) => {
  event.preventDefault();
  try {
    if (id) {
      const res = await axios.put(`/properties/${id}`, propertyData);
      alert(res.data.message);
    } else {
      const res = await axios.post("/properties", propertyData);
      alert(res.data.message);
      navigate("/");
    }
  } catch (error) {
    alert("Error occurred, try allowing cookies");
    console.error(error);
  }
};

// Function to handle deleting a property
export const handleDeleteProperty = async (event, id, navigate) => {
  event.preventDefault();
  try {
    const response = await axios.delete(`/properties/deleteProperty`, {
      data: { propertyId: id },
    });
    if (response.data && response.data.message) {
      alert(response.data.message);
    }
    navigate("/");
  } catch (error) {
    alert("Property could not be deleted");
    console.error("Error deleting property:", error);
  }
};
