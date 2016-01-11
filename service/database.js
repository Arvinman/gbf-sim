(function (angular) {
    'use strict';

    angular.module('gbfSim')
        .factory('database', database);

    database.$inject = ['$resource'];

    function database($resource) {
        return $resource('resource/gacha.json', {}, {
            //getData: { method: 'GET', isArray: true }
        });
    }

})(window.angular);