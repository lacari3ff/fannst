// Gets doms
const nav_profile_dropdown = document.getElementById('nav-profile-dropdown');
const nav_apps_dropdown = document.getElementById('nav-apps-dropdown');
// Dropdown profile toggle
function profile_toggle() {
    if(nav_profile_dropdown.style.display == 'none') {
        nav_apps_dropdown.style.display = 'none';
        nav_profile_dropdown.style.display = 'block';
    } else {
        nav_profile_dropdown.style.display = 'none';
    }
}
// Dropdown apps toggle
function apps_toggle() {
    if(nav_apps_dropdown.style.display == 'none') {
        nav_profile_dropdown.style.display = 'none';
        nav_apps_dropdown.style.display = 'block';
    } else {
        nav_apps_dropdown.style.display = 'none';
    }
}
