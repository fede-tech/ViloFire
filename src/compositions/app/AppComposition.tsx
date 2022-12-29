import React, { useEffect, useState, useRef, createContext } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// components
import { DonacionesTable, AppHeader, DonacionesMap } from "components";
import { getDonacionList } from "store/donacion/donacionActions";

import { theme } from "utils";
import { Grid, Button } from "@material-ui/core";

import donaciones from "donaciones.json";
import { DonacionType } from "types";

//!localStorage.getItem("list") ? localStorage.setItem("list", JSON.stringify(donaciones));

//console.log(localStorage.getItem("list"));
// eslint-disable-next-line
const useStyles = (window: any) => ({
  container: {
    backgroundColor: theme.palette.primary[0],
    backgroundSize: "cover",
    backgroundPosition: "center",
    justifyContent: "center",
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  topContainer: {
    width: "70%",
    marginBottom: 50,
    marginLeft: "auto",
    marginRight: "auto",
    [window.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  bottomContainer: {
    display: "flex",
    justifyContent: "center",
  },
  bottomWrapper: {
    width: "70%",
    [window.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  button: {
    marginTop: theme.spacing.unit,
    fontSize: 18,
    fontWeight: 700,
  },
  filterContainer: {
    marginBottom: theme.spacing.unit,
  },
  usersTableContainer: {
    marginTop: theme.spacing.unit * 2,
  },
});

interface StateFromProps {}
interface DispatchFromProps {
  getDonacionList: typeof getDonacionList;
}
interface OwnProps {}
interface StyleProps {
  classes: any;
}

type Props = StateFromProps & DispatchFromProps & OwnProps & StyleProps;

export const DonacionesContext = createContext(null);

const don = JSON.parse(localStorage.getItem("list"))

export const AppComposition = ({ classes, getDonacionList }: Props) => {


  useEffect(() => {
    getDonacionList();
  }, []);

  const [donacionesList, setDonacionesList] = useState(null);

  return (
    <div>
      <AppHeader />
      <div className={classes.container}>
        <DonacionesTable />
      </div>
    </div>
  );
};

function mapStateToProps(state: any): StateFromProps {
  return {};
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
    getDonacionList: () => dispatch(getDonacionList()),
  };
}

AppComposition.prototype = {
  classes: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(AppComposition));
