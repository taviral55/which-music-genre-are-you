$(document).ready(function () {
      getPexelsApi(159613); // for testing only. this fx need to go in getRecomendations()
      getSpotifiyApi(); // for testing only. this fx need to go in getRecomendations()
});
var spotifyApiKey = '';
var pexelsApiKey = 'v02S0I9htMCYgc11EVr0Yf9D4VnE1EDvcONyoroDFmlLYS8kEi5IdfbT';

// Genre tallies: This might need to go inside of 'localStorage'.
var punkRock = 0;
var rock = 0;
var Country = 0;
var rap = 0
var edm = 0;

function updateTallies(questionArr) 
      /* pass in the button choice
          choices: { 
            a: "Ozzy Oz Borne", //rock
            b: "Joey Ramone", // punk
            c: "Eminem", // Rap
            d: "Kenny Chesney", //Country
            e: "TIESTO", // edm
          }
      */
      // then increase that tally.

      questionArr.forEach((question, index) => {
            console.log(`Question ${index + 1} choices:`, Object.keys(question.choices));
      });
      return;
var genreTallies = [
      ["punk-rock", 6],
      ["rock", 0],
      ["rap", 0],
      ["country", 0],
      ["jazz", 0]
]

var questionArray = [
      {
            question: "Pov: You're competing in a ski race down a spooky scarry mountain and need to montage all your training, which song do you pick?",
            a: "Welcome to  the jungle by  Guns n' Roses", //rock
            b: "My own wosrt enemy.", // punk
            c: "The Motto by Drake.", // Rap
            d: "Hard Workin' Man by Brooks & Dunn", //Country
            e: "Scary  Monsters and Nice Spirits by Skrillex", // edm
      },
      {
            question: "Which of these is most important in a concert.?",
            a: "Dancing/Moshing", //Punk
            b: "Concert Atmosphere", //Rap
            c: "The Production", // rock 
            d: "The Acoustics", // Country
            e: "The Acoustics", //Edm
            
      },
      {
            question: "If  you got to hang out with your favorite musician, what would you do?",
            a: "Play Instruments Together", //punk
            b: "Party together", // rock
            c: "Share A J together", // rap
            d: "Enjoy a meal and a nice conversation", //Country
            e: "Dance-Off" // edm
      },
      {
            question: "Do you like Drake?",
            a: "Yes", // EDM
            b:"Yes", // Rap
            c: "Absolutly Not", // rock 
            d: "Absolutly Not", // punk
            e: "Who is that????", // county
            
      },
      {
            question: "Pick an artist",
            a: "Ozzy Oz Borne", //rock
            b: "Joey Ramone", // punk
            c: "Eminem", // Rap
            d: "Kenny Chesney", //Country
            e: "TIESTO", // edm
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
function getSpotifiyApi() {    // done
      $(document).ready(function () {
            getToken();
      })

      const clientId = 'aace5f500b004bd987fbd76950c65ed3';
      const clientSecret = 'd3a4f2f98cd84191bd0dfffdf624a31e';
      var query = 'hip hop';
      var searchEndPoint = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=5`; // need to add # of track.

      // 1st we have to get the token using our client creds.
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
            return token;
      }

      // 2nd: Now we search for the song.
      const getTracks = async (token, endPoint) => {
            // console.log("getTracks token:" + token + " endpoint: " + endPoint)
            const result = await fetch(endPoint, {
                  method: 'GET',
                  headers: { 'Authorization': 'Bearer ' + token }
            });

            const data = await result.json();
            // need to put songPreview, artist, and album ins some kind of container.

            appendToHtml(data);
            return data.items;
      }
      // 3.append the tracks to the respective html doc. (thirdpage.html)
      function appendToHtml(data) { 
            var songContainer = $("#songContainer");
            var queryLenth = data.tracks.items.length; // should be 5 

            for (var i = 0; i < queryLenth; i++) {
                  var shortened = data.tracks.items[i];

                  var album = shortened.album.name;
                  var artist = shortened.artists[0].name;
                  var title = shortened.name;
                  var songPreview = shortened.preview_url;

                  var appAlbum = $('<p class="songAlbum">Song Albun: ' + album + '</p>');
                  songContainer.append(appAlbum);

                  var appArtist = $('<p class="songArtist">Artist : ' + artist + '</p>');
                  songContainer.append(appArtist);

                  var appTitle = $('<p class="songTitle">Title : ' + title + '</p>');
                  songContainer.append(appTitle);

                  var appSong = $(`<p class="songPreview">Song Preview: <a href="${songPreview}" target="_blank">Click for Song Preview</a> </p>`); 
                  songContainer.append(appSong);
            }
      }
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



/* 



TODO: 
- need to change appendToHtml() to match the id's from the html page.
- we might neet to make a script file for each html page.


BUGS: list any bug here so that we are all aware of the issues.

-

-

-






*/ 