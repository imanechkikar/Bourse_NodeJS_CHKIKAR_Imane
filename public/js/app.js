/**
 * 
 */


var app =  angular.module("Societe", ['ui.router']);


app.config(function($stateProvider,$urlRouterProvider){
	
	$stateProvider.state("home",{
		url:"/home",
		templateUrl:"view/home.html",
		controller:"HomeController"
	      }
	);
	

	$urlRouterProvider.otherwise("home");
}
		

);



  
app.controller("HomeController",function($scope,$http,$rootScope){

	$scope.listeOrdres=null;
	$scope.codeSociete="MA0000012296";
	$scope.pagecourante=0;
	$scope.size=5;
	$scope.pages=null;
	$scope.total=0;

	var socket = io.connect('http://localhost:8000');
/*
	socket.on('stream', function (data) {
		console.log(data.n);
		$scope.listeOrdres=data.n;
		$rootScope.$apply();
	});*/

	$scope.chargerOrdres= function(){

		var socket = io.connect('http://localhost:8000');

		setInterval( function() {
 			console.log("send code");
			socket.emit('Ordres',{msg:$scope.codeSociete});
			socket.on('AllOrdres',function(m){
				console.log(m.ord);
				$scope.listeOrdres=m.ord;
				$scope.$apply();
			});
		}, 2000);



	};

	$scope.goTo=function($index){
		$scope.pagecourante=$index;
		$scope.chargerOrdres();
	}
	
	$scope.deleteOrd=function(idOrdre){
		$http.delete("ordre?id="+idOrdre)
		.success(function (data) {
			$scope.chargerOrdres();
		});
	};
	
	$scope.updateOrd=function(order){
		$scope.up=order;
		$http.get("listesocietes")
	    .success(function(data){
	   	  $scope.societes=data;
	   	}
	    );
	}
	
   $scope.upOrdre=function(up){
		
		console.log($scope.up);
		$http({
			method  : 'POST',
			url     : '/ordre',
			data    : JSON.stringify($scope.up ),
			headers :{'Content-Type': 'application/json'} 
		}).success(function(){
			$scope.ok=true;
			$scope.up=null;
			alert($scope.ok);
			
		});
			
		
	}
	
});

















