/**
 * 顶部公共js
 */
var this_protocol = window.location.protocol;
if(this_protocol == "http:"){ 
    window.location.href = 'https://www.daishumed.com/html/index.html';
}
$(function () {
    //token 9999  9998
});


// const _ = require('http://res.wx.qq.com/open/js/jweixin-1.2.0.js')

// new_element=document.createElement("script");
// new_element.setAttribute("type","text/javascript");
// new_element.setAttribute("src","");
// document.body.appendChild(new_element);

/*function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",

                 "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
var flag = IsPC(); 
if(flag) {
    window.location.href = 'http://www.daishumed.com/daishumed_offical/pc/html/homepage/homepage.html'
} else {
    window.location.href = 'http://www.daishumed.com/daishumed_offical/phone/html/homepage/homepage.html'
}*/

function isWechat() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {    
        return true;
    } else {
        return false;
    }
}



//直播判断登陆
function check_user_state () {
    if (getToken() == "") {
        return false
    } else {
        return true
    }
}
//判断用户是否登录
function checkUserState(flag) {
    flag = 1;
    if (flag && getToken() == "") {
        alert('请先登录')
        window.location.href = "../../login/land.html"
        return;
    } 
}

function checkUserStates(flag) {
    flag = 1;
    if (flag && getToken() == "") {
        alert('请先登录')
        window.location.href = "login/land.html"
        return;
    } 
}
//清除缓存
function main_ceaar_caches() {
    //进入后先清空提交订单中的缓存数据
    localStorage.setItem('address_info', "");
    localStorage.setItem('invoice_info', "");
}

//返回上一页
function union_back() {
    history.back()
}
    

//判断是否为空
function isNull(data) {
    return data == undefined || data == 0 || data == "" || data == "null";
}

/*临时变量*/
function tokenName() {
    return "TOKEN_NAME";
}

function tempDataName() {
    return "TEMP_DATA_NAME";
}

function telName() {
    return "USER_TEL";
}

//获取首页地址
function getIndexUrl() {
    //alert("返回首页")
    return "../index.html";
}

//返回首页
function backToIndex() {
    window.location.href = getIndexUrl();
}


// function goPageType(data) {
//     localStorage.setItem("PAGE_TYPE",data);
// }
// function getPageType() {
//     return localStorage.getItem("PAGE_TYPE");
// }

function backPage() {

}

//Token set get
function getToken() {
    //对比新老token，如果不相同就退出

    return localStorage.getItem(tokenName());
}

function setToken(token) {
    localStorage.setItem(tokenName(), token);
}

//用户手机号 set get
function getTel() {
    return localStorage.getItem(telName());
}

function setTel(tel) {
    localStorage.setItem(telName(), tel);
}

function setTempData(data) {
    localStorage.setItem(tempDataName(), data);
}

function getTempData() {
    return localStorage.getItem(tempDataName());
}

function getUrl() {
    return "https://kangaroo.daishumed.com/index.php/";
}

/*网络请求*/
function yaqooNetGet(url, param, callbacks, is_async) {
    yaqooNet(url, "GET", param, callbacks, is_async)
}

function yaqooNetPost(url, param, callbacks, is_async) {
    yaqooNet(url, "POST", param, callbacks, is_async)
}

function yaqooNetFile(url, param, callbacks) {
    $.ajax({
        url: url,
        type: 'POST',
        cache: false,
        data: param,
        headers: {'Authorization': getToken()},
        processData: false,
        contentType: false,
        success: function (data) {
            callbacks(data)
        }
    });
}

function yaqooNet(url, type, param, callbacks, is_async) {
    //默认异步
    is_async = (is_async == undefined ? true : is_async);

    $.ajax({
        url: (url.startsWith("http") ? url : getUrl() + url),
        data: param,
        type: type,
        async: is_async,
        headers: {'Authorization': getToken()},
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            callbacks(data);

            if (data['code'] == 9999) {//如果token过期或者没有token
                setToken("");
                //alert(data['message']);

            } else if (data['code'] == 9998) {
                alert("1");
               // window.location.href = "../login/land.html"
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest, textStatus, errorThrown);
        },
        // error: function (XMLHttpRequest, textStatus, errorThrown) {
        //    // alert(XMLHttpRequest);
        //    // alert(XMLHttpRequest.readyState);
        //     //alert(errorThrown);
        //     console.log("网络请求失败")
        // },
        complete: function (XMLHttpRequest, textStatus) {
            //调用本次AJAX请求时传递的options参数
        }
    });
}


/*
 倒计时控件：小时、分钟、秒
 需要传入结束时间s,和回调事件
 */
function countDown_H_M_S(endtime, callBack) {
    //设置小时、分钟、秒
    var h = 0;
    var m = 0;
    var s = 0;
    //获取时间差
    var nowTime = new Date();

    var t = endtime - nowTime.getTime() / 1000;

    //每秒执行一次的函数
    function GetRTime() {
        --t;
        if (t >= 0) {
            s = Math.floor(t % 60);
        } else {
            clearInterval(timer);
        }
        h = Math.floor(t / 60 / 60 % 24);
        m = Math.floor(t / 60 % 60);

        callBack(h + ":" + m + ":" + s);
    }

    var timer = window.setInterval(GetRTime, 1000);
}


