
<!DOCTYPE html>
<html lang="ko">
<head>
	<title>BODY CODI - 바디코디</title>

	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="icon" href="/favicon.ico">
	<link type="text/css" rel="stylesheet" href="/static/css/common.css?v=20211110">
	<link type="text/css" rel="stylesheet" href="/static/css/ui.css?v=20211220">
	<link type="text/css" rel="stylesheet" href="/static/css/popup/popupHeader.css?v=20211116">
	<!--
	<link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosanskr.css">
	-->

	<script type="text/javascript" src="/static/js/common/jquery/jquery-1.11.3.min.js"></script>
	<script type="text/javascript" src="/static/js/common/jquery/jquery.blockUI.js"></script>
    <script type="text/javascript" src="/static/js/common/socketio/socket.io.1.7.3.js"></script>
	<script type="text/javascript" src="/static/js/common/printer_core.js"></script>
	<script type="text/javascript" src="/static/js/common/bootstrap/moment.js"></script>
	<script type="text/javascript" src="/static/js/common/bootstrap/moment-with-locales.min.js"></script>
	<script type="text/javascript" src="/static/js/common/barcode_core.js"></script>
	<script type="text/javascript" src="/static/js/common.js?v=2.5"></script>
	<script type="text/javascript" src="/static/js/ui.js?v=20211013"></script>
	<script type="text/javascript" src="/static/js/ui/uiHeader.js?v=20211222"></script>

	<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" async></script>
	<script src="https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js"></script>
	<script src="https://www.gstatic.com/firebasejs/8.6.7/firebase-analytics.js"></script>

	<script type="text/javascript" src="/static/js/controller/commonController.js?v=20211108"></script>
	<script type="text/javascript" src="/static/js/controller/coachController.js?v=2.5"></script>
	<script type="text/javascript" src="/static/js/controller/memberController.js?v=2.5"></script>
	<script type="text/javascript" src="/static/js/controller/permissionController.js"></script>
	<script type="text/javascript" src="/static/js/controller/smsController.js?v=2.5"></script>

	<script type="text/javascript" src="/static/js/popup/popupCamera.js"></script>
	<script type="text/javascript" src="/static/js/popup/popupLoginCoach.js?v=2.5"></script>
	<script type="text/javascript" src="/static/js/popup/popupMember.js?v=20211116"></script>
	<script type="text/javascript" src="/static/js/popup/popupSendSms.js?v=2.5"></script>
	<script type="text/javascript" src="/static/js/popup/popupTodo.js"></script>
	<script type="text/javascript" src="/static/js/sitemap.js?v=2.5"></script>

	<style type="text/css">
		
			.branchDisplay 							{display:none !important}
		</style>
	<script type="text/javascript">
		const partnerId = Number("774");
		const branchId = Number("0");
		const printerCore = new PrinterCore();
		const socketAddress = {
			https	: "https://crm.bodycodi.com:8043",
			http	: "http://52.78.149.182:8081/"
		};

		const partnerInfo = {
			partner : {
				id			: Number("774"),
				name		: "바디코디",
				branchUseYn	: "N",
				headquartersYn : "N",
				partnerType : "",
				isHeadquarter : ("N" == "Y" && !(Number("0")))
			},
			branch : {
				id			: Number("0"),
				name        : ""
			},
			employee : {
				id			: Number("9807"),
				name		: "기본관리자",
				thumbnail	: "https://d27pagl1acwik5.cloudfront.net/upload/coach/774/2020/09/03/20200903151541",
				typeCode	: "-1",
				sex 		: "",
			},
			licence : {
				isPayment	: "Y",
				remainDate	: Number("635"),
				expireDate	: "2023-09-29 00:00:00"
			},
			state : {
				sms 		: "758"
			},
			scheduler : {
				default		: "class"
			},
			permission : {
				member : {
					create : ("true" == "true") ? true : false,
					update : ("true" == "true") ? true : false,
					remove : ("true" == "true") ? true : false,
					sms : ("true" == "true") ? true : false,
					locker : ("true" == "true") ? true : false,
					point : ("true" == "true") ? true : false,
				},
				payment : {
					payment : ("true" == "true") ? true : false,
					cross : ("true" == "true") ? true : false,
				},
				permissionPayment : {
				},
				permissionMember : {
					accessCommunityPage : "true",
				},
				permissionSchedule : {
				},
				permissionAccounting : {
					readSales : "true",
					readExpenditure : "true",
					readAccount : "false",
					registExpenditure : "true",
					accessAccounting : "true",
					configStaffPay : "true",
					readStaffPay : "true"
				},
				permissionStatistics : {
					sales : "true",
					member : "true",
					appointment : "true",
					classes : "true"
				},
				permissionProduct : {
				}
			}
		};

		window.addEventListener("DOMContentLoaded", function(){
			uiHeader();
		}, true);
	</script>
</head>


<html>
<head>
	<script type="text/javascript" src="/static/js/controller/naverController.js?v=20211018"></script>
	<script type="text/javascript" src="/static/js/popup/popupNaverService.js"></script>
	<style type="text/css">
