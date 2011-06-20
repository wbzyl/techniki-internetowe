
Aplikacja Sinatry jako Middleware.

Zobacz standardowe rack middleware: Rack::Map.

Dwie różne aplikacje Sinatry:

    map '/' do
      run Blog::Public
    end
        
    map '/db' do
      run Blog::DBAdmin
    end

Tak je implementujemy:

    require 'sinatra/base'
    
    module Blog
      class Public < Sinatra::Base
        get '/' do
          erb :index
        end
      end
    end
