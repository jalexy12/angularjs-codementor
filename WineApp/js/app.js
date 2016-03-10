var app = angular.module('wineApp', ["ngRoute", "ngResource", "ngAnimate"])
app.config(["$routeProvider", function($routeProvider) {
    $routeProvider
        .when("/wines", {
            templateUrl: "templates/wines.html",
            controller: "wineCtrl"
        })
        .when("/wines/edit/:id", {
            templateUrl: "templates/edit.html",
            controller: "editWineCtrl"
        })
        .otherwise({
            redirectTo: "/wines"
        });
}]);

app.factory("wineFactory", function($http){
    var factory = {}

    factory.getWines = function(){
        return $http.get("http://daretodiscover.herokuapp.com/wines")
    }

    factory.getWine = function(id){
        return $http.get("http://daretodiscover.herokuapp.com/wines/" + id)
    }

    factory.addWine = function(wine){
        return $http.post("http://daretodiscover.herokuapp.com/wines", wine)
    }
    factory.updateWine = function(id, data){
        return $http.put("http://daretodiscover.herokuapp.com/wines/" + id, data)
    }
    return factory
})

app.factory("Wine", function($resource) {
    return $resource("http://daretodiscover.herokuapp.com/wines/:id", {
       id: "@id"
    }, {
        update: {
            method: "PUT"
        }
    });
});

app.controller("editWineCtrl", function($scope, $http, $routeParams, $location, Wine){
        // wineFactory.getWine($routeParams.id)
        //     .success(function(wine){
        //         $scope.wine = wine
        //     })
        //     .error(function(){
        //         console.log("Error")
        //     })
    Wine.get({id: $routeParams.id}, function(wine){
        $scope.wine = wine
    })
    $scope.submitEdit = function(){
        Wine.update({id: $routeParams.id}, $scope.wine, function(){
            $location.path('/wines')
        })
    }
})

app.controller("wineCtrl", function($scope, $http, Wine) {
     $scope.wines = []
         // wineFactory.getWines()
         //    .success(function(wines){
         //        console.log(wines)
         //        $scope.wines = wines
         //    })
         //    .error(function(){
         //        console.log("Something went wrong")
         //  })
      Wine.query(function(wines){
        $scope.wines = wines
      })
      
      $scope.saveWine = function(){
        Wine.save($scope.wine, function(wine){
            $scope.wines.push(wine)
            $("#add-wine-modal").modal("hide");
        })
      }
     
})