//时间戳转为年月日 时分秒
function formatTime_Y_M_D_H_M_S(php_time) {

    var timestamp3 = php_time;
    var newDate = new Date();
    newDate.setTime(timestamp3 * 1000);

    return newDate.toLocaleString();
}


//秒转时分秒
function formatSeconds(value) {
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
// alert(theTime);
    if(theTime > 60) {
        theTime1 = parseInt(theTime/60);
        theTime = parseInt(theTime%60);
// alert(theTime1+"-"+theTime);
        if(theTime1 > 60) {
            theTime2 = parseInt(theTime1/60);
            theTime1 = parseInt(theTime1%60);
        }
    }
    var result = ""+parseInt(theTime)+"秒";
    if(theTime1 > 0) {
        result = ""+parseInt(theTime1)+"分"+result;
    }
    if(theTime2 > 0) {
        result = ""+parseInt(theTime2)+"小时"+result;
    }
    return result;
}

var fz = `                      _oo0oo_\n`;
fz += `                     o8888888o\n`;
fz += `                     88" . "88\n`;
fz += `                     (| -_- |)\n`;
fz += `                     0\  =  /0\n`;
fz += `                   ___/'---'\___\n`;
fz += `                .' \\|     |// '.\n`;
fz += `                / \\|||  :  |||// \'\n`;
fz += `               / _||||| -:- |||||- \'\n`;
fz += `              |   | \\\  -  /// |   |'\n`;
fz += `              | \_|  ''\---/''  |_/ |'\n`;
fz += `              \  .-\__  '-'  ___/-. /\n`;
fz += `            ___'. .'  /--.--\  '. .'___\n`;
fz += `        ."" '<  '.___\_<|>_/___.' >' ""\n`;
fz += `        | | :  '- \'.;'\ _ /';.'/ - ' : | |\n`;
fz += `       \  \ '_.   \_ __\ /__ _/   .-' /  /' \n`;
fz += `    ====='-.____'.___ \_____/___.-'___.-'=====\n`;
fz += `                     '=---='\n`;
fz += `    \n`;
fz += `    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n`;
fz += `\n`;
fz += `             佛祖保佑         永无BUG\n`;

//console.log("%c" + fz, "color:red");
// console.log("%c", "padding:50px 300px;line-height:120px;background:url('http://www.daishumed.com/code.gif') no-repeat;");


var console_audio = new Audio;

function listenMusic(flag) {
    console_audio.pause();
    console_audio.src = "../../engineer_music/" + flag + ".mp3", console_audio.play()
}


var s = window.console || {
    log: function () {

    }, info: function () {

    }
};

//监听器
function listener(t, callBack) {
    Object.defineProperty(window, t, {get: callBack})
}

//控制器
function initConsole() {
    listener("planet", function () {
        listenMusic("planet");
        return "小伙子很有品位哦~";
    }), listener("一人我饮酒醉", function () {
        listenMusic("一人我饮酒醉女版");
        return "不好好敲代码，瞎研究什么呢！";
    }), listener("摇起来", function () {
        zd();
        return "服不服？？？";
    }), listener("服", function () {
        clearInterval(dou);

        $('body').css("top", 0)
        $('body').css("left", 0)
        return "以后老实点"
    });

    s.log("%c输入指定密码，然后有惊喜哦✉!", "color: #3498DB;font-weight: 600;")
    s.log("%cplanet %c一人我饮酒醉 %c摇起来", "background-color:#3498DB;color:#fff;padding: 5px 10px;margin-right: 10px;line-height:30px;border-radius: 4px;", "background-color:#95A5A6;color:#fff;padding: 5px 10px;margin-right: 10px;line-height:30px;border-radius: 4px;", "background-color:red;color:#fff;padding: 5px 10px;margin-right: 10px;line-height:30px;border-radius: 4px;")
    s.info("↓↓请输入密码↓↓");

}

//initConsole()

var dou;

function zd() {

    dou = setInterval(function () {

        var b = Math.random() * 1000;
        $('body').css("position", "relative")
        $('body').css("top", (b) / 9)
        $('body').css("left", (b) / 9)


    }, 100)
}



function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    /*console.log(ua);*///mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
if(isWeiXin()){
   
    var thisUrl = window.location.href;
    if(thisUrl != "https://www.daishumed.com/html/index.html" && thisUrl != "https://www.daishumed.com/html/user_info/bind_phone.html"){
        var this_token = getToken();
        if(this_token ==undefined || this_token == null || this_token ==""){
            var token   = thisUrl.match(/token=(\S*)&openid/);
            var opendid = thisUrl.match(/&openid=(\S*)/);
            if(opendid != null){
                opendid = opendid[1];
            }

            if(token != null){
                token = token[1];
            }


            if(token ==null || token == ""){

                if(opendid == null){
                    window.location.href="https://kangaroo.daishumed.com/index.php/Wxoauth/index?callback_url=https%3A%2F%2Fwww.daishumed.com%2Fhtml%2Findex.html";
                }else{
                    //跳转绑定手机页面
                    localStorage.setItem('bind_phone_type','2')
                    localStorage.setItem('bind_phone_open_id',opendid);
                    window.location.href = 'user_info/bind_phone.html';
                }
                
            }else{
                if(opendid =="" || opendid ==null){
                    //跳转首页
                    window.location.href = 'index.html';
                    
                }else{

                    setToken(token); 
                }
            }  
        }
        

    }else{

    }
}

