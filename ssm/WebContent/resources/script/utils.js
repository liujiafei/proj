//ajax请求url前缀
var globalPrefix;

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份   
        "d+": this.getDate(),                    //日   
        "h+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

/**
 * 页面构件初始化
 */
$(document).ready(function () {
    //最近24小时状态
    $('.time_quantum').length > 0 && createTimeQuantum();
    //百分比条
    $('.percentage').length > 0 && createPercentage(false);
    //分页选取自定义长度，默认10
    $('.pageSizeWrap').length > 0 && bindDownSelectPage();
});


/**
 * 最近时间状态
 * @param obj JQ对象，DOM节点
 * @param data 格式：[{value:8,status:'error'},{value:10,status:'alert'},{value:24,status:'undefined'}]
 * @param len 总时间长度，一天内按小时，其他按天
 */
function timeQuantum(obj, data, len) {
    var data = eval(data);
    var w = obj.width();
    if (!len)    len = 24;
    function getBgColor(status) {
        var color = '';
        switch (status) {
            case 'undefined':
                color = '#DDDDDD';
                break;
            case 'alert':
                color = '#FF9537';
                break;
            case 'error':
                color = '#F47C7D';
                break;
        }
        return color;
    }

    for (i in data) {
        $('<p style="width:' + w / len + 'px;background:' + getBgColor(data[i]['status']) + ';left:' + ((data[i]['value'] - 1) / len) * w + 'px"></p>').appendTo(obj);
    }
}

/**
 * 创建时间状态
 * html范例 <div class="time_quantum" data="[{value:8,status:'error'},{value:9,status:'error'},{value:10,status:'error'},{value:24,status:'undefined'}]"></div>
 * @param className 默认为time_quantum
 */
function createTimeQuantum(className) {
    var c = className || 'time_quantum';
    $('.' + c).each(function (i, e) {
        var _T = $(this);
        timeQuantum(_T, _T.attr('data'), _T.attr('name'));
    });
}


/**
 * 创建图表
 * @param id 图表所在DOM id
 * @param opt 图表参数选项
 * @returns {G.hcLib.Highcharts.Chart}
 */
function bulidChar(id, opt, cus_opt) {
    var plotOpt = {},
        y = {
            //设置y轴的标题、顶部对齐，颜色
            title: {
                text: opt.yTitle || '',
                align: 'high',
                style: {
                    "color": "#333333"
                }
            }
        },
        x = {
            //设置x轴的值、标题、水平对齐，颜色
            categories: opt.x,
            title: {
                text: opt.xTitle || '',
                align: "high",
                style: {
                    "color": "#333333"
                }
            }
        },
        charTitle = {
            //图表的主标题
            text: opt.title || ''
        };

    if (opt.x) {
        x.tickInterval = Math.ceil(opt.x.length / 10);
    }

    switch (opt.type) {
        case 'areaspline':
        case 'area':
            plotOpt.area = {
                marker: {
                    enabled: false
                },
                stacking: opt.stacking ? 'percent' : 'normal'
            };
            break;
        case 'series':
        case 'bar':
        case 'column':
            plotOpt.column = {
                stacking: opt.stacking ? 'percent' : 'normal'
            }
            break;
    }
    if (opt.color) {
        for (var i in opt.color) {
            opt.data[i].color = opt.color[i]
        }
    } else {
        var color = ["#A0D468", "#F69697", "#FFCE55", "#5EAEE3", "", ""];
        for (var i in opt.data) {
            opt.data[i].color = color[i]
        }
    }
    var ini_opt = {
        chart: {
            renderTo: id,
            type: opt.type
        },
        title: charTitle,
        subtitle: {
            text: opt.subtitle
        },
        xAxis: x,
        yAxis: y,
        credits: {
            text: '',
            href: ''
        },
        plotOptions: plotOpt,
        legend: {
            borderWidth: 0
        },
        tooltip: {
            shared: true,
            valueSuffix: opt.yTitle,
            shared: true,
            crosshairs: true
        },
        series: opt.data
    };
    $.extend(ini_opt, cus_opt);
    return new Highcharts.Chart(ini_opt);
}

