<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<c:set var="ctx" value="${pageContext.request.contextPath }"></c:set>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户行为轨迹-详情</title>
<link rel="stylesheet" type="text/css" href="${ctx }/resources/style/base.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/resources/style/global.css" />
<script type="text/javascript">
	$(function() {
		$.ajax({
			type : "post",
			url : "${ctx}/qos/locus/detail",
			data : {
				filePath : $('#fp').val(),
				seperate : $('#sp').val()
			},
			success : function(da) {
				$("#ct").empty().html(da);
			},
			error : function(da) {
				alert('error');
			}
			
		});
	
	});



	
	var format = function(time){
		var format = "yyyy-MM-dd HH:mm:ss";
	    var date = new Date("1970/01/01 00:00:00");
		var times=date.getTime()+time;
	    var t = new Date(times);
	    var tf = function(i){return (i < 10 ? '0' : '') + i};
	    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
	        switch(a){
	            case 'yyyy':
	                return tf(t.getFullYear());
	                break;
	            case 'MM':
	                return tf(t.getMonth() + 1);
	                break;
	            case 'mm':
	                return tf(t.getMinutes());
	                break;
	            case 'dd':
	                return tf(t.getDate());
	                break;
	            case 'HH':
	                return tf(t.getHours()+8);
	                break;
	            case 'ss':
	                return tf(t.getSeconds());
	                break;
	        }
	    });
	};
	

	
</script>
<style>
.gj-table td{ border-bottom:1px solid #fbfbfb;}
</style>
</head>
<body style="background-color:#f7f7f7;">
 <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;font-family:微软雅黑;" align="center" border="0" width="1240">
    <tr>
      <td>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#1fb5ad;color:#ffffff;border-spacing:0;" border="0" width="100%" >
            <tr>
              <td height="50" style="text-indent:35px;font-size:18px; text-align:center">用户行为轨迹详情页<span></span></td></tr>
                     
        </table> 
      </td>
    </tr>    
    
    <tr><td height="20"></td></tr>
    
    <tr>
      <td>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;" align="center" border="0" width="1240" class="gj-table">
          
           <tbody style="background-color:#FFF;font-size:12px;text-indent:20px;">
       <%--       <tr><td height="35" align="right" width="140">用户账号：</td>
             <td><span>${obj.username}</span></td>
             </tr> --%>
             <tr><td height="35" align="right" width="140">手机号码：</td>
             <td>${obj.phone}</td>
             </tr>
             <tr><td height="35" align="right">用户IP：</td>
             <td>${obj.src_ip}</td>
             </tr>
             
             <tr>
               <td height="35" align="right">省市：</td>  <td>${obj.province}${obj.city}</td></tr>
             <tr>
               <td height="35" align="right">运营商：</td>  <td>${obj.isp}</td></tr>
             <tr>
               <td height="35" align="right">Session ID：</td>  <td>${obj.sessionid}</td></tr>
              <tr>
                <td height="35" align="right">页面名称：</td>  <td>${obj.name}</td></tr>
             <tr>
               <td height="35" align="right">URL：</td>  <td align="left" style="word-break:break-all; word-wrap:break-word;">${obj.url}</td></tr>
             <tr>
               <td height="35" align="right">页面响应时间(s)：</td>  <td>${obj.resp_time}</td></tr>
              <tr>
                <td height="35" align="right">服务器时间(s)：</td>  <td>${obj.server_time}</td></tr>
             <tr>
               <td height="35" align="right">网络时间(s)：</td>  <td>${obj.net_time}</td></tr>
             <tr>
               <td height="35" align="right">访问时间：</td>  <td><fmt:formatDate value="${obj.visit_start_time}"  pattern="yyyy-MM-dd HH:mm:ss" /> </td></tr>
              <tr>
                <td height="35" align="right">IMSI：</td>  <td>${obj.imsi}</td></tr>
             <tr>
               <td height="35" align="right">浏览器名称及版本：</td>  <td>${obj.browser_v}</td></tr>
             <tr>
               <td height="35" align="right">操作系统名称及版本：</td>  <td>${obj.ops}</td></tr>
             
             <tr>
              <tr>
               <td height="35" align="right">移动终端设备名称：</td>  <td>${obj.terminal}</td></tr>
             
             <tr>
              <tr>
               <td height="35" align="right">客户端版本：</td>  <td>${obj.client_v}</td></tr>
             
             <tr>
              <tr>
               <td height="35" align="right">语言：</td>  <td>${obj.content_encoding}</td></tr>
             
             <tr>
              <tr>
               <td height="35" align="right">HTTP状态码：</td>  <td>${obj.http_status}</td></tr>
             
             <tr>
             <td height="40" colspan="2" align="center"><a class="btn1 dib" href="${ctx}/qos/locus" style="text-align:left">返回</a>  <input type='hidden' value='##' id='sp'/><input type='hidden' value='${obj.cache_filename}' id='fp'/></td></tr>
           </tbody>
        </table>
      </td>
    </tr>
    <tr>
    <td id='ct' style="background:#ffffff;padding:10px;border:1px solid #eee">

    </td>
    </tr>
 </table>
   
	
</body>
</html>