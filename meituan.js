


auto();

var device_width = device.width;
var device_height = device.height;

if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
}

var images_path = "/storage/emulated/0/DCIM/Screenshots/meituan/"

// threads.start(function () {
//     //在新线程执行的代码
//     //请求截图
//     if (!requestScreenCapture()) {
//         log("请求截图失败");
//         exit();
//     } else {
//         log("success");
//     }
// });
// 判断图片是否存在，存在就点击
function is_click(png_name) {
    // captureScreen(),这个不稳定所以要使用while
    var big_image = captureScreen();

    var image_path = images_path + png_name;

    var smail_image = images.read(image_path);
    sleep(2000)
    var p = findImage(big_image, smail_image, {
        region: [device_width / 50, device_height / 9],
        threshold: 0.8
    });


    // 判断图片是否存在，存在就点击

    if (p) {
        p_x = smail_image.getWidth();
        p_y = smail_image.getHeight()

        click(p.x + p_x / 2, p.y + p_y / 2)
        log("点击图片" + png_name)
        return true

        // click(p.x+p_x/2,p.y+p_y/2)
    } else {
        smail_image.recycle();
        log("没有找到该图片不能点击" + png_name);
    }
    smail_image.recycle(); sleep(1000)
}

// 查看图片时候存在，存在返回坐标，不存在就返回null
function get_image_coordinates(png_name) {
    // var big_image = captureScreen();
    var big_image = captureScreen();
    var image_path = images_path + png_name;
    var smail_image = images.read(image_path);
    var p = findImage(big_image, smail_image, 0.8);
    log("查找图片坐标方法找到" + png_name + "的图片位置为：" + p)
    smail_image.recycle();
    return p

}

function is_image(png_name, y1, y2) {

    // Y1 Y2 指的是纵坐标的两个高度
    var big_image = captureScreen();
    var image_path = images_path + png_name;

    var smail_image = images.read(image_path);
    var p = findImage(big_image, smail_image, {
        region: [0, y1, device_width - 10, y2],
        threshold: 0.8
    });
    log("指定范围查看" + png_name + "图片的坐标" + p)
    smail_image.recycle();
    return p

}



// 进入到任务列表页面
function return_go_to_water_list() {
    // 判断首页是否有弹框，没有弹框直接进入任务列表
    log("**开始执行进入任务列表页面**")
    if (get_image_coordinates("mei_ri_lai_ling.jpg")) { log("return_go_to_water_list当前页面**每日任务列表**"); return true }
    else {
           
        if (className("android.widget.Image").text("").findOne(2000)) {
            // 在首页没有任何弹框进入任务列表
            if (get_image_coordinates("song_shu.jpg")) {
                log("第一种场景点击get_water_list.jpg到任务列表页面")
                is_click("get_water_list.jpg")
                
                return true
            } else {
                // 在首页有弹框就关闭弹框再进入任务列表

                log("第二种场景点击get_water_list.jpg到任务列表页面")
                is_click("xiao_bai_xx.jpg"); sleep(2000)
                is_click("bai_xx.jpg"); sleep(2000)
                is_click("hong_xx.jpg"); sleep(2000)


                is_click("get_water_list.jpg")
               
                return true

            }
        }else{
            if(text("免费领水果").findOne(1000)){

                // 在打开app页面进入任务列表
                text("免费领水果").findOne(1000).click();sleep(3000);
                if (get_image_coordinates("song_shu.jpg")) {
                    
                    log("第三种场景点击get_water_list.jpg到任务列表页面")
                    is_click("get_water_list.jpg")
                    
                    return true
                } else {
                    // 在打开app页面进入任务列表前有弹框
    
                    log("第四种场景点击get_water_list.jpg到任务列表页面")
                    is_click("xiao_bai_xx.jpg"); sleep(2000)
                    is_click("bai_xx.jpg"); sleep(2000)
                    is_click("hong_xx.jpg"); sleep(2000)
    
    
                    is_click("get_water_list.jpg")
                   
                    return true
    
                }

            }else{
                // 在未知页面返回到进入app的页面再进入到任务列表
                
                back();back();sleep(1000);
                
                    if (get_image_coordinates("song_shu.jpg")) {
                        log("第五种场景点击get_water_list.jpg到任务列表页面")
                        is_click("get_water_list.jpg")
                        return true
                    } else {
                        // 有弹框就关闭弹框
        
                        log("第六种场景点击get_water_list.jpg到任务列表页面")
                        is_click("xiao_bai_xx.jpg"); sleep(2000)
                        is_click("bai_xx.jpg"); sleep(2000)
                        is_click("hong_xx.jpg"); sleep(2000)
                        is_click("get_water_list.jpg")
                     
                        return true
        
                    }
    
                
            }
        }
    }

}

