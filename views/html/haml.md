## Dlaczego HAML?

1. Dobrze odwzorowuje strukturę strony HTML i XML.

1. Dobrze sprawdza w trakcie przygotowywania
   widoków (szablonów).

1. Można łączyć z innymi szblonami, np. ERB,
   używać jako szablonów do XML.

1. Problemy z szablonami ERB.


## Dlaczego nie używamy HAML?

1. Ponieważ przyzwyczailiśmy się do widoku HTML.


## Jak to działa?

Cut & Paste kilka przykładów ze strony
[#haml.Documentation](http://haml.hamptoncatlin.com/docs)

Skonwertować przykłady do HTML za pomocą
programu `haml`.

<table summary="HAML">
  <colgroup>
    <col class="table1"/>
    <col class="table2"/>
  </colgroup>
  <caption><em>HAML</em></caption>
  <thead>
    <tr>
      <th class="span-5">elementy statyczne</th>
      <th class="span-5 last">elementy dynamiczne</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>%html</code></td>
      <td><code>=</code> <i>output</i></td>
    </tr>
    <tr>
      <td><code>.class</code></td>
      <td><code>-</code> <i>kod ruby</i></td>
    </tr>
    <tr>
      <td><code>#id</code></td>
      <td><code>-#</code> <i>komentarz</i></td>
    </tr>
  </tbody>
</table>

Więcej: `div.sidebar#header`, `.sidebar#header`.

Atrybuty: `%a{ :href => 'http://maps.google.pl' }`.

Tylda `~` (ignoruj indentację).

Program `html2haml`.


## Kompletny przykład (dla wersji 2.1.0)

    !!!
    %html{'xmlns' => "http://www.w3.org/1999/xhtml", |
          'xml:lang' => "en", |
          'lang' => "en" }
      %head
        %meta{'http-equiv' => 'content-type', |
              :content => 'text/html; charset=utf-8'}
        %link{ :href => "/application.css",  |
               :media => "screen",     |
               :rel => "stylesheet",   |
               :type => "text/css", |
               :charset => "utf-8" }
        %script{:src => '/javascripts/jquery.js', |
                :type => 'text/javascript', |
                :charset => 'utf-8'}
        %title hello haml
      %body
        %h1 hello haml
        %p 
          i to by było na tyle, jak mawiał
          prof. Stanisławski.
