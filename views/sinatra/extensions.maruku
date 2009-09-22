
Zobacz [Writing Extensions](http://www.sinatrarb.com/extensions.html).

Lista znanych mi rozszerzeń:

1. [sinatra-prawn](http://github.com/sbfaulkner/sinatra-prawn/) —
   extension to add support for pdf rendering with Prawn templates.


## Building and Packaging Extensions

Sinatra extensions should be built as separate libraries and packaged
as gems or as single files that can be included within an application’
s lib directory. The ideal process for using an extensions is
installing a gem and requiring a single file.

The following is an example file layout for a typical extension
packaged as a gem:

    sinatra-fu
    |-- .gitignore
    |-- sinatra-fu.gemspec
    |-- Rakefile
    |-- README.markdown
    |-- LICENSE
    |-- TODO
    |-- lib
    |   `-- sinatra
    |       `-- fu.rb
    |-- test
    |   `-- spec_sinatra_fu.rb
    `-- examples
        |-- app.rb
        |-- config.ru
        `-- app-base.rb

Plik *sinatra-fu.gemspec*:

    require 'rake'
    
    Gem::Specification.new do |s|
      s.name = "sinatra-fu"
      s.version = '0.0.1'
      s.date = '2009-03-31'
      
      s.summary = "Sinatra-Fu yields fu method for escaping html"
      s.email = "matwb@univ.gda.pl"
      s.homepage = "http://github.com/wbzyl/sinatra-fu"
      s.description = "Sinatra-Fu yields missing h method for escaping html"
      s.authors = ["Włodek Bzyl"]
      s.files = FileList[".gitignore", "[A-Z]*", "{lib,test,examples}/**/*"]

      s.add_dependency 'sinatra', '>=0.9.1'
      s.add_dependency 'rack', '>=0.9.1'
      
      s.rubygems_version = '1.3.1'
    end
{:lang=ruby}

Plik *fu.rb*:

    require 'sinatra/base'
    
    module Sinatra
      module HTMLFuHelper
        def fu(text)
          Rack::Utils.escape_html(text)
        end
      end
    
      helpers HTMLFuHelper
    end
{:lang=ruby}

Plik *app.rb*:

    require 'rubygems'
    require 'sinatra'
    require 'sinatra/fu'
    
    get "/" do
      fu "1 < 2"     # => "1 &lt; 2"
    end
{:lang=ruby}

Aplikację uruchamiamy tak:

    ruby app.rb -p 4567

Plik *app-base.rb*:

    require 'rubygems'
    require 'sinatra/base'
    require 'sinatra/fu'
    
    class HelloApp < Sinatra::Base
      helpers Sinatra::HTMLFuHelper
    
      get "/" do
        fu "1 < 2"
      end
    end
{:lang=ruby}

Plik *config.ru*:

    #\ -p 4000 -s thin
    require 'app-base'
    run FuApp.new
{:lang=ruby}

A tę aplikację uruchamiamy tak:

    rackup config.ru -p 4000

albo tak:
 
    thin --rackup config.ru start -p 4000

## Omówić moje rozszerzenie Sinatra-RDiscount.

Rozszerzenie pobieramy z serwera Github:

    git clone git://github.com/wbzyl/sinatra-rdiscount.git