function swipe_down() {
    swipe(device_width / 2, device_height / 10 * 3, device_width / 2, device_height, 500)  //从上往下划，找到起始位置
    log("从上往下划，找到起始位置")
    sleep(1000);
}

function swipe_up() {
    swipe(device_width / 2, device_height / 10 * 9, device_width / 2, device_height / 6, 500) // 由下往上滑动
    log("由下往上滑动,进行翻页")
    sleep(1000);
}

// 启动app进入免费领水果页面
function go_free_fruit() {
    log("准备打开美团")
    launch('com.sankuai.meituan')

    go_free_fruit_button = desc("免费领水果").findOne(5000);

    if (go_free_fruit_button) {
        go_free_fruit_button.click()
        log("进入天天领水果页面")
        className("android.widget.Image").findOne()
    }
    else {

        is_click("hong_xx.jpg"); sleep(2000)
        go_free_fruit_button = desc("免费领水果").findOne(5000);
        if (go_free_fruit_button) {
            go_free_fruit_button.click()
            className("android.widget.Image").findOne()
            log("进入免费领水果主页面")
        }
    }
    if (desc("免费领水果").findOne(10000)) {
        exit()
    }
}

// 点击去领取，获取水滴
function go_get_water() {
    log("**开始领取水滴了**")
    sleep(1500);
    if (get_image_coordinates("mei_ri_lai_ling.jpg")) {
        swipe_down() //从上往下划，找到起始位置
        sleep(1500);
        while (is_click("qu_ling_qu.jpg")) {
            sleep(2000);
            is_click("que_ding_button.jpg");
            sleep(2000);
        }
        swipe_up() // 由下往上滑动
        while (is_click("qu_ling_qu.jpg")) {
            sleep(2000);
            is_click("que_ding_button.jpg");
            sleep(2000);
        }
        swipe_down() //从上往下划，找到起始位置
        log("完成**开始领取水滴了**")
        return true
    } else {
        log("没有进去任务列表页面")
        return false
    }


}
// 浏览15秒 可得10g水滴
function liu_lan_15s(num) {
    log("开始执行**浏览15秒 可得10g水滴**")
    sleep(2000);
    if (go_get_water()) {
        for (i = 0; i < num; i++) {
            sleep(2000);
            var x_y = get_image_coordinates("liu_lan_15s.jpg")
            if (x_y) { if (!is_image("jin_ri_yi_wan_cheng.jpg", x_y.y - 150, 200)) { click(device_width / 6 * 5, x_y.y); sleep(1500); } else { log("**浏览15秒 可得10g水滴**该任务已经完成"); break } }
            else {
                swipe_up()
                var x_y = get_image_coordinates("liu_lan_15s.jpg")
                if (x_y) { if (!is_image("jin_ri_yi_wan_cheng.jpg", x_y.y - 150, 200)) { click(device_width / 6 * 5, x_y.y); sleep(1500); } else { log("**浏览15秒 可得10g水滴**该任务已经完成"); break } }
                else { log("**浏览15秒 可得10g水滴**该任务已经完成"); break }
            }
            sleep(5000)
            if (text("小美果园").findOne(2000)) {

                log("进入小美果园")
                sleep(12000);
                back(); sleep(2000);
                return_go_to_water_list(); sleep(2000);
                go_get_water(); sleep(2000)
            } else {
                if (!get_image_coordinates("mei_ri_lai_ling.jpg")) {
                    is_click("xiao_bai_xx.jpg");
                    back()
                }
            }
        }
    }
    else {
        log("没有进入任务列表,不能执行**浏览15秒 可得10g水滴**任务")
    }
}
// 浏览5秒即可领取（1/7）
// 点击任意商品随机放送1-50g
function liu_lan_5s() {
    log("开始执行任务**浏览5秒即可领取**")
    sleep(2000);
    // go_get_water()
    image_list = ["liu_lan_5s.jpg", "liu_lan_5s_sui_ji_fang_song.jpg", "liu_lan_5s_sui_ji_song.jpg", "1-50gshui_di_sui_ji_fa_fang.jpg"]

    for (i = 0; i < image_list.length; i++) {
        log("查找图片" + image_list[i]); sleep(2000);

        try {
            var x_y = get_image_coordinates(image_list[i]);
            if (x_y) { if (!is_image("jin_ri_yi_wan_cheng.jpg", x_y.y - 150, 200)) { click(device_width / 6 * 5, x_y.y); sleep(1500); break } }
            else {

                swipe_up(); var x_y = get_image_coordinates(image_list[i]);
                if (x_y) { if (!is_image("jin_ri_yi_wan_cheng.jpg", x_y.y - 150, 200)) { click(device_width / 6 * 5, x_y.y); sleep(1500); break } }
                else { swipe_down(); }
            }
        }
        catch (e) {
            log("没找到" + image_list[i])
        }
    }
    sleep(3000);
    // 判断是否进去到了活动页面
    if (!get_image_coordinates("mei_ri_lai_ling.jpg") && !get_image_coordinates("song_shu.jpg")) {
        log("进入**任意商品随机放送1-50g**活动页面")
        for (i = 0; i < 7; i++) {

            sleep(2000); is_click("xiao_bai_xx.jpg"); sleep(2000); back()


            sleep(2000);
            if (get_image_coordinates("liu_lan_qi_ta.jpg")) {
                is_click("liu_lan_qi_ta.jpg"); sleep(1500); is_click("que_ding_button.jpg");
            }
            else {
                break
            }
        }

    }
    else {
        return_go_to_water_list()
        log("没有进入**意商品随机放送1-50g**活动页面"); return false
    }
    return_go_to_water_list()
}

