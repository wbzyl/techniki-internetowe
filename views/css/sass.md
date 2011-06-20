SASS, czyli Syntactically Awesome StyleSheets
jest częścią pakietu HAML.

[Dokumentacja](http://haml.hamptoncatlin.com/docs/rdoc/classes/Sass.html)

## Dlaczego SASS?

What’s wrong with CSS? Zagnieżdżone atrybuty, brak zmiennych...

    ul {
      color: black;
      ...
    }
    ul .details {
      color: black;
      ...
    }
    ul li .details, ul li .first {
      color: white;
      ...
    }


*Cytat:*
SASS is a meta-language on top of CSS that’s used to describe the
style of a document cleanly and structurally, with more power than
flat CSS allows. Sass both provides a simpler, more elegant syntax for
CSS and implements various features that are useful for creating
manageable stylesheets.

<table summary="SASS">
  <colgroup>
    <col class="table1"/>
    <col class="table2"/>
  </colgroup>
  <caption><em>SASS</em></caption>
  <thead>
    <tr>
      <th class="span-5">elementy statyczne</th>
      <th class="span-5 last">elementy dynamiczne</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>h1</code></td>
      <td><code>@import</code></td>
    </tr>
    <tr>
      <td><code>.class</code></td>
      <td><code>!variable</code></td>
    </tr>
    <tr>
      <td><code>#id</code></td>
      <td><code>=behavior</code></td>
    </tr>
    <tr>
      <td><code>:attr</code></td>
      <td><code>+behavior</code></td>
    </tr>
  </tbody>
</table>

Konwersję plików SASS do CSS wykonujemy z wiersza poleceń:

    sass input.sass output.css


## Przykłady

Prosty przykład:

    #main p
      :color #00ff00
      :width 60%

Reguły zagnieżdżone:

    #main
      :width 60%
      p, div
        :font-size 2em
        a
          :font-weight bold
      pre
        :font-size 3em

Referencje do reguły rodzica:

    a
      :font-weight bold
      :text-decoration none
      &:hover
        :text-decoration underline
      &:visited
        :font-weight normal

Przestrzenie nazw atrybutów
(np. *font-*, *border-*):

    .funky
      :font
        :family fantasy
        :size 4em
        :weight bold

Powyższy kod jest kompilowany do:

    .funky {
      font-family: fantasy;
      font-size: 4em;
      font-weight: bold; }


Stałe (uwaga na znak równości — nie można go pominąć):

    !main_color = #00ff00
    #main
      :color = !main_color

Opcjonalne przypisania:

    !content = "First content"
    !content ||= "Second content?"

    #main
      :content = content

Directives:

    @import red.sass

Komentarze: `//`, oraz `/* ... */`.


## Domieszkowanie (Mixins)

Definiujemy *domieszkę*, świadczy o tym znak `=`,
o nazwie *large-text*:

    =large-text
      :font
        :size 28px
        :weight bold

Domieszkę domieszkowujemy w taki sposób:

    .page-title
      +large-text
      :padding 4px
