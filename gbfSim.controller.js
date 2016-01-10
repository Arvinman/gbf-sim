(function (angular) {
    'use strict';

    var myApp = angular.module('myApp', []);
    myApp.controller('GbfSimController', ['$scope', '$http', function ($scope, $http) {

        // view model & default value
        $scope.ssrRate = 0.06;
        $scope.rollList = [];

        $scope.totalSsr;
        $scope.totalRoll = 2000;
        $scope.click = onClick;
        
        // initialized
        var my_seeded_chance;
        var rndConfig = {
            params: {
                num: "1",
                col: "1",
                min: "1",
                max: "1000000000",
                base: "10",
                format: "plain",
                rnd: "new",
            },
        };
        $http.get("https://www.random.org/integers/", rndConfig)
            .then(function (randNum) {
                // Instantiate Chance with this truly random number as the seed
                my_seeded_chance = new Chance(randNum);
                console.log(my_seeded_chance.natural());
            }, function (err) {
                // unable to connect to random.org
                my_seeded_chance = new Chance(123456);
                console.log("offline mode");
            });

        // implement
        function onClick() {
            $scope.rollList = [];
            $scope.totalSsr = 0;
            for (var i = 0; i < $scope.totalRoll; ++i) {
                var rollResult = rollGacha($scope.ssrRate);
                if (rollResult.drop == "SSR")
                    ++$scope.totalSsr;
                $scope.rollList.push(rollResult);
            }
        };

        function rollGacha(ssrRate) {
            var roll = my_seeded_chance.floating({ min: 0, max: 1 });
            if (roll < ssrRate) {
                return { drop: "SSR", roll: roll };
            } else {
                return { drop: "miss", roll: roll };
            }
        }

    }]);

})(window.angular);