function ajaxBuildChar(url, id, opt, cus_opt) {
    $.ajax({
        type: "POST",
        url: url,
        data: {},
        dataType: 'json',
        beforeSend: function (XMLHttpRequest) {
        	var csrftoken = $("input[name='csrfmiddlewaretoken']").val()
        	XMLHttpRequest.setRequestHeader("X-CSRFToken", csrftoken);
        },
        success: function (d, status) {
            opt.data = d;
            bulidChar(id, opt, cus_opt);
        },
        error: function (error) {
            console.log(error)
        }
    });
}

//百分比条
function createPercentage(hasNumber, pidstring) {
    var pobj = '';
    if (pidstring)
        var pobj = '#' + pidstring + ' ';
    var string = '<div class="inner"><span></span></div><strong></strong>';
    $(pobj + '.percentage').each(function (i, e) {
        var data = $(e).attr('data');
        var dom = $(string).appendTo($(e));
        $(dom).eq(0).find('span').width(data)
        if (!hasNumber) {
            $(dom).eq(1).hide();
            $(dom).eq(0).attr('title', data)
        } else {
            var maxw = $(dom).width();
            var numberwrap = $(dom).eq(1).html(data);
            //var numbWidth = numberwrap.width() > 43 ? 42 : numberwrap.width();
            //numberwrap.width(numbWidth);
            $(dom).eq(0).width(maxw - 52);
        }
    })
}

function bindDownSelectPage() {
    $('.pageSizeWrap .downSelectWrap').on('click', "li", function () {
        $(this).parents('.pageSizeWrap').find("input[name=pageSize]").val($(this).html());
    });
}

var server = {
    getDeviceType: function (i) {
        var ini = {
            1: 'WEB服务器',
            2: 'FTP服务器',
            3: '邮件服务器',
            4: '数据库服务器',
            5: '代理服务器',
            6: '应用程序服务器',
            7: '文件服务器',
            8: '网管服务器',
            9: '其他'
        };
        return ini[i];
    },
    getOsType: function (i) {
        var ini = {
            1: 'Linux',
            2: 'Windows'
        };
        return ini[i];
    }
}

