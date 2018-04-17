function isWechat() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {    
        return true;
    } else {
        return false;
    }
}

if (isWechat()) {
	app_body.show_weixin = true
	app_body.show_zfb = false
} else {
	app_body.show_weixin = true
	app_body.show_zfb = true
}