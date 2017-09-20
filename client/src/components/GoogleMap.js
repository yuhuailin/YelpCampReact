import React from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const Map = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={12}
    defaultCenter={props.center}
  >
    <Marker position={props.center} />
  </GoogleMap>
));

export default Map;
