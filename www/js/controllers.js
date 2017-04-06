
//global variabel att lagra all information inuti
var reservation = {
  checkin: '',
  checkinString: '',
  checkout: '',
  price: '',
  noOfDays: '',
  firstName: '',
  lastName: '',
  tel: '',
  address: '',
  postal: '',
  pets: '',
  adults: 2,
  children: 2,
  hideForm: false
}

var date = {
  today: ''
}

angular.module('app.controllers', [])

  .controller('getARoomCtrl', function ($scope, $http, $stateParams, $state) {
    $http.get('js/rooms.json').success(function (data) {
      //Lagra all data i rooms (en hel array med objekt
      $scope.room = data;
    });

    // Hämta parametern roomID från state
    $scope.roomId = $state.params.roomID;

    // Läs in reservations-datan
    $scope.reservation = reservation;

    // Beräkna priset för rummet för att presentera på sidan
    // samt att lagra den i reservation
    $scope.totalPrice = function (room) {
      reservation.price = reservation.noOfDays * room.price;
    }

    $scope.setRoom = function (room) {
      reservation.roomId = room.roomID;
    }

    $scope.sendObject = function (room) {
      reservation.roomObject = room
    }

  })

  .controller('bookingCtrl', function ($scope) {
    $scope.checkin = data;

    // Läs in reservations-datan
    $scope.reservation = reservation;

  })

  .controller('menuCtrl', function ($scope, $stateParams) { })

  .controller('loginCtrl', function ($scope, $stateParams) { })

  .controller('mapCtrl', function ($scope, $ionicLoading, $compile) {

  })

  .controller('startCtrl', function ($scope, $stateParams) {

    // Läs in dagens datum
    $scope.date = date;

    // Läs in reservations-datan
    $scope.reservation = reservation;

    // Räkna ut hur många dagar det skiljer mellan in- och utcheckning
    $scope.calculateDays = function (checkin, checkout) {
      var diff = new Date(checkout) - new Date(checkin);
      var days = ((((diff / 1000) / 60) / 60) / 24);
      reservation.noOfDays = days;
    }

    $scope.today = function () {
      var today = new Date();
      var dd = today.getDate(); // hämta dagens datum
      var mm = today.getMonth() + 1; //Januari börjar på 0
      var yyyy = today.getFullYear(); // Hämta året vi befinner oss i

      if (mm < 10) // lägg till siffran 0 om månad är mindre än 10
        mm = '0' + mm.toString();
      if (dd < 10) // lägg till siffran 0 om dag är mindre än 10
        dd = '0' + dd.toString();

      var todayString = yyyy + '-' + mm + '-' + dd  // Bygg en sträng i formatet YYYY-MM-DD
      date.today = todayString
      date.max = yyyy + 1 + '-' + mm + '-' + dd
    }

    $scope.selectedDay = function () {
      var dd = reservation.checkin.getDate(); // Hämta dag från objektet
      var mm = reservation.checkin.getMonth() + 1; // Hämta månad från objektet, Januari börjar på 0
      var yyyy = reservation.checkin.getFullYear(); // hämta år från objektet

      if (mm < 10)
        mm = '0' + mm.toString();
      if (dd < 10)
        dd = '0' + dd.toString();

      var tomorrowString = yyyy + '-' + mm + '-' + dd
      date.tomorrow = tomorrowString
      reservation.checkinString = tomorrowString
      date.TomorrowMax = yyyy + 1 + '-' + mm + '-' + dd
    }
  })

  .controller('aboutCtrl', function ($scope, $stateParams) {
  })

  .controller('confirmationCtrl', function ($scope, $http, $ionicPopup, $ionicSideMenuDelegate) {
    $http.get('js/rooms.json').success(function (data) {

      // Inaktivera side menu drag eftersom det finns ett range-objekt på sidan
      $ionicSideMenuDelegate.canDragContent(false)

      //Lagra all data i rooms (en hel array med objekt
      $scope.room = data
    });

    // Läs in reservations-datan
    $scope.reservation = reservation

    // en popup för att fråga om man verkligen vill boka
    $scope.showPopup = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Are you ready to book ' + reservation.firstName + '?',
        template: '' + reservation.adults + ' adults ' +
        'and ' + reservation.children + ' children ' + '<br><br>' +
        'You are planning on checking in  <br>' + reservation.checkinString + ' and will stay for  ' + reservation.noOfDays + ' nights' + '<br><br>' +
        'The total price is <strong>' + reservation.price + '</strong>'

      });
      confirmPopup.then(function (res) {
        if (res) {
          reservation.hideForm = true
        } else {  }
      });
    };

    // Vid start ska hideForm återställas
    $scope.changeHideForm = function() {
      reservation.hideForm = !reservation.hideForm
    }

    // en popup med information om hur många som kan boka
    $scope.showPeopleAlert = function () {
      var alertPopup = $ionicPopup.alert({
        title: 'Information',
        template: 'If you\'re booking larger groups, please contact us, so we can be sure to cover all your needs. tel: 08-12 34 56'
      });
    };

  })