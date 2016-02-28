//

$('form').on('submit', function(e) {
  e.preventDefault();
  var name = $('#name').val();
  var rows = parseInt($('input[name="number"]:checked').val());
  var $rowOfDivs;
  var total = rows * rows;
  $('form').hide();
  //insert name into greeting
  $('#belongs-to').text(name);
  //lay out hidden cards
  for (var i = 0; i < rows; i++) {
    $rowOfDivs = $('<div class="row" />')
    for (var j = 0; j < rows; j++) {
      //generate a random number in range 0 to n / 2
      //create the image name from the random number
      $rowOfDivs.append('<div class="card" />');
      //subtract 1 from n
    }

    $('#game').append($rowOfDivs);
  }

  $('#game').toggleClass('hidden');
});
