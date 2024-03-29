import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { PropertyAtom } from "../atoms/PropertyAtom";
import axios from "axios";
import BookingWidget from "../BookingWidget";

export default function Places() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const { id: reqId } = useParams();
  const properties = useRecoilValue(PropertyAtom);
  const photosRef = useRef(null);

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

  const scrollToPhotos = () => {
    photosRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div key={reqId} className="min-h-screen py-10 px-2 lg:px-20 mb-20">
      {selectedProperty ? (
        <>
          <div>
            <h1 className="text-[1.2rem] sm:text-[1.8rem] pl-2 font-semibold font-sans text-black cursor-text">
              {selectedProperty.title}
            </h1>
          </div>
          <div className=" lg:grid grid-cols-4 grid-rows-2 gap-4 lg:h-[28rem] w-full py-8">
            <img
              src={selectedProperty.propertyPhotos[0]}
              alt="Property Image"
              className="col-span-2 row-span-2 lg:w-full lg:h-full object-cover rounded-xl transition-transform duration-300 transform hover:scale-105 hover:z-10 hover:border-white hover:border-4 cursor-pointer"
              onClick={scrollToPhotos}
            />

            {selectedProperty.propertyPhotos.slice(1, 5).map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Property Image ${index}`}
                onClick={scrollToPhotos}
                className="hidden lg:inline object-cover rounded-xl h-full w-full transition-transform duration-300 transform hover:scale-105 hover:z-10 hover:border-white hover:border-4 cursor-pointer "
              />
            ))}
          </div>
          <div className="flex flex-col lg:grid grid-cols-2 gap-2">
            <div>
              <div className="sm:text-[1.4rem] font-semibold font-sans text-black">
                <a
                  href={`https://www.google.com/maps/search/${selectedProperty.location.split("in")[1]||selectedProperty.location}`}
                  target="_blank"
                >
                  <img
                    className="size-6 inline-block mb-2 mr-1"
                    src="/LocationPin.svg"
                    alt="Location"
                  />
                  <p className="inline">{selectedProperty.location} <span className="text-gray-500 text-md">(Click here to see the location)</span></p>
                </a>
              </div>
              <div className="md:text-[1.1rem] text-gray-500 px-2 py-4">
                <p>{selectedProperty.details}</p>
              </div>
              <div className="mb-4 grid grid-cols-3 gap-5 grid-rows-2 place-items-center justify-items-center p-10">
                <div
                  className={`${selectedProperty.pets ? "" : "rounded-lg opacity-40  line-through"}`}
                >
                  <img
                    src="/pet.svg"
                    alt="pet"
                    className="size-12 transition-transform duration-300 transform md:hover:scale-125 hover:z-10 hover:border-white hover:border-4 cursor-pointer"
                  />
                  <h1 className="text-gray-700 mb-8 text-lg  ">Pets allowed</h1>
                </div>
                <div
                  className={`${selectedProperty.parking ? "" : "rounded-lg opacity-40  line-through"}`}
                >
                  <img
                    src="/parking.svg"
                    alt="parking"
                    className="  size-12 transition-transform duration-300 transform md:hover:scale-125 hover:z-10 hover:border-white hover:border-4 cursor-pointer"
                  />
                  <h1 className="text-gray-700 mb-8 text-lg  ">
                    Parking available
                  </h1>
                </div>
                <div
                  className={`${selectedProperty.wifi ? "" : "rounded-lg opacity-40  line-through"}`}
                >
                  <img
                    src="/wifi.svg"
                    alt="wifi"
                    className="size-12 transition-transform duration-300 transform md:hover:scale-125 hover:z-10 hover:border-white hover:border-4 cursor-pointer"
                  />
                  <h1 className="text-gray-700 mb-8 text-lg ">
                    WiFi available
                  </h1>
                </div>
                <div
                  className={`${selectedProperty.tv ? "" : "rounded-lg opacity-40  line-through"}`}
                >
                  <img
                    src="/tv.svg"
                    alt="tv"
                    className="size-12 transition-transform duration-300 transform md:hover:scale-125 hover:z-10 hover:border-white hover:border-4 cursor-pointer"
                  />
                  <h1 className="text-gray-700 mb-8 text-lg ">TV available</h1>
                </div>
                <div
                  className={`${selectedProperty.entrance ? "" : "rounded-lg opacity-40  line-through"}`}
                >
                  <img
                    src="/entrance.svg"
                    alt="entrance"
                    className="size-12 transition-transform duration-300 transform md:hover:scale-125 hover:z-10 hover:border-white hover:border-4 cursor-pointer"
                  />
                  <h1 className="text-gray-700 mb-8 text-lg ">
                    Private entrance{" "}
                  </h1>
                </div>
                <div
                  className={`${selectedProperty.radio ? "" : "rounded-lg opacity-40  line-through"}`}
                >
                  <img
                    src="/radio.svg"
                    alt="radio"
                    className="size-12 transition-transform duration-300 transform md:hover:scale-125 hover:z-10 hover:border-white hover:border-4 cursor-pointer"
                  />
                  <h1 className="text-gray-700 mb-8 text-lg ">
                    Electricity available
                  </h1>
                </div>
              </div>
            </div>
            <div className="bg-blue-100 rounded-xl  lg:flex items-center justify-center ">
              <BookingWidget
                price={selectedProperty.price}
                numberOfGuests={selectedProperty.numberOfGuests}
              />
            </div>
          </div>
          <div
            ref={photosRef}
            className=" flex flex-col gap-4 my-10 items-center  "
          >
            <h1 className="text-xl lg:text-[2.4rem] font-semibold font-serif text-gray-600 border-b-4 border-gray-500 items-start flex  ">
              <p className="pt-1 px-2">*</p> All the Photos{" "}
              <p className="pt-1 px-2">*</p>
            </h1>
            {selectedProperty.propertyPhotos.map((photo, index) => {
              return (
                <img
                  className="rounded-xl lg:h-[40rem] lg:w-[60rem]"
                  key={index}
                  src={photo}
                />
              );
            })}
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
