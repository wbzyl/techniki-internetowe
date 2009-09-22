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
    $('#GoogleForm').ajaxForm({
      dataType: 'jsonp',
      success: processJSONP,
      // jsonp: 'callback',  // Google uses this default value
      // resetForm: true,    // reset the form after successful submit
      // clearForm: true,    // clear all form fields after successful submit
      //
      // $.ajax options can be used here too, for example:
      // timeout: 4000,
      error: function(xhr, textstatus, err) {
        if (window.console && window.console.log) {
          console.log(err.message);
        } else {
          alert(err.message);
        }
      }
    });
});

// $(document).ajaxError(function(ev,xhr,o,err) {
//  if (window.console && window.console.log)
//    console.log(err);
//});

function processJSONP(data) {
    if (data.responseData.results && data.responseData.results.length > 0) {
      var results = data.responseData.results;
      $('#service').empty();
      for (var i=0; i < results.length; i++) {
        $("#service").append(results[i].titleNoFormatting + '\n');
      }
    }
}

// Overlay the input box over the label text.

$(document).ready(function() {
  var $search = $('#GoogleForm').addClass('overlabel');
  var $searchInput = $search.find('input');
  var $searchLabel = $search.find('label');

  if ($searchInput.val()) {   // only display what user typed in
    $searchLabel.hide();
  }

  // When you tab into a field or click on a field you give it focus.
  // Blur is the opposite.

  $searchInput
    .focus(function() {       // user has moved into the input filed
      $searchLabel.hide();    // so, hide the label text
    })
    .blur(function() {
      if (this.value == '') { // user hasn't typed anything
        $searchLabel.show();  // so, restore the label text
      }
    });

  $searchLabel.click(function() {
    $searchInput.trigger('focus');
  });
});
