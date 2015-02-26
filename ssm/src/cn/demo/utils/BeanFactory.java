package cn.demo.utils;

import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;

public class BeanFactory {

	private static Logger logger =  Logger.getLogger(BeanFactory.class);
	
	/**
	 * 对象map
	 */
	private static Map<String,Object> beanMap = new HashMap<String,Object>();

	/**
	 * 获取类对象的方法
	 * @param clazz 
	 * @return 返回类的实体对象
	 */
	public static Object getBean(Class clazz) {
		Object instance = null;
		try {
			if (beanMap.containsKey(clazz.getName())) {
				return beanMap.get(clazz.getName());
			} else {
				instance = clazz.newInstance();
				beanMap.put(clazz.getName(), instance);
			}
		} catch (InstantiationException e) {
			logger.error("InstantiationException was captered when getBean:"+clazz.getName(),e);
		} catch (IllegalAccessException e) {
			logger.error("IllegalAccessException was captered when getBean:"+clazz.getName(),e);
		}
		return instance;
	}

}
