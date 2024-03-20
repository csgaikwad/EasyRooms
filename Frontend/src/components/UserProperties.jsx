import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { PropertyAtom } from "./atoms/PropertyAtom";
import { Carousel } from "react-responsive-carousel";
import { UserAtom } from "./atoms/UserAtom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserProperties() {
  const properties = useRecoilValue(PropertyAtom);
  const [userProperties, setUserProperties] = useState([]);
  const user = useRecoilValue(UserAtom);
  const setPropertyAtom = useSetRecoilState(PropertyAtom);
  const navigate = useNavigate();

  const fetchUserProperties = async () => {
    try {
      if (properties.length === 0) {
        const response = await axios.get(`/properties`);
        setPropertyAtom(response.data);
        const filteredProperties = response.data.filter(
          (a) => a.user === user.id
        );
        setUserProperties(filteredProperties);
      } else {
        const filteredProperties = properties.filter((a) => a.user === user.id);
        setUserProperties(filteredProperties);
      }
    } catch (error) {
      console.error("Error fetching user properties:", error);
    }
  };
  useEffect(() => {
    if (user.isOwner && user.id) {
      fetchUserProperties();
    }
  }, [user.isOwner, user.id, properties]);
  console.log("properties: ", properties);
  console.log("userproperties: ", userProperties);
  console.log("user: ", user);
  return (
    <div className="block md:grid grid-cols-1  xl:grid-cols-2  gap-10  my-4 justify-items-center p-4 ">
      {userProperties.map((property) => (
        <div
          key={property._id}
          className=" shadow-xl rounded-xl  max-w-96 bg-transparent my-5 border-2 bg-white transition-transform duration-300 transform hover:scale-105 hover:z-10 hover:border-white hover:border-2 cursor-pointer size-full pb-4  "
        >
          <Carousel showThumbs={false} showStatus={false} showIndicators={true}>
            {property.propertyPhotos.map((photoUrl, index) => (
              <div
                className="md:min-w-44 sm:min-h-60 max-w-96  m-2 "
                key={index}
                onClick={() => {
                  navigate("/places/" + property._id);
                }}
              >
                <img
                  className="rounded-xl size-60 md:size-72 object-cover shadow-sm"
                  src={photoUrl}
                  alt={`Property ${index}`}
                />
              </div>
            ))}
          </Carousel>
          <div
            className="px-5 mt-2 "
            onClick={() => {
              navigate("/places/" + property._id);
            }}
          >
            <h2 className="md:text-xl font-semibold whitespace-nowrap truncate max-w-80 ">{property.title}</h2>
            <p className="text-gray-600 whitespace-nowrap truncate max-w-80">{property.location}</p>
            <p className="text-gray-600 text-lg ">
              <span className="text-black font-semibold font-serif">
                $ {property.price}
              </span>
              /night {/*₹ */}
            </p>
            {/* <p className="text-sm text-gray-500 truncate pb-4">{property.details}</p> */}
          </div>
          <div className=" w-full mt-6 absolute bottom-0 flex items-end justify-center">
          <div
            className="hidden sm:flex  w-full  items-center justify-center font-serif font-semibold text-xl bg-red-500 opacity-50 hover:opacity-100 rounded-2xl "
            onClick={() => {
              navigate("/property/" + property._id);
            }}
          ><span className="opacity-100">Edit </span>
            <img
              className=" border-2 border-white m-2 size-8   transition-transform duration-300 transform hover:scale-125 hover:z-10   cursor-pointer rounded-full p-1"
              src="/pencil.svg"
              alt="edit"
            />
          </div>
        </div>
        </div>
      ))}
    </div>
  );
}
