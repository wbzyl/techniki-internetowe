## Rozgrzewka


<!--

1. Zaczynamy od przeanalizowania różnych stylizacji prostej tabelki z
  [CSS Table Gallery](http://icant.co.uk/csstablegallery).
  Inne stylizacje ogladamy przez RSS Feed, albo wpisując URL:
  *http://icant.co.uk/csstablegallery/index.php?css=***mała liczba całkowita**.

-->

1. Zaprojektować jedną tabelkę do obowiązującego planu zajęć
   dla pierwszego, drugiego i trzeciego roku.
   Tabelkę umieścić w pliku *plan\_zajec.html*.
   Elementy tabelki nie powinny zawierać żadnych atrybutów za
   wyjątkiem atrybutu *cellspacing* ustawionego na 0.
   **Uwaga:** w specyfikacji CSS2 zapisano, że marginesów nie można stosować do komórek tabeli;
   zamiast cellspacing/marginesów można użyć własności *border-spacing*.
   Tabelkę należy wystylizować wyłącznie za pomocą zewnętrznego arkusza
   stylów o nazwie *plan\_zajec.css*.

1. Przygotować formularz wykorzystujący wszystkie elementy
   opisane na stronie P. Wimmera
   [Formularze](http://neuron.bednarska.edu.pl/html/form/form.htm).
   W atrybucie *action* elementu *form* umieścić
   swój adres email.
   Formularz ma być *funkcjonalny*. Co to oznacza, można
   przeczytać
   [tutaj](http://articles.sitepoint.com/article/fancy-form-design-css),
   [tutaj](http://articles.sitepoint.com/article/steps-useable-forms),

   Formularze testujemy wpisując w atrybucie *action* elementu *form*
   swój adres email. Po kliknięciu przycisku *submit*,
   na wpisany adres zostanie przesłany email.

   Ale można też postąpić inaczej — można uruchomić
   [prostą aplikację Sinatry](http://github.com/wbzyl/jquery-form).
   Reszta jest opisana w README.


   W HTML 5 poświęcono sporo uwagi formularzom.
   Można o tym poczytać tutaj:
   [A vocabulary and associated APIs for HTML and XHTML](http://www.w3.org/TR/html5/forms.html), a tutaj jest proste demo:
   [HTML 5 Forms Demo](http://brucelawson.co.uk/tests/html5-forms-demo.html).

1. Przygotować w oparciu o arkusz stylu CSS galerię zdjęć.
   [Tutaj](http://www.cssplay.co.uk/menu/gallery_100.html),
   [tutaj](http://www.cssplay.co.uk/menu/gallery3l.html),
   [tutaj](http://www.cssplay.co.uk/menu/art_gallery.html) i
   [tutaj](http://www.cssplay.co.uk/menu/lightbox.html)
   można znaleźć interesujące projekty.<br/>
   A [tutaj](http://www.cssplay.co.uk/menu)
   jest lista wszystkich projektów umieszczonych na *CSS play*.

<!--
1. Zaprojektować tabelkę do
   [własności i wartości CSS dotyczących tekstu](http://www.w3.org/TR/CSS21/text.html).
   Tak jak poprzedni do wystylizowania tabelkę należy
   użyć zewnętrznego arkusza stylów. Tabelkę
   umieścić w pliku *text.html*, a arkusz
   stylu &#x2014; *text.css*.

1. Wystylizować program telewizyjny ze strony
   [TELEwizji](http://www.telewizja.info.pl/index.php).

1. Wybrany CSS stylizujący galerię zdjęć przepisać w SASS.
   Sparametryzować galerię, tzn. nazwać *magiczne* stałe
   występujące w arkuszu, tak aby można było je zmieniać,
   dostosowując arkusz do zdjęć różnej wielkości.
-->


## Fiki miki różne triki

W poniższych zadaniach należy dostarczyć plik HTML 4.01
nie zawierający tabelek, z osadzonym kodem CSS oraz
bez wspomagajacego kodu Javascript.

Kod ma działać w Firefoxie, w IE niekoniecznie.

Zaprogramować taką czerwono-niebieską ramkę
jak na załączonym poniżej obrazku.

{%= image_tag "/images/examples/css/tests/002-border.png" %}

<blockquote>
  <p>{%= image_tag "/images/examples/css/tests/003-rollover.png", :alt=>"rollover" %}</p>
</blockquote>

2\. W tym zadaniu należy uzyskać efekt *roll over*, taki jak na
załączonym obok obrazku. Tak ma wyglądać „menu” po najechaniu
kursorem myszki na *Love*. Przesunięcie kursora niżej na
*Linux* powinno zmienić kolor *Love* na niebieski,
a kolor *Linux* na żółty i tak dalej.

Jak uzyskać (prawie) taki efekt jest opisane w klasycznym artykule
przedrukowanym w [HTML Dog](http://htmldog.com/articles/suckerfish/dropdowns).

Zaczynamy od takiego kodu: z wpisaną listą
i ustawionymi kolorami…

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <title>.:|:.</title>
      <meta http-equiv="Content-Type"
            content="text/html; charset=utf-8" />
      <style type="text/css">

        ul#navlist {
          list-style-type: none;
          font-family: sans-serif;
          width: 160px;
        }
        ul#navlist a {
          width: 100%;
          text-align: center;
          background-color: #003366; color: #EEEEEE;
          text-decoration: none;
        }
        ul#navlist li.active a {
          background: #ffffcc; color: red;
        }
        ul#navlist li a:hover {
          background: #ffffcc; color:black;
        }

      </style>
    </head>
    <body>
      <ul id="navlist">
        <li class="active"><a href="#">Link 1</a></li>
        <li><a href="#">Love</a></li>
        <li><a href="#">Linux</a></li>
        <li><a href="#">Ascii Art</a></li>
        <li><a href="#">Pets</a></li>
      </ul>
    </body>
    </html>


<blockquote>
  <p>{%= image_tag "/images/examples/css/tests/004-alternate.png", :alt=>"alternate colors" %}</p>
</blockquote>

3\. (i) Przygotować CSS kolorujacy górną połowę wiersza tekstu na niebiesko,
a dolną na czerwono.
(i) Pokolorować kolejne litery, w jednym wierszu podanego
tekstu, na przemian na niebiesko i czerwono.

Efekt, który należy osiągnąć ma być taki jak na obrazku obok.

*Uwaga:* Taki oto kod:

    <p class="blue">a<span class="red">b</span>c<span class="red">...


w którym używamy jednego elementu span
na jedną literę **nie zalicza** tego zadania.
Należy ten efekt osiągnąć oszczędniejszymi środkami, ale
zamiast spanów można użyć fontu *monospaced* (wskazówka?).

<blockquote>
 <p>{%= image_tag "/images/examples/css/thumb-konwersja-istniejacej-strony.png", :alt=>"E. Meyer, CSS I" %}</p>
 <p>{%= link_to "większy obrazek", "/images/examples/css/konwersja-istniejacej-strony.png" %}</p>
</blockquote>

### Konwersja istniejącej strony

Przejście od strony z samym kodem w HTML do strony z HTML + CSS
wymaga dwóch kroków:

* wycięcia z kodu HTML wszystkiego co decyduje o wyglądzie strony
* dodania kodu CSS zastępującego wycięty kod

Tutaj mamy
{%= link_to "stronę w czystym HTML", "/doc/examples/css/konwersja_istniejacej_strony/original.html" %}.

A tutaj mamy
{%= link_to "stronę z wyciętym kodem", "/doc/examples/css/konwersja_istniejacej_strony/original-stripped.html" %}.

Twoje zadanie polega na dodaniu kodu CSS przywracającego
oryginalny wygląd strony.
Kodu HTML w zasadzie nie powinieneś zmieniać.
Jedyne dopuszczalne zmiany w HTML, to dodanie
atrybutów *class* do niektórych elementów.

Zmienić kolorystykę strony. Kolory wybrać
korzystając z narzędzia [Color Scheme Designer](http://colorschemedesigner.com).
Za pomocą tego narzędzia możemy *zobaczyć*
jak postrzega świat 15% ludzi.


## BlueprintCSS Framework

1. Zainstalować framework BlueprintCSS z servera
   [github.com](http://github.com/joshuaclayton/blueprint-css).

2. Wygenerować swoje pliki CSS za pomocą programu
   *compressor.rb* (znajdziesz go w katalogu *lib*).

3. Przygotować stronę demonstrującą możliwości frameworka.
   Najpierw obejrzeć gotowca *tests/parts/sample.html*.
