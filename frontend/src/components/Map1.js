import React, { useEffect, useState } from 'react';
import Map, { NavigationControl, Marker } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Button } from 'react-bootstrap';
import { MdLocationOn, MdGpsFixed } from 'react-icons/md';

function Map1({ isForm, Location, setLocation, editCollege }) {
  const handleMapClick = (event) => {
    setLocation(event.lngLat);
  };

  const [initialViewState, setInitialViewState] = useState({
    longitude: 72.5714,
    latitude: 23.0225,
    zoom: 10
  });

  const [mapViewState, setMapViewState] = useState(initialViewState);
  const [markerLocation, setMarkerLocation] = useState(null);

  useEffect(() => {
    if (Location && Location.lat && Location.lng) {
      setInitialViewState({
        longitude: Location.lng,
        latitude: Location.lat,
        zoom: 10
      });
    }
  }, [Location]);

  useEffect(() => {
    if (Location && Location.lat && Location.lng) {
      setMapViewState({
        longitude: Location.lng,
        latitude: Location.lat,
        // zoom:  // You can adjust the zoom level here to control the map's zoom when the marker is set.
      });

      // Update the marker location when Location changes
      setMarkerLocation({
        longitude: Location.lng,
        latitude: Location.lat
      });
    }
  }, [Location]);

  const getCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lng: position.coords.longitude,
            lat: position.coords.latitude
          });
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleViewStateChange = (viewState) => {
    setMapViewState(viewState);
  };

  return (
    <div className="App" style={isForm ? { width: '100%', height: '190px' } : { width: '100%', height: 'calc(100vh - 77px)' }}>
      <div style={{ backgroundColor: 'black' }}></div>
      <Button className='btn-sm ml-5 mb-3' onClick={getCurrentLocation}><MdGpsFixed /> Get Current Location</Button>

      <div>
        <Map
          mapLib={maplibregl}
          onClick={handleMapClick}
          onViewStateChange={handleViewStateChange} // Add this event handler to update the map view state on zooming
          {...mapViewState} // Spread the mapViewState to update the map view
          style={{ width: editCollege ? '100%' : '100%', height: editCollege ? '290px' : '190px' }}
          mapStyle="https://api.maptiler.com/maps/streets/style.json?key=0lmLYWUuo5P3H1nIbJqn"
        >
          <NavigationControl position="top-left" />
          {markerLocation && <Marker longitude={markerLocation.longitude} latitude={markerLocation.latitude} color="black" />}
        </Map>
      </div>
    </div>
  );
}

export default Map1;