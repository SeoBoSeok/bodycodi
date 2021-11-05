const popupCamera = {
	callback : undefined,
	videoTracks : undefined,
	stream : undefined,

	open : function(callback) {
		console.log("called : popupCamera");
		navigator.mediaDevices.getUserMedia({
			video : true
		}).then(stream => {
			this.stream = stream;
			this.callback = callback;
			this.render();
			this.setVideoTracks(stream);
		}).catch(error => {
			alert("바디코디 버전이 낮아 카메라를 사용할 수 없습니다.");
			/*
			console.log(error);
			this.render();
			this.setVideoTracks();
			*/
		});
	},

	close : function() {
		uiPopup();
		try {
			const video = this.popup.querySelector("[name='video']");
			video.pause();
			const videoTracks = this.videoTracks;
			if(Array.isArray(videoTracks)) {
				this.videoTracks[0].stop();
			} else {
				this.videoTracks.stop();
			}
		} catch(error) {
			console.log(error);
		}
	},

	event : {
		capture : function() {
			const video = this.popup.querySelector("[name='video']");
			const canvas = this.popup.querySelector("[name='canvas']");
			const context = canvas.getContext("2d");
			context.drawImage(video, 0, 0, canvas.width, canvas.height);
			this.popup.querySelector("[data-event='upload']").style.display = "inline-block";
		},

		upload : function() {
			const canvas = this.popup.querySelector("[name='canvas']");
			const dataURL = canvas.toDataURL("image/jpeg", 0.5);
			const blob = this.dataURItoBlob(dataURL);
			const form = new FormData(this.popup.querySelector("form"));
			form.append("memberImg", blob, "upload.jpeg");

			commonController.imageUpload(form).then(data => {
				popupCamera.callback(data);
				popupCamera.close();
			});
		},

		dataURItoBlob : function(dataURI) {
			let byteString;
			if (dataURI.split(",")[0].indexOf("base64") >= 0)
				byteString = atob(dataURI.split(",")[1]);
			else
				byteString = unescape(dataURI.split(",")[1]);
			const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
			const ia = new Uint8Array(byteString.length);
			for(let i = 0; i < byteString.length; i++) {
				ia[i] = byteString.charCodeAt(i);
			}
			return new Blob([ia], {type : mimeString});
		}
	},

	setVideoTracks : function(stream) {
		if(!stream) return;
		const video = this.popup.querySelector("[name='video']");
		video.srcObject = stream;
		this.videoTracks = stream.getVideoTracks();
		this.popup.querySelector("[data-event='upload']").style.display = "none";
	},

	render : function(data) {
		const template = this.template.setTemplate();
		this.popup = this.event.popup = uiPopup({
			template : template,
			event : {
				"click" : {
					"close" : function() {
                        popupCamera.close();
					},
					"capture" : function() {
                        popupCamera.event.capture();
					},
					"upload" : function() {
						popupCamera.event.upload();
					}
				}
			}
		});
	},

	template : {
		setTemplate : function() {
			return  `
				<div class="popupCamera">
					<div class="top">
						<h2>
							회원가입
							<a data-event="close"></a>
						</h2>
					</div>
					<div class="middle">
						<form method="post" enctype="multipart/form-data" onsubmit="return false">
							<input type="hidden" name="imgPathVariable" value="member" />
							<input type="hidden" name="imgWidth" value="400" />
						</form>
						<dl>
							<dt><video name="video" autoplay width="400" height="300"></video></dt>
							<dd><canvas name="canvas" width="400" height="300"></canvas></dd>
						</dl>
					</div>
					<div class="bottom">
						<button class="ui-button gray" data-event="close">취소</button>
						<button class="ui-button red" data-event="capture">촬영</button>
						<button class="ui-button" data-event="upload">업로드</button>
					</div>
				</div>
			`;
		}
	}
}
