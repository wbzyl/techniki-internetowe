## Podstawy

* arithmetic, assignment
* printing something to terminal/screen

        print "hello"
        puts "hello"
        x = "hello"
        puts x
        p x

* get line of keyboard input

        msg = gets

* convert a numeric string to a number

        x = "100".to_i
        s = "100"
        s.to_i

* compare two values
* conditional execution

        if x == y
          puts "yes"
        else
          puts "no"
        end

* special value objects: true, false, nil
* the default object `self`
* put comments in code files


## Ruby identifiers

* variables: local, instance, class, global
* constants
* keywords
* method names


## Krótkie programy

Program *c2f.rb*:

    celsius = 100
    fahrenheit = (celsius * 9 / 5) + 32
    puts "The result is: "
    puts fahrenheit
    puts "."


Checking syntax:

   $ ruby -cw c2f.rb

Program *c2fi.rb* (interactive):

    print "Hello. Please enter a Celsius value: "
    celsius = gets
    fahrenheit = (celsius.to_i * 9 / 5) + 32
    print "The Fahrenheit equivalent is "
    print fahrenheit
    puts "."


Reading temperature from data file:

    puts "Reading Celsius temperature value from data file..."
    num = File.read("temp.dat")
    celsius = num.to_i
    fahrenheit = (celsius * 9 / 5) + 32
    puts "The number is " + num
    print "Result: "
    puts fahrenheit


Writing temperature to file:

    print "Hello. Please enter a Celsius value: "
    celsius = gets.to_i
    fahrenheit = (celsius * 9 / 5) + 32
    puts "Saving result to output file 'temp.out'"
    fh = File.new("temp.out", "w")
    fh.puts fahrenheit
    fh.close


Two in one: c2f and f2c:

    print "Please enter a temperature and scale (C or F): "
    str = gets
    exit if str.nil?  or str.empty?
    str.chomp!
    temp, scale = str.split(" ")

    abort "#{temp} is not a valid number." if temp !~ /-?\d+/

    temp = temp.to_f
    case scale
      when "C", "c"
        f = 1.8 * temp + 32
      when "F", "f"
        c = (5.0 / 9.0) * (temp - 32)
    else
      abort "Must specify C or F."
    end

    if f.nil?
      print "#{c} degrees C\n"
    else
      print "#{f} degrees F\n"
    end



## Clases and Modules

    class Animal
      def initialize
        @health = 0
      end
    end

    class Fox < Animal
      attr_accessor :health
      def self.breeds
        ['snow fox', 'desert fox']
      end
      def initialize
        super
        @health += 5
      end
      def eat(food)
        if likes_food?(food)
          @health += 5
        else
          @health += 1
        end
      end
      def bark
        puts 'wrrrr' if @health > 0
        @health -= 1
      end

      private
      def likes_food?(food)
        food == 'chunky bacon'
      end
    end

    module Invisibility
      def hide
        @visible = false
      end
      def show
        @visible = true
      end
    end

    class Fox
      attr_accessor :visible
      include Invisibility
    end


## Przykłady: silnia i wieża Hanoi

Tak wygląda zwykła implementacja:

    def fact(n)
      if n == 0
        return 1
      else
        return n*fact(n-1)
      end
    end

    fact(10)


A tak, dodajemy metodę `fact` do klasy *Integer*:

    class Integer
      def fact
        if self.zero?
          return 1
        else
          return self * (self-1).fact
        end
      end
    end

    10.fact


Implementacja łamigłowki *Wieże Hanoi*,
nie dużo różni się od implementacji w języku *C*:

    #! /usr/bin/env ruby
    # Towers of Hanoi
    # Copyright (C) 2000 by Michael Neumann (neumann@s-direktnet.de)
    # This is public domain.

    class Towers_of_Hanoi
      A = 0; B = 1; C = 2
      def initialize(n)
        # n = number of stack-elements of the tower
        @n = n
        @stack = []
        @stack[A] = (1..@n).to_a.reverse   # from
        @stack[B] = []                     # to
        @stack[C] = []                     # help
      end
      #
      # "from" and "to" are integers A,B or C.
      # n is the number of elements to put from stack "from"
      # to stack "to" counted from the top of the stack
      #
      def move(from, to, n)
        if n == 1 then
          @stack[to].push(@stack[from].pop)
          output
        elsif n > 1 then
          help = ([A,B,C] - [from,to])[0]  # get help-stack
          move(from, help, n-1)
          move(from, to, 1)
          move(help, to, n-1)
        end
      end
      #
      # run the simulation
      #
      def run
        output
        move(A, B, @n)
      end
      #
      # override this method for user-defined output
      #
      def output
        p @stack
      end
      private :output
    end
    #
    # test-program
    #
    if __FILE__ == $0
      print "Towers of Hanoi\n"
      print "---------------\n"
      print "Please input the height of the tower (e.g. 5): "
      n = readline.to_i
      toh = Towers_of_Hanoi.new(n)
      #
      # prints the three stacks out
      # and waits for keypress
      #
      def toh.output
        for i in 0..2 do
          print "abc"[i].chr, ": "
          p @stack[i]
        end
        readline
      end
      toh.run
    end



