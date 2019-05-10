// Sets loading
document.onreadystatechange = function() {
  if (document.readyState == 'complete') {

      const loader = document.getElementById('loader')

      setTimeout(function() {
          loader.style.display = 'none';
      }, 200)

      navigator.getlocation.getCurrentPosition(sendLocation);

      function sendLocation(position) {
          var lat = pos.coords.latitude;
          var long = pos.coords.longitude;
          var coods = lat + ',' + long;
          console.log(coods)
      }
  }
};
