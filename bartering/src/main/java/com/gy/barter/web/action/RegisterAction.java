package com.gy.barter.web.action;

import org.springframework.stereotype.Controller;
import com.opensymphony.xwork2.ActionSupport;

@Controller("registerAction")
public class RegisterAction extends ActionSupport{

	public String register() {

		message = "dddddddddddddd";

		return SUCCESS;
	}
	
	   private String message;
	   
	   public String getMessage() {
	       return message;        
	   }
}
