import React from "react";
import { MapPin } from "lucide-react";

const LocationSearchPanel = () => {
  const sampleLocations = [
    "24B, Near Kapoor's cafe, Sheryians Coding School, Bhopal",
    "6A, Opposite City Mall, MP Nagar, Bhopal",
    "3rd Floor, DB City Mall, Arera Hills, Bhopal",
    "Block C, Ashima Mall Road, Hoshangabad Rd, Bhopal"
  ];

  return (
    <div className="space-y-2">
      {sampleLocations.map((location, index) => (
        <div
          key={index}
          className="flex gap-4 border border-gray-200 hover:border-black p-3 rounded-xl items-center"
        >
          <div className="h-8 w-8 flex items-center justify-center text-white bg-black rounded-full">
            <MapPin className="w-4 h-4" />
          </div>
          <h4 className="font-medium text-sm">{location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
