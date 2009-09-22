## Rozgrzewka

1. Przerobić tutorial [Try Ruby!](http://tryruby.hobix.com)

2. Przygotować kilka przykładów dokumentów dla programu <code>erb</code>.
   Odszukać w sieci gem *Erubis*. Jak go można porównać z Erbem?

3. Przećwiczyć notację *Haml*, czyli przygotować 3–4 różne przykłady.
   Przy okazji zapoznać się z notacją *Sass*.

4. Przećwiczyć notację *Markdown*.

5. Wyszukać kilka ciekawych gemów. Przygotować
   dla każdego gemu przykład jego użycia.


## Fortune

1. Dopisać kilka cytatów do pliku `education.json`.

1. Zmienić widok `views/index.erb`, tak aby można było
   wyświetlać wieloakapitowe cytaty. 
   *Uwaga*: zmienić/rozszerzyć format pliku JSON.

1. Dodać widok dla cytatów z obrazkiem.

1. Rozszerzyć routing, tak aby wejście na
   
        http://localhost/4

   spowodowało wyświetlenie 4. cytatu. 

Na koniec coś z zupełnie innej beczki:

1. Uruchomić jakiegoś bloga napisanego w Sinatrze, na przykład
[Marley'a](http://github.com/karmi/marley).

1. A teraz coś prostszego, mianowicie
[Jekyll](http://github.com/mojombo/jekyll),
czyl prosty, blog aware, generator stron statycznych.


## Rozbudowywanie Fortune
   
1. Dodać obsługę nie istniejących cytatów. Wejście na
   
        http://localhost/8888

   powinno nas przekierować na stronę z informacją
   o nie istniejącym cytacie o numerze 8888.

1. Dodać inne kategorie cytatów, zob. źródła 
   pakietu *fortune-mod*. Zmienić routing, tak aby
   były obsługiwane URL:

        http://localhost/education 
        http://localhost/science 
        http://localhost/humor

   Zmodyfikować routing, tak aby po wejściu na stronę
   *http://localhost/* wyświetlany był losowo
   wybrany cytat z losowo wybranej kategorii.
   Na stronie umieścić element *select* pozwalający
   wybrać kategorię z której będzie losowany cytat
   następny cytat.

1. Dodać dopisywanie nowych cytatów w formularzu.
   Rozszerzyć routing o `new` i `show`:

        http://localhost/new
        http://localhost/show/4

1. Na stronie głównej aplikacji dodać formularz 
   do wyszukiwania cytatów po autorach oraz po tekście.
   W formularzu umieścić element *select* z listą autorów.


## REST Web Services

1. Przepisać aplikację *Asides* w Haml i Sass.
1. Wdrożyć *Asides* korzystając z Capistrano.
1. Przepisać *Asides* na Datamapper.
   Jak korzystać z biblioteki datamapper jest
   opisane [tutaj](http://datamapper.org/doku.php?id=docs).
1. Załadować plik tekstowy do usługi WWW napisanej 
   w Sinatrze, która zwróci jego zawartość
   posortowaną (po wierszach).
   Do załadowania pliku użyć programu *curl*:

        curl --form "upload=@alpha.txt" localhost:4567/sorter
 
   Powyżej emulujemy formularz, w którym użytkownik
   kliknął przycisk „Submit”. Nazwa ładowanego pliku
   to *alpha.txt*, a *upload* to nazwa elementu
   formularza do wczytywania plików.


## Wysyłanie emajli

Poniższa aplikacja, korzystająca z gemu *TMail*,
umożliwia wysyłanie jednego emaila (plik *stmail.rb*):

    require 'rubygems'
    require 'sinatra'
    require 'tmail'
    require 'net/smtp'
    
    # jak przesłać polskie literki?
    
    before do 
      @mail = TMail::Mail.new
      @mail.to = 'matwb@julia.univ.gda.pl'
      @mail.from = 'wbzyl@manta.univ.gda.pl'
      @mail.subject = 'Wiadomosc testowa'
      @mail.body = 'Wiadomosc testowa z localhost via Sinatra/Tmail'
    end
    
    post '/signup' do
      Net::SMTP.start( 'localhost', 25 ) do |smtp|
        smtp.send_message(@mail.to_s, @mail.from, @mail.to)
      end
    end
{:lang=ruby}

Aby wysłać emaila należy: 

* uruchomić tę aplikację:

        ruby stmail.rb -p 4000

* następnie korzystając z programu `curl` wysłać żadanie POST:

        curl -X POST http://localhost:4000/signup

Zobacz też 
[Spotlight on Gems: TMail](http://ruby.about.com/od/gems/a/tmail.htm)

1. Na FAQ Sinatry, ktoś napisał:
   You can even use templates to render the body. 
   In `email.erb`:

        Good day <%%= params[:name] %>,
        Thanks for my signing my guestbook. You're a doll.
        Frank

   And in `mailerapp.rb`:

        post '/guestbook/sign' do
          Pony.mail :to => params[:email],
            :from => "me@example.com",
            :subject => "Thanks for signing my guestbook, #{params[:name]}!",
            :body => erb(:email)
        end
   {:lang=ruby}

   Wykorzystać te uwagi i zmienić kod, tak aby wysyłany
   email korzystał z szablonu i z `params[:name]`


## Asides

