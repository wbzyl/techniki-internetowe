Zaczynamy od instalacji dwóch rozszerzeń Firefoksa:

* [jQuery Documentation](https://addons.mozilla.org/en-US/firefox/addon/12230)
* [FireQuery](https://addons.mozilla.org/en-US/firefox/addon/12632)


Biblioteka jQuery to jeden duży **module pattern**
(D. Crockford):

    var singleton = function () {
      var privateVariable;
      function privateFunction(x) {
          ...privateVariable...
      }
      return {
        firstMethod: function (a, b) {
             ...privateVariable...
        },
        secondMethod: function (c) {
             ...privateFunction()...
        }
      };
    }();


Luźne uwagi o module pattern:
[Why I don't love JavaScript's Module
Pattern](http://snook.ca/archives/javascript/no-love-for-module-pattern/),
[A JavaScript Module Pattern](http://yuiblog.com/blog/2007/06/12/module-pattern/).


### Podstawowe linki

* [jQuery home page](http://jquery.com),
* [jQuery API Browser](http://api.jquery.com),
* [Updated jQuery Bookmarklet](http://www.learningjquery.com/2008/06/updated-jquery-bookmarklet),
  Karl Swedberg
* [jQuery source viewer](http://james.padolsey.com/jquery/#v=1.4&fn=css)
* {%= link_to "Ściąga z selektorów jQuery", "/doc/cheatsheets/rc007-010d-jquery_selectors.pdf" %}
  (zawiera też tabelę z selektorami CSS).


## Zebra effect

Pierwsze koty za płoty:  {%= link_to "ABBA", "/examples/javascript/abba" %}.


## Sortowanie kolumn tabeli

Dwie implementacje. Pierwsza korzysta z funkcji `sort` języka
Javascript. Druga też, ale przed wywołaniem funkcji `sort`,
pobiera z elementu `td` tekst, który będzie sortowany
i zapamiętuje go, po zamianie na duże litery,
w pseudoatrybucie elementu o nazwie *sortKey*.
Ta technika nazywa się **expando**.

{%= link_to "Sortowanie", "/examples/javascript/sort" %}:

    $('#alpha').each(function() {
      var $table = $(this);  // zapamiętaj
      $('thead td', $table).each(function(column) { // pobierz numer kolumny
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

          });
        }
      });
    });


## Przyspieszamy kod funkcji sortującej

Kod użyty w tabeli powyżej jest wolny, ponieważ przy każdym
wywołaniu funkcja porównujaca, musi wyliczać:

    var keyA = $(a).children('td').eq(column).text().toUpperCase();
    var keyB = $(b).children('td').eq(column).text().toUpperCase();


co **wygląda** na kosztowną operację, na dodatek wykonywaną
przy każdym porównaniu.

Kod powinien działać szybciej, jeśli wstępnie obliczymy
wartości wszystkich kluczy `key` i zapamiętamy wynik
w specjalnym atrybucie (tutaj `sortKey`):

    $.each(rows, function(index, row) {
      row.sortKey = $(row).children('td').eq(column).text().toUpperCase();
    });


Takie użycie specjalnego atrybutu nazywamy **expando**.


## The Power of Plugins

Idealnym kandytatem na wtyczkę jest funkcja `alternateRowColors`.
Przerobienie jej na wtyczkę jest trywialne. Oto kod wtyczki
o nazwie *alternateRowColors*, eksportującej jedną
funkcję o takiej samej nazwie jak nazwa wtyczki
(taka konwencja się przyjęła w świecie jQuery):

    (function($){
       $.fn.alternateRowColors = function() {
         $('tbody tr:even', this).removeClass('odd').addClass('even');
         $('tbody tr:odd', this).removeClass('even').addClass('odd');
         return this;
       };
    })(jQuery);


Powyższy kod:

+ Rejestruje funkcję jako *plugin method*. Teraz funkcja jest
  własnością `jQuery.fn`.
+ Korzystamy ze zmiennej `this`. We wtyczkach `this` jest
  referencją do obiektu jQuery na którym wykonywana jest funkcja.
+ Funkcja zwraca `this`. Oznacza to, że funkcja jest *chainable*.

Z tej wtyczki korzystamy w taki sposób:

    $table.alternateRowColors();


i zrobiliśmy z niej użytek w ostatnim przykładzie.

*Uwaga:* Kod `$table.alternateRowColors()` jest bardziej
w stylu jQuery niż zapis `alternateRowColors($table)`.


## You Still Can’t Create a jQuery Plugin?

[Jeffrey Way](http://net.tutsplus.com/videos/screencasts/you-still-cant-create-a-jquery-plugin):
„Never fear; I'm going to show you exactly how to build
your own **tooltip** plugin, at the request of one of our loyal
readers.”

[Alen Grakalic](http://cssglobe.com/post/4004/easy-slider-15-the-easiest-jquery-plugin-for-sliding):
„The Easiest jQuery Plugin For Sliding Images and Content.”


## Real Plugin: *TableSorter*

Na stronie jQuery jest
[link do podstrony z wtyczkami](http://plugins.jquery.com).
Ale tutaj nie było wtyczki do sortowania kolumn tabel.

Szybkie guglanie dało link do
[tablesorter](http://tablesorter.com/docs)
(strona z fajnym demo).


## Więcej fajnych wtyczek:

Tabelki:

* [Expand table rows with jQuery - jExpand
  plugin](http://www.jankoatwarpspeed.com/post/2009/07/20/Expand-table-rows-with-jQuery-jExpand-plugin.aspx)
  — naprawdę fajne!
* [Flexgrid](http://flexigrid.info/) — przykład z kodami państw: PL/Polska itd.
* [Ingrid](http://reconstrukt.com/ingrid/) — column resizing
* [TreeTable](http://blog.cubicphuse.nl/2008/11/12/jquery-treetable-2-0) —
  nazwa mówi wszystko
* [Coda Slider](http://www.ndoherty.biz/tag/coda-slider/) — coś do slajdów?
* [jCarousel](http://sorgalla.com/jcarousel/) — j.w.
* [jQuery.ScrollTo](http://flesler.blogspot.com/2007/10/jqueryscrollto.html) — j.w.

Kilka linków do wtyczek oraz do „Ajax Events Demo” jest na stronie
[Mike Alsup'a](http://malsup.com/jquery/):

* [Form Plugin](http://malsup.com/jquery/form/)
