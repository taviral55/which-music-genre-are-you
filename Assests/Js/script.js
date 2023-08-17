$(document).ready(function () {
  // getPexelsApi("rap"); // for testing only. this fx need to go in getRecomendations()
  // getSpotifiyApi(); // for testing only. this fx need to go in getRecomendations()
  // getRecommendedGenre ();
});

var pexelsApiKey = "v02S0I9htMCYgc11EVr0Yf9D4VnE1EDvcONyoroDFmlLYS8kEi5IdfbT";

// Genre tallies: This might need to go inside of 'localStorage'.
var genreTallies = [
  ["punk-rock", 0], // changed for testin only.
  ["rock", 0],
  ["rap", 0],
  ["country", 0],
  ["jazz", 0],
];

var questionIndex = 0; // the initial indes of the questions array.

var questionArray = [
  {
    question:
      "Pov: You're competing in a ski race down a spooky scarry mountain and need to montage all your training, which song do you pick?",
    choices: {
      a: "Welcome to  the jungle by  Guns n' Roses", //rock
      b: "My own worst enemy by LIT", // punk
      c: "The Motto by Drake.", // Rap
      d: "Hard Workin' Man by Brooks & Dunn", //Country
      e: "Scary Monsters and Nice Spirits by Skrillex", // edm
    },
  },
  {
    question: "Which of these is most important in a concert.?",
    choices: {
      a: "Dancing/Moshing", //Punk
      b: "Concert Atmosphere", //Rap
      c: "The Production", // rock
      d: "The Acoustics", // Country
      e: "The Acoustics", //Edm
    },
  },
  {
    question:
      "If  you got to hang out with your favorite musician, what would you do?",
    choices: {
      a: "Play Instruments Together", //punk
      b: "Party together", // rock
      c: "Share A J together", // rap
      d: "Enjoy a meal and a nice conversation", //Country
      e: "Dance-Off", // edm
    },
  },
  {
    question: "Do you like Drake?",
    choices: {
      a: "Yes", // EDM
      b: "No", // Rap
      c: "Absolutly Not", // rock
      d: "Absolutly Not", // punk
      e: "Who is that????", // county
    },
  },
  {
    question: "Pick an artist",
    choices: {
      a: "Ozzy Oz Borne", //rock
      b: "Joey Ramone", // punk
      c: "Eminem", // Rap
      d: "Kenny Chesney", //Country
      e: "TIESTO", // edm
    },
  },
];

//Event Handlers:
$("#startBtn").on("click", startGame); //jquery not DOM
$("#btnContainer").on("click", btnClickedChoice);

function startGame() {
  // done
  //getPexelsApi(159613); // for testing only. this fx need to go in getRecomendations()
  renderNextQuestion();
}
function getPexelsApi(q) {
  // done. id
  // var urlById = `https://api.pexels.com/v1/photos/${id}`; // need to find the id of the picture first.
  var urlBySearch = `https://api.pexels.com/v1/search?query=${q}&per_page=5`; // 'country' test link

  /* selected pictures info: 
            punkRock: 
                  query: 'punk'
                  id: 953457
                  url: "https://images.pexels.com/photos/953457/pexels-photo-953457.jpeg"
            rock: 
                  query: 'rock music'
                  id:1763075 
                  url: https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&h=350
            rap: 
                  query: rap music
                  id: 2091383
                  url: https://images.pexels.com/photos/2091383/pexels-photo-2091383.jpeg
      
                  country:  
                  query: country music
                  id: 34071
                  url: https://images.pexels.com/photos/34071/pexels-photo.jpg
            
            edm: 
                  query: edm music
                  id: 11401290
                  url:https://images.pexels.com/photos/11401290/pexels-photo-11401290.jpeg
      */

  fetch(urlBySearch, {
    method: "GET",
    headers: {
      Authorization: "v02S0I9htMCYgc11EVr0Yf9D4VnE1EDvcONyoroDFmlLYS8kEi5IdfbT",
    },
  })
    .then(function (response) {
      return response.json(); // need to have the return here so we can use the next, .then to get the response data.
    })
    .then(function (data) {
      var picture = data.photos[0].src.medium;
      console.log("getPexelsApi picture: ", picture);
      appendPexelPicture(picture);
      // return picture;
    });
}
function appendPexelPicture(img) {
  $("#pexelsContainer").html("");
  var imageEl = $("#pexelsContainer");
  var img = $(
    `<img id="pexelImg" src="${img}" width="500" height="500" alt="music genre image">`
  );
  imageEl.append(img);
}
function getSpotifiyApi(q) {
  // done
  $(document).ready(function () {
    getToken();
  });

  const clientId = "aace5f500b004bd987fbd76950c65ed3";
  const clientSecret = "d3a4f2f98cd84191bd0dfffdf624a31e";
  // var query = 'hip hop'; for testing only.
  var searchEndPoint = `https://api.spotify.com/v1/search?q=${q}&type=track&limit=5`; // need to add # of track.

  // 1st we have to get the token using our client creds.
  const getToken = async () => {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      body: "grant_type=client_credentials",
    });

    const data = await result.json();
    var token = data.access_token;

    getTracks(token, searchEndPoint);
    return token;
  };

  // 2nd: Now we search for the song.
  const getTracks = async (token, endPoint) => {
    // console.log("getTracks token:" + token + " endpoint: " + endPoint)
    const result = await fetch(endPoint, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });

    const data = await result.json();
    appendToHtml(data);
  };

  // 3rd: append the tracks to the respective html element
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

      var appIconImg = $(
        `<img src=${imageIcon} alt="Album cover image" width="75" height="75" />`
      );
      card.append(appIconImg);

      var appArtist = $('<p class="songArtist3">Artist : ' + artist + "</p>");
      descContainer.append(appArtist);
      var appTitle = $('<p class="songTitle3">Title : ' + title + "</p>");
      descContainer.append(appTitle);
      var appSong = $(
        `<p class="songPreview3">Song Preview: <a href="${songPreview}" target="_blank">Click for Song Preview</a> </p>`
      );
      descContainer.append(appSong);

      card.append(descContainer);
    }
  }
}

