/**
 * Created by chtang on 14-4-25.
 */
$(function () {
    xunZhui.trHover('webSiteTable', 'white');
    //时间选择例子
    $('#startTime').datetimepicker({
    	timeFormat:'HH:mm:ss',
    	closeText : '确定'
    });
    $('#endTime').datetimepicker({
    	timeFormat:'HH:mm:ss',
    	closeText : '确定'
    });
    $('.downSelectWrap').comBox({
        ev: 'click',
        evObj: '.numIconWrap',
        changeObj: '.toggleNum',
        showObj: '.manyNum'
    });
   
    //绑定搜索
    $('#btnSearch').on('click', function () {
    	var phone = $.trim($('#fkp').val());
    	if(phone.length>0&&phone.length!=11){
    		    $("<div><br />手机号码必须是11位数!</div>").dialog(
                    { title: '提示信息', modal: true,
                        buttons: { '确定': function () {
                            $(this).dialog('close');
                        }}
                 });
    	}else if(phone.length>0&&phone.indexOf('1')!='0'){
    		    $("<div><br />手机号码必须是以数字1开头!</div>").dialog(
                    { title: '提示信息', modal: true,
                        buttons: { '确定': function () {
                            $(this).dialog('close');
                        }}
                 });
    	}else{
            LogList.verifyForm();    		
    	}

    });
    //绑定分页
    JsUtils.bindSelect("pagesize", LogList.verifyForm);
    LogList.verifyForm();
    
    //查询条件展示
    var btn=$('a.conditionBtn,a.newViewBtn'),
    togDiv=$('.retrievalCon');
    
	if((!btn)||(!togDiv)) return false;
	
    btn.on('click',function(){
		  togDiv.stop().fadeToggle();
		  $(this).find('i').toggleClass('down');
	});
    

});

var LogList = {
    formQueryString: "",
    verifyForm: function () {
        var array = JsUtils.doVerifyForm(logListRegex, false, '<br />');
        if (array[0]) {
            var startStr = $('#startTime').val();
            var endStr = $('#endTime').val();
            var isSubmit = true;
            if (startStr && endStr) {
                var startTime = new XDate(startStr);
                var endTime = new XDate(endStr);
                if (startTime > endTime) {
                    isSubmit = false;
                    $('<div><br />请重新选择时间，开始时间不能大于结束时间</div>').dialog(
                        { title: '提示信息', modal: true,
                            buttons: { '确定': function () {
                                $(this).dialog('close');
                            }}
                        });
                }
            }
       /*     if (startStr && !endStr) {
                $('<div><br />请选择结束时间</div>').dialog({
                    buttons: { '确定': function () {
                        $(this).dialog('close');
                    }}
                });
            }
            if (!startStr && endStr) {
                $('<div><br />请选择开始时间</div>').dialog({
                    buttons: { '确定': function () {
                        $(this).dialog('close');
                    }}
                });
            }*/
            if (isSubmit) {
                LogList.formQueryString = array[1];
                LogList.ajaxPost(0);
            }
        } else {
            $("<div><br />" + array[1] + '</div>').dialog(
                { title: '提示信息', modal: true,
                    buttons: { '确定': function () {
                        $(this).dialog('close');
                    }}
                });
        }
    },
    ajaxPost: function (currPage) {
        LogList.formQueryString = LogList.formQueryString.toString().replace(new RegExp("curpage=\\d+"), "curpage=" + currPage);
        $.ajax({
            type: "POST",
            url: 'locus/listdata',
            data: LogList.formQueryString,
            dataType: "json",
            beforeSend: function (XMLHttpRequest) {
            },
            success: function (data, textStatus) {
                if (data.retCode == '0') {
                    $("#dataShow").html("");
                    var html = "";
                    var result = data.json;
                    $.each(result, function (i) {
                    	var xtx = result[i]['url'];
                    	if(xtx.length>50)xtx = xtx.substring(0,50)+"...";
                    	alert(xtx);
                        html += '<tr>'
                            + '<td  height="40">' + result[i]['phone'] + '</a></td>'
                            + '<td>' + result[i]['src_ip'] + '</td>'
                            + '<td>' + result[i]['name'] + '</td>'
                            + '<td style="width:230px;word-break:break-all; word-wrap:break-word;cursor:pointer;text-align:left;" title="'+result[i]['url']+'">' + xtx + '</td>'
                            + '<td>' + result[i]['resp_time'] + '</td>'
                            + '<td>' + result[i]['http_status'] + '</td>'
                            + '<td>' + result[i]['visit_start_time'] + '</td>'
                            + '<td><a href="locus/detail?id='+result[i]['id']+'">详情</a></td>'
                            + '</tr>'
                    });
                    if (!html) {
                        html = '<tr><td colspan="8" height="40">无数据</td></tr>';
                    }
                    $("#dataShow").html(html);

                    //分页例子
                    JsUtils.PaginationShow(data.total, LogList.ajaxPost, currPage);
                } else {
                    $("<div><br />" + (data.msg ? data.msg : '系统忙，请稍后再试') + '</div>').dialog(
                        { title: '提示信息', modal: true,
                            buttons: { '确定': function () {
                                $(this).dialog('close');
                            }}
                        });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("<div><br />" + '系统忙，请稍后再试' + '</div>').dialog(
                    { title: '提示信息', modal: true,
                        buttons: { '确定': function () {
                            $(this).dialog('close');
                        }}
                    });
            },
            complete: function (XMLHttpRequest, textStatus) {
                //console.log(1)
            }
        });
    }
};

var logListRegex = {
    "phone": {
        "format": [ "^[\uFF00-\uFFFF\u4e00-\u9fa5A-z0-9_]{0,32}$", "请填写正确的手机号码" ]
    },
    "imsi": {
        "format": [ "^[\uFF00-\uFFFF\u4e00-\u9fa5A-z0-9_]{0,32}$", "请填写正确的IMSI" ]
    },
    "src_ip": {
        "format": [ "^((?:(?:[01]?\\d{1,2}|2[0-4]\\d|25[0-5])\\.){3}(?:[01]?\\d{1,2}|2[0-4]\\d|25[0-5])){0,1}$", "请填写正确的IP" ]
    },
    "startTime": {
        "format": [ "^([2-5][0-9]{3}-((0[1-9])|(1[0-2]))-((0[1-9])|([12][0-9])|(3[01])) ((0[0-9])|(1[0-9])|(2[0-3])):([0-5][0-9]):([0-5][0-9])){0,1}$", "请填写正确的开始时间" ]
    },
    "endTime": {
        "format": [ "^([2-5][0-9]{3}-((0[1-9])|(1[0-2]))-((0[1-9])|([12][0-9])|(3[01])) ((0[0-9])|(1[0-9])|(2[0-3])):([0-5][0-9]):([0-5][0-9])){0,1}$", "请填写正确的结束时间" ]
    },
    "pagesize": {
        "format": [ "^[1-9][0-9]{0,8}$", "每页显示条数出错" ]
    },
    "curpage": {
        "format": [ "^[0-9]{1,9}$$", "当前页码错误" ]
    }
};