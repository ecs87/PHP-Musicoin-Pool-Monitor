@extends('layouts.app')

@section('content')
<div class="container">
		<div class="entry-header">
			<h1>{{config('app.name', 'Mining Hub Musicoin Monitor')}}</h1>
			<h2> <b></b> per MUSIC coin @ <b class="current-diff"></b> difficulty </h2>
		</div><!-- .entry-header -->
		<div class="entry-content">
			<form class="form-group row">
				<strong>MiningPoolHub API Key:</strong>
				<input class="form-control" name="musMHPoolAPI" type="text" value="<?php if (isset($_GET['musMHPoolAPI'])) { echo $_GET['musMHPoolAPI']; } ?>" >
				<div class="col-md-6" style="padding: 0 !important; margin: 5px 0 0 0;">
					<input class="form-control" type="submit" value="Submit">
				</div>
			</form>
			<div class="row main-section">
				<div class="col-md-3">
					<div class="row bg-primary text-center personal-hashrate stats-box">
						<h4>Hashrate</h4>
						<div><img src="{{URL::asset('/images/loading.gif')}}" width=25 ></div>
					</div>
				</div>
				<div class="col-md-3">
					<div class="row bg-primary text-center mus-24hrCredits stats-box">
						<h4>Recent Credits (24 HR)</h4>
						<div><img src="{{URL::asset('/images/loading.gif')}}" width=25 ></div>
					</div>
				</div>
				<div class="col-md-3">
					<div class="row bg-primary text-center mus-balanceConf stats-box">
						<h4>Confirmed Balance</h4>
						<div><img src="{{URL::asset('/images/loading.gif')}}" width=25 ></div>
					</div>
				</div>
				<div class="col-md-3">
					<div class="row bg-primary text-center three columns mus-balanceUnConf stats-box">
						<h4>Unconfirmed Balance</h4>
						<div><img src="{{URL::asset('/images/loading.gif')}}" width=25 ></div>
					</div>
				</div>
			</div>
			<div class="row profits-section">
				<div class="col-md-4">
					<div class="row bg-success text-center mus-24hrProfit stats-box">
						<h4>24 Hour Profits</h4>
						<div><img src="{{URL::asset('/images/loading.gif')}}" width=25 ></div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="row bg-success text-center mus-monthlyProfits stats-box">
						<h4>30-Day Profits</h4>
						<div><img src="{{URL::asset('/images/loading.gif')}}" width=25 ></div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="row bg-success text-center mus-yearlyProfits stats-box">
						<h4>365-Day Profits</h4>
						<div><img src="{{URL::asset('/images/loading.gif')}}" width=25 ></div>
					</div>
				</div>
			</div>
			<h3 class="text-center">Active Workers</h3>
			<div class="row text-center workers-wrapper">
			</div>
		</div><!-- .entry-content -->
</div>
@endsection