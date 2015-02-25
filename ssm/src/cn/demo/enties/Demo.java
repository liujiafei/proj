package cn.demo.enties;

import java.io.Serializable;
import java.util.Date;

import cn.demo.utils.BaseEntity;

public class Demo extends BaseEntity implements Serializable{
	private Integer id;  
	private String phone;
	private String src_ip;
    private String name;
	private String url;
	private String imsi;
	private Integer resp_time;
    private String http_status;
    private Date visit_start_time;
    
    private String province;
    private String city;
    private String isp;
    private String sessionid;
    private Integer server_time;
    private Integer net_time;
    private String browser_v;
    private String ops;
    private String terminal;
    private String client_v;
    private String content_encoding;
    private String username;
    private String cache_filename;
    
    private String startTime;
    private String endTime;
	@Override
	public String toString() {
		return "PageResult [id=" + id + ", name=" + name + ", http_status="
				+ http_status + "]";
	}
    
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getSrc_ip() {
		return src_ip;
	}
	public void setSrc_ip(String src_ip) {
		this.src_ip = src_ip;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public Integer getResp_time() {
		return resp_time;
	}
	public void setResp_time(Integer resp_time) {
		this.resp_time = resp_time;
	}
	public String getHttp_status() {
		return http_status;
	}
	public void setHttp_status(String http_status) {
		this.http_status = http_status;
	}
	public Date getVisit_start_time() {
		return visit_start_time;
	}
	public void setVisit_start_time(Date visit_start_time) {
		this.visit_start_time = visit_start_time;
	}

	public String getImsi() {
		return imsi;
	}

	public void setImsi(String imsi) {
		this.imsi = imsi;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getIsp() {
		return isp;
	}

	public void setIsp(String isp) {
		this.isp = isp;
	}

	public String getSessionid() {
		return sessionid;
	}

	public void setSessionid(String sessionid) {
		this.sessionid = sessionid;
	}

	public Integer getServer_time() {
		return server_time;
	}

	public void setServer_time(Integer server_time) {
		this.server_time = server_time;
	}

	public Integer getNet_time() {
		return net_time;
	}

	public void setNet_time(Integer net_time) {
		this.net_time = net_time;
	}

	public String getBrowser_v() {
		return browser_v;
	}

	public void setBrowser_v(String browser_v) {
		this.browser_v = browser_v;
	}

	public String getOps() {
		return ops;
	}

	public void setOps(String ops) {
		this.ops = ops;
	}

	public String getTerminal() {
		return terminal;
	}

	public void setTerminal(String terminal) {
		this.terminal = terminal;
	}

	public String getClient_v() {
		return client_v;
	}

	public void setClient_v(String client_v) {
		this.client_v = client_v;
	}

	public String getContent_encoding() {
		return content_encoding;
	}

	public void setContent_encoding(String content_encoding) {
		this.content_encoding = content_encoding;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getCache_filename() {
		return cache_filename;
	}

	public void setCache_filename(String cache_filename) {
		this.cache_filename = cache_filename;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	
    
}
