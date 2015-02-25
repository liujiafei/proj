package cn.demo.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UserHaviorUtil {

	private String prefixPath;
	private String encoding;
	public String getPrefixPath() {
		return prefixPath;
	}
	public void setPrefixPath(String prefixPath) {
		this.prefixPath = prefixPath;
	}
	public String getEncoding() {
		return encoding;
	}
	public void setEncoding(String encoding) {
		this.encoding = encoding;
	}
	
	public String getContent(String filePath,String seperate){
		StringBuffer sb = new StringBuffer();
		try {
			if(null==encoding) encoding="utf-8";
	        File file=new File(getPrefixPath()+filePath);
	        if(file.isFile() && file.exists()){ //判断文件是否存在
	            InputStreamReader read = new InputStreamReader(
	            new FileInputStream(file),encoding);//考虑到编码格式
	            BufferedReader bufferedReader = new BufferedReader(read);
	            String lineTxt = null;
	            while((lineTxt = bufferedReader.readLine()) != null){
	          	  sb.append(lineTxt).append("<br/>");
	            }
	            read.close();
	            String xxx = sb.toString();
	            if(null!=seperate&&!seperate.equals("")){
	                xxx = xxx.substring(xxx.indexOf(seperate)+seperate.length());  
	                xxx = xxx.substring(0,xxx.indexOf(seperate));    
	            }
	            return xxx;
	        }else{
	        	  System.out.println("找不到指定的文件");
	        	  return "";	  
	        }	
      } catch (Exception e) {
          System.out.println("读取文件内容出错");
          e.printStackTrace();
      }
		return sb.toString();
	}
	public static String getIp(String srcIp){
		Long iip = 0l;
		if(null!=srcIp&&!srcIp.equals("")){
			iip = Long.parseLong(srcIp);
			 return(((iip & 0xff000000) >> 24)+"."+((iip & 0x00ff0000) >> 16)+"."+((iip & 0x0000ff00) >> 8)+"."+(iip & 0x000000ff));
		}else{
			return srcIp;	
		}
	}
	public static String changeIp(String srcIp){
		Long iip = 0l;
		Integer v = 0;
		if(null!=srcIp&&!srcIp.equals("")){
			String[] kv = srcIp.split("\\.");
			if(kv.length==4){
				iip =((Long.parseLong(kv[0]) << 24))+((Long.parseLong(kv[1])  << 16))+((Long.parseLong(kv[2])  << 8))+(Long.parseLong(kv[3]));
				iip = iip & 0x0ffffffff;		
			}
			return iip.toString();
		}else{
			return srcIp;	
		}
	}
	public static String getISPTxt(String type){
		if(type!=null&&!type.equals("")){
			if(type.equals("0")){
				return "未知";
			}else if(type.equals("1")){
				return "电信";
			}else if(type.equals("2")){
				return "联通";
			}else if(type.equals("3")){
				return "移动";
			}else if(type.equals("4")){
				return "教育网";
			}else if(type.equals("5")){
				return "铁通";
			}else if(type.equals("6")){
				return "网通";
			}
			return "未知";
		}else{
			return "未知";
		}
	}
	public static boolean isMoible(String phone){
			Pattern p = Pattern.compile("^((13[0-9])|(15[^4,\\D])|(18[0-9]))\\d{8}$");
			Matcher m = p.matcher(phone);
			return m.matches();
	}
	public static String formatStrDate(String strDate){
		return null;
	}
}
