import React from 'react'
import L from 'leaflet';
import { Map as LeafletMap, GeoJSON, Marker } from 'react-leaflet';
import worldGeoJSON from 'geojson-world-map';
import MarkerClusterGroup from "react-leaflet-markercluster";
import './map.css'


class GeoJsonMap extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      stores: [[47.49855629475769,  -122.14184416996333],
              [ 47.359423, -122.021071],
              [47.2052192687988, -121.988426208496],
              [ 47.6307081, -122.1434325],
              [47.3084488,  -122.2140121],
              [47.5524695,-122.0425407]]
    }
  }

  markersdisplay = () => {
      return this.state.stores.map((stores, index) => {
          return <Marker key={index} id={index} position={[stores[0], stores[1]]}/>
      })
  }



  render() {

    const createClusterCustomIcon = function (cluster) {
      return L.divIcon({
        html: `<span>${cluster.getChildCount()}</span>`,
        className: 'marker-cluster-custom',
        iconSize: L.point(40, 40, true),
      });
    };
    

    return (
      <LeafletMap
        center={[50, 10]}
        zoom={6}
        maxZoom={10}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}>
  
        <GeoJSON
          data={worldGeoJSON}
          style={() => ({
            color: '#4a83ec',
            weight: 0.5,
            fillColor: "#1a1d62",
            fillOpacity: 1,
          })}
        />

        <MarkerClusterGroup
            showCoverageOnHover={false}
            spiderfyDistanceMultiplier={2}
            iconCreateFunction={createClusterCustomIcon}>
              {this.markersdisplay()}
        </MarkerClusterGroup>

      </LeafletMap>
    );
  }
}

export default GeoJsonMap

