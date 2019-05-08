// RegExpresions
const user_name_rexExp = new RegExp(/^[a-zA-Z]+$/);
const user_uid_rexExp = new RegExp(/^[a-zA-Z0-9_.]+$/);
const user_email_regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const user_pass_regExp = new RegExp(/^[a-zA-Z]\w{3,14}$/);
const user_phone_regExp = new RegExp(/^[0-9]+$/);
// Get doms
const register_sec1 = document.getElementById('register-sec1');
const register_sec2 = document.getElementById('register-sec2');
// Get input doms
const user_first = document.getElementById('user_first');
const user_last = document.getElementById('user_last');
const user_email = document.getElementById('user_email');
const user_uid = document.getElementById('user_uid');
const user_pass = document.getElementById('user_pass');
const user_pass_co = document.getElementById('user_pass_co');
const user_phone = document.getElementById('user_phone');
const user_rest_email = document.getElementById('user_rest_email');
const user_bdate = document.getElementById('user_bdate');
// Animations
function sec1_finish() {
    if(
        checkStep1()
    ) {
        register_sec1.style.animation = 'animate-out .4s both';
        setTimeout(function() {
            register_sec1.style.display = 'none';
            register_sec2.style.display = 'block';
            register_sec2.style.animation = 'animate-in .4s both';
        }, 400)
    }
}
function sec2_finish() {
    if(
        checkStep2()
    ) {
        //Gets values
        var user_pass_value = document.getElementById('user_pass').value;
        var user_uid_value = document.getElementById('user_uid').value;
        var user_email_value = document.getElementById('user_email').value;
        var user_first_value = document.getElementById('user_first').value;
        var user_last_value = document.getElementById('user_last').value;
        var user_phone_value = document.getElementById('user_phone').value;
        var user_rest_email_value = document.getElementById('user_rest_email').value;
        var user_bdate_value = document.getElementById('user_bdate').value;
        var user_gender_value = document.getElementById('user_gender').value;
        //Sends data
        var http = new XMLHttpRequest();
        http.open("POST", "/signup", true);
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        http.send(
            'user_first='+user_first_value+'&&user_last='+user_last_value+'&&user_email='+user_email_value+'&&user_uid='+user_uid_value+'&&user_pass='+user_pass_value+'&&user_phone='+user_phone_value+'&&user_rest_email='+user_rest_email_value+'&&user_bdate='+user_bdate_value+'&&user_gender='+user_gender_value
        );
        http.onload = function() {
            if(http.readyState == 4 && http.status == 200) {
                var data = JSON.parse(http.responseText);
                if(data.status == true) {
                    window.location.href = '/signin';
                } else {

                }
            }
        }
    }
}
function sec2_back() {
    register_sec2.style.animation = 'animate-out .4s both'
    setTimeout(function() {
        register_sec2.style.display = 'none';
        register_sec1.style.display = 'block'
        register_sec1.style.animation = 'animate-in .4s both'
    }, 400)
}
function checkStep1() {
    var check = check_user_uid();
    var check1 = check_user_last();
    var check2 = check_user_pass();
    var check3 = check_user_email();
    var check4 = check_user_first();
    var check5 = check_user_pass_co();
    if(
        check&&
        check1&&
        check2&&
        check3&&
        check4&&
        check5
    ) {
        return true;
    } else {
        return false;
    }
}
function checkStep2() {
    var check = check_user_phone();
    var check1 = check_user_rest_email();
    var check2 = check_user_bdate();
    if(
        check&&
        check1&&
        check2
    ) {
        return true;
    } else {
        return false;
    }
}
// Step 1
function check_user_pass_co() {
    var user_pass_co_value = document.getElementById('user_pass_co').value;
    user_pass_co.classList.remove('input-inline-in-err');
    if(user_pass_regExp.test(user_pass_co_value)) {
        return true;
    } else {
        user_pass_co.classList.add('input-inline-in-err');
        return false;
    }
}
function check_user_pass() {
    var user_pass_value = document.getElementById('user_pass').value;
    user_pass.classList.remove('input-inline-in-err');
    if(user_pass_regExp.test(user_pass_value)) {
        return true;
    } else {
            user_pass.classList.add('input-inline-in-err');
        return false;
    }
}
function check_user_uid() {
    var user_uid_value = document.getElementById('user_uid').value;
    user_uid.classList.remove('input-in-err');
    if(user_uid_rexExp.test(user_uid_value)) {
        return true;
    } else {
        user_uid.classList.add('input-in-err');
        return false;
    }
}
function check_user_email() {
    var user_email_value = document.getElementById('user_email').value;
    user_email.classList.remove('input-in-err');
    if(user_email_regExp.test(user_email_value)) {
        return true;
    } else {
        user_email.classList.add('input-in-err');
        return false;
    }
}
function check_user_first() {
    var user_first_value = document.getElementById('user_first').value;
    user_first.classList.remove('input-inline-in-err');
    if(user_name_rexExp.test(user_first_value)) {
        return true;
    } else {
        user_first.classList.add('input-inline-in-err');
        return false;
    }
}
function check_user_last() {
    var user_last_value = document.getElementById('user_last').value;
    user_last.classList.remove('input-inline-in-err');
    if(user_name_rexExp.test(user_last_value)) {
        return true;
    } else {
        user_last.classList.add('input-inline-in-err');
        return false;
    }
}
// Step 2
function check_user_phone() {
    var user_phone_value = document.getElementById('user_phone').value;
    user_phone.classList.remove('input-in-err');
    if(user_phone_regExp.test(user_phone_value)) {
        return true;
    } else {
        user_phone.classList.add('input-in-err');
        return false;
    }
}
function check_user_rest_email() {
    var user_rest_email_value = document.getElementById('user_rest_email').value;
    user_rest_email.classList.remove('input-in-err');
    if(user_email_regExp.test(user_rest_email_value)) {
        return true;
    } else {
        user_rest_email.classList.add('input-in-err');
        return false;
    }
}
function check_user_bdate() {
    var user_bdate_value = document.getElementById('user_bdate').value;
    user_bdate.classList.remove('input-inline-in-err');
    if(user_bdate_value) {
        return true;
    } else {
        user_bdate.classList.add('input-inline-in-err');
        return false;
    }
}
