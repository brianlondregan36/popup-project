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

