
// Przerabiamy alternateRowColors na wtyczkę.
// Skorzystamy z niej w tabelce z #expando poniżej.

(function($){
   $.fn.alternateRowColors = function() {
     $('tbody tr:even', this).removeClass('odd').addClass('even');
     $('tbody tr:odd', this).removeClass('even').addClass('odd');
     return this;
   };
})(jQuery);


$(document).ready(function() {

  // tell tablesorter which table to sort
  $("#niedziela").tablesorter();

  // private function
  var alternateRowColors = function(context) {
    $('tbody tr:even', context).removeClass('odd').addClass('even');
    $('tbody tr:odd', context).removeClass('even').addClass('odd');
  };

  $('#alpha').each(function() {
    var $table = $(this);  // zapamiętaj
    alternateRowColors($table);

    $('thead td', $table).each(function(column) {  // pobierz numer kolumny
      if ($(this).is('.sort-alpha')) {
        // alert("found column: " + column);
        $(this).addClass('clickable').hover(function() {
          $(this).addClass('hover');
        }, function() {
          $(this).removeClass('hover');
        }).click(function() {

          var rows = $table.find('tbody > tr').get();  // get DOM elements
          rows.sort(function(a, b) {
            var keyA = $(a).children('td').eq(column).text().toUpperCase();
            var keyB = $(b).children('td').eq(column).text().toUpperCase();
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
          });

          $.each(rows, function(index, row) {
            $table.children('tbody').append(row);
          });

          alternateRowColors($table);

        });
      }
    });
  });

  $('#alpha').each(function() {
    var $table = $(this);  // zapamiętaj
    $('thead td', $table).each(function(column) {  // pobierz numer kolumny
      if ($(this).is('.sort-numeric')) {
        //alert("found column: " + column);
        $(this).addClass('clickable').hover(function() {
          $(this).addClass('hover');
        }, function() {
          $(this).removeClass('hover');
        }).click(function() {

          var rows = $table.find('tbody > tr').get();  // get DOM elements
          rows.sort(function(a, b) {
            var keyA = parseInt($(a).children('td').eq(column).text(), 10);
            var keyB = parseInt($(b).children('td').eq(column).text(), 10);
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
          });

          $.each(rows, function(index, row) {
            $table.children('tbody').append(row);
          });

          alternateRowColors($table);

        });
      }
    });
  });

  $('#expando').each(function() {
    var $table = $(this);
    $table.alternateRowColors();

    $('thead td', $table).each(function(column) {
      if ($(this).is('.sort-alpha')) {
        //alert("found column: " + column);
        $(this).addClass('clickable').hover(function() {
          $(this).addClass('hover');
        }, function() {
          $(this).removeClass('hover');
        }).click(function() {

          var rows = $table.find('tbody > tr').get();

          $.each(rows, function(index, row) {
            row.sortKey = $(row).children('td').eq(column).text().toUpperCase();
          });

          rows.sort(function(a, b) {
            if (a.sortKey < b.sortKey) return -1;
            if (a.sortKey > b.sortKey) return 1;
            return 0;
          });

          $.each(rows, function(index, row) {
            $table.children('tbody').append(row);
            row.sortKey = null;  // avoid possible memory leaks
          });

          $table.alternateRowColors();

        });
      }
    });
  });

});
