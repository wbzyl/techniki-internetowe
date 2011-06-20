# -*- coding: utf-8 -*-

require 'sinatra'
#require 'maruku'
require 'rdiscount'
require 'json'

require 'sinatra/static_assets'
#require 'sinatra/maruku'

set :erubis, :pattern => '\{% %\}', :trim => true
set :markdown, :layout => false

before do
  # When served by Sinatra itself
  #mime_type :sql, 'text/plain; charset="UTF-8"'

  @toc = {
    'html'        => JSON.parse(File.read(File.dirname(__FILE__) + '/views/toc/html.json')),
    'css'         => JSON.parse(File.read(File.dirname(__FILE__) + '/views/toc/css.json')),
    'javascript'  => JSON.parse(File.read(File.dirname(__FILE__) + '/views/toc/javascript.json')),
    'sinatra'     => JSON.parse(File.read(File.dirname(__FILE__) + '/views/toc/sinatra.json')),
    'sql'         => JSON.parse(File.read(File.dirname(__FILE__) + '/views/toc/sql.json')),
    'performance' => JSON.parse(File.read(File.dirname(__FILE__) + '/views/toc/performance.json'))
  }
end

helpers do

  def link_to_chapter(where, part)
    filename = where[0]
    title = where[1]
    "<a href='#{part}/#{filename}'>#{title}</a>"
  end

  def title(part, filename)
    part = @toc[part]
    where = part ? part.find { |s| s[0] == filename } : nil
    if where
      where[1]
    else
      redirect '/'
    end
  end

  def css(filename)
    # STDERR.puts "-------->|#{request.env['SCRIPT_NAME']}|\n"
    # STDERR.puts "-------->|#{request.env.inspect}|\n"
    # "HTTP_REFERER"=>"http://edu.local/ti/"
    # "HTTP_HOST"=>"edu.local",
    # "REQUEST_URI"=>"/ti/html/intro"
    # "SCRIPT_NAME"=>"/ti"
    # "SERVER_PORT"=>"80"
    "#{request.env['SCRIPT_NAME']}/stylesheets/#{filename}.css"
  end

  def js(filename)
    "#{request.env['SCRIPT_NAME']}/javascripts/#{filename}.js"
  end

  def image(filename)
    "#{request.env['SCRIPT_NAME']}/images/#{filename}"
  end

end

# render the table of contents
get '/' do
  @html        = @toc['html']
  @css         = @toc['css']
  @javascript  = @toc['javascript']
  @sinatra     = @toc['sinatra']
  @sql         = @toc['sql']
  @performance = @toc['performance']
  @request_uri = request['REQUEST_URI']
  erubis :toc
end

# render jQuery examples
get '/examples/:toc/:example' do
  @toc = params[:toc]
  @example = params[:example]
  erb :"examples/#{@toc}/#{@example}", :layout => :"examples/#{@toc}"
end

get '/data/*.*' do
  extension = params["splat"].last
  pathname =  params["splat"].first
  case extension
  when "json"
    content_type 'application/json', :charset => 'utf-8'
    erb :"examples/data/#{pathname}.#{extension}", :layout => false
  when "xml"
    content_type 'application/xml', :charset => 'utf-8'
    erb :"examples/data/#{pathname}.#{extension}", :layout => false
  else
    raise Sinatra::NotFound
  end
end

post '/asciiart' do
  sleep 2
  begin
    IO.read("#{options.views}/examples/data/asciiarts/#{params[:num]}.html")
  rescue
    "<h3>Please, enter a number in the 1..4 range.</h3>"
  end
end

# maruku :"#{params[:part]}/#{params[:section]}", :html_use_syntax => true
get '/:part/:section' do
  #STDERR.puts "part: #{params[:part]}, section: #{params[:section]}"
  @title = title(params[:part], params[:section])
  #markdown :"#{params[:part]}/#{params[:section]}"
  erubis markdown(:"#{params[:part]}/#{params[:section]}")
end

# jeśli nie zostanie obsłużone przez routing
not_found do
  status(404)
  @message || "Sinatra doesn't know about that!\n"
  # erb :error
end
