/*页面最底部js*/

// 注册底部导航
Vue.component('main_bottom_nav', {
    props: ['init_tabs'],//外部传入的参数
    template: `<div class="nav_bottom">
        <ul class="nav_bottom_ul">
            <li :class="{nav_bottom_ul_li:current_bottom_tab==index}" v-for="(data,index) in bottom_list" @click="click_bottom_tab(index)">
                <!--<i :class="data.img"></i>-->
      
                <img class="nav_bottom_img03" :src="current_bottom_tab==index?data.img_check:data.img" alt="">
                <p>
                    {{data.title}}
                </p>
            </li>
        </ul>
    </div>`,
    data: function () {
        return {
            bottom_list: [
                {
                    title: "首页",
                    img: "../../img/homepage/bottom1__62.png",
                    img_check: "../../img/homepage/bottom1_62.png",
                    link: "../index.html"
                },
                {
                    title: "直播",
                    img: "../../img/homepage/bottom2_64.png",
                    img_check: "../../img/homepage/bottom2__64.png",
                    link: "../my_course/livelist.html"
                },
                {
                    title: "已购",
                    img: "../../img/homepage/bottom3_59.png",
                    img_check: "../../img/homepage/bottom3__59.png",
                    link: "../my_course/my_already_buy.html"
                },
                {
                    title: "发现",
                    img: "../../img/homepage/bottom5_53.png",
                    img_check: "../../img/homepage/bottom5__53.png",
                    link: "../find/find.html"
                },
                {
                    title: "我的",
                    img: "../../img/homepage/bottom6_56.png",
                    img_check: "../../img/homepage/bottom6__56.png",
                    link: "../user_info/personal_center.html"
                }
            ],
            current_bottom_tab: 0,//当前选中的tab索引
        }
    }, methods: {
        click_bottom_tab(index){
            //点击切换index，实现跳转
            this.current_bottom_tab = index;
            window.location.href = this.bottom_list[index].link;
        }
    }, created: function () {
        //初始化，将每个页面传入的初始化tab赋值
        this.current_bottom_tab = this.init_tabs;
    }
})

Vue.component('main_bottom_navs', {
    props: ['init_tabs'],//外部传入的参数
    template: `<div class="nav_bottom">
        <ul class="nav_bottom_ul">
            <li :class="{nav_bottom_ul_li:current_bottom_tab==index}" v-for="(data,index) in bottom_list" @click="click_bottom_tab(index)">
                <!--<i :class="data.img"></i>-->
      
                <img class="nav_bottom_img03" :src="current_bottom_tab==index?data.img_check:data.img" alt="">
                <p>
                    {{data.title}}
                </p>
            </li>
        </ul>
    </div>`,
    data: function () {
        return {
            bottom_list: [
                {
                    title: "首页",
                    img: "../img/homepage/bottom1__62.png",
                    img_check: "../img/homepage/bottom1_62.png",
                    link: "./index.html"
                },
                {
                    title: "直播",
                    img: "../img/homepage/bottom2_64.png",
                    img_check: "../img/homepage/bottom2__64.png",
                    link: "./my_course/livelist.html"
                },
                {
                    title: "已购",
                    img: "../img/homepage/bottom3_59.png",
                    img_check: "../img/homepage/bottom3__59.png",
                    link: "./my_course/my_already_buy.html"
                },
                {
                    title: "发现",
                    img: "../img/homepage/bottom5_53.png",
                    img_check: "../img/homepage/bottom5__53.png",
                    link: "./find/find.html"
                },
                {
                    title: "我的",
                    img: "../img/homepage/bottom6_56.png",
                    img_check: "../img/homepage/bottom6__56.png",
                    link: "./user_info/personal_center.html"
                }
            ],
            current_bottom_tab: 0,//当前选中的tab索引
        }
    }, methods: {
        click_bottom_tab(index){
            //点击切换index，实现跳转
            this.current_bottom_tab = index;
            window.location.href = this.bottom_list[index].link;
        }
    }, created: function () {
        //初始化，将每个页面传入的初始化tab赋值
        this.current_bottom_tab = this.init_tabs;
    }
})
//注册顶部导航(已购模块）
Vue.component('mine_top_nav', {
    props: ['init_tabs'],//外部传入的参数
    template: `<div class="find_nav_lee">
        <div class="find_nav_left_lee" id="find_scroll_box" style="width: auto;overflow:scroll;height: 1.2rem">

            <div class="find_nav_list_lee">
                <ul>
                    <li :class="{find_nav_lee_cur1:index==current_top_nav_tab}"  v-for="(data,index) in top_list" @click="click_top_tab(index)">
                        <span>{{data.title}}</span></li>
                </ul>
            </div>
        </div>
    </div>`,
    data: function () {
        return {
            top_list: [
                {title: "我的已购课", link: "../my_course/my_already_buy.html"},
                {title: "我的直播课", link: "../my_course/mine_livelist.html"},
                {title: "我的免费课", link: "../my_course/my_free_course.html"},
                {title: "我的收藏课", link: "../my_course/my_collect_class.html"},
                {title: "我的错题", link: "../my_course/mymistakes.html"},
                {title: "我的收藏题", link: "../my_course/mine_collection_question.html"},
                {title: "我的班级", link: "../my_course/mine_class.html"}
            ],
            current_top_nav_tab: 0,//当前选中的tab索引
        }
    }, methods: {
        click_top_tab(index){
            //点击切换index，实现跳转
            this.current_top_nav_tab = index;
            window.location.href = this.top_list[index].link;
        }
    }, mounted: function () {

        //初始化，将每个页面传入的初始化tab赋值
        this.current_top_nav_tab = this.init_tabs;
        main_top_scroll_fun(this.top_list.length, this.current_top_nav_tab)

    }
})
//我的-已购-顶部导航滑动函数
function main_top_scroll_fun(length, index) {
    var scroll_left = (document.getElementById("find_scroll_box").scrollWidth / length) * index;
    document.getElementById("find_scroll_box").scrollLeft = scroll_left;
}




