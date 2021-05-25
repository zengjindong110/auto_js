// auto;


var device_width = device.width;
var device_height = device.height;


function swipe_down() {
    swipe(device_width / 2, device_height / 2, device_width / 2, device_height, 500); sleep(500);  //从上往下划，找到起始位置
    swipe(device_width / 2, device_height / 2, device_width / 2, device_height, 500);
    log("从上往下划，找到起始位置")
    sleep(1000);
}

function swipe_up() {
    swipe(device_width / 2, device_height / 10 * 9, device_width / 2, device_height * 3 / 5, 500) // 由下往上滑动
    log("由下往上滑动,进行翻页")
    sleep(1000);
}


function text_click(x) { if (x) return x.click() }

function open_free_shuiguo() {
    launchPackage("com.jingdong.app.mall"); sleep(5000);
    try {
        object = text("免费水果").findOne(5000).parent();
        if (text_click(object)) {
            log("进入京东果园")
            qian_dao_text = text("去签到").findOne(5000)
            if (qian_dao_text) {
                text_click(qian_dao_text)
                qu_ling_qu_text = text("去领取").findOne(5000)
                text_click(qu_ling_qu_text); sleep(2000);
                click_text("签到领"); sleep(2000);
                click_text("明日再来"); sleep(2000);
                back()
            } else {
                click_text("去领取"); sleep(2000);
                click_text("收下水滴"); sleep(2000);

            }


            shou_xia_shui_di = text("收下水滴").findOne(5000)
            text_click(shou_xia_shui_di)

        }
    }
    catch (e) {
        log("已经进入到东东农场")
    }
}

function go_task_list() {
    if (text("东东农场").findOne(3000)) {

        click_text("f948ff17c79c25fa"); sleep(3000); log("进入领水滴任务列表")

    }
}

function click_text(text_str) {
    str_object = String(text(text_str).findOne(5000));

    if (str_object != "null") {
        // 正则查看文字的坐标
        start_index = str_object.search("boundsInScreen: Rect");

        if (start_index) {

            coordinate_str = str_object.substring(start_index + 21, start_index + 20 + 25)


            coordinate_str = coordinate_str.substring(0, coordinate_str.lastIndexOf(")"))


            coordinate_list = coordinate_str.replace("-", ",").split(",")

            Click_coordinate = [Number(coordinate_list[0]) + (Number(coordinate_list[2]) - Number(coordinate_list[0])) / 2, Number(coordinate_list[1]) + (Number(coordinate_list[3]) - Number(coordinate_list[1])) / 2]

            click(Click_coordinate[0], Click_coordinate[1])
            log("点击" + "***" + text_str + "***")
            return true
        } else {
            log("没找到" + "***" + text_str + "***坐标"); return false;
        }


    } else {
        log("当前页面没有发现这个:" + text_str)
        return false;
    }

}

function do_task() {
    // 默认的位置为任务列表页面
    swipe_down();
    for (i = 0; i < 7; i++) {
        sleep(1000);
        log("执行任务次数" + i)

        if (text("领水滴").findOne(3000)) {

            click_text("去逛逛"); sleep(3000);
            is_true = !text("领水滴").findOne(3000)

            if (is_true) {
                log("等待4秒"); sleep(4000);
                log("准备返回到任务列表")
                sleep(2000);
                back(); if (click_text("去领取")) { sleep(3000) };
            }
        }
    }
}

function Watering() {
    log("开始执行浇水任务")
    if (text("7327bce4ab558979").findOne(3000)) {
        for (i = 0; i < 10; i++) { click_text("86b551d1155595c3"); sleep(4000) }

    }
    go_task_list(); sleep(3000);
    swipe_down(); sleep(1000);
    click_text("去领取")

}


function clik_yazi() {
    for (i = 0; i < 5; i++){
    for (i = 0; i < 5; i++) { click_text("7327bce4ab558979") }
    sleep(6000)
    objecyt_1 = text("喊它回来").findOne(2000)
    objecyt_2 = text("收下水滴").findOne(2000)
    objecyt_3 = text("收下道具卡").findOne(2000)
    
    if (objecyt_1||objecyt_2||objecyt_3) {

        click_text("喊它回来");
        click_text("收下水滴");
        click_text("收下道具卡");
    }

}


}

function main() {
    open_free_shuiguo(); sleep(3000);

    go_task_list(); sleep(3000);

    do_task(); sleep(3000);
    click_text("去领取"); sleep(3000);
    Watering(); sleep(3000);
    clik_yazi(); sleep(3000); 



}
// click_text("86b551d1155595c3")
// main()
// click_text("喊它回来")
// while (!text("领水滴").findOne(3000)) {
//     log("准备返回到任务列表")
//     sleep(2000);
//     back(); if (click_text("去领取")){sleep(3000)};
// }
a = text("7327bce4ab558979").findOne(3000)
// log(a)
log(typeof(a))
log(JSON.stringify(a))
log(222,JSON.parse(JSON.stringify(a)))
log(1111,a.boundsInScreen)

