package com.gy.barter.dao;

import java.util.List;

import com.gy.barter.model.Citys;

/**
 * 
 * @author guoyang
 *
 */
public interface CityDao {

	List<Citys> getTowCateById(String id);
	
	List<Citys> getThreeCateById(String oneId,String id);

}
