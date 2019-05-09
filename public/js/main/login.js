const user = document.getElementById('user');
// Get doms
const login_sec1 = document.getElementById('login-sec1');
const login_sec2 = document.getElementById('login-sec2');
const login_sec2_user_email = document.getElementById('login-sec2-user-email');
// Functions
function sec1_finish() {
    if(
        check_user_user()
    ) {
        //Gets values
        var user_user_value = document.getElementById('user').value;
        //Sends data
        var http = new XMLHttpRequest();
        http.open('POST', '/signin-validate');
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        http.send(
            'user='+user_user_value
        );
        http.onload = function() {
            if(http.readyState == 4 && http.status == 200) {
                var data = JSON.parse(http.responseText);
                if(data.status == true) {
                    user.classList.remove('input-in-err');
                    login_sec2_user_email.innerHTML = data.user.user_email;
                    login_sec1.style.animation = 'animate-out .4s both';
                    setTimeout(function() {
                        login_sec1.style.display = 'none';
                        login_sec2.style.display = 'block';
                        login_sec2.style.animation = 'animate-in .4s both';
                    }, 400)
                } else {
                    user.classList.add('input-in-err');
                }
            }
        }
    }
}

function sec2_finish() {
    
}

function check_user_user() {
    var user_user_value = document.getElementById('user').value;
    user.classList.remove('input-in-err');
    if(user_user_value!='') {
        return true;
    } else {
        user.classList.add('input-in-err');
        return false;
    }
}
