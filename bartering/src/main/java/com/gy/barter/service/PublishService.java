package com.gy.barter.service;

import java.util.List;

import com.gy.barter.model.Citys;

public interface PublishService {

	List<Citys> getTowCateById(String id);

	String getCategoryJson(List<Citys> citys,String id);
}
