<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
				<link rel="stylesheet" href="{{asset('css/app.css')}}">
				<link rel="stylesheet" href="{{asset('css/custom.css')}}">
				
				<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
				
        <title>{{config('app.name', 'Mining Hub Musicoin Monitor')}}</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
    </head>
    <body>
    	@yield('content')
    	<script src="{{ asset('js/queryMiningAPI.js') }}"></script>
    </body>
</html>