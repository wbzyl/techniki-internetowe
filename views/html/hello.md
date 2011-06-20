## Szablon HTML 4.01

Walidator HTML: `http://validator.w3.org/`.

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
        "http://www.w3.org/TR/html4/strict.dtd">
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <link href="/favicon.ico" rel="SHORTCUT ICON">
        <link href="dummy.css" media="all" rel="Stylesheet"
              type="text/css" charset="utf-8">
        <script src="dummy.js"
              type="text/javascript" charset="utf-8"></script>
        <title>Jakiś tytuł</title>
      </head>
      <body>
        <!-- ciało dokumentu -->
      </body>
    </html>


## Szablon HTML 5

Walidator HTML5: `http://validator.whatwg.org/`.

Kompletny(?) szablon dokumentu HTML 5:

    <!doctype html>
    <html>
    <head>
    <meta charset="utf-8" />
    <title>HTML 5 complete</title>
    <!--[if IE]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <style>
      article, aside, dialog, figure, footer, header,
      hgroup, menu, nav, section { display: block; }
    </style>
    </head>
    <body>
    <p>ąćęłńóśźż ĄĆĘŁŃÓŚŹŻ</p>
    </body>
    </html>


Przykład pobrałem ze strony
[HTML5 Doctor](http://html5doctor.com/html-5-boilerplates/).

Pytanie: *boilerplate* – jak to przetłumaczyć?

### Minimalny dokument HTML 5

Jeszcze jeden przykład:

    <!doctype html>
    <meta charset="utf-8" />
    <title>Minimalny dokument HTML 5</title>
    <p>ąćęłńóśźż ĄĆĘŁŃÓŚŹŻ</p>


### Różnice między HTM 4 a 5

Zob. [HTML5 differences from HTML4](http://dev.w3.org/html5/html4-differences/)

Nowe rzeczy w HTML:

* wideo
* canvas
* baza danych
* geolocation
* edytowalne elementy (local storage)
* nowe elementy

[HTML5 demos and examples](http://html5demos.com/).
