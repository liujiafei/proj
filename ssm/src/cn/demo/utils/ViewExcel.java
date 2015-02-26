package cn.demo.utils;

import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.web.servlet.view.document.AbstractExcelView;

import cn.demo.enties.Demo;
public class ViewExcel extends AbstractExcelView {
	@Override
	protected void buildExcelDocument(Map<String, Object> obj,
			HSSFWorkbook workbook, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
        try {
            OutputStream ouputStream = response.getOutputStream();   
        	//获取中文xls文件名  开始
        	String filename = "用户行为轨迹.xls";
        	String newFileName = "";
        	String agent = request.getHeader("USER-AGENT");    
	    	 if((agent != null) && (-1 != agent.indexOf("MSIE"))){//IE浏览器
	    		
	    		 newFileName = URLEncoder.encode(filename,"UTF8");
	         }else if((agent != null) && (-1 != agent.indexOf("Mozilla"))){//google,火狐浏览器
	        	 newFileName = new String(filename.getBytes(), "ISO8859-1");
	        	
	         }else{
	        	 newFileName = URLEncoder.encode(filename,"UTF8");//其他浏览器
	         }
            response.setHeader("Content-Disposition", "attachment;filename=\"" + newFileName+"\"");
            response.setContentType("application/vnd.ms-excel"); 
            List<Demo> ublst=(List<Demo> )obj.get("list");
        	HSSFSheet sheet = workbook.createSheet("用户行为轨迹"); 
        	sheet.setDefaultColumnWidth(12);
        	sheet.setFitToPage(true);
        	sheet.autoSizeColumn(3);
        	HSSFCellStyle cellStyle = workbook.createCellStyle();
        	cellStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN); 
        	cellStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        	cellStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
        	cellStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
        	cellStyle.setWrapText(true);
        	
        	Row row = sheet.createRow(0);
        	row.createCell(0).setCellValue("手机号码");  
        	row.createCell(1).setCellValue("用户IP");
        	row.createCell(2).setCellValue("页面名称");
        	row.createCell(3).setCellValue("URL");
        	row.createCell(4).setCellValue("页面响应时间(ms)");
        	row.createCell(5).setCellValue("HTTP状态码");
        	row.createCell(6).setCellValue("访问时间");
    		Cell cell = null;
            if(ublst!=null && !ublst.isEmpty()){
                for(int i=0; i<ublst.size(); i++){
                	row = sheet.createRow(i+1);
                	cell = row.createCell(0);
                	cell.setCellValue(UserHaviorUtil.isMoible(ublst.get(i).getPhone())?ublst.get(i).getPhone():"未知");
                	cell = row.createCell(1);
                	cell.setCellValue(UserHaviorUtil.getIp(ublst.get(i).getSrc_ip()));
                	cell = row.createCell(2);
                	cell.setCellValue(ublst.get(i).getName());
                	cell = row.createCell(3);
                	cell.setCellValue(ublst.get(i).getUrl());
                	cell = row.createCell(4);
                	cell.setCellValue(ublst.get(i).getResp_time());
                	cell = row.createCell(5);
                	cell.setCellValue(ublst.get(i).getHttp_status());
                	cell = row.createCell(6);
                	cell.setCellValue(ublst.get(i).getVisit_start_time().toLocaleString());
                	row = null;
                }
            }
            //response.setContentLength(workbook.getBytes().length);
            response.setHeader("Cache-Control", "no-cache");
            response.setHeader("Pragma",  "no-cache");
            response.setHeader("Expires", "0");
            workbook.write(ouputStream);
            ouputStream.flush();   
            ouputStream.close();  
        } catch (Exception e) {
            System.out.println(e);
        }
		
        }
	
}
