package com.gy.barter.model;

import java.sql.Timestamp;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "barter_things")
public class Things {

	private long id;
	private String price;
	private String des;
	private String have;
	private String want;
	private String condition;
	private long city_id;
	private long user_id;

	private Timestamp createTime;
	
	private Set<Pics> picList;

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	
	@Column(name = "price")
	public String getPrice() {
		return price;
	}
	
	public void setPrice(String price) {
		this.price = price;
	}
	
	@Column(name = "t_des")
	public String getDes() {
		return des;
	}
	public void setDes(String des) {
		this.des = des;
	}
	
	@Column(name = "t_have")
	public String getHave() {
		return have;
	}
	public void setHave(String have) {
		this.have = have;
	}
	
	@Column(name = "t_want")
	public String getWant() {
		return want;
	}
	public void setWant(String want) {
		this.want = want;
	}
	
	@Column(name = "t_condition")
	public String getCondition() {
		return condition;
	}
	public void setCondition(String condition) {
		this.condition = condition;
	}
	
	@Column(name = "city_id")
	public long getCity_id() {
		return city_id;
	}
	public void setCity_id(long city_id) {
		this.city_id = city_id;
	}
	
	@Column(name = "user_id")
	public long getUser_id() {
		return user_id;
	}
	public void setUser_id(long user_id) {
		this.user_id = user_id;
	}
	
	@Column(name = "createTime")
	public Timestamp getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}
	
	
	/**@OneToMany(mappedBy="people")不可与@JoinColumn同时使用,使用mappedBy会在多的一端自动生成外键.
	 * @JoinColumn(name="thing_id")指定多的一端的外键,在多的一端也必须这样设置,否则会生成多个外键.
	 */
	@OneToMany
	@JoinColumn(name="thing_id")
	public Set<Pics> getPicList() {
		return picList;
	}
	public void setPicList(Set<Pics> picList) {
		this.picList = picList;
	}
	
	
}
