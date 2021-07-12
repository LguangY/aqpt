$(document).ready(function () {
    //预设flag
    var flag_ben = 0;
    var flag_zk = 0;
    $.cookie("gk_flag",0, {expires: 7, path: '/'});
    var name = $.cookie('name');
    var num = $.cookie('num');
    var cla = $.cookie('class');
    var team = $.cookie('team');
    var power = $.cookie('power');
    if (cla == "车间") {
        cla = "车间管理人员";
    }
    if (team == "null") {
        team = "";
    }
    if(power == "4")
    {
        team = team + "指导司机";
    }
    $(".sum").html("兖州运用一车间 " + cla + " " + team + " " + name + " 欢迎您！");

    //加载概况
    get_date();
    huizhi();
    //更新概况
    $("#ben").click(function () {
        switch (flag_ben) {
            case 0:
                $("#ben").html("本月概况");
                flag_ben = 1;
                if(flag_zk){
                    $(".dt").remove();
                    flag_zk = 0;
                }
                $("#gaikuang .gd").remove();
                get_date();
                huizhi();
                break;
            case 1:
                $("#ben").html("本日概况");
                flag_ben = 0;
                if(flag_zk){
                    $(".dt").remove();
                    flag_zk = 0;
                }
                $("#gaikuang .gd").remove();
                get_date();
                huizhi();
                break;
        }
    })
    //改变鼠标形状
    $("#ben").mouseover(function () {
        $(this).css('cursor','pointer');
    })
    $(".zk").mouseover(function () {
        $(this).css('cursor','pointer');
        $(this).css('background-color','#0e90d2');
    })
    $(".zk").mouseleave(function () {
        $(this).css('background-color','#E2E2E2');
    })
    $(".lev_b").mouseover(function () {
        if($(this).html()!= "0件"){
            $(this).css('cursor','pointer');
            $(this).css('background-color','#0e90d2');
        }
    })
    $(".lev_b").mouseleave(function () {
        if($(this).html()!="0件") {
            $(this).css('background-color','#E2E2E2');
        }
    })
    $(document).on("mouseover",".gd",function () {
        if($(this).html()!=0){
            $(this).css('cursor','pointer');
            $(this).css('background-color','#0e90d2');
        }
    })
    $(document).on("mouseleave",".gd",function () {
        if($(this).html()!=0){
            $(this).css('background-color','#E2E2E2');
        }
    })
    //展开指导组详情
    $(".zk").click(function () {
        if (flag_zk==0){
            re_date(this);
        }
        else {
            $(".dt").remove();
            flag_zk = 0;
        }
    })
    //点击详情
    $(document).on("click",".gd",function () {
        if($(this).html()!=0){
            var x = $(this).parent().index();
            var y = $(this).index();
            var x_name = $("#gaikuang tr:eq("+x+") td").eq(0).html();
            var y_name = $("#gaikuang tr:eq(0) th").eq(y).html();
            if ($(this).parent().attr("class") == "dt"){
                x_name = x_name.substring(0,6);
                var gk_zk = 1;
            }else
                var gk_zk = 0;
            $.cookie("gk_cla", x_name, {expires: 7, path: '/'});
            $.cookie("gk_sou", y_name, {expires: 7, path: '/'});
            $.cookie("gk_qs", get_time(flag_ben,"qs"), {expires: 7, path: '/'});
            $.cookie("gk_js", get_time(flag_ben,"js"), {expires: 7, path: '/'});
            $.cookie("gk_flag",1, {expires: 7, path: '/'});
            $.cookie("gk_kaohe", "false", {expires: 7, path: '/'});
            $.cookie("gk_zk",gk_zk, {expires: 7, path: '/'});
            window.open("/aqpt/jiansuo/jiansuo.html");
        }
    })
    $(".lev_b").click(function () {
        if ($(this).html()!="0件"){
            var x = $(this).parent().index();
            var x_lev = ["无","违标2","违标1","一般","严违","特严"];
            $.cookie("gk_cla", "车间", {expires: 7, path: '/'});
            $.cookie("gk_sou", x_lev[x], {expires: 7, path: '/'});
            $.cookie("gk_qs", get_time(flag_ben,"qs"), {expires: 7, path: '/'});
            $.cookie("gk_js", get_time(flag_ben,"js"), {expires: 7, path: '/'});
            $.cookie("gk_flag",3, {expires: 7, path: '/'});
            $.cookie("gk_kaohe", "false", {expires: 7, path: '/'});
            $.cookie("gk_zk",0, {expires: 7, path: '/'});
            window.open("/aqpt/jiansuo/jiansuo.html");
        }
    })

    //预设时间
    function get_time(flag_time,flag) {
        var myDate = new Date;
        var year = myDate.getFullYear(); //获取当前年
        var mon = myDate.getMonth() + 1; //获取当前月
        var date = myDate.getDate(); //获取当前日
        switch (flag_time) {
            case 0:
                var qishi = year + "-" + mon + "-" + date + " 00:00:00";
                var jieshu = year + "-" + mon + "-" + date + " 23:59:59";
                break;
            case 1:
                var qishi = year + "-" + mon + "-1 00:00:00";
                var jieshu = year + "-" + mon + "-31 23:59:59";
                break;
        }
        if (flag == "qs")
            return qishi;
        if (flag == "js")
            return jieshu;
    }
    //获取概况
    function get_date() {
        $.post("gaikuang.php",{flag:flag_ben},function (data) {
            for (var j=0;j<6;j++){
                var nr ="<td class='gd'>"+data[j][0]+"</td>";
                for (var i=1;i<10;i++){
                    nr = nr + "<td class='gd'>"+data[j][i]+"</td>";
                }
                $("tr:eq("+ (j+1) +") td").eq(0).after(nr);
            }
        });
    }
    //车队概况
    function re_date(ys) {
        var re_bm = $(ys).html();
        var nr;
        var fo;
        switch (re_bm) {
            case "东一":
                nr = "<tr class='dt'><td>第01指导组<br>(张庆伟)</td></tr>"
                    + "<tr class='dt'><td>第02指导组<br>(何世品)</td></tr>"
                    + "<tr class='dt'><td>第03指导组<br>(李亮亮)</td></tr>"
                    + "<tr class='dt'><td>第04指导组<br>(许布克)</td></tr>"
                    + "<tr class='dt'><td>第05指导组<br>(袁岳)</td></tr>"
                    + "<tr class='dt'><td>第06指导组<br>(商广辉)</td></tr>";
                fo = 6;
                break;
            case  "东二":
                nr = "<tr class='dt'><td>第07指导组<br>(颜秉辉)</td></tr>"
                    + "<tr class='dt'><td>第08指导组<br>(张胜)</td></tr>"
                    + "<tr class='dt'><td>第09指导组<br>(管振航)</td></tr>"
                    + "<tr class='dt'><td>第10指导组<br>(韩勤武)</td></tr>"
                    + "<tr class='dt'><td>第11指导组<br>(程伟)</td></tr>";
                fo = 5;
                break;
            case "瓦日":
                nr = "<tr class='dt'><td>第12指导组<br>(郭勐)</td></tr>"
                    + "<tr class='dt'><td>第13指导组<br>(安龙光)</td></tr>"
                    + "<tr class='dt'><td>第14指导组<br>(马进丽)</td></tr>"
                    + "<tr class='dt'><td>第15指导组<br>(牛勇翔)</td></tr>"
                    + "<tr class='dt'><td>第16指导组<br>(丛宗阳)</td></tr>"
                    + "<tr class='dt'><td>第17指导组<br>(周强)</td></tr>"
                    + "<tr class='dt'><td>第18指导组<br>(姜涛)</td></tr>"
                    + "<tr class='dt'><td>第19指导组<br>(高瑞明)</td></tr>";
                fo = 8;
                break
        }
        $(ys).parent().after(nr);
        var list_tr = $(ys).parent().index() + 1;
        $.post("redate.php",{flag:flag_ben,bm:re_bm},function (data) {
            for(var j=0;j<fo;j++){
                var nr ="<td class='gd'>"+data[j][0]+"</td>";
                for (var i=1;i<10;i++){
                    nr = nr + "<td class='gd'>"+data[j][i]+"</td>";
                }
                $('#gaikuang tr:eq('+ list_tr +') td').after(nr);
                list_tr++;
            }
        });
        flag_zk = 1;
    }
    function huizhi() {
        $.post("huizhi.php",{flag:flag_ben},function (data) {
            data[6] = data[0]+data[1]+data[2]+data[3]+data[4]+data[5];
            //获取对象
            var canvas = $("#level_b");
            var context = canvas[0].getContext("2d");
            var start = 0.2* Math.PI;
            //预设颜色
            var color_b = ["#00ff00","#bbff00","#ffff00","#FFbb00","#ff5511","#ff0000"];
            //开始绘制
            for(var i=0;i<6;i++){
                context.fillStyle = color_b[i];
                context.beginPath();
                context.moveTo(105,105);
                context.arc(105,105,105,start,start+Math.PI*2*data[i]/data[6],false);
                context.fill();
                start += Math.PI*2*data[i]/data[6];
                $("#level_l a").eq(i).html(data[i]+"件");
                $("#level_l p").eq(i).css("background-color",color_b[i]);
            }
        })

    }
})


