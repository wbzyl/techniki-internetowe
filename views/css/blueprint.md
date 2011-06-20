Strona domowa projektu [BlueprintCSS](http://www.blueprintcss.org),
[Wiki](http://wiki.github.com/joshuaclayton/blueprint-css),
[Articles](http://wiki.github.com/joshuaclayton/blueprint-css/articles).

## Setup Instructions

Here’s how you set up Blueprint on your site.

1\. Upload the “blueprint” folder in this folder to your server, and
   place it in whatever folder you’d like. A good choice would be your
   CSS folder.

2\. Add the following three lines to every `<head/>` of your site. Make
   sure the three href paths are correct (here, BP is in my CSS folder):

     <link rel="stylesheet" href="/stylesheets/blueprint/screen.css"
           type="text/css" media="screen, projection">
     <link rel="stylesheet" href="/stylesheets/blueprint/print.css"
           type="text/css" media="print">
     <!--[if IE]>
     <link rel="stylesheet" href="/stylesheets/blueprint/ie.css"
           type="text/css" media="screen, projection">
     <![endif]-->


   Remember to include trailing slashes („` />`”) in these lines if
   you’re using XHTML.

3\. For development, add the `.showgrid` class to any container or column
   to see the underlying grid. Check out the plugins directory for more
   advanced functionality.


><img src="{%= image('alan_kay.jpg') %}" alt="[Alan Kay]">
>
> Don't worry about what anybody else is going to do.
> The best way to predict the future is to invent it.
>
> <p class="author">— Alan Kay</p>

## The Grid

When you first start using Blueprint, the most important concept to
understand is the “grid”.
The default grid is a 950 pixel wide “container” that is divided
into 24 columns, each spaced 10 pixels apart. Using Blueprint, you can
place “column” elements on the page with great precision and give
each column a “span” (the span of each column is analogous to the
colspan attribute of a td tag) to specify how wide the column should
be. So to create a simple layout using Blueprint, I would:

1. Create a new HTML file and include the base Blueprint CSS files
2. Create a div “container” that would be the outer wrapper of my page
3. Create a header “column” of span 24 that would cover an entire row
4. Create a main content “column” of span 16, which would take up
   2/3 of the next row
5. Create a sidebar “column” of span 8, which would take up the
   other 1/3 of the row. I would also specify that this column is the
  “last” element in the row.
6. Create a footer “column” of span 24

Solution.

    <body>
      <div class="container">
         <div class="column span-24">Header</div>
            <div class="column span-16">Content</div>
            <div class="column span-8 last">Navigation</div>
         <div class="column span-24">Footer</div>
      </div>
    </body>


<table summary="Classes used in Grids">
  <caption><em>Klasy używane w Siatce (Grid)</em></caption>
  <thead>
    <tr>
      <th class="span-3">class</th>
      <th class="span-8 last">Opis</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>.append-x</code></td>
      <td>appends x number of empty columns after a column</td>
    </tr>
    <tr>
      <td><code>.prepend-x</code></td>
      <td>prep-pends x number of empty columns before a column</td>
    </tr>
    <tr>
      <td><code>.push-x</code></td>
      <td>pushes a column x columns to the left; can be used to swap columns</td>
    </tr>
    <tr>
      <td><code>.pull-x</code></td>
      <td>pulls a column x columns to the right; can be used to swap columns</td>
    </tr>
    <tr>
      <td><code>.border</code></td>
      <td>applies a border to the right side of the column</td>
    </tr>
    <tr>
      <td><code>.colborder</code></td>
      <td>appends one empty column, with a border down the middle</td>
    </tr>
    <tr>
      <td><code>.clear</code></td>
      <td>makes a column drop below a row, regardless of space</td>
    </tr>
    <tr>
      <td><code>.showgrid</code></td>
      <td>add to container or column to see the grid and baseline</td>
    </tr>
  </tbody>
</table>

## Other classes defined by Blueprint

While the typography of Blueprint mainly applies itself, there’s a
few classes provided. Here’s a list of their names and what they do:

<table summary="Classes used for Typography">
  <caption><em>Klasy używane w typografii</em></caption>
  <thead>
    <tr>
      <th class="span-3">class</th>
      <th class="span-8 last">Opis</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>.small</code></td>
      <td>makes the text of this element smaller</td>
    </tr>
    <tr>
      <td><code>.large</code></td>
      <td>makes the text of this element larger</td>
    </tr>
    <tr>
      <td><code>.hide</code></td>
      <td>hides an element</td>
    </tr>
    <tr>
      <td><code>.quiet</code></td>
      <td>tones down the font color for this element</td>
    </tr>
    <tr>
      <td><code>.loud</code></td>
      <td>makes this elements text black</td>
    </tr>
    <tr>
      <td><code>.highlight</code></td>
      <td>adds a yellow background to the text</td>
    </tr>
    <tr>
      <td><code>.added</code></td>
      <td>adds green background to the text</td>
    </tr>
    <tr>
      <td><code>.removed</code></td>
      <td>adds red background to the text</td>
    </tr>
    <tr>
      <td><code>.first</code></td>
      <td>removes any left sided margin/padding from the element</td>
    </tr>
    <tr>
      <td><code>.last</code></td>
      <td>removes any right sided margin/padding from the element</td>
    </tr>
    <tr>
      <td><code>.top</code></td>
      <td>removes any top margin/padding from the element</td>
    </tr>
    <tr>
      <td><code>.bottom</code></td>
      <td>removes any bottom margin/padding from the element</td>
    </tr>
  </tbody>
</table>

To make Blueprint style your input elements, each text input element
should have the class `.text`, or `.title`, where `.text`
is the normal size, and `.title` gives you an input field
with larger text.

<table summary="Classes used in Forms">
  <caption><em>Klasy używane w Forms</em></caption>
  <thead>
    <tr>
      <th class="span-3">class</th>
      <th class="span-8 last">Opis</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>div.error</code></td>
      <td>creates an error box (red)</td>
    </tr>
    <tr>
      <td><code>div.notice</code></td>
      <td>creates a box for notices (yellow)</td>
    </tr>
    <tr>
      <td><code>div.success</code></td>
      <td>creates a box for success messages (green)</td>
    </tr>
  </tbody>
</table>

## Definujemy własną siatkę

Zanim zdefiniujemy swoją siatkę, trochę rachunków.

Rozmiar podstawowy fontu ustawiamy na 16&#x200A;px. Litery takiej wielkości
powinny być czytelne po wyświetleniu przez rzutniki w laboratoriach.

Interlinię ustawiamy na 1,5\*16&#x200A;px=24&#x200A;px. Dlaczego?

Szerokość literek „n”, „e”, „p” to mniej więcej
0.5\*16&#x200A;px=8&#x200A;px.
Aby wiersz tekstu łatwo się czytał powinien zawierać
50–70 liter. Zatem szerokość kolumny tekstu powinna zawierać
się między 400&#x200A;px–560&#x200A;px.

Zamierzam składać na siatce 13+8=21 kolumn, gdzie 13 kolumn
będzie zawierać notatki, a 8 kolumn przeznaczone będzie na
spis treści, cytaty itp.

Jeśli ustawimy szerokość jednej kolumny na
33&#x200A;px+11&#x200A;px=44&#x200A;px,
szerokość kolumn będzie wynosiła
572&#x200A;px+352&#x200A;px-11&#x200A;px=913&#x200A;px.

Szerokość ekranu to co najmniej 1024&#x200A;px, na marginesy
zostaje 111&#x200A;px. Na lewy margines przeznaczymy
44&#x200A;px (w przybliżeniu 1/3 z 111).

## Skrypt kompresujący *compressor.rb*

W katalogu z wtyczkami `blueprint/plugins/` tworzymy katalog
`tutorials` i umieszczamy w nim plik `screen.css`
w którym przebijamy domyślne ustawienie rozmiaru fontu:

    body {
      font-size: 16px;
    }


Pozostałe wyliczone ustawienia zapisujemy w pliku `lib/settings.yml`:

    couchdb:
      path: /home/wbzyl/www/couchdb/public/stylesheets
      custom_layout:
        column_count: 21
        column_width: 32
        gutter_width: 8
      plugins:
        - link-icons
        - tutorials
    ti:
      path: /home/wbzyl/www/ti/public/stylesheets
      ...
      ...


W katalogu `lib` uruchamiamy Skrypt `compressor.rb`:

    ruby compress.rb -p couchdb

## Layout, czyli układ strony dla RDiscount

Tak wygląda layout:

<p>{%= image_tag("/images/layout.png", :alt => "BlueprintCSS based layout") %}</p>

A tak HTML:

    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <link rel="stylesheet" href="/stylesheets/screen.css" type="text/css" media="screen, projection" charset="utf-8">
        <link rel="stylesheet" href="/stylesheets/print.css" type="text/css" media="print, projection" charset="utf-8">
        <!--[if IE]>
          <link rel="stylesheet" href="css/blueprint/ie.css" type="text/css" media="screen, projection">
        <![endif]-->
        <link rel="stylesheet" href="/stylesheets/uv.css" type="text/css" media="screen, projection" charset="utf-8">
        <link rel="stylesheet" href="/stylesheets/couchdb.css" type="text/css" media="screen,projection" charset="utf-8">

        <title><%= @title || "WB/CouchDB" %}</title>
      </head>
      <body>
        <div class="span-21" id="header">
          <div class="span-8">
            <a href="/"><img src="/images/couchdb.png" alt="wb/couchdb logo" /></a>
          </div>
          <div class="span-13 last">
            <div id="links">
              <a href="http://wbzyl.ug.edu.pl/">home</a>
              <a href="http://wbzyl.ug.edu.pl/galeria">galeria</a>
            </div>
          </div>
        </div>
        <div class="span-21 container">
          <div class="span-13" id="content">

            <%%= yield %>

          </div>
          <div class="span-8 last">
          </div>
        </div>

      </body>
    </html>


A tak HAML: TODO
