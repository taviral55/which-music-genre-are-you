$(document).ready(function () {
      getPexelsApi("edm music")
      // getSpitifyApi();
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
function getPexelsApi(query) {

      var urlById = ''; // need to find the id of the picture first.
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
      
      var urlByQuery = `https://api.pexels.com/v1/search?query=${query}&per_page=30`;
      fetch(urlByQuery, {
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
      - This function will get the values of the Genre tallies
        and compare to see which is highter. 
      - it will return a string with the genre that won. for example, 'rock'
*/ 
}
function getRecomendedGenre() {
/*
      - this function will call getTallies() and use the response string
        to match to make a call to the getPexelsApi(genre string from getTallies). 
      - use the 'select pictures info:' in the getPexelsApi function to find 
        the picture we are using. could also search by id. 
      - fx will use Location function to render the thirdpage.html. 
      - in this page, we will have the Pexel picture on the left, and the 
        music recomendations based on the tallies responses to the right.
*/ 
}


/* BUGS: list any bug here so that we are all aware of the issues.

-

-

-






*/ 