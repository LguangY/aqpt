$(document).ready(function () {
    //输入部门和班组
    var cla = $.cookie('class');
    var team = $.cookie('team');
    var name = $.cookie('name');
    $("#aaaa").val(name);
    $("#bbbb").val(team);
    //责任人个数
    var num = 1;
    if (team == "null")
        team = "";
    //显示数据
    $("#list").load("show.php", {name: name});
    // 保存问题
    $("#aja").on("load",function () {
		var ree = $(window.frames["aja"].document).find("pre").html();
		$("#list").load("show.php", {name: name});
        alert(ree);
    });
    //提交数据
    $("#submit").click(function () {
        var nn = $("input[name='item[]']:checked").length;
        if (nn == 0) {
            alert("请选择要提交的问题");
        } else {
            var id = $("input[name='item[]']:checked").serialize() + "&nn=" + nn + "&name=" + name + "&class=" + cla + "&team=" + team;
            $.post("updata.php", id, function (data) {
                alert(data['a']);
                $("#list").load("show.php", {name: name});
            });
        }
    });
    //全选
    $(document).on("click", "#checkall", function () {
        if (this.checked) {
            $("input[name='item[]']").attr('checked', true);
        } else {
            $("input[name='item[]']").attr('checked', false);
        }
    });
    //删除
    $(document).on("click", ".del", function () {
        var del = "id=" + $(this).attr('id') + "&name=" + name;
        if (confirm("是否要删除本条问题！")) {
            $.post("del.php", del, function (data) {
                if (data['a'] == 'a') {
                    alert("删除成功");
                    $("#list").load("show.php", {name: name});
                } else {
                    alert("请重试");
                }
            })
        }
    });
    //修改
    $(document).on("click", ".change", function () {
        $(".change").attr("disabled", "disabled");
        $(".del").attr("disabled", "disabled");
        $("#keep").attr("disabled", "disabled");
        $("#reset").attr("disabled", "disabled");

        var list_id = $(this).next().attr('id');
        var list_tr = $(this).attr('id');
        var list_trb = $(this).attr('name') - 1;
        var list_trr = $(this).attr('id');

        var list = new Array("cut", "source", "describe", "step", "blame", "bla_num", "level", "check");

        list["cut"] = $('#list_tab tr:eq(' + list_tr + ') td').eq(1).text();
        list["source"] = $('#list_tab tr:eq(' + list_tr + ') td').eq(2).text();
        list["describe"] = $('#list_tab tr:eq(' + list_tr + ') td').eq(3).text();
        list["step"] = $('#list_tab tr:eq(' + list_tr + ') td').eq(4).text();
        list["blame"] = $('#list_tab tr:eq(' + list_tr + ') td').eq(5).text();
        list["bla_num"] = $('#list_tab tr:eq(' + list_tr + ') td').eq(6).text();
        list["level"] = $('#list_tab tr:eq(' + list_tr + ') td').eq(7).text();
        list["check"] = $('#list_tab tr:eq(' + list_tr + ') td').eq(8).text();

        $('#list_tab tr:eq(' + list_tr + ') td').eq(1).html("<select id=ch_cut style=\"width:80px;\">\n" +
            "                        <option value=\"劳动安全\">劳动安全</option>\n" +
            "                        <option value=\"LKJ操作\">LKJ操作</option>\n" +
            "                        <option value=\"呼唤应答\">呼唤应答</option>\n" +
            "                        <option value=\"机能试验\">机能试验</option>\n" +
            "                        <option value=\"四核対\">四核対</option>\n" +
            "                        <option value=\"连挂状态\">连挂状态</option>\n" +
            "                        <option value=\"假设活\">假设活</option>\n" +
            "                        <option value=\"制动机使用\">制动机使用</option>\n" +
            "                        <option value=\"过分相操作\">过分相操作</option>\n" +
            "                        <option value=\"操纵控速\">操纵控速</option>\n" +
            "                        <option value=\"调车安全\">调车安全</option>\n" +
            "                        <option value=\"值乘精力\">值乘精力</option>\n" +
            "                        <option value=\"瞭望确认\">瞭望确认</option>\n" +
            "                        <option value=\"车机联控\">车机联控</option>\n" +
            "                        <option value=\"出退勤管理\">出退勤管理</option>\n" +
            "                        <option value=\"两纪管理\">两纪管理</option>\n" +
            "                        <option value=\"作业标准\">作业标准</option>\n" +
            "                        <option value=\"安全管理\">安全管理</option>\n" +
            "                        <option value=\"防溜安全\">防溜安全</option>\n" +
            "                        <option value=\"防汛安全\">防汛安全</option>\n" +
			"                        <option value=\"单身宿舍\">单身宿舍</option>\n" +
            "                        <option value=\"白色通知书\">白色通知书</option>\n" +
            "                        <option value=\"意见建议征集\">意见建议征集</option>\n" +
            "                        <option value=\"好人好事\">好人好事</option>\n" +
            "                        <option value=\"其他\">其他</option>\n" +
            "                    </select>");

        $('#list_tab tr:eq(' + list_tr + ') td').eq(2).html("<select id=ch_source style=\"width:100px;\">\n" +
            "                        <option value=\"现场\">现场</option>\n" +
            "                        <option value=\"添乘\">添乘</option>\n" +
            "                        <option value=\"音频\">音频</option>\n" +
            "                        <option value=\"视频\">视频</option>\n" +
            "                        <option value=\"LKJ\">LKJ</option>\n" +
            "                        <option value=\"责任行车概况\">责任行车概况</option>\n" +
            "                        <option value=\"段发通知书\">段发通知书</option>\n" +
			"                        <option value=\"通知书\">通知书</option>\n" +
            "                        <option value=\"退勤报\">退勤报</option>\n" +
            "                        <option value=\"其它\">其它</option>\n" +
            "                    </select>");

        $('#list_tab tr:eq(' + list_tr + ') td').eq(3).html("<textarea id=ch_describe style=\"width:300px;\"></textarea>");
        $('#list_tab tr:eq(' + list_tr + ') td').eq(4).html("<textarea id=ch_step style=\"width:300px;\"></textarea>");
        $('#list_tab tr:eq(' + list_tr + ') td').eq(5).html("<input id=ch_blame type=\"text\" style=\"width:60px;\">");
        $('#list_tab tr:eq(' + list_tr + ') td').eq(6).html("<input id=ch_bla_num type=\"text\" style=\"width:70px;\">");
        while (list_trb--) {
            list_trr++;
            var ll = $('#list_tab tr:eq(' + list_trr + ') td').eq(0).text();
            var nn = $('#list_tab tr:eq(' + list_trr + ') td').eq(1).text();
            $('#list_tab tr:eq(' + list_trr + ') td').eq(0).html("<input type=\"text\" style=\"width:60px;\">");
            $('#list_tab tr:eq(' + list_trr + ') td').eq(1).html("<input type=\"text\" style=\"width:70px;\">");
            $('#list_tab tr:eq(' + list_trr + ') td').eq(0).children().val(ll);
            $('#list_tab tr:eq(' + list_trr + ') td').eq(1).children().val(nn);
        }

        $('#list_tab tr:eq(' + list_tr + ') td').eq(7).html("<select id=ch_level style=\"width:70px;\">\n" +
            "                        <option value=\"特严\">特严</option>\n" +
            "                        <option value=\"严违\">严违</option>\n" +
            "                        <option value=\"一般\">一般</option>\n" +
            "                        <option value=\"违标1\">违标1</option>\n" +
            "                        <option value=\"违标2\">违标2</option>\n" +
            "                        <option value=\"无\">无</option>\n" +
            "                    </select>");
        $('#list_tab tr:eq(' + list_tr + ') td').eq(8).html("<input id=ch_check type=\"text\" style=\"width:40px;\">");
        var keep_nam = $(this).attr('name') - 1;
        $('#list_tab tr:eq(' + list_tr + ') td').eq(10).html("<input type=\"button\" class=\"ch_keep\" id=" + list_id + " name=" + keep_nam + " value=\"保存\"><input type=\"button\" id=" + list_tr + " class=\"ch_rest\" value=\"取消\">");

        $("#ch_cut").val(list["cut"]);
        $("#ch_source").val(list["source"]);
        $("#ch_describe").val(list["describe"]);
        $("#ch_step").val(list["step"]);
        $("#ch_blame").val(list["blame"]);
        $("#ch_bla_num").val(list["bla_num"]);
        $("#ch_level").val(list["level"]);
        $("#ch_check").val(list["check"]);
    });
    // //保存修改
    $(document).on("click", ".ch_keep", function () {
        var list_id = $(this).attr('id');
        var list_trb = $(this).attr('name');
        var list_tr = $(".ch_rest").attr('id');

        var list_blame = $("#ch_blame").val();
        var list_bla_num = $("#ch_bla_num").val();
        while (list_trb--) {
            list_tr++;
            var aa = $('#list_tab tr:eq(' + list_tr + ') td').eq(0).children().val();
            var bb = $('#list_tab tr:eq(' + list_tr + ') td').eq(1).children().val();
            if (aa != "" && bb != "") {
                list_blame = list_blame + "/" + aa;
                list_bla_num = list_bla_num + "/" + bb;
            }

        }
        var list_cut = $("#ch_cut").val();
        var list_source = $("#ch_source").val();
        var list_describe = $("#ch_describe").val();
        var list_step = $("#ch_step").val();
        var list_level = $("#ch_level").val();
        var list_check = $("#ch_check").val();

        var list_josn = "name=" + name + "&id=" + list_id + "&team=" + team + "&cut=" + list_cut + "&source=" + list_source + "&describe=" + list_describe + "&step=" + list_step + "&blame=" + list_blame + "&bla_num=" + list_bla_num + "&level=" + list_level + "&check=" + list_check;
        $.post("change.php", list_josn, function (data) {
            if (data == 'a') {
                alert("修改成功！");
                $("#list").load("show.php", {name: name});
                $("#keep").attr("disabled", false);
                $("#reset").attr("disabled", false);
            } else {
                alert("请重试！");
            }
        });
    })
    //撤销修改
    $(document).on("click", ".ch_rest", function () {
        if (confirm("是否要取消当前修改！")) {
            $("#list").load("show.php", {name: name});
            $("#keep").attr("disabled", false);
            $("#reset").attr("disabled", false);
        }
    });

    //考核对接
    function pipei1() {
        var lev = $("#level").find("option:checked").val();
        //退勤报考核减半
        var sou = $("#source").find("option:checked").val();
        if (sou == "退勤报") {
            switch (lev) {
                case "违标1":
                    $("#check").val(50);
                    break;
                case "违标2":
                    $("#check").val("");
                    break;
                case "一般":
                    $("#check").val(100);
                    break;
                case "严违":
                    $("#check").val(250);
                    break;
                case "特严":
                    $("#check").val(500);
                    break;
                case "无":
                    $("#check").val("");
                    break;
            }
        } else {
            switch (lev) {
                case "违标1":
                    $("#check").val(100);
                    break;
                case "违标2":
                    $("#check").val(50);
                    break;
                case "一般":
                    $("#check").val(200);
                    break;
                case "严违":
                    $("#check").val(500);
                    break;
                case "特严":
                    $("#check").val(1000);
                    break;
                case "无":
                    $("#check").val("");
                    break;
            }
        }
    }

    //退勤报
    $("#level").click(function () {
        pipei1();
    })
    //模板
    $("#source").click(function () {
        pipei1();
        var sou = $("#source").find("option:checked").val();
        switch (sou) {
            case "添乘":
                $("#muban").html(
                    "<input type=\"text\" style=\"width:35px;\" name=\"describe[]\" placeholder=\"年\" required>年" +
                    "<input type=\"text\" style=\"width:18px;\" name=\"describe[]\" placeholder=\"月\" required>月" +
                    "<input type=\"text\" style=\"width:18px;\" name=\"describe[]\" placeholder=\"日\" required>日" +
                    "<input type=\"text\" style=\"width:50px;\" name=\"describe[]\" placeholder=\"时:分\" required>-<input type=\"text\" style=\"width:50px;\" name=\"describe[]\" placeholder=\"时:分\" required>，" +
                    "添乘<input type=\"text\" style=\"width:120px;\" name=\"describe[]\" placeholder=\"姓名\" required>机班" +
                    "使用<input type=\"text\" style=\"width:100px;\" name=\"describe[]\" placeholder=\"机车编号\" required>机车值乘" +
                    "<input type=\"text\" style=\"width:80px;\" name=\"describe[]\" placeholder=\"站名\" required>-<input type=\"text\" style=\"width:80px;\" name=\"describe[]\" placeholder=\"站名\" required>间" +
                    "<input type=\"text\" style=\"width:50px;\" name=\"describe[]\" placeholder=\"车次\" required>次货物列车，编组" +
                    "<input type=\"text\" style=\"width:30px;\" name=\"describe[]\" placeholder=\"辆数\" required>/<input type=\"text\" style=\"width:40px;\" name=\"describe[]\" placeholder=\"总重\" required>/<input type=\"text\" style=\"width:40px;\" name=\"describe[]\" placeholder=\"换长\" required>。" +
                    "发现问题：<br><textarea  name=\"describe[]\" class=\"tc\" placeholder=\"请输入\" required></textarea>");
                break;
            default:
                $("#muban").html(" <textarea class=\"input\" name=\"describe[]\" id=\"describe\" placeholder=\"请输入\" required></textarea>");
                $("#describe").val("");
                $("#describe").attr("placeholder", "请输入");
                break;
        }
    })
    //添加责任人
    $(".add").click(function () {
        num++;
        var id1 = "blame" + num;
        var id2 = "num" + num;
        $("#add1").after("<span class=\"" + num + "\"><input type=\"text\" name=\"blame[]\" class=\"bla\" id=\"" + id1 + "\" placeholder=\"请输入\" required>" +
            "<input type=\"button\" name=\"" + num + "\" class=\"rem\"  value=\"-\"></span>");
        $("#add2").after("<span class=\"" + num + "\"><input type=\"text\" name=\"bla_num[]\" class=\"num\" id=\"" + id2 + "\" placeholder=\"请输入\" required>" +
            "<input type=\"button\" name=\"" + num + "\" class=\"rem\"  value=\"-\"></span>");
    })
    $("body").on("click", ".rem", function () {
        $("span." + $(this).attr("name")).remove();
    })
    //姓名工号匹配
    $("body").on("change", ".bla", function () {
        var nn = $(this).attr("id");
        var idd = "bla_num";
        if(nn != "blame"){
            var bb = $(this).parent().attr("class");
            idd = "num" + bb;
        }
        $.post("match.php", {nme: $(this).val() , a:"a"}, function (data) {
            $("#"+idd).val(data);
        });
    })
    $("body").on("change",".num",function () {
        var nn = $(this).attr("id");
        var idd = "blame";
        if(nn != "bla_num"){
            var bb = $(this).parent().attr("class");
            idd = "blame" + bb;
        }
        $.post("match.php", {nme: $(this).val() , a:"b"}, function (data) {
            $("#"+idd).val(data);
        });
    })
});

