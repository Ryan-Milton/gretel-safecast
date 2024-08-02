import React, { useRef, useEffect } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Point } from "ol/geom";
import Feature from "ol/Feature";
import { Style, Icon } from "ol/style";
import { fromLonLat } from "ol/proj";
import MapPin from "../assets/map-pin.svg";

type MapComponentProps = {
  lat: number;
  lon: number;
};

const MapComponent: React.FC<MapComponentProps> = ({ lat, lon }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([lon, lat]), // Center map on given coordinates
          zoom: 10, // Adjust zoom level as needed
        }),
      });

      // Create a feature for the marker
      const marker = new Feature({
        type: "icon",
        geometry: new Point(fromLonLat([lon, lat])),
      });

      // Define the style for the marker
      marker.setStyle(
        new Style({
          image: new Icon({
            color: "rgba(255, 0, 0, .5)",
            crossOrigin: "anonymous",
            src: MapPin,
            scale: 1,
          }),
        })
      );

      // Create a vector source and layer for the marker
      const vectorSource = new VectorSource({
        features: [marker],
      });
      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      // Add the vector layer to the map
      map.addLayer(vectorLayer);

      return () => map.setTarget(undefined);
    }
  }, [lat, lon]);

  return <div ref={mapRef} className="w-full h-80"></div>;
};

export default MapComponent;
