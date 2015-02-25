package cn.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.demo.daos.DemoMapper;
import cn.demo.enties.Demo;
import cn.demo.utils.page.PageInfo;

@Service
@Transactional
public class DemoService {

	private DemoMapper userSensitiveMapper;

	@Autowired
	public void setUserSensitiveMapper(DemoMapper userSensitiveMapper) {
		this.userSensitiveMapper = userSensitiveMapper;
	}


	@Transactional(readOnly=true)
	public List<Demo> getlistdata(Demo bh,PageInfo page){
		return userSensitiveMapper.getListPage(bh, page);
	}
	@Transactional(readOnly=true)
	public Demo detail(Integer id){
		return userSensitiveMapper.detail(id);
	}
	@Transactional(readOnly=true)
	public List<Demo> export(){
		return userSensitiveMapper.export();
	}
}
