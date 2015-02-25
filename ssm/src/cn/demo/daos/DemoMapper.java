package cn.demo.daos;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import cn.demo.enties.Demo;
import cn.demo.utils.page.PageInfo;

public interface DemoMapper {


	List<Demo> getListPage(@Param("bh")Demo hb,@Param("page")PageInfo page);
	Demo detail(Integer id);
	List<Demo> export();
}
