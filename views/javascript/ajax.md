
**Asynchronous Javascript and XML** czyli Ajax, to
*label for a group of web technologies*:

* Javascript
* obiekt XMLHttpRequest
* pliki w lekkich formatach tekstowych, np. JSON,
  po stronie serwera
* przesyłanie kodu Javascript z serwera
  do wykonania u klienta

Techniki opisane poniżej pochodzą z książki:
J. Chaffer, K. Swedberg. *Learning jQuery*.

Poniżej zostaną opisane cztery sposoby przesyłanie
danych na żądanie.

* Love: przysyłamy fragment kodu HTML.
* Linux: przesyłamy obiekt JSON
* Pets: przesyłamy dokument XML
* Ascii-Art: wybieramy dokument po wpisaniu
  liczby w formularzu.


<p>Tutaj umieściłem {%= link_to "przykład", "/examples/javascript/ajax-ahah" %}
w którym użyto wszystkich czterech technik.</p>


## Love: AHAH

Technika ta nazywam się **AHAH** czyli Asynchronous HTTP and HTML.
Wszystko co musimy zrobić, to przygotować fragment kodu HTML
i miejsce na stronie w które go wstrzykniemy.

Zarezerwowane miejsce:

    <div id="content">&nbsp;</div>


Potrzebujemy jeszcze elementu, który po kliknięciu
wygeneruje żądanie *XMLHttpRequest*:

    <div id="love">Love</div>


Kod Javascript:

    $(document).ready(function () {
      $('#love').click(function () {
        $('#content').load('/data/html/love.html');
      });
    });


