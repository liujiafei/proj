package cn.demo.utils;

public class BaseResult {
	private int RetCode;

    /// <summary>
    /// 返回结果状态
    /// </summary>
    public int getRetCode()
    {
        return RetCode;
    }
    public void setRetCode(int retcode)
    {
    	this.RetCode = retcode;
    }
    private String Msg;
    /// <summary>
    /// 对应结果状态描叙
    /// </summary>
    public String getMsg()
    {
        return Msg;
    }
    public void setMsg(String msg)
    {
    	this.Msg = msg;
    }
    private Object JSON;
    /// <summary>
    /// json格式信息集
    /// </summary>
    public Object getJSON()
    {
        return JSON;
    }
    public void setJSON(Object json)
    {
    	this.JSON = json;
    }
    private int Total;
    /// <summary>
    /// 总数
    /// </summary>
    public int getTotal()
    {
        return Total;
    }
    public void setTotal(int total)
    {
    	this.Total = total;
    }
    private int Current;

	public int getCurrent() {
		return Current;
	}
	public void setCurrent(int current) {
		Current = current;
	}
	private String SearchContent;

	public String getSearchContent() {
		return SearchContent;
	}
	public void setSearchContent(String searchContent) {
		SearchContent = searchContent;
	}

	
	
    
}
