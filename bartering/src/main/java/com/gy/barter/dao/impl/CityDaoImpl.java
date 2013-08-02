package com.gy.barter.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.gy.barter.dao.CityDao;
import com.gy.barter.model.Citys;

/**
 * 
 * @author guoyang
 *
 */
public class CityDaoImpl extends HibernateDaoSupport implements CityDao{

	public List<Citys> getTowCateById(String id){
		
		 String sql = "from Citys c where c.cate_rela = '|"+id+"|'";
		 List<Citys> list = null;
//		 Session session = null;
//			 try {
//				 session = getSession();
//				 Query query = session.createQuery(sql);
//		         query.setCacheable(true);
//
//				 list = query.list();
//
//			 } finally {
//				 if (session != null) {
//					 session.close();
//				 }
//			 }
			 
			 getHibernateTemplate().setCacheQueries(true);
			 list = getHibernateTemplate().find(sql); 
			 
			// System.out.println(list);
			 

			 return list;
		}

	@Override
	public List<Citys> getThreeCateById(String oneId,String id) {
		// TODO Auto-generated method stub
		
		 String sql = "from Citys c where c.cate_rela = '|"+oneId+"|"+id+"|'";
		 List<Citys> list = null;
			 
			 getHibernateTemplate().setCacheQueries(true);
			 list = getHibernateTemplate().find(sql); 			 

			 return list;
			 
	}
}
