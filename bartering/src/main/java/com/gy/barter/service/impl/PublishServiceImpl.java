package com.gy.barter.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gy.barter.dao.CityDao;
import com.gy.barter.model.Citys;
import com.gy.barter.service.PublishService;

@Service
public class PublishServiceImpl implements PublishService{

    @Autowired
    private CityDao cityDao;
	
	@Override
	public List<Citys> getTowCateById(String id) {
		// TODO Auto-generated method stub
		
		return cityDao.getTowCateById(id);
	}

	@Override
	public String getCategoryJson(List<Citys> citys,String id) {
		// TODO Auto-generated method stub
		
		StringBuffer json =new StringBuffer();
		
		//[{"id":"2","name":"tt","street":[{"id":"121","name":"最最1"},{"id":"12","name":"最最"}]},{"id":"3","name":"tt2","street":[{"id":"1222","name":"最最22"},{"id":"1222","name":"最最22"}]}]
		
		List list = new ArrayList();
		
		//json.append("[");
		for(Citys city:citys){
		//json
			Map map = new HashMap();
			
			map.put("id", city.getId());
			map.put("name", city.getName());
			
			List list2 = new ArrayList();
			
			List<Citys> listT = cityDao.getThreeCateById(id, Long.toString(city.getId()));
			for(Citys c:listT){
				Map map2 = new HashMap();
				map2.put("id", c.getId());
				map2.put("name", c.getName());
				
				list2.add(map2);
			}
			
			map.put("street", list2);
			
			list.add(map);
			
		}
		
		JSONArray jsonArray  = JSONArray.fromObject(list);
		
		//System.out.print(jsonArray);
		
		return jsonArray.toString();
	}

	
}
