// Gets doms
const overlay = document.getElementById('overlay')
const overlay_createurl_ic = document.getElementById('overlay-createurl-ic');
const overlay_viewurl_ic = document.getElementById('overlay-viewurl-ic');
// Functions
function overlay_viewurl(id) {
    if(!overlay.classList.contains('overlay-styleac')) {
        includeOverlayStyle();
    }
    if(
        id!=''
    ) {
        var http = new XMLHttpRequest();
        http.open('GET', '/url-shortener/request/overlay-viewurl?url_id='+id);
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        http.send();
        http.onload = function() {
            if(http.readyState == 4 && http.status == 200) {
                overlay_viewurl_ic.style.display = 'block';
                overlay_viewurl_ic.style.animation = 'animate_in .2s';
                overlay.style.display = 'block';
                overlay_viewurl_ic.innerHTML = http.responseText;
            }
        }
    }
}; function remove_url(id) {
    if(
        id!=undefined
    ) {
        var http = new XMLHttpRequest();
        http.open('POST', '/url-shortener/remove-url');
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        http.send(
            'url_id='+id
        );
        http.onload = function() {
            if(http.readyState == 4 && http.status == 200) {
                var data = JSON.parse(http.responseText);
                console.log(data)
                if(data.status == true) {
                    overlay_viewurl_ic.style.animation = 'animate_out .2s';
                    setTimeout(function() {
                        overlay_viewurl_ic.style.display = 'none';
                        overlay.style.display = 'none';
                        overlay_viewurl_ic.innerHTML = null;
                    }, 200)
                }
            }
        }
    }
}; function overlay_closeview() {
    overlay_viewurl_ic.style.animation = 'animate_out .2s';
    setTimeout(function() {
        overlay_viewurl_ic.style.display = 'none';
        overlay.style.display = 'none';
        overlay_viewurl_ic.innerHTML = null;
    }, 200)
}; function overlay_createurl() {
    if(!overlay.classList.contains('overlay-styleac')) {
        includeOverlayStyle();
    }
    if(overlay_createurl_ic.innerHTML!='') {
        if(overlay_createurl_ic.style.display == 'none') {
            overlay_createurl_ic.style.display = 'block';
            overlay_createurl_ic.style.animation = 'animate_in .2s';
            overlay.style.display = 'block';
        } else {
            overlay_createurl_ic.style.animation = 'animate_out .2s';
            setTimeout(function() {
                overlay_createurl_ic.style.display = 'none';
                overlay.style.display = 'none';
                var overlay_createurl_form = document.getElementById('overlay-createurl-form');
                overlay_createurl_form.reset();
            }, 200)
        }
    } else {
        var http = new XMLHttpRequest();
        http.open('GET', '/url-shortener/request/overlay-createurl');
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        http.send();
        http.onload = function() {
            if(http.readyState == 4 && http.status == 200) {
                overlay_createurl_ic.style.display = 'block';
                overlay.style.display = 'block';
                overlay_createurl_ic.style.animation = 'animate_in .2s';
                overlay_createurl_ic.innerHTML = http.responseText;
            }
        }
    }
}; function includeOverlayStyle() {
    overlay.classList.add('overlay-styleac');
    overlay.insertAdjacentHTML('afterbegin', '<link rel="stylesheet" type="text/css" href="/style/url-shortener/request/overlay-item.css">')
}; function create_url() {
    // Resets values
    var overlay_createurl_err = document.getElementById('overlay-createurl-err');
    overlay_createurl_err.innerHTML = null;
    // Checks if data is set
    if(
        check()
    ) {
        // Gets values
        var url_edata_value = document.getElementById('url_edata').checked;
        var url_url_value = document.getElementById('url_url').value;
        var url_nme_value = document.getElementById('url_nme').value;
        var url_nurl_value = document.getElementById('url_nurl').value;
        if(url_nurl_value=='') {
            url_nurl_value = 'null';
        }
        // Sends data
        var http = new XMLHttpRequest();
        http.open('POST', '/url-shortener/create-url');
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        http.send(
            'url_edata='+url_edata_value+'&url_url='+url_url_value+'&url_nurl='+url_nurl_value+'&url_nme='+url_nme_value
        );
        http.onload = function() {
            if(http.readyState == 4 && http.status == 200) {
                var data = JSON.parse(http.responseText);
                if(data.status == true) {
                    var overlay_createurl_form = document.getElementById('overlay-createurl-form');
                    overlay_createurl_form.reset();
                    overlay_createurl();
                } else {
                    overlay_createurl_err.innerHTML = data.err;
                }
            }
        }
    }
}; function check() {
    var check01 = check_url_url();
    var check02 = check_url_nme();
    if(
        check01&&
        check02
    ) {
        return true;
    } else {
        return false;
    }
}; function check_url_url() {
    var url_url = document.getElementById('url_url');
    var url_url_value = document.getElementById('url_url').value;
    url_url.classList.remove('input-inline-in-err');
    if(url_url_value!='') {
        return true;
    } else {
        url_url.classList.add('input-inline-in-err');
        return false;
    }
}; function check_url_nme() {
    var url_nme = document.getElementById('url_nme');
    var url_url_value = document.getElementById('url_nme').value;
    url_nme.classList.remove('input-inline-in-err');
    if(url_url_value!='') {
        return true;
    } else {
        url_nme.classList.add('input-inline-in-err');
        return false;
    }
}