$(document).ready(function() {

  $('.poem').addClass('emphasized');

  $('.poem .stanza:even').addClass('even');
  $('.poem .stanza:odd').addClass('odd');

  $('table tbody tr:even').addClass('even');
  $('table tbody tr:odd').addClass('odd');

});
