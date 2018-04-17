//canvas图形验证码
//随机数
// function rand(){
//     var str="abcdefghijklmnopqrstuvwxyz0123456789";
//     var arr=str.split("");
//     var validate="";
//     var ranNum;
//     for(var i=0;i<4;i++){
//         ranNum=Math.floor(Math.random()*36);   //随机数在[0,35]之间
//         validate+=arr[ranNum];
//     }
//     return validate;
// }


var receive_code = '';//从服务器获取的验证码


//获取从服务器返回的图形验证码值
function get_g_v_code() {
   return receive_code;
}



//从服务器获取随机数
function get_random_g_v() {
    console.log('请求数据')
    yaqooNetPost('User/create_code','',function (data) {

        if(data['code']=='1000'){
            //绘制
            receive_code = data['create_code'];
            draw_code()
        }else {
            //获取验证码失败
        }
    })
}

get_random_g_v();



/*干扰线的随机x坐标值*/
function lineX(){
    var ranLineX=Math.floor(Math.random()*90);
    return ranLineX;
}

/*干扰线的随机y坐标值*/
function lineY(){
    var ranLineY=Math.floor(Math.random()*40);
    return ranLineY;
}

var mycanvas = document.getElementById('mycanvas');

//绘制验证码
function draw_code(){
    mycanvas=document.getElementById('mycanvas');
    var cxt=mycanvas.getContext('2d');
    cxt.fillStyle='#c8dcee';
    cxt.fillRect(0,0,90,40);


    cxt.fillStyle='#6d9bc4';
    cxt.font='bold 20px Arial';
    cxt.fillText(receive_code,25,25);   //把rand()生成的随机数文本填充到canvas中
    /*生成干扰线20条*/
    for(var j=0;j<10;j++){
        cxt.strokeStyle='#fff';
        cxt.beginPath();    //若省略beginPath，则每点击一次验证码会累积干扰线的条数
        cxt.moveTo(lineX(),lineY());
        cxt.lineTo(lineX(),lineY());
        cxt.lineWidth=0.5;
        cxt.closePath();
        cxt.stroke();
    }
}





