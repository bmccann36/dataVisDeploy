import React from 'react'

import mapboxgl from 'mapbox-gl'


mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

export default class Application extends React.Component {
  constructor(props){
    super(props)
  }



  componentDidMount() {
    // console.log(this.props)
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-73.977, 40.709],
      zoom: 10
    });


    map.on('mousemove', (e) => {
      const features = map.queryRenderedFeatures(e.point);
      this.props.setCoor(e.lngLat)
      map.getCanvas().style.cursor = features.length ? 'pointer' : '';
    });
  }

  render() {
    const style ={
      position: 'relative',
      top: 0,
      bottom: 0,
      // width: '50%'
    };
    return (
      <div style={style}
       ref={el => this.mapContainer = el} className="map" />
    );
  }
}

//

