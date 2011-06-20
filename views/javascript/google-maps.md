
## Jak zacząć?

1. [Sign up for a Google Maps API key](http://code.google.com/intl/pl/apis/maps/signup.html)
2. [Read the Maps API Concepts](http://code.google.com/intl/pl/apis/maps/documentation/index.html)
3. [Check out some Maps API Examples](http://code.google.com/intl/pl/apis/maps/documentation/examples/)
4. [Read the Maps API Reference](http://code.google.com/intl/pl/apis/maps/documentation/reference.html)

Zaczynamy od wejścia na stronę  
[Sign Up for the Google Maps API](http://code.google.com/intl/pl/apis/maps/signup.html)
i wygenerowania klucza do URL `http://localhost`.

Teraz kilkamy przycisk `Generate API Key`, co spowoduje że 
zostaniemy przekierowani na stronę z informacją:

    Your key is:
      
        1234...
    
    This key is good for all URLs consisting of this registered domain
    (and directory if applicable):
     
        http://localhost/

Uwaga: wygenerowany klucz jest też dobry dla url z wpisanym portem:

    http://localhost:4567


Uwaga **[4.04.2009]**: znalazłem  
[jquery-googlemap](http://code.google.com/p/jquery-googlemap/), 
czyli „a jQuery javascript plugin for plug-and-play Google Maps UI”.



## Przykład „hello world”

Nieco zmodyfikowany przykład
[Map Basics](http://code.google.com/intl/pl/apis/maps/documentation/introduction.html)

Plik `public/google.html`:

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <link href="/favicon.ico" rel="SHORTCUT ICON">
      <link href="/stylesheets/google.css" media="all" rel="Stylesheet" type="text/css" charset="utf-8">
      <script type="text/javascript" src="http://www.google.com/jsapi?key=1234..."></script>
      <script src="/javascripts/jquery.js" type="text/javascript" charset="utf-8"></script>
      <script src="/javascripts/google.js" type="text/javascript" charset="utf-8"></script>
      <title>Google Maps</title>
    </head>
      
    <body>
      <div id="map"></div>
      <div id="route"></div>
    </body>
      
    </html>
{:lang=html}


Plik `google.js`:

    // load the specific API you want
    google.load("maps", "2");
    
    function initialize() {
      var map = new google.maps.Map2(document.getElementById("map"));
      // kawiarnia „U Samanty”, Zakopane
      map.setCenter(new google.maps.LatLng(49.29196, 19.94800), 13);
      map.addControl(new google.maps.SmallMapControl());
      map.addControl(new google.maps.MapTypeControl());
    
      directionsPanel = document.getElementById("route");
      directions = new google.maps.Directions(map, directionsPanel);
      directions.load("from: Zakopane, Poland to: Nowy Targ, Poland");
    }
    
    // call initialize when the page has been loaded
    google.setOnLoadCallback(initialize);
{:lang=javascript}

<%= link_to "Link do tej strony", "/doc/examples/javascript/google.html" %>.

**Uwaga**: Google Maps API Key, dla tego przykładu i innych przykładów
został wygenerowany dla URL **http://localhost/**.


## Google AJAX Libs

*Reklama*: 
The AJAX Libraries API is a content distribution network and loading
architecture for the most popular, open source JavaScript
libraries. By using the Google AJAX API Loader's `google.load()`
method, your application has **high speed**, **globaly available
access** to a growing list of the most popular, open source JavaScript
libraries including: jQuery, jQueryUI.

Aby skorzystać z tych udogodnień, musimy pobrać klucz.
W **osobnym** bloku *&lt;script />* ładujemy interesujące
nas wersje bibliotek:

    <script type="text/javascript" 
           src="http://www.google.com/jsapi?key=ABCDE..."></script>
    
    <script type="text/javascript" charset="utf-8">
      google.load("maps", "2");
      google.load("jquery", "1");
    </script>
{:lang=javascript}

Teraz już możemy korzystać z tych bibliotek tak, jakby
biblioteki te były ściągane lokalnie.
Niewątpliwie jest to wygodne. Oto przykład, gdzie ładujemy
biblioteki z serwerów Google; nazwałem go
[Random Places](/doc/examples/javascript/google-ajaxlibs.html).


## Google JSONP: searching with Google

Przykład z zupełnie innej beczki.

Chcemy na swojej stronie umieścić wyszukiwanie via Google.
(Jest już gotowiec.)
Dane od wyszukiwarki Google chcemy pobrać w tle
(bez przeładowywania strony). 

Do takich zadań idealnie nadaje się obiekt *XHTTPRequest*
języka Javascript.
Niestety takie podejście nie zadziała. Zabranie tego
*Same Origin Policy* (SOP): danych nie możemy pobierać
z innego URL niż URL naszej strony.
A adres naszej strony to nie *google.pl*.

Obchodzimy to ograniczenie, korzystając z techniki
JSONP. Aby można było skorzystać z tej techniki,
potrzebujemy tylko aby Google przed przesłaniem
danych opakował je, tak jak chcemy.
A chcemy aby przesłane dane były kodem Javascript,
konkretnie wywołaniem funkcji, której nazwę
prześlemy z żądaniem. 

Będzie to możliwe, jeśli Google będzie chciało
z nami współpracować. W API do JSONP jest napisane
że będzie chciało o ile je w odpowiedni sposób
poprosimy.

Tutaj umieściłem przykład takiej
[wyszukiwarki jsonp](/doc/examples/javascript/google-jsonp2.html).
W przykładzie korzystam z wtyczki *jQuery.Form*.

Poniżej umieściłem kluczowy kawałek kodu.

    $(document).ready(function() {
      $('#GoogleForm').ajaxForm({
        dataType: 'jsonp',
        success: processJSONP, // process data from Google; see the code below
        clearForm: true,       // clear all form fields after successful submit
        // jsonp: 'callback',  // the default value
        // resetForm: true,    // reset the form after successful submit
        //
        // $.ajax options can be used here too, for example:
        // timeout:   3000,
        // error: function(xml,status,e) {
        //     alert(e.message);
        // }
      });
    });
{:lang=javascript}

Kilka uwag dotyczących metody *.ajaxForm* zdefiniowanej 
w kodzie wtyczki jQuery.Form i użytej w kodzie powyżej. 
Metoda ta:

* korzysta z wartości atrybutów
  *action* i *method* wpisanych w kodzie HTML strony.
* przesyła argument zawierający opcje do metody 
  *$.ajax* biblioteki 

W przykładzie, znacznik *form* wpisałem tak:

    <form id="GoogleForm" 
          action="http://ajax.googleapis.com/ajax/services/search/web?v=1.0" 
          method="get"> 
{:lang=html}

  

Aby wyświetlić dane podesłane przez Google musimy znać format w jakim
są one przesyłane. Przesłane dane można podejrzeć z Firebugiem (zakładki
Sieć -> Wszystko). W przykładzie wyświetlam tylko zawartość
pola *titleNoFormatting*.

    function processJSONP(data) {
      $('#service').empty(); // wyczyść miejsce na dane z Google
    
      if (data.responseData.results && data.responseData.results.length > 0) {
        var results = data.responseData.results;
        for (var i=0; i < results.length; i++) {
          $("#service").append(results[i].titleNoFormatting + '\n');
        }
      }
    }
{:lang=javascript}

*Uwaga:* Na stronie [jQuery Form Plugin](http://www.malsup.com/jquery/form/)
jest dużo przykładów.
Repozytorium Git z kodem wtyczki znajdziemy 
[tutaj](http://github.com/malsup/form/).

