function getCookie(cname) {
		var name = cname + "=";
		var cookies = document.cookie.split(';');
		for(var i = 0; i < cookies.length; i++) {
			var c = cookies[i];
			while(c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if(cookies[i].indexOf(name) == 0) {
				return c.substring(name.length,c.length);
			}
		}
		return "";
	}
	
function setCookieForSession(cname, cvalue) {    
	var newCookie = cname + "=" + cvalue + "; ";
	newCookie += "path=/; ";
	newCookie += "domain=.popup-project.herokuapp.com; ";
    document.cookie = newCookie;
}


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
