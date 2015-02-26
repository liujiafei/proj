package cn.demo.utils;

import java.util.Date;

public class BaseEntity {
	//返回到客户端中的json包含多个数据源时，用于区别不同的数据源
    private String EntityName="";
    public String getEntityName()
    {
        return EntityName;
    }
    public void setEntityName(String entityname) {
        this.EntityName = entityname;
    }

    //当前页
    private int CurrentPage;
    public int getCurrentPage()
    {
        return CurrentPage;
    }
    public void setCurrentPage(int currentpage)
    {
    	this.CurrentPage= currentpage;
    }
    //总页数
    private int TotalPage;
    public int getTotalPage()
    {
        return TotalPage;
    }
    public void setTotalPage(int totalpage)
    {
    	this.TotalPage=  totalpage;
    }
    //每页记录数
    private int PageSize;
    public int getPageSize()
    {
        return PageSize;
    }
    public void setPageSize(int pagesize)
    {
    	this.PageSize = pagesize;
    }
    //总记录数
    private int TotalRecord;
    public int getTotalRecord()
    {
        return TotalRecord;
    }
    public void setTotalRecord(int totalrecord)
    {
    	this.TotalRecord= totalrecord;
    }
    //token
    private String AuthToken;
    public String getAuthToken()
    {
        return AuthToken;
    }
    public void setAuthToken(String authtoken)
    {
    	this.AuthToken = authtoken;
    }
    //开始查询日期
    private Date SearchStartDate;
    public Date getSearchStartDate() {
    	return SearchStartDate;
    }

    public void setSearchStartDate(Date searchstartdate) {
        this.SearchStartDate = searchstartdate;
    }
    //结束查询日期
    private Date SearchEndDate;
    public Date getSearchEndDate() {
    	return SearchEndDate;
    }

    public void setSearchEndDate(Date searchsenddate) {
        this.SearchEndDate = searchsenddate;
    }
    
    //查询内容
    private String SearchContent;
	public String getSearchContent() {
		return SearchContent;
	}
	public void setSearchContent(String searchContent) {
		SearchContent = searchContent;
	}
	
	//业务标识
	private int businessId;
	public int getBusinessId() {
		return businessId;
	}
	public void setBusinessId(int businessId) {
		this.businessId = businessId;
	}
    
}