var Alert = {
    getLevelClass: function (int) {
        var iniLevel = {
            '4': 'error',
            '3': 'alert',
            '2': 'common',
            '1': 'warning',
            '0': ''
        };
        return iniLevel[int];
    },
    getLevel: function (int) {
        var iniLevel = {
            '4': '紧急',
            '3': '重要',
            '2': '次要',
            '1': '一般',
            '0': '正常'
        };
        var level = iniLevel[int] ? iniLevel[int] : ''
        return level;
    },
    getStatus: function (int) {
        var iniStatus = {
            '1': '未处理',
            '2': '处理中',
            '3': '已处理',
            '4': '已恢复',
            '5': '暂停',
            '6': '不处理'
        };
        var status = iniStatus[int] ? iniStatus[int] : ''
        return status;
    },
    getMType: function (int) {
        var ini = {
            3: '业务',
            2: '服务器',
            1: '站点'
        };
        var type = ini[int] ? ini[int] : '-'
        return type;
    },
    getMItype: function (int) {
        var ini = {
            '1': 'HTTP监控',
            '2': 'PING监控',
            '3': 'FTP监控',
            '4': 'DNS监控',
            '5': 'TCP监控',
            '6': 'UDP监控',
            '7': 'SMTP监控',
            '8': 'POP3监控',
            '9': 'CPU使用率',
            '10': 'CPU负载',
            '11': '内存使用率',
            '12': '磁盘I/O',
            '13': '磁盘空间',
            '14': '网络流量',
            '15': '进程数'
        };
        var type = ini[int] ? ini[int] : '-'
        return type;
    },
    mitypesSelect: function () {
        var moniterType = [
            {'name': '全部', value: ''},
            {'name': '站点', value: '1'},
            {'name': '服务器', value: '2'}
        ];
        var str_1 = '';
        for (var i in moniterType) {
            str_1 += '<li data="' + moniterType[i].value + '" onclick="Alert.changeSubType(' + moniterType[i].value + ')">' + moniterType[i].name + '</li>';
        }
        $('#moniterType .manyNum').html(str_1);
        Alert.setVal('moniterType', 0);
    },
    changeSubType: function (mtid) {
        var str_2 = '<li codename="" data="">全部</li>';
        //页面中:<script type="text/javascript"> var mitypes = eval({{ mitypes|safe }}); </script>
        var miData = {};
        for (var i in mitypes) {
            if (!miData[mitypes[i].mtype]) {
                miData[mitypes[i].mtype] = [];
            }
            miData[mitypes[i].mtype].push(mitypes[i]);
        }
        for (var i in miData[mtid]) {
            str_2 += '<li codename="' + miData[mtid][i].codename + '" data="' + miData[mtid][i].id + '">' + miData[mtid][i].name + '</li>';
        }
        $('#moniterSubType .manyNum').html(str_2);
    },
    setVal: function (id, index) {
        if (index < 0) {
            index = 0;
        }
        var list = $('#' + id + ' .manyNum').find('li');
        list.eq(index).addClass('active').siblings().removeClass('active');
        $('#' + id).find('input[name=' + id + ']').val(list.eq(index).attr('data'));
        $('#' + id).find('.toggleNum').html(list.eq(index).html());
    },
    isEmptyPie: function (data) {
        var isEmpty = true;
        for (var i in data) {
            if (data[i][1]) {
                isEmpty = false;
            }
        }
        return isEmpty;
    },
    isEmptyColumn: function (data) {
        var isEmpty = true;
        for (var i in data) {
            if (data[i]['data'].length > 0) {
                isEmpty = false;
            }
        }
        return isEmpty;
    },
    timerane: function (data) {
        var timeShow = '';
        switch (data) {
            case 'today':
                var timestr = JsUtils.getStepDayDate(0, 'yyyy年MM月dd日');
                timeShow = timestr + '至' + timestr;
                break;
            case 'yestoday':
                var timestr = JsUtils.getStepDayDate(-1, 'yyyy年MM月dd日');
                timeShow = timestr + '至' + timestr;
                break;
            case 'last7day':
                timeShow = JsUtils.getStepDayDate(-7, 'yyyy年MM月dd日') + '至' + JsUtils.getStepDayDate(0, 'yyyy年MM月dd日');
                break;
            case 'month':
                timeShow = JsUtils.getFirstDate('yyyy年MM月dd日') + '至' + JsUtils.getStepDayDate(0, 'yyyy年MM月dd日');
                break;
            default :
                timeShow = "";
                break;
        }
        $('#timerane').html(timeShow).show();
    }
}

var Report = {
    pie_1: {
        "type": 'pie',
        "hideTitle": true,
        "data": [
            {data: [
                ["100%", 0],
                ["95-100%", 0],
                ["90-95%", 0],
                ["90%以下", 0]
            ] }
        ]
    },
    ext_pie_1: {
        "plotOptions": {
            "pie": {
                "showInLegend": true,
                "dataLabels": {
                    "enabled": false
                },
                colors: ['#425B71', '#3FBCDA', '#60C9E9', '#89D7ED', '#AFE3F0', '#D9EEF3']
            }
        },
        tooltip: {
            pointFormat: '{point.percentage:.1f}%</b>'
        },
        "legend": {
            "align": "right",
            "verticalAlign": "middle",
            "width": 90,
            "itemWidth": 90,
            "maxHeight": '200px',
            "borderWidth": 0
        }
    },
    col_1: {
        "type": 'column',
        "hideTitle": true
    },
    ecol_1: {
        "plotOptions": {
            series: {
                animation: false
            }
        },
        xAxis: {
            type: 'category'
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: '{point.y}个'
        },
        series: [
            {
                animation: false,
                name: '',
                data: [
                    ["15秒以上", 0],
                    ["8-15秒", 0],
                    ["5-8秒", 0],
                    ["3-5秒", 0],
                    ["2-3秒", 0],
                    ["2秒以下", 0]
                ]
            }
        ]
    }

}
/**
 * 将秒数换成时分秒格式
 */

