$(document).ready(function () {
    $("#tj").click(function () {
        if ($("#name").val() == "请输入用户名" || $("#name").val() == "") {
            alert("请输入用户名");
        } else {
            $.post("denglu.php", $("#data").serialize(), function (data) {
                var state = data['state'];
                switch (state) {
                    case 'a':
                        alert("用户名不存在");
                        break;
                    case 'b':
                        alert("密码错误");
                        break;
                    case 'c':
                        $.cookie("name", data['name'], {expires: 7, path: '/'});
                        $.cookie("num", data['num'], {expires: 7, path: '/'});
                        $.cookie("class", data['class'], {expires: 7, path: '/'});
                        $.cookie("team", data['team'], {expires: 7, path: '/'});
                        $.cookie("power", data['power'], {expires: 7, path: '/'});
                        window.location.href = "/aqpt/shouye/shouye.html";
                        break;
                }
            });
        }
    });
});
