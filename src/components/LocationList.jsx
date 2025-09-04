import React from "react";
import { MapPin, Search } from "lucide-react";
import RatingStars from "./RatingStars";

const LocationList = ({
  locations,
  selectedLocation,
  handleLocationSelect,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm max-h-[600px] overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-gray-900">
          Địa điểm ({locations.length})
        </h2>
      </div>

      <div className="divide-y">
        {locations.map((location) => (
          <div
            key={location.id}
            id={`location-${location.id}`}
            onClick={() => handleLocationSelect(location)}
            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedLocation?.id === location.id
                ? "bg-blue-50 border-l-4 border-blue-500"
                : ""
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <MapPin className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {location.name}
                </h3>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {location.description}
                </p>
                <div className="flex items-center mt-2">
                  <RatingStars rating={location.rating} />
                  <span className="ml-2 text-sm font-semibold text-gray-700">
                    {location.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {locations.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>Không tìm thấy địa điểm nào phù hợp</p>
        </div>
      )}
    </div>
  );
};

export default LocationList;
