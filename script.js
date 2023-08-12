$(document).ready(function () {
      getPexelsApi(159613); // for testing only. this fx need to go in getRecomendations()
      getSpotifiyApi(); // for testing only. this fx need to go in getRecomendations()
});
var spotifyApiKey = '';
var pexelsApiKey = 'v02S0I9htMCYgc11EVr0Yf9D4VnE1EDvcONyoroDFmlLYS8kEi5IdfbT';

// Genre tallies: This might need to go inside of 'localStorage'.
var punkRock = 0;
var rock = 0;
var hipHop = 0;
var rap = 0
var edm = 0;

var questionArray = [
      {
            question: "Pov: You're competing in a ski race down a spooky scarry mountain and need to montage all your training, which song do you pick?",
            a: "concert No.2 in G mi", //rock
            b: "Vroom Vrom by Charli Xcx.", // punk
            c: "The Motto by Drake.", // hip-hop
            d: "Boom Boom Pow by Black-eyed Peas.", //rap
            e: "Welcome to the Jungle by Guns n' Roses", // edm
      },
      {
            question: "Which of these is most important in a concert.?",
            a: "concert No.2 in G mi", //rock
            b: "Vroom Vrom by Charli Xcx.", // punk
            c: "The Motto by Drake.", // hip-hop
            d: "Boom Boom Pow by Black-eyed Peas.", //rap
            e: "Welcome to the Jungle by Guns n' Roses", // edm
      },
      {
            question: "If  you got to hang out with your favorite musician, what would you do?",
            a: "concert No.2 in G mi", //rock
            b: "Vroom Vrom by Charli Xcx.", // punk
            c: "The Motto by Drake.", // hip-hop
            d: "Boom Boom Pow by Black-eyed Peas.", //rap
            e: "Welcome to the Jungle by Guns n' Roses", // edm
      },
      {
            question: "Do you like Drake?",
            a: "concert No.2 in G mi", //rock
            b: "Vroom Vrom by Charli Xcx.", // punk
            c: "The Motto by Drake.", // hip-hop
            d: "Boom Boom Pow by Black-eyed Peas.", //rap
            e: "Welcome to the Jungle by Guns n' Roses", // edm
      },
      {
            question: "Do you like Drake?",
            a: "concert No.2 in G mi", //rock
            b: "Vroom Vrom by Charli Xcx.", // punk
            c: "The Motto by Drake.", // hip-hop
            d: "Boom Boom Pow by Black-eyed Peas.", //rap
            e: "Welcome to the Jungle by Guns n' Roses", // edm
      },
];


/* Event Handlers:
      1. on start button 'click'
            -in this handler, you have to call the 'location() function 
             to swith you to the questions.html

      2. on question choice 'click'
            -this handler will 
      3. on display results 'click'.
*/