function formatSeconds(value) {
    var time = parseInt(value);// 秒
    var second = 0,// 分
        hour = 0,// 小时
        minute = 0,
        day = 0; //天

    day = Math.floor(time / 86400);
    if (day) {
        time = time % 86400;
    }
    hour = Math.floor(time / 3600);
    if (hour) {
        time = time % 3600;
    }
    minute = Math.floor(time / 60);
    if (minute) {
        time = minute % 60;
    }
    second = time;

    var result = "" + parseInt(second) + "秒";
    if (second > 0) {
        result = "" + parseInt(minute) + "分" + result;
    }
    if (hour > 0) {
        result = "" + parseInt(hour) + "小时" + result;
    }
    if (day > 0) {
        result = "" + parseInt(day) + "天" + result;
    }
    return result;
}
/**
 * 常用方法类
 */
var JsUtils = {
    /**
     * 页面分页显示
     * @param recordCount  数据总数
     * @param callback     分页回调
     * @param currPage     当前页
     * @param fatherid     父选择器
     * @constructor
     */
    PaginationShow: function (recordCount, callback, currPage, fatherid) {
        var fatherobj = '.silde_right';
        if (fatherid) {
            fatherobj = fatherid;
        }
        var father = $(fatherobj);
        var totalpage = 0;
        var pageSize = Number(father.find(".pageSizeWrap .pageSize").val());
        if (recordCount <= pageSize) {
            totalpage = 1;
        } else {
            if ((recordCount % pageSize) > 0) {
                totalpage = parseInt((recordCount / pageSize)) + 1;
            } else {
                totalpage = recordCount / pageSize;
            }
        }

        father.find(".pageSizeWrap .currentPage").val(currPage);
        father.find(".pageSizeWrap .RecordCount").val(recordCount);
        father.find(".pageSizeWrap .RecordTotal").val(recordCount);
        father.find(".pageSizeWrap .PageTotal").val(totalpage);
        //分页
        father.find(".pageSizeWrap .pageDiv").pagination(recordCount, {
            callback: callback, //回调
            prev_text: '&nbsp;',
            next_text: '&nbsp;',
            link_to: "javascript:void(0);",
            items_per_page: parseInt(father.find(".pageSizeWrap .pageSize").val()), //每页显示的记录数
            num_display_entries: 5, //显示的分页数
            current_page: parseInt(currPage), //当前页码
            num_edge_entries: 3,	//边缘显示的分页数
            load_first_page: false,
            show_if_single_page: true
        });
    },
    doVerifyForm: function (regexObjs, isChange, lineWord, fatherid, isShow, showtipCallBack) {
        var fatherobj = '.silde_right';
        if (fatherid) {
            fatherobj = fatherid;
        }
        var arrayResult = [];
        var flag = true;
        var fatherDom = $(fatherobj);
        var $inputs = fatherDom.find(":input");
        var formDataStr = [];
        var jsonData = {};
        var resultMsg = "";
        for (var obj in regexObjs) {
            var $formInputs = $inputs.filter("[name='" + obj + "']");
            var regexMap, intiReg = regexObjs[obj];
            $formInputs.each(function () {
                var $this = $(this);
                var inputType = $this.prop("type");
                if (inputType == "radio" || inputType == "checkbox") {
                    if (!$this.is(":checked")) {
                        return;
                    }
                }
                var regFrom = $this.attr("regFrom");
                if (regFrom && regexObjs[regFrom] != undefined) {
                    regexMap = regexObjs[regFrom];
                } else {
                    regexMap = intiReg;
                }
                var value = $.trim($(this).val());
                var item = regexMap["notnull"];
                var msg = "";
                if (item != undefined) {
                    msg = item[0];
                    if (value == "") {
                        resultMsg += msg + lineWord;
                        flag = false;
                        JsUtils.changeClass(this, isChange, showtipCallBack);
                        JsUtils.showMsg(fatherDom, obj, msg, isShow);
                        return;
                    }
                }
                item = regexMap["length"];
                if (item != undefined) {
                    msg = item[1];
                    if (item[0].indexOf(",") > 0) {
                        var lengths = item[0].split(",");
                        if (value.length < parseInt(lengths[0])
                            || value.length > parseInt(lengths[1])) {
                            resultMsg += msg + lineWord;
                            flag = false;
                            JsUtils.changeClass(this, isChange);
                            JsUtils.showMsg(fatherDom, obj, msg, isShow, showtipCallBack);
                            return;
                        }
                    } else {
                        if (value.length > parseInt((item[0]))) {
                            resultMsg += msg + lineWord;
                            flag = false;
                            JsUtils.changeClass(this, isChange);
                            JsUtils.showMsg(fatherDom, obj, msg, isShow, showtipCallBack);
                            return;
                        }
                    }
                }
                item = regexMap["format"];
                if (item != undefined) {
                    msg = item[1];
                    var regex = new RegExp(item[0]);
                    if (!regex.test(value)) {
                        resultMsg += msg + lineWord;
                        flag = false;
                        JsUtils.changeClass(this, isChange);
                        JsUtils.showMsg(fatherDom, obj, msg, isShow, showtipCallBack);
                        return;
                    }
                }
                //json格式
                var objKey = $(this).attr('obj');
                var key = $(this).attr('key');
                if (objKey) {
                    if (jsonData[objKey]) {
                        if (jsonData[objKey][key]) {
                            jsonData[objKey][key][obj] = value;//encodeURIComponent(value);
                        } else {
                            var objdata = {};
                            objdata[obj] = value;//encodeURIComponent(value);
                            jsonData[objKey][key] = objdata;
                        }
                    } else {
                        jsonData[objKey] = new Array();
                        var objdata = {};
                        objdata[obj] = value;//encodeURIComponent(value);
                        jsonData[objKey][key] = objdata;
                    }
                } else if (inputType == "checkbox") {
                    if (jsonData[obj]) {
                        jsonData[obj].push(encodeURIComponent(value));
                    } else {
                        var a = new Array();
                        a.push(encodeURIComponent(value));
                        jsonData[obj] = a;
                    }
                } else {
                    jsonData[obj] = value;//encodeURIComponent(value);
                }
                formDataStr.push(obj + "=" + encodeURIComponent(value));
            });
        }
        if (formDataStr.length > 0) {
            formDataStr = formDataStr.join("&");
        }
        arrayResult.push(flag);
        arrayResult.push(flag ? formDataStr : resultMsg);
        arrayResult.push(jsonData);
        arrayResult.push(resultMsg);
        return arrayResult;
    },
    changeClass: function (obj, isChange) {
        if (isChange) {
            $(obj).removeClass("input_01").addClass("input_02");
        }
    },
    showMsg: function (fatherDom, obj, msg, isShow, showtipCallBack) {
        if (isShow) {
            if (showtipCallBack) {
                showtipCallBack(obj, msg);
            } else {
                fatherDom.find('#tip_' + obj).find('.tip_msg').html(msg);
                fatherDom.find('#tip_' + obj).show();
            }
        }
    },
    //绑定自定义下拉框
    bindSelect: function (fatherid, callback) {
        var fatherobj = $("#" + fatherid);
        fatherobj.on('click', "li", function () {
            $("input[name=" + fatherid + "]").val($(this).attr('data'));
            if (callback) {
                callback(this);
            }
        });
    },
    //绑定自定义单选框
    bindRadioSelect: function (fatherid) {
        var fatherobj = $("#" + fatherid);
        fatherobj.on('click', "a", function () {
            $("input[name=" + fatherid + "]").val($(this).attr('data'));
        });
    },
    //检查是否浏览器支持cookies
    checkcookie: function () {
        var result = false;
        if (navigator.cookiesEnabled) return true;
        document.cookie = "testcookie=yes;";
        var cookieSet = document.cookie;
        if (cookieSet.indexOf("testcookie=yes") > -1) result = true;
        document.cookie = "";
        return result;
    },
    //设置cookie
    setCookie: function (name, value, expiry) {
        //24 * 60 * 60//小时，分，秒
        var exp = new Date();
        exp.setTime(exp.getTime() + expiry);
        document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
    },
    //获取cookie
    getCookie: function (name) {
        var tempName = JsUtils.JSRegexEscape(name);
        var arr, reg = new RegExp("(^| )" + tempName + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) return unescape(arr[2]);
        else return 0;
    },
    //删除cookie
    delCookie: function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 2 * 24 * 60 * 60 * 1000);
        var cval = JsUtils.getCookie(name);
        if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },
    JSRegexEscape: function (str) {//Js正则转义
        //^ $ . * + ? = ! : | \ / () [] {}
        var s = "";
        var strTemp = "";
        for (var i = 0; i < str.length; i++) {
            s = str.substr(i, 1);
            switch (s) {
                case "^":
                    strTemp += "\\^";
                    break;
                case "$":
                    strTemp += "\\$";
                    break;
                case ".":
                    strTemp += "\\.";
                    break;
                case "*":
                    strTemp += "\\*";
                    break;
                case "+":
                    strTemp += "\\+";
                    break;
                case "?":
                    strTemp += "\\?";
                    break;
                case "=":
                    strTemp += "\\=";
                    break;
                case "!":
                    strTemp += "\\!";
                    break;
                case ":":
                    strTemp += "\\:";
                    break;
                case "|":
                    strTemp += "\\|";
                    break;
                case "\\":
                    strTemp += "\\\\";
                    break;
                case "/":
                    strTemp += "\\/";
                    break;
                case "(":
                    strTemp += "\\(";
                    break;
                case ")":
                    strTemp += "\\)";
                    break;
                case "[":
                    strTemp += "\\[";
                    break;
                case "]":
                    strTemp += "\\]";
                    break;
                case "{":
                    strTemp += "\\{";
                    break;
                case "}":
                    strTemp += "\\}";
                    break;
                default:
                    strTemp += s;
                    break;
            }
        }
        return strTemp;
    },
    ajaxPostSerializeForKeyVal: function (queryString, key, value) {//将要提交的表单转换成GET型式encode后的字符串
        var formQueryString = queryString;
        formQueryString = formQueryString == "" ? encodeURIComponent(encodeURIComponent($.trim(String(key)))) + "=" + encodeURIComponent(encodeURIComponent($.trim(String(value)))) : formQueryString + "&" + encodeURIComponent(encodeURIComponent($.trim(String(key)))) + "=" + encodeURIComponent(encodeURIComponent($.trim(String(value))));
        return formQueryString;
    },
    queryString: function (param, url) {//url具体参数的值
        if (!url) {
            url = location.search;
        }
        url = url.replace("#", "");
        var svalue = url.match(new RegExp("[?&]" + param + "=([^&]*)", "i"));
        return svalue ? svalue[1] : null;
    },
    htmlEncode: function (str) {//对html编码
        var div = document.createElement("div");
        var text = document.createTextNode(str);
        div.appendChild(text);
        return div.innerHTML;
    },
    htmlDecode: function (str) {//对html解码
        var div = document.createElement("div");
        $(div).html(str);
        return $(div).text();
    },
    substrString: function (str, len) {//判断字符串长度。以字节为单位（即一个中文算2个单位）
        var tempStr = JsUtils.htmlDecode(str);
        var strResult = "";
        var i;
        for (i = 0; i < tempStr.length && len > 0; i++) {
            var patrnStr = /^[\uFF00-\uFFFF\u4e00-\u9fa5]$/;
            var strTemp = tempStr.substr(i, 1);
            if (patrnStr.exec(strTemp)) {
                len = len - 2;
            } else {
                len = len - 1;
            }

            strResult = strResult + strTemp;
        }

        if (len <= 0 && i != str.length) {
            strResult = strResult + "…";
        }
        return strResult;
    },
    getStepDayDate: function (step, format) {//获取前后天日期  当天：step 0，昨天 step -1
        var sdate = new Date().getTime();
        var edate = new Date(sdate + (step * 24 * 60 * 60 * 1000)).toString(format);
        return edate;
    },
    getFirstDate: function (format) {//获取本月第一天
        var datastr = "";
        var myDate = new Date();

        var strYear = myDate.getFullYear();
        var strMonth = myDate.getMonth() + 1;
        if (strMonth < 10) {
            strMonth = "0" + strMonth;
        }
        //datastr = strYear + "-" + strMonth + "-01";
        datastr = new Date(strYear, strMonth - 1, 1).toString(format);
        return datastr;
    },
    getStepMonthDate: function (step, referDate) {//向前推传正数，向后推传负数
        var datastr = "";
        var myDate = referDate || new Date();
        var year = myDate.getFullYear();
        var month = myDate.getMonth();
        var day = myDate.getDate();
        var year2 = year;
        var month2 = parseInt(month) + step + 1;
        if (month2 <= 0) {
            year2 = parseInt(year2) - 1;
            month2 = 12 + month2;
        }
        if (month2 > 12) {
            year2 = parseInt(year2) + 1;
            month2 = month2 - 12;
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }
        if (day2 < 10) {
            day2 = '0' + day2;
        }
        var datastr = year2 + '-' + month2 + '-' + day2;
        return datastr;
    },
    goBack: function (defaultUrl) {
        /*if (!document.referrer || document.referrer.indexOf('login.html') > -1) {
         if (allpermissions[defaultUrl] == 1) {
         location.href = defaultUrl;
         } else {
         location.href = '/index.html';
         }
         } else {
         location.href = document.referrer;
         //window.history.back();
         }*/

        if (document.referrer && document.referrer != '/' && !(document.referrer.indexOf('login.html') > -1)) {
            location.href = document.referrer;
        } else if (allpermissions[defaultUrl] == 1) {
            location.href = defaultUrl;
        } else {
            location.href = '/index.html'
        }
    }
};


