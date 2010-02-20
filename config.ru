
require 'ti'

#gem 'rack-htmltidy'
#require 'rack/htmltidy'

use Rack::ShowExceptions
use Rack::Lint

Rack::Mime::MIME_TYPES.merge!('.sql' => 'text/plain; charset="UTF-8"')
#use Rack::HTMLTidy, :errors => true, :diagnostics => true
run Sinatra::Application
