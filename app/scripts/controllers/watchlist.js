'use strict';

/**
 * @ngdoc function
 * @name stockApp.controller:WatchlistCtrl
 * @description
 * # WatchlistCtrl
 * Controller of the stockApp
 */
angular.module('stockApp')
	.controller('WatchlistCtrl', function ($scope, $routeParams, $modal, WatchlistService, CompanyService) {
		// Initializations
		$scope.companies = CompanyService.query();
		var watchlist = WatchlistService.query($routeParams.listId);
		// console.log($scope.watchlist )
		// $scope.$watch('watchlist',function (newValue,oldValue, scope) {
		// 	console.log($scope.watchlist )
		// 	console.log(oldValue)
		// 	console.log(scope)
		// });
		$scope.stocks = watchlist.stocks;
		$scope.newStock = {};
		var addStockModal = $modal({
			scope: $scope,
			template: 'views/templates/addstock-modal.html',
			show: false
		});

		$scope.showStockModal = function () {
			addStockModal.$promise.then(addStockModal.show);
		};

		$scope.addStock = function () {
			watchlist.addStock({
				listId: $routeParams.listId,
				company: $scope.newStock.company,
				shares: $scope.newStock.shares
			});
			$scope.watchlist = $.extend(true,{},watchlist);
			addStockModal.hide();
			$scope.newStock = {};
		};

	});
