<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户行为轨迹</title>
<link rel="stylesheet" type="text/css" href="${ctx }/resources/style/jquery-ui-timepicker-addon.css" />
<script type="text/javascript">
</script>
<style>

</style>
</head>
<body>
<div class="breadNav pr pt10 pl20">

  <div class="f14_s lh24">用户感知-&gt;<span>用户行为轨迹</span></div>
  <div><span class="col_8b">*可通过不同的条件查询用户行为，并对用户轨迹和性能指标进行回放。</span><a href="javascript:;" class="conditionBtn"><span class="col_1f">查询</span><i class="arrowUp ml3 down"></i></a></div>
  </div>

    <table width="100%" class="bg_4c mt20 col_w table1Bg retrievalCon" style="display: none;">
        <tr>
            <td height="15" colspan="5"></td>
        </tr>
        <tr>
            <td width="100" height="40" class="tr">手机号码：</td>
            <td width="100"><input type="text" maxlength="11" class="input2" name="phone" id='fkp' ></td>
            <td width="100" height="40" class="tr">用户IP：</td>
            <td><input type="text" maxlength="32" class="input2" name="src_ip"></td>
            <td></td>
            <td></td>
            <td></td>

        </tr>
        <tr>
            <td width="100" class="tr" height="40">IMSI：</td>
            <td width="100"><input type="text" maxlength="32" class="input2" name="imsi"></td>
             <td width="100" class="tr" height="40">开始日期：</td>
            <td width="100"><input type="text" class="input2" id="startTime" name="startTime"></td>
              <td width="100" class="tr" height="40">结束日期：</td>
            <td width="100"><input type="text" class="input2" id="endTime" name="endTime"></td>
            <td colspan="1">
                <a href="javascript:;" class="btn2 w70 dib ml10" id="btnSearch">查询</a>
                 <a href="${ctx }/qos/locus/export"  class="btn2 w70 dib ml10" style="background:rgb(31,181,173);width:100px;" id="btnExport"><i class="icon_items icon5 mt4" style="margin-left:10px"></i>全部导出</a>
            </td>
        </tr>
        <tr>
           <td height="15" colspan="5"></td>
        </tr>
    </table>

    <table width="100%" class="webSiteTable mt20">
        <thead>
        <tr>
           <td height="40" width="70">手机号码</td>
           <td width="70">用户IP</td>
           <td width="85">页面名称</td>
           <td width="230">URL</td>
           <td width="70">页面响应时间(ms)</td>
           <td width="70">HTTP状态码</td>
           <td width="85">访问时间</td>
           <td width="80">操作</td>
        </tr>
        </thead>
        <tbody id="dataShow">
        </tbody>
    </table>


<script type="text/javascript" src="${ctx }/resources/script/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="${ctx }/resources/script/jquery-ui-1.10.2.min.js"></script>
	<script type="text/javascript" src="${ctx }/resources/script/jquery.pagination.js"></script>
    <script type="text/javascript" src="${ctx }/resources/script/xdate.min.js"></script>
	<script type="text/javascript"	src="${ctx }/resources/script/jquery-ui-timepicker-addon.js"></script>
    <script type="text/javascript"	src="${ctx }/resources/script/usrBehaviorList.js"></script>
	
</body>
</html>