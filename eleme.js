

//打开饿了么
launchPackage("me.ele")

sleep(5000)
// 从首页进入饿了么果园，使用classname定位，索引为22

var garden_button = className('android.view.ViewGroup').clickable(true).find().get(22)


if (garden_button != null) {
    garden_button.click()
    log("进入饿了么果园")
    sleep(20000)
    get_water_button = className("android.view.View").clickable(true).depth(9).findOnce(15)
    if (get_water_button != null) {
        get_water_button.click()
        sleep(5000)
        log("点击领水滴按钮，查看任务")
        sign_button = text("签到").findOnce();
        again_sign_button = text("重新签到").findOnce()
        if (sign_button != null) {
            if (sign_button.click()) {

                
                log("签到成功")
            }

        } else {
            if (again_sign_button != null) {
                again_sign_button.click()
            } else {
                log("已经签到")
            }
        }
        // sign_button = text("领奖").find();
        sleep(3000)
        while (true) {
            sleep(3000)
            go_walk_button = text("去逛逛").findOnce();
            if (go_walk_button != null) {
                go_walk_button.click();
                sleep(20000)
                go_hone_button = text("返回领水滴").findOnce();
                if (go_hone_button != null) {
                    go_hone_button.parent().click();
                }

            }else{
                log("")
                break
            }
            
        }
        sleep(3000)
        borrow_monet_button = text("去逛一逛").findOnce();
        if (borrow_monet_button != null) {
            borrow_monet_button.click()
            sleep(3000)
            back();
        } else {
            sleep(3000);
            

        }
        sleep(3000)
        while (true) {
            sleep(2000)
            award_button = text("领奖").findOnce();

            if (award_button!=null) {
                award_button.click();
            } else {
                log("已经领奖")
                break;
            }


        }

    } else {
        log("没找到任务列表")
    }



} else {
    back();
    back();
}


