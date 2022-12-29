import React, { useRef, useState } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { Paper, Grid } from "@material-ui/core";
import { DonacionesMap } from "components";
import moment from "moment";

// redux
import { RootState } from "types";
import {
  selectDonacionList,
  selectDonacionError,
} from "store/donacion/donacionSelector";
import Form from "components/Form/Form";

// eslint-disable-next-line
const useStyles = (window: any) => ({
  container: {},
  topContainer: {
    width: "85%",
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
  bottomContainer2: {
    display: "flex",
    justifyContent: "center",
  },
  bottomWrapper: {
    width: "90%",
    marginLeft: "15px",
    [window.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  table: {},
  tableHeader: {
    background: `rgba(0, 0, 0, 0.15)`,
  },
  tableHeaderRow: {
    height: 60,
  },
  tableHeaderCell: {
    fontSize: 15,
  },
  tableBodyFont: {},
  button: {
    fontSize: 12,
  },
  descCol: {
    width: "15%",
  },
});

interface StateFromProps {
  list: ReturnType<typeof selectDonacionList>;
  error: ReturnType<typeof selectDonacionError>;
}
interface DispatchFromProps {}
interface OwnProps {}
interface StyleProps {
  classes: any;
}

type Props = StateFromProps & DispatchFromProps & OwnProps & StyleProps;

export const DonacionesTable = ({ list, error, classes }: Props) => {
  const [filteredList, setFilteredList] = useState<Array<any>>([]);
  const firstLoad = useRef(true);
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    setFilteredList(list);
  }, [list]);

  const handleSearchChange = (text: string) => {
    const searchList = [...new Set([...list, ...filteredList])];
    const updatedList = searchList.filter((x: any) => {
      if (!x.tipo_donacion && !x.title) {
        return true;
      }
      return (
        x.title.toLowerCase().includes(text.toLowerCase()) ||
        x.tipo_donacion.toLowerCase().includes(text.toLowerCase())
      );
    })!;
    setFilteredList(updatedList);
    setCount((count) => count + 1);
  };

  return (
    <React.Fragment>
      <div className={classes.topContainer}>
        <DonacionesMap list={filteredList.reverse()} />
      </div>
      <div style={{ display: "flex" }}>
        <div className={classes.bottomContainer}>
          <div className={classes.bottomWrapper}>
            <Grid>
              <Paper>
                <MaterialTable
                  title="Lista de donaciones de Vicente López"
                  options={{
                    pageSize: 7,
                  }}
                  columns={[
                    { title: "Nombre", field: "nombre" },
                    { title: "Tipo de donacion", field: "tipo_donacion" },
                    { title: "Quiere donar", field: "quiere_donar" },
                    { title: "Pide donación", field: "pide_donacion" },
                    { title: "Datos contacto", field: "datos_contacto" },
                  ]}
                  data={filteredList}
                  onSearchChange={handleSearchChange}
                />
              </Paper>
            </Grid>
          </div>
        </div>

        <div>
          <Form filteredList={filteredList} setFilteredList={setFilteredList} />
        </div>
      </div>
    </React.Fragment>
  );
};

function mapStateToProps(state: RootState): StateFromProps {
  return {
    list: selectDonacionList(state),
    error: selectDonacionError(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(DonacionesTable));
