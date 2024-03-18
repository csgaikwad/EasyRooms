import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { PropertyAtom } from "../atoms/PropertyAtom";
import { useNavigate } from "react-router-dom";
import { UserAtom } from "../atoms/UserAtom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Home() {
  const user = useRecoilValue(UserAtom);
  const [properties, setProperties] = useState([]);
  const [shuffledProperties, setShuffledProperties] = useState([]);
  const setPropertyAtom = useSetRecoilState(PropertyAtom);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <div className="min-h-screen h-auto  xl:px-5 mb-20">
      {properties.length === 0 ? (
        <div className=" flex flex-col items-center justify-center lg:grid grid-cols-1 gap-7  lg:grid-cols-2 xl:grid-cols-3 sm:px-10 lg:place-content-center my-11">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="hidden lg:block">
              <Skeleton
                baseColor="#c8cddb"
                highlightColor="white"
                key={index}
                height={300}
                width={415}
                borderRadius={15}
              />
            </div>
          ))}
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="hidden md:block">
              <Skeleton
              baseColor="#c8cddb"
              highlightColor="white"
                key={index}
                height={300}
                width={415}
                borderRadius={15}
              />
            </div>
          ))}
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="block md:hidden">
              <Skeleton
              baseColor="#c8cddb"
              highlightColor="white"
                key={index}
                height={200}
                width={300}
                borderRadius={15}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3   gap-4 m-4 sm:m-8 justify-items-center">
          {shuffledProperties.map((property) => (
            <div
              key={property._id}
              className="shadow-xl rounded-xl  md:min-w-[10rem] w-[100%] md:w-auto md:max-w-[30rem] bg-transparent hover:my-5 my-4 border-2 transition-transform duration-300 transform hover:scale-105 hover:z-0  hover:border-white hover:border-4 cursor-pointer"
            >
              <Carousel
                showThumbs={false}
                showStatus={false}
                showIndicators={true}
                // showArrows={false}
                className="lg:carousel-mobile"
              >
                {property.propertyPhotos.map((photoUrl, index) => (
                  <div className=" object-cover " key={index}>
                    <img
                      className="rounded-xl size-60 lg:size-72  shadow-sm"
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
                <h2 className="text-md sm:text-lg font-semibold whitespace-nowrap truncate max-w-80">
                  {property.title}
                </h2>
                <p className="text-gray-600 whitespace-nowrap truncate max-w-72 text-md sm:text-lg">
                  {property.location}
                </p>
                <p className="text-gray-600 text-md sm:text-lg">
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
