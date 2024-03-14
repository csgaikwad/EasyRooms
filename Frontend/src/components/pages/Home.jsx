import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSetRecoilState } from "recoil";
import { PropertyAtom } from "../atoms/PropertyAtom";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const setPropertyAtom = useSetRecoilState(PropertyAtom);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await axios.get("/properties");
        setProperties(response.data);
        setPropertyAtom(response.data);
        // console.log(PropertyAtom);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    }
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen h-auto py-4 3xl:px-10 mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3   gap-8  m-8 justify-items-center">
        {properties.map((property) => (
          <div
            key={property._id}
            className=" shadow-xl rounded-xl min-h-96 min-w-80 max-w-[30rem] bg-transparent my-7 border-2 "
          >
            <Carousel
              showThumbs={false}
              showStatus={false}
              showIndicators={true}
            >
              {property.propertyPhotos.map((photoUrl, index) => (
                <div
                  className="min-w-44 min-h-60 object-cover  mb-2  "
                  key={index}
                >
                  {/* {console.log(photoUrl)} */}
                  <img
                    className="rounded-xl h-80 w-[30rem]   shadow-sm"
                    src={photoUrl}
                    alt={`Property ${index}`}
                  />
                </div>
              ))}
            </Carousel>
            <div className="px-5 mt-2">
              <h2 className="text-lg font-semibold ">{property.title}</h2>
              <p className="text-gray-600 ">{property.location}</p>
              <p className="text-gray-600 text-lg ">
                <span className="text-black font-semibold font-sans">
                  {" "}
                  $ {property.price}
                </span>{" "}
                /night {/*₹ */}
              </p>
              {/* <p className="text-sm text-gray-500 truncate">
                {property.details}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {property.details}
              </p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
