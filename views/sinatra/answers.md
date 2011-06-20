## REST Web Services

1\. Ładowanie pliku:

    require 'sinatra'
    # użycie: curl -F "upload=@alpha.txt" localhost:4567/sorter
    post '/sorter' do
      params[:upload][:tempfile].readlines.sort
    end


Dodajemy śledzenie:

    curl --trace-ascii - --form "upload=@alpha.txt" localhost:4567/sorter

Więcej przykładów użycia programu:
[cURL – Manual](http://curl.haxx.se/docs/manual.html)
