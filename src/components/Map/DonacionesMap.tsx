import React, { Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import markerImage from "assets/img/background.jpg";
import f1 from "assets/img/fire1.svg";
import f2 from "assets/img/f3.png";
import f3 from "assets/img/f5.png";
import { pointerStyles } from "./MapStyle";

import "./Maps.css";

// redux
import { RootState } from "types";
import { mapStyles, markerStyles } from "./MapStyle";

import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import { FlagOutlined } from "@material-ui/icons";

// eslint-disable-next-line
const useStyles = () => ({
  mainMap: {
    height: "400px",
  },
  infoWindowView: {
    width: "100%",
    height: "270px !important",
    padding: "15px",
    backgroundColor: "black",
    color: "white",
    justifyContent: "center",
    display: "flex",
  },
  markerImg: {
    width: "150px",
    height: "100px",
  },
  markerText: {
    paddingLeft: "10px",
    paddingRight: "10px",
    width: "100%",
    justifyContent: "center",
  },
  f1: {
    width: "5%",
    height: "5%",
  },
});

//-34.53084076336598, -58.5201560460207
//const DEFAULT_MAP_LOCATION = { lat: 37.757272, lng: -122.424873 };
const DEFAULT_MAP_LOCATION = {
  lat: -34.53084076336598,
  lng: -58.5201560460207,
};
const DEFAULT_MAP_ZOOM = 15;
//const googleMapURL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCIW48wqv3oz7ZgL8Q8vSQUwJ3xfQjjeEM&v=3.exp&libraries=geometry,drawing,places';
const googleMapURL =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyCrilhCPNDMmtz-cQ-FlcJaQYlw6gkH-t0&v=3.exp&libraries=geometry,drawing,places";

const CMap = withScriptjs(
  withGoogleMap((props: any) => (
    <GoogleMap
      defaultZoom={DEFAULT_MAP_ZOOM}
      defaultCenter={DEFAULT_MAP_LOCATION}
      options={{
        styles: mapStyles,
        disableDefaultUI: false,
      }}
    >
      {props.children}
    </GoogleMap>
  ))
);

/* const anim = new Marker({}); */

interface StateFromProps {}
interface DispatchFromProps {}
interface OwnProps {
  list: Array<any>;
}
interface StyleProps {
  classes: any;
}

type Props = StateFromProps & DispatchFromProps & OwnProps & StyleProps;

export const DonacionesMap = ({ classes, list }: Props) => {
  const [selectedItem, selectItem] = React.useState<any | undefined>(undefined);

  return (
    <React.Fragment>
      <CMap
        googleMapURL={googleMapURL}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div className={classes.mainMap} />}
        mapElement={<div style={{ height: `100%` }} />}
        center={DEFAULT_MAP_LOCATION}
      >
        <MarkerClusterer
          gridSize={60}
          averageCenter
          enableRetinaIcons
          styles={markerStyles}
        >
          {list.map((item, index) => {
            return item.coordinates ? (
              <Marker
                key={index}
                //animation={anim}
                icon={
                  {
                    url: item.quiere_donar === "s??" && item.pide_donacion === "s??" ? f3 : item.quiere_donar === "s??"? f1 : f2,
                    scaledSize: {
                      height: 50,
                      width: 50,
                    },
                  } as google.maps.Icon
                }
                position={{
                  lat: item.coordinates[0],
                  lng: item.coordinates[1],
                }}
                onClick={(e) => {
                  selectItem(item);
                }}
              >
                {selectedItem && selectedItem._id === item._id && (
                  <InfoWindow onCloseClick={() => selectItem(undefined)}>
                    <div className={"infoWindowView"}>
                      <div>
                        <img className={"markerImg"} src={markerImage} alt="" />
                      </div>
                      <div className={"markerText"}>
                        <p>Nombre: {item.nombre}</p>
                        <p>Tipo de donacion: {item.tipo_donacion}</p>
                        <p>Quiere donar: {item.quiere_donar}</p>
                        <p>Pide donaci??n: {item.pide_donacion}</p>
                        <p>Datos de contacto: {item.datos_contacto}</p>
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            ) : null;
          })}
        </MarkerClusterer>
      </CMap>
    </React.Fragment>
  );
};

DonacionesMap.prototype = {
  classes: PropTypes.object,
};

export default withStyles(useStyles)(DonacionesMap);
