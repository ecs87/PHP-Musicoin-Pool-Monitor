# PHP-Musicoin-Pool-Monitor
A Mining Pool Hub Musicoin monitor that shows you mining earnings and statistics from their pool based off of your API key. This was written in Laravel (PHP), Javascript/jQuery (for API calls), and CSS used from Bootstrap.

A live demo can be found here: http://laravel1.elsonsmith.com

Why use AJAX for API calls? The APIs that this application calls to has limits. To prevent this application from exceeding those limits on the server side, the API calls are made from the client-side. Should a client make too many API calls/submissions, they will be limited, not your PHP server.

### Usage
Enter your Mining Pool Hub API key into the field and click Submit.
You can find your Mining Pool Hub API key here: https://miningpoolhub.com/?page=account&action=edit
The site automatically refreshes the fields/values via Ajax every few minutes.
