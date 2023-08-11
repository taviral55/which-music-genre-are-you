$(document).ready(function () {
      getPexelsApi();
      // getSpitifyApi();
});
var spotifyApiKey = '';
var pexelsApiKey = 'v02S0I9htMCYgc11EVr0Yf9D4VnE1EDvcONyoroDFmlLYS8kEi5IdfbT';

// Genre tallies: This might need to go inside of 'localStorage'.
var rock = 0;
var punk = 0; 
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

// Event Handlers:
// 1. on start button 'click'
// 2. on question choice 'click'
// 3. on display results 'click'.

// Functions:
function getPexelsApi() {
      var url = "https://api.pexels.com/v1/search?query=nature&per_page=1";
      fetch(url, {
            method: 'GET',
            headers: {
                  Authorization: 'v02S0I9htMCYgc11EVr0Yf9D4VnE1EDvcONyoroDFmlLYS8kEi5IdfbT'
            }

      })
            .then(function (response) {
                  return response.json(); // need to have the return here so we can use the next, .then to get the response data.
            })
            .then(function (data) {
                  console.log('getPexelsApi: ', data);
                  // fuction that you want to run.
            });

};

function getSpitifyApi() {
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


function renderNextQuestion() {
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
      - This function will get the values of the Genre tallies and compare to see which is highter. 
*/ 
}
function getRecomendedGenre() {
/*
      - this function will call getTallies() and use the responce 
        to match it with the API calls. 
      - fx will render to the thirdpage.html the Pexel picture, and the 
        music recomendations based on the tallies response.

*/ 
}


/* BUGS: list any bug you have here so that we are all aware of the issues.

-

-

-






*/ 