'use strict';

/**
 * @ngdoc directive
 * @name stockApp.directive:stkWatchlistPanel
 * @description
 * # stkWatchlistPanel
 */
angular.module('stockApp')
	.directive('stkWatchlistPanel', function ($location,$modal,WatchlistService) {
		return {
			templateUrl: 'views/templates/watchlist-panel.html',
			restrict: 'E',
			scope: {},
			link: function postLink($scope, element, attrs) {
				// element.text('this is the stkWatchlistPanel directive');
				$scope.watchlist = {};

				var addListModel = $modal({
					scope: $scope,
					template: 'views/templates/addlist-modal.html',
					show: false
				});

				// 将服务中的模型绑定到该作用域
				$scope.watchlists = WatchlistService.query();

				// 显示modal
				$scope.showModal = function () {
					addListModel.$promise.then(addListModel.show);
				};

				//根据莫泰框中的字段创建一个新的列表
				$scope.createList = function () {
					WatchlistService.save($scope.watchlist);
					addListModel.hide();
					$scope.watchlist = {};
				};

				// 删除目标列表并重定向到主页

				$scope.deleteList = function (list) {
					WatchlistService.remove(list);
					$location.path('/');
				}
			}
		};
	});
