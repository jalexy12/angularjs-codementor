var app = angular.module("todoApp", [])

var Todo = function(name, completed){
    this.name = name
    this.completed = completed
}

app.directive('todoList', function () {
    return {
        templateUrl: "templates/tododirective.html",
        controller: "todoCtrl",
        restrict: "E"
    }
})

app.controller("todoCtrl", function($scope){
    $scope.todos = JSON.parse(localStorage.getItem('todos')) || []
    $scope.addTodo = function(){
        var todo = new Todo($scope.todoModel, false)
        $scope.todos.push(todo) 
        $scope.todoModel = ""
        $scope.saveTodos()
    }
    $scope.deleteTodo = function (todo) {
        $scope.todos.splice(todo, 1) 
        $scope.saveTodos()
    }
        
    $scope.completeTodo = function (todo) {
        todo.completed = true
        $scope.saveTodos()
    }
    $scope.saveTodos = function(){
        localStorage.setItem('todos', JSON.stringify($scope.todos))
    }
})