jQuery.extend(
    {
        /**
         * @see   将json字符串转换为对象
         * @param   json字符串
         * @return 返回object,array,string等对象
         */
        evalJSON: function (strJson) {
            return eval("(" + strJson + ")");
        }
    });
jQuery.extend(
    {
        /**
         * @see   将javascript数据类型转换为json字符串
         * @param 待转换对象,支持object,array,string,function,number,boolean,regexp
         * @return 返回json字符串
         */
        toJSON: function (object) {
            var type = typeof object;
            if ('object' == type) {
                if (Array == object.constructor)
                    type = 'array';
                else if (RegExp == object.constructor)
                    type = 'regexp';
                else
                    type = 'object';
            }
            switch (type) {
                case 'undefined':
                case 'unknown':
                    return;
                    break;
                case 'function':
                case 'boolean':
                case 'regexp':
                    return object.toString();
                    break;
                case 'number':
                    return isFinite(object) ? object.toString() : 'null';
                    break;
                case 'string':
                    return '"' + object.replace(/(\/\/|\/")/g, "//$1").replace(/\/n|\/r|\/t/g, function () {
                        var a = arguments[0];
                        return (a == '/n') ? '//n' : (a == '/r') ? '//r' : (a == '/t') ? '//t' : ""
                    }) + '"';
                    break;
                case 'object':
                    if (object === null) return 'null';
                    var results = [];
                    for (var property in object) {
                        var value = jQuery.toJSON(object[property]);
                        if (value !== undefined)
                            results.push(jQuery.toJSON(property) + ':' + value);
                    }
                    return '{' + results.join(',') + '}';
                    break;
                case 'array':
                    var results = [];
                    for (var i = 0; i < object.length; i++) {
                        var value = jQuery.toJSON(object[i]);
                        if (value !== undefined) results.push(value);
                    }
                    return '[' + results.join(',') + ']';
                    break;
            }
        }
    });


