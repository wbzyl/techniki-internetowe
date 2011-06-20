REST, to skrótowiec *Representational State Transfer*.

Cytat z *Wikipedii:*

An important concept in REST is the existence of resources
(sources of specific information), each of which is referenced with a
global identifier (e.g., a URI in HTTP). \[…\]
The most important HTTP methods are POST, GET, PUT and DELETE. These
are often respectively associated with the CREATE, READ, UPDATE,
DELETE (CRUD) operations associated with database technologies.

Kiedy mówimy o oprogramowaniu, że zostało zaprojektowane
w architekturze REST?

1. Istnieją zasoby, które opisujemy rzeczownikami.
2. Każdy zasób ma swój URI.
3. Dostęp do zasobów uzyskujemy korzystając z standardowych
   metod HTTP (czasowniki: POST, GET, PUT i DELETE).
4. Protokół z którego korzystamy jest:
   klient/serwer, bezstanowy, cacheable,
   layered (tzn. zasób może składać się z zasobów).

Protokół HTTP jest taki jak to opisano powyżej.

Dawno temu komputery komunikowałe się ze sobą via
XML, następnie via XML-RPC (Remote Procedure Call)
i SOAP (Simple Object Access Protocol).

A RESTFul web service is a simple web service implemented using HTTP
and the principles of REST. Such a web service can be thought about as
a collection of resources. The definition of such a web service can be
thought of as comprising three aspects:

* The URI for the web service such as
        http://example.com/resources/cars
* The MIME type of the data supported by the web service. This is
  often JSON, XML or YAML but can be anything.
* The set of operations supported by the web service using HTTP
  methods (e.g. POST, GET, PUT or DELETE).

Znalezione w sieci:

