Linki do dokumentacji:

* [Tables in HTML documents](http://www.w3.org/TR/html4/struct/tables.html).
* [Tables](http://www.w3.org/TR/CSS2/tables.html)

Kolejność rysowania warstw w tabeli:

1. tabela (**table**)
1. grupy kolumn (**colgroup**)
1. kolumny (**col**)
1. grupy wierszy (**thead**, **tfoot**, **tbody**)
1. wiersze (**tr**)
1. komórki (**td**, **th**)

Został jeszcze element **caption**.
Na której warstwie jest on rysowany?

Domyślnie wszystkie elementy mają przezroczyste tło.
Style rysowane są kolejno, zaczynając od warstwy
*tabela* i kończąc na *komórki*.

## Przykładowa tabela

W przykładach poniżej zostanie użyta tabela:

    <table>
      <tr id="r1">
        <td id="r1c1">1-1</td><td id="r1c2">1-2</td>
        <td id="r1c3">1-3</td><td id="r1c4">1-4</td>
      </tr>
      <tr id="r2">
        <td id="r2c1">2-1</td><td id="r2c2">2-2</td>
        <td id="r2c3">2-3</td><td id="r2c4">2-3</td>
      </tr>
      <tr id="r3">
        <td id="r3c1">3-1</td><td id="r3c2">3-2</td>
        <td id="r3c3">3-3</td><td id="r3c4">3-4</td>
      </tr>
      <tr id="r4">
        <td id="r4c1">4-1</td><td id="r4c2">4-2</td>
        <td id="r4c3">4-3</td><td id="r4c4">4-4</td>
      </tr>
    </table>


Tabela ta po narysowaniu przez przeglądarkę
(modulo, że strony tego wykładu mają ustawione szerokość
tabelek na 100%) wygląda tak:

<table style="background: #888;">
  <tr id="r1">
    <td id="r1c1">1-1</td><td id="r1c2">1-2</td>
    <td id="r1c3">1-3</td><td id="r1c4">1-4</td>
  </tr>
  <tr id="r2">
    <td id="r2c1">2-1</td><td id="r2c2">2-2</td>
    <td id="r2c3">2-3</td><td id="r2c4">2-3</td>
  </tr>
  <tr id="r3">
    <td id="r3c1">3-1</td><td id="r3c2">3-2</td>
    <td id="r3c3">3-3</td><td id="r3c4">3-4</td>
  </tr>
  <tr id="r4">
    <td id="r4c1">4-1</td><td id="r4c2">4-2</td>
    <td id="r4c3">4-3</td><td id="r4c4">4-4</td>
  </tr>
</table>

Będziemy ją wstawiać do takiego dokumentu HTML 5:

    <!doctype html>
    <meta charset="utf-8" />
    <title>Stylizowanie tabel</title>
    <style>
    table { background: #888; }
    /* tutaj będziemy wstawiać kod CSS */
    </style>
    <!-- tutaj wstawiamy powyższą tabelę -->


Link do tego dokumentu:
{%= link_to "skel.html", "/doc/examples/html/skel.html" %}.

Uwaga: atrybut *style* przeszedł do pojemnika *style*.


## Kolorowanie warstw, odstępy, szerokość tabeli

Dodajemy wypełnienie i kolorujemy elementy tak:

    td    { padding: 20pt; border: 10px solid black; }
    #r1c2 { background: #CCC; }
    #r3   { background: #AAA; }
    #r3c3 { background: #CCC; }


Aby zobaczyć jak kod CSS interpretuje przeglądarka,
kliknij w link obok:
{%= link_to "warstwy.html", "/doc/examples/html/warstwy.html" %}.

Otwórz okienko Firebuga i sprawdź jak są interpretowane
poniższe deklaracje.

Jak będzie rysowana tabela po dodaniu **kolejno**:

    table {
      background: #888;
      border-spacing: 8px;
      table-layout: fixed; /* auto, inherit */
      width: 500px;
      border-collapse: collapse;
    }
    td    {
      padding: 20pt;
      border: 10px solid black;
    }



## Obramowania, składanie obramowań

Tutaj kilka komórek zostało ekstra pokolorowanych:

    table {
      background: #888;
      border-collapse: collapse;
      border: 8px outset gray;
    }
    td           { width: 80px; padding: 20pt; border: 10px solid #C00; }
    #r2c1, #r2c2 { border: hidden; }
    #r1c1, #r1c4 { border-width: 24px; background: #DDD; }
    #r2c4        { border-style: double; border-width: 8px; border-color: #00C; }
    #r3c4        { border-style: dotted; border-width: 2px; border-color: #0C0; }
    #r4c1        { border-bottom-style: hidden; background: #DD0; }
    #r4c3        { border-top: 50px solid silver; }


Aby zobaczyć jak kod CSS interpretuje przeglądarka,
kliknij w link obok:
{%= link_to "obramowania.html", "/doc/examples/html/obramowania.html" %}.

Jak będzie rysowane kropkowane obramowanie jeśli
*border-width* będziemy zmieniać: 4px, 8px, 10px, 12px itd.

    #r3c4 { border-style: dotted; border-width: 12px; }



## Rozmiar tabeli

Są dwa modele układu tabeli: **fixed** i **auto**.
W każdym inaczej obliczana jest szerokość tabeli.

W układzie *fixed* pierwszy wiersz jest wyróżniony.

    table {
      table-layout: fixed;
      margin: 20px 50px;
      width: 600px;
      border-collapse: collapse;
      border-spacing: 0px;
      background: #888;
    }
    td    { padding: 8pt; border: 2px solid black; }
    #c1   { width: 200px; background: #CCC; }
    #r1c2 { width: 80px;  background: #AAA; }
    #r2c3 { width: 400px; background: #CCC; }


Aby zobaczyć jak kod CSS interpretuje przeglądarka,
kliknij w link obok:
{%= link_to "szerokosc-fixed.html", "/doc/examples/html/szerokosc-fixed.html" %}.

W układzie *auto* pierwszy wiersz **nie** jest wyróżniany.
Zmieniamy tylko wartość *table-layout*:

    table {
      table-layout: auto;
    }


Aby zobaczyć jak kod CSS interpretuje przeglądarka,
kliknij w link obok:
{%= link_to "szerokosc-auto.html", "/doc/examples/html/szerokosc-auto.html"%}.

*Zadanie:* Wyliczyć szerokość kolumn tabeli w każdym z układów.
Sprawdzić wynik korzystając z rozszerzenia Firebug.
