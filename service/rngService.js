(function (angular) {

    'use strict';

    angular.module('gbfSim')
        .factory('rngService', rngService);

    rngService.$inject = ['$http'];

    function rngService($http) {

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
                console.log(randNum);
                my_seeded_chance = new Chance(randNum.data);
                console.log(my_seeded_chance.natural());
            }, function (err) {
                // unable to connect to random.org
                my_seeded_chance = new Chance(123456);
                console.log("offline mode");
            });

        return {
            floating: floating,
            integer: integer, 
            
        };

        function floating(min, max) {
            return my_seeded_chance.floating({ min: min, max: max });
        }
        
        function integer(min, max) {
            return my_seeded_chance.integer({ min: min, max: max });
        }
    }

})(window.angular);
