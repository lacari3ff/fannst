const support_cb = document.getElementById('support-cb');
const ste_url = document.getElementById('ste_url');
// Functions
function send() {
    // Gets variables
    var ste_url_value = document.getElementById('ste_url').value;
    // Resets variables
    ste_url.classList.remove('input-in-err');
    support_cb.innerHTML = null;
    if(
        ste_url_value!=''
    ) {
        var http = new XMLHttpRequest();
        http.open("POST", "/support", true);
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        http.send(
            'ste_url='+ste_url_value
        );
        http.onload = function() {
            if(http.readyState == 4 && http.status == 200) {
                var data = JSON.parse(http.responseText);
                if(data.status == true) {
                    support_cb.innerHTML = 'Thanks! Your submision will be crawled a.s.p.';
                } else {
                    ste_url.classList.add('input-in-err');
                }
            }
        }
    } else {
        ste_url.classList.add('input-in-err');
    }
}