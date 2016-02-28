//make the list of photos available as an array
var startDeck = [
  'armchair_PNG7069.png',
  'balloon_PNG3395.png',
  'basketball_PNG1096.png',
  'bee_PNG15.png',
  'bicycle_PNG5384.png',
  'bread_PNG2299.png',
  'bug_PNG4005.png',
  'butterfly_PNG1063.png',
  'cheese_PNG10.png',
  'cherry_PNG635.png',
  'chocolate_PNG37.png',
  'clock_PNG6593.png',
  'cup_PNG1980.png',
  'dolphin_PNG9127.png',
  'duck_PNG5021.png',
  'egg_PNG49.png',
  'football_PNG1091.png',
  'green_leaves_PNG3670.png',
  'guitar_PNG3374.png',
  'hat_PNG5715.png',
  'kettle_PNG8725.png',
  'ladybug_PNG3960.png',
  'persimmon_PNG9191.png',
  'pomegranate.png',
  'rabbit_PNG3790.png',
  'rose_PNG656.png',
  'strawberry_PNG2595.png',
  'sushi_PNG9266.png',
  'tennis_PNG10414.png',
  'tulip_PNG9014.png',
  'umbrella_PNG498.png',
  'wolf_PNG347.png'
];

var openCards = 0;
var totalOpen = 0;
var $firstImg, $firstCover, totalCards;

var shuffle = function(deck) {
  var shuffled = [];
  while (deck.length) {
    var idx = Math.floor(Math.random() * deck.length);
    shuffled.push(deck[idx]);
    deck.splice(idx, 1);
  }
  return shuffled;
}

//shuffle starting deck
startDeck = shuffle(startDeck);

$('form').on('submit', function(e) {
  e.preventDefault();
  var name = $('#name').val();
  var rows = parseInt($('input[name="number"]:checked').val());
  var $rowOfDivs;
  var finalCards = [];
  totalCards = rows * rows;
  var numOfCards = (totalCards) / 2;
  //create a new deck with only n/2 cards
  while (numOfCards) {
    finalCards.push(startDeck.pop());
    numOfCards--;
  }
  finalCards = shuffle(finalCards.concat(finalCards));
  $('form').hide();
  //insert name into greeting
  $('#belongs-to').text(name);
  //lay out hidden cards
  for (var i = 0; i < rows; i++) {
    $rowOfDivs = $('<div class="row" />');
    for (var j = 0; j < rows; j++) {
      var $cardDiv = $('<div class="card" />');
      var imageName = '<img class="hidden" src="assets/images/' + finalCards.pop() + '" />' ;
      $cardDiv.append($(imageName));
      $cardDiv.append('<div class="cover" />')
      $rowOfDivs.append($cardDiv);
    }
    $('#game').append($rowOfDivs);
  }

  $('#game').toggleClass('hidden');
});

//on clicking card, toggle hidden class for .cover and .card items
$('#game').on('click', '.cover', function(e) {
  //track how many cards are open
  var $this = $(this);
  var $img = $this.prev();
  openCards++;
  totalOpen++;
  $this.toggleClass('hidden');
  $img.toggleClass('hidden');

  if (openCards === 2) {
    //if the two cards don't match, turn them back over
    if (!($img.attr('src') === $firstImg.attr('src'))) {
      setTimeout(function() {
        $this.toggleClass('hidden');
        $img.toggleClass('hidden');
        $firstImg.toggleClass('hidden');
        $firstCover.toggleClass('hidden');
      }, 1000);
      totalOpen -= 2;
    }
    openCards = 0;
    //make cards unclickable
    $('.cover').toggleClass('unclickable');
    //allow cards to be clicked again
    setTimeout(function() {
      $('.cover').toggleClass('unclickable');
    }, 1000);
  } else {
    $firstImg = $img;
    $firstCover = $this;
  }

  if (totalOpen === totalCards) {
    //open a modal saying 'you won!' with a button to restart
    alert('You won!');
  }
});


