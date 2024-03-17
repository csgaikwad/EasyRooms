import React, { useEffect, useRef, useState } from "react";
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
    const offsetTop = photosRef.current.offsetTop;
    window.scrollTo({
      top: offsetTop - 100,
      behavior: "auto"
    });
  };

  return (
    <div key={reqId} className="min-h-screen py-10 px-20 mb-20">
      {selectedProperty ? (
        <>
          <div>
            <h1 className="text-[1.8rem] font-semibold font-sans text-black cursor-text">
              {selectedProperty.title}
            </h1>
          </div>
          <div className=" lg:grid grid-cols-4 grid-rows-2 gap-4 h-[28rem] w-full py-8">
            <img
              src={selectedProperty.propertyPhotos[0]}
              alt="Property Image"
              className="col-span-2 row-span-2 w-full h-full object-cover rounded-xl transition-transform duration-300 transform hover:scale-105 hover:z-10 hover:border-white hover:border-4 cursor-pointer"
              onClick={scrollToPhotos}
            />

            {selectedProperty.propertyPhotos.slice(1, 5).map((photo, index) => (
              <img
                onClick={scrollToPhotos}
                key={index}
                src={photo}
                alt={`Property Image ${index}`}
                className="hidden lg:inline object-cover rounded-xl h-full w-full transition-transform duration-300 transform hover:scale-105 hover:z-10 hover:border-white hover:border-4 cursor-pointer "
              />
            ))}
          </div>
          <div className="flex flex-col lg:grid grid-cols-2 gap-2">
            <div>
              <div className="text-[1.4rem] font-semibold font-sans text-black">
                <img
                  className="size-6 inline-block mb-2 mr-1"
                  src="/LocationPin.svg"
                  alt="Location"
                />
                <p className="inline-block">{selectedProperty.location}</p>
              </div>
              <div className="text-[1.1rem] text-gray-500 py-4">
                <p>{selectedProperty.details}</p>
              </div>
              <div className="mb-4 grid grid-cols-3 grid-rows-2 place-items-center justify-items-center p-10">
                {/* Add your property details here */}
              </div>
            </div>
            <div className="bg-blue-100 rounded-xl   ">
              <BookingWidget
                price={selectedProperty.price}
                numberOfGuests={selectedProperty.numberOfGuests}
              />
            </div>
          </div>
          <div className=" flex flex-col gap-8 my-10 items-center  ">
            <h1
              ref={photosRef}
              className="text-[2.4rem] font-semibold font-serif text-gray-600 border-b-4 border-gray-500 items-start flex  "
            >
              <p className="pt-1 px-2">*</p> All the Photos{" "}
              <p className="pt-1 px-2">*</p>
            </h1>
            {selectedProperty.propertyPhotos.map((photo, index) => {
              return (
                <img className="rounded-xl h-[30rem]  lg:h-[38rem] transition-transform duration-300 transform hover:scale-105 hover:z-10 hover:border-white hover:border-4 cursor-pointer" key={index} src={photo} />
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
