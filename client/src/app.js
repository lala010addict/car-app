var app = angular.module('app', ['ngRoute'])
app.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '/src/views/login.html',
    controller: 'loginCtrl'
  })
  .when('/login', {
    templateUrl: '/src/views/login.html',
    controller: 'loginCtrl'
  })
  .when('/searchBar', {
    templateUrl: '/src/views/searchBar.html',
    controller: 'searchBarCtrl'
  })

  $locationProvider.html5Mode(true)
})
.controller("searchBarCtrl", function($scope) {
    // $scope.showSearchBar=false;
    // $scope.showLogin=true;


    $scope.makes = window.carData.makes
    $scope.searchMake = (make) => {
      $scope.currentMake=make;
    }

    // $scope.clickLogin = () => {
    //   $scope.showSearchBar=true;
    //   $scope.showLogin=false;
    // }

    // $scope.logOut= () => {
    //   $scope.showSearchBar=false;
    //   $scope.showLogin=true;
    // }
    $scope.searchMake = (make) => {
      $scope.make = $('#make').val()
      $scope.index=$('#make')[0].selectedIndex
      $scope.models = $scope.makes[$scope.index].models

      $scope.filteredModels = {}
      $scope.modelsAndYears = {}
        for (var i = 0; i<$scope.models.length; i++) {
          var item = $scope.models[i]
          var first=item.name.split(' ')[0]
          var years = item.years.map(function(item) {
            return item.year.toString();
          })
          if (!$scope.filteredModels[first]) {
            $scope.filteredModels[first] = [item.name]
          } else {
            $scope.filteredModels[first].push(item.name)
          }

          $scope.modelsAndYears[item.name] = years
        }

      $scope.filteredModelsArr = Object.keys($scope.filteredModels)

    }

    $scope.modelClick = (model) => {
      $scope.showAllModels= true;
    }

    $scope.searchYear = (year) => {
      $scope.make = $('#make').val();
      $scope.index=$('#make')[0].selectedIndex
      $scope.year = $('#year').val()
      if ($scope.year === "Show All Years") {
        $scope.searchMake()
      } else {
      $scope.models = $scope.makes[$scope.index].models
      $scope.modelsProducedInSelectedYear = []
      var keys = Object.keys($scope.modelsAndYears)
      for(var i = 0; i<keys.length; i++) {
        var models = $scope.modelsAndYears[keys[i]]
        if(models.includes($scope.year)) {
          $scope.modelsProducedInSelectedYear.push(keys[i])
        }
      }
      $scope.filteredModels = {}
      for (var i = 0; i<$scope.modelsProducedInSelectedYear.length; i++) {
          var item = $scope.modelsProducedInSelectedYear[i]
          var first=item.split(' ')[0]
          if (!$scope.filteredModels[first]) {
            $scope.filteredModels[first] = [item]
          } else {
            $scope.filteredModels[first].push(item)
          }
        }
      $scope.filteredModelsArr = Object.keys($scope.filteredModels)
      }

    }

})

/**

$scope.filteredModels = {
  Honda: [ 'Accord, {years: [2010],
          , [Civic, {years: [2010]}]
}

**/
