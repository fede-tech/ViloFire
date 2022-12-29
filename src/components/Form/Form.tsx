import React, { ChangeEvent, useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import store from "store/store";
import { DonacionesContext } from "compositions/app/AppComposition";
import $ from "jquery";
import Autocomplete from "./Autocomplete";
import f1 from "assets/img/fire1.svg";
import f2 from "assets/img/f3.png";
import f3 from "assets/img/f5.png";

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

const defaultValues = {
  name: "",
  tipo: "",
  donoPido: 1,
  contacto: "",
  coordinates: [],
};
let reset = false;
const Form = ({ filteredList, setFilteredList }) => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [newCoords, setNewCoords] = useState();
  const [soret, setSoret] = useState(0);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSliderChange = (name) => (e, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !newCoords ||
      !formValues.name ||
      !formValues.tipo ||
      !formValues.donoPido ||
      !formValues.contacto
    ) {
      alert("por favor completá todos los datos");
      return;
    }

    const newEl = {
      title: formValues.name,
      nombre: formValues.name,
      tipo_donacion: formValues.tipo,
      coordinates: newCoords ? [newCoords.y, newCoords.x] : [],
      quiere_donar:
        formValues.donoPido === 1 || formValues.donoPido === 3 ? "sí" : "no",
      pide_donacion:
        formValues.donoPido === 2 || formValues.donoPido === 3 ? "sí" : "no",
      datos_contacto: formValues.contacto,
      _id: Math.random,
    };

    const newStorage = [...filteredList, newEl];

    setFilteredList(newStorage);
    localStorage.setItem("list", JSON.stringify(newStorage));
    setFormValues(defaultValues);

    reset = true;

    //const inputValue = (<HTMLInputElement>document.getElementById("search-input")).value;
    //inputValue.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ width: "200px", height: "300px" }}>
        <Grid container alignItems="center" justify="center" direction="column">
          <Grid item>
            <TextField
              id="name-input"
              name="name"
              label="Nombre"
              type="text"
              value={formValues.name}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item>
            <Autocomplete
              reset={reset}
              newCoords={newCoords}
              setNewCoords={setNewCoords}
            />
          </Grid>

          <Grid item>
            <TextField
              style={{ width: "300px" }}
              id="tipo-input"
              name="tipo"
              label="Qué tengo para donar / Qué necesito"
              type="text"
              value={formValues.tipo}
              onChange={handleInputChange}
            />
          </Grid>
          <br />
          <br />
          <Grid item>
            <div style={{ width: "200px" }}>
              <Slider
                value={formValues.donoPido}
                onChange={handleSliderChange("donoPido")}
                defaultValue={null}
                step={1}
                min={1}
                max={3}
                marks={[
                  {
                    value: 1,
                    label: (
                      <div style={{ textAlign: "center" }}>
                        "Quiero donar algo"{" "}
                        <div>
                          <img
                            style={{ width: "35px", height: "35px" }}
                            src={f1}
                          ></img>
                        </div>
                      </div>
                    ),
                  },
                  {
                    value: 2,
                    label: (
                      <div style={{ textAlign: "center" }}>
                        "Necesito
                        <br />
                        donación"{" "}
                        <div>
                          <img
                            style={{ width: "20px", height: "20px" }}
                            src={f2}
                          ></img>
                        </div>
                      </div>
                    ),
                  },
                  {
                    value: 3,
                    label: (
                      <div style={{ textAlign: "center" }}>
                        "Quiero donar
                        <br />y necesito donación"{" "}
                        <div>
                          <img
                            style={{ width: "20px", height: "20px" }}
                            src={f3}
                          ></img>
                        </div>
                      </div>
                    ),
                  },
                ]}
                valueLabelDisplay="off"
              />
            </div>
          </Grid>
          <br />
          <br />
          <Grid item>
            <TextField
              id="contacto-input"
              name="contacto"
              label="Datos para contactarme"
              type="text"
              value={formValues.contacto}
              onChange={handleInputChange}
            />
          </Grid>
          <br />
          <br />
          <Button variant="contained" color="primary" type="submit">
            Enviar
          </Button>
        </Grid>
      </div>
    </form>
  );
};
export default Form;