* [sinatra-rest](http://github.com/blindgaenger/sinatra-rest/)
  generates RESTful routes for the models of
  a Sinatra application (ActiveRecord, DataMapper, Stone)


## Asides — a REST Service in Sinatra

Aside to **notka**, dygresja, uwaga na marginesie.

Aside to resource, zasób.

                                         Read ID=4
    GET /asides/4      <-->  Service  <-------------->  SQLite

                                         Create
    POST /asides       <-->  Service  <-------------->  SQLite
    body=some%20text

                                         Update ID=4
    PUT /asides/4      <-->  Service  <-------------->  SQLite
    body=other%20text

                                         Delete ID=4
    DELETE /asides/4   <-->  Service  <-------------->  SQLite


## ActiveRecord asides

Asides będziemy zapamiętywać w tabelce SQLite. Dostęp do SQLite
uzyskamy via ActiveRecord.

Połączenie z SQLite oraz utworzenie tabelki *asides* umieszczamy w
bloku `configure`:

    require 'rubygems'
    require 'sinatra'
    require 'activerecord'

    configure do
      ActiveRecord::Base.establish_connection(
        :adapter => 'sqlite3',
        :database => 'asides.sqlite')
      begin
        ActiveRecord::Schema.define do
          create_table :asides do |t|
            t.text :body, :null => false
            t.timestamps
          end
        end
      rescue ActiveRecord::StatementInvalid
        # nic nie rób, ponieważ tabelka została już utworzona
      end
    end


Dostęp do tabelki uzyskamy korzystając z gotowców
odziedziczonych z klasy *ActiveRecord::Base*:

    class Aside < ActiveRecord::Base
      validates_uniqueness_of :body
      named_scope :recent, { :limit => 2,
                             :order => 'updated_at DESC' }
    end


Przy okazji zażyczymy sobie walidacji w kolumnie
*body* tabelki oraz zdefiniujemy metodę klasy
o nazwie *recent*. Powyżej Korzystamy z wygodnego **DSL**.


### Zapisywanie **aside** w tabelce

Zaczynamy od kodu do umieszczania *aside* w tabelce.
Metodę pomocniczą `aside_url` zdefiniujemy później;
jej definicję umieścimy w bloku `helpers`.

    post '/asides' do
      aside = Aside.new(:body => params[:body])
      if aside.save
        status(201)
        response['Location'] = aside_url(aside)
        "Utworzono aside #{aside.id} : \"#{aside.body}\"\n"
      else
        status(412)
        "Error: już było\n"
      end
    end


Obiecana powyżej definicja `aside_url`:

    helpers do
      def base_url
        if Sinatra::Application.port == 80
          "http://#{Sinatra::Application.host}/"
        else
          "http://#{Sinatra::Application.host}:#{Sinatra::Application.port}/"
        end
      end
      def aside_url(aside)
        "#{base_url}asides/#{aside.id}"
      end
    end


Teraz uruchamiamy aplikację:

    ruby asides.rb
    -- create_table(:asides)
       -> 0.3567s
    == Sinatra/0.9.1 has taken the stage on 4567
         for development with backup from Thin
    >> Thin web server (v1.0.0 codename That's What She Said)
    >> Maximum connections set to 1024
    >> Listening on 0.0.0.0:4567, CTRL+C to stop

Po uruchomieniu aplikacji, zabieramy się do wpisywania
notek do tabelki. Notki będziemy zapisywać w tabelce
korzystając z programu **curl**:

    curl -i --url http://localhost:4567/asides -X POST -d 'body=REST is awesome!'

Oto wynik wykonania tego polecenia:

    HTTP/1.1 201 Created
    Location: http://0.0.0.0:4567/asides/1
    Content-Type: text/html
    Content-Length: 39
    Connection: keep-alive
    Server: thin 1.0.0 codename That's What She Said

    Utworzono aside 1 : "REST is awesome!"

Wykonanie tego samego polecenia jeszcze raz:

    HTTP/1.1 412 Precondition Failed
    Content-Type: text/html
    Content-Length: 18
    Connection: keep-alive
    Server: thin 1.0.0 codename That's What She Said

    Error: już było


### Pobieranie **aside** z tabelki

Sprytne pobieranie: od razu w kilku formatach.

    get '/asides/:id.:format' do
      aside = Aside.find(params[:id])
      case params[:format]
      when 'xml'
        content_type :xml
        aside.to_xml
      when 'json'
        content_type 'application/json'
        aside.to_json
      else
        content_type :json
        aside.to_json
      end
    end


Po wrzuceniu kilku asides do tabelki, możemy spróbować
pobrać je w formacie XML lub JSON:

    curl -i --url http://localhost:4567/asides/1.xml -X GET
    curl -i --url http://localhost:4567/asides/1.json -X GET

Domyślną metodą HTTP jest *GET* dlatego opcję *-X* można pominąć.


### Uaktualnianie istniejącego **aside**

Kod bardzo podobny do metody `post`:

    put '/asides/:id' do
      aside = Aside.find(params[:id])
      aside.body = params[:body]
      if aside.save
        status(202)
        "Uaktualniono aside.\n"
      else
        status(412)
        "Error: nie udało się uaktualnić aside.\n"
      end
    end


Tak uaktualniamy aside:

    curl -i --url http://localhost:4567/asides/1 -X PUT -d 'body=XYZ'


### Usuwanie istniejącego **aside**

Niektóre dygresje, to pomyłki:

    delete '/asides/:id' do
      Aside.destroy(params[:id])
      status(200)
      "Usunięto aside\n"
    end


Tak usuwamy aside:

    curl -i --url http://localhost:4567/asides/1 -X DELETE


## Authentication: username + password

Zaczynamy od dwóch przykładów: *authentication-{1,2}.rb*
(lectures.git/sinatra/00-Hello/).

A teraz do dzieła! Wprowadzamy autentykację do aplikacji *Asides*.
W bloku *configure* aplikacji dodajemy stałą:

    configure do
      ...
      CREDENTIALS = ['admin', 'asides']


Następnie dopisujemy do metod pomocniczych metodę *protected\!*:

    helpers do
      ...
      def protected!
        auth = Rack::Auth::Basic::Request.new(request.env)

        # Request a username/password if the user does not send one
        unless auth.provided?
          response['WWW-Authenticate'] = %Q{Basic Realm="Asides"}
          throw :halt, [401, "Authentication Required\n"]
        end

        # A request with non-basic auth is a bad request
        unless auth.basic?
          throw :halt, [400, 'Bad Request']
        end

        # Authentication is well-formed, check the credentials
        if auth.provided? && CREDENTIALS == auth.credentials
          return true
        else
          throw :halt, [403, 'Forbidden']
        end
      end


A tak zabezpieczamy metodę *delete* przed nieuprawnionym
dostępem:

    delete '/asides' do
      protected!
      Aside.delete_all
      status(204)
    end


A tak sprawdzamy czy zabezpieczenie działa:

    curl -i --url http://localhost:4567/asides -X DELETE

I jeszcze jedna próba, z nieprawidłowym hasłem:

    curl -i --url http://localhost:4567/asides -X DELETE -u admin:akuku

A tak usuwnamy **wszystkie** asides:

    curl -i --url http://localhost:4567/asides -X DELETE -u admin:asides


## Piszemy klienta rest dla aplikacji Asides

    require 'rubygems'
    require 'rest_client'
    require 'json'

    if __FILE__ == $PROGRAM_NAME
      json   = RestClient.get('http://localhost:4567/asides')
      asides = JSON.load(json)

      asides.each do |aside|
        puts "(#{aside['id']}) - #{aside['body']}"
      end
    end


Uruchamiamy klienta:

    ruby fetch.rb

Dokumentacja do gemu *rest-client* (0.9.2).


## Error handlers

Obsługa błędów, etc.

    disable :show_exceptions

    error ActiveRecord::RecordNotFound do
      status(404)
      @msg = "Aside not found\n"
    end

    not_found do
      status(404)
      @msg || "Asides doesn't know about that!\n"
    end


Sprawdzamy:

    curl -i --url http://localhost:4567/asides/69.json
    ...
    Aside not found

    curl -i --url http://localhost:4567/jokes
    ...
    Asides doesn't know about that!


## Last-Modified header

    get '/asides.atom' do
      @asides = Aside.recent
      last_modified @asides.first.updated_at
      ...


Teraz wykonujemy:

    curl -i --url http://localhost:4567/asides.atom

Porządne aplikacje WWW, o ile to możliwe to dodają nagłówek 'If-Modified-Since'.
Jeśli skopiujemy timestamp z nagłówka 'Last-Modified' do polecenia,
to otrzymamy „porządne” polecenie:

    curl -i --url http://localhost:4567/asides.atom -H 'If-Modified-Since: Fri, 03 Apr 2009 19:45:23 GMT'

Teraz nasza aplikacja zwraca zamiast całego feed tylko:

    HTTP/1.1 304 Not Modified
    Last-Modified: Fri, 03 Apr 2009 19:45:23 GMT

W ten sposób zaoszczędzamy nieco cpu i bandwidth.