//注册顶部导航（学习模块）
Vue.component('learn_top_nav', {
    props: ['init_tabs'],//外部传入的参数
    template: `<div class="find_nav_learn">
        <div class="find_nav_left_learn">
            <div class="find_nav_list_learn">
                <ul>
                    <li v-for="(data,index) in title_list" :class="{find_nav_cur_learn:index==current_tab}" @click="click_top_tab(index)"><span>{{data.title}}</span></li>
                </ul>
            </div>
        </div>
    </div>`,
    data: function () {
        return {
            title_list: [
                {title: "课时", link: "../learn/course_study.html"},
                {title: "习题", link: "../learn/exercises.html"},
                {title: "讲义", link: "../learn/detailsofnotification.html"},
                {title: "班级", link: "../learn/rankinglist.html"},
                {title: "详情", link: "../learn/my_course_detail.html"},
                {title: "返回", link:"../my_course/my_already_buy.html"}
            ],
            current_tab: 0
        }
    }, methods: {
        click_top_tab(index){
            //点击切换index，实现跳转
            this.current_tab = index;
            window.location.href = this.title_list[index].link;
        }
    }, mounted: function () {

        //初始化，将每个页面传入的初始化tab赋值
        this.current_tab = this.init_tabs;

    }
})

//弹框判断是否去登陆
Vue.component('IsRegister', {
    template: `<div style="width: 100%;height: 8.5rem;position: relative;" v-if="!isRegisters">
        <div style="margin-top:1.74rem;margin-left:2.16rem;width: 4.96rem;height: 3.475rem;display: inline-block;">
            <img src="../../img/course/tip.png" style="width: 100%;height: 3.47rem;">
        </div>
        <p style="color: #a3c5e0;font-size: .4rem;width: 100%;text-align: center;margin-top: .3rem;">您尚未登陆，不能查看课程！</p>
        <div style="
        width: 3rem;height: 1rem;margin-left: 3.5rem;margin-top: .8rem;
        border: 1px solid #0299ec;border-radius: .1rem;color: #0299ec;font-size: 0.36rem;
        line-height: 1rem;text-align: center;
        " v-on:click="ensure">立即登录</div>
    </div>`,
    data: function () {
        return {
            isRegisters:check_user_state()//判断是否登录
        }
    }, methods: {
        //用户登录
        ensure(){//去登陆
            window.location.href="../login/land.html";
        },
        abolish(){//取消
            this.isRegisters = true;
        }
    }
})

