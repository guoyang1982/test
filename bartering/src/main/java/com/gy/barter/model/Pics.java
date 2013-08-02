package com.gy.barter.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "barter_pic")
public class Pics {

	private long id;
	private String url;
	private long thing_id;
	private String ifcover;
	
	private Things thing;
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	
	
	@Column(name = "url")
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	
//	@Column(name = "thing_id")
//	public long getThing_id() {
//		return thing_id;
//	}
//	public void setThing_id(long thing_id) {
//		this.thing_id = thing_id;
//	}
	
	@Column(name = "ifcover")
	public String getIfcover() {
		return ifcover;
	}
	public void setIfcover(String ifcover) {
		this.ifcover = ifcover;
	}
	
	@ManyToOne
	@JoinColumn(name="thing_id")//同一的一端一样
	public Things getThing() {
		return thing;
	}
	public void setThing(Things thing) {
		this.thing = thing;
	}
	
	
}
