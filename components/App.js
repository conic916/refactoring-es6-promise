const GIPHY_API_URL = 'https://api.giphy.com';
const GIPHY_PUB_KEY = 'Ed6qremkIy5BCFd7bJSuDPrCkTDxkIqJ';

App = React.createClass({
  getInitialState() {
    return {
      loading: false,
      searchingText: '',
      gif: {},
      errorText: ''
    };
  },

  handleSearch: function (searchingText) { // 1. pobiera na wejsciu wisywany text
    this.setState({
      loading: true // 2. sygnalizuje ze zaczal sie proces ladowania 
    });
    // 3.rozpoczyna pobieranie gifa
    this.getGif(searchingText)
      .then(response => {
        var data = response.data;
        var gif = {
          url: data.fixed_width_downsampled_url,
          sourceUrl: data.url
        };
        this.setState({ // 4 na zakonczenie pobierania 
          loading: false, // a przestaje sygnalizowac ladowanie 
          gif: gif, // b ustawia nowego gifa z wyniku pobierania 
          searchingText: searchingText // c ustawia nowy stan dla wyszukiwania textu
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({
          loading: false,
          errorText: 'error,try again!!!'
        });
      });
  },

  getGif: function (searchingText) { // , callback )1. parametry : wpisywany text i funkcja callback ktora ma sie wykonac po pobraniu gifa 
    return new Promise(
      function (resolve, reject) {
        let url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText; // 2. adres url dla Api
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function () {

          if (xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            resolve(response); // 4. odpowiedz na zapytanie : obiekt z danymi, rozpakowujemy do nowej zmiennej 
          } else {
            reject(new Error("this.statusText"));
          }
        }
        xhr.oneerror = function () {
          reject(new Error(`XMLHttpRequest Error: ${this.statusText}`));
        }
        xhr.send();
      });
  },

  render: function () {
    // style inline
    var styles = {
      margin: '0 auto',
      textAlign: 'center',
      width: '90%'
    };
    return (
      <div style={styles}>
        <h1>Wyszukiwarka GIFow!</h1>
        <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
        <Search onSearch={this.handleSearch} />
        <p>{this.state.errorText}</p>
        <Gif
          loading={this.state.loading}
          url={this.state.gif.url}
          sourceUrl={this.state.gif.sourceUrl}
        />
      </div>
    );
  }
});