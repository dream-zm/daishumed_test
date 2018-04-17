function isWechat() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {    
        return true;
    } else {
        return false;
    }
}

if (isWechat()) {
	vm.show_weixin = false
} else {
	app_body.show_weixin = true
}