import React, { createRef } from 'react';
import L from 'leaflet';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-markercluster";
import getCity from './Utils/data'
import './map.css'

export default class Map extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            draggable : true,
            marker: {
                lat: 13.0827,
                lng: 80.2707,
              }
        }
        this.markersdisplay = this.markersdisplay.bind(this);
        this.toggleDraggable = this.toggleDraggable.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
        this.getAddress = this.getAddress.bind(this);
    }

    markersdisplay = () => {
        if(this.props.stores.length !== 0){
          return this.props.stores.map((store, index) => {
              return <Marker key={index} id={index} position={[store[1], store[0]]}/>
          })}
      }
    
      refmarker = createRef(<Marker/>)
    
      toggleDraggable = () => {
        this.setState({ draggable: !this.state.draggable })
      }
    
      updatePosition = () => {
        const marker = this.refmarker.current
        if (marker != null) {
          this.setState({
            marker: marker.leafletElement.getLatLng(),
          })
          console.log(marker.leafletElement.getLatLng());
          setTimeout(this.getAddress, 900);;
        }
      }
    
      getAddress = () => {
        let coordinates = this.state.marker
        fetch(`https://us1.locationiq.com/v1/reverse.php?key=bc2cac33c677be&lat=${coordinates.lat}&lon=${coordinates.lng}&format=json`)
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            let city = getCity(data);
            this.props.changeLocation(city);
        })
        .catch(error => console.log(error))
      }
    

    render(){

        const markerPosition = [this.state.marker.lat, this.state.marker.lng]

        const createClusterCustomIcon = function (cluster) {
          return L.divIcon({
            html: `<span>${cluster.getChildCount()}</span>`,
            className: 'marker-cluster-custom',
            iconSize: L.point(40, 40, true),
          });
        };

        return(
            <div>      
            <LeafletMap
            center={[22.00, 77.00]}
            zoom={5}
            maxZoom={10}
            attributionControl={true}
            zoomControl={true}
            doubleClickZoom={true}
            scrollWheelZoom={true}
            dragging={true}
            animate={true}
            easeLinearity={0.35}
          >
      
            <TileLayer
              url="https://api.mapbox.com/styles/v1/hrithik16/ckd4brrpr0lwq1ikcket3ov6a/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaHJpdGhpazE2IiwiYSI6ImNrZDRlMTQzZTFwa2kycm83bHIzbTRuMGEifQ.7GxrtXNvTHbImh7E-ZgCjw"
              attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
            />
          {(this.props.onChoose === 'alumni') ? (
            <MarkerClusterGroup
                showCoverageOnHover={false}
                spiderfyDistanceMultiplier={2}
                iconCreateFunction={createClusterCustomIcon}>
                  {this.markersdisplay()}
            </MarkerClusterGroup>) : (null)}
            
            {(this.props.onChoose === 'marker') ? (
            <Marker
              draggable={this.state.draggable}
              onDragend={this.updatePosition}
              position={markerPosition}
              ref={this.refmarker}>
              <Popup minWidth={90}>
                <span onClick={this.toggleDraggable}>
                  {this.state.draggable ? 'DRAG MARKER' : 'MARKER FIXED'}
                </span>
              </Popup>
            </Marker>) : (null)}
    
          </LeafletMap>
            </div>
        )
    }
}