Powyższy kod korzysta z funkcji
[load](http://docs.jquery.com/Ajax/load).


## Linux: JSON

Tak jak poprzednio potrzebujemy czegoś, co po kliknięciu
wygeneruje żądanie AJAX:

    <div id="linux>Linux</div>


oraz miejsca na stronie na cytaty:

    <div id="content">&nbsp;</div>


Dane są pamiętane w pliku w formacie JSON w postaci
tablicy haszy:

    [
      {
        "q": "Linux is not user-friendly ...",
        "a": "[seen somewhere on the net]"
      },
      ...
    ]


**Uwaga:** Dane powinny być gotowe do *konsumpcji*,
czyli do umieszczenia na stronie.
Oznacza, to że napisy powyżej nie powinny zawierać
takich znaków jak `<` albo `&`.

W kodzie Javascript zamieniamy powyższą strukturę JSON
na kod HTML:

    $(document).ready(function () {
      $('#linux').click(function () {
        $.getJSON('/data/linux.json', function (data) {
          $('#content').empty();
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


Powyższy kod korzysta z globalnych metod obiektu *jQuery*:
[getJSON](http://docs.jquery.com/Ajax/jQuery.getJSON) oraz
[each](http://docs.jquery.com/Utilities/jQuery.each).


## Pets: XML

Jeśli po odebraniu przesłanych danych, a jeszcze przed umieszczeniem
ich na stronie, będziemy chcieli je troszkę dopieścić, to powinniśmy
je przesłać w takiej postaci, aby to dopieszczanie nie było trudne w
realizacji.

Dane ubrane w XML niespecjalnie nadają się do dopieszczania.  Zwykle
będziemy potrzebować jakichś dodatkowych narzędzi aby je skonwertować
do pożądanej postaci. Natomiast, dane przesyłane w formacie JSON są od
razu gotowe do przetwarzania za pomocą kodu Javascript.  Ale czasami
nie mamy wyjścia, bo dane dostępne są tylko w formacie XML.

Oto kilka cytatów, które trzymamy w pliku w formacie XML:

    <?xml version="1.0" encoding="UTF-8" ?>
    <quotes>
    <quote>
      All intelligent species own cats.
    </quote>
    <quote author="R. Heinlein">
      Anyone who considers protocol unimportant has never dealt with a cat.
    </quote>
    <quote>
      For a man to truly understand rejection, he must first be ignored by a cat.
    </quote>
    <quote author="Ogden Nash">
      A door is what a dog is perpetually on the wrong side of.
    </quote>
    </quotes>


Tyle kodu Javascript jest potrzebne, aby zamienić XML na HTML:

    $(document).ready(function () {
      $('#pets').click(function () {
        $.get('/data/pets.xml', function(data) {
          // tutaj data zawiera drzewko DOM
          // alert(data);
          $('#content').empty();
          var html = '';
          $(data).find('quote').each(function() {
            var $entry = $(this);
            html += '<div class="entry">\n';
            html += '<p>' + $entry.text() + '</p>\n';
            if ($entry.attr('author')) {
              html += '<p class="author">' + $entry.attr('author') + '</p>';
            }
            html += '</div>\n';
          });
          $('#content').append(html);
        });
      });
    });


Powyższy kod korzysta z globalnej metody obiektu *jQuery*:
[get](http://docs.jquery.com/Ajax/jQuery.get) oraz
metody [find](http://docs.jquery.com/Traversing/find).


## Ascii-Art: formularz

Tutaj wybieramy obrazek wpisując jego numer w formularzu.

    <form id="select" action="javascript:void(0)" method="post">
      <p>
        <input type="text" size="4" name="num" id="num" value="1">
        <input type="submit" name="show" id="show" value="Show Ascii Art">
      </p>
    </form>


Użytkownik, po wpisaniu czegoś w formularzu i kliknięciu
przycisku "Show Ascii Art", oczekuje że zobaczy obrazek.

    $(document).ready(function () {
      $('#select').submit(function (event) {
        $.post('/asciiart', $(this).find('input').serialize(), function(data) {
          $('#content').html(data);
        });
        event.preventDefault();
      });
    });


Żądanie POST wygląda jakoś tak: <code>num 2</code>
(można to podejrzeć korzystając z rozszerzenia Firebug).
Żadanie to obsługuje Sinatra tak:

    post '/asciiart' do
      begin
        IO.read("#{options.views}/examples/data/asciiarts/#{params[:num]}.html")
      rescue
        "<h3>Please, enter a number in the 1..4 range.</h3>"
      end
    end


Jak widać z kodu, obrazki są pamiętane w plikach o nazwach
postaci *liczba*.html.

Powyższy kod korzysta z globalnej metody obiektu *jQuery*
o nazwie [post](http://docs.jquery.com/Ajax/jQuery.post).


## Śledzimy żądanie

Do tej pory cierpliwie czekaliśmy na odpowiedź na
nasze żądanie. Teraz chcielibysmy wiedzieć, co się
dzieje z wysłanym żądaniem.

Biblioteka jQuery umożliwia zarejestrowanie kilku funkcji
zwrotnych powiązanych z różnymi
[zdarzeniami ajaxowymi](http://docs.jquery.com/Ajax)
(kompletna lista).

Jeśli obsługa żądania zajmie trochę czasu, to
przydałby się jaka informacja zwrotna, pokazująca
że nasze żądanie jest obsługiwane.
Zwyczajowo używamy w tym celu animowanego gifa.
Jest to tzw. *throbber*.
Można wygenerować swojego throbbera na stronie
[ajaxload.info](http://www.ajaxload.info).

Po umieszczeniu throbbera (pulsujący obrazek) na stronie:

    <div id="content">
      <!-- http://www.ajaxload.info/ -->
      <img id="throbber" src="/images/ajax-loader.gif" />
    </div>


ukrywamy go, aby pokazać go w chwili kiedy zostanie wysłane
żądanie ajax:

    $(document).ready(function () {
      $('#throbber').hide();
      $('#throbber').ajaxStart(function () {
        $(this).show();
      }).ajaxStop(function () {
        $(this).hide();
      });
    });


Po obsłużeniu żądania, ukrywamy throbbera.


## SOP, czyli Same Origin Policy

*Wikipedia:*
In computing, the same origin policy is an important **security concept**
for a number of browser-side programming languages, such as
JavaScript. In a nutshell, the policy permits scripts running on pages
originating from the same site to access each other's methods and
properties with no specific restrictions — but prevents access to most
methods and properties across pages on different sites.

[Cross-domain communications with JSONP, Part 1:
Combine JSONP and jQuery to quickly build powerful
mashups](http://www.ibm.com/developerworks/library/wa-aj-jsonp1):
You can stop these security errors if you control the remote server
where data resides and every request goes to the same domain, but
what's the fun of a Web application if you are stuck on your own
server?

Technika [JSONP](http://bob.pythonmac.org/archives/2005/12/05/remote-json-jsonp)
(*JSON with Padding*) pozwala obejść to ograniczenie.
**Ale to już nie jest AJAX.**

JSON, czyli JavaScript Object Notation, jest lekkim
(w porównaniu, np. z XML), formatem danych.
JSON, to napis reprezentujący obiekt Javascript
(stąd nazwa).

Na przykład, `ticker` zdefiniowany poniżej jest obiektem Javascript:

    var ticker = { 'symbol': 'IBM', 'price': '91.42' };


a jego reprezentacja w postaci napisu, czyli JSON to:

   { 'symbol': 'IBM', 'price': '91.42' }

Idea JSONP jest jakaś taka:

    <script type="text/javascript">
      var showPrice = function(data) {
        alert("Symbol: " + data.symbol + " Price: " + data.price);
      };
    </script>
    <script type="text/javascript">
      showPrice({ 'symbol': 'IBM', 'price': data.price });
    </script>

Drugi skrypt zawiera odpowiedź serwera na żądanie klienta (tutaj nie
pokazane). Ale przed wysłaniem żądania klient
definiuje funkcję *showPrice* wstrzykując sobie zawartość
pierwszego skryptu. Oczywiście, aby napisać taką
funkcję musimy wcześniej wiedzieć jak będzie wyglądać
odopwiedź. Takie rzeczy są opisane w API usługi.

Aha, funkcja *showPrice* to padding (literka P w JSONP).


### How it works in jQuery?

*Cytat:*
jQuery attaches a global function to the window object that is called
when the script is injected, then the function is removed on
completion.

Note that if the request is being made to the same domain, then jQuery
will switch it down to a straight Ajax request.

Przykład ze strony jQuery:
[the Flickr JSONP API](http://docs.jquery.com/Ajax/jQuery.getJSON)
do analizy.

**BUG w jQuery:**
poniższy kod nie działa zgodnie ze specyfikacją.
Jeśli web service i client są uruchomione na
różnych portach na *http://localhost*, to
*$.getJSON* wysyła żądanie XHR zamiast wstrzyknąć
kod Javascript.

Zobacz poniżej działający skrypt korzystający z metody *$.ajax*.

Jeśli **przed** wejściem
{%= link_to "na taką stronę", "/doc/examples/javascript/jsonp.html" %}:

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
                        "http://www.w3.org/TR/html4/loose.dtd">
    <html>
    <head>
      <script src="http://code.jquery.com/jquery-latest.js"></script>
      <script>
      $(document).ready(function(){
        $.getJSON("http://localhost:4567/jsonp",
                  { 'callback': '?', 'id': '8' },
                  function(data) {
                    alert('Ticker: ' + data.symbol + ' Price: ' + data.price);
                  }
        );
      });
      </script>
    </head>
    <body><h3>JSONP test</h3></body>
    </html>


uruchomimy *testowy* web service *ticker.rb* na porcie 4567:

    require 'rubygems'
    require 'sinatra'
    require 'json'

    get '/jsonp' do
      content_type 'application/json', :charset => 'utf-8'
      params['callback'] + "(" + { 'symbol' => 'IBM', 'price' => '91.42' }.to_json + ")\n"
    end


Uruchamiamy server:

    ruby ticker.rb

i sprawdzamy, czy działa:

    curl -X GET --url 'http://localhost:4567/jsonp?id=4&callback=?'


Po uruchomieniu tego serwera na porcie 4567,
{%= link_to "wchodzimy na tę stronę", "/doc/examples/javascript/jsonp-ajax.html" %}:

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
                        "http://www.w3.org/TR/html4/loose.dtd">
    <html>
    <head>
      <script src="http://code.jquery.com/jquery-latest.js"></script>
      <script>
      $(document).ready(function(){
        $.ajax({
          type: 'POST',
          dataType: 'jsonp',
          data: 'id=8',
          jsonp: 'callback',
          url: 'http://localhost:4567/jsonp',
          success: function (data) {
            // alert(data); // [object Object]
            alert('Ticker: ' + data.symbol + ' Price: ' + data.price);
          },
        });
      });
      </script>
    </head>
    <body><h3>JSONP test via .ajax call</h3></body>
    </html>


Można dołożyć do powyższego kodu Javascript funkcje zwrotne:
*$.ajaxStart* oraz *$.ajaxStop*. Po co?

Jeśli podejrzymy żądanie *ajax* w Firebug to zobaczymy, że
jQuery podstawia w miejsce `?` coś takiego: <tt>jsonp1237649050286</tt>
oraz dodaje parametr `_` o wartości jakiejś takiej <tt>1237649050430</tt>.

Pytania: po co jQuery to robi?

Lektura: [Part 2: Building mashups with JSONP, jQuery, and Yahoo! Query
Language](http://www.ibm.com/developerworks/library/wa-aj-jsonp2).


## Ready made JSONP services

[Digg](http://apidoc.digg.com/ListStories): top stories

    curl -i --url 'http://services.digg.com/stories/top?
      appkey=http%3A%2F%2Flocalhost%2F&count=3&type=javascript&callback=jsonp'

[Geonames](http://www.geonames.org/export): location info for zip code (tylko US?)

    curl -i --url 'http://www.geonames.org/
      postalCodeLookupJSON?postalcode=81080&country=PL&callback=jsonp'

[Flickr](http://www.flickr.com/services/feeds): most recent dog pictures

    curl -i --url 'http://api.flickr.com/services/feeds/
      photos_public.gne?tags=dog&tagmode=any&format=json&jsoncallback=jsonp'

[YAHOO](http://developer.yahoo.com): search pizza in zip code location

    curl -i --url 'http://local.yahooapis.com/LocalSearchService/V3/
      localSearch?appid=YahooDemo&query=pizza&&zip=10504&results=2&output=json&callback=jsonp'
