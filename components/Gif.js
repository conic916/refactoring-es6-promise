// komponent ktory zajmuje sie wyswietlaniem gifa, lub ladowania, kiedy nawiazywane jest polaczenie 
//style dla komponentu gif, tworzymy obiekt i przypisujemy do reactEl.

const GIPHY_LOADING_URL = 'http://www.ifmo.ru/images/loader.gif'; // url - App (rodzic) gif ( dziecko) przez wlasciwosc this.props.url
const styles = {
  minHeight: '310px',
  margin: '0.5em'
};

Gif = React.createClass({
  getUrl: function () { // metoda ta zwraca adres obrazka lub gifa, sygnalizujac ladowaniem
    return this.props.sourceUrl || GIPHY_LOADING_URL;
  },
  render: function () {
    const url = this.props.loading ? GIPHY_LOADING_URL : this.props.url; // ustawia url, jesli this. ma wartosc false

    return (
      <div style={styles}>
        <a href={this.getUrl()}
          title='view this on giphy'
          target='new'>
          <img id='gif' src={url}
            style={
              {
                width: '100%',
                maxWidth: '350px'
              }
            } />
        </a>
      </div>
    );
  }
});