function fileQueueError(file, errorCode, message) {
	try {
		var imageName = "error.gif";
		var errorName = "";
		if (errorCode === SWFUpload.errorCode_QUEUE_LIMIT_EXCEEDED) {
			errorName = "You have attempted to queue too many files.";
		}

		if (errorName !== "") {
			alert(errorName);
			return;
		}

		switch (errorCode) {
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
			imageName = "zerobyte.gif";
			break;
		case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
			imageName = "toobig.gif";
			break;
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
		case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
		case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
			message="上传图片超过最大数量!";
		default:
			alert(message);
			break;
		}

		addImage("/images/" + imageName);

	} catch (ex) {
		this.debug(ex);
	}

}

function fileDialogComplete(numFilesSelected, numFilesQueued) {
	try {
		if (numFilesQueued > 0) {
			this.startUpload();
		}
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadProgress(file, bytesLoaded) {

	try {
		var percent = Math.ceil((bytesLoaded / file.size) * 100);

		var progress = new FileProgress(file,  this.customSettings.upload_target);
		progress.setProgress(percent);
		if (percent === 100) {
			progress.setStatus("Creating thumbnail...");
			progress.toggleCancel(false, this);
		} else {
			progress.setStatus("Uploading...");
			progress.toggleCancel(true, this);
		}
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadSuccess(file, serverData) {
	try {
   
		var progress = new FileProgress(file,  this.customSettings.upload_target);

		progress.setStatus("上传成功");
		progress.toggleCancel(false);
		
		ss = $("#input_upload_image").val();
				
		var strObj={};
		strObj["id"]="file_"+index;
		strObj["imageUrl"]=serverData;
		if(index==0){
			
			strObj["is_covert"]="true";
		
		}else{
			
			strObj["is_covert"]="false";

		}
		

		var myobj=eval(ss);  
			
		myobj.push(strObj);
		
		var aToStr=JSON.stringify(myobj);
		
		$("#input_upload_image").val(aToStr);
		
		if(index==0){
			var picCover = document.createElement("div");
			picCover.align="center";
			picCover.id="v_"+file.id;
			picCover.appendChild(document.createTextNode("封面"));
			progress.setElenments(picCover);
		}else{
			var picCover = document.createElement("div");
			picCover.align="center";
			picCover.id="v_"+file.id;
			var ele = document.createElement("a");
			//ele.href="javascript:setCover("+file.id+")";
			ele.href="javascript:setCover('file_"+index+"')";

			ele.innerHTML="设为封面";
			ele.style.color="red";
			picCover.appendChild(ele);
			
			progress.setElenments(picCover);
		}
		
		index = index+1;
        progress.setImg("http://127.0.0.1:808/upload/"+serverData);

	} catch (ex) {
		this.debug(ex);
	}
}

function uploadComplete(file) {
	try {
		/*  I want the next upload to continue automatically so I'll call startUpload here */
		if (this.getStats().files_queued > 0) {
			this.startUpload();
		} else {
			var progress = new FileProgress(file,  this.customSettings.upload_target);
			progress.setComplete();
			progress.setStatus("上传成功！.");
			progress.toggleCancel(false);
		}
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadError(file, errorCode, message) {
	var imageName =  "error.gif";
	var progress;
	try {
		switch (errorCode) {
		case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
			try {
				progress = new FileProgress(file,  this.customSettings.upload_target);
				progress.setCancelled();
				progress.setStatus("Cancelled");
				progress.toggleCancel(false);
			}
			catch (ex1) {
				this.debug(ex1);
			}
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
			try {
				progress = new FileProgress(file,  this.customSettings.upload_target);
				progress.setCancelled();
				progress.setStatus("Stopped");
				progress.toggleCancel(true);
			}
			catch (ex2) {
				this.debug(ex2);
			}
		case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
			imageName = "uploadlimit.gif";
			break;
		default:
			alert(message);
			break;
		}

		addImage("/images/" + imageName);

	} catch (ex3) {
		this.debug(ex3);
	}

}


function addImage(src) {
	var newImg = document.createElement("img");
	newImg.style.margin = "5px";

	document.getElementById("thumbnails").appendChild(newImg);
	if (newImg.filters) {
		try {
			newImg.filters.item("DXImageTransform.Microsoft.Alpha").opacity = 0;
		} catch (e) {
			// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
			newImg.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + 0 + ')';
		}
	} else {
		newImg.style.opacity = 0;
	}

	newImg.onload = function () {
		fadeIn(newImg, 0);
	};
	newImg.src =src;
}

function showImage(src,file) {
	var newImg = document.createElement("img");
	newImg.style.margin = "5px";
newImg.src =src;
	newImg.id=file.id;
	document.getElementById("thumbnails").appendChild(newImg);
//	if (newImg.filters) {
//		try {
//			newImg.filters.item("DXImageTransform.Microsoft.Alpha").opacity = 0;
//		} catch (e) {
//			// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
//			newImg.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + 0 + ')';
//		}
//	} else {
//		newImg.style.opacity = 0;
//	}

//	newImg.onload = function () {
//		fadeIn(newImg, 0);
//	};
	
}
function cancelUpload()
{
   var obj=document.getElementById("SWFUpload_0_0")
   document.getElementById("thumbnails").removeChild(obj);
}
function fadeIn(element, opacity) {
	var reduceOpacityBy = 5;
	var rate = 30;	// 15 fps


	if (opacity < 100) {
		opacity += reduceOpacityBy;
		if (opacity > 100) {
			opacity = 100;
		}

		if (element.filters) {
			try {
				element.filters.item("DXImageTransform.Microsoft.Alpha").opacity = opacity;
			} catch (e) {
				// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
				element.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + opacity + ')';
			}
		} else {
			element.style.opacity = opacity / 100;
		}
	}

	if (opacity < 100) {
		setTimeout(function () {
			fadeIn(element, opacity);
		}, rate);
	}
}



/* ******************************************
 *	FileProgress Object
 *	Control object for displaying file info
 * ****************************************** */

function FileProgress(file, targetID) {
	this.fileProgressID = "divFileProgress"+file.id;	
	this.fileProgressWrapper = document.getElementById(this.fileProgressID);
	if (!this.fileProgressWrapper) {
		//this.fileProgressWrapper = document.createElement("li");
		this.fileProgressWrapper = document.createElement("div");

		this.fileProgressWrapper.className = "progressWrapper";
		this.fileProgressWrapper.id = this.fileProgressID;

		this.fileProgressElement = document.createElement("div");
		this.fileProgressElement.className = "progressContainer";

		var progressCancel = document.createElement("a");
		progressCancel.className = "progressCancel";
		progressCancel.href = "#";
		progressCancel.style.visibility = "visible";
		progressCancel.appendChild(document.createTextNode(" X "));

		var progressText = document.createElement("div");
		progressText.className = "progressName";
		progressText.appendChild(document.createTextNode(""));

		var progressBar = document.createElement("div");
		progressBar.className = "progressBarInProgress";

		var progressStatus = document.createElement("div");
		progressStatus.className = "progressBarStatus";
		progressStatus.innerHTML = "&nbsp;";
        
        var progressImg = document.createElement("img");
        progressImg.style.width = "105px";
        //progressImg.id=file.id;
        progressImg.id="file_"+index;
        

        
		this.fileProgressElement.appendChild(progressCancel);
		this.fileProgressElement.appendChild(progressText);
		this.fileProgressElement.appendChild(progressStatus);
		this.fileProgressElement.appendChild(progressBar);
        this.fileProgressElement.appendChild(progressImg);
                
		this.fileProgressWrapper.appendChild(this.fileProgressElement);

		document.getElementById(targetID).appendChild(this.fileProgressWrapper);
		fadeIn(this.fileProgressWrapper, 0);

	} else {
		this.fileProgressElement = this.fileProgressWrapper.firstChild;
		this.fileProgressElement.childNodes[1].firstChild.nodeValue = "";
	}

	this.height = this.fileProgressWrapper.offsetHeight;

}
FileProgress.prototype.setProgress = function (percentage) {
	this.fileProgressElement.className = "progressContainer green";
	this.fileProgressElement.childNodes[3].className = "progressBarInProgress";
	//this.fileProgressElement.childNodes[3].style.width = percentage + "%";
};
FileProgress.prototype.setComplete = function () {
	this.fileProgressElement.className = "progressContainer blue";
	this.fileProgressElement.childNodes[3].className = "progressBarComplete";
	this.fileProgressElement.childNodes[3].style.width = "";
};
FileProgress.prototype.setError = function () {
	this.fileProgressElement.className = "progressContainer red";
	this.fileProgressElement.childNodes[3].className = "progressBarError";
	this.fileProgressElement.childNodes[3].style.width = "";

};
FileProgress.prototype.setCancelled = function () {
	this.fileProgressElement.className = "progressContainer";
	this.fileProgressElement.childNodes[3].className = "progressBarError";
	this.fileProgressElement.childNodes[3].style.width = "";

};
FileProgress.prototype.setStatus = function (status) {
	this.fileProgressElement.childNodes[2].innerHTML = status;
};
FileProgress.prototype.setImg = function (src) {
	this.fileProgressElement.childNodes[4].src = src;
};

FileProgress.prototype.setElenments = function (e) {
	this.fileProgressElement.appendChild(e);
};

FileProgress.prototype.toggleCancel = function (show, swfuploadInstance) {
	//this.fileProgressElement.childNodes[0].style.visibility = show ? "visible" : "hidden";
	this.fileProgressElement.childNodes[0].style.visibility ="visible" ;
	if (swfuploadInstance) {
		var fileID = this.fileProgressID;
		this.fileProgressElement.childNodes[0].onclick = function () {
			//index = index -1;
			var str = $("#input_upload_image").val();		
			var myobj=eval(str);
			
			if(myobj.length>1){
				var item = document.getElementById(fileID);
				
				var id0 = item.firstChild.childNodes[4].getAttribute("id");
				//alert(id0);
				if(id0=="file_0"){
			
				var item1 = $(".progressWrapper")[1];
			
				item1.firstChild.childNodes[4].setAttribute("id","file_0");
				//alert(item1.firstChild.childNodes[4].getAttribute("src"));
				item1.firstChild.childNodes[5].replaceChild(item.firstChild.childNodes[5].firstChild,item1.firstChild.childNodes[5].firstChild);
				}			
			}
			
			var str = $("#input_upload_image").val();		
			var myobj=eval(str);
			var item = document.getElementById(fileID);
			var indexId = item.firstChild.childNodes[4].getAttribute("id");
			
			
			for(var i=0;i<myobj.length;i++){   
				
	   			if(myobj[i].id == indexId){
   				
	   				if(indexId == "file_0"&&myobj.length>1){
	   					myobj[i+1].id = "file_0";
	   				}
	   				
	   				myobj.splice(i,1);

	   				break;
	   			}  
			}
			
			var aToStr=JSON.stringify(myobj);
			
			$("#input_upload_image").val(aToStr);

		    swfuploadInstance.cancelUpload(fileID);
		    var thumdNode=document.getElementById(fileID);
			thumdNode.parentNode.removeChild(thumdNode);

			//从新判断计数
			//alert("从新判断计数"+myobj.length);
			if(myobj.length==0){
				//alert("wei 0");
				index = 0;
			}
			
			return false;
		};
	}
};
