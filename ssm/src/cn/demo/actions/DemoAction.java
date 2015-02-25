package cn.demo.actions;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.demo.enties.Demo;
import cn.demo.services.DemoService;
import cn.demo.utils.BaseResult;
import cn.demo.utils.BeanFactory;
import cn.demo.utils.UserHaviorUtil;
import cn.demo.utils.ViewExcel;
import cn.demo.utils.page.PageInfo;

@Controller
@RequestMapping("/qos")
public class DemoAction {

	private UserHaviorUtil userHaviorUtil;
	private DemoService userSensitiveService;
	@Autowired
	public void setUserSensitiveService(DemoService userSensitiveService) {
		this.userSensitiveService = userSensitiveService;
	}
	@Autowired
	public void setUserHaviorUtil(UserHaviorUtil userHaviorUtil) {
		this.userHaviorUtil = userHaviorUtil;
	}

	/* 
	 * 用户行为轨迹 
	 */
	@RequestMapping("/locus")
	public String locus() {
		return "userSensitive/userBehavior";
	}
	@RequestMapping(value="/locus/listdata", method = RequestMethod.GET)
	@ResponseBody
	public BaseResult loadListData(String phone,String src_ip,String imsi,
			//@DateTimeFormat(pattern="yyyy-MM-dd")Date visit_start_time,
			String startTime,
			String endTime,
			@RequestParam(defaultValue="0")Integer curpage,
			@RequestParam(defaultValue="20")Integer pagesize){
		BaseResult result = new BaseResult();		
		Demo bh = (Demo)BeanFactory.getBean(Demo.class);
		bh.setStartTime(startTime);
		bh.setEndTime(endTime);
		if(phone!=null&&!"".equals(phone)){
			bh.setPhone(phone);
		}
		if(src_ip!=null&&!"".equals(src_ip)){
			bh.setSrc_ip(UserHaviorUtil.changeIp(src_ip));
		}
		if(imsi!=null&&!"".equals(imsi)){
			bh.setImsi(imsi);
		}
		
		PageInfo page = new PageInfo(curpage,pagesize);
		
		try {
			List<Demo> datas = userSensitiveService.getlistdata(bh, page);
			for(Demo oo:datas){
					oo.setSrc_ip(UserHaviorUtil.getIp(oo.getSrc_ip()));
					if(!UserHaviorUtil.isMoible(oo.getPhone()))oo.setPhone("未知");
			}
			result.setJSON(datas);
			result.setCurrent(page.getCurrentPage());
			result.setTotal(page.getTotalResult());
		} catch (Exception e) {
			result.setRetCode(500);
			result.setMsg(e.getMessage());
		}
		return result;
	}
	
	@RequestMapping(value="/locus/detail", method = RequestMethod.GET)
	public ModelAndView detail(Integer id) {
		ModelAndView ma = new ModelAndView("userSensitive/userBehaviorDetail");
		Demo obj = userSensitiveService.detail(id);
		obj.setSrc_ip(UserHaviorUtil.getIp(obj.getSrc_ip()));
		obj.setIsp(UserHaviorUtil.getISPTxt(obj.getIsp()));
		if(!UserHaviorUtil.isMoible(obj.getPhone()))obj.setPhone("未知");
		if(obj.getSessionid()!=null&&obj.getSessionid().equals("-1"))obj.setSessionid("未知");
		if(obj.getProvince().equals("未知")){
			obj.setCity("");
		}else{
		   if(obj.getCity()!=null&&obj.getCity().indexOf("市")<0){
			   obj.setCity(obj.getCity()+"市");
		   }
		}
		ma.addObject("obj", obj);
		return ma;
	}
	@RequestMapping(value="/locus/detail", method = RequestMethod.POST)
	@ResponseBody
	public String detail(String filePath,String seperate){
		String ret = userHaviorUtil.getContent(filePath,seperate);
		if(ret==null||ret.equals(""))ret="未知";
		return ret;
	}
	@RequestMapping(value="/locus/export",method=RequestMethod.GET)
	public ModelAndView exportXLS(ModelMap model,HttpServletRequest request){
	       List<Demo> ublst=userSensitiveService.export();
	       model.put("list", ublst);
	       ViewExcel viewExcel = new ViewExcel();  
	       return new ModelAndView(viewExcel, model); 
	
	}
}
