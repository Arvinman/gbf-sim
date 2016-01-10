(function (angular) {
    'use strict';

    angular.module('gbfSim')
        .controller('GbfSimController', GbfSimController);

    GbfSimController.$inject = ['$scope', '$http', 'rngService', 'database'];

    function GbfSimController($scope, $http, rngService, database) {

        // view model & default value
        $scope.ssrRate = 0.06;
        $scope.rollList = [];

        $scope.totalSsr;
        $scope.totalRoll = 100;
        $scope.click = onClick;

        $scope.gachaDatabase;
        
        initGachaTable();
        
        function initGachaTable() {
            database.query(function (data) {
                $scope.gachaDatabase = data;
            });
        }
        
        function resetGachaGet() {
            for (var i = 0; i < $scope.gachaDatabase.length; ++i)
                $scope.gachaDatabase[i].totalGet = 0;
            $scope.rollList = [];
            $scope.totalSsr = 0;
        }

        // implement
        function onClick() {
            resetGachaGet();

            for (var i = 0; i < $scope.totalRoll; ++i) {
                var rollResult = rollGacha($scope.ssrRate);
                if (rollResult.drop == "SSR") {
                    ++$scope.totalSsr;
                    
                    var roll = rngService.integer(0, $scope.gachaDatabase.length - 1);
                    ++$scope.gachaDatabase[roll].totalGet;
                    rollResult.name = $scope.gachaDatabase[roll].name;
                }
                $scope.rollList.push(rollResult);
            }
        };

        function rollGacha(ssrRate) {
            var roll = rngService.floating(0, 1);
            if (roll < ssrRate) {
                return { drop: "SSR", roll: roll };
            } else {
                return { drop: "miss", roll: roll };
            }
        }

    }

})(window.angular);