import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSetRecoilState } from "recoil";
import { PropertyAtom } from "../atoms/PropertyAtom";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [shuffledProperties, setShuffledProperties] = useState([]);
  const setPropertyAtom = useSetRecoilState(PropertyAtom);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await axios.get("/properties");
        setProperties(response.data);
        setPropertyAtom(response.data);
        // Shuffle properties when fetched
        shuffleProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    }
    fetchProperties();
  }, []);

  // Function to shuffle the properties array
  const shuffleProperties = (properties) => {
    const shuffled = [...properties].sort(() => Math.random() - 0.5);
    setShuffledProperties(shuffled);
  };

  return (
    <div className="min-h-screen h-auto py-4 3xl:px-10 mb-20">
      {!shuffleProperties ? (
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="text-pink-600 text-2xl">Loading...</h1>
          <img className="size-20" src="/loader.svg" alt="Loading..." />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 m-8 justify-items-center">
          {shuffledProperties.map((property) => (
            <div
              key={property._id}
              className="shadow-xl rounded-xl min-h-96 min-w-80 max-w-[30rem] bg-transparent my-7 border-2 transition-transform duration-300 transform hover:scale-105 hover:z-10 hover:border-white hover:border-4 cursor-pointer"
            >
              <Carousel
                showThumbs={false}
                showStatus={false}
                showIndicators={true}
              >
                {property.propertyPhotos.map((photoUrl, index) => (
                  <div
                    className="min-w-44 min-h-60 object-cover "
                    key={index}
                  >
                    <img
                      className="rounded-xl h-80 w-[30rem] shadow-sm"
                      src={photoUrl}
                      alt={`Property ${index}`}
                    />
                  </div>
                ))}
              </Carousel>
              <div
                className="px-5 mt-2 hover:bg-gray-200 rounded-md py-4"
                onClick={() => {
                  navigate(`/places/${property._id}`);
                }}
              >
                <h2 className="text-lg font-semibold">{property.title}</h2>
                <p className="text-gray-600">{property.location}</p>
                <p className="text-gray-600 text-lg">
                  <span className="text-black font-semibold font-sans">
                    $ {property.price}
                  </span>{" "}
                  /night
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
