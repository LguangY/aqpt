$(document).ready(function () {
    //flag重置
    var flag_zk = 0;
    //获取时间
    var myDate = new Date;
    var year = myDate.getFullYear(); //获取当前年
    var mon = myDate.getMonth() + 1; //获取当前月
    var date = myDate.getDate(); //获取当前日
    var qs = year+"-"+mon+"-"+date+"+00;00;00";
    var js = year+"-"+mon+"-"+date+"+23;59;59";
    //获取预览
    get_date(qs,js);
    huizhi(qs,js);
    //查询
    $("#boom").click(function () {
        qs = $("#qishi").val();
        js = $("#jieshu").val();
        if(flag_zk){
            $(".dt").remove();
            flag_zk = 0;
        }
        $(".gd").remove();
        get_date(qs,js);
        huizhi(qs,js);
    })
    //选择只显示考核
    $("#kaohe").click(function () {
        if(flag_zk){
            $(".dt").remove();
            flag_zk = 0;
        }
        $(".gd").remove();
        get_date(qs,js);
        huizhi(qs,js);
    })
    //展开指导组详情
    $(".zk").click(function () {
        if (flag_zk==0){
            re_date(this,qs,js);
        }
        else {
            $(".dt").remove();
            flag_zk = 0;
        }
    });
    //饼状图更改车队
    $("#lev_bm").bind("change",function () {
        huizhi(qs,js);
    })
    //改变鼠标形状
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
    //点击详情
    $(document).on("click",".gd",function () {
        if($(this).html()!=0){
            var x = $(this).parent().index();
            var y = $(this).index();

            var table_id = $(this).parents("table").attr("id");
            if(table_id == "gaikuang") {
                $.cookie("gk_flag", 1, {expires: 7, path: '/'});
                var x_name = $("#gaikuang tr:eq(" + x + ") td").eq(0).html();
                var y_name = $("#gaikuang tr:eq(0) th").eq(y).html();
            }
            if (table_id == "lb"){
                $.cookie("gk_flag",2, {expires: 7, path: '/'});
                var x_name = $("#lb tr:eq("+x+") td").eq(0).html();
                var y_name = $("#lb tr:eq(0) th").eq(y).html();
            }

            var kh_flag = $("#kaohe").is(":checked");
            $.cookie("gk_kaohe", kh_flag, {expires: 7, path: '/'});

            if ($(this).parent().attr("class") == "dt"){
                x_name = x_name.substring(0,6);
                var gk_zk = 1;
            }else
                var gk_zk = 0;
            $.cookie("gk_cla", x_name, {expires: 7, path: '/'});
            $.cookie("gk_sou", y_name, {expires: 7, path: '/'});
            $.cookie("gk_qs", qs, {expires: 7, path: '/'});
            $.cookie("gk_js", js, {expires: 7, path: '/'});
            $.cookie("gk_zk",gk_zk, {expires: 7, path: '/'});
            window.open("/aqpt/jiansuo/jiansuo.html");
        }
    })
    $(".lev_b").click(function () {
        if ($(this).html()!="0件"){
            var x = $(this).parent().index();
            var x_lev = ["无","违标2","违标1","一般","严违","特严"];
            var bm_gk = $("#lev_bm").val();
            $.cookie("gk_cla", bm_gk, {expires: 7, path: '/'});
            $.cookie("gk_sou", x_lev[x], {expires: 7, path: '/'});
            $.cookie("gk_qs", qs, {expires: 7, path: '/'});
            $.cookie("gk_js", js, {expires: 7, path: '/'});
            $.cookie("gk_flag",3, {expires: 7, path: '/'});
            $.cookie("gk_kaohe", "false", {expires: 7, path: '/'});
            $.cookie("gk_zk",0, {expires: 7, path: '/'});
            window.open("/aqpt/jiansuo/jiansuo.html");
        }
    })
    //获取概况
    function get_date(qishi,jieshu) {
        var kh_flag = $("#kaohe").is(":checked");
        $.post("getdate.php",{qs:qishi,js:jieshu,flag:kh_flag},function (data) {
            for (var j=0;j<6;j++){
                var nr ="<td class='gd'>"+data[j][0]+"</td>";
                for (var i=1;i<11;i++){
                    nr = nr + "<td class='gd'>"+data[j][i]+"</td>";
                }
                $("#gaikuang tr:eq("+ (j+1) +") td").eq(0).after(nr);
            }
        });
        $.post("getcut.php",{qs:qishi,js:jieshu,flag:kh_flag},function (data) {
            for (var j=0;j<6;j++){
                var nr ="<td class='gd'>"+data[j][0]+"</td>";
                for (var i=1;i<25;i++){
                    nr = nr + "<td class='gd'>"+data[j][i]+"</td>";
                }
                $("#lb tr:eq("+ (j+1) +") td").eq(0).after(nr);
            }
        });
    }
    //车队概况
    function re_date(ys,qishi,jieshu) {
        var re_bm = $(ys).html();
        var kh_flag = $("#kaohe").is(":checked");
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

        var table_id = $(ys).parents("table").attr("id");
        var list_tr = $(ys).parent().index() + 1;
        if (table_id == "gaikuang") {
            $.post("redate.php",{qs:qishi,js:jieshu,bm:re_bm,flag:kh_flag},function (data) {
                for(var j=0;j<fo;j++){
                    var nr ="<td class='gd'>"+data[j][0]+"</td>";
                    for (var i=1;i<11;i++){
                        nr = nr + "<td class='gd'>"+data[j][i]+"</td>";
                    }
                    $('#gaikuang tr:eq('+ list_tr +') td').after(nr);
                    list_tr++;
                }
            });
        }
        if (table_id == "lb"){
            $.post("recut.php",{qs:qishi,js:jieshu,bm:re_bm,flag:kh_flag},function (data) {
                for(var j=0;j<fo;j++){
                    var nr ="<td class='gd'>"+data[j][0]+"</td>";
                    for (var i=1;i<25;i++){
                        nr = nr + "<td class='gd'>"+data[j][i]+"</td>";
                    }
                    $('#lb tr:eq('+ list_tr +') td').after(nr);
                    list_tr++;
                }
            });
        }
        flag_zk = 1;
    }
    function huizhi(qs,js) {
        var kh_flag = $("#kaohe").is(":checked");
        var bm_l = $("#lev_bm").val();
        $.post("huizhi.php", {qs_l: qs, js_l: js,flag: kh_flag,bm:bm_l}, function (data) {
            data[6] = data[0] + data[1] + data[2] + data[3] + data[4] + data[5];
            //获取对象
            var canvas = $("#level_b");
            var context = canvas[0].getContext("2d");
            var start = 0.2 * Math.PI;
            //预设颜色
            var color_b = ["#00ff00", "#bbff00", "#ffff00", "#FFbb00", "#ff5511", "#ff0000"];
            //开始绘制
            for (var i = 0; i < 6; i++) {
                context.fillStyle = color_b[i];
                context.beginPath();
                context.moveTo(100, 100);
                context.arc(100, 100, 100, start, start + Math.PI * 2 * data[i] / data[6], false);
                context.fill();
                start += Math.PI * 2 * data[i] / data[6];
                $("#level_l span").eq(i).html(data[i] + "件");
                $("#level_l p").eq(i).css("background-color", color_b[i]);
            }
        })
    }

    //时间选择器
    $(".time").datetimepicker({
        minView: "day", //  选择时间时，最小可以选择到那层；默认是‘hour’也可用0表示
        language: 'zh-CN', // 语言
        autoclose: true, //  true:选择时间后窗口自动关闭
        format: 'yyyy-mm-dd hh:00:00', // 文本框时间格式，设置为0,最后时间格式为2017-03-23 17:00:00
        todayBtn: true, // 如果此值为true 或 "linked"，则在日期时间选择器组件的底部显示一个 "Today" 按钮用以选择当前日期。
    })
})

