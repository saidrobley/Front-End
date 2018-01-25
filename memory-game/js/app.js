/*
 * Create a list that holds all of your cards
 */
let symbols = ["diamond", "diamond", "paper-plane", "paper-plane", "anchor", "anchor", "bolt", "bolt", "cube", "cube", "leaf", "leaf", "bicycle", "bicycle", "bomb", "bomb"];
let deck = $('.deck');
let cards = [];
let openCards = [];
let numMoves = 0;
let numStars = 3;
let numMatches = 0;
let start_Game = false;
let timer = new Timer();
let ratings = 3;

// Timer from https://albert-gonzalez.github.io/easytimer.js/
timer.addEventListener('secondsUpdated', function (e){
    $('.clock').text(timer.getTimeValues().toString());
    
});


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// creates the cards on the deck
function displayCards(){
    symbols = shuffle(symbols);
    for(let i = 0; i < symbols.length; i++){
        deck.append('<li class="card"><i class="fa fa-' + symbols[i] + '"></li>');
        
    }
   
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 // listening for card click then execute the 
function createCardEvent(){
   $('.card').click(cardSelected);
}
// card functionality
function cardSelected() {
    
    // time to start after first selection
    if (start_Game == false) {
        start_Game = true;
        timer.start();
        
    }
    // first card
    if (openCards.length === 0) {
        $(this).toggleClass("show open");
        openCards.push($(this));
        removeClick();
    }
    // secon card
    else if (openCards.length === 1) {      
        $(this).toggleClass("show open");
        openCards.push($(this));
        setTimeout(checkMatches, 400);
    }
}

function removeClick() {
    openCards.forEach(function (card){
        card.off('click');
    });
}
function addClick() {
    openCards[0].click(cardSelected);
}

// check if the two opened cards match
function checkMatches(){
  
    if (openCards[0][0].firstChild.className == openCards[1][0].firstChild.className) {
        openCards[0].addClass("match");
        openCards[1].addClass("match");
        removeClick();
        setTimeout(checkWin, 400);
        numMatches++;
    }
    else {     
        numMoves++;
        $('.moves').text(numMoves);
        
        if(numMoves >= 20){
           ratings = 1;
        } else if (numMoves < 20 && numMoves >= 10){
            ratings = 2;
        } else if(numMoves < 10){
            ratings = 3;
        }
        starRatings(ratings);
    
       openCards[0].toggleClass("show open");
       openCards[1].toggleClass("show open");
       addClick();
       removeOpenCards();
    }
}
function starRatings(starRatings){
    $('.stars').empty();
    for(let i = 0; i < starRatings; i++){
        $('.stars').append('<li><i class="fa fa-star"></i><li>');
    }
}

function showCard(card){
    card.addClass('open show');
}

function addOpenCards(card){
   openCards.push(card);

}

function checkWin(){
    if(numMatches == 8){
        console.log("You win!!");  
       // deck.empty();
        showModal();
        timer.stop();
    }
    openCards = [];
}

// function to remove openCards
function removeOpenCards() {
    openCards = [];
}

// reset the game
function resetButton() {
    deck.empty();
    openCards = [];
    $('.moves').html('0');
    numMoves = 0;
    numMatches = 0;
    createStars();
    timer.stop();
   $('.clock').text('00:00:00');
   start_Game = false;
    startGame();
}

$('.restart').click(resetButton);

function createStars(){
    $('.stars').empty();
    for(let i = 0; i < 3; i++){
        $('.stars').append('<li><i class="fa fa-star"></i><li>');
    }
}



startGame();


 function startGame(){
     $('.modal').css("display", "none");
    displayCards();
    createCardEvent();
   
  
 }

 function showModal(){
    $('.modal').css("display", "block");
    $('.moves').innerHTML = numMoves;
    console.log("num stars " + numStars);
    console.log("time " + timer.getTimeValues().toString());
    $('.numStars').text(ratings);
    $('.timer').text(timer.getTimeValues().toString());
    $('.playAgain').click(resetButton);
     
 }