// 参与游戏送水滴，还有机会得话费
// 参与6此游戏奖励40g
function can_yu_6_ci() {

    go_get_water();
    log("开始执行**福气临门任务**")
    sleep(2000)
    if (get_image_coordinates("mei_ri_lai_ling.jpg")) {
        try {
            var x_y = get_image_coordinates("can_yu_6_ci.jpg")
            if (x_y) { if (!is_image("jin_ri_yi_wan_cheng.jpg", x_y.y - 150, 200)) { click(device_width / 6 * 5, x_y.y); sleep(1500); } }
            else {
                swipe_up();
                var x_y = get_image_coordinates("can_yu_6_ci.jpg")
                if (x_y) { if (!is_image("jin_ri_yi_wan_cheng.jpg", x_y.y - 150, 200)) { click(device_width / 6 * 5, x_y.y); sleep(1500); } }
            }
        }
        catch (e) {
            log("没找到浏览can_yu_6_ci.jpg图片")
        }
    } else {
        log("**福气临门任务**已经完成")
    }
    if (text("福气临门").findOne(3000)) {

        log("进入福气临门任务")
        sleep(3000)
        for (i = 0; i < 10; i++) {
            sleep(2000)
            is_click("kai_button.jpg")
            sleep(3000)
            is_click("xxxxxxx.jpg")
        }
        if (text("福气临门").findOne(3000)) {
            back(); sleep(2000);
            is_click("can_ren_li_kai.jpg")
        }

        sleep(2000);
        return_go_to_water_list()
    }

}
//活动去领取外卖券
function qu_ling_wai_mai_quan(num) {
    log("开始执行任务**去领取外卖券**")

    if (get_image_coordinates("mei_ri_lai_ling.jpg")) {
        for (i = 0; i < num; i++) {
            go_get_water();
            sleep(2000);
            try {
                var x_y = get_image_coordinates("qu_ling_wai_mai_quan.jpg")
                if (x_y) { if (!is_image("jin_ri_yi_wan_cheng.jpg", x_y.y - 50, 200)) { click(device_width / 6 * 5, x_y.y + 70); sleep(1500); } }
                else {
                    swipe_up();//往上滑继续寻找
                    var x_y = get_image_coordinates("qu_ling_wai_mai_quan.jpg")
                    if (x_y) { if (!is_image("jin_ri_yi_wan_cheng.jpg", x_y.y - 50, 200)) { click(device_width / 6 * 5, x_y.y + 70); sleep(1500); } else { log("**去领取外卖券**任务已完成"); break } }
                    else { log("**去领取外卖券**任务已完成"); break }
                }
            }
            catch (e) { log("**去领取外卖券**没找到qu_ling_wai_mai_quan.jpg图片") }

            if (!get_image_coordinates("mei_ri_lai_ling.jpg")) {
                //进入任务页面后的操作
                log("进入到qu_ling_wai_mai_quan.jpg页面");
                sleep(2000);
                is_click("xiao_bai_xx.jpg");
                sleep(4000);
                if (text("我的").findOne(2000)) { back(); sleep(2000); }
                return_go_to_water_list();
            } else {
                log("没有进入活动**去领取外卖券活动**页面")
            }
        }
    }
}

