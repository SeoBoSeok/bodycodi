const popupGuide = {
	popup : undefined,
	data : {},
	open : function(startDate, endDate) {
		let today = getCalendar();
		this.data = {
			startDate : startDate || today,
			endDate : endDate
		};

		const cookie = this.getCookie("popupGuide");
		if(cookie == startDate) return;
		if(startDate && endDate) {
			today = getNumber(today, true);
			startDate = getNumber(startDate, true);
			endDate = getNumber(endDate, true);
			if(!(startDate <= today && today <= endDate)) return;
		}
		this.render();
	},
	close : function() {
		const displayYn = this.popup.getValue("displayYn");
		if(displayYn == "Y")
			this.setCookie("popupGuide", this.data.startDate, 1);
		uiPopup();
	},
	render : function() {
		const self = this;
		this.popup = uiPopup({
			template : this.template(),
			event : {
				click : {
					close : function() {
						self.close();
					}
				}
			}
		});
	},
	template : function() {
		return `
			<style type="text/css">
				.popupGuide										{margin:0 !important; max-width:890px; height:80%; max-height:768px; overflow:hidden}
				.popupGuide .middle								{position:absolute; left:0; right:0; top:45px; bottom:100px; padding:40px !important; line-height:1.65; text-align:justify; font-size:16px; color:#333; overflow-y:auto}
				.popupGuide .middle b							{font-weight:500}
				.popupGuide .middle h2							{line-height:1.2; font-size:24px; font-weight:500}
				.popupGuide .middle h4							{margin-bottom:10px; line-height:1.2; font-size:20px; font-weight:500}

				.popupGuide .middle hr							{display:block; margin:30px auto 40px auto; border-top:4px solid #004fec}
				.popupGuide .middle hr.red						{border-color:#ff5722}
				.popupGuide .middle ul > li + li				{margin-top:40px}
				.popupGuide .middle p + ul						{margin-top:25px}

				.popupGuide .middle img							{display:block; margin:40px auto; width:830px !important}
				.popupGuide .middle .blue						{color:#004fec}
				.popupGuide .middle .center						{text-align:center}

				.popupGuide .middle .ui-note					{margin-top:12px; padding:15px; background-color:#f0f0f0; line-height:1.5; font-size:15.5px; font-weight:normal; color:#444 !important}
				.popupGuide .middle .ui-note.red				{background-color:rgba(255,87,34,0.1)}
				.popupGuide .middle .ui-note.blue				{background-color:rgba(33,150,243,0.1)}

				.popupGuide .bottom								{position:absolute; left:0; right:0; bottom:0; padding-bottom:25px !important}
				.popupGuide .bottom label						{display:block; text-align:left; font-size:13.5px; color:#333; cursor:pointer}
				.popupGuide .bottom button						{position:relative; top:-5px}

				.popupGuide .middle .box						{position:relative; padding:30px; background-color:#f0f0f0; overflow:hidden}
				.popupGuide .middle .box.blue					{padding:40px; background-color:rgba(33,150,243,0.1); color:inherit}
				.popupGuide .middle .box.blue:before			{content:""; position:absolute; right:-175px; bottom:-175px; width:600px; height:600px; background:url(/static/img/brand/symbol_transparent.png) no-repeat right bottom / 600px; opacity:0.075}
				.popupGuide .middle .box hr						{border-style:dashed}

				.popupGuide .middle .order li					{position:relative; padding-left:12px}
				.popupGuide .middle .order li + li				{margin-top:5px}
				.popupGuide .middle .order li:before			{content:""; position:absolute; left:0}
				.popupGuide .middle .order.disc > li:before		{content:"●"; line-height:2; font-size:13px; font-family:Arial}
				.popupGuide .middle .order.number > li.a:before	{content:"1."}
				.popupGuide .middle .order.number > li.b:before	{content:"2."}
				.popupGuide .middle .order.number > li.c:before	{content:"3."}
				.popupGuide .middle .order.number > li.d:before	{content:"4."}
				.popupGuide .middle .order.number > li.e:before	{content:"5."}
				.popupGuide .middle .order.circle > li.a:before	{content:"①"}
				.popupGuide .middle .order.circle > li.b:before	{content:"②"}
				.popupGuide .middle .order.circle > li.c:before	{content:"③"}

				.popupGuide .middle table						{position:relative; width:100%; background-color:rgba(255,255,255,0.66); text-align:left; font-size:14px; color:#333}
				.popupGuide .middle table tr > *				{padding:12px 10px}
				.popupGuide .middle table th					{background-color:#f0f0f0; text-align:center}
				.popupGuide .middle table thead					{background-color:#f0f0f0}
			</style>
			<div class="popupGuide">
				<div class="top">
					<h2>
						그룹수업의 일괄 출석처리 기능 및 스케줄 출력 기능 업데이트
						<a class="close" data-event="close"></a>
					</h2>
				</div>
				<div class="middle">
					<ul>
						<li>
							<h2 class="center">그룹수업의 일괄 출석처리 기능 및 스케줄 출력 기능 업데이트</h2>
							<hr class="blue" style="width:25%">
							<div class="box blue">
								<ul>
									<li>
										안녕하세요. 바디코디 운영팀입니다.<br>
										그룹수업 일괄 출석처리와 출력 기능이 업데이트되어 안내해 드립니다.<br>
									</li>
									<li>
										<h4 class="blue">1. 그룹수업 일괄 출석/결석 처리 기능 추가</h4>
										<p>
											그룹수업 스케줄러에서 관리자가 출석처리를 할 경우, 예약회원을 1명씩 처리하던 방식에서<br>
											여러명의 예약회원을 한번에 출석처리하거나 결석처리할 수 있는 기능이 업데이트 되었습니다.
										</p>
										<ul class="order disc">
											<li>일괄 출석처리 기능 (예약 > 출석, 결석 > 출석)</li>
											<li>일괄 결석처리 기능 (예약 > 결석, 출석 > 결석)</li>
											<li>일괄 예약처리 기능 (대기 > 예약)</li>
										</ul>
									</li>
									<li>
										<h4 class="blue">2. 그룹수업 시간표 출력 기능 추가</h4>
										<p>
											그룹수업 주간 시간표 이미지를 저장하거나 출력할 수 있는 기능이 업데이트 되었습니다.
										</p>
										<ul class="order disc">
											<li>시간표 이미지 저장 기능</li>
											<li>시간표 인쇄 기능 (연결된 프린터 필수)</li>
											<li>시간대별 출력 기능과 강사별 출력 기능</li>
											<li>인쇄하거나 이미지로 저장할 수업, 강사 선택 기능 등</li>
										</ul>
									</li>
									<li>
										이밖에 업데이트 관련하여 궁금하신 점은 카카오 비즈니스채널 또는 바디코디 운영팀 고객센터(02-2676-6060)로 문의 주시면 상세하게 안내해 드리도록 하겠습니다.<br>
										<br>
										바디코디 개발팀에서는 가맹점에서 더욱 효율적으로 업무를 수행하고 영업 성과를 낼 수 있도록 지속적으로 제품의 고도화 작업을 진행하고 있습니다!<br>
										<br>
										앞으로도 가맹점의 의견과 피드백을 바탕으로 더욱 더 유용하고 편리한 서비스를 제공하겠습니다.<br>
										감사합니다.
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
				<div class="bottom">
					<label class="ui-input-checkbox">
						<input type="checkbox" name="displayYn">
						<span></span>
						하루동안 열지 않기
					</label>
					<button class="ui-button" data-event="close">닫기</button>
				</div>
			</div>
		`;
	},
	setCookie(name, value, day) {
		const date = new Date;
		date.setTime(date.getTime() + (day * 24 * 60 * 60 * 1000));
		const expire = "expires=" + date.toUTCString();
		document.cookie = name + "=" + value + ";" + expire + ";path=/";
	},
	getCookie(name) {
		const array = document.cookie.split(";");
		for(let i = 0; i < array.length; i++) {
			const value = array[i].split("=");
			value[0] = value[0].substr(value[0].indexOf(" ") + 1);
			if(value[0]==name) return value[1];
		}
		return "";
	}
};
