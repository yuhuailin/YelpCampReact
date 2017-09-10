import React from "react";
import { withGoogleMap, GoogleMap,Marker } from "react-google-maps";
// class GoogleMap extends Component {
//   componentDidMount() {
//     new google.maps.Map(this.refs.map, {
//       zoom: 12,
//       center: {
//         lat: this.props.lat,
//         lng: this.props.lon
//       }
//     });
//   }
//
//   render() {
//     return <div ref="map" />;
//   }
// }
//
// export default GoogleMap;

const Map = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={12}
    defaultCenter={ props.center }
  >
  <Marker
    position={props.center}
  />
  </GoogleMap>
));

export default Map;
