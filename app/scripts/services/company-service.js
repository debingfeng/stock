'use strict';

/**
 * @ngdoc service
 * @name stockApp.companyService
 * @description
 * # companyService
 * Service in the stockApp.
 */
angular.module('stockApp')
	.service('CompanyService', function ($resource) {
		// AngularJS will instantiate a singleton by calling "new" on this function
		return $resource('companies.json');
	});
