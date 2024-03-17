import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { PropertyAtom } from "../atoms/PropertyAtom";
import { useNavigate } from "react-router-dom";
import { UserAtom } from "../atoms/UserAtom";

export default function Home() {
  const user = useRecoilValue(UserAtom);
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
        shuffleProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    }
    fetchProperties();
  }, []);

  const shuffleProperties = (properties) => {
    const shuffled = [...properties].sort(() => Math.random() - 0.5);
    setShuffledProperties(shuffled);
  };

  return (
    <div className="min-h-screen h-auto py-4 xl:px-5 mb-20">
      {shuffleProperties.length === 0 ? (
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="text-pink-600 text-[2rem]">Loading...</h1>
          <img className="size-32" src="/loader.svg" alt="Loading..." />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3   gap-4 m-8 justify-items-center">
          {shuffledProperties.map((property) => (
            <div
              key={property._id}
              className="shadow-xl rounded-xl  max-w-[30rem] bg-transparent hover:my-5 my-7 border-2 transition-transform duration-300 transform hover:scale-105 hover:z-10 hover:border-white hover:border-4 cursor-pointer"
            >
              <Carousel
                showThumbs={false}
                showStatus={false}
                showIndicators={true}
                // showArrows={false}
                className="lg:carousel-mobile"
              >
                {property.propertyPhotos.map((photoUrl, index) => (
                  // lg:min-w-40 lg:min-h-52
                  <div className=" object-cover " key={index}>
                    <img
                      className="rounded-xl size-60 lg:size-64  shadow-sm"
                      src={photoUrl}
                      alt={`Property ${index}`}
                    />
                  </div>
                ))}
              </Carousel>
              <div
                className="px-5 mt-2 hover:bg-gray-200 rounded-md py-4"
                onClick={() => {
                  user.isAuthenticated
                    ? navigate(`/places/${property._id}`)
                    : navigate("/login");
                }}
              >
                <h2 className="text-lg font-semibold ">{property.title}</h2>
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
