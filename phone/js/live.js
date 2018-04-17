if (isWechat()) {

    document.write('<script language=javascript src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>');

    //分享http://kangaroo.daishumed.com/index.php/Wxjssdk/getSignPackage?url=http://www.daishumed.com/daishumed_offical/phone/html/my_course/livedetails.html'
    yaqooNetPost('https://kangaroo.daishumed.com/index.php/Wxjssdk/getSignPackage?url='+ encodeURIComponent(window.location.href), '', function (data) {
            if (data['code'] == 1000) {
                // alert(data['data'].appId)


                wx.config({
                    debug:false , // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data['data'].appId, // 必填，公众号的唯一标识
                    timestamp: data['data'].timestamp, // 必填，生成签名的时间戳
                    nonceStr: data['data'].nonceStr, // 必填，生成签名的随机串
                    signature: data['data'].signature,// 必填，签名
                    /*jsApiList: [
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage'
                    ] // 必填，需要使用的JS接口列表*/
                    jsApiList: ['onMenuShareTimeline', 'showMenuItems', 'onMenuShareAppMessage','Wxjssdk/getSignPackage'] //
                });
                /*alert(1)*/
                wx.ready(function () {
                /*    wx.hideOptionMenu();
                    wx.showMenuItems({
                        menuList: ["menuItem:share:timeline", "menuItem:share:appMessage"] // 要显示的菜单项，所有menu项见附录3
                    });*/
                    wx.onMenuShareTimeline({
                        title: app.live_detail.live_name, // 分享标题
                        // 'http://www.daishumed.com/daishumed_offical/phone/html/my_course/livedetails.html'
                        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'https://www.daishumed.com/html/rename.jpg', // 分享图标
                        success: function () {
                            app.share_state = true
                            // 用户确认分享后执行的回调函数
                        },

                        cancel: function () {
                            app.share_state = false
                            // 用户取消分享后执行的回调函数
                        }

                    });
                    wx.onMenuShareAppMessage({
                        title: app.live_detail.live_name, // 分享标题
                        desc: '直播分享', // 分享描述
                        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'https://www.daishumed.com/html/rename.jpg', // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空

                        success: function () {
                            app.share_state = true
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            app.share_state = false
                            // 用户取消分享后执行的回调函数
                        }
                    });

                })
            }
        })
    }