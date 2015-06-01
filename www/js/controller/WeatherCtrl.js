function WeatherCtrl($scope, $http, GeolocationService){

    $scope.panel = 0;

    $scope.search = function() {

        if($scope.city != null) {

            var url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + $scope.city + "&mode=json&units=metric&cnt=7";

            $scope.loader = true;
            $http.get(url).success(httpSuccess).error(httpError);
        }else{
            alert('Le champ Ville est vide');
        }
    };

    $scope.expand = function(e){
        $elem = $(e.currentTarget);
        $elem.addClass('row_active').siblings().removeClass
            ('row_active');
    };

    $scope.geolocate = function(){
        $scope.loader = true;
        GeolocationService.getCurrentPosition(function(position) {
            $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?lat='+ position.coords.latitude +'&lon='+  position.coords.longitude +'&mode=jsons&units=metric')
                .success(httpSuccess)
                .error(httpError);
        });
    };

    httpSuccess = function(response){
        if(response.cod == '404'){
            $scope.loader = false;
            alert('Veuillez vérifier votre saisie');
        }else{
            $scope.panel = 1;
            $scope.loader = false;
            $scope.weather = response;
        }
    };

    httpError = function () {
        $scope.loader = false;
        alert('Impossible de récupérer les informations');

    };

    $scope.detailedMap = function () {
        $scope.panel = 2;
        $scope.loader = true;
        GeolocationService.getCurrentPosition(function(position) {

            var mapOptions = {
                zoom: 10,
                center: new google.maps.LatLng(position.coords.latitude,position.coords.longitude)
            };

            var map = new google.maps.Map(document.getElementById('map-canvas'),
                mapOptions);

            var weatherLayer = new google.maps.weather.WeatherLayer({
                temperatureUnits: google.maps.weather.TemperatureUnit.CELSIUS,
                windSpeedUnit: google.maps.weather.WindSpeedUnit.KILOMETERS_PER_HOUR
            });
            weatherLayer.setMap(map);

            var cloudLayer = new google.maps.weather.CloudLayer();
            cloudLayer.setMap(map);

            $scope.loader = false;
        });
    };

    $scope.Math = Math;

}