function checkTel(tel) {
    //验证电话号码
    var reg = /^1[34578]\d{9}$/;
    return reg.test(tel);
}
function Verification(tell) {
    //验证码
    var reg = /^[0-9]{6}$/;
    return reg.test(tell);
}

function check_active(tell) {
    //16位激活码
    var reg = /^[A-Z0-9]{16,17}$/;
    return reg.test(tell);
}

function Validator_PassWord(tell) {
    //验证密码
    var reg = /^[a-zA-Z0-9]{6,16}$/;

    return reg.test(tell);
}

function Valid_NickName(nickName) {
    //验证昵称
    var reg = /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+){1,20}$/;

    return reg.test(nickName);

}

function Validator_Email(tell) {
    //验证邮箱
    var reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
    return reg.test(tell);
}

function check_cerID(cerID) {
    //验证身份证
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(cerID);
}

function check_realName(cerID) {
    //验证姓名
    var reg = /^[\u4E00-\u9FA5A-Za-z]+$/;
    return reg.test(cerID);
}