main													{display:none; position:relative; margin-left:275px; min-width:1280px; background-color:white; border-left:1px solid #ccc}
main.focus												{display:block}
main p													{line-height:1.45; font-size:13.5px}
main p + a button										{margin-top:15px; width:250px}
main p + a button.hidden								{display:none}
main .ui-input-switch + .ui-input-radio					{margin-left:25px}

main h4													{margin-bottom:20px; font-size:21px}
main h4 img												{position:relative; vertical-align:middle; top:-2px; height:1em}
main hr													{margin:5px 0 ; border-bottom:1px dashed #ccc}

main li + li											{margin-top:22px}

main table tbody tr th,
main table tbody tr td									{padding:12px 0; border:none; text-align:left; color:inherit}
main table tbody tr th									{vertical-align:top; width:21.5%; height:35px; line-height:35px; font-size:14px}
main table tbody tr.hidden								{display:none}

main table td dt										{vertical-align:top !important; padding-top:7px; width:21.5%; font-size:14px}
main table td dd										{line-height:35px; white-space:nowrap}

main h4.required:after,
main table th.required:after							{content:""; display:inline-block; margin-left:6px; width:1em; height:1em; background:url(/resources/img/icon/icon_check_green.png) center center / 100%}

main label.button										{position:relative; padding-right:135px; display:block}
main label.button button								{position:absolute; right:0; top:0; width:125px}



/* ******** 기본 레이아웃 ******** */

main													{font-size:13.5px}
main .top												{padding-bottom:40px; border-bottom:1px solid #ccc}
main .top .about h4										{margin:20px 0 12px; font-size:18px; color:#03c75a}
main .top .about p										{margin-bottom:20px; line-height:1.5; font-size:13.5px}
main .top .about em										{display:inline-block; padding:0; width:25px; height:25px; background-color:#03c75a !important; border-radius:100%; line-height:25px; text-align:center; font-size:13px; font-family:"Roboto"}
main .top .about div									{padding:20px; background-color:#f5f5f5}
main .top .about table									{font-size:13px}
main .top .about table th								{position:relative; width:250px; font-size:13.5px; font-weight:500}
main .top .about table tr > *							{vertical-align:middle !important; padding:5px 0 !important; background-color:transparent}
main .top .about table td:before						{content:":"; margin-right:1em}

main .middle											{}
main .middle input										{width:100%; max-width:100%; text-align:left}
main .middle select										{max-width:100%; text-align-last:center}
main .middle textarea									{position:relative; width:100%; max-width:100%; height:80px; background-color:rgba(255,255,255,0.85)}
main .middle input[disabled]							{background-color:#ebebe4}

main .middle-top										{padding:25px 0; border-bottom:1px dashed #ccc}
main .middle-top table th								{width:270px}
main .middle-top table tr > *							{vertical-align:middle !important; padding:7px 0 !important; background-color:transparent}
main .middle-top input									{border-color:#03c75a}

main .middle-bottom										{}
main .middle-bottom section								{padding:20px 0}
main .middle-bottom section > dl						{display:table; margin:20px 0; width:100%; table-layout:fixed}
main .middle-bottom section > dl > *					{position:relative; display:table-cell; vertical-align:top; width:50%}
main .middle-bottom section > dl > dt					{padding-right:25px; max-width:780px; font-size:0}
main .middle-bottom section > dl > dt img				{width:100%; border:1px solid #ddd}
main .middle-bottom section > dl > dt img + img			{margin-top:40px}
main .middle-bottom section > dl > dd					{padding-left:25px}
main .middle-bottom section + section					{border-top:1px dashed #ccc}

main .bottom > div										{padding:40px 0; border-top:1px solid #ddd}
main .bottom > div:after								{content:""; display:table; clear:both}

main .bottom-top										{}
main .bottom-top h4										{font-size:16px}
main .bottom-top input,
main .bottom-top select									{margin-left:1em; width:250px !important; min-width:250px}
main .bottom-top div									{padding:25px; background-color:#f7f7f7; line-height:35px}
main .bottom-top ul li									{display:inline-block; vertical-align:top}
main .bottom-top ul li + li								{margin:0; margin-left:25px}
main .bottom-top p										{margin-top:15px}


main .bottom-top > p									{float:right; line-height:22px}
main .bottom-top > p a									{display:inline-block; vertical-align:top; margin-bottom:4px; margin-right:4px; padding:4px 6px; border:1px solid #ccc; line-height:12px; font-size:12px; font-weight:normal; color:#444}
main .bottom-top > p b									{font-weight:500; color:#555}
main .bottom-top > p span								{margin-left:4px}

main .bottom-bottom button								{float:right; width:300px; height:36px}



/* ******** 네이버 전화번호 및 주소 관련 ******** */
main .state												{float:right; margin-top:5px; line-height:1.2; font-size:13px; color:#aaa}
main .state b											{color:#333}

main .phone dd:nth-child(even)							{width:20px; text-align:center}
main .phone input										{text-align:center !important;}

main .address label										{position:relative; display:block}
main .address label input								{padding-left:45px}
main .address label span								{position:absolute; left:7px; top:50%; margin-top:-10.5px; width:32px; height:21px; background-color:#e1e1e1; line-height:21px; text-align:center; font-size:11px; color:#777}
main .address label + label								{margin-left:0; margin-top:12px}



/* ******** 네이버 주차 관련 ******** */
.park dl + div											{margin-top:10px; line-height:20px; text-align:right}
.park dt span											{font-weight:400; color:#777}
.park dd:nth-child(odd)									{width:10px}
.park dd.amount											{width:35%}
.park dd.amount input									{text-align:center !important}
.park input.amount										{margin-right:20px; width:35%; text-align:center !important}
.park label + input										{margin-left:10px}
.park li:last-child dd									{line-height:1}
.park li.hidden											{display:none}
.park input + span										{content:"원"; position:absolute; right:0; top:0; font-size:13.5px}



/* ******** 네이버 이미지 업로드 ******** */
.ui-upload p a											{display:inline-block; vertical-align:middle !important; margin-left:2px; width:10px; height:10px; background:url(/resources/img/icon/icon_close_red.png) center center / 100%}

.upload-list											{margin-right:-15px; font-size:0}
.upload-list li											{position:relative; display:inline-block; vertical-align:top; margin:0; width:20%; padding-bottom:20%}
.upload-list li div										{position:absolute; left:0; top:0; right:15px; bottom:15px; border:1px solid #ccc; overflow:hidden}
.upload-list li div img									{position:absolute; left:0; top:0; width:100%; height:100%; object-fit:cover}
.upload-list li a										{position:absolute; right:2px; top:2px; width:20px; height:20px; background:url(/resources/img/btn/remove.png) no-repeat center center / 90%}
.upload-list li.hidden									{display:none}
.upload-list li:last-child div							{border:1px dashed #aaa}
.upload-list li:last-child div span						{position:absolute; left:50%; top:50%; white-space:nowrap; line-height:1.2; font-size:13.5px; color:#bbb; transform:translate(-50%, -50%)}
.upload-list + div										{margin-top:0}
.upload-list .state										{margin-right:15px}
.upload-list input[type=file]							{position:absolute; left:0; top:0; width:100%; height:100%; cursor:pointer}



/* ******** 네이버 서비스 이용약관 ******** */
.agreement												{position:relative; display:none; margin-left:275px; height:calc(100% - 160px); border-left:1px solid #ccc; color:#333}
.agreement.focus										{display:block}
.agreement > div										{position:absolute; padding:40px; left:0; top:0; width:100%; height:100%; box-sizing:border-box}
.agreement .top h2										{line-height:1; text-align:center; font-size:22px}
.agreement .top h2 img									{position:relative; vertical-align:middle; top:-2.5px; height:1em}
.agreement .middle										{margin:25px 0; padding:35px; height:calc(100% - 180px); border:1px solid #ccc; overflow:auto}
.agreement .bottom										{text-align:center}
.agreement .bottom div									{line-height:35px; text-align:left; font-size:16px}
.agreement .bottom button								{width:125px}
.agreement .bottom button + button						{margin-left:10px}

	</style>
</head>
<body>

<!-- 로컬 네비게이션 바 -->
<nav class="ui-nav" data-index="8">
	<div class="right">
		<a href="/sms/send">SMS/알림톡</a>
		<a class="focus" href="/partner/naver">네이버 연동</a>
		<a href="/partner/operation">센터 설정</a>
		<a href="/manager/group">그룹 관리</a>
		<a href="/services">이용권 관리</a>
		<a href="/product/public">일반 상품 관리</a>
		<a href="/reservationsetting/setting/appointment">예약정책</a>
		<a href="/partner/use">입장 내역</a>
		<a href="/manager/history/index">히스토리</a>
	</div>
</nav>

<aside class="ui-side">
	<div class="menu">
		<h4>네이버 연동</h4>
		<ul>
			<li><a href="/partner/naver">네이버 연동 설정</a></li>
			<li><a href="/partner/naver/booking">네이버 예약 내역</a></li>
			<li><a href="/partner/naver/accounting">네이버 정산</a></li>
		</ul>
	</div>

	<script type="text/javascript">
		(function() {
			const pathname = window.location.pathname;
			const a = document.querySelector(".ui-side").querySelectorAll("a");
			a.forEach(item => {
				if(pathname == item.getAttribute("href"))
					item.parentNode.classList.add("focus");
			});
		})();
	</script>
</aside>



<div id="agreement" class="agreement">
	<div>
		<div class="top">
			<h2>
				<img src="/resources/img/icon/icon_naver.png"/>
				연동 서비스 이용약관
			</h2>
		</div>
		<div class="middle"></div>
		<div class="bottom">
			<button class="ui-button green" onclick="doAgree()">동의</button>
		</div>
	</div>
</div>

<main>
	<form action="" autocomplete="off" onsubmit="return false">
		<div class="top">
			<h4><img src="/resources/img/icon/icon_naver.png"/> 예약 서비스</h4>
			<div class="about">
				<h4>센터의 네이버 예약 페이지를 새롭게 생성하고 설정할 수 있습니다.</h4>
				<p>
					네이버 플레이스에서 네이버 예약 기능 활성화 시키고 잠재고객 모집할 수 있습니다. 바디코디의 그룹수업 스케줄과 네이버 예약에 등록된 스케줄을 연동 시킬 수 있으며, 센터에서는 수업 별로 판매금액을 설정하고 네이버로 검색한 고객은 수업료를 결제하고 예약할 수 있습니다.
					수업료 정산은 판매 대행수수료 10%를 제외하고 센터에서 지정된 계좌로 입금됩니다.  (자세한 내용은 서비스 이용 약관을 참조하세요)
				</p>
				<div>
					<table>
						<tr>
							<th><em class="bg green">01</em> 네이버 플레이스 등록</th>
							<td>네이버에서 내 센터의 플레이스를 등록해 주세요. (<a href="https://smartplace.naver.com">https://smartplace.naver.com</a>)</td>
						</tr>
						<tr>
							<th><em class="bg green">02</em> 네이버 예약에 내 센터 등록</th>
							<td>바디코디에서 아래 내 센터의 플레이스 URL 정보를 기입하고 네이버 예약 설정 정보를 모두 입력 후 저장해주세요.</td>
						</tr>
						<tr>
							<th><em class="bg green">03</em> 예약 상품의 생성</th>
							<td>바디코디에서 스케줄러 > 그룹수업 관리에서 그룹수업의 네이버 연동 기능을 추가하거나 새로운 그룹수업을 등록할 때 네이버 연동 기능을 활성화 해주세요.</td>
						</tr>
						<tr>
							<th><em class="bg green">04</em> 검수 승인 대기 및 노출</th>
							<td>네이버에서 내 센터 정보를 검수 완료된 이후 바디코디 네이버 연동 페이지로 다시 와서 노출여부를 "노출" 상태로 변경해주세요. (검수기간: 영업일 기준 1~3일 소요)</td>
						</tr>
						<tr>
							<th><em class="bg green">05</em> 스케줄 등록하고 예약 받기</th>
							<td>스케줄러 > 그룹수업에서 네이버가 연동된 수업의 스케줄을 등록하면 설정한 조건에 맞게 네이버에서 고객들이 1회 수업료 결제 후 수업에 직접 예약할 수 있습니다.</td>
						</tr>
					</table>
				</div>
			</div>
		</div>

		<div class="middle">
			<div class="middle-top">
				<table>
					<tr>
						<th>플레이스 URL 등록</th>
						<td><input name="placeUrl" type="text" maxlength="255"></td>
					</tr>
				</table>
			</div>
			<div class="middle-bottom">
				<!-- STEP 1 -->
				<section class="step1">
					<dl>
						<dt>
							<img src="/resources/img/pic/naver1.png" />
						</dt>
						<dd>
							<table>
								<tr>
									<th class="required">서비스명</th>
									<td>
										<input name="serviceName" type="text" maxlength="30" placeholder="서비스명을 입력해 주세요.">
										<div class="state"><b><var>0</var>자</b> / 30자</div>
									</td>
								</tr>
								<tr>
									<th>홍보 문구</th>
									<td>
										<textarea class="ui-textarea" name="promotionDesc" maxlength="50" placeholder="홍보 문구를 입력해 주세요."></textarea>
										<div class="state"><b><var>0</var>자</b> / 50자(최소 7자)</div>
									</td>
								</tr>
								<tr>
									<th class="required">서비스 소개</th>
									<td>
										<textarea class="ui-textarea" name="serviceDesc" maxlength="2000" placeholder="서비스를 소개해 주세요."></textarea>
										<div class="state"><b><var>0</var>자</b> / 2000자(최소 20자)</div>
									</td>
								</tr>
								<tr>
									<th class="required">이미지</th>
									<td>
										<div id="upload-list" class="upload-list">
											<ul>
												<li>
													<div>
														<span>업로드</span>
														<input name="imageFile" type="file" accept="image/*" data-type="list" data-action="upload">
													</div>
												</li>
											</ul>
											<div class="state"><b><var>0</var>장</b> / 10장(최소 1장)</div>
										</div>
									</td>
								</tr>
							</table>
						</dd>
					</dl>
				</section>

				<!-- STEP 2 -->
				<section class="step2">
					<dl>
						<dt>
							<img src="/resources/img/pic/naver2.png" />
						</dt>
						<dd>
							<table>
								<tr>
									<th>예약상품</th>
									<td>
										<p>
											스케줄러 > 그룹수업 관리 메뉴에서 신규 그룹수업을 생성하면 해당 그룹수업에 대한 정보로 네이버 예약의 상품이 자동으로
											생성 됩니다. 네이버 예약 기능을 사용하려면 하나 이상의 네이버 기능이 활성화된 그룹수업(예약상품)을 등록해야 합니다.
										</p>
										<a><button id="step2-button" class="ui-button black hidden" onclick="location.href='/manager/schedule/lesson'">예약상품(그룹수업) 생성하러 가기</button></a>
									</td>
								</tr>
							</table>
						</dd>
					</dl>
				</section>

				<!-- STEP 3 -->
				<section class="step3">
					<dl>
						<dt>
							<img src="/resources/img/pic/naver3.png" />
							<img src="/resources/img/pic/naver4.png" />
						</dt>
						<dd>
							<table>
								<tr>
									<th>상세소개</th>
									<td>
										<ul>
											<li>
												<dl>
													<dt>제목</dt>
													<dd>
														<input name="extraDescTitle" type="text" maxlength="40" placeholder="제목을 입력해 주세요." />
														<div class="state"><b><var>0</var>자</b> / 40자(최소 3자)</div>
													</dd>
												</dl>
											</li>
											<li>
												<dl>
													<dt>설명</dt>
													<dd>
														<textarea class="ui-textarea" name="extraDescDescription" class="large" maxlength="600" placeholder="설명을 입력해 주세요."></textarea>
														<div class="state"><b><var>0</var>자</b> / 600자(최소 4자)</div>
													</dd>
												</dl>
											</li>
										</ul>
									</td>
								</tr>
								<tr>
									<th class="required">센터명</th>
									<td>
										<input name="name" type="text" maxlength="30" placeholder="센터명을 입력해 주세요.">
										<div class="state"><b><var>0</var>자</b> / 30자</div>
									</td>
								</tr>
								<tr>
									<th class="required">대표자명</th>
									<td>
										<input name="ownerName" type="text" maxlength="25" placeholder="대표자명을 입력해 주세요.">
										<div class="state"><b><var>0</var>자</b> / 25자</div>
									</td>
								</tr>
								<tr class="address">
									<th class="required">주소</th>
									<td>
										<label class="ui-input-search button">
											<input name="addrJibun" type="text" placeholder="지번 주소를 입력해 주세요." disabled><span>지번</span>
											<button class="ui-button black" onclick="doAddressSearch()">찾기</button>
										</label>
										<label>
											<input name="addrRoad" type="text" placeholder="도로명 주소를 입력해 주세요." disabled><span>도로</span>
										</label>
										<p style="margin-top:10px">※ 찾기 버튼을 클릭해 주소를 입력해 주세요.</p>
									</td>
								</tr>
								<tr>
									<th>상세 위치</th>
									<td>
										<textarea class="ui-textarea large" name="addrDetail" maxlength="400" placeholder="방문객이 쉽게 찾도록 위치에 대한 상세한 설명 및 교통편을 입력해 주세요."></textarea>
										<div class="state"><b><var>0</var>자</b> / 400자</div>
									</td>
								</tr>
								<tr id="park" class="park">
									<th class="required">주차</th>
									<td>
										<ul class="ui-radio">
											<li>
												<dl>
													<dt>가능 여부</dt>
													<dd>
														<label class="ui-input-switch">
															<input name="parkingYn" type="checkbox">
															<span></span>
															<span>불가능</span>
															<span>가능</span>
														</label>
														<label class="ui-input-radio"><input name="parkingFreeYn" type="radio" value="N" onchange="doPark()"><span></span>주차비 유료</label>
														<label class="ui-input-radio"><input name="parkingFreeYn" type="radio" value="Y" onchange="doPark()"><span></span>주차비 무료</label>
													</dd>
												</dl>
											</li>
											<li class="hidden" data-index="2">
												<dl>
													<dt>과금기준</dt>
													<dd>
														<label class="ui-input-radio"><input name="parkingChargingType" type="radio" value="HOURS" onchange="doPark()" checked><span></span>시간당 과금</label>
														<label class="ui-input-radio"><input name="parkingChargingType" type="radio" value="PRICE" onchange="doPark()"><span></span>정액 과금</label>
													</dd>
												</dl>
											</li>
											<li class="hidden" data-index="3">
												<dl>
													<dt>정액 요금</dt>
													<dd>
														<input class="amount" name="parkingPrice" type="text" data-action="amount" placeholder="원">
														(1회 주차시)
													</dd>
												</dl>
											</li>
											<li class="hidden" data-index="4">
												<dl>
													<dt>최초 요금</dt>
													<dd><select class="ui-select" name="basicParkPriceHour"></select></dd>
													<dd></dd>
													<dd><select class="ui-select" name="basicParkPriceMin"></select></dd>
													<dd></dd>
													<dd class="amount"><input name="basicParkPrice" type="text" data-action="amount" placeholder="원"></dd>
												</dl>
												<div class="ui-checkbox">
													<label class="ui-input-checkbox"><input name="basicParkPriceYn" type="checkbox" onchange="doPark()"><span></span>무료</label>
												</div>
											</li>
											<li class="hidden" data-index="4">
												<dl>
													<dt>추가 요금</dt>
													<dd><select class="ui-select" name="extraParkPriceHour"></select></dd>
													<dd></dd>
													<dd><select class="ui-select" name="extraParkPriceMin"></select></dd>
													<dd></dd>
													<dd class="amount"><input name="extraParkPrice" type="text" data-action="amount" placeholder="원"></dd>
												</dl>
											</li>
											<li class="hidden" data-index="4">
												<dl>
													<dt>최대<span>(선택)</span></dt>
													<dd><input class="amount" name="parkingPriceMax" type="text" data-action="amount" placeholder="원"></dd>
												</dl>
											</li>
											<li>
												<dl>
													<dt>발렛파킹</dt>
													<dd>
														<label class="ui-input-radio">
															<input name="valetType" type="radio" value="CHARGED" onchange="doPark()"><span></span>유료
														</label>
														<input class="amount" name="valetCharge" type="text" data-action="amount" placeholder="원" disabled>
														<label class="ui-input-radio"><input name="valetType" type="radio" value="FREE" onchange="doPark()"><span></span>무료</label>
														<label class="ui-input-radio"><input name="valetType" type="radio" value="NA" onchange="doPark()"><span></span>불가</label>
													</dd>
												</dl>
											</li>
											<li>
												<dl>
													<dt>상세 안내</dt>
													<dd>
														<textarea class="ui-textarea" name="parkingDescription" maxlength="400" placeholder="주차 관련 안내할 상세 내용이 있다면 입력해 주세요."></textarea>
														<div class="state"><b><var>0</var>자</b> / 400자</div>
													</dd>
												</dl>
											</li>
										</ul>
									</td>
								</tr>
								<tr class="phone">
									<th class="required">전화번호</th>
									<td>
										<input name="phone" type="hidden">
										<dl>
											<dd><input name="phone1" type="number" maxlength="4"></dd>
											<dd>-</dd>
											<dd><input name="phone2" type="number" maxlength="4"></dd>
											<dd>-</dd>
											<dd><input name="phone3" type="number" maxlength="4"></dd>
										</dl>
									</td>
								</tr>
								<tr class="phone">
									<th class="required">관리자 연락처</th>
									<td>
										<input name="managerPhone" type="hidden">
										<dl>
											<dd><input name="managerPhone1" type="number" maxlength="4" value="010" disabled></dd>
											<dd>-</dd>
											<dd><input name="managerPhone2" type="number" maxlength="4"></dd>
											<dd>-</dd>
											<dd><input name="managerPhone3" type="number" maxlength="4"></dd>
										</dl>
									</td>
								</tr>
								<tr>
									<th>웹사이트</th>
									<td>
										<input name="website" type="text" placeholder="웹사이트 주소를 입력해 주세요.">
									</td>
								</tr>
								<tr class="hidden">
									<td colspan="2">
										<hr>
									</td>
								</tr>
								<tr class="hidden">
									<th>노출여부</th>
									<td>
										<label class="ui-input-switch">
											<input name="showYn" type="checkbox">
											<span></span>
											<span>미노출</span>
											<span>노출</span>
										</label>
									</td>
								</tr>
								<tr class="hidden">
									<th>검수상태</th>
									<td>
										<input type="text" name="progress" value="진행중" disabled>
									</td>
								</tr>
							</table>
						</dd>
					</dl>
				</section>
			</div>
		</div>

		<div class="bottom">
			<div class="bottom-top">
				<h4>회원사 정산 계좌정보 설정</h4>
				<div>
					<ul>
						<li>
							은행
							<select name="bankCode">
								<option value="">은행을 선택해 주세요.</option>
							</select>
						</li>
						<li>
							계좌번호
							<input name="bankAccountNumber" type="text" maxlength="64" placeholder="계좌번호를 입력해 주세요.">
						</li>
						<li>
							예금주
							<input name="bankAccountHolder" type="text" maxlength="64" placeholder="예금주를 입력해 주세요.">
						</li>
					</ul>
					<p>
						정산 계좌정보가 잘못 입력되어 타 계좌로 잘 못 정산되거나 정산이 늦어진 경우, 바디코디 운영사(레드블루)는 책임지지 않습니다.<br>
						정산 계좌정보를 처음 등록하시거나 변경 수정된 경우, 회원사 정산 계좌정보 설정에 주의하시기 바랍니다.
					</p>
				</div>
				<p><b>네이버 연동 서비스 이용약관 <a onclick="popupNaverService.open()">자세히 보기</a></b> : <span id="agreement-date">2020년 12월 31일</span>에 동의하셨습니다.</p>
			</div>
			<div class="bottom-bottom">
				<button class="ui-button blue" type="button" onclick="doSubmit(this)">저장하기</button>
			</div>
		</div>
	</form>
</main>


<script type="text/javascript">

function doAgree() {
	naverController.setAgree().then(data => {
		window.location.reload(true);
	}).catch(error => {
		alert("설정 변경에 실패하였습니다.");
		console.log(error);
	});
}



function doReady() {
	naverController.getInfo().then(data => {
		if(data.agree && data.agree.agreeYn == "Y") {
			document.getElementById("agreement-date").innerHTML = new Date(data.agree.agreeDatetime).format("yyyy년 sm월 sd일");
			doPrepare(data);
		} else {
			const div = document.getElementById("agreement");
			div.querySelector(".middle").innerHTML = popupNaverService.template(true);
			div.classList.add("focus");
		}
	}).catch(error => {
		alert("오류가 발생하였습니다.");
		console.log(error);
	});
}



function doPrepare(data) {
	// 업로드 셋팅
	const setUpload = function() {
		const node = document.querySelectorAll("[data-action=upload]");
		node.forEach(function(item) {
			const isList = (item.getAttribute("data-type")) ? true : false;
			item.addEventListener("change", function(){doUpload("add", this, isList)});
		});
	};

	// 입력 글자 수 셋팅 : 수정 시 업데이트 필요하다.
	const setState = function() {
		const nodeList = document.querySelectorAll("main .state");

		const update = function(event) {
			event = event || window.event;
			const target = event.target;
			if(!target) return;
			const node = target.parentNode.querySelector("var");
			if(node) node.innerHTML = target.value.length;
		};

		nodeList.forEach(item => {
			const node = item.parentNode.querySelector("input, textarea");
			if(node.type != "file") {
				node.addEventListener("paste", update);
				node.addEventListener("keyup", update);
				node.addEventListener("blur", update);
				const state =  node.parentNode.querySelector("var");
				state.innerHTML = node.value.length;
			}
		});
	};

	// 주차 시간 옵션 셋팅
	const setSelect = function() {
		const select = document.getElementById("park").querySelectorAll("select");
		for(let i = 0; i < 4; i += 2) {
			let option = ["<option value=''>선택</option>"];
			for(let j = 0; j <= 12; j++)
				option.push("<option value='" + j + "'>" + j + " 시간</option>");
			select[i].innerHTML = option.join("");
		}
		for(let i = 1; i < 4; i += 2) {
			let option = ["<option value=''>선택</option>"];
			for(let j = 0; j <= 5; j++)
				option.push("<option value='" + (j * 10) + "'>" + (j * 10) + " 분</option>");
			select[i].innerHTML = option.join("");
		}
		select[0].value = select[2].value = 0;
		select[1].value = select[3].value = 30;
	};

	// 주차 관련 셋팅
	const setPark = function() {
		const container = document.getElementById("park");
		let node = "";

		// 주차 가능 여부
		node = container.querySelector("[name=parkingYn]");
		node.addEventListener("change", function() {
			const isChecked = this.checked;
			container.querySelectorAll("[name=parkingFreeYn]").forEach(function(item) {
				item.disabled = (isChecked) ? false : true;
				doPark();
			});
		});

		// 발렛 파킹 선택
		node = container.querySelectorAll("[name=valetType]");
		node.forEach(function(item) {
			item.addEventListener("change", function() {
				const input = container.querySelector("[name=valetCharge]");
				input.disabled = (this.value == "CHARGED") ? false : true;
			});
		});

		// 가격 표시 변환
		node = container.querySelectorAll("[data-action=amount]");
		node.forEach(function(item) {
			item.addEventListener("focus", function() {
				this.value = (this.value) ? getNumber(this.value) : "";
				this.type = "number";
			});

			item.addEventListener("blur", function() {
				this.type = "text";
				this.value = (this.value) ? getComma(this.value) + " 원" : "";
			});
		});

		// 최초 요금 무료 시 입력 초기화
		node = container.querySelector("[name=basicParkPriceYn]");
		node.addEventListener("change", function() {
			const isDisabled = this.checked;
//			const node = container.querySelectorAll("[name=basicParkPriceHour], [name=basicParkPriceMin], [name=basicParkPrice]");
			const node = container.querySelectorAll("[name=basicParkPrice]");
			node.forEach(function(item) {
				if(isDisabled) item.value = "";
				item.disabled = isDisabled;
				item.blur();
			});
		});

		doPark();
	};

	// 정산 은행
	const setBank = function() {
		const option = data.bankList.map(item => {
			return `<option value="${item.value}">${item.title}</option>`;
		});
		document.querySelector("[name='bankCode']").innerHTML += option;
	};

	setPark();
	setUpload();
	setSelect();
	setBank();
	doModify(data.info);
	setState();


	document.querySelector("main").classList.add("focus");
}



function doModify(data) {
	doModify.data = (data) ? data : {};
	if(!data) return;

	const form = document.querySelector("main form");
	const putValue = function(name, value) {
		if(!value) return;
		const input = form.querySelector("[name='" + name + "']");
		if(input) input.value = value;
	};

	const putValues = function(name, length, delimiter, value) {
		const array = value.split(delimiter);
		if(array.length != length) return;
		for(let i = 1; i <= length; i++) {
			putValue(name + i, array[i - 1]);
		}
	};

	const putCheck = function(name, value) {
		if(!(name && value)) return;
		const node = form.querySelector("[name='" + name + "'][value='" + value + "']");
		if(node) node.checked = true;
	};

	const setProgress = function() {
		const getStatus = function(value) {
			switch(value) {
				case "PROGRESS" : return "진행중";
				case "COMPLETED" : return "완료";
				case "PENDING" : return "보류";
			}
			return "진행중";
		};

		const tr = document.querySelectorAll("main tr.hidden");
		tr[1].querySelector("[name='showYn']").checked = (data.showYn == "Y") ? true : false;
		tr[2].querySelector("[name='progress']").value = getStatus(data.inspectionCode);
		tr[0].className = tr[2].className = "";
		if(data.inspectionCode == "COMPLETED") tr[1].className = "";
	};

	setProgress();

	putValue("name", data.name);
	putValue("ownerName", data.ownerName);
	putValue("addrRoad", data.addrRoad);
	putValue("addrJibun", data.addrJibun);
	putValue("addrDetail", data.addrDetail);
	putValues("phone", 3, "-", data.phone);
	putValues("managerPhone", 3, "-", data.managerPhone);
	putValue("website", data.website);
	putValue("serviceName", data.serviceName);
	putValue("promotionDesc", data.promotionDesc);
	putValue("serviceDesc", data.serviceDesc);

	putValue("placeUrl", data.placeUrl || "");
	putValue("bankCode", data.bankCode);
	putValue("bankAccountNumber", data.bankAccountNumber);
	putValue("bankAccountHolder", data.bankAccountHolder);

	if(data.parking) {
		form.querySelector("[name='parkingYn']").checked = (data.parking.parkingYn == "Y") ? true : false;
		putCheck("parkingFreeYn", data.parking.parkingFreeYn);
		putCheck("parkingChargingType", data.parking.parkingChargingType);
		if(data.parking.parkingChargingType == "HOURS")
			putValue("parkingPriceMax", getComma(data.parking.parkingPrice) + "원");
		else
			putValue("parkingPrice", getComma(data.parking.parkingPrice) + "원");

		putCheck("valetType", data.parking.valetType);
		putValue("valetCharge", getComma(data.parking.valetCharge) + "원");
//        console.log(data.parking);

		putValue("parkingDescription", data.parking.description);
		if(data.parking.valetType == "CHARGED")
			form.querySelector("[name='valetCharge']").disabled = false;

		form.querySelector("[name='basicParkPriceYn']").checked = (data.parking.basicCharge.freeYn == "Y") ? true : false;
		const basicChargeTime = Number(data.parking.basicCharge.time);
		const basicChargeHour = parseInt(basicChargeTime / 60);
		const basicChargeMin = basicChargeTime % 60;
		putValue("basicParkPriceHour", basicChargeHour);
		putValue("basicParkPriceMin", basicChargeMin);
		putValue("basicParkPrice", getComma(data.parking.basicCharge.price) + "원");

		const extraChargeTime = Number(data.parking.extraCharge.time);
		const extraChargeHour = parseInt(extraChargeTime / 60);
		const extraChargeMin = extraChargeTime % 60;
		putValue("extraParkPriceHour", extraChargeHour);
		putValue("extraParkPriceMin", extraChargeMin);
		putValue("extraParkPrice", getComma(data.parking.extraCharge.price) + "원");
	}

	if(data.extraDesc) {
		putValue("extraDescTitle", data.extraDesc.title);
		putValue("extraDescDescription", data.extraDesc.description);
	}

	if(data.images) {
		doUpload("update", data.images);
	}

	document.getElementById("step2-button").classList.remove("hidden");
	doPark();
}



function doPark() {
	const parent = document.getElementById("park");
	const child = parent.querySelectorAll("[data-index]");

	const setVisible = function(index) {
		let node = parent.querySelectorAll("[data-index='" + index + "']");
		node.forEach(function(item) {
			item.classList.remove("hidden");
		});
	};

	let isPossible = parent.querySelector("[name=parkingYn]").checked;
	let isCharge = parent.querySelector("[name=parkingFreeYn]:checked");
	isCharge = (isCharge) ? ((isCharge.value == "N") ? true : false) : undefined;
	let isTime = parent.querySelector("[name=parkingChargingType]:checked");
	isTime = (isTime) ? ((isTime.value == "HOURS") ? true : false) : undefined;

	let node = parent.querySelectorAll("input, select");
	for(let i = 1; i < 3; i++)
		node[i].disabled = (isPossible) ? false : true;

	child.forEach(function(item) {
		item.classList.add("hidden");
	});

	if(isPossible == true) {
		setVisible(1);
		if(isCharge == true) {
			setVisible(2);
			if(isTime != undefined)
				setVisible((isTime) ? 4 : 3);
		}
	}
}



function doCheck(data, checkList) {
	let error = "";

	for(let name of checkList) {
		let value = data[name];
		const length = value.length;
		const isArray = Array.isArray(value);
		const isEmpty = (isArray) ? (value.length == 0) : (value == "" || value == 0);

		switch(name) {
			case "placeUrl"			: if(isEmpty) error = "플레이스 URL을 입력해 주세요."; break;
			case "name"				: if(isEmpty) error = "센터명을 입력해 주세요."; break;
			case "ownerName"		: if(isEmpty) error = "대표자명을 입력해 주세요."; break;
			case "addrRoad"			:
			case "addrJibun"		: if(isEmpty) error = "주소를 입력해 주세요."; break;
			case "phone"			:
			case "managerPhone"		:
				const isAdmin = (name == "managerPhone") ? "관리자 " : "";
				if(value == "") error = isAdmin + "전화번호를 입력해 주세요.";
				else if(!isPhone(value) && !isMobile(value)) error = "올바르지 않은 " + isAdmin + "전화번호 입니다.";
				break;

			case "serviceName"		: if(isEmpty) error = "서비스명을 입력해 주세요."; break;
			case "promotionDesc"	: if(!isEmpty && length < 7) error = "홍보 문구를 최소 7자 이상 입력해 주세요."; break;
			case "serviceDesc"		:
				if(isEmpty) error = "서비스 소개를 입력해 주세요.";
				else if(length < 20) error = "서비스 소개를 최소 20자 이상 입력해 주세요.";
				break;

			case "images"			: if(isEmpty) error = "서비스 이미지를 1장 이상 등록해 주세요."; break;
			case "extraDesc"		:
				if(data.extraDesc.title && data.extraDesc.title.length < 3) {
					error = "상세소개 제목을 최소 3자 이상 입력해 주세요.";
					name = "extraDescTitle";
				}
				else if(data.extraDesc.description && data.extraDesc.description.length < 4) {
					error = "상세소개 설명을 최소 4자 이상 입력해 주세요.";
					name = "extraDescDescription";
				}
				break;

			case "parking"				:
				if(data.parking.valetType == "CHARGED" && data.parking.valetCharge < 1) {
					error = "발렛파킹 요금을 입력해 주세요.";
					break;
				}
				if(data.parking.parkingYn == "N") break;
				if(!data.parking.parkingFreeYn) error = "주차비 유료/무료 여부를 선택해 주세요.";
				else if(data.parking.parkingFreeYn == "N") {
					if(!data.parking.parkingChargingType) error = "과금기준을 선택해 주세요.";
					else if(data.parking.parkingChargingType == "PRICE" && !data.parking.parkingPrice) error = "정액 요금을 입력해 주세요.";
					else if(data.parking.parkingChargingType == "HOURS") {
						if(data.parking.basicCharge.freeYn != "Y" && (!data.parking.basicCharge.time || !data.parking.basicCharge.price))
							error = "최초 요금을 입력 및 선택해 주세요.";
						else if(!data.parking.extraCharge.time || !data.parking.extraCharge.price)
							error = "추가 요금을 입력 및 선택해 주세요.";
					}
				}
				break;

			case "bankCode" :
				if(!data.bankName || !data.bankCode) error = "은행을 선택해 주세요.";
				break;
			case "bankAccountNumber" : if(isEmpty) error = "계좌번호를 입력해 주세요."; break;
			case "bankAccountHolder" : if(isEmpty) error = "예금주를 입력해 주세요."; break;
		}
		if(error) {
			if(name == "phone" || name == "managerPhone") name = name + "1";
			let focus = document.querySelector("[name=" + name + "]");
			focus = (focus) ? focus : undefined;
			alert(error);
			return false;
		}
	}
	return true;
}



function getSubmitData() {
	const form = document.querySelector("main form");
	const getName = function(name) {
		const node = form.querySelector("[name='" + name + "']");
		return (node) ? node.value : "";
		};
	const getNames = function(name, length, delimiter) {
		const array = [];
		let isEmpty = false;
		for(let i = 1; i <= length; i++) {
			const value = getName(name + i);
			array.push(value);
			if(!value) isEmpty = true;
		}
		return (isEmpty) ? "" : array.join(delimiter);
	};
	const byCheck = function(name) {
		const node = form.querySelector("[name='" + name + "']:checked");
		return (node) ? node.value : "";
	}

	const imageList = doUpload("data");
	const parkingPrice = getName((byCheck("parkingChargingType") == "HOURS") ? "parkingPriceMax" : "parkingPrice");
	const bankCode = form.querySelector("[name='bankCode']");
	const bankName = (bankCode.value) ? bankCode.options[bankCode.selectedIndex].text : "";

	const data = {
		name					: getName("name"),						// 센터명
		ownerName				: getName("ownerName"),					// 대표자명
		addrRoad				: getName("addrRoad"),					// 도로명 주소
		addrJibun				: getName("addrJibun"),					// 지번 주소
		addrDetail				: getName("addrDetail"),				// 주소 상세
		latitude				: 0,									// 위도
		longitude				: 0,									// 경도
		phone					: getNames("phone", 3, "-"),			// 전화번호
		managerPhone			: getNames("managerPhone", 3, "-"),		// 관리자 전화번호
		website					: getName("website"),					// 웹사이트
		serviceName				: getName("serviceName"),				// 서비스명
		promotionDesc			: getName("promotionDesc"),				// 홍보 문구
		serviceDesc				: getName("serviceDesc"),				// //서비스 설명
		parking					: {										// 주차 정보
			parkingYn			: (form.querySelector("[name='parkingYn']:checked")) ? "Y" : "N",	// 주차 가능 여부
			parkingFreeYn		: byCheck("parkingFreeYn"),				// 무료 주차 여부
			parkingChargingType	: byCheck("parkingChargingType"),		// 주차 요금 과금기준
			parkingPrice		: getNumber(parkingPrice),				// 정액 요금 또는 최대
			valetType			: byCheck("valetType"),					// 발렛파킹
			valetCharge			: getNumber(getName("valetCharge")),	// 발렛파킹 요금
			basicCharge			: {
				type			: "BASIC",
				time			: Number(getName("basicParkPriceHour")) * 60 + Number(getName("basicParkPriceMin")),
				price			: getNumber((getName("basicParkPrice"))),
				freeYn			: (form.querySelector("[name='basicParkPriceYn']:checked")) ? "Y" : "N"
			},
			extraCharge			: {
				type			: "EXTRA",
				time			: Number(getName("extraParkPriceHour")) * 60 + Number(getName("extraParkPriceMin")),
				price			: getNumber((getName("extraParkPrice"))),
				freeYn			: "N"
			},
			description			: getName("parkingDescription")			// 주차 상세 안내
		},
		extraDesc				: {										// 상세 정보
			title				: getName("extraDescTitle"),			// 상세 정보 제목
			description			: getName("extraDescDescription")		// 상세 정보 설명
		},
		images					: imageList,							// 이미지
		showYn					: (form.querySelector("[name='showYn']:checked")) ? "Y" : "N",
		placeUrl				: getName("placeUrl"),					// 플레이스 URL
		bankName				: bankName,
		bankCode				: getName("bankCode"),
		bankAccountNumber		: getName("bankAccountNumber"),
		bankAccountHolder		: getName("bankAccountHolder"),
	};

	const beforeData = doModify.data;
	const isModify = (beforeData.seqPartnerNaver) ? true : false;
	if(!isModify) return data;

	data.parking.seqPartnerNaverParking = beforeData.parking.seqPartnerNaverParking;
	data.parking.basicCharge.seqPartnerNaverParkingCharge = beforeData.parking.basicCharge.seqPartnerNaverParkingCharge;
	data.parking.extraCharge.seqPartnerNaverParkingCharge = beforeData.parking.extraCharge.seqPartnerNaverParkingCharge;
	data.extraDesc.seqPartnerNaverExtraDesc = beforeData.extraDesc.seqPartnerNaverExtraDesc;

	return data;
}



function doSubmit() {
	const data = getSubmitData();
//	console.log(data);

	const checkList = ["name", "ownerName", "addrJibun", "addrRoad", "parking", "phone", "managerPhone", "serviceName", "promotionDesc", "serviceDesc", "images", "extraDesc"];
	if(!doCheck(data, checkList)) return;

	const id = doModify.data.seqPartnerNaver;
	naverController.putInfo(data, id).then(data => {
		const message = (id) ? "수정되었습니다." : "저장되었습니다.";
		alert(message);
		window.location.reload(true);
	}).catch(error => {
		alert("저장에 실패하였습니다.");
		console.log(error);
	});
}



const doUpload = function(command, object, isList) {
	switch(command) {
		case "add" :
			/*
				if(!isList) {
					let fileSize = object.files[0].size || 0;
					const fileName = object.value.substr(object.value.lastIndexOf("\\") + 1);
					const fileSizeKB = parseInt(fileSize / 1024);
					const fileSizeMB = (fileSize / 1024 / 1024).toFixed(1);
					fileSize = (fileSizeMB < 0.1) ? fileSizeKB + "KB" : fileSizeMB + "MB";
					const p = object.parentNode.parentNode.parentNode.querySelector("p");
					p.innerHTML = fileName + "(" + fileSize + ") <a onclick=\"doUpload('del', this, false)\"></a>";
					return;
				}
			*/
			const file = object.files[0];
			const fileMaxSize = 10 * 1024 * 1024;
			if (file.size > fileMaxSize) {
				alert("파일 업로드는 10MB 이하까지만 가능합니다");
				return;
			}
			const formData = new FormData();
			formData.append("imageFile", object.files[0]);

			naverController.imageUpload(formData).then(data => {
				data = JSON.parse(data);
				doUpload("update", {imageUrl : data.imageUrl});
				object.value = "";
			}).catch(error => {
				console.log(error);
				alert("파일 업로드 중 오류가 발생하였습니다.");
				object.value = "";
			});
			break;

		case "del" :
			if(!isList) {
				object.parentNode.parentNode.querySelector("[name=file]").value = "";
				object.parentNode.innerHTML = "통신판매업 신고증을 첨부하시려면, 업로드 버튼을 클릭해 주세요.";
			} else {
				const li = object.parentNode.parentNode;
				li.parentNode.removeChild(li);
				doUpload("count");
			}
			break;

		case "update" :
			const dataList = (Array.isArray(object)) ? object : [object];
			const ul = document.getElementById("upload-list").children[0];
			const li = ul.querySelectorAll("li");
			const lastLi = li[li.length - 1];

			dataList.forEach(function(item) {
				const newLi = document.createElement("li");
				let imageOrder = item.imageOrder;
				if(imageOrder == undefined)
					imageOrder = document.querySelectorAll("#upload-list img").length;
				const imageId = (item.seqPartnerNaverImage == undefined) ? "" : item.seqPartnerNaverImage;
				newLi.innerHTML = "<div><img src='" + item.imageUrl + "' data-order='" + imageOrder + "' data-id='" + imageId + "'/><a onclick=\"doUpload('del', this, true)\"></a></div>";
				ul.insertBefore(newLi, lastLi);
			});

			lastLi.className = (li.length < 10) ? "" : "hidden";
			lastLi.querySelector("input").value = "";

			doUpload("count");
			break;

		case "count" :
			object = document.getElementById("upload-list");
			const count = object.querySelectorAll("img").length;
			object.querySelector("var").innerHTML = count;
			break;

		case "data" :
			const img = document.getElementById("upload-list").querySelectorAll("img");
			let imageList = [];
			img.forEach(function(item) {
				const object = {};
				const id = item.getAttribute("data-id");
				const order = item.getAttribute("data-order");
				object.imageUrl = item.getAttribute("src");
				if(id) object.seqPartnerNaverImage = getNumber(id);
				if(order) object.imageOrder = getNumber(order);
				imageList.push(object);
			});
			return imageList;
	}
}



function doAddressSearch() {
	new daum.Postcode({
		shorthand : false,
		oncomplete: function(data) {
			let extraAddress = "";
			const jibunAddress = data.jibunAddress || data.autoJibunAddress;
			const roadAddress = data.roadAddress;
			extraAddress = (data.buildingName) ? " (" + data.buildingName + ")" : "";
			document.getElementsByName("addrJibun")[0].value = jibunAddress + extraAddress;
			document.getElementsByName("addrRoad")[0].value = roadAddress + extraAddress;
		}
	}).open();
}
</script>



</html>