/**
 *
 */
(function ($) {
    //备份jquery的ajax方法
    var _ajax = $.ajax;

    //重写jquery的ajax方法
    $.ajax = function (opt) {
        //备份opt中error和success方法
        var fn = {
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            },
            beforeSend: function (XMLHttpRequest) {
            },
            success: function (data, textStatus) {
            },
            complete: function (XMLHttpRequest, textStatus) {
            }
        }
        if (opt.error) {
            fn.error = opt.error;
        }
        if (opt.success) {
            fn.success = opt.success;
        }
        if (opt.complete) {
            fn.complete = opt.complete;
        }
        if(opt.beforeSend){
        	fn.beforeSend = opt.beforeSend;
        }

        //扩展增强处理
        var _opt = $.extend(opt, {
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //错误方法增强处理

                fn.error(XMLHttpRequest, textStatus, errorThrown);
            },
            beforeSend: function (XMLHttpRequest) {
            	var csrftoken = $("input[name='csrfmiddlewaretoken']").val()
            	XMLHttpRequest.setRequestHeader("X-CSRFToken", csrftoken);
            	fn.beforeSend(XMLHttpRequest);
            },
            success: function (data, textStatus) {
                //成功回调方法增强处理
                if (data && data.code == 302) {
                    var msg = data.msg ? data.msg : '';
                    location.href = '/login.html?msg=' + msg + '&preurl=' + encodeURIComponent(location.pathname + window.location.search + window.location.hash);
                } else {
                    fn.success(data, textStatus);
                }
            },
            complete: function (XMLHttpRequest, textStatus) {
                var rightSideHeight = Math.ceil($('#content .silde_right').height() + 30);
                $('#content .silde_left').css('height', (rightSideHeight > 800 ? rightSideHeight : 800) + 'px');
                fn.complete(XMLHttpRequest, textStatus);
            }
        });
        _ajax(_opt);
    };
})(jQuery);


