package cn.demo.utils;

import java.io.IOException;

import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;


public class PasswdEncodePropertyPlcaceholder extends
		PropertyPlaceholderConfigurer {

	private BASE64Decoder decode = new BASE64Decoder();
	private static BASE64Encoder encode = new BASE64Encoder();
	private String decode(String value) throws IOException{
		return new String(decode.decodeBuffer(new String(decode.decodeBuffer(value))));
	}
	
	public static String encode(String value){
		
		String key1 = encode.encode(value.getBytes());
		String key2 = encode.encode(key1.getBytes());
		return key2;
	}
	
	@Override
	protected String convertProperty(String propertyName, String propertyValue) {
		if("passwd".equalsIgnoreCase(propertyName)||"password".equalsIgnoreCase(propertyName)){
			try {
				propertyValue = decode(propertyValue);
			} catch (IOException e) {
				
			}
		}
		return super.convertProperty(propertyName, propertyValue);
	}
	
	public static void main(String[] args) throws IOException {
		System.out.println(encode("yand"));
		
	}
	
}
