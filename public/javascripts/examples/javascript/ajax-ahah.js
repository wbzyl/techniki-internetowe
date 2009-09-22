// AHAH, czyli Asynchronous HTTP and HTML

$(document).ready(function () {
  $('#love').click(function () {
    $('#content').load('/doc/examples/javascript/love.html');
    //$('#content').hide().load('/examples/javascript/love.html', function () {
    //  $(this).fadeIn();
    //});
  });
});

// Getting JSON
// Dane powinny być gotowe do konsumpcji,
// czyli do umieszczenia na stronie WWW.
// Oznacza, to że nie napisy nie powinny zawierać
// znaku '<' albo '&'

$(document).ready(function () {
  $('#linux').click(function () {
    $.getJSON('/data/linux.json', function (data) {
      $('#content').empty();

      // alert("data: " + data);
      var html = '';
      $.each(data, function (index, entry) {
        html += '<div class="entry">';
        html += '<p>' + entry['q'] + '</p>';
        if (entry['a']) {
          html += '<p class="author">' + entry['a'] + '</p>';
        }
        html += '</div>';
      });
      $('#content').append(html);
    });
  });
});

// XML

$(document).ready(function () {
  $('#pets').click(function () {
    $.get('/data/pets.xml', function(data) {
      //alert("data:\n" + data);
      $('#content').empty();
      var html = '';
      $(data).find('quote').each(function() {
        //alert("quote: " + this);
        var $entry = $(this);
        html += '<div class="entry">\n';
        html += '<p>' + $entry.text() + '</p>\n';
        if ($entry.attr('author')) {
          html += '<p class="author">' + $entry.attr('author') + '</p>';
        }
        html += '</div>\n';
      });
      //alert("html:\n" + html);
      $('#content').append(html);
    });
  });
});

// POST request, form

$(document).ready(function () {
  $('#select').hide();
  $('#asciiart').click(function () {
    $('#select').show();

    $('#select').submit(function (event) {
      $.post('/asciiart', $(this).find('input').serialize(), function(data) {
        //alert(data);
        $('#content').html(data);
      });
      event.preventDefault();
    });

  });
});

// Keeping an eye on the request: throbber

$(document).ready(function () {
  $('#throbber').hide();
  $('#throbber').ajaxStart(function () {
    $(this).show();
  }).ajaxStop(function () {
    $(this).hide();
  });
});