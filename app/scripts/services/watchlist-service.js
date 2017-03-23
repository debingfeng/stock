'use strict';

/**
 * @ngdoc service
 * @name stockApp.WatchlistService
 * @description
 * # WatchlistService
 * Service in the stockApp.
 */
angular.module('stockApp')
	.service('WatchlistService', function () {
		// AngularJS will instantiate a singleton by calling "new" on this function

		// 从缓存中读取监控列表
		var loadModel = function () {
			return {
				watchlists: localStorage['stock.watchlists'] ? JSON.parse(localStorage['stock.watchlists']) : [],
				nextId: localStorage['stock.nextId'] ? parseInt(localStorage['stock.nextId']) : 0
			}
		};
		// 保存数据
		var saveModel = function () {
			localStorage['stock.watchlists'] = JSON.stringify(Model.watchlists);
			localStorage['stock.nextId'] = Model.nextId;
		};
		// 通过ID查找数据
		var findById = function (listId) {
			return _find(Model.watchlists,function (watchlist) {
				return watchlist.id === parseInt(listId);
			})
		};

		this.query = function (listId) {
			return listId ? findById(listId) : Model.watchlists;
		};

		this.save = function (watchlist) {
			watchlist.id = Model.nextId++;
			Model.watchlists.push(watchlist);
			saveModel();
		};

		this.remove = function (watchlist) {
			_.remove(Model.watchlists,function (list) {
				return list.id === watchlist.id;
			})
		};

		// 初始化模型
		var Model = loadModel();


	});
