/**
 * Created by saber on 2018/1/30.
 */


function public_confirm(order_id,callBacks){
    //确认收货
    yaqooNetPost("Order/confirm", {order_id: order_id}, function (data) {
        console.log("Order/confirm"+data)
        if (data['code'] == 1000) {
            callBacks(data['data']);
        }
    })
}
function public_returned (data){
    if (!isNull(data.order_id)) {


        if(data.is_refund==0)
        {
            alert("当前订单不能退款")
            return;
        }

        localStorage.setItem("order_id", data.order_id);
        window.location.href = "../../html/shopcar/refund.html";
    }
}

//去支付
function public_gopay(order_id,datas){
    if (!isNull(order_id)) {
        var num = 0;
        for(let n=1;n<4;n++){
            yaqooNetPost("Order/index", {
                p: 1,
                order_status: n
            }, function (data) {
                if (data['code'] == 1000) {
                    if(data['data'].length != 0){
                       for(i in data['data']){
                            for(x in data['data'][i].course){
                                for(j in datas.course){
                                    if(datas.course[j].course_id == data['data'][i].course[x].course_id ){
                                        alert("不能重复购买");
                                        break;
                                        return;
                                    }else{
                                        localStorage.setItem("order_id", order_id);
                                        window.location.href = "../../html/shopcar/pay_order.html";
                                    }
                                }
                            }
                        }
                    }else{
                        num++;
                        if(n==3 && num == 3){
                            localStorage.setItem("order_id", order_id);
                            window.location.href = "../../html/shopcar/pay_order.html";
                        }

                    }
                }
            })
        }
    }
}

//删除
function public_deletes(order_id,callBacks){
    yaqooNetPost("Order/del", {order_id: order_id}, function (data) {
        if (data['code'] == 1000) {
            alert(data["message"])
            callBacks(data['data']);

        }
    })
}

//取消
function cancle_public(order_id,callBacks)
{
    yaqooNetPost("Order/cancel", {order_id: order_id}, function (data) {
        if (data['code'] == 1000) {
            alert(data["message"])
            callBacks(data['data']);
        }
    })
}

function getOrder_state_public(flag)
{//获取订单状态
    switch (flag) {
        case "0":
            return "待付款";
        case "1":
            return "付款成功";
        case "2":
            return "待收货";
        case "3":
            return "已完成";
        case "4":
            return "已取消";
    }
}