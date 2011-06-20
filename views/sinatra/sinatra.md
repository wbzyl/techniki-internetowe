## Linki, linki, linki…

* [Sinatra](http://www.sinatrarb.com/)
* [Getting Started](http://www.sinatrarb.com/intro.html)
* [Sinatra API](http://www.sinatrarb.com/api/index.html)
* [The Book](http://www.sinatrarb.com/book.html)
* [Writing Extensions](http://www.sinatrarb.com/extensions.html)
* [Options and Configuration](http://www.sinatrarb.com/configuration.html)
* [Sinatra ActiveRecord gem](http://gemcutter.org/gems/sinatra-activerecord)

To co napisano poniżej jest luźnym tłumaczeniem wyimków z tego co powyżej.

Więcej linków:

* [The blog that's almost nothing - now using CouchDB](http://github.com/jtulloch/scanty/)
* [Construct absolute paths and full URLs to actions in a
  Sinatra application](http://github.com/emk/sinatra-url-for/)
* [Rack Flash](http://nakajima.github.com/rack-flash/)
  Simple flash hash implementation for Rack apps.

## Routing

Routing zaprojektowano tak, aby metody Sinatry odpowiadały żądaniom HTTP:

* GET
* POST
* PUT
* DELETE

Najczęściej wykorzystywaną metodą jest `get`:

    get '/hi' do
      # odpowiada na żądanie "GET /hi"
      "Hello"
    end


Z parametrami:

    get '/:name' do
      # odpowiada na żądanie "GET /cos_tam"
      # i na inne podobne żądania;
      # ustawia wartość params[:name]
      "hello #{params[:name]}"
    end


### Więcej przykładów z GET

    require 'rubygems'
    require 'sinatra'

    get '/hello/:name' do
      # odpowiada na żądanie "GET /hello/foo"
      # i "GET /hello/bar" itp.
      # params[:name] ustawiany jest na 'foo' lub 'bar'
      "params: #{params[:name]}"
    end

    get '/say/*/to/*' do
      # odpowiada np. na "GET /say/hello/to/world"
      params[:splat].inspect # => ["hello", "world"]
    end

    get '/download/*.*' do
      # odpowiada np. na "GET /download/path/to/file.xml"
      params[:splat].inspect # => ["path/to/file", "xml"]
    end

    # Parametr metody: `get`, `put`, `post`, `put`, oraz `delete`
    # może być wyrażeniem regularnym.
    # `Captures` są dostępne w bloku metody
    # jako params[:captures]:

    get %r{/foo/(bar|baz)/(\d+)} do
      # jeśli GET /foo/bar/42 to
      "params[:captures]: #{params[:captures].inspect}"  # =>  ['bar', 42]
    end

    get '/foo', :agent => /Firefox\/(.+)/ do
      "Korzystasz z Firefoxa w wersji #{params[:agent][0]}"
    end

    get '/foo' do
      # odpowiada na żądanie innych przeglądarek
      "Nie korzystasz z Firefoxa"
    end

    # URL do wykorzystania w pliku layout.haml
    get '/hello.css' do
      content_type 'text/css', :charset => 'utf-8'
      sass :hello  # renderuje zawartość pliku hello.sass
    end

    # strona korzystająca z layoutu layout.html
    get '/hello' do
      haml :index, :layout => 'layout'
    end


A to zawartość pliku `layout.haml`:

    !!! 4.01
    %html
      %head
        %link{ :href => "/hello.css", :media => "screen", :rel => "stylesheet", :type => "text/css" }
        %title hello sinatra
      %body
        %h1 hello
        = yield

## Przykład z POST

Zwykle z żądaniami POST powiązane są formularze umieszczane
na stronach WWW, na przykład:

    require 'rubygems'
    require 'sinatra'

    get '/' do
      inline_view = <<END
    !!! 4.01
    %html
      %head
        %title Witaj!
      %body
        %p Przygotuj się na przywitanie
        %form
          %input{:type => 'text', :name => 'name'}
          %input{:type => 'submit', :value => 'Przywitaj się'}
    END
      haml inline_view, :layout => false
    end

    get '/hello/:name' do
      greet(params[:name])
    end

    post '/hello' do
      greet(params[:name])
    end

    private

    def greet(name)
      inline_view = <<END
    !!! 4.01
    %html
      %head
        %title Hej!
      %body
        %h2= "Hej! #{name}"
    END
      haml inline_view, :layout => false
    end


### Zagnieżdżone parametry

Parametry formularzy z indeksami są zamieniane na zagnieżdżony hasz.
Na przykład

    <form method='POST' action='/guestbook/'>
      <input type='text' name='person[name]'>
      <input type='text' name='person[email]'>
      <textarea name='note'></textarea>
      <input type='submit' value='Submit'>
    </form>


Po wpisaniu danych do formularza, przesyłane dane mogą
wyglądać na przykład tak:

    person[name]=Frank&person[email]=frank@theritz.com&message=Stay%20cool

Sinatra przekształci powyższy napis na zagnieżdżony hasz.
Z hasza odczytujemy wpisane dane, w taki oto wygodny sposób:

    post '/guestbook' do
      # params['person']  # => { :name => 'Frank', :email => 'frank@theritz.com' }
      person = params[:person]
      "Hi #{person[:name]}! Thanks for signing my guestbook."
    end



## Session i Cookies

Sesja w Sinatrze umieszczana jest w ciasteczku.

    enable :sessions

    get '/' do
      session["counter"] ||= 0
      session["counter"] += 1
      "Byłeś na tej stronie #{session["counter"]} raz(y)."
    end


Po zainstalowaniu rozszerzenia
[*LiveHeaders*](http://livehttpheaders.mozdev.org/installation.html)
do Firefoxa, możemy podejrzeć ciasteczka przesyłane
z i do przeglądarki.

A teraz przykład ciasteczka bez sesji:

    require 'rubygems'
    require 'sinatra'

    get '/' do
      # pobierz napis reprezentujący ciasteczko
      cookie = request.cookies["cos_tam"]
      # ustaw wartość domyślną
      cookie ||= 0
      # zamień na liczbę całkowitą
      cookie = cookie.to_i
      # zrób coś tam z wartością ciasteczka
      cookie += 1
      # zresetuj wartość ciasteczka
      response.set_cookie("cos_tam", cookie)
      # response.set_cookie("cos_tam",
      #                     :domain => 'localhost',
      #                     :path => '/',
      #                     :expires => Date.new)
      # wyrenderuj coś tam:
      "Coś tam teraz to: #{cookie}"
    end



## Przykład z PUT/DELETE

Since browsers don’t natively support the PUT and DELETE methods, a
hacky workaround has been adopted by the web community. Simply add a
hidden element with the name “\_method” and the value equal to the
HTTP method you want to use. The form itself is sent as a POST, but
Sinatra will interpret it as the desired method. For example:

    <form method="post" action="/destroy_it">
      <input name="_method" value="delete" />
      <div><button type="submit">Destroy it</button></div>
    </form>


When you want to use PUT or DELETE from a client that does support
them (`curl` or `wget`), just go ahead and use them as you normally
would, and ignore the `_method` advice above. That is only for hacking
in support for browsers.


## Helpers, czyli metody pomocnicze

Metody pomocnicze dostępne są w
<em>inside events</em> and szablonach.

    helpers do
      def bar(name)
        "#{name}bar"
      end
    end

    get '/:name' do
      bar(params[:name])
    end


Najbardziej znaną metodą pomocniczą jest `redirect`.

    get '/'
      redirect 'http://google.pl'
      # redirect 'http://google.pl', 303 # wymusza kod HTTP 303
    end



## Modele

### Przykład z Active Record

### Przykład z Datamapper


## Rack Middleware

Prosty przykład.

    require 'rubygems'
    require 'sinatra'

    module Rack
      class Upcase
        def initialize app
          @app = app
        end
        def call env
          puts 'rack::upcase middleware'
          status, headers, body = @app.call(env)
          [status, headers, [body.first.upcase]]
        end
      end
    end

    use Rack::Lint    # standardowe middleware
    use Rack::Upcase  # moje middleware

    get '/' do
      'hello world'
    end



## Error Handling

Błędy `not_found` i `on_error`.


## Zmiana typu mime

Jeśli plik jest serwowany przez *Sinatrę*, to
w bloku `before` wpisujemy:

    before do
      mime :sql, 'text/plain; charset="UTF-8"'
      ...
    end


Jeśli żądanie jest przechwytywane przez *Rack::Static* middleware,
to w pliku rack, np. *config.ru* wpisujemy:

    Rack::Mime::MIME_TYPES.merge!('.sql' => 'text/plain; charset="UTF-8"')


Przykład: [insert](/doc/examples/sql/insert_d.sql).

Uwaga: wartości ustawiane powyżej są wartościami domyślnymi
obu frameworków.


## Więcej przykładów

S. Chacon, [Gitbrowser](http://github.com/schacon/gitbrowser).
Aplikacja korzysta z gemu [Grit](http://grit.rubyforge.org).


## Uwaga

„Survival Guide” nie jest kompletny (24.02.2009).
Więcej informacji jest na stronie
z [„Sinatra Book”](http://www.sinatrarb.com/book.html).
