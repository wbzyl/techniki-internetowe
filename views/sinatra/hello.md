*Education* jest prostą aplikacją wypisującą cytaty.
Aplikację uruchamiamy, tak jak każdą aplikację Sinatry:

    ruby education.rb -p 4567 -s localhost

Po uruchomieniu, aplikacja jest dostępna pod adresem:

    http://localhost:4567

Wyświetlany cytat jest losowany z pliku `education.json`,
a same cytaty pochodzą z uniksowej aplikacji *Fortune*.

Aplikację *Education* można sklonować z serwera
[*Github*](http://github.com):

    git clone git://github.com/wbzyl/sinatra_fortune.git

## Education

Aplikacja składa się z czterech plików:

*  `education.rb`
*  widoku `index.erb`
*  layoutu `layout.erb`
*  pliku z cytatami: `education.json`

Plik `education.rb` zawiera implementację aplikacji:

    require 'rubygems'
    gem 'json', '>=1.1.3'
    require 'json'
    gem 'sinatra', '>=0.9.0.5'
    require 'sinatra'

    before do
      data =
        begin
          File.read(File.dirname(__FILE__) + '/public/education.json')
        rescue Errno::ENOENT
          '[ { "q":  "A gdzie jest plik education.json", "a": "Administrator"} ]'
        end
      @quotations = JSON.parse data
      @length = @quotations.length
    end

    get '/' do
      education = @quotations[rand(@length)]
      @quotation = education['q']
      @author = education['a']
      erb :index
    end


Layout aplikacji `layout.erb`:

    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="Content-type" content="text/html; charset=utf-8">
        <link rel="stylesheet" href="/stylesheets/application.css"
              type="text/css" media="screen" charset="utf-8">
        <script src="/javascripts/jquery.js"
              type="text/javascript" charset="utf-8"></script>
        <script src="/javascripts/application.js"
              type="text/javascript" charset="utf-8"></script>
        <title>Random Quotes</title>
      </head>
      <body>
        <h1>Random Quotes</h1>
        <%%= yield %> <!-- tutaj jest wstawiany plik index.erb -->
      </body>
    </html>


Plik `index.erb` to tylko dwa wiersze kodu:

    <p class="quote"><%%= @quotation %></p>
    <p class="author"><%%= @author %></p>


Na koniec, fragment pliku z cytatami `education.json`:

    [
      {
        "q": "A fool's brain digests philosophy...",
        "a": "G. B. Shaw"
      },
      ...
    ]

## Znalezione w sieci

1. A base Sinatra application template with DataMapper, RSpec, and Haml.
    [Just fork and build.](http://github.com/zapnap/sinatra-template/)
2. [Rubigen based generator
   for new sinatra projects.](http://github.com/quirkey/sinatra-gen/)
3. [Building your own Sinatra clone:
   Parts I-V](http://remi.org/2009/03/30/building-your-own-sinatra-clone-part-1.html)

Przykładowe aplikacje:

* Keith Norman, Allison Liechty. [Rubex](http://github.com/wbzyl/Rubex)
