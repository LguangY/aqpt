$(document).ready(function () {
    //获取内容
    var power = $.cookie('power');
    var gk_flag = $.cookie('gk_flag');
    //判断打开渠道
    if (gk_flag != 0){
        $.cookie("gk_flag",0, {expires: 7, path: '/'});
        var gk_cla = $.cookie('gk_cla');
        var gk_sou = $.cookie('gk_sou');
        var gk_zk = $.cookie('gk_zk');
        var gk_qs = $.cookie('gk_qs');
        var gk_js = $.cookie('gk_js');
        var gk_kaohe = $.cookie('gk_kaohe');

        if (gk_cla == "车间")
            gk_cla = "";
        if(gk_sou == "合计")
            gk_sou = "";

        if (gk_zk == '1')
            $("#team").val(gk_cla);
        else
            $("#class").val(gk_cla);

        switch (gk_flag) {
            case '1':
                $("#source").val(gk_sou);break;
            case '2':
                $("#cut").val(gk_sou);break;
            case '3':
                $("#level").val(gk_sou);break;
        }

        $("#qishi").val(gk_qs);
        $("#jieshu").val(gk_js);
        if (gk_kaohe == "true")
            jiansuo_k();
        else
            jiansuo();
        //锁定权限
        lock_power();
        //预设时间
        get_time();
    } else {
        //锁定权限
        lock_power();
        //预设时间
        get_time();
        //显示数据
        jiansuo();
    }
    //提交检索
    $("#retrieval").click(function () {
        jiansuo();
    });
    //导出内容
    $("#export").click(function () {
        $("#list").table2excel({
            exclude: ".DC",
            // 导出的Excel文档的名称
            name: "问题检索-" + new Date().toLocaleDateString(),
            // Excel文件的名称
            filename: "问题检索-" + new Date().toLocaleDateString(),//+ ".xls"
            bootstrap: false,
            columns: 2
        });
    });
    //姓名工号匹配
    $("body").on("change", ".bla", function () {
        var nn = $(this).attr("id");
        var idd = "bla_num";
        if (nn != "blame") {
            var bb = $(this).parent().attr("class");
            idd = "num" + bb;
        }
        $.post("match.php", {nme: $(this).val(), a: "a"}, function (data) {
            $("#" + idd).val(data);
        });
    })
    $("body").on("change", ".num", function () {
        var nn = $(this).attr("id");
        var idd = "blame";
        if (nn != "bla_num") {
            var bb = $(this).parent().attr("class");
            idd = "blame" + bb;
        }
        $.post("match.php", {nme: $(this).val(), a: "b"}, function (data) {
            $("#" + idd).val(data);
        });
    })
    //时间选择器
    $(".time").datetimepicker({
        minView: "day", //  选择时间时，最小可以选择到那层；默认是‘hour’也可用0表示
        language: 'zh-CN', // 语言
        autoclose: true, //  true:选择时间后窗口自动关闭
        format: 'yyyy-mm-dd hh:00:00', // 文本框时间格式，设置为0,最后时间格式为2017-03-23 17:00:00
        todayBtn: true, // 如果此值为true 或 "linked"，则在日期时间选择器组件的底部显示一个 "Today" 按钮用以选择当前日期。
    })
    //锁定权限
    function lock_power() {
        var cla = $.cookie('class');
        var team = $.cookie('team');
        var name = $.cookie('name');
        switch (power) {
            case '3':
                $("#class").val(cla);
                $("#class").attr("disabled", "disabled");
                break;
            case '4':
                $("#class").val(cla);
                $("#class").attr("disabled", "disabled");
                $("#team").val(team);
                $("#team").attr("disabled", "disabled");
                $("#name").val(name);
                $("#name").attr("disabled", "disabled");
                break;
        }
    }
    //预设时间
    function get_time() {
        var myDate = new Date;
        var year = myDate.getFullYear(); //获取当前年
        var mon = myDate.getMonth() + 1; //获取当前月
        var date = myDate.getDate(); //获取当前日
        var h = myDate.getHours();//获取当前小时数(0-23)
        var qishi = year + "-" + mon + "-" + (date-1) + " " + h + ":00:00";
        var jieshu = year + "-" + mon + "-" + date + " " + (h+1) + ":00:00";
        $("#qishi").val(qishi);
        $("#jieshu").val(jieshu);
    }
    //检索内容
    function jiansuo() {
        $("#class").removeAttr("disabled");
        $("#team").removeAttr("disabled");
        $("#name").removeAttr("disabled");
        var dd = $("#jiansuo").serialize();
        switch (power) {
            case '3':
                $("#class").attr("disabled", "disabled");
                break;
            case '4':
                $("#class").attr("disabled", "disabled");
                $("#team").attr("disabled", "disabled");
                $("#name").attr("disabled", "disabled");
                break;
        }
        $.post("search.php", dd, function (data) {
            $("#list").html(data);
        });
    }
    //检索内容
    function jiansuo_k() {
        $("#class").removeAttr("disabled");
        $("#team").removeAttr("disabled");
        $("#name").removeAttr("disabled");
        var dd = $("#jiansuo").serialize();
        switch (power) {
            case '3':
                $("#class").attr("disabled", "disabled");
                break;
            case '4':
                $("#class").attr("disabled", "disabled");
                $("#team").attr("disabled", "disabled");
                $("#name").attr("disabled", "disabled");
                break;
        }
        $.post("kaohe.php", dd, function (data) {
            $("#list").html(data);
        });
    }
});