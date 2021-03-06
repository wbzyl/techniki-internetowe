## Style projekcyjne

Styl projekcyjny idealnie nadaje się do
przygotowywania i wyświetlania slajdów.

Od niedawna przeglądarka Firefox obsługuje
ten styl? Czyżby?

Ale Opera obsługuje.
Wciskając klawisz F11 przełączamy styl
na projekcyjny.

Oto przykładowy dokument korzystający z stylu
projekcyjnego:

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
        "http://www.w3.org/TR/html4/strict.dtd">
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <link href="/stylesheets/examples/css/projection.css"
              title="domyślny"
              media="screen, projection"
              rel="Stylesheet"
              type="text/css"
              charset="utf-8">
        <title>Jakiś tytuł</title>
      </head>
      <body>
        <h1>Media projekcyjne</h1>
        <h2>Oczywiste prawdy</h2>
        <ul>
        <li>0 = 0</li>
        <li>0 != 1</li>
        <li>2 + 2 = 4</li>
        </ul>
        <h2>Nieoczywiste prawdy</h2>
        <ul>
        <li>informatyka jest fajna</li>
        <li>programowanie is awesome</li>
        <li>programowanie w Rubym, to bułka z masłem</li>
        </ul>
      </body>
    </html>


Dokument dzielimy na slajdy, korzystając
z własności: `page-break-before`
albo `page-break-after`.

Plik `projection.css`:

    body {
      background-color: #DDDDDD;
      font: normal 14px/1.6 sans-serif;
    }
    @media projection {
      body {
        background-color: #FFF889; /* bright ideas */
        font: bold 28px/1.6 sans-serif;
      }
      h2 {
        page-break-before: always;
      }
      h1 {
        position: fixed;
        top: 0;
        right: 0;
        font-size: 50%;
      }
    }


[Tutaj jest link do tego przykładu]({%= url_for '/doc/examples/css/projection.html' %}).
