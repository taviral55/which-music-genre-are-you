$(document).ready(function () {
      // getPexelsApi(159613); // for testing only. this fx need to go in getRecomendations()
      // getSpotifiyApi(); // for testing only. this fx need to go in getRecomendations()
});

var pexelsApiKey = 'v02S0I9htMCYgc11EVr0Yf9D4VnE1EDvcONyoroDFmlLYS8kEi5IdfbT';

// Genre tallies: This might need to go inside of 'localStorage'.
var genreTallies = [
      ["punk-rock", 6],
      ["rock", 0],
      ["rap", 0],
      ["country", 0],
      ["jazz", 0]
]
/* var punkRockCount = 0;
var rockCount = 0;
var hipHopCount = 0;
var rapCount = 0
var edmCount = 0;*/

var questionIndex = 0; // the initial indes of the questions array.

var questionArray = [
      {
            question: "Pov: You're competing in a ski race down a spooky scarry mountain and need to montage all your training, which song do you pick?",
            choices: {
                  a: "Welcome to  the jungle by  Guns n' Roses", //rock
                  b: "My own worst enemy.", // punk
                  c: "The Motto by Drake.", // Rap
                  d: "Hard Workin' Man by Brooks & Dunn", //Country
                  e: "Scary  Monsters and Nice Spirits by Skrillex", // edm
            }
      },
      {
            question: "Which of these is most important in a concert.?",
            choices: {
                  a: "Dancing/Moshing", //Punk
                  b: "Concert Atmosphere", //Rap
                  c: "The Production", // rock 
                  d: "The Acoustics", // Country
                  e: "The Acoustics", //Edm
            }
      },
      {
            question: "If  you got to hang out with your favorite musician, what would you do?",
            choices: {
                  a: "Play Instruments Together", //punk
                  b: "Party together", // rock
                  c: "Share A J together", // rap
                  d: "Enjoy a meal and a nice conversation", //Country
                  e: "Dance-Off" // edm
            }
      },
      {
            question: "Do you like Drake?",
            choices: {
                  a: "Yes", // EDM
                  b: "Yes", // Rap
                  c: "Absolutly Not", // rock 
                  d: "Absolutly Not", // punk
                  e: "Who is that????", // county
            }

      },
      {
            question: "Pick an artist",
            choices: {
                  a: "Ozzy Oz Borne", //rock
                  b: "Joey Ramone", // punk
                  c: "Eminem", // Rap
                  d: "Kenny Chesney", //Country
                  e: "TIESTO", // edm
            }
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
$('#startBtn').on("click", startGame); //jquery not DOM



// Index Page Functions:
function startGame() { // done
      getPexelsApi(159613); // for testing only. this fx need to go in getRecomendations()
      getSpotifiyApi();
      renderNextQuestion();
      window.location.href = "./questions.html";
}
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
                  // console.log('getPexelsApi: ', data);
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
            var songContainer = $("#cardContainer");
            var queryLenth = data.tracks.items.length; // should be 5 

            for (var i = 0; i < queryLenth; i++) {
                  var shortened = data.tracks.items[i];
                  var card = $('<div class="card3"> </div>');
                  var descContainer = $('<div class="desc3"></div>');

                  songContainer.append(card);

                  var imageIcon = shortened.album.images[2].url;
                  var artist = shortened.artists[0].name;
                  var title = shortened.name;
                  var songPreview = shortened.preview_url;

                  var appIconImg = $(`<img src=${imageIcon} alt="Album cover image" width="75" height="75" />`);
                  card.append(appIconImg);

                  var appArtist = $('<p class="songArtist3">Artist : ' + artist + '</p>');
                  descContainer.append(appArtist);
                  var appTitle = $('<p class="songTitle3">Title : ' + title + '</p>');
                  descContainer.append(appTitle);
                  var appSong = $(`<p class="songPreview3">Song Preview: <a href="${songPreview}" target="_blank">Click for Song Preview</a> </p>`);
                  descContainer.append(appSong);

                  card.append(descContainer);
            }
      }
}

// Questions Page Functions:
// use display of none property for sections instead of different pages.
function renderNextQuestion() { // Mac and Sal
      /* this function need to have: 
            - An if statement at the begining that checks to see if we are done with the qestions.
            - A loop that iterates through the questionsArray, and returns the values for each question and the responses.
                  + within the loop you also want to get the values and append them to an element questions.html
            - lastly, use 'this' keyword if you can to save selected choice tally to their respective Genre Tallie.
      */

      // if (questionIndex < 0 || questionIndex >= questionArray.length) {// checks that there are no negatives.
      //       return;
      // }

      var currentQuestion = questionArray[questionIndex]

      // sets the new question in the html
      $("#question2").text(currentQuestion.question);

      for (var i = 0; i < 5; i++) { // renders all the choices to the html.
            // console.log(Object.keys(currentQuestion.choices)[i])
            $("#btn" + i).text(currentQuestion.choices[Object.keys(currentQuestion.choices)[i]]); // = ex, ['a']
            console.log('currentQuestion.choices[i]: ', currentQuestion.choices[Object.keys(currentQuestion.choices)[i]])
      };

      questionIndex++;
}

// Third Page Functions: 
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
      var exampleTally = 'hip-hop';

      var responseArray = [
            { genre: "punk-rock", description: "Your are Punk-Rock!" },
            { genre: "rock", description: "Your are a Rocker!" },
            { genre: "rap", description: "Your are a Rapper!" },
            { genre: "country", description: "Your are Country!" },
            { genre: "edm", description: "Your are a Edmer!" },
      ]

      // getGreatestTally(punkRockCount, rockCount, rapCount, hipHopCount, edmCount);

}
function getGreatestTally(tallies) { // done.
      let winningGenre = "";
      let greatestTally = 0;

      tallies.forEach(([genre, count]) => {
            if (count > greatestTally) {
                  greatestTally = count;
                  winningGenre = genre;
            }
      });
      return winningGenre;
}
function updateTallies(questionArr) {
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
}

// console.log("updateTallies: ", updateTallies(questionArray));



/* 


TODO: 
- need to change appendToHtml() to match the id's from the html page.
- we might neet to make a script file for each html page.


BUGS: list any bug here so that we are all aware of the issues.

- renderNextQuestion- not appending to html.

-

-






*/ 