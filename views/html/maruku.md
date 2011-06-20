[*Maruku* notation][maruku] extends [*Markdown* notation][markdown].

Dlaczego nowa notacja?

* XHTML: syntax highlighting via the [*Syntax*][syntax] library

* LaTeX: syntax highlighting via the [*Listings*][listings] package

[syntax]: http://syntax.rubyforge.org/
[listings]: http://www.ctan.org/tex-archive/macros/latex/contrib/listings/
[maruku]: http://maruku.rubyforge.org/
[markdown]: http://daringfireball.net/projects/markdown/syntax


## Meta-data for the document {#meta}

Meta-data for the document itself is specified through the use
of email headers:

    Title: A simple document
    LaTeX preamble: preamble.tex
    CSS: main.css syntax.css
    Javascript: jquery.js main.js
    HTML use syntax: true
    LaTeX use listings: true

    Content of the document


Meta-data keys are assumed to be case-insensitive.


## Przykłady kolorowania kodu

### HTML: lang=html

    <!DOCTYPE html>
    <html>
      <head>
        <title>Szablon dokumentu HTML</title>
      </head>
      <body>
      </body>
    </html>


### Ruby: lang=ruby

    def hello
      "hello world"
    end


### ANSI C: lang=ansic

    int main()
    {
       printf("hello world\n");
       return 0;
    }


### SQLite: lang=sqlite

    --  jp.sql
    drop table if exists studenci;
    create table studenci (
      id        integer       primary key autoincrement,
      nazwisko  varchar(128)  not null,
      imię      varchar(128)  not null,
      login     varchar(128)  not null collate nocase,
      indeks    integer       default 0,
      data      datetime,
      uwagi     text          default ''
    );
    drop table if exists zaliczenia;
    create table zaliczenia (
      id          integer       primary key autoincrement,
      student_id  integer       not null,  -- klucz obcy
      ocena       varchar(128)  default 'unknown' collate nocase,
      kiedy       datetime,
      termin      text          default 'pierwszy'
    );
    -- wyzwalacz automatycznie wstawiający datę w polu kiedy
    create trigger wstaw_do_zaliczeń_kiedy after insert on zaliczenia
    begin
      update zaliczenia set kiedy = datetime('now') where rowid = new.rowid;
    end;


### CSS 2.1: lang=css21

    body {
      width: 600px;
      margin: 1em auto;
      padding: 1em 2em;
      border: black solid 1px;
      background-color: #D6D8FF;
      font: normal 14px/1.6 Arial, Helvetica, sans-serif;
    }

    h1 {
      color: #54310E;
    }

    p.author {
      color: #0007CC;
      font-style: italic;
      text-align: right;
      padding-right: 10em;
    }


### Javascript: lang=javascript

    function doReplace() {
      var str = document.getElementById("search_regex").value;
      var regex = eval("/" + str + "/g");
      var subst = document.getElementById("search_replacement").value;

      replaceElement(document.body,regex,subst);
      //  alert("search=" + str + "\n" + "replacement=" + subst);
    }

    function replaceElement(e,r,s) {
      if (e.nodeType == 3) { // TEXT_NODE
        e.nodeValue = e.nodeValue.replace(r,s);
        return;
      }
      for (var m=e.firstChild; m!=null; m=m.nextSibling)
        replaceElement(m,r,s);
      return;
    }

    $(document).ready(function() {
      $('body').click(function(event) {
        if ($(event.target).is('h3')) {
          $(event.target).toggleClass('highlighted');
        }
      });
    });




## Examples of Markdown extra syntax   {#extra}

*       code

            def hello
              "hello world"
            end


*	tables (how to add id and class attribute?)

		Col1 | Very very long head | Very very long head|
		-----|:-------------------:|-------------------:|
		cell | center-align        | right-align        |


	Col1 | Very very long head | Very very long head|
	-----|:-------------------:|-------------------:|
	cell | center-align        | right-align        |

*	Markdown inside HTML elements

		<div markdown="1">
		   This is a `div` with Markdown **strong text**
		</div>


	<div markdown="true">
	   This is a `div` with Markdown **strong text**
	</div>

*	header `id`

		## Download    {#download}


	For example, [a link to the download](#download) header.

*	header `class`

		## Download    {.download}


	This adds attribute `class="download"` to header element

*	abbreviations or abrv for short.

*[abrv]: simply an abbreviation
