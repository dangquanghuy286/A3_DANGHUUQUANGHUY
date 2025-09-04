import React, { useState, useMemo } from "react";
import SearchSortControls from "../components/SearchSortControls";
import LocationList from "../components/LocationList";

import vietnamLocations from "../data/location.json";
import GoogleMapComponent from "../components/GoogleMapComponent";
const VietnamLocationsMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Filter and sort
  const filteredAndSortedLocations = useMemo(() => {
    let filtered = vietnamLocations.location.filter(
      (location) =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name, "vi");
        default:
          return 0;
      }
    });
  }, [searchTerm, sortBy]);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    // Scroll to location in list
    const element = document.getElementById(`location-${location.id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bản đồ Địa điểm Du lịch Việt Nam
          </h1>
          <p className="text-gray-600">
            Khám phá những điểm đến tuyệt vời nhất tại Việt Nam
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Location List Panel */}
          <div className="lg:col-span-1 space-y-4">
            <SearchSortControls
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortBy={sortBy}
              setSortBy={setSortBy}
              showSortMenu={showSortMenu}
              setShowSortMenu={setShowSortMenu}
            />
            <LocationList
              locations={filteredAndSortedLocations}
              selectedLocation={selectedLocation}
              handleLocationSelect={handleLocationSelect}
            />
          </div>

          {/* Map Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="mb-4">
                <h2 className="font-semibold text-gray-900">Bản đồ</h2>
                {selectedLocation && (
                  <p className="text-sm text-blue-600 mt-1">
                    Đã chọn: {selectedLocation.name}
                  </p>
                )}
              </div>
              <GoogleMapComponent
                locations={filteredAndSortedLocations}
                selectedLocation={selectedLocation}
                onLocationSelect={handleLocationSelect}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VietnamLocationsMap;
