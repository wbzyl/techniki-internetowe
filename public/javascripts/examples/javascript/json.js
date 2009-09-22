$(document).ajaxError(function(ev,xhr,o,err) {
  alert(err);
  if (window.console && window.console.log)
    console.log(err);
});

// Use the hardcoded query string: q=jquery

$(document).ready(function() {
  $.getJSON("http://ajax.googleapis.com/ajax/services/search/web?q=jquery&v=1.0&callback=?",
            // On search completion, process the results
            function(data) {
              if (data.responseData.results && data.responseData.results.length > 0) {
                var results = data.responseData.results;
                for (var i=0; i < results.length; i++) {
                  // Display each result however you wish
                  // alert(results[i].titleNoFormatting);
                  $("#service").append(results[i].titleNoFormatting + '\n');
                }
              }
            });
});

// Use the Form plugin.

$(document).ready(function() {
  $('#GoogleForm').submit(function() {

    var queryString = $('#GoogleForm').formSerialize();

    $(this).ajaxSubmit({
      dataType: 'jsonp',
      jsonp: 'callback', // the default value
      success: function(data) {
        if (data.responseData.results && data.responseData.results.length > 0) {
          var results = data.responseData.results;
          $('#service').empty();
          for (var i=0; i < results.length; i++) {
            $("#service").append(results[i].titleNoFormatting + '\n');
          }
        }
      }
    });

    $(this).clearForm();

    return false;

  });
});
