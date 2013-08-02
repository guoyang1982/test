package com.gy.barter.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "barter_city")
public class Citys {

	private Long id;
	private String name;
	private int cate_type;
	private String cate_rela;
	private String ifchilden;
	
	private String e_name;
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	@Column(name = "name")
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@Column(name = "cate_type")
	public int getCate_type() {
		return cate_type;
	}
	public void setCate_type(int cate_type) {
		this.cate_type = cate_type;
	}
	
	@Column(name = "cate_rela")
	public String getCate_rela() {
		return cate_rela;
	}
	public void setCate_rela(String cate_rela) {
		this.cate_rela = cate_rela;
	}
	
	@Column(name = "ifchilden")
	public String getIfchilden() {
		return ifchilden;
	}
	public void setIfchilden(String ifchilden) {
		this.ifchilden = ifchilden;
	}
	
	@Column(name = "e_name")
	public String getE_name() {
		return e_name;
	}
	public void setE_name(String e_name) {
		this.e_name = e_name;
	}
	
}
