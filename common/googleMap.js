import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 6.545531299999999,
      lng: 3.3834185
    },
    zoom: 13
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
           bootstrapURLKeys={{ key: 'AIzaSyAcxtb7nAs568Mfk3lBqE8_3FuvGzAf3MY' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={this.props.lat}
            lng={this.props.lng}
            text={this.props.location?this.props.location:"My Location"}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;

