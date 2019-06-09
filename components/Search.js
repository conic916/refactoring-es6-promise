'use strict'

// komponent ktory wyszukuje po nacisnieciu na enter

Search = React.createClass({

  // metoda stawiajaca wartosc poczatkowa stanu :

  getInitialState() {
    return {
      searchingText: ''
    };
  },

  // generowanie zdarzen :
  // implementacja funkcji
  //event - zdarzenie, target - wejscie do wartosci tego zdarzenia, i value
  //dzieki temu aktualizujemy stan komponentu w setState

  handleChange: function (event) {
    const searchingText = event.target.value;
    this.setState({
      searchingText: searchingText
    });

    if (searchingText.length > 2) {
      this.props.onSearch(searchingText);
    }
  },

  handleKeyUp: function (event) {
    if (event.keyCode === 13) {
      this.props.onSearch(this.state.searchingText);
    }
  },

  // tworzenie komponentow style :

  render: function () {
    const styles = {
      fontSize: '1.5em',
      width: '90%',
      maxWidth: '350px'
    };

    return <input
      type="text"
      onChange={
        this.handleChange
      }
      onKeyUp={
        this.handleKeyUp
      }
      placeholder="Tutaj wpisz wyszukiwaną frazę"
      style={
        styles
      }
      // value : dla zmiany wartosci / wyszukiwanie gifu
      value={
        this.state.searchTerm
      }
    />
  }
});