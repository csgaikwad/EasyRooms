import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { PropertyAtom } from "../atoms/PropertyAtom";
import axios from "axios";

export default function Places() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const { id: reqId } = useParams();
  const properties = useRecoilValue(PropertyAtom);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (
      !properties ||
      properties.length === 0 ||
      !properties.find((property) => property._id === reqId)
    ) {
      axios
        .get(`/properties/${reqId}`)
        .then((response) => {
          const data = response.data;
          setSelectedProperty(data);
        })
        .catch((error) => {
          console.error("Error fetching property:", error);
        });
    } else {
      const property = properties.find((property) => property._id === reqId);
      setSelectedProperty(property);
    }
  }, [properties, reqId]);
  console.log(selectedProperty);

  return (
    <div key={reqId} className="min-h-screen py-10 px-20 mb-20">
      {selectedProperty ? (
        <>
          <div>
            <h1 className="text-[1.8rem] font-semibold font-sans text-black cursor-text">
              {selectedProperty.title}
            </h1>
          </div>
          <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[28rem] w-full py-8">
            <img
              src={selectedProperty.propertyPhotos[0]}
              alt="Property Image"
              className="col-span-2 row-span-2 w-full h-full object-cover rounded-xl transition-transform duration-300 transform hover:scale-105 hover:z-10 hover:border-white hover:border-4 cursor-pointer"
            />
            {selectedProperty.propertyPhotos.slice(1, 5).map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Property Image ${index}`}
                className=" object-cover rounded-xl h-full w-full transition-transform duration-300 transform hover:scale-105 hover:z-10 hover:border-white hover:border-4 cursor-pointer "
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-[1.4rem] font-semibold font-sans text-black">
                {selectedProperty.location}
              </div>
              <div className="text-[1.1rem] text-gray-500 py-4">
                {selectedProperty.details}
              </div>
              <div className="mb-4 grid grid-cols-3 grid-rows-2 place-items-center justify-items-center p-10">
                <div>
                  <img src="/pet.svg" alt="pet" className="size-12 transition-transform duration-300 transform hover:scale-125 hover:z-10 hover:border-white hover:border-4 cursor-pointer" />
                  <h1 className="text-gray-700 my-2 ">Pets allowed</h1>
                </div>
                <div>
                  <img src="/parking.svg" alt="parking" className="size-12 transition-transform duration-300 transform hover:scale-125 hover:z-10 hover:border-white hover:border-4 cursor-pointer" />
                  <h1 className="text-gray-700 my-2 ">Parking available</h1>
                </div>
                <div>
                  <img src="/wifi.svg" alt="wifi" className="size-12 transition-transform duration-300 transform hover:scale-125 hover:z-10 hover:border-white hover:border-4 cursor-pointer" />
                  <h1 className="text-gray-700 my-2 ">WiFi available</h1>
                </div>
                <div>
                  <img src="/tv.svg" alt="tv" className="size-12 transition-transform duration-300 transform hover:scale-125 hover:z-10 hover:border-white hover:border-4 cursor-pointer" />
                  <h1 className="text-gray-700 my-2 ">TV available</h1>
                </div>
                <div>
                  <img src="/entrance.svg" alt="entrance" className="size-12 transition-transform duration-300 transform hover:scale-125 hover:z-10 hover:border-white hover:border-4 cursor-pointer" />
                  <h1 className="text-gray-700 my-2 ">Private entrance </h1>
                </div>
                <div>
                  <img src="/radio.svg" alt="radio" className="size-12 transition-transform duration-300 transform hover:scale-125 hover:z-10 hover:border-white hover:border-4 cursor-pointer" />
                  <h1 className="text-gray-700 my-2 ">Radio available</h1>
                </div>
              </div>
            </div>
            <div className="bg-red-300 rounded-xl   "></div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="text-pink-600 text-2xl">Loading...</h1>
          <img className="size-20" src="/loader.svg" alt="Loading..." />
        </div>
      )}
    </div>
  );
}
