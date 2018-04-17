var vm = new Vue({
    el: '#app_body',
    data: {
        is_ok: 'true',
        flag: true,
        login_type:'1',
        type1_tel:'',//快捷登录 电话
        type1_code:'',//快捷登录 短信验证码
        type2_tel:'',//普通登录 电话
        type2_pwd:'',//普通登录 密码
        receive_code:'',//手机收到的验证码
        is_showGetCode:0,//是否显示获取验证码
        graphic_code:'',//输入的图形验证码
        sms_id:'',//验证码分配id 验证需要
        time_val:'',//语音验证倒计时
        click_voice:1,//是否可以点击语音验证 1表示可以点击
        ip:'',
        place:'',//地址
        equipment_type:'1',//登录类型1是移动端 2是pc
        assword:"",//快捷登录 判断有无密码
        setPassword:""
    },
    methods: {
        switchs1(){
            vm.flag = true;
            vm.login_type='1'

        },
        switchs2(){
            vm.flag = false;
            vm.login_type='2'
        },
        agree(){
            //当前元素 显示隐藏
            $(event.currentTarget).find('img').toggle(200);
        },
        time(){
            if(!checkTel(this.type1_tel)){
                alert('请输入正确格式的手机号');
                return;
            }

            if (this.is_ok == 'true') {
                send_code();
            } else {
                console.log(this.is_ok);
                //return;
            }
        },
        //点击登录
        total_login(){
            // window.location.href = '../test.html';
            // return;
            send_login();
        },
        to_reset_pwd(){
            //跳转重设密码
            window.location.href="../user_info/reset_password.html";
        },
        //返回上一页
        to_back(){
            union_back();
        },
        //监听图形验证码输入变化
        g_code_change(){
            if(vm.graphic_code.length == 4){
                if(get_g_v_code() == vm.graphic_code){
                    vm.is_showGetCode = 1;
                    if(!checkTel(this.type1_tel)){
                        alert('请输入正确格式的手机号');
                        return;
                    }
                    if (this.is_ok == 'true') {

                        send_code();

                    } else {
                        console.log(this.is_ok);
                        //return;
                    }
                }else {
                    vm.is_showGetCode = 0;
                    get_random_g_v();
                }
            }
        },
        //点击图形验证码
        change_g_code(){
            get_random_g_v();
        },
        //点击去注册
        to_resign(){
            window.location.href = 'login_account.html'
        },
        //点击返回
        to_back(){
            union_back();
        },
        //发送语音验证码
        a_send_voice(){
            send_voice();
        },
        //是否修改密码
        ensure(){//修改
            window.location.href="../user_info/set_password.html";
        },
        abolish(){//取消
            this.setPassword = false;
            window.location.href = '../index.html';
        },
    }

})





//点击发送语音验证码
function send_voice() {
    //点击发送
    if(vm.click_voice){
        //发送语音验证码网络请求
        if(!checkTel(vm.type1_tel)){
            alert('请输入正确的手机号');
            return;
        }
        yaqooNetPost('User/voice_code',{usename:vm.type1_tel},function (data) {
            if(data['code'] == '1000'){
                alert('发送成功');
                vm.receive_code = data["phone_code"];
                vm.sms_id = data['sms_id'];
            }else {
                alert(data['message']);
            }
        });
        //倒计时
        vm.time_val = 60;
        vm.click_voice = 0;
        var voice_timer =  setInterval(function () {
            vm.time_val --;
            if(vm.time_val <= 0){
                clearInterval(voice_timer);
                vm.click_voice = 1;
            }
        },1000)
    }
}

//发送短信验证码
function send_code() {
    yaqooNetPost('User/send_code',{username:vm.type1_tel},function (data) {
        if(data['code']==1000){
            alert('发送成功')
            vm.receive_code = data["phone_code"];
            vm.sms_id = data['sms_id'];

            var news_time = 60;
            var this_data = $(event.currentTarget);
            var this_this = this;
            this.is_ok = 'false';
            var clock = setInterval(function () {
                //倒计时 并存储
                --news_time;
                if (news_time <= 0) {
                    $(".login_account_span").html('获取验证码');
                    this_this.is_ok = 'true';
                    clearInterval(clock);
                } else {
                    $(".login_account_span").html(news_time + '秒后发送');

                }
            }, 1000)

        }else {
            alert('发送失败,请使用语音验证码');

        }
    })
}


//点击登录按钮
function send_login() {
    // alert(returnCitySN["cip"]+','+returnCitySN["cname"]);
    if(vm.login_type == '1'){
        //快捷登录
        if(!checkTel(vm.type1_tel)){
            alert('请输入正确格式的手机号')
            return;
        }
        if(!Verification(vm.type1_code) || !(vm.receive_code==vm.type1_code)){

            alert('验证码错误')
            return;
        }
        var para = {
            username:vm.type1_tel,
            login_type:vm.login_type,
            sms_status:'1',
            sms_code:vm.type1_code,//用户输入的验证码
            sms_id:vm.sms_id,
            ip:returnCitySN["cip"],
            place:returnCitySN["cname"],
            equipment_type:vm.equipment_type
        }
        yaqooNetPost('User/user_login',para,function (data) {
            if(data['code']=='1000'){
                setToken(data['token'])
                setTel(vm.type1_tel);
                //判断有无密码
                if(data.pass_status == 1){
                    vm.setPassword = true;
                }else{
                    window.location.href = '../index.html';
                }
            }else if(data['code']=='1003'){
                var paras =  {
                    username: vm.type1_tel,
                    sms_status:'2',
                    ip:returnCitySN["cip"],
                    equipment_type:vm.equipment_type
                }
                 yaqooNetPost('User/user_register', paras, function (data) {
                    if (data['code'] == 1000) {
                        setToken(data['token']);
                        setTel(vm.type1_tel);
                        alert('登录成功')
                        window.location.href = '../index.html';
                    } else {
                        console.log(data['message']);
                    }
                })
            }else if(data['code']=='1004'){
                alert('密码错误')
            }else{
                alert('登录失败')
            }
        })
    }else {
        //账号密码登录
        if(!checkTel(vm.type2_tel)){
            alert('请输入正确格式的手机号')
            return;
        }
        if(!Validator_PassWord(vm.type2_pwd)){
            alert('请输入正确格式的密码')
            return;
        }
        var para= {
            username:vm.type2_tel,
            password:vm.type2_pwd,
            login_type:vm.login_type,
            sms_status:'2',
            ip:returnCitySN["cip"],
            place:returnCitySN["cname"],
            equipment_type:vm.equipment_type
        }
        yaqooNetPost('User/user_login',para,function (data) {
            if(data['code']=='1000'){
                 console.log(data['token']);
                //  alert(data['token']);
                // return;
                setToken(data['token']);
                setTel(vm.type2_tel);
                alert('登录成功')
                window.location.href = '../index.html';
            }else if(data['code']=='1003'){
                alert('用户不存在')
            }else if(data['code']=='1004'){
                alert('密码错误')
            }else{
                alert('登录失败')
            }
        })
    }

    //发送登录请求

}



