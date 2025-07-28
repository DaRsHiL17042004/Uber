import React from "react";
import { MapPin, Wallet } from "lucide-react";
import { useLocation } from "react-router-dom";

const ConfirmRideCard = (props) => {
  const location = useLocation();
  const { fromLocation, toLocation } = location.state || {};

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-5 space-y-5">
      {/* Title */}
      <h2 className="text-xl font-semibold text-center">Confirm your Ride</h2>

      {/* Car Image */}
      <div className="flex justify-center">
        <img
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png"
          alt="UberGo"
          className="w-24 h-14 object-contain"
        />
      </div>

      {/* Pickup Location */}
      <div className="flex items-start gap-3 border-b pb-3">
        <MapPin className="w-5 h-5 mt-1" />
        <div>
          <p className="font-semibold text-sm">562/11-A</p>
          <p className="text-xs text-gray-600">{fromLocation}</p>
        </div>
      </div>

      {/* Drop Location */}
      <div className="flex items-start gap-3 border-b pb-3">
        <MapPin className="w-5 h-5 mt-1" />
        <div>
          <p className="font-semibold text-sm">562/11-A</p>
          <p className="text-xs text-gray-600">{toLocation}</p>
        </div>
      </div>

      {/* Fare */}
      <div className="flex items-start gap-3">
        <Wallet className="w-5 h-5 mt-1" />
        <div>
          <p className="font-semibold text-sm">₹193.20</p>
          <p className="text-xs text-gray-600">Cash Cash</p>
        </div>
      </div>

      {/* Confirm Button */}
      <button className="w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition">
        Confirm
      </button>
    </div>
  );
};

export default ConfirmRideCard;
