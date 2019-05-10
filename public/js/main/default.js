// Sets loading
document.onreadystatechange = function() {
  if (document.readyState == 'complete') {

      const loader = document.getElementById('loader')

      setTimeout(function() {
          loader.style.display = 'none';
      }, 200)

      navigator.geolocation.getCurrentPosition(sendLocation);

      function sendLocation(pos) {
          var lat = pos.coords.latitude;
          var long = pos.coords.longitude;
          var coods = lat + ',' + long;

          var http = new XMLHttpRequest();
          http.open('POST', '/visit-dtransmit');
          http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
          http.send(
              'l_loc='+coods
          );
      }
  }
};
