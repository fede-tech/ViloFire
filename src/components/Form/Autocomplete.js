import React, { Component } from "react";
import { Autocompleter } from "@usig-gcba/autocompleter";
import "./Autocomplete.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {      
      newProps: this.props.newCoords,
      autocompleter: "",
      showMap: false,
      loading: false,
      x: null,
      y: null,
      input: "",
      error: null,
      suggestions: [],
      selectedSuggestion: null,
      direccionesCaba: false,
      direccionesAmba: true,
      lugares: true,
      deficit: true,
      catastro: false,
      long: 3,
      pause: 300,
      maxSugg: 10,
    };
  }

  handleInputChange = async (event) => {
    const text = event.target.value;
    this.state.autocompleter.updateSuggestions(text);
    this.setState({ input: text, showMap: false });
  };

  async onChange(e) {
    if (
      e.target.name === "direccionesCaba" ||
      e.target.name === "direccionesAmba" ||
      e.target.name === "lugares" ||
      e.target.name === "deficit" ||
      e.target.name === "catastro"
    ) {
      this.state[e.target.name] = e.target.checked;
      this.setState({
        [e.target.name]: e.target.checked,
      });
      this.UpdateComponenAutoCompleter();
    } else {
      this.state[e.target.name] = e.target.value;
      this.setState({
        [e.target.name]: e.target.value,
      });
      this.UpdateComponenAutoCompleter();
    }
  }

  handleClick = async (suggestion) => {
    this.props.setNewCoords(suggestion.data.coordenadas);

    let coord = await this.state.autocompleter.updateCoordenadas(suggestion);

    if (suggestion) {
      this.setState({ selectedSuggestion: suggestion });

      if (suggestion.type === "CALLE") {
        this.setState({
          suggestions: [],
          input: suggestion.title + " ",
        });
      } else {
        this.setState({
          input: suggestion.title,
          suggestions: [],
          loading: true,
        });
        if (suggestion.type === "DIRECCION") {
          this.setState({
            showMap: false,
            loading: false,
            x: coord.x,
            y: coord.y,
          });
        }
      }
    }
  };

  async UpdateComponenAutoCompleter() {
    const options = {
      maxSuggestions: this.state.maxSugg,
      minTextLength: this.state.long,
      inputPause: this.state.pause,
      SuggesterDirecciones: this.state.direccionesCaba,
      SuggesterDireccionesAMBA: this.state.direccionesAmba,
      SuggesterLugares: this.state.lugares,
      SuggesterDeficitHabitacional: this.state.deficit,
      SuggesterCatastro: this.state.catastro,
    };
    //Callbacks del autocomplete
    const suggestionsCallback = async (suggestions) => {
      this.setState({ suggestions: suggestions });
    };

    const completeSuggestionsCallback = (suggestions) => {
      if (suggestions.length === 0) {
        this.setState({ suggestions: [] });
      } else {
        this.setState({ error: null });
      }
    };

    const errorCallback = (error) => {
      this.setState({ error: error });
    };

    const autocompleter = new Autocompleter(
      {
        onCompleteSuggestions: completeSuggestionsCallback,
        onSuggestions: suggestionsCallback,
        onError: errorCallback,
      },
      options
    );

    if (options.SuggesterDirecciones)
      autocompleter.addSuggester("Direcciones", { inputPause: 250 });
    if (options.SuggesterDireccionesAMBA)
      autocompleter.addSuggester("DireccionesAMBA");
    if (options.SuggesterLugares) autocompleter.addSuggester("Lugares");
    if (options.SuggesterDeficitHabitacional)
      autocompleter.addSuggester("DeficitHabitacional");
    if (options.SuggesterCatastro) autocompleter.addSuggester("Catastro");

    this.setState({ autocompleter: autocompleter, suggestions: [] });
  }

  componentDidMount() {
    // esto se ejecuta una vez al cargar el componente, deberias usar ShouldComponentUpdate
    // this.UpdateComponenAutoCompleter();
    // Opciones de config del autocomplete
    var options = {
      maxSuggestions: this.state.maxSugg,
      minTextLength: this.state.long,
      inputPause: this.state.pause,
      SuggesterDirecciones: this.state.direccionesCaba,
      SuggesterDireccionesAMBA: this.state.direccionesAmba,
      SuggesterLugares: this.state.lugares,
      SuggesterDeficitHabitacional: this.state.deficit,
      SuggesterCatastro: this.state.catastro,
    };

    //Callbacks del autocomplete
    const suggestionsCallback = (suggestions) => {
      this.setState({ suggestions: suggestions });
    };

    const completeSuggestionsCallback = (suggestions) => {
      if (suggestions.length === 0) {
        this.setState({ suggestions: [] });
      } else {
        this.setState({ error: null });
      }
    };

    const errorCallback = (error) => {
      this.setState({ error: error });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
    };
    const autocompleter = new Autocompleter(
      {
        onCompleteSuggestions: completeSuggestionsCallback,
        onSuggestions: suggestionsCallback,
        onError: errorCallback,
        onSubmit: handleSubmit,
      },
      options
    );

    if (options.SuggesterDirecciones)
      autocompleter.addSuggester("Direcciones", { inputPause: 250 });
    if (options.SuggesterDireccionesAMBA)
      autocompleter.addSuggester("DireccionesAMBA");
    if (options.SuggesterLugares) autocompleter.addSuggester("Lugares");
    if (options.SuggesterDeficitHabitacional)
      autocompleter.addSuggester("DeficitHabitacional");
    if (options.SuggesterCatastro) autocompleter.addSuggester("Catastro");

    this.setState({ autocompleter: autocompleter, suggestions: [] });
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.position !== this.props.position) {
      this.moveMap(nextProps.position);
    }
  };

  render() {
    return (
      <div className="App">
        <div className="section">
          <div id="header"></div>
          <div id="buscador">
            <form id="mainForm" acceptCharset="utf-8">
              Dónde estoy{" "}
              <input
                id="search-input"
                value={this.props.reset ? "" : this.state.input}
                onChange={this.handleInputChange}
              />
              <span id="ejemplo">
                ej.: Carlos Villate 4480, Tecnópolis, etc.
              </span>
              {this.state.error ? this.state.error.message : null}
              {this.state.suggestions.map((suggestion, index) => {
                const title =
                  suggestion.alias ||
                  suggestion.title ||
                  suggestion.nombre ||
                  suggestion.data.smp ||
                  suggestion.data;
                const subTitle = suggestion.subTitle
                  ? suggestion.subTitle
                  : suggestion.descripcion;
                return (
                  <div
                    className="sugerencia"
                    key={index}
                    onClick={() => this.handleClick(suggestion)}
                  >
                    <div
                      className="titulo-sugerencia"
                      id={title + "-title-sug-" + index}
                      aria-hidden="true"
                    >
                      {title}
                    </div>
                    <div
                      className="clase"
                      id={subTitle + "-subtitle-sug-" + index}
                      aria-hidden="true"
                    >
                      {subTitle}
                    </div>
                  </div>
                );
              })}
              {this.state.showMap ? (
                <img
                  style={{ display: "inline-block", maxWidth: "35 vw" }}
                  alt="mapa"
                  src={`http://servicios.usig.buenosaires.gob.ar/LocDir/mapa.phtml?x=${this.state.x}&y=${this.state.y}&w=600&punto=1&desc=`}
                />
              ) : null}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