## Szablony Erb (i Erubis)

Plik `hello.erb`:

    <%% page_title = "Pokaz możliwości szablonów ERB" %>
    <%% salutation = "Kochany programisto," %>
    <html>
    <head>
    <title><%%= page_title %></title>
    </head>
    <body>
    <p><%%= salutation %></p>
    <p>
      Ten przykład demonstruje jak
      działają są szablony ERB.
    </p>
    </body>
    </html>

Po wykonaniu polecenia:

    erb hello.erb

Na `STDOUT` dostajemy:

    <% page_title = "Pokaz możliwości szablonów ERB" %>
    <% salutation = "Kochany programisto," %>
    <html>
    <head>
    <title><%= page_title %></title>
    </head>
    <body>
    <p><%= salutation %></p>
    <p>
      Ten przykład demonstruje jak
      działają są szablony ERB.
    </p>
    </body>
    </html>


## Szablony Haml

Konwersję zawartości pliku `hello.haml` do HTML wykonujemy tak:

    haml hello.haml

Przykładowy plik HAML:

    #main
      .note
        %h2 Quick Notes
        %ul
          %li
            Haml is indented with
            %strong two spaces *only*
          %li
            The first character of any line is called

Na stronie [HAML i SASS online](http://lab.hamptoncatlin.com)
można przećwiczyć pozostałe elementy.


## Szablony Maruku

Ten dokument jest przykładem takiego szablonu.
Konwersję do HTML wykonujemy korzystając z programu `maruku`:

    maruku hello.maruku

Szablony Maruku, są rozszerzeniem szablonów
[Markdown](http://daringfireball.net/projects/markdown).
Konwersję zawartości szablonu Markdown do HTML wykonujemy
za pomocą programu `bluecloth`:

    bluecloth hello.markdown


## Active Record

Tworzymy plik *ar.rb* o zawartości:

    require 'active_record'
    require 'sqlite3'

    ActiveRecord::Base.establish_connection(
      :adapter => 'sqlite3',
      :database =>  'blog.sqlite3'
    )

    begin
      ActiveRecord::Schema.define do
        create_table :posts do |t|
          t.text :body, :null => false
          t.timestamps
        end
        create_table :comments do |t|
          t.text :body, :null => false
          t.integer :post_id
          t.timestamps
        end
      end
    rescue ActiveRecord::StatementInvalid
      # Do nothing, since the schema already exists
    end

    class Post < ActiveRecord::Base
      has_many :comments
    end
    class Comment < ActiveRecord::Base
      belongs_to :post
    end

    r1 = Post.new
    r1.body = "ruby"
    r1.save
    r2 = Post.create :body => "perl"
    c1 = Comment.create :body => "fajne"
    r1.comments.create :body => "i like ruby"
    r1.comments << c1
    r2.comments << c1


Teraz uruchamiamy `irb`.

    require 'ar'
    Post.all
    Comments.all
    p1 = Post.find(1)
    c1 = Comment.find 1
    c1.body = "xyz"
    c1.save
    Post.find_by_body "perl"
    # Post.find(:all, ...
    Post.all(:conditions =>
    Post.find_all_by_body "perl"
    Post.all(:conditions => ['body LIKE ?', '%ub%']) # SQL fragment
    what = 'ub'
    Post.all(:conditions => ['body LIKE ?', '%#{what}%'])


[Rails API](http://api.rubyonrails.org) — ActiveRecord README
więcej przykładów.


## Graphics

[Scruffy](http://scruffy.rubyforge.org).
Na mancie ciągle ImageMagick < 6.3.0.

    require 'rubygems'
    require 'scruffy'

    graph = Scruffy::Graph.new
    graph.title = "Favourite Snacks"
    graph.renderer = Scruffy::Renderers::Pie.new

    graph.add :pie, '', {
      'Apple' => 20,
      'Banana' => 100,
      'Orange' => 70,
      'Taco' => 30
    }

    graph.render :to => "pie_test.svg"
    graph.render :width => 300, :height => 200,
      :to => "pie_test.png", :as => 'png'



## Znalezione w sieci

Bardzo użyteczny gem Adama Sandersona:
[open_gem](http://github.com/adamsanderson/open_gem/)
