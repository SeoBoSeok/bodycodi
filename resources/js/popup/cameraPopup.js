const cameraPopup = {
	template : '',
	videoTracks : '',
	captureApplyCbFunc : '',
	
	
	setTemplate : function(template) {
		this.template = template;
	},
	
	setVideoTracks : function(videoTracks) {
		this.videoTracks = videoTracks;
	},
	
	
	setCaptureApplyCbFunc : function(captureApplyCbFunc) {
		this.captureApplyCbFunc = captureApplyCbFunc;
	},
	
	
	hasGetUserMedia : function() {
		return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia || navigator.msGetUserMedia);
	},
	
	
	open : function(captureApplyCbFunc) {
		navigator.mediaDevices.getUserMedia({
			video : true
		}).then(function(stream) {
			cameraPopup.setCaptureApplyCbFunc(captureApplyCbFunc);
			
			const $popupLocation = $('[data-popup-location="팝업 위치"]');
			$popupLocation.append(cameraPopupTemplate.prepare());
			
			cameraPopup.setTemplate($popupLocation.find('[data-popup="카메라 팝업"]'));
			cameraPopup.template.find('[data-action="사진 업로드"]').hide();
			cameraPopup.template.fadeIn(300);
			
			
			const video = cameraPopup.template.find('[name="video"]')[0];
			// Attach the video stream to the video element and autoplay.
			video.srcObject = stream;
			cameraPopup.setVideoTracks(stream.getVideoTracks());
			
			
			popHeight();
			
		}).catch(function(err) {
			console.log(err);
			alert('바디코디 버전이 낮아 카메라를 이용할 수 없습니다.');
		});
	},
	
	
	close : function() {
		this.template.fadeOut(300, function() {
			cameraPopup.videoTracks.forEach(function(track) {
				track.stop()
			});
			cameraPopup.template.remove();
		});
	},
	
	
	capture : function() {
		const video = this.template.find('[name="video"]')[0];
		const canvas = this.template.find('[name="canvas"]')[0];
		const context = canvas.getContext('2d');
		context.drawImage(video, 0, 0, canvas.width, canvas.height);
		
		this.template.find('[data-action="사진 업로드"]').show(300);
	},
	
	
	upload : function() {
		const canvas = this.template.find('[name="canvas"]')[0];
		const dataURL = canvas.toDataURL('image/jpeg', 0.5);
		const blob = this.dataURItoBlob(dataURL);
		
		
		const form = new FormData(this.template.find('form[name="cameraImgForm"]')[0]);
		form.append('memberImg', blob, 'upload.jpeg');
		
		
		CommonController.upload(form, function(data) {
			cameraPopup.captureApplyCbFunc(data);
			cameraPopup.close();
		});
	},
	
	
	dataURItoBlob : function(dataURI) {
		// convert base64/URLEncoded data component to raw binary data held in a string
		let byteString;
		if (dataURI.split(',')[0].indexOf('base64') >= 0)
			byteString = atob(dataURI.split(',')[1]);
		else
			byteString = unescape(dataURI.split(',')[1]);
		
		// separate out the mime component
		const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
		
		// write the bytes of the string to a typed array
		const ia = new Uint8Array(byteString.length);
		for (let i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}
		
		return new Blob([ia], {type : mimeString});
	}
};


const cameraPopupTemplate = {
	prepare : function() {
		return `
			<div class="popup add_advice_member" data-popup="카메라 팝업">
				<div class="box" style="width: 900px !important;">
					<h2>촬영하기</h2>
					<div class="pop_con">
						<fieldset>
							<form name="cameraImgForm" method="post" enctype="multipart/form-data" >
								<input type="hidden" name="imgPathVariable" value="member"/>
								<input type="hidden" name="imgWidth" value="400"/>
							</form>
							<video name="video" autoplay width="400"></video>
							<canvas name="canvas" width="400" height="300"></canvas>
						</fieldset>
					</div>
					<div class="pop_btn">
						<button data-action="팝업 닫기" type="button" class="btn gray">닫기</button>
						<button data-action="촬영하기" type="button" class="btn green">촬영</button>
						<button data-action="사진 업로드" type="button" class="btn blue">적용</button>
					</div>
					<a class="close" data-action="팝업 닫기">팝업 닫기</a>
				</div>
			</div>
		`;
	}
};


$(function() {
	$(document).on('click', '[data-popup="카메라 팝업"] [data-action="팝업 닫기"]', function() {
		cameraPopup.close();
	});
	
	
	$(document).on('click', '[data-popup="카메라 팝업"] [data-action="촬영하기"]', function() {
		cameraPopup.capture();
	});
	
	
	$(document).on('click', '[data-popup="카메라 팝업"] [data-action="사진 업로드"]', function() {
		cameraPopup.upload();
	});
});