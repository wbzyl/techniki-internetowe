Dwa przykłady:

* [Gist](https://gist.github.com/8ff54cdfd44e1a6485e2)
  przerobiony na *classy* app z *ActiveRecord* i dodanym *flashem*.
* [Git Wiki](http://github.com/sr/git-wiki/) by Simon Rozet.
  It relies on git to keep pages history and Sinatra to serve them.

## Classy Wiki

Plik rackup *config.ru*:

    require 'wiki'
    run Wiki.new


Wiki:

    require 'rubygems'
    require 'sinatra/base'
    require 'activerecord'

    gem 'nakajima-rack-flash', '>=0.0.7'
    require 'rack/flash'

    ActiveRecord::Base.establish_connection(
      :adapter => 'sqlite3',
      :database => 'wiki.sqlite'
    )

    begin
      ActiveRecord::Schema.define do
        create_table :posts do |t|
          t.string :name, :null => false
          t.text :content
          t.timestamps
        end
      end
    rescue ActiveRecord::StatementInvalid
      # do nothing, since the schema already exists
    end

    class Post < ActiveRecord::Base
      validates_uniqueness_of :name
    # named_scope :recent, {:limit => 4, :order => 'updated_at DESC'}
    end

    class Wiki < Sinatra::Base
      enable :sessions
      use Rack::Flash

      get '/' do
        redirect '/home'
      end

      get '/:page' do
        @page = Post.find_or_create_by_name(params[:page])
        @flash = flash[:notice]
        erb :show
      end

      get '/:page/edit' do
        @page = Post.find_or_create_by_name(params[:page])
        erb :edit
      end

      post '/:page' do
        @page = Post.find_or_create_by_name(params[:page])
        @page.content = params[:content]
        flash[:notice] = "Utworzono stronę wiki: #{params[:page]}"
        @page.save
        redirect "/#{@page.name}"
      end
    end


Layout *layout.erb*:

    <!DOCTYPE html>
    <html>
      <head>
        <title><%%= @page.name %></title>
      </head>
      <body>
        <h1><%%= @page.name %></h1>
      <%% if @flash %>
        <p><%%= @flash %></p>
      <%% end %>
      <%%= yield %>
      </body>
    </html>


Widok *show.erb*:

    <p><%%= @page.content %></p>
    <p><a href='/<%%= @page.name %>/edit'>Edit</a></p>


Widok *edit.erb*:

    <form action='/<%%= @page.name %>' method='POST'>
      <textarea name='content' rows='20' cols='65'><%%= @page.content %></textarea>
      <br>
      <input type='submit' value='Save'>
      <a href='/<%%= @page.name %>'>Cancel</a>
    </form>



## Git Wiki
