# PHP-Musicoin-Pool-Monitor
A Mining Pool Hub Musicoin monitor that shows you mining earnings and statistics from their pool based off of your API key. This was written in Laravel (PHP), Javascript/jQuery (for API calls), and CSS used from Bootstrap.

Why use AJAX for API calls? The APIs that this application calls to has limits. To prevent this application from exceeding those limits on the server side, the API calls are made from the client-side. Should a client make too many API calls/submissions, they will be limited, not your PHP server.
