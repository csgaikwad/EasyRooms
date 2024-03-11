import axios from "axios";
import React, { useState } from "react";

export default function CreateProperties() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [tv, setTv] = useState(false);
  const [radio, setRadio] = useState(false);
  const [pets, setPets] = useState(false);
  const [entrance, setEntrance] = useState(false);

  // async function showImage(imgFile) {
  //   const formData = new FormData();
  //   formData.append("propertyPhoto", imgFile);
  //   try {
  //     const res = await axios.post("/preview", formData);
  //     console.log(res.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB

    if (selectedFile && selectedFile.size > maxSizeInBytes) {
      alert("File size exceeds the maximum allowed size (10MB).");
      event.target.value = "";
    } else {
      try {
        const formData = new FormData();
        formData.append("propertyPhoto", selectedFile);
        const res = await axios.post("/preview", formData);
        const imageUrl = res.data.imageUrl;

        setPreviews([...previews, imageUrl]);
        setSelectedFiles([...selectedFiles, selectedFile]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    switch (name) {
      case "wifi":
        setWifi(checked);
        break;
      case "parking":
        setParking(checked);
        break;
      case "tv":
        setTv(checked);
        break;
      case "radio":
        setRadio(checked);
        break;
      case "pets":
        setPets(checked);
        break;
      case "entrance":
        setEntrance(checked);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("location", location);
      formData.append("details", details);
      formData.append("price", price);
      formData.append("numberOfGuests", numberOfGuests);
      formData.append("wifi", wifi);
      formData.append("parking", parking);
      formData.append("tv", tv);
      formData.append("radio", radio);
      formData.append("pets", pets);
      formData.append("entrance", entrance);

      selectedFiles.forEach((file, index) => {
        formData.append(`propertyPhoto${index}`, file);
      });

      const res = await axios.post("/property", formData);
      console.log(res.data.message);
      alert(res.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border-2 h-auto w-full rounded-xl">
      <div className="py-8 flex items-center justify-center">
        <form
          className="flex flex-col justify-center items-center w-[60rem] border-2 rounded-2xl shadow-lg mb-20"
          encType="multipart/form-data"
        >
          <label className="w-96 bg-transparent border-2 shadow-md text-black p-10 rounded-xl cursor-pointer hover:bg-gray-100 flex items-center justify-center gap-4 my-10">
            Choose Photos
            <img
              className="bg-purple-400 rounded-full size-10"
              src="/plus.svg"
            />
            <input
              className="hidden"
              id="file-upload"
              type="file"
              name="propertyPhoto"
              onChange={handleFileChange}
              multiple
            />
          </label>
          {previews.length > 0 && (
            <div
              className={`flex ${previews.length === 1 && "justify-center"} items-center  gap-4 my-4 w-[40rem] h-80  mb-10 rounded-xl overflow-x-auto scroll-smooth customScrollbar `}
            >
              {previews.map((preview, index) => (
                <div className="shrink-0 bg-cover" key={index}>
                  <img
                    className="shrink-0 rounded-xl w-80 h-72 "
                    src={preview}
                    alt={`Preview ${index} `}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col space-y-4 mb-8 w-[40rem]">
            <div className="flex flex-col">
              <label
                htmlFor="title"
                className="text-lg font-semibold text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                className="border text-lg border-gray-300 rounded-md p-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="location"
                className="text-lg font-semibold text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                className="border text-lg border-gray-300 rounded-md p-2"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="details"
                className="text-lg font-semibold text-gray-700"
              >
                Details
              </label>
              <textarea
                id="details"
                className="border border-gray-300 rounded-md p-2 h-40 w-full font-serif text-lg ml-2"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="price"
                className="text-lg font-semibold text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                className="border text-xl border-gray-300 rounded-md p-2"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="no-of-guest"
                className="text-lg font-semibold text-gray-700"
              >
                Number of Guests
              </label>
              <input
                type="number"
                id="no-of-guest"
                className="border text-xl border-gray-300 rounded-md p-2"
                value={numberOfGuests}
                onChange={(e) => setNumberOfGuests(e.target.value)}
                min={1}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-gray-700">
                Amenities
              </label>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <label className="border-2 border-gray-400 mt-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer text-gray-600 hover:bg-gray-200">
                <input
                  type="checkbox"
                  name="wifi"
                  className="cursor-pointer h-6 w-6"
                  checked={wifi}
                  onChange={handleCheckboxChange}
                />
                <span>Wifi</span>
              </label>
              <label className="border-2 border-gray-400 mt-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer text-gray-600 hover:bg-gray-200">
                <input
                  type="checkbox"
                  name="parking"
                  className="cursor-pointer h-6 w-6"
                  checked={parking}
                  onChange={handleCheckboxChange}
                />
                <span>Free parking spot</span>
              </label>
              <label className="border-2 border-gray-400 mt-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer text-gray-600 hover:bg-gray-200">
                <input
                  type="checkbox"
                  name="tv"
                  className="cursor-pointer h-6 w-6"
                  checked={tv}
                  onChange={handleCheckboxChange}
                />
                <span>TV</span>
              </label>
              <label className="border-2 border-gray-400 mt-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer text-gray-600 hover:bg-gray-200">
                <input
                  type="checkbox"
                  name="radio"
                  className="cursor-pointer h-6 w-6"
                  checked={radio}
                  onChange={handleCheckboxChange}
                />
                <span>Radio</span>
              </label>
              <label className="border-2 border-gray-400 mt-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer text-gray-600 hover:bg-gray-200">
                <input
                  type="checkbox"
                  name="pets"
                  className="cursor-pointer h-6 w-6"
                  checked={pets}
                  onChange={handleCheckboxChange}
                />
                <span>Pets Allowed</span>
              </label>
              <label className="border-2 border-gray-400 mt-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer text-gray-600 hover:bg-gray-200">
                <input
                  type="checkbox"
                  name="entrance"
                  className="cursor-pointer h-6 w-6"
                  checked={entrance}
                  onChange={handleCheckboxChange}
                />
                <span>Private entrance</span>
              </label>
            </div>
          </div>
          <button
            className="basicButton bg-purple-500 w-1/2 mb-20"
            onClick={(e) => handleSubmit(e)}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