// Questions Page Functions:
function renderNextQuestion() {
  // done
  $("#question").html(""); // clears the html at the id.
  $("#btn1").html("");
  $("#btn2").html("");
  $("#btn3").html("");
  $("#btn4").html("");
  $("#btn5").html("");

  $("#startPage").hide();
  $("#resultsPage").hide();
  $("#questionsPage").show();

  if (questionIndex === questionArray.length) {
    // checks for last question click
    $("#startPage").hide();
    $("#questionsPage").hide();
    $("#resultsPage").show();
    getRecommendedGenre(); //UNCOMMENT AFTER TESTING
    return;
  }

  var currentQuestion = questionArray[questionIndex]; // returns the question text inside the questions array.

  $("#question").append(currentQuestion.question); // appends question to question container.

  for (var i = 0; i < 5; i++) {
    // renders all the choices to the html.
    var choiceBtnEl = $("#btn" + (i + 1)); // bc btns start at 1.
    var btnInnerText =
      currentQuestion.choices[Object.keys(currentQuestion.choices)[i]]; // gets values of choices.
    choiceBtnEl.append(btnInnerText);
  }

  questionIndex++;
  console.log("genreTallies:", genreTallies); // Testing: to see the current tallies after each question.
}

function btnClickedChoice(event) {
  // done
  var userChoice = event.target.innerText.trim();

  var currentQuestionObj = questionArray[questionIndex - 1];
  // console.log("currentQuestionObj:", currentQuestionObj);

  // Gets the choice key a, b, c, d, e, and the values are what we compare.
  var choiceKey = findChoiceKey(currentQuestionObj.choices, userChoice); //NOT GETTING THE A KEY IN FIRST QUESTION.
  console.log("FindChoiceKey function returns:", choiceKey);

  updateTallies(choiceKey);

  renderNextQuestion();
}
function findChoiceKey(choicesObj, userBtnSelection) {
  // done. compares choices values, with button selection text.
  var letterChoice = userBtnSelection.trim();
  var keys = Object.keys(choicesObj);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var trimedKey = key.trim();
    console.log("keyOut:", trimedKey);
    console.log(
      "Object and UserKey Comp: " + choicesObj[trimedKey] + "===" + letterChoice
    );

    if (choicesObj[trimedKey] === letterChoice) {
      // IN 1ST ITERATION, DOES NOT ACCEPT CHOICE A, OR E.
      console.log("keyIn:", trimedKey);
      return trimedKey;
    }
  }
  // return null; // if choice key not found
}
function updateTallies(choiceKey) {
  // done
  switch (choiceKey) {
    case "a":
      genreTallies[0][1]++; // punk-rock
      break;
    case "b":
      genreTallies[1][1]++; // rock
      break;
    case "c":
      genreTallies[2][1]++; // rap
      break;
    case "d":
      genreTallies[3][1]++; // country
      break;
    case "e":
      genreTallies[4][1]++; // edm
      break;
    default:
      break; // if no case match.
  }
}

// Third Page Functions:
function getRecommendedGenre() {
  // done
  console.log("m IS WORKING!");
  var responseArray = [
    { genre: "punk-rock", description: "Your are Punk-Rock!" },
    { genre: "rock", description: "Your are a Rocker!" },
    { genre: "rap", description: "Your are a Rapper!" },
    { genre: "country", description: "Your are Country!" },
    { genre: "edm", description: "Your are a Edmer!" },
  ];

  var testTally = genreTallies;

  var tallyWinner = getGreatestTally(testTally); // ex, 'rap' -returns Genre string.
  tallyWinner.trim();
  console.log("tallyWinner:", tallyWinner);

  getPexelsApi(tallyWinner); // in pexels fx, it appends to html
  getSpotifiyApi(tallyWinner);

  var genreTitle = "";
  var genreDescription = "";
  for (var i = 1; i <= responseArray.length; i++) {
    console.log("Description winner: ", responseArray[i].genre);
    console.log("tallyWinner: ", tallyWinner);
    if (responseArray[i].genre === tallyWinner) {
      genreTitle = responseArray[i].genre;
      genreDescription = responseArray[i].description;
      break; // exits the loop
    }
  }

  $("#winningResponse").append("YOUR MISIC GENRE IS: " + genreTitle);
  $("#genreTitle").append("Genre: " + genreTitle);
  $("#genreDescription").append("Genre Description: " + genreDescription);
}
function getGreatestTally(tallies) {
  // done
  let winningGenre = "";
  let greatestTally = 0; // initial startin point for comparison

  tallies.forEach(([genre, count]) => {
    if (count > greatestTally) {
      greatestTally = count; // re-assigns the variable
      winningGenre = genre;
    }
  });

  return winningGenre;
}

/* 


TODO: 
- might need more question so you dont get tie with the greatestTally. or default to the last high number.


BUGS:.

- LINE 262 -in the findChoiceKey(), it does not return the first or the last choice key, or value

-

-

*/
