## Wdrażamy Education na Apacha z Passengerem

Tworzymy katalog `config` i wykonujemy polecenie:

    capify .

Zostaną utworzone dwa nowe pliki: `Capfile` oraz `config/deploy.rb`.

Do pliku `Capfile` dopisujemy:

    namespace :deploy do
      desc "Restart the Passenger process on the app server."
      task :restart do
        run "touch #{current_path}/tmp/restart.txt"
      end

      desc "Stop the Passenger process on the app server."
      task :stop do
        run "echo 'Can not STOP Sinatra application.'"
      end

      desc "Start the Passenger process on the app server."
      task :start do
        run "echo 'Can not START Sinatra application.'"
      end
    end
{:lang=ruby}

A zawartość `config/deploy.rb` wymieniamy na:

    set :user, "wbzyl"
    set :use_sudo, false

    set :application, "education"
    set :repository, "git://github.com/wbzyl/sinatra_fortune.git"

    set :scm, :git
    set :branch, "master"  
    set :deploy_via, :export  

    set :deploy_to, "/home/wbzyl/www/#{application}"

    role :app, "localhost"
    role :web, "localhost"
    role :db,  "localhost", :primary => true

    set :keep_releases, "4"  # cap deploy:cleanup  
{:lang=ruby}

Na koniec, dopisujemy do pliku `/etc/hosts`:

    127.0.0.1  localhost.localdomain  localhost  education.local

i tworzymy nowy plik `/etc/httpd/conf.d/mod_rails_vhosts.conf` 
dla Apacha, w którym wpisujemy:

    <VirtualHost *:80>
      ServerName education.local
      DocumentRoot /home/wbzyl/www/education/current/public
    </VirtualHost>

Jeśli poprawnie wklepaliśmy cały kod, to poniższe polecenia 
powinny wykonać się **bez błędów**:

    cap deploy:setup
    cap deploy:check
    cap deploy:update

Dopiero teraz restartujemy demona apacza (zob. `/etc/init.d`), który
udostępni aplikację pod url `http://education.local`.

Po zmianach w aplikacji, wykonujemy zazwyczaj kilka z poniższych poleceń:

    cap deploy:pending:diff
    git commit -m ".. jakiś wpis do log .."
    git push
    cap deploy:update
    cap deploy:restart


## Wdrażamy Education na Thina

Plik `Capfile` dla Thina:

    namespace :deploy do
      desc <<-DESC
      Start Thin processes on the app server.
      This uses the rackup command and the config.ru file
      DESC
      task :start , :roles => :app do
        run "/usr/bin/thin -C #{current_path}/config/thin_config.yaml start"
      end
      
      desc <<-DESC
      Stop the Thin process on the app server. 
      DESC
      task :stop , :roles => :app do
        run "/usr/bin/thin -C #{current_path}/config/thin_config.yaml stop"
      end
      
      desc <<-DESC
      Restart the Mongrel process on the app server. 
      This uses the pid stored in the tmp/pids/mongrel.pid file.
      DESC
      task :restart , :roles => :app do
        run "/usr/bin/thin -C #{current_path}/config/thin_config.yaml restart"
      end
    end
{:lang=ruby}

Plik konfigurujący Thina, `thin_config.yaml`:

    ---
    environment: production
    chdir: /home/wbzyl/www/education/current
    address: localhost
    user: wbzyl
    group: wbzyl
    port: 4000
    servers: 2
    pid: /home/wbzyl/www/education/shared/pid/thin.pid
    log: /home/wbzyl/www/education/shared/log/thin.log
    rackup: /home/wbzyl/www/education/current/config.ru
    max_conns: 1024
    timeout: 30
    max_persistent_conns: 512
    daemonize: true
{:lang=yaml}

Uwaga: Szablon takiego pliku wygeneruje sam program
jeśli wywołamy go w ten sposób:

    thin config -C config.yaml

Pierwsze wdrożenie zaczynamy od wykonania poleceń:

    cap deploy:setup
    cap deploy:check
    cap deploy:update
    cap deploy:start

A następne wdrożenia, po `git add`, `commit` i `push`, 
wykonujemy tak:

    cap deploy
