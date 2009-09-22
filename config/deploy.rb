set :application, "ti"
set :repository, "ssh://math.univ.gda.pl/~wbzyl/scm/projects/techniki-internetowe"

set :scm, :git
set :branch, "master"
set :deploy_via, :export

# If you aren't deploying to /u/apps/#{application} on the target
# servers (which is the default), you can specify the actual location
# via the :deploy_to variable:
# set :deploy_to, "/var/www/#{application}"
set :deploy_to,   "/home/pracown/wbzyl/www/#{application}"

set :scm, :git

role :app, "localhost"
role :web, "localhost"
role :db,  "localhost", :primary => true

# or, the last three command, do this way:
# set :domain, "localhost"
# server domain, :web, :app, :db

set :keep_releases, "4"  # cap deploy:cleanup

# specific to localhost
#set :app_server, :passenger
set :user, "wbzyl"

set :use_sudo, false
