
Najlepszym sposobem na zmniejszenie rozmiaru
pliku jest jego gzipnięcie.

* Typowa redukcja wielkości pliku: 4×.
* Gzipowanie jest wykonywane przez Apacha.
* Wystarczy raz skonfigurować Apacha i zapomnieć.

Oto jak konfigurujemy Apacha 2.x:

    AddOutputFilterByType DEFLATE text/html text/plain text/xml
        application/xml application/xhtml+xml text/javascript 
        text/css application/x-javascript
    
    ExpiresActive On
    
    ExpiresByType image/gif "access plus 2 days"
    ExpiresByType image/png "access plus 2 days"
    ExpiresByType image/jpeg "access plus 2 days"
    ExpiresByType text/javascript "access plus 2 days"
    ExpiresByType application/x-javascript "access plus 2 days"
    ExpiresByType text/css "access plus 2 days"
    Header unset ETag
    FileETag None
    Header add Cache-Control "public"
