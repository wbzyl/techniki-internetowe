Według guru Javascript, Douglasa Crockforda,
język składa się z *good parts* i *bad parts*.

<blockquote>
<%= image_tag "/images/d_baranovskiy.jpg", :alt => "[Dmitry Baranovskiy]" %>
<p>
  <b>Global scope</b>.  Treat it like a public toilet. You can’t avoid
  it, but while you’re there have the least contact possible: you
  have no idea who has been here, or what they’ve done, and no idea
  who and what will come after.
</p>
<p class="author">— Dmitry Baranovskiy</p>
</blockquote>

## Bad Parts

- global variables
- \+ adds and concatenates
- semicolon insertion
- typeof
- `with` and `eval`
- `==` and `!=`
- `false`, `null`, `undefined`, `NaN`

### Transitivity? What's That?

    '' == '0'          // false
    0 == ''            // true
    0 == '0'           // true
    false == 'false'   // false
    false == '0'       // true
    false == undefined // false
    false == null      // false
    null == undefined  // true
    " \t\r\n " == 0    // true
{:lang=javascript}

### Bad Heritage

+ blockless statements

      if (foo)
        bar();

+ expression statements

      foo;

+ floating point arithmetic

      0.1 + 0.2 !== 0.3

+ `++` and `--`

+ `switch`


## Good Parts

+ lambda
+ dynamic objects
+ loose typing
+ object literals

The **very best** part:

+ stability: no new design errors since **1999**!


## Biblioteki Javascript


* [jQuery](http://jquery.com/)
* [jQuery UI](http://jqueryui.com/)
* [Mootools](http://mootools.net/)

[Wtyczki do jQuery](http://plugins.jquery.com/):

* Roberto Bicchierai.
  [jQuery.calendarPicker](http://bugsvoice.com/applications/bugsVoice/site/test/calendarPickerDemo.jsp)
* Christoph Schüßler.
  [jQuery.popeye 2.0](http://dev.herr-schuessler.de/jquery/popeye/index.html) — 
  an inline lightbox alternative

[Google AJAX API](http://code.google.com/intl/pl/apis/ajax/):

* [Google AJAX Libraries API](http://code.google.com/intl/pl/apis/ajaxlibs/)
* [Google Maps API](http://code.google.com/intl/pl/apis/maps/)
* [Google Book Search APIs](http://code.google.com/intl/pl/apis/books/)


## Linki

[Javascript tutorial by Google](http://code.google.com/intl/pl/edu/ajax/tutorials/intro-to-js.html)
— zawiera fajne przykłady z DOM oraz kilka **ćwiczeń**.

[Ajax tutorial by Google](http://code.google.com/intl/pl/edu/ajax/tutorials/ajax-tutorial.html)

[Google AJAX Search API Tutorial](http://code.google.com/intl/pl/edu/ajax/tutorials/ajax-search-api.html)

[Google Maps API](http://code.google.com/intl/pl/apis/maps/)