// 完成一次打地鼠活动，完成任务获得30g
function da_di_shu() {
    log("开始执行任务**打地鼠任务**")
    sleep(2000)
    if (get_image_coordinates("mei_ri_lai_ling.jpg")) {
        try {
            var x_y = get_image_coordinates("da_di_shu.jpg")
            if (x_y) { if (!is_image("jin_ri_yi_wan_cheng.jpg", x_y.y - 150, 200)) { click(device_width / 6 * 5, x_y.y); sleep(1500); } }
            else {
                swipe_up();
                var x_y = get_image_coordinates("da_di_shu.jpg")
                if (x_y) { if (!is_image("jin_ri_yi_wan_cheng.jpg", x_y.y - 150, 200)) { click(device_width / 6 * 5, x_y.y); sleep(1500); } }
            }
        }
        catch (e) {
            log("打地鼠任务没有找到进入活动的图片 da_di_shu.jpg")
        }
    } else { log("打地鼠任务没有找到进入活动的图片 da_di_shu.jpg") }
    if (!get_image_coordinates("mei_ri_lai_ling.jpg")) {
        log("进入到了打地鼠活动页面")
        sleep(2000);
        is_click("da.jpg"); sleep(35000);
        is_click("bai_xx.jpg"); sleep(2000);

        back(); sleep(2000);
        return_go_to_water_list(); sleep(2000); go_get_water()

    }

}
//果园娱乐活动
function guo_yuan_yu_le() {

    log("开始执行任务**果园娱乐**")
    sleep(2000)
    if (get_image_coordinates("mei_ri_lai_ling.jpg")) {
        sleep(2000); is_click("guo_yuan_yu_le_xx.jpg");
        return true
    }
    sleep(2000);
    if (get_image_coordinates("song_shu.jpg")) {
        sleep(2000); is_click("guo_yuan_yu_le.jpg");

    }
    sleep(2000)
    if (!get_image_coordinates("song_shu.jpg")) {
        log("进入到了**去抽奖**活动页面")
        sleep(2000); is_click("qu_chou_jiang.jpg");
        sleep(2000);
        if (get_image_coordinates("chou_jiang.jpg")) {
            for (i = 0; i < 10; i++) {
                is_click("chou_jiang.jpg"); sleep(2000);
                is_click("que_ding_button.jpg"); sleep(2000)
            }
            is_click("hong_xx.jpg")
        }
        else {
            log('抽奖的任务已经完成了')
        }
        // back();sleep(2000);
        // return_go_to_water_list();sleep(2000);go_get_water()

    }
}
//每日浇水10次活动
function jiao_shui() {
    log("开始执行任务**浇水10次活动**")

    sleep(2000)
    if (get_image_coordinates("mei_ri_lai_ling.jpg")) {
        sleep(2000); is_click("guo_yuan_yu_le_xx.jpg");
    }
    sleep(2000);
    if (get_image_coordinates("shui_hu.jpg")) {
        for (i = 0; i < 5; i++) {
            sleep(2000);
            is_click("shui_hu.jpg"); sleep(2000);
            log("点击浇水")
            is_click("li_ji.jpg"); sleep(2000);
            is_click("xuan_zhe.jpg"); sleep(2000);
            is_click("guo_yuan_yu_le_xx.jpg"); sleep(2000);
            is_click("xiao_bai_xx.jpg"); sleep(2000);


        }
        return_go_to_water_list(); sleep(2000); go_get_water()
    } else {
        if (get_image_coordinates("shui_hu_2.jpg")) {
            for (i = 0; i < 11; i++) {
                sleep(2000);
                is_click("shui_hu.jpg"); sleep(2000);
                log("点击浇水")
                is_click("li_ji.jpg"); sleep(2000);
                is_click("xuan_zhe.jpg"); sleep(2000);
                is_click("guo_yuan_yu_le_xx.jpg"); sleep(2000);
                is_click("xiao_bai_xx.jpg"); sleep(2000);
            }
        }

    }
}