Vue.component('toast', {
    template: `
      <div class="toast" v-show="show">
        {{message}}请先登录
      </div>`,
    data() {
      return {
        show: true,
        isToastHide: true,
        message: ''
      }
    },
    methods: {
      toastShow (message) {
        this.message = message
        this.show = true
        this.debounce(this.toastHide, this)
      },
      toastHide () {
        setTimeout(() => {
          this.show = false
        }, 2000)
      },
      debounce (fn, context) {
        clearTimeout(fn.id)
        fn.id = setTimeout(() => {
          fn.call(context)
        },500)
      }
    }
})
/*
 *跳转详情
 * flag  1执业医师  2执业药师 3国医经典 4卫生管理
 * course_type 课程类型
 * course_id   课程id
 * is_free     是否是免费课程(0收费 1免费 6已购买）
 * is_video 是否是试卷 false和undefined是 视频 ，true是试题
 */
function jump2detail(flag, course_type, course_id, is_free,is_question) {

    var tempInfo = {
        flag: flag,
        course_type: course_type,
        course_id: course_id,
        is_question:is_question==undefined?false:is_question
    };
    localStorage.setItem("jump_detail_info", JSON.stringify(tempInfo));

    if (is_free == 1) {
        // alert("跳转免费课程"+tempInfo.course_id)
        window.location.href = "../learn/course_study.html";
    } else if (is_free == 6) {
        // alert("立即学习"+tempInfo.course_id)

        if(is_question){
            //是试题
            window.location.href = "../learn/exercises.html";
        }else{
            window.location.href = "../learn/course_study.html";
        }


    } else if (is_free == 9) {
        //去排行
        window.location.href = "../learn/rankinglist.html";
    } else {
        //去课程详情
        window.location.href = "../course/detail.html";
    }

}

function jump2details(flag, course_type, course_id, is_free,is_question) {

    var tempInfo = {
        flag: flag,
        course_type: course_type,
        course_id: course_id,
        is_question:is_question==undefined?false:is_question
    };
    localStorage.setItem("jump_detail_info", JSON.stringify(tempInfo));

    if (is_free == 1) {
        // alert("跳转免费课程"+tempInfo.course_id)
        window.location.href = "./learn/course_study.html";
    } else if (is_free == 6) {
        // alert("立即学习"+tempInfo.course_id)

        if(is_question){
            //是试题
            window.location.href = "./learn/exercises.html";
        }else{
            window.location.href = "./learn/course_study.html";
        }


    } else if (is_free == 9) {
        //去排行
        window.location.href = "./learn/rankinglist.html";
    } else {
        //去课程详情
        window.location.href = "./course/detail.html";
    }

}
/*
 *跳转购物车
 */
function jump2shopCar() {
    //跳转购物车
    if (!check_user_state()) {
        alert('请先登录')
        return 
    }
    window.location.href = "../shopcar/Shopping_cart.html"
}

function jump2shopCars() {
    //跳转购物车
    if (!check_user_state()) {
        alert('请先登录')
        return 
    }
    window.location.href = "shopcar/Shopping_cart.html"   
}

function jump2order() {
    //跳转购物车
    window.location.href = "../shopcar/my_order.html"
}

/**
 * Created by ape1024 on 2018/1/20.
 */
//三级联动
$(function () {
    var linkage_vid = `<form class=""><div id="distpicker" data-autoselect="0"><select class="form-control form-one"></select><select class="form-control form-two"></select><select class="form-control form-three"></select></div></form>`;

    var arry = [];

//linkage(字符串，要插入的元素，保存按钮，地址的父级，保存的数组)
    linkage(linkage_vid, $('.linkage_vid'), $('.nav__top_span'), $('.information__li'), arry)
    function linkage(item, element, preservation, information, arr) {
        element.append(item);
        var $distpicker = $('#distpicker');
        if ($distpicker.length == 0) {
            return
        } else {
            $("#distpicker").distpicker();
        }

        preservation.on('click', function () {
            //获取到的地址
            arr = [];
            arr.push($('.form-one option:selected').val());
            arr.push($('.form-two option:selected').val());
            arr.push($('.form-three option:selected').val());
        })
        information.on('click', function () {
            $(this).find('.linkage_vid').slideDown()
        })
    }
})



























