var app = angular.module("myapp", ["ngRoute", "ngResource", "ngAnimate"]);

app.directive("sayHello", function() {
    return {
        templateUrl: "templates/directive.html",
        controller: "directiveCtrl",
        restrict: "E"
    }
})
//Insert a factory to the directive if you want to interact with it
app.controller("directiveCtrl", function($scope){
    $scope.greet = function(){
        alert("Hello!")
    }
})
app.config(["$routeProvider", function($routeProvider) {
    $routeProvider
        .when("/page1", {
            templateUrl: "templates/page1.html",
            controller: "testCtrl"
        })
        .when("/page2", {
            templateUrl: "templates/page2.html",
            controller: "testCtrl"
        })
        .when("/hello/:name", {
            templateUrl: "templates/hello.html",
            controller: "helloCtrl"
        })
        .otherwise({
            redirectTo: "/page1"
        });
}]);

app.factory("Test", function($http){
    var factory = {}
    
    factory.sayHello = function(name){
        alert("Hello " + name)
    }

    factory.getUsers = function(){
        return $http.get("http://daretodiscover.herokuapp.com/users")
    }
    
    return factory
})

app.controller("helloCtrl", function($scope, $http, $routeParams, Test){
    $scope.name = $routeParams.name
    Test.sayHello($scope.name)
})

app.controller("testCtrl", function ($scope, $http, Test) {
    $scope.testModel = "Sweet new value"
    var users = [
        {
            firstname: "Arun",
            lastname: "Sood",
            age: 28,
            username: "arsood"
        },

        {
            firstname: "Josh",
            lastname: "Alexy",
            age: 24,
            username: "jalexy12"
        }
    ];
    $scope.loadUsers = function(){
        $scope.users = users;
    }
    
    $scope.loadData = function(){
        
        Test.getUsers()
            .success(function(users){
                $scope.users = users
            })
            .error(function(){
                console.log("Something went wrong")
            })
    }
});