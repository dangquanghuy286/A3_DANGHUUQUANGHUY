import React, { useRef, useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "600px",
  borderRadius: "0.5rem",
  overflow: "hidden",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
};

const center = {
  lat: 16.0544,
  lng: 108.2022,
};

const GoogleMapComponent = ({
  locations,
  selectedLocation,
  onLocationSelect,
}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const mapRef = useRef(null);
  const [activeMarker, setActiveMarker] = useState(null);

  const onLoad = (map) => {
    mapRef.current = map;
    if (selectedLocation) {
      map.panTo({
        lat: selectedLocation.location.lat,
        lng: selectedLocation.location.lng,
      });
      map.setZoom(10);
    }
  };

  const handleMarkerClick = (location) => {
    setActiveMarker(location.id);
    onLocationSelect(location);
    if (mapRef.current) {
      mapRef.current.panTo({
        lat: location.location.lat,
        lng: location.location.lng,
      });
      mapRef.current.setZoom(10);
    }
  };

  //  Hàm chuyển đổi khi nhấn
  useEffect(() => {
    if (mapRef.current && selectedLocation) {
      mapRef.current.panTo({
        lat: selectedLocation.location.lat,
        lng: selectedLocation.location.lng,
      });
      mapRef.current.setZoom(10);
    }
  }, [selectedLocation]);

  if (!Array.isArray(locations)) {
    console.error("Prop 'locations' is not an array:", locations);
    return <div>Lỗi: Không có dữ liệu địa điểm để hiển thị.</div>;
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5.5}
      onLoad={onLoad}
    >
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={{
            lat: location.location.lat,
            lng: location.location.lng,
          }}
          onClick={() => handleMarkerClick(location)}
          icon={{
            url:
              selectedLocation?.id === location.id
                ? "https://img.icons8.com/pulsar-gradient/48/marker.png"
                : "https://img.icons8.com/officel/40/marker.png",
            scaledSize: new window.google.maps.Size(32, 32),
          }}
        >
          {activeMarker === location.id && (
            <InfoWindow
              position={{
                lat: location.location.lat,
                lng: location.location.lng,
              }}
              onCloseClick={() => setActiveMarker(null)}
            >
              <div className="p-3 max-w-sm">
                <h3 className="font-bold text-lg mb-2">{location.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {location.description}
                </p>
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1 text-sm font-semibold">
                    {location.rating}
                  </span>
                </div>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  ) : (
    <div>Đang tải bản đồ...</div>
  );
};

export default GoogleMapComponent;
