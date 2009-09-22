## What is Rack?

[*Rack*](http://rack.rubyforge.org) to: a Ruby Webserver Interface.
Jego autorem jest Christian Neukirchen.

Rack provides a minimal, modular and adaptable interface for
developing web applications in Ruby. By wrapping HTTP requests and
responses in the simplest way possible, it unifies and distills the
API for web servers, web frameworks, and software in between (the
so-called middleware) into a single method call.

Trzy screencasty które należy obejrzeć:
[Remi Taylor](http://remi.org/2009/02/19/rack-basics.html)


Przykład 1.

    require 'rubygems'
    require 'rack'
    
    app = lambda do |env|
      [
       200,                                              # status
       {"Content-Type" => "text/html; charset=utf-8"},  # headers
       [ "Hello Rack!" ]                                # body
      ]
    end
    Rack::Handler::Thin.run(app, :Port => 3000)
{:lang=ruby}

Przykład 2. A Rack application is an Ruby object (not a class) that
responds to call. It takes exactly one argument, the environment and
returns an Array of exactly three values: The status, the headers, and
the body.

    require 'rubygems'
    require 'rack'
    
    class HelloWorld
      def call(env)
        [200, {"Content-Type" => "text/html"}, "Hello Rack!"]
      end
    end
    Rack::Handler::Thin.run HelloWorld.new
{:lang=ruby}

Przykład 3. Middleware.

    require 'rubygems'
    require 'rack'
    require 'haml'
    
    engine = Haml::Engine.new( IO.read("hello.haml") )

    app = lambda do |env|
      [
       200,
       {"Content-Type" => "text/html; charset=utf-8"},
       [ engine.render ]
      ]
    end
    
    app = Rack::Builder.new do
      use Rack::CommonLogger
      use Rack::Static, :urls => ["/stylesheets", "/images"] #, :root ="public"
      run app
    end
    
    Rack::Handler::Thin.run app
{:lang=ruby}

gdzie plik *hello.haml* może wyglądać tak:

    !!!
    %html{'xmlns' => "http://www.w3.org/1999/xhtml", |
          'xml:lang' => "en", |
          'lang' => "en" }
      %head
        %meta{"http-equiv"=>"content-type", |
              :content=>"text/html; charset=utf-8"}
        %link{:href=>"/stylesheets/hello.css", |
              :media=>"screen",:rel=>"stylesheet",:type=>"text/css"}
        %title .:.moja stronka.:.
      %body
        %h1 Wycieczka w Tatry Zachodnie
        %p
          %img{:src=>"/images/08100002.jpg",:alt=>"ścieżka na.."}

Bez `Rack::Static` nie byłyby pliki z arkuszami stylów
i kodem Javascript oraz obrazki.


## Rackup Howto

The config file is `config.ru` if none is specified.

By convention, you should use `.ru` extension for a rackup config
file. Supply it a run Rack Object and you’re ready to go:

    $ rackup config.ru

`rackup` converts the supplied rack config file to
an instance of `Rack::Builder`. 
This is how is happens under the hood (just so you get an idea):

    config_file = File.read( CONFIG )
    rack_application = eval("Rack::Builder.new { #{config_file} }")
{:lang=ruby}

And then rackup supplies `rack_application` 
to the respective webserver:

    SERVER.run rack_application, options
{:lang=ruby}

The config file is treated as if it is the body of

    app = Rack::Builder.new { ... CONFIG ... }.to_app
{:lang=ruby}

Also, the first line starting with `#\` is treated as if it was
options, allowing rackup arguments to be specified in the config
file. For example:

    #\ -w -p 8765
      
    use Rack::Reloader, 0
    use Rack::ContentLength
    app = proc do |env|
      [ 200, {'Content-Type' => 'text/plain'}, "a" ]
    end
    run app
{:lang=ruby}

**Pytania:** 1. Czy opcje z pierwszego wiersza przebijają opcje z
linii poleceń? 2. Czy przebijają opcje z pliku konfiguracyjnego dla
Thina? (cienkiego), dla Mongrela? (kundelka).


### Automatic Middleware

Rackup will automatically use some middleware, depending on the
environment you select, the `-E` switch, with development being the
default:

* development: `CommonLogger`, `ShowExceptions`, `Lint`
* deployment: `CommonLogger`
* none: none


## More Examples

### Infinity

Following the community convention: use the block form of `Rack::Builder`:

    infinity = Proc.new {|env| [200, {"Content-Type" => "text/html"}, env.inspect]}
    builder = Rack::Builder.new do
      use Rack::CommonLogger
      run infinity
    end
    Rack::Handler::Thin.run builder
{:lang=ruby}

Routing examples follow.

Let’s say you want to show “infinity 0.1” for all the paths under
`/version` (i.e. `/version`, `/version/whatever` **but not** 
`/versionsomething`), you might want to do something like:

    infinity = Proc.new do |env| 
      [200, {"Content-Type" => "text/html"}, env.inspect]
    end
      
    builder = Rack::Builder.new do
      use Rack::CommonLogger
       
      map '/' do
        run infinity
      end
      map '/version' do
        run Proc.new {|env| [200, {"Content-Type" => "text/html"}, "infinity 0.1"] }
      end
    end
    Rack::Handler::Thin.run builder
{:lang=ruby}

Let’s say you feel like adding information about last version. So to
show “infinity beta 0.0” at `/version/last`:

    infinity = Proc.new {|env| [200, {"Content-Type" => "text/html"}, env.inspect]}
    builder = Rack::Builder.new do
      use Rack::CommonLogger
      
      map '/' do
        run infinity
      end
      map '/version' do
        map '/' do
          run Proc.new {|env| [200, {"Content-Type" => "text/html"}, "infinity 0.1"] }
        end
        map '/last' do
          run Proc.new {|env| [200, {"Content-Type" => "text/html"}, "infinity beta 0.0"] }
        end
      end
    end
    Rack::Handler::Thin.run builder
{:lang=ruby}

Finally, the *Infinty* app converted to rackup.

    #\ -p 4000 -s thin
    
    infinity = Proc.new {|env| [200, {"Content-Type" => "text/html"}, env.inspect]}
    
    map '/' do
      run infinity
    end
    map '/version' do
      map '/' do
        run Proc.new {|env| [200, {"Content-Type" => "text/plain"}, "infinity 0.1"] }
      end
      map '/last' do
        run Proc.new {|env| [200, {"Content-Type" => "text/plain"}, "infinity beta 1.0"] }
      end
    end
{:lang=ruby}


### Building Rack Middleware: **Rack::Upcase**

Przykład pokazujący, że napisanie prostego middleware
nie jest trudne i nie zajmuje dużo czasu.

    #\ -p 4000 -s thin
    
    require 'rubygems'
    require 'rack'

    module Rack
      class Upcase
        def initialize app
          @app = app
        end
       
        def call env
          status, headers, body = @app.call env
          [status, headers, [body.first.upcase]]
        end
      end
    end

    use Rack::Lint    
    use Rack::Upcase
    use Rack::ContentLength
    app = lambda { |env| [200, { 'Content-Type' => 'text/html' }, 'Hello World'] }

    run app
{:lang=ruby}

**Uwaga:** plik powyżej uruchamiamy za pomocą polecenia 

    rackup upcase.ru

Rozszerzenie ma być *.ru* a nie *.rb*.
