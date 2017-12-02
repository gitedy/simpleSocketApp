var app = angular.module('BlankApp', ['ngMaterial', 'LocalStorageModule', 'btford.socket-io']);


app.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
    return socketFactory({
        ioSocket: io.connect('https://simple-socket-app.herokuapp.com')
    });
}]);

app.controller('homeController', function($scope, localStorageService, SocketService) {

    $scope.array = [];
    $scope.message = {};
    SocketService.emit('room', { roomId: "temp" });

    $scope.add = function() {
        SocketService.emit('toBackEnd', { data: $scope.message, date: new Date() })
        $scope.array.push({ data: $scope.message, date: new Date() })

    }


    SocketService.on('message', function(msg) {
        console.log("aagya mere paas bhi")
        $scope.array.push(msg)
    });

})