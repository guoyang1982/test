<%@ page contentType="text/html;charset=GBK"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Insert title here</title>
<link href="/css/default.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="${contextPath}/swfupload/swfupload.js"></script>
    <script type="text/javascript" src="${contextPath}/swfupload/swfupload.queue.js"></script>
    <script type="text/javascript" src="${contextPath}/swfupload/fileprogress.js"></script>
    <script type="text/javascript" src="${contextPath}/js/jquery1.4.2.js"></script>
        <script type="text/javascript" src="${contextPath}/js/json2.js"></script>
    
	<script type="text/javascript" src="${contextPath}/swfupload/handlers.js" charset="gb2312"></script>
	<script type="text/javascript">
		var swfu;
		var index=0;
		window.onload = function () {
			swfu = new SWFUpload({
				// Backend Settings
				upload_url: "/front/upload.do",
                post_params : {
                    "ASPSESSID" : ""
                },
                file_post_name: "file",

				// File Upload Settings
				file_size_limit : 1024,
				file_types : "*.jpg",
				file_types_description : "JPG Images",
				file_upload_limit : 6,    // Zero means unlimited

				// Event Handler Settings - these functions as defined in Handlers.js
				//  The handlers are not part of SWFUpload but are part of my website and control how
				//  my website reacts to the SWFUpload events.

                
                file_queue_error_handler : fileQueueError,
				file_dialog_complete_handler : fileDialogComplete,
				upload_progress_handler : uploadProgress,
				upload_error_handler : uploadError,
				upload_success_handler : uploadSuccess,
				upload_complete_handler : uploadComplete,

				// Button settings
				button_image_url : "${contextPath}/images/uploadbutt.jpg",
				button_placeholder_id : "spanButtonPlaceholder",
				button_width: 89,
				button_height: 28,
				button_text : '<span class="button"> </span>',
				button_text_style : '.button { font-family: Helvetica, Arial, sans-serif; font-size: 16pt; } .buttonSmall { font-size: 10pt; }',
				button_text_top_padding: 2,
				button_text_left_padding: 5,

				// Flash Settings
				flash_url : "${contextPath}/swfupload/swfupload.swf",	// Relative to this file

				custom_settings : {
					upload_target : "divFileProgressContainer"
				},

				// Debug Settings
				debug: false
			});
		}
		
		function setCover(id){
		e = $('#'+id);
		//e1 = $("#SWFUpload_0_0");
		e1 = $("#file_0");
		//alert(e.attr("src"));
		//alert(e1.attr("src"));
		t = e1.attr("src");
		e1.attr("src",e.attr("src"));
		e.attr("src",t);
		
		var str = $("#input_upload_image").val();		
		var myobj=eval(str);
		for(var i=0;i<myobj.length;i++){   
 
   			if(myobj[i].id == id){
   			//alert(id);
   				t1 = myobj[0].imageUrl;
   				myobj[0].imageUrl = myobj[i].imageUrl;
   				myobj[i].imageUrl = t1;
   			}  
		}
		
		var aToStr=JSON.stringify(myobj);
		
		$("#input_upload_image").val(aToStr);
		
		}
		
		function change(id){
			
			//var a = '[{"id":"2","name":"tt","street":[{"id":"121","name":"呵呵1"},{"id":"12","name":"呵呵"}]},{"id":"3","name":"tt2","street":[{"id":"1222","name":"呵呵22"},{"id":"1222","name":"呵呵22"}]}]';
			
			var a = ${jsonCity};
			
			var obj = eval(a);

			var streets = document.getElementById("street");
			streets.length = 0;
			streets[0]=new Option("--请选择--","");
			for(var i=0;i<obj.length;i++){
			
			if(obj[i].id==id){
				objSt = obj[i].street;
				for(var j =0;j<objSt.length;j++){
					//bz[0]=new Option("--请选择--",0);
					streets[j+1] = new Option(objSt[j].name,objSt[j].id);
					
				}
			}
			
			}
		}
	</script>
</head>
<body>
publish

<form name="form" runat="server">

<input type="hidden" value="111" name="picsInfor" id="picsInfor">

<table cellspacing="0" cellpadding="0" border="0" width="980px;">
                <tbody>

                <tr id="id_tr_my_res" style="">
                    <td><i> * </i></td>
                    <td>我有</td>
                    <td>
                    <input value="" name="my_res" type="text" id="id_my_res" class="input1" maxlength="20" size="45">

                    </td>
                </tr>
                <tr id="id_tr_yours_res" style="">
                    <td><i> * </i></td>
                    <td>想换</td>
                    <td>
                    <input value="" name="yours_res" type="text" class="input1" maxlength="8" size="20">
                    </td>
                </tr>

                <tr id="id_tr_price" style="">
                    <td><i> * </i></td>
                    <td>价格</td>
                    <td>
                       <input value="" name="price" type="text" id="id_price" size="4" maxlength="6" class="input2">
                      &nbsp;元
                    </td>
                </tr>

                <tr>
                    <td valign="top"><i> * </i></td>
                    <td valign="top">描述</td>
                    <td>
                        <table cellspacing="0" cellpadding="0" border="0" class="normal">
                            <tbody><tr>
                                 <td>
                                      <textarea name="description" type="textarea" id="id_description" class="textarea1" rows="6" autocomplete="off"></textarea>
                                 </td>
                            </tr>
                        </tbody>
                        </table>
                    </td>
                </tr>

                <tr>
                    <td valign="top">&nbsp;</td>
                    <td valign="top">上传照片</td>
                     <td style="width:660px;">
                        <div id="left">		
	    					<div id="swfu_container" style="margin: 0px 10px;">
		    				<div>
								<span id="spanButtonPlaceholder"></span>
		    				</div>
		    				<div id="divFileProgressContainer" style="height: 75px; display:inline;"></div>
		    				<div id="thumbnails" >
		  

		    				</div>
	   						</div>
	   
						</div>
                        <input id="input_upload_image" type="hidden" name="images" value="[]">
                    </td>
                </tr>
                <tr id="id_tr_district">
                    <td width="2%"><i> * </i></td>
                    <td width="10%">地点</td>
                    <td width="88%">
                        <span>
                        <select name="district" type="select" id="district" onChange="change(document.form.district.options[document.form.district.selectedIndex].value)">
							
							<option value="">--请选择--</option>
							
							<c:forEach  var="towCity" items="${towCityList}" varStatus="status">								
							
								<option value="${towCity.id}">${towCity.name}</option>
								
							</c:forEach>

						</select>
                        <select name="street" type="select" id="street" autocomplete="off">

							<option value="">--请选择--</option>
						</select>
                        </span>
                       <span id="tip_span_district"><span class="validatorMsg validatorValid">&nbsp;</span></span>
                    </td>
                </tr>

                <tr>
                    <td><i> * </i></td>
                    <td>联系电话</td>
                    <td width="88%">
                        <input value="" name="phone" type="text" id="id_phone" size="20" class="input1" maxlength="30">
                        <span class="tips_wrap"><span id="tip_span_phone"></span></span></td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>QQ号</td>
                    <td width="88%">
                        <input value="" name="im" type="text" size="20" class="input1" maxlength="30">
                        <span class="tips_wrap"><span id="tip_span_im"></span></span></td>
                </tr>


                <tr>
                    <td><i> * </i></td>
                    <td>联系人</td>
                    <td><input value="" name="person" type="text" size="20" class="input1" maxlength="6">
                    <span id="tip_span_person"></span>
                    </td>
                </tr>




                <tr>
                    <td>&nbsp;</td>
                    <td></td>
                    <td id="submiting">
                        <input type="hidden" value="" name="yanbao_type">
                        <input id="pub_submit" type="submit" class="btn-style2" value="注册后发布" gjalog="/wu_login_hint/login@atype=click">&nbsp;&nbsp;<input style="" type="submit" value="注册并置顶发布" class="btn-style1" id="sticky_submiting_btn">
                    </td>

                    
                </tr>

            </tbody>
</table>
            
            
            

    </form>
</body>
</html>