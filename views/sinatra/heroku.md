
> **Na razie tylko tyle:**
>
> We are currently running a developer 
> preview of the new platform. 
> Sign up below and give it a spin.

Screencast:
[Deploying Ruby Web Applications to 
Heroku](http://remi.org/2009/04/23/deploying-rails-and-rack-applications-to-heroku.html)


## Quick start

1. Install the Heroku gem file: 

        sudo gem install heroku 

2. Upload your public key: 

        heroku keys:add 
           
        Enter your Heroku credentials. 
        Email: you@example.com 
        Password: ********

3. Set up your app to use Git (if you aren't already using it): 

        cd myapp
        git init
        git add . 
        git commit -m "first commit"

4. Create an app: 

        heroku create
          
        Created http://sharp-autumn-42.com/ | git@heroku.com:sharp-autumn-42.git 
        Git remote heroku added

5. Deploy your code: 

        git push heroku master

6. Run migrations (or other bootstrap tasks): 

        heroku rake db:migrate

7. Open the deployed app in your browser: 

        heroku open

Teraz stronę można obejrzeć tutaj:

    http://vivid-night-17.heroku.com/

Po zmianie URL, strona jest tutaj:

    http://fortune.heroku.com/

Dokumentacja jest tutaj:

    http://docs.heroku.com/

Ustawienia:

    http://heroku.com/myapps