// Functions:
function getPexelsApi(id) { // done.
      var urlById = `https://api.pexels.com/v1/photos/${id}`; // need to find the id of the picture first.
      /* selected pictures info: 
            punkRock: 
                  query: 'punk'
                  id: 953457
                  url: "https://images.pexels.com/photos/953457/pexels-photo-953457.jpeg"
            rock: 
                  query: 'rock music'
                  id:1763075 
                  url: https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&h=350
            hip-hopp:
                  query: boom box
                  id: 159613
                  url: https://images.pexels.com/photos/159613/ghettoblaster-radio-recorder-boombox-old-school-159613.jpeg
            rap: 
                  query: rap music
                  id: 2091383
                  url: https://images.pexels.com/photos/2091383/pexels-photo-2091383.jpeg
            edm: 
                  query: edm music
                  id: 11401290
                  url:https://images.pexels.com/photos/11401290/pexels-photo-11401290.jpeg
      */

      // var urlByQuery = `https://api.pexels.com/v1/search?query=${query}&per_page=30`;

      fetch(urlById, {
            method: 'GET',
            headers: {
                  Authorization: 'v02S0I9htMCYgc11EVr0Yf9D4VnE1EDvcONyoroDFmlLYS8kEi5IdfbT'
            }
      })
            .then(function (response) {
                  return response.json(); // need to have the return here so we can use the next, .then to get the response data.
            })
            .then(function (data) {
                  // var picture = data.src.medium;
                  // var photographer = data.photographer;
                  console.log('getPexelsApi: ', data);
            });
};
function getSpitifyApi() { // Mac
      url = "";

      fetch(url) // might need another argument like in getPexelsApi() ex, {method: "GET", headers: ...}
            .then(function (response) {
                  return response.json(); // need to have the return here so we can use the next .then to get the response data.
            })
            .then(function (data) {
                  console.log("getMusixMatch: ", data);
                  // fuction that you want to run.
            });
}
function renderNextQuestion() { // Mac and Sal
      /*
            this function need to have: 
            - An if statement at the begining that checks to see if we are done with the qestions.
            - A loop that iterates through the questionsArray, and returns the values for each question and the responses.
                  + within the loop you also want to get the values and append them to an element questions.html
            - lastly, use 'this' keyword if you can to save selected choice tally to their respective Genre Tallie.
      */
}
function getTallies() {
      /*
            - This function will get the values of the Genre tallies
              and compare to see which is highter. 
            - it will return a string with the genre that won. for example, 'rock'
      */
}
function getRecomendedGenre() {
      /*
            - this function will call getTallies() and use the response string
              to match to make a call to the getPexelsApi(). 
            - use the 'select pictures info:' in the getPexelsApi() function to find 
              the picture we are using. Pass in the id to getPexelsApi()
            - fx will use Location() function to render the thirdpage.html. 
            - in this page, we will have the Pexel picture on the left, and the 
              music recomendations based on the tallies responses to the right.
      */
}
function getSoundCloudApi() { //could not figure this out. Used spotify api instead.
      var url = '';
      var apiKey = '';
      fetch(urlById, {
            method: 'GET',
            headers: {
                  Authorization: 'v02S0I9htMCYgc11EVr0Yf9D4VnE1EDvcONyoroDFmlLYS8kEi5IdfbT'
            }
      })
            .then(function (response) {
                  return response.json(); // need to have the return here so we can use the next, .then to get the response data.
            })
            .then(function (data) {
                  // var picture = data.src.medium;
                  // var photographer = data.photographer;
                  console.log('getPexelsApi: ', data);

            });
}
function getSpotifiyApi() {    // Sal
      $(document).ready(function () {
            getToken();
      })
      const clientId = 'aace5f500b004bd987fbd76950c65ed3';
      const clientSecret = 'd3a4f2f98cd84191bd0dfffdf624a31e';
      var genreQuery = "rap"; // this value changes depening on the tally winner.
      var searchEndPoint = `https://api.spotify.com/v1/search?q=${genreQuery}&type=track`;
      // step 1: need to get token first.
      const getToken = async () => {
            const result = await fetch('https://accounts.spotify.com/api/token', {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
                  },
                  body: 'grant_type=client_credentials'
            });
            const data = await result.json();
            var token = data.access_token;

            getTracks(token, searchEndPoint);
            return token; // might not need this return bc we are calling the getTracks function above.
      }
      // 2. use token to access teh endpoint.
      const getTracks = async (token, endPoint) => {
            // console.log("getTracks token:" + token + " endpoint: " + endPoint)
            const result = await fetch(endPoint, {
                  method: 'GET',
                  headers: { 'Authorization': 'Bearer ' + token }
            });
            const data = await result.json();
            // need to put songPreview, artist, and album ins some kind of container.
            var songPreview = data.tracks.items[0].preview_url
            var artist = data.tracks.items[0].artists[0].name
            var album = data.tracks.items[0].album.name 
            // var time = // song time length. 
            console.log("song preview: ", songPreview)
            console.log("the artist: ", artist)
            console.log("the album is: ", album)
            appendToHtml(data, songPreview, artist, album);
            return data.items; // might not need this return bc we are calling the appendToHtml function above.
      }
      3. // append the tracks to the respective html doc. (thirdpage.html)
      function appendToHtml(data, song, artist, album) {// mgiht need to make a media player ui if cant figure out how to use iFrame.
            console.log('appendToHtml data: ', data)
            var songContainer = $("#songContainer");
            var appSong = $('<p class="songPreview">Song Preview: ' + song + '</p>');
            songContainer.append(appSong);
            var appArtist = $('<p class="songArtist">Artis : ' + artist + '</p>');
            songContainer.append(appArtist);
            var appAlbum = $('<p class="songAlbum">Song Preview: ' + album + '</p>');
            songContainer.append(appAlbum);
      }
      /* // code for iframe media player in html
      window.onSpotifyIframeApiReady = (IFrameAPI) => {
            const element = document.getElementById('embed-iframe');
            const options = {
                  uri: 'spotify:episode:7makk4oTQel546B0PZlDM5'
            };
            const callback = (EmbedController) => {
                  document.querySelectorAll('.episode').forEach(
                        episode => {
                              episode.addEventListener('click', () => {
                                    // click event handler logic goes here
                              });
                        })
            };
            IFrameAPI.createController(element, options, callback);
      };
      const callback = (EmbedController) => {
            document.querySelectorAll('.episode').forEach(
                  episode => {
                        episode.addEventListener('click', () => {
                              // click event handler logic goes here
                        });
                  })
      };
      episode.addEventListener('click', () => {
            EmbedController.loadUri(episode.dataset.spotifyId)
      });
      const options = { // not sure where this goes
            width: '60%',
            height: '200',
            uri: 'spotify:episode:7makk4oTQel546B0PZlDM5'
      };
      */
}



/* 



TODO: 
- need to change appendToHtml() to match the id's from the html page.
- we might neet to make a script file for each html page.


BUGS: list any bug here so that we are all aware of the issues.

-

-

-






*/ 