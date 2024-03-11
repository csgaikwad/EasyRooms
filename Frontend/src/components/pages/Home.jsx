import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function Home() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await axios.get("/properties");
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    }
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen h-auto pt-4 px-10">
      <div className="grid grid-cols-4 gap-3  mt-4 justify-items-center">
        {properties.map((property) => (
          <div
            key={property._id}
            className="border-2 shadow-md p-4 rounded-xl h-96 w-80 bg-transparent   "
          >
            <Carousel showThumbs={false}>
              {property.propertyPhotos.map((photo, index) => (
                <div className="min-w-40 min-h-40 rounded-xl m-2" key={index}>
                  <img src={photo.imageUrl} alt={`Property ${index}`} />
                </div>
              ))}
            </Carousel>
            <h2 className="text-lg font-semibold mb-1">{property.title}</h2>
            <p className="text-gray-600 mb-2">{property.location}</p>
            <p className="text-gray-600 text-xl mb-2">${property.price}/night</p>
            <p className="text-sm text-gray-500 truncate">{property.details}</p>
          </div>
        ))}

      </div>
    </div>
  );
}
