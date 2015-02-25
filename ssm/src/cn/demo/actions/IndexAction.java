package cn.demo.actions;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller 
public class IndexAction {

	
	
	
	public IndexAction(){
		
	}
	
	@RequestMapping ( "/index" )
	public void index(){
		System.out.println("index.jsp");
	
	}
	
}