/*
 The global object JSON contains two methods.

 JSON.stringify(value) takes a JavaScript value and produces a JSON text.
 The value must not be cyclical.

 JSON.parse(text) takes a JSON text and produces a JavaScript value. It will
 return false if there is an error.
 */
var JSON = function () {
    var m = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        },
        s = {
            'boolean': function (x) {
                return String(x);
            },
            number: function (x) {
                return isFinite(x) ? String(x) : 'null';
            },
            string: function (x) {
                if (/["\\\x00-\x1f]/.test(x)) {
                    x = x.replace(/([\x00-\x1f\\"])/g, function (a, b) {
                        var c = m[b];
                        if (c) {
                            return c;
                        }
                        c = b.charCodeAt();
                        return '\\u00' +
                            Math.floor(c / 16).toString(16) +
                            (c % 16).toString(16);
                    });
                }
                return '"' + x + '"';
            },
            object: function (x) {
                if (x) {
                    var a = [], b, f, i, l, v;
                    if (x instanceof Array) {
                        a[0] = '[';
                        l = x.length;
                        for (i = 0; i < l; i += 1) {
                            v = x[i];
                            f = s[typeof v];
                            if (f) {
                                v = f(v);
                                if (typeof v == 'string') {
                                    if (b) {
                                        a[a.length] = ',';
                                    }
                                    a[a.length] = v;
                                    b = true;
                                }
                            }
                        }
                        a[a.length] = ']';
                    } else if (x instanceof Object) {
                        a[0] = '{';
                        for (i in x) {
                            v = x[i];
                            f = s[typeof v];
                            if (f) {
                                v = f(v);
                                if (typeof v == 'string') {
                                    if (b) {
                                        a[a.length] = ',';
                                    }
                                    a.push(s.string(i), ':', v);
                                    b = true;
                                }
                            }
                        }
                        a[a.length] = '}';
                    } else {
                        return;
                    }
                    return a.join('');
                }
                return 'null';
            }
        };
    return {
        copyright: '(c)2005 JSON.org',
        license: 'http://www.crockford.com/JSON/license.html',
        /*
         Stringify a JavaScript value, producing a JSON text.
         */
        stringify: function (v) {
            var f = s[typeof v];
            if (f) {
                v = f(v);
                if (typeof v == 'string') {
                    return v;
                }
            }
            return null;
        },
        /*
         Parse a JSON text, producing a JavaScript value.
         It returns false if there is a syntax error.
         */
        parse: function (text) {
            try {
                return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(
                    text.replace(/"(\\.|[^"\\])*"/g, ''))) &&
                    eval('(' + text + ')');
            } catch (e) {
                return false;
            }
        }
    };
}();