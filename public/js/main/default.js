// Sets loading
document.onreadystatechange = function() {
  if (document.readyState == 'complete') {

      const loader = document.getElementById('loader')

      setTimeout(function() {
          loader.style.display = 'none';
      }, 200)
  }
};
