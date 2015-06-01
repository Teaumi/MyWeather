function ContactCtrl($scope){

    $scope.contact = function(){

        if ($scope.message === undefined || $scope.message === null || $scope.message === undefined || $scope.email === null) {
            alert('Veuillez remplir au moins les champs "Email" et "Message".')
        }else{
            //Envoi du mail
            window.open('mailto:clubine@live.fr?subject=Retour sur MyWeather&body='+ $scope.message);
        }
    };
}