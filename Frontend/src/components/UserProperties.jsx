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
  const navigate=useNavigate();
  useEffect(() => {
    const fetchUserProperties = async () => {
      try {
        const response = await axios.get(`/properties`);
        setPropertyAtom(response.data);
        const filteredProperties = response.data.filter((a) => a.user === user.id);
        setUserProperties(filteredProperties);
      } catch (error) {
        console.error("Error fetching user properties:", error);
      }
    };

    if (user.isOwner && user.id) {
      fetchUserProperties();
    }
  }, [user.isOwner, user.id]);


  return (
    <div className="grid grid-cols-1  xl:grid-cols-2 gap-1  my-4 justify-items-center p-4 ">
      {userProperties.map((property) => (
        <div
          key={property._id}
          className=" shadow-xl rounded-xl min-h-96 min-w-80 max-w-96 bg-transparent my-5 border-2 bg-white transition-transform duration-300 transform hover:scale-105 hover:z-10 hover:border-white hover:border-4 cursor-pointer"
          onClick={()=>{
            navigate("/property/"+property._id)
            // console.log(property._id)
          }}
          >
          <Carousel showThumbs={false} showStatus={false} showIndicators={true}>
            {property.propertyPhotos.map((photoUrl, index) => (
              <div className="min-w-44 min-h-60 max-w-96  m-2 " key={index}>
                <img
                  className="rounded-xl h-80 w-96 object-cover shadow-sm"
                  src={photoUrl}
                  alt={`Property ${index}`}
                />
              </div>
            ))}
          </Carousel>
          <div className="px-5 mt-2">
            <h2 className="text-xl font-semibold  ">{property.title}</h2>
            <p className="text-gray-600 ">{property.location}</p>
            <p className="text-gray-600 text-lg ">
              <span className="text-black font-semibold font-serif">
                $ {property.price}
              </span>
              /night {/*₹ */}
            </p>
            <p className="text-sm text-gray-500 truncate pb-4">{property.details}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