function demo() {
    log("****开始执行任务啦****")
    go_free_fruit(); sleep(1500);
    return_go_to_water_list(); sleep(1500)
    liu_lan_15s(3); sleep(1500);
    return_go_to_water_list(); sleep(1500)
    liu_lan_5s(); sleep(1500);
    return_go_to_water_list(); sleep(1500)
    can_yu_6_ci(); sleep(1500);
    return_go_to_water_list(); sleep(1500)
    qu_ling_wai_mai_quan(4); sleep(1500);
    return_go_to_water_list(4); sleep(1500)
    jiao_shui(); sleep(1500)
    return_go_to_water_list(4); sleep(1500)
    guo_yuan_yu_le(); sleep(1500)
    return_go_to_water_list(4); sleep(1500)
    da_di_shu(); sleep(1500)


    log("****所有任务执行完成****")


}
//正式的
function main() {
    log("****开始执行任务啦****")
    go_free_fruit(); sleep(1500);
    return_go_to_water_list(); sleep(1500)
    liu_lan_15s(3); sleep(1500);
    return_go_to_water_list(); sleep(1500)
    liu_lan_5s(); sleep(1500);
    return_go_to_water_list(); sleep(1500)
    can_yu_6_ci(); sleep(1500);
    return_go_to_water_list(); sleep(1500)
    qu_ling_wai_mai_quan(4); sleep(1500);
    return_go_to_water_list(4); sleep(1500)
    jiao_shui(); sleep(1500)
    return_go_to_water_list(4); sleep(1500)
    guo_yuan_yu_le(); sleep(1500)
    return_go_to_water_list(4); sleep(1500)
    da_di_shu(); sleep(1500)


    log("****所有任务执行完成****")

}
// liu_lan_5s(); sleep(1500);
// log(go_get_water())


// a = className("android.widget.Image").text("").findOne(2000)


return_go_to_water_list()
// log(String(className("android.widget.Image").text("").findOne(2000)))
// log(currentActivity())
// log(id("GameCanvas").findOne(2000))