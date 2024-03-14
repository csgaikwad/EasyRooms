import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { PropertyAtom } from "./atoms/PropertyAtom";
import { Carousel } from "react-responsive-carousel";
import { UserAtom } from "./atoms/UserAtom";
import axios from "axios";

export default function UserProperties() {
  const properties = useRecoilValue(PropertyAtom);
  const [userProperties, setUserProperties] = useState([]);
  const user = useRecoilValue(UserAtom);
  const setPropertyAtom = useSetRecoilState(PropertyAtom);
  useEffect(() => {
    const fetchUserProperties = async () => {
      try {
        const response = await axios.get(`/properties`);
        setPropertyAtom(response.data);
        // console.log(user.id, response.data[1].user);
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

  console.log("userProperties: ",userProperties);

  return (
    <div className="grid grid-cols-1  xl:grid-cols-2 gap-1  my-4 justify-items-center p-4 ">
      {userProperties.map((property) => (
        <div
          key={property._id}
          className=" shadow-xl rounded-xl min-h-96 min-w-80 max-w-96 bg-transparent my-5 border-2 bg-white "
          >
          <Carousel showThumbs={false} showStatus={false} showIndicators={true}>
            {property.propertyPhotos.map((photoUrl, index) => (
              <div className="min-w-44 min-h-60 max-w-96  m-2 " key={index}>
                {/* {console.log(photoUrl)} */}
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
            <p className="text-sm text-gray-500 truncate">{property.details}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
