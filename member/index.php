





<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>BODY CODI - 바디코디</title>

	<link type="text/css" rel="stylesheet" href="/bootstrap/css/bootstrap.min.css"/>
	<link type="text/css" rel="stylesheet" href="/bootstrap/css/datepicker.css"/>
	<link type="text/css" rel="stylesheet" href="/css/jquery-ui.min.css"/>

	<link type="text/css" rel="stylesheet" href="/css/common.css?v=20211110">
	<link type="text/css" rel="stylesheet" href="/css/layout.css">
	<!--
	<link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosanskr.css">
	-->

	<script src="/jquery/jquery-1.11.3.min.js"></script>
	<script src="/jquery/jquery.number.min.js"></script>
	<script src="/jquery/jquery.cookie.js"></script>

	<script src="/bootstrap/js/bootstrap.min.js"></script>
	<script src="/bootstrap/js/moment.js"></script>
	<script src="/bootstrap/js/moment-with-locales.js"></script>
	<script type="text/javascript" src="/resources/static/bower_components/moment/min/moment-with-locales.min.js"></script>

	<!-- 협의에 의해 사용하기로 함 -->
	<script src="/bootstrap/js/bootstrap-datetimepicker.min.js"></script>

	<script src="/jquery/jquery-ui.js"></script>
	<script src="/jquery/i18n/datepicker-ko.js"></script>

	<script src="/bootstrap/js/validator.js"></script>
	<script type="text/javascript" src="/js/ui.js"></script>

    <script src="/socketio/socket.io.1.7.3.js"></script>
	<script src="/jquery/jquery.blockUI.js"></script>
	<script src="/js/dateFormatUtil.js" type="text/javascript" charset="utf-8"></script>

	<script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js" async></script>

	<script src="/js/printer/printer_core.js" type="text/javascript" charset="utf-8"></script>
	<script src="/js/barcode/barcode_core.js" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript">
		function fnMoveProductInfo(com_cod, prod_code){
			$(location).attr('href', '/productInformation/'+ com_cod + '/' + prod_code);
		}
		const printerCore = new PrinterCore();
		moment.updateLocale('ko', {});

        // websocket 에서 socket.io 로 재구현
        // ======================================================================================================================
		let socket;
		if (document.location.protocol === 'https:') {
			socket = io.connect('https://crm.bodycodi.com:8043');
		} else {
			socket = io.connect('http://52.78.149.182:8081/');
		}


		const partnerId = Number("774");
		const branchId = Number("0");

	    socket.on('toclient' + partnerId + "_" + branchId ,function(data){
	        redirectCheckIn(data);
	    });
	    /*
	    if(typeof CallbackObject != "undefined"){
	    	console.log('C# version : '+CallbackObject.getCsVersion());
	    }else{
	    	console.log('failed to get version info');
	    }
	    */

		if (document.location.pathname.indexOf("/manager/checkin") === -1 ||
				document.location.pathname === "/manager/entrance-member") {
			socket.on('toclientManager' + partnerId + "_" + branchId, function(data) {
				enhancedRedirectCheckIn(data);
			});

			///아래의 코드는 업데이트 후 폐기한다 //
			socket.on('toclientTemp' + partnerId + "_" + branchId, function(data) {
				redirectCheckIn(data);
			});//업데이트 전 사용되는 소켓. 업데이트 이후 폐기될 예정

		}//crm페이지에서 checkin을 제외한 모든 page에 toclientManager 함수 추가.

		function isDev() {
			if (window.location.hostname == "127.0.0.1" ||
					window.location.hostname == "localhost" ||
					window.location.hostname == "192.168.0.120"
			) {
				return true;
			}
			return false;
		}


		function resultUriCheck(currentUri) {
			if (location.pathname.indexOf("/manager/checkin/index") > -1) {
				return true;
			}
			return false;
		}

		function refreshUriCheck(currentUri, seqMember) {
			if (location.pathname.indexOf("/manager/checkin/entrance/" + seqMember) > -1 ||
					location.pathname.indexOf("/manager/checkin/choose-pass/" + seqMember) > -1 ||
					location.pathname.indexOf("/manager/checkin/classList") > -1) {
				return true;
			}
			return false;
		}


		function enhancedRedirectCheckIn(data){
			const currentUri = document.location.href;
			const paramUri = document.location.origin + '/manager/entrance-member';
			const paramMsg = {};
			if (data.result === "ok"){		//socket으로부터 입장요청의 결과가 돌아왔을때
				if(data.msg === "noUser"){	//입장실패 : 유저정보 없음.
					paramMsg.enterResult = 0;
					paramMsg.playSoundNumber = 4; //추후 ajax통신으로 값을 가져와야 할 것.
					paramMsg.msg = "잘못된 회원 정보로 입장 시도가 있습니다.";
					console.log(paramMsg);
					CallbackObject.userEntranceNotice(paramUri, JSON.stringify(paramMsg));
				}else if(data.msg === "refresh"){	//입장성공
					printerCore.requestPrint(paramUri, data.contents.SEQ_MEMBER, 2);
				}
			}else if(data.result === "entranceFailed"){	//입장실패 : 유효하지 않ㅇ느 입장.
			    if (data.msg === "noUser") {
                    paramMsg.enterResult = 0;
                    paramMsg.playSoundNumber = 4; //추후 ajax통신으로 값을 가져와야 할 것.
                    paramMsg.msg = "잘못된 회원 정보로 입장 시도가 있습니다.";
                    CallbackObject.userEntranceNotice(paramUri, JSON.stringify(paramMsg));
				} else {
					printerCore.requestPrint(paramUri, data.contents.SEQ_MEMBER, 1, data.msg);
				}
			}
		}//redirectCheckIn함수에서 불필요해진 부분을 빼고, 필요한 기능을 추가한 함수. 구버전 C#의 전환이 끝나기 전 까지는 redirectCheckIn함수는 필요할 것.

	    function redirectCheckIn(data)
	    {
			if (data.result == "ok")
			{
				var currentUri = document.location.href;
				if (data.msg == "noUser" && ( resultUriCheck(currentUri) ) )
				{
					location.href = "/manager/checkin/result/noUser";
				}
				else if (data.msg == "entrance" && ( resultUriCheck(currentUri) ) )
				{
					location.href = "/manager/checkin/entrance/" + data.contents.SEQ_MEMBER + "/" + data.contents.INSERTID;
				}
				else if (data.msg == "exit" && ( resultUriCheck(currentUri) ) )
				{
					location.href = "/manager/checkin/result/exit";
				}
				else if (data.msg == "alreadEnttranceStandby"  && ( resultUriCheck(currentUri) ) )
				{
					location.href = "/manager/checkin/result/alreadEnttranceStandby?seqMember="+data.contents.SEQ_MEMBER;
				}
				else if (data.msg == "refresh" && ( refreshUriCheck(currentUri, data.contents.SEQ_MEMBER) ))
				{
					location.href = "/manager/checkin/result/individualEntrance";
				}
				else
				{
					if ( data.msg == "exit" || data.msg == "entrance" || data.msg == "refresh" )
					{
						if (partnerId == Number.parseInt(data.contents.SEQ_PARTNER)) {
							try {
								if (data.msg == "entrance")
									paramMsg = data.contents.NAME + " 님이 입장처리를 요청하셨습니다.";
								else if (data.msg == "exit")
									paramMsg = data.contents.NAME + " 님이 퇴실처리를 하셨습니다.";
								else {
									paramMsg = data.contents.NAME;
									if (paramMsg == -999)
										paramMsg = "-999";
								}
								//window.external.CallForm(paramUri, paramMsg);
								CallbackObject.callformbyweb(document.location.origin + '/manager/entrance-member', paramMsg);
							} catch (e) {
//			                		if ( currentUri.indexOf("manager/checkin/index") == -1 && currentUri.indexOf("manager/checkin/entrance/") == -1 )
//			               				location.href = paramUri;
							}
						}
					}
				}
			}
        }
	</script>
</head>
<body>
	










<script>
	$(document).ready(function() {
		if(typeof daum !== 'undefined' && $('input[name=zipCode]') ){
			$('#btnAddressSearch').show();
		}else if ( typeof daum === 'undefined' ) {
			$('#btnAddressSearch').hide();
		}
	});
</script>













<script src="/resources/js/controller/coachController.js"></script>
<script src="/resources/js/popup/coachPwdConfirmPopup.js"></script>
<script src="/resources/js/controller/loginController.js"></script>




<!-- 버전 2.0 -->
<style type="text/css">


.branchDisplay 							{display:none !important}


html									{position:relative; margin:0 auto !important; background-color:#f0f0f0; min-width:1280px; max-width:1920px}
body									{height:auto; /*min-width:1600px*/}
var, time								{font-style:normal}

#using									{position:relative}
#contents								{display:table; margin-top:0; padding-top:0; width:100%; height:calc(100% - 160px)}
.page_top								{display:none !important}

.bar_area								{position:sticky; position:-webkit-sticky; top:0; padding:5px 50px}
.bar_area.fix_sc						{position:sticky; position:-webkit-sticky; z-index:4}
.bar_area								{height:45px; line-height:34px}
.bar_area .fl a							{vertical-align:initial}
.bar_area .fr.nav ul					{margin-top:-6px}
.bar_area .fr.nav ul li a				{height:46px; line-height:46px}
.bar_area .fr.nav ul li a.active		{background-color:#004fec}

.ui-popup								{font-size:13px; color:#333}
.ui-popup em							{position:relative; display:inline-block; vertical-align:middle; top:0; margin-right:0.5em; padding:0px 5px; background-color:#42485a; border-radius:1px; line-height:1.65; font-size:11px; font-weight:300; font-style:normal; color:white}
.ui-popup em.white						{border:1px solid #ccc; font-weight:400}

.ui-popup > div							{line-height:1.5}
.ui-popup > div > div > div				{opacity:1 !important; transform:none !important}

.ui-popup input[type=text],
.ui-popup input[type=number],
.ui-popup select						{height:36px !important; border-color:#ccc}

.ui-popup .tab							{flex:auto; bottom:auto}
.ui-popup table tbody tr > th,
.ui-popup table tbody tr > td			{height:auto; text-align:inherit; background-color:white; border:none !important}
.ui-popup table tbody tr > td input		{width:100%; text-align:inherit}
.ui-popup .thumbnail					{display:table-row; margin:0; padding:0; border:none; border-radius:0; transition:none}

.ui-popup dl							{display:table; width:100%; margin-bottom:0}
.ui-popup dl dt,
.ui-popup dl dd							{display:table-cell; font-weight:normal}

.ui-block.focus							{z-index:9999}

.ui-popup img,
.ui-input-radio *,
.ui-input-search *,
.ui-input-checkbox *					{box-sizing:initial}
.ui-input-search input					{width:350px !important; max-width:350px !important}
.ui-input-search button					{box-sizing:border-box}

.ui-side + div							{margin-left:275px; height:100%; border-left:1px solid #ccc}
.ui-side + div > div					{max-width:100%; margin:0 10px}

.btn									{height:35px; line-height:33px; font-size:12.5px}
.btn + .btn,
select + .btn							{margin-left:5px}
button.btn								{height:34px; line-height:32px}
.btn.white								{background-color:white; border:1px solid #ccc; color:#333}

@media(min-width:1920px) {
html									{outline:1px solid #ddd}
}
</style>

<link type="text/css" rel="stylesheet" href="/static/css/ui.css?v=20211220">
<link type="text/css" rel="stylesheet" href="/static/css/popup/popupHeader.css?v=20211116">
<script type="text/javascript" src="/static/js/ui.js?v=20211013"></script>
<script type="text/javascript" src="/static/js/ui/uiHeader.js?v=20211222"></script>

<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" async></script>
<script src="https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.6.7/firebase-analytics.js"></script>

<script type="text/javascript" src="/static/js/controller/commonController.js?v=20211108"></script>
<script type="text/javascript" src="/static/js/controller/coachController.js?v=2.5"></script>
<script type="text/javascript" src="/static/js/controller/memberController.js?v=2.5"></script>
<script type="text/javascript" src="/static/js/controller/smsController.js?v=2.5"></script>

<script type="text/javascript" src="/static/js/popup/popupCamera.js?v=2.5"></script>
<script type="text/javascript" src="/static/js/popup/popupLoginCoach.js?v=2.5"></script>
<script type="text/javascript" src="/static/js/popup/popupMember.js?v=20211116"></script>
<script type="text/javascript" src="/static/js/popup/popupSendSms.js?v=2.5"></script>
<script type="text/javascript" src="/static/js/popup/popupTodo.js"></script>
<script type="text/javascript" src="/static/js/sitemap.js?v=2.5"></script>

<script type="text/javascript">

const partnerInfo = {
	partner : {
		id			: Number("774"),
		name		: "바디코디",
		branchUseYn : "N",
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

const checkLicence = function() {
	const date = new Date();
	const today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
	const expireDate = new Date(partnerInfo.expireDate).getTime();
	if(isNaN(expireDate)) return;
	if(today > expireDate)
		location.href = "/";
};

uiHeader();
checkLicence();

</script>





	<!-- 팝업위치 -->
	<div data-popup-location="팝업 위치"></div>

	<!-- 콘텐츠 -->
	<div id="contents">
		
<!-- body S -->










<script>
	$(document).ready(function() {
		if(typeof daum !== 'undefined' && $('input[name=zipCode]') ){
			$('#btnAddressSearch').show();
		}else if ( typeof daum === 'undefined' ) {
			$('#btnAddressSearch').hide();
		}
	});
</script>

	<script src="/datatables/js/jquery.dataTables.min.js"></script>
	<script src="/datatables/js/dataTables.bootstrap.min.js"></script>
	<!-- <link rel="stylesheet" type="text/css" href="/datatables/css/jquery.dataTables.min.css" /> -->
	
	





<link rel="stylesheet" type="text/css" href="/datatables/css/jquery.dataTables.min.css" />

<style type="text/css">
	table.dataTable thead th, table.dataTable tbody td {padding: 5px;}
	.dataTables_wrapper .dataTables_paginate .paginate_button {padding: 0;}
	.dataTables_wrapper .dataTables_paginate {float: none; text-align: center;}
	table.dataTable {border-collapse: collapse;}
	.dataTables_wrapper .dt-buttons {display: none;}
	.dataTables_wrapper .dataTables_info {margin-bottom: 10px; font-size: 15px;}
	.dataTables_wrapper .dataTables_length {min-width: 150px; max-width: 300px;}
	.dataTables_wrapper .dataTables_length select.input-sm {width: 50px; max-width: 100px; line-height: normal;}
	.dataTables_wrapper .dataTables_processing {width: 80%; height: 70px; left: 60%; background-color: #eee; font-weight: bold;}

	span.pause {color: #ff5722;}
	span.pass {color: #22b2fb;}

	#memberSearchSection {padding-bottom: 0;}
	input[type="text"].calendar {width: 145px !important; height: 35px; text-align: left;}

	.gray2 {color: #fff; background-color: #646464;}

	.search_area {/*margin:40px 40px 0 40px; background-color: #f0f0f0*/ border-bottom:1px solid #ccc}
	.dark {background-color: #323232;}
	.total_search {text-align: center;}
	.total_search .total_search_word {width: 600px; margin-right: 10px;}
	.total_search .total {width: 145px; font-weight: normal;}
	.total_search .quick {margin:20px 5px 0; font-weight: normal; }
	.total_search select {margin-right:5px; min-width:145px}

	.member_search_table>colgroup>col.title {width: 145px;}
	.member_search_table tr>th, .member_search_table tr>td {text-align: left; padding-left: 10px; font-size: 14px; line-height: 20px; border: 1px solid #dcdcdc !important;}
	.member_search_table tr>th {background-color: #f0f0f0; font-weight: bold;}
	.member_search_table tr>th>label {font-size: 14px; font-weight: bold;}
	.member_search_table tr>td {background-color: #fff; height: 50px;}
	.member_search_table tr>td select {min-width: 145px; max-width: 250px; margin-right: 10px;}
	.member_search_table tr:last-child>td {text-align: center;}

	button.search {margin:20px 0; width: 450px; height:35px;}
	button.toggle {width: 120px; height: 35px; border-top-right-radius: 0; border-top-left-radius: 0;
		border-width:0 1px 1px 1px; border-style: solid; border-color: #dcdcdc;
		font-size: 14px; color: #646464; font-weight: bold; background-color: #f0f0f0}

	.search_button_area {padding-right: 66px; padding-bottom: 10px;}
	button.toggle:hover, button.toggle:focus {color: #646464; }

	.search_info {padding-top: 40px; padding-bottom: 10px; border-bottom: 1px solid #646464;}
	.search_info span {line-height: 25px; font-size: 14px;}

	.function_area {padding-top: 20px; padding-bottom: 20px; border-bottom: 1px solid #dcdcdc;}
	.function_area button {margin-left: 4px; margin-right: 4px;}
	.function_area button:last-child {margin-right: 0;}
	.function_area span {font-size: 14px; line-height: 30px; }

	.member_search_list table>thead>tr>th {background-color: #f0f0f0; color: #646464; font-weight: bold; border: 1px solid #dcdcdc !important;}
	.member_search_list table>tbody>tr>td {background-color: #fff; color: #646464; font-weight: normal; border: 1px solid #dcdcdc !important;}
	.member_search_list input[type="checkbox"]+label {padding-left: 20px; margin-right: -2px;}
	.member_search_list .safe-checkin {display:inline-block; vertical-align:middle; margin-left:2px; margin-top:-1px; width:14px; height:15px; background:url(/static/img/icon/icon_safe_check_small_blue.png) no-repeat center center / 100%}

	#memberSearchList tbody tr td+td {cursor: pointer;}
	#memberSearchDetail tbody tr.deactive {opacity:0.4}

	@media only screen and (max-width: 1425px) {
		.search_area {margin:20px 20px 0 20px}
	}

	#memberSearchList.receivables th:nth-of-type(9) {
		display: none;
	}
	#memberSearchList.receivables td:nth-of-type(9) {
		display: none;
	}

	#memberSearchList.receivables th:nth-of-type(10) {
		display: none;
	}
	#memberSearchList.receivables td:nth-of-type(10) {
		display: none;
	}


	.popup.extension									{color:#444}
	.popup.extension .pop_caution:first-child			{margin-top:0}
	.popup.extension .pop_caution b						{font-weight:500}
	.popup.extension .pop_caution h4					{font-size:17px}
	.popup.extension .pop_caution > ul					{margin:10px 0 5px 0}
	.popup.extension .pop_caution > ul > li				{position:relative; margin:0; padding:0 0 0 15px; background:none; color:#444}
	.popup.extension .pop_caution > ul > li + li		{margin-top:5px}
	.popup.extension .pop_caution > ul > li:before		{content:"-"; position:absolute; left:2px; font-family:Arial}
	.popup.extension fieldset							{padding-left:15px}

	.function_area span									{margin:0 5px}

	.ui-drop-button 									{position:relative; display:inline-block; vertical-align:top; cursor:pointer}
	.ui-drop-button + .ui-drop-button					{margin-left:10px}
	.ui-drop-button > div								{width:200px}
	.ui-drop-button .menu								{position:absolute; left:0; top:100%; margin-top:-1px; width:100%; background-color:white; border:1px solid #ccc; box-sizing:border-box; visibility:hidden; opacity:0; transform:scaleY(0); transform-origin:left top; transition:all 0.2s ease-in; z-index:2}
	.ui-drop-button:hover .menu							{visibility:visible; opacity:1; transform:scaleY(1)}
	.ui-drop-button .menu ul							{display:block; line-height:35px; font-size:13px; color:#646464}
	.ui-drop-button .menu ul li a						{position:relative; display:block; padding:0 10px}
	.ui-drop-button .menu ul li:hover a					{background-color:#004fec; color:white}

	#selectPass option									{color:#111}
	#selectPass > option:first-child					{font-weight:500; color:#aaa}
	#selectPass option.gray								{color:#aaa}

	#selectPass .green									{color:#37b772}
	#selectPass .red									{color:#ff5722}

	#selectPass .appointment							{color:#7a52cc}
	#selectPass .class									{color:#f39800}
	#selectPass .place									{color:#004fec}
	#selectPass .option									{color:#4197c1}

</style>
<script src="https://cdn.datatables.net/buttons/1.6.0/js/dataTables.buttons.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.6.0/js/buttons.flash.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
<script src="https://cdn.datatables.net/buttons/1.6.0/js/buttons.html5.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.6.0/js/buttons.print.min.js"></script>
<script src="/resources/js/manager/common/searchAddress.js"></script>
<script src="/resources/js/controller/memberController.js"></script>
<script src="/resources/js/popup/memberRegistPopup.js"></script>
<script src="/resources/js/popup/memberPointPopup.js"></script>
<script src="/resources/js/controller/commonController.js"></script>
<script src="/resources/js/popup/cameraPopup.js"></script>
<script src="/resources/js/popup/memberNonPaymentReasonPopup.js"></script>
<script src="/resources/js/controller/attrController.js"></script>
<script src="/resources/js/controller/salesMemberProspectiveController.js"></script>
<script src="/resources/js/controller/smsController.js"></script>
<script src="/resources/js/popup/smsSendPopup.js"></script>
<script src="/resources/js/popup/smsSendAdvertiseGuidePopup.js"></script>
<script src="/resources/js/controller/kakaoAlimTalkController.js"></script>
<script src="/resources/js/popup/kakaoAlimTalkSendPopup.js"></script>

<script src="/static/js/controller/serviceController.js"></script>
<script src="/static/js/popup/popupSendBPayCoupon.js?v=20211014"></script>
<script src="/static/js/controller/discountCouponController.js"></script>

<div data-popup-location="memberRegistPopup"></div>




<!-- 로컬 네비게이션 바 -->
<nav class="ui-nav" data-index="고객관리">
	<div class="right">
		<a href="/member">회원 검색</a>
		<a href="/member-counseling/index">회원 관리</a>
		<a href="/sales/member-prospective">잠재고객 관리</a>
		<a href="/member/notice/getNotice">커뮤니티 관리</a>
		<a href="/sales/analysis">세일즈 성과 분석</a>
	</div>
	<script type="text/javascript">
		(function() {
			const pathname = window.location.pathname;
			const search = window.location.search;
			const a = document.querySelector(".ui-nav").querySelectorAll("a");
			let isFound = false;
			a.forEach(item => {
				if(pathname == item.getAttribute("href")) {
					if(search.indexOf("isMember") == -1) {
						isFound = true;
						item.classList.add("focus");
					}
				}
			});
			if(!isFound) {
				a[0].classList.add("focus");
			}
		})();
	</script>
</nav>


<style type="text/css">
#contents		{display:block}
</style>

<div class="inwrap">
	<!-- 회원목록 스마검색 영역 -->
	<div class="search_area">
		<div class="section">
			<div class="total_search">
				<fieldset>
					<legend>검색</legend>
					<form name="totalSearch" method="get">
						<select class="branch_list branchDisplay" name="seqPartnerBranch" style="display:none">
							<option value="">지점선택</option>
							<option value="" selected>전체</option>
							
						</select>
						<input type="hidden" name="totalYn" value="Y"/>
						<input type="text" name="searchWord" class="total_search_word" placeholder="회원 이름, 전화번호 또는 메모 정보를 검색해보세요." value="">
						<button type="submit" class="btn blue total" id="memberTotalSearchBtn">통합검색</button>
					</form>
				</fieldset>
				<fieldset>
					<legend>스마트검색</legend>
					<button type="button" class="btn gray quick" data-action="quick1">#잔여횟수 3회 이하 회원</button>
					<button type="button" class="btn gray quick" data-action="quick2">#개인레슨 잔여3회 이하 회원</button>
					<button type="button" class="btn gray quick" data-action="quick3">#그룹수업 잔여3회 이하 회원</button>
					<button type="button" class="btn gray quick" data-action="quick4">#5일 이내 기간 만료 회원</button>
					<button type="button" class="btn gray quick" data-action="quick5">#이번달 내 기간 만료 회원</button>
					<button type="button" class="btn gray quick" data-action="quick6">#다음달 내 기간 만료 회원</button>
				</fieldset>
			</div>
		</div>
	</div>
	<!-- //회원목록 스마검색 영역 -->

	<!-- 회원목록 상세검색 영역 -->
	<div class="section" id="memberSearchSection">
		<!-- 리스트 검색 -->
		<div class="member_search_area">
			<fieldset>
				<legend>검색</legend>
				<form name="memberSearchDetail" id="memberSearchDetail">
					<input type="hidden" name="search" value="true" />
					<table class="member_search_table">
						<colgroup>
							<col class="title"/>
							<col />
							<col class="title"/>
							<col />
							<col class="title"/>
							<col />
						</colgroup>
						<tr style="display:none">
							<th>지점선택</th>
							<td colspan="5">
								<input type="radio" name="searchCenter" id="searchCenterN" value="N">
								<label for="searchCenterN">전체</label>
								<input type="radio" name="searchCenter" id="searchCenterY" value="Y">
								<label for="searchCenterY">
									선택지점
									<select name="centerList" data-event="changeCenter" style="margin-left:5px">
										<option value="" selected>지점 선택</option>
										<option value="0">본점</option>
									</select>
								</label>
							</td>
						</tr>
						<tr>
							<th>회원구분</th>
							<td colspan="5">
								<input type="radio" name="searchType" id="searchTypeAll" value="ALL"/>
								<label for="searchTypeAll">전체회원</label>
								<input type="radio" name="searchType" id="searchTypeAvailable" value="AVAILABLE"/>
								<label for="searchTypeAvailable">유효회원</label>
								<input type="radio" name="searchType" id="searchTypePause" value="PAUSE"/>
								<label for="searchTypePause">중지회원</label>
								<input type="radio" name="searchType" id="searchTypeLocker" value="LOCKER"/>
								<label for="searchTypeLocker">락커만료회원</label>
								<input type="radio" name="searchType" id="searchTypeNew" value="NONE"/>
								<label for="searchTypeNew">미결제회원</label>
								<input type="radio" name="searchType" id="receivables" value="RECEIVABLES"/>
								<label for="receivables">미수금회원</label>
								<input type="radio" name="searchType" id="expiration" value="EXPIRATION"/>
								<label for="expiration">만료회원</label>
							</td>
						</tr>
						<tr>
							<th>이용권 속성</th>
							<td>
								<input type="checkbox" name="useNumberType" id="passTypePeriod" value="P"/>
								<label for="passTypePeriod">기간제</label>
								<input type="checkbox" name="useNumberType" id="passTypeCount" value="N"/>
								<label for="passTypeCount">횟수제</label>
							</td>
							<th>이용권 분류</th>
							<td>
								<input type="checkbox" name="serviceType" id="serviceTypeAppointment" value="APPOINTMENT"/>
								<label for="serviceTypeAppointment">개인레슨</label>
								<input type="checkbox" name="serviceType" id="serviceTypeClass" value="CLASS"/>
								<label for="serviceTypeClass">그룹수업</label>
								<input type="checkbox" name="serviceType" id="serviceTypePlace" value="PLACE"/>
								<label for="serviceTypePlace">장소이용</label>
							</td>
							<th>이용권 종류 선택</th>
							<td>
								<label for="selectPass" style="display: none;">이용권을 선택하세요.</label>
								<select name="seqPartnerPass" id="selectPass">
									<option value="0" selected>이용권을 선택해 주세요.</option>
									
									<option value="8" data-type="PLACE">헬스 회원권</option>
									
									<option value="13" data-type="OPTION">운동복</option>
									
									<option value="14" data-type="PLACE">헬스 회원권</option>
									
									<option value="16" data-type="CLASS">골프</option>
									
									<option value="17" data-type="CLASS">골프</option>
									
									<option value="19" data-type="CLASS">인트로 수업</option>
									
									<option value="20" data-type="CLASS">기구필라테스 그룹레슨</option>
									
									<option value="21" data-type="APPOINTMENT">개인PT</option>
									
									<option value="22" data-type="CLASS">골프</option>
									
									<option value="24" data-type="APPOINTMENT">PT (필라테스)</option>
									
									<option value="33" data-type="APPOINTMENT">테니스 1:1  주2회(월수)클레스</option>
									
									<option value="34" data-type="APPOINTMENT">테니스 1:1  주2회(월수)클레스</option>
									
									<option value="36" data-type="APPOINTMENT">헬스 PT</option>
									
									<option value="38" data-type="CLASS">골프</option>
									
									<option value="39" data-type="APPOINTMENT">PT (20분)111</option>
									
									<option value="42" data-type="APPOINTMENT">PT (필라테스)</option>
									
									<option value="43" data-type="CLASS">프롬_그룹수업</option>
									
									<option value="44" data-type="APPOINTMENT">프롬_개인 PT 10회</option>
									
									<option value="17856" data-type="PLACE">헬스 (횟수제)</option>
									
									<option value="17858" data-type="APPOINTMENT">PT (테스트)</option>
									
									<option value="17884" data-type="OPTION">락커</option>
									
									<option value="17936" data-type="CLASS">개인레슨 /  회당 3만원</option>
									
									<option value="18042" data-type="OPTION">락커</option>
									
									<option value="18374" data-type="APPOINTMENT">실전숏게임</option>
									
									<option value="18376" data-type="APPOINTMENT">실전숏게임</option>
									
									<option value="18377" data-type="APPOINTMENT">실전9홀 레슨</option>
									
									<option value="18663" data-type="APPOINTMENT">PT1</option>
									
									<option value="19513" data-type="APPOINTMENT">정기레슨</option>
									
									<option value="19514" data-type="APPOINTMENT">입문레슨 C1</option>
									
									<option value="19515" data-type="APPOINTMENT">입문레슨 C2</option>
									
									<option value="19516" data-type="APPOINTMENT">입문레슨 C3</option>
									
									<option value="19518" data-type="APPOINTMENT">주말 레슨(쿠폰)</option>
									
									<option value="19520" data-type="APPOINTMENT">원포인트 레슨</option>
									
									<option value="19521" data-type="APPOINTMENT">체인지레슨</option>
									
									<option value="19522" data-type="PLACE">실전 숏게임 레슨</option>
									
									<option value="19542" data-type="APPOINTMENT">정기레슨 30분</option>
									
									<option value="19544" data-type="APPOINTMENT">입문레슨 C1</option>
									
									<option value="19545" data-type="APPOINTMENT">입문레슨 C2</option>
									
									<option value="19546" data-type="APPOINTMENT">입문레슨 C3</option>
									
									<option value="19547" data-type="CLASS">그룹레슨</option>
									
									<option value="19548" data-type="APPOINTMENT">주말 레슨</option>
									
									<option value="19549" data-type="APPOINTMENT">커플레슨(50분)</option>
									
									<option value="19550" data-type="APPOINTMENT">원포인트</option>
									
									<option value="19551" data-type="APPOINTMENT">체인지 레슨</option>
									
									<option value="19552" data-type="APPOINTMENT">숏게임 레슨(1회)</option>
									
									<option value="19553" data-type="APPOINTMENT">9홀 라운드 레슨</option>
									
									<option value="19558" data-type="APPOINTMENT">숏게임 레슨(5회)</option>
									
									<option value="19559" data-type="APPOINTMENT">숏게임 레슨(10회)</option>
									
									<option value="19599" data-type="PLACE">헬스</option>
									
									<option value="19600" data-type="OPTION">락커</option>
									
									<option value="19601" data-type="OPTION">운동복</option>
									
									<option value="19667" data-type="CLASS">펑셔널트레이닝</option>
									
									<option value="19729" data-type="APPOINTMENT">개인레슨</option>
									
									<option value="19813" data-type="CLASS">그룹수업</option>
									
									<option value="19864" data-type="APPOINTMENT">평일(20분)</option>
									
									<option value="19915" data-type="PLACE">H3M</option>
									
									<option value="19917" data-type="CLASS">필라테스 48회 6M</option>
									
									<option value="19998" data-type="APPOINTMENT">듀엣레슨</option>
									
									<option value="20138" data-type="CLASS">김반석</option>
									
									<option value="20164" data-type="CLASS">1ㄹㄹㄹ</option>
									
									<option value="20192" data-type="CLASS">11111</option>
									
									<option value="20193" data-type="CLASS">307테스트</option>
									
									<option value="20195" data-type="CLASS">요가 수업</option>
									
									<option value="20476" data-type="APPOINTMENT">개인 횟수 테스트</option>
									
									<option value="20523" data-type="PLACE">테스트</option>
									
									<option value="20524" data-type="CLASS">RRRR</option>
									
									<option value="20548" data-type="APPOINTMENT">체형교정</option>
									
									<option value="20550" data-type="APPOINTMENT">3대1</option>
									
									<option value="20551" data-type="APPOINTMENT">3:1 레슨</option>
									
									<option value="20763" data-type="APPOINTMENT">선생님 개인 15회</option>
									
									<option value="20810" data-type="CLASS">22122</option>
									
									<option value="20872" data-type="APPOINTMENT">test</option>
									
									<option value="20897" data-type="CLASS">대관</option>
									
									<option value="20960" data-type="APPOINTMENT">개인 레슨 (30분)</option>
									
									<option value="21017" data-type="CLASS">1:6 그룹</option>
									
									<option value="21018" data-type="CLASS">1:6 그룹 20회(3개월)</option>
									
									<option value="21019" data-type="CLASS">주2회 3개월</option>
									
									<option value="21032" data-type="CLASS">그룹레슨 (1:6)</option>
									
									<option value="21034" data-type="CLASS">주2회 3개월</option>
									
									<option value="21274" data-type="CLASS">바디프로필 그룹레슨</option>
									
									<option value="21275" data-type="APPOINTMENT">바디프로필 개인레슨</option>
									
									<option value="21285" data-type="APPOINTMENT">리포머 수업</option>
									
									<option value="21287" data-type="CLASS">리포머 수업</option>
									
									<option value="21288" data-type="CLASS">골프 (박정수 프로)</option>
									
									<option value="21290" data-type="APPOINTMENT">원포인트 골프레슨 </option>
									
									<option value="21291" data-type="APPOINTMENT">원포인트 골프레슨 </option>
									
									<option value="21292" data-type="OPTION">마사지 서비스</option>
									
									<option value="21293" data-type="APPOINTMENT">세신 </option>
									
									<option value="21308" data-type="CLASS">벌크업 교육</option>
									
									<option value="21361" data-type="APPOINTMENT">체험 프리다이빙</option>
									
									<option value="21362" data-type="CLASS">라이프가드 그룹레슨 </option>
									
									<option value="21436" data-type="CLASS">그룹수업 </option>
									
									<option value="21437" data-type="CLASS">그룹수업</option>
									
									<option value="21464" data-type="APPOINTMENT">1개월 주2회</option>
									
									<option value="21490" data-type="APPOINTMENT">서비스 레슨</option>
									
									<option value="21529" data-type="APPOINTMENT">봄맞이</option>
									
									<option value="21541" data-type="APPOINTMENT">2:1 듀엣레슨 </option>
									
									<option value="21584" data-type="APPOINTMENT">1:1 관리</option>
									
									<option value="21595" data-type="APPOINTMENT">123123</option>
									
									<option value="21596" data-type="APPOINTMENT">웨딩케어</option>
									
									<option value="21612" data-type="APPOINTMENT">3:1 레슨 </option>
									
									<option value="21613" data-type="CLASS">3:1 그룹레슨 </option>
									
									<option value="21659" data-type="CLASS">그룹수업 </option>
									
									<option value="21729" data-type="APPOINTMENT">개인PT</option>
									
									<option value="21791" data-type="CLASS">라원 발레핏</option>
									
									<option value="21908" data-type="PLACE">타석 이용권</option>
									
									<option value="21917" data-type="PLACE">횟수제 시설</option>
									
									<option value="22074" data-type="CLASS">유치원 1회 이용권</option>
									
									<option value="22080" data-type="CLASS">유치원 20회 이용권 </option>
									
									<option value="22225" data-type="PLACE">인어이용권 정기권</option>
									
									<option value="22289" data-type="PLACE">인어다이브 쿠폰 20매</option>
									
									<option value="22470" data-type="APPOINTMENT">1개월타석권</option>
									
									<option value="22472" data-type="CLASS">ㄷㅈㄱㅈㄷㄱㅈㄷㄱ</option>
									
									<option value="22509" data-type="PLACE">수영장 이용권</option>
									
									<option value="22587" data-type="PLACE">타석이용권</option>
									
									<option value="22721" data-type="APPOINTMENT">온라인 (PT)</option>
									
									<option value="22722" data-type="PLACE">댄스 수업 (기간제)</option>
									
									<option value="22723" data-type="PLACE">댄스 수업 (횟수제)</option>
									
									<option value="22766" data-type="CLASS">테스트 그룹레슨</option>
									
									<option value="22780" data-type="CLASS">GX 수업</option>
									
									<option value="22838" data-type="APPOINTMENT">골프 15분 레슨 </option>
									
									<option value="22848" data-type="APPOINTMENT">골프 30분 </option>
									
									<option value="22950" data-type="CLASS">바디프로필 그룹 필라테스</option>
									
									<option value="22983" data-type="PLACE">일일이용권</option>
									
									<option value="22984" data-type="CLASS">라원 발레핏 일일수업</option>
									
									<option value="23001" data-type="CLASS">수피아 OO지점</option>
									
									<option value="23030" data-type="OPTION">1111111</option>
									
									<option value="23121" data-type="CLASS">ㅎㅎ</option>
									
									<option value="23166" data-type="APPOINTMENT">1:1 클라이밍 레슨</option>
									
									<option value="23167" data-type="PLACE">[클라이밍] 이용권 </option>
									
									<option value="23201" data-type="CLASS">ㅇㅇㅇ</option>
									
									<option value="23354" data-type="OPTION">1회락커</option>
									
									<option value="23355" data-type="PLACE">1회 이용권</option>
									
									<option value="23356" data-type="CLASS">만쥬민주</option>
									
									<option value="23358" data-type="PLACE">횟수권</option>
									
									<option value="23381" data-type="APPOINTMENT">개인트레이닝11</option>
									
									<option value="23455" data-type="APPOINTMENT">골프 20분 레슨</option>
									
									<option value="23483" data-type="APPOINTMENT">[강남점] 개인레슨</option>
									
									<option value="23537" data-type="APPOINTMENT">[강남점] 개인레슨</option>
									
									<option value="23722" data-type="APPOINTMENT">삭제 테스트</option>
									
									<option value="23927" data-type="CLASS">그룹 필라테스 46회 6개월</option>
									
									<option value="23943" data-type="APPOINTMENT">pt</option>
									
									<option value="24157" data-type="APPOINTMENT">탁구</option>
									
									<option value="24158" data-type="APPOINTMENT">골프</option>
									
									<option value="24168" data-type="APPOINTMENT">테테테스트</option>
									
									<option value="24179" data-type="CLASS">daf</option>
									
									<option value="24181" data-type="PLACE">헬스 시설 이용권</option>
									
									<option value="24183" data-type="OPTION">운동복 대여</option>
									
									<option value="24215" data-type="APPOINTMENT">필라테스 개인레슨</option>
									
									<option value="24342" data-type="APPOINTMENT">서비스2회</option>
									
									<option value="24343" data-type="APPOINTMENT">12345</option>
									
									<option value="24355" data-type="CLASS">독클 스쿨 - 소형 10회</option>
									
									<option value="24372" data-type="APPOINTMENT">123</option>
									
									<option value="24373" data-type="APPOINTMENT">12회 세션당 50000원</option>
									
									<option value="24378" data-type="CLASS">그룹수업 필라테스</option>
									
									<option value="24385" data-type="CLASS">그룹수업 (해피아워)</option>
									
									<option value="24428" data-type="APPOINTMENT">베이스레슨(취미)</option>
									
									<option value="24429" data-type="APPOINTMENT">베이스기타(취미)</option>
									
									<option value="24550" data-type="PLACE">캡틴짐 헬스 1개월</option>
									
									<option value="24553" data-type="CLASS">24회권</option>
									
									<option value="24554" data-type="APPOINTMENT">1:1 기구 필라테스</option>
									
									<option value="24561" data-type="PLACE">일반헬스1개월</option>
									
									<option value="24563" data-type="PLACE">일반헬스3개월</option>
									
									<option value="24571" data-type="APPOINTMENT">최대예약테스트</option>
									
									<option value="24578" data-type="APPOINTMENT">1:1 기구 필라테스</option>
									
									<option value="24579" data-type="CLASS">5251</option>
									
									<option value="24598" data-type="OPTION">락커(여부X)</option>
									
									<option value="24605" data-type="CLASS">ddddddd</option>
									
									<option value="24618" data-type="APPOINTMENT">개인레슨 11</option>
									
									<option value="24619" data-type="CLASS">그룹수업 1</option>
									
									<option value="24698" data-type="APPOINTMENT">트랙 수업 (실외)</option>
									
									<option value="24701" data-type="CLASS">그룹</option>
									
									<option value="24722" data-type="PLACE">헬스</option>
									
									<option value="24726" data-type="APPOINTMENT">XX골프1:1레슨권</option>
									
									<option value="24760" data-type="CLASS">11111</option>
									
									<option value="24761" data-type="APPOINTMENT">ffcc</option>
									
									<option value="24812" data-type="APPOINTMENT">차칸</option>
									
									<option value="24815" data-type="APPOINTMENT">Sim Racing (아마추어)</option>
									
									<option value="24817" data-type="APPOINTMENT">Sim Racing</option>
									
									<option value="24820" data-type="APPOINTMENT">Real Track</option>
									
									<option value="24822" data-type="APPOINTMENT">Real Track111</option>
									
									<option value="24823" data-type="APPOINTMENT">패키지 1 (아마추어 Sim 5 + RT 1)</option>
									
									<option value="24824" data-type="APPOINTMENT">패키지 2 (프로 Sim 3 + RT 1)</option>
									
									<option value="24825" data-type="APPOINTMENT">패키지 3 (프로 Sim 9 + RT 3)</option>
									
									<option value="24826" data-type="APPOINTMENT">패키지 4 (프로 Sim 3 + RT 10)</option>
									
									<option value="24827" data-type="APPOINTMENT">패키지 5 (프로 Sim 30 + RT 10)</option>
									
									<option value="24849" data-type="APPOINTMENT">개인레슨 이용권 상품 장소 테스트 버전</option>
									
									<option value="24850" data-type="APPOINTMENT">개인레슨 이용권 상품 장소 테스트 버전</option>
									
									<option value="24854" data-type="APPOINTMENT">핫딜핫딜</option>
									
									<option value="24859" data-type="PLACE">유치원 10회권</option>
									
									<option value="24860" data-type="CLASS">유치원 10회권</option>
									
									<option value="24873" data-type="CLASS">유치원 100회권</option>
									
									<option value="24882" data-type="APPOINTMENT">패키지 상품_Sim Racing</option>
									
									<option value="24888" data-type="APPOINTMENT">상세페이지 테스트 60%</option>
									
									<option value="24890" data-type="APPOINTMENT">테스트 개인레슨테스트 개인레슨</option>
									
									<option value="24891" data-type="APPOINTMENT">필라테스 상세페이지 테스트 60%</option>
									
									<option value="24895" data-type="OPTION">Real Track - Additional fee</option>
									
									<option value="24940" data-type="APPOINTMENT">1:1 필라테스</option>
									
									<option value="24968" data-type="APPOINTMENT">프로핏피트니스 테스트</option>
									
									<option value="25291" data-type="APPOINTMENT">1:1 프리미엄 필라테스</option>
									
									<option value="25514" data-type="CLASS">최진호 테스트</option>
									
									<option value="25515" data-type="APPOINTMENT">최진호 개인 테스트</option>
									
									<option value="25517" data-type="APPOINTMENT">최진호 bpay 테스트</option>
									
									<option value="25945" data-type="APPOINTMENT">[스페셜레슨] 키즈필라테스</option>
									
									<option value="25946" data-type="APPOINTMENT">[리윰] 스페셜 상품</option>
									
									<option value="26540" data-type="APPOINTMENT">[대전_비페이]  듀엣 레슨_2인가격</option>
									
								</select>
							</td>
						</tr>
						<tr>
							<th>담당자 및 그룹</th>
							<td>
								<label for="selectMemberCoach" style="display: none;">회원관리 담당자</label>
								<select name="seqMemberCoach" id="selectMemberCoach">
									<option value="0" selected>회원관리 담당자</option>
									
									<option value="9806">이석훈</option>
									
									<option value="9807">기본관리자</option>
									
									<option value="9816">홍준선</option>
									
									<option value="9817">김반석</option>
									
									<option value="13508">장유진 강사 (테스트)</option>
									
									<option value="14510">요가 강사 (테스트)</option>
									
									<option value="14597">민윤정</option>
									
									<option value="17045">이민주(테스트)</option>
									
									<option value="17122">강동원</option>
									
									<option value="17192">문동규 강사</option>
									
									<option value="17422">조시영</option>
									
									<option value="17471">이민주</option>
									
									<option value="18429">필라테스 전문가</option>
									
									<option value="18685">홍상혁</option>
									
									<option value="18935">전상훈 </option>
									
									<option value="19610">점장리동무</option>
									
									<option value="19624">소피아</option>
									
									<option value="19677">박동훈</option>
									
									<option value="19704">정찬복</option>
									
									<option value="20000">골프 프로</option>
									
									<option value="20031">전라원</option>
									
									<option value="20587">황의천(부스터)</option>
									
									<option value="20590">테니스 강사 (테스트)</option>
									
									<option value="20697">나인원 강사 (테스트)</option>
									
									<option value="20749">찐우</option>
									
									<option value="20962">블리스포인트 프로</option>
									
									<option value="21047">정두리</option>
									
									<option value="21160">윤지영</option>
									
									<option value="21364">이행행</option>
									
									<option value="21409">청담 강사 (테스트)</option>
									
									<option value="21413">고종익</option>
									
									<option value="21457">티나 강사 (테스트)</option>
									
									<option value="21610">알파 강사</option>
									
									<option value="21611">DG 강사 </option>
									
									<option value="21696">하나골프 강사</option>
									
									<option value="21697">바른샘</option>
									
									<option value="21754">이창엽</option>
									
									<option value="21768">노동기 Instructor</option>
									
									<option value="21783">원장</option>
									
									<option value="21929">SL 강사</option>
									
									<option value="22105">누림 강사 (테스트)</option>
									
									<option value="22192">최진호</option>
									
								</select>
								<select name="seqGroup" id="selectGroup">
									<option value="0" selected>그룹</option>
									
									<option value="617">6대1 그룹</option>
									
									<option value="703">최진호 그룹 확인</option>
									
								</select>
							</td>
							<th>개인레슨 담당자</th>
							<td colspan="3">
								<label for="selectPassCoach" style="display: none;">개인레슨 담당자</label>
								<select name="seqPartnerCoach" id="selectPassCoach">
									<option value="0" selected>개인레슨 담당자</option>
									
									<option value="9806">이석훈</option>
									
									<option value="9807">기본관리자</option>
									
									<option value="9816">홍준선</option>
									
									<option value="9817">김반석</option>
									
									<option value="13508">장유진 강사 (테스트)</option>
									
									<option value="14510">요가 강사 (테스트)</option>
									
									<option value="14597">민윤정</option>
									
									<option value="17045">이민주(테스트)</option>
									
									<option value="17122">강동원</option>
									
									<option value="17192">문동규 강사</option>
									
									<option value="17422">조시영</option>
									
									<option value="17471">이민주</option>
									
									<option value="18429">필라테스 전문가</option>
									
									<option value="18685">홍상혁</option>
									
									<option value="18935">전상훈 </option>
									
									<option value="19610">점장리동무</option>
									
									<option value="19624">소피아</option>
									
									<option value="19677">박동훈</option>
									
									<option value="19704">정찬복</option>
									
									<option value="20000">골프 프로</option>
									
									<option value="20031">전라원</option>
									
									<option value="20587">황의천(부스터)</option>
									
									<option value="20590">테니스 강사 (테스트)</option>
									
									<option value="20697">나인원 강사 (테스트)</option>
									
									<option value="20749">찐우</option>
									
									<option value="20962">블리스포인트 프로</option>
									
									<option value="21047">정두리</option>
									
									<option value="21160">윤지영</option>
									
									<option value="21364">이행행</option>
									
									<option value="21409">청담 강사 (테스트)</option>
									
									<option value="21413">고종익</option>
									
									<option value="21457">티나 강사 (테스트)</option>
									
									<option value="21610">알파 강사</option>
									
									<option value="21611">DG 강사 </option>
									
									<option value="21696">하나골프 강사</option>
									
									<option value="21697">바른샘</option>
									
									<option value="21754">이창엽</option>
									
									<option value="21768">노동기 Instructor</option>
									
									<option value="21783">원장</option>
									
									<option value="21929">SL 강사</option>
									
									<option value="22105">누림 강사 (테스트)</option>
									
									<option value="22192">최진호</option>
									
								</select>
							</td>
						</tr>
						<tr>
							<th>
								<input type="checkbox" name="expirationDateYn" id="expirationDateYn" value="Y"/>
								<label for="expirationDateYn">만료일</label>
							</th>
							<td>
								<input type="text" name="expirationFromDate" id="expirationFromDate" class="calendar" value="2022-01-02">
								<span>~</span>
								<input type="text" name="expirationToDate" id="expirationToDate" class="calendar" value="2022-01-02">
							</td>
							<th>
								<input type="checkbox" name="useNumberYn" id="useNumberYn" value="Y"/>
								<label for="useNumberYn">잔여횟수</label>
							</th>
							<td>
								<input type="number" name="useNumber" id="useNumber" style="width: 130px;" value=""/> 회
								<select name="useNumberSearchType" style="min-width: 80px;">
									<option value="MORE">이상</option>
									<option value="LESS">이하</option>
								</select>
							</td>
							<th>
								<input type="checkbox" name="lockerDateYn" id="lockerDateYn" value="Y"/>
								<label for="lockerDateYn">락커만료일</label>
							</th>
							<td>
								<input type="text" name="lockerFromDate" id="lockerFromDate" class="calendar" value="2022-01-02">
								<span>~</span>
								<input type="text" name="lockerToDate" id="lockerToDate" class="calendar" value="2022-01-02">
							</td>
						</tr>
						<tr>
							<th>
								<input type="checkbox" name="visitDateYn" id="visitDateYn" value="Y"/>
								<label for="visitDateYn">최근 방문일</label>
							</th>
							<td>
								<input type="text" name="visitFromDate" id="visitFromDate" class="calendar" value="2022-01-02">
								<span>~</span>
								<input type="text" name="visitToDate" id="visitToDate" class="calendar" value="2022-01-02">
							</td>
							<th>
								<input type="checkbox" name="paymentDateYn" id="paymentDateYn" value="Y"/>
								<label for="paymentDateYn">최근 결제일</label>
							</th>
							<td>
								<input type="text" name="paymentFromDate" id="paymentFromDate" class="calendar" value="2022-01-02">
								<span>~</span>
								<input type="text" name="paymentToDate" id="paymentToDate" class="calendar" value="2022-01-02">
							</td>
							<th>
								<input type="checkbox" name="registrationDateYn" id="registrationDateYn" value="Y"/>
								<label for="registrationDateYn">첫 결제일</label>
							</th>
							<td>
								<input type="text" name="registrationFromDate" id="registrationFromDate" class="calendar" value="2022-01-02">
								<span>~</span>
								<input type="text" name="registrationToDate" id="registrationToDate" class="calendar" value="2022-01-02">
							</td>
						</tr>
						<tr>
							<td colspan="6">
								<button type="submit" class="btn blue search" id="memberDetailSearch">설정한 조건으로 회원 검색하기</button>
								&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="btn gray2" id="memberSearchReset">검색조건 초기화</button>
							</td>
						</tr>
					</table>
				</form>
			</fieldset>
		</div>
	</div>
	<div class="fr search_button_area">
		<button class="btn toggle search_close" >상세검색 닫기&nbsp;&nbsp;▲</button>
		<button class="btn toggle search_open" style="display:none;">상세검색 열기&nbsp;&nbsp;▼</button>
	</div>

	<div class="section search_info">
		
	</div>

	<div class="section function_area">
		<div class="fr">
			
				<a href="javascript:searchExcelDown()" id="searchMemberExcel">
					<button class="btn green excel">검색된 전체 회원 엑셀 다운로드</button>
				</a>
			<span>|</span>
			
			
				<div class="ui-drop-button">
					<div class="ui-select">회원 SMS 전송</div>
					<div class="menu">
						<ul>
							<li><a data-action="openPopupSendSMS">선택한 회원 SMS 전송</a></li>
							<li><a data-action="openPopupSendSMSAll">검색된 전체 회원 SMS 전송</a></li>
						</ul>
					</div>
				</div>
				<div class="ui-drop-button">
					<div class="ui-select">회원 알림톡 전송</div>
					<div class="menu">
						<ul>
							<li><a data-action="openPopupSendAlimTalk">선택한 회원 알림톡 전송</a></li>
							<li><a data-action="openPopupSendAlimTalkAll">검색된 전체 회원 알림톡 전송</a></li>
						</ul>
					</div>
				</div>
				<div class="ui-drop-button">
					<div class="ui-select">회원 b.pay 쿠폰 전송</div>
					<div class="menu">
						<ul>
							<li><a data-action="openPopupSendBpayCoupon">선택한 회원 b.pay 쿠폰 전송</a></li>
							<li><a data-action="openPopupSendBpayCouponAll">검색된 전체 회원 b.pay 쿠폰 전송</a></li>
						</ul>
					</div>
				</div>
			<span>|</span>
			
			
			<button type="button" class="btn gray2" id="openPopupSendExtension">만료일 연장</button>
			
			<button type="button" class="btn gray2" id="btnAddMemberGroup">그룹 추가</button>
			
			<button type="button" class="btn red" id="btnDeleteMember">회원 삭제</button>
			
		</div>
	</div>

	<div class="section member_search_list">
		<table id="memberSearchList">
			<thead>
				<tr>
					<th style="width: 50px;">
						<input type="checkbox" id="memberSelectAll" value="Y"/>
						<label for="memberSelectAll">&nbsp;</label>
					</th>
					<th class="branchDisplay" style="width: 80px;">지점</th>
					<th style="width: 80px;">이름</th>
					<th style="width: 50px;">성별</th>
					<th style="width: 50px;">나이</th>
					<th style="width: 100px;">전화번호</th>
					<th style="width: 100px;">포인트</th>
					<th style="width: 80px;">첫 결제일</th>
					<th style="width: 80px;">최근 결제일</th>
					<th style="width: 400px; max-width:500px;" data-msg="service">이용권 정보</th>
					<th style="width: 95px; line-height: 17px;">검색한 이용권<br/>최종 만료일</th>
					<th style="width: 95px; line-height: 17px;">검색한 이용권<br/>잔여횟수 합계</th>
					<th style="width: 110px;">락커 만료일</th>
					<th style="width: 80px;">최근 방문일</th>
					<th style="width: 70px;">누적방문</th>
					<th style="width: 90px;">그룹</th>
					<th style="width: 50px;">SMS</th>
					<th style="width: 80px;">담당자</th>
				</tr>
			</thead>
			<tbody>
		
			
			

			
		
			</tbody>
		</table>
	</div>
</div>

<!-- 그룹 추가 팝업 -->
<div class="popup group_add">
	<div class="box">
		<h2>그룹 추가</h2>
		<div class="pop_con">
			<!-- 회원 검색 -->
			<div class="search">
				<fieldset>
					<legend>그룹 검색</legend>
					<p>
						<input name="groupSearchWord" type="text" value="" placeholder="그룹 검색" />
						<button id="btnGroupSearch" type="button" class="icon small search_d">검색</button>
					</p>
				</fieldset>
			</div>
			<!-- //회원 검색 -->
			<div id="divSearchResult">
				<div class="no_data">
					<p>검색 하여 주십시오.</p>
				</div>
				<!-- //검색 결과가 없을 때 -->
			</div>
			<!-- //그룹 검색 결과 -->
			<form id="frmSearchGroupList">
				<input type="hidden" name="seqMember" value="" />
				<input type="hidden" name="checkedSeqGroup" value="" />
				<input type="hidden" name="checkedMember" value="" />
			</form>
		</div>
		<div class="pop_btn">
			<button id="btnAddGroup" type="button" class="btn dark">확인</button>
		</div>
		<a class="close" onclick="memberInfo.popClose();">팝업 닫기</a>
	</div>
</div>
<!-- //그룹 추가 팝업 -->

<!-- 미션 추가 팝업 -->
<div class="popup mission_add">
	<div class="box">
		<h2>미션 추가</h2>
		<div class="pop_con">
			<!-- 미션 검색 -->
			<div class="search">
				<fieldset>
					<legend>미션 검색</legend>
					<p>
						<input name="missionSearchWord" type="text" value="" placeholder="미션 검색" />
						<button id="btnMissionSearch" type="button" class="icon small search_d">검색</button>
					</p>
				</fieldset>
			</div>
			<!-- //미션 검색 -->
			<div id="divMissionSearchResult">
				<!-- 미션 검색 결과 -->
				<!-- //미션 검색 결과 -->
				<!-- 검색 결과가 없을 때 -->
				<div class="no_data">
					<p>검색 하여 주십시오.</p>
				</div>
				<!-- //검색 결과가 없을 때 -->
			</div>
			<form id="frmSearchMissionList">
				<input type="hidden" name="seqMember" value="" />
				<input type="hidden" name="checkedSeqMission" value="" />
				<input type="hidden" name="checkedMember" value="" />
			</form>
		</div>
		<div class="pop_btn">
			<button id="btnAddMission" type="button" class="btn dark">확인</button>
		</div>
		<a class="close" onclick="memberInfo.popClose();">팝업 닫기</a>
	</div>
</div>
<!-- //미션 추가 팝업 -->

<!-- 이용권 기간 연장 팝업(2.0v 2017-07-25 추가) -->
<div class="popup pop_white extension">
	<div class="box" style="width:768px !important">
		<h2>이용권 기간 연장</h2>
		<div class="pop_con">
			<div class="pop_caution" style="background-color:rgba(255,87,34,0.1)">
				<h4 class="c_red">기간 연장 전 꼭! 읽어보세요.</h4>
				<ul class="disc">
					<li>센터의 공사 등의 사유로 휴무 시 <b class="c_red">'모든 유효 회원들의 전체 이용권'</b> 만료일을 연장할 수 있습니다.</li>
					<li>
						선택한 기준 날짜에 해당하는 유효 회원들의 전체 이용권을 기준으로 일괄 연장됩니다.<br>
						(예 : 2020년 12월 8일 등 과거 날짜를 선택 후 21일 연장한다면 12월 8일 기준으로 유효한 이용권이 21일 연장됨)
					</li>
					<li>설정한 기준 날짜 이후에 사용 예정인 이용권은 기준 날짜부터 시작일 사이의 기간(일수)은 제외하고 연장처리 됩니다.</li>
					<li>만료일 일괄 연장 이후에는 [고객관리] > [만료일 연장 내역]에서 복구 하실 수 있습니다.</li>
					<li>해당 기능을 처음 사용하시는 경우 바디코디 고객센터로 문의 바랍니다. (T. 02-2676-6060)</li>
				</ul>
				<em class="c_red">※ 선택한 기준 날짜에 해당하는 유효 회원들의 전체 이용권을 기준으로 일괄 연장되오니 유의하시기 바랍니다.</em>
			</div>
			<fieldset class="mt_20">
				<input type="hidden" name="extensionCount" value="0">
				<p>
					<label style="width:150px">기준 날짜 선택</label>
					<input class="calendar" type="text" name="extensionDate" value="">
				</p>
				<p>
					<label style="width:150px;">대상회원</label>
					<span style="font-size:20px;" class="c_blue" data-display="memberCnt">총 0명</span>
				</p>
				<p>
					<label style="width:150px">중지 기간 처리</label>
					<span style="display:inline-block; width:calc(100% - 150px)">
						<input type="radio" id="extensionTypeN" name="extensionType" value="ALL" checked>
						<label for="extensionTypeN" style="display:block; margin-left:0; width:auto">중지된 기간 관계 없이 일괄 연장</label>
						<!--
						<input type="radio" id="extensionTypeY" name="extensionType" value="EXCEPT">
						<label for="extensionTypeY" style="display:block; margin-left:0; width:auto">기준날짜 이후 연장 기간 내 이미 중지된 일수를 제외하고 연장</label>
						-->
					</span>
				</p>
				<p>
					<span>
						<label for="extension_day" style="width:150px;">이용권 기간 연장</label>
						<input type="number" id="extension_day" name="extensionDay">
						<span>일</span>
					</span>
				</p>
			</fieldset>

		</div>
		<!-- 라디오 탭 -->
		<div class="pop_btn">
			<button type="button" class="btn gray" onclick="memberInfo.popClose();">취소</button>
			<button type="button" class="btn red" onclick="memberInfo.extensionInsert();">기간 연장</button>
		</div>

		<a class="close" onclick="memberInfo.popClose();">팝업 닫기</a>
	</div>
</div>
<!-- // 이용권 기간 연장 팝업(2.0v 2017-07-25 추가) -->
<!-- 연락 예정 회원 추가 -->
<div class="popup call_member">
	<div class="box">
		<h2>연락 예정 회원 추가</h2>
		<div class="pop_con">
			<div class="regist-call">
				<h3>연락 목적(필수)</h3>
				<input name="call" type="text" class="call" placeholder="연락 목적을 입력하세요"/>
				<br><br>
				연락 예정 회원으로 추가하게 되면 회원관리메뉴의 <br>
				연락 탭에서 회원 개별 연락 업무를 목적 달성 여부를 추적하고 관리할 수 있습니다.<br>
				연락 목적을 입력하고 추가하세요.
			</div>
		</div>
		<div class="pop_btn">
			<button id="btnAllCallCancel" onclick="memberInfo.popClose();" type="button" class="btn gray">취소</button>
			<button id="btnCallAdd" type="button" class="btn green">추가하기</button>
		</div>
		<a class="close" onclick="popClose();">팝업 닫기</a>
	</div>
</div>
<!-- //연락 예정 회원 추가 -->
<iframe src="about:blank" width="0" height="0" frameborder="0" id="excelFrm" name="excelFrm"></iframe>


<script type="text/javascript">
    $(document).ready(function() {
    	serviceController.normal.list().then(serviceList => {
    		const groupList = {
    			APPOINTMENT : {Y : [], N : []},
    			CLASS : {Y : [], N : []},
    			PLACE : {Y : [], N : []},
    			OPTION : {Y : [], N : []}
			};
			(serviceList || []).forEach(item => {
				const serviceType = item.serviceType;
				const saleYn = item.saleYn || "Y";
				if(groupList[serviceType]) {
					groupList[serviceType][saleYn].push(item);
				}
			});
			const select = document.querySelector("[name='seqPartnerPass']");
			if(select) {
				const optgroup = [];
				const getOptionList = (item, saleYn) => {
					const optionList = (item[saleYn] || []).map(item => {
						const color = (saleYn == "N") ? "gray" : ""
						return `
							<option class="${color}" value="${item.seqService}" data-type="${item.serviceType}">
								　${item.serviceName}
							</option>
						`;
					});
					return optionList.join("");
					/*
					const color = (saleYn == "Y") ? "green" : "red";
					const label = (saleYn == "Y") ? "판매 중" : "판매 중지";
					return (optionList.length) ? `
						<optgroup class="${color}" label="&nbsp;&nbsp;&nbsp;&nbsp;${label}">
							${optionList.join("")}
						</optgroup>
					` : ``;
					*/
				};
				for(let name in groupList) {
					const label = uiParameter.service.name[name];
					optgroup.push(`
						<optgroup class="${name.toLowerCase()}" label="${label}">
							${getOptionList(groupList[name], "Y")}
							${getOptionList(groupList[name], "N")}
						</optgroup>
					`);
				}
				select.innerHTML = `
					<option value="0" selected>이용권을 선택해 주세요.</option>
					${optgroup.join("")}
				`;
			}
			doPage();
		}).catch((error) => {
			console.log(error);
			doPage();
		});
	});

	const doPage = () => {
    	const isPartnerBranch = (window.location.href.indexOf("seqPartnerBranch") > -1);
		const isHeadquarter = (partnerInfo.partner.headquartersYn == "Y");
		const isGoto = (partnerInfo.partner.partnerType == "GOTO");
		const seqPartnerBranch = Number('' || ((isPartnerBranch) ? '' : '0'));
        const searchType = 'AVAILABLE';
        const useNumberType = '';
        const serviceType = '';
        const expirationDateYn = '';
        const visitDateYn = '';
        const paymentDateYn = '';
        const registrationDateYn = '';
        const lockerDateYn = '';
        const useNumberYn = '';

		// 회원구분 항목을 '미수금회원'으로 검색하는 경우, 다음 2개 열이 보이지 않게 처리한다.
		// '검색한 이용권 최종 만료일', '검색한 이용권 잔여횟수 합계'
		if (searchType === 'RECEIVABLES') {
			$('#memberSearchList').addClass('receivables');
		}

        let searchText;

        $('input:radio[name=searchType]:radio[value="'+searchType+'"]').prop('checked', true);
        searchText = searchText + $('input:radio[name="searchType"]:checked').val();


        if (useNumberType !== '') {
            if (useNumberType.includes('P')) {
                $('input:checkbox[name=useNumberType]:checkbox[value="P"]').prop('checked', true);
			}
            if (useNumberType.includes('N')) {
                $('input:checkbox[name=useNumberType]:checkbox[value="N"]').prop('checked', true);
			}
        }
        if (serviceType !== '') {
            if (serviceType.includes('APPOINTMENT')) $('input:checkbox[name=serviceType]:checkbox[value="APPOINTMENT"]').prop('checked', true);
            if (serviceType.includes('CLASS')) $('input:checkbox[name=serviceType]:checkbox[value="CLASS"]').prop('checked', true);
            if (serviceType.includes('PLACE')) $('input:checkbox[name=serviceType]:checkbox[value="PLACE"]').prop('checked', true);
            if (serviceType.includes('NONE')) $('input:checkbox[name=serviceType]:checkbox[value="NONE"]').prop('checked', true);
        }

        if (expirationDateYn === 'Y') $('input:checkbox[name=expirationDateYn]').prop('checked', true);
        if (visitDateYn === 'Y') $('input:checkbox[name=visitDateYn]').prop('checked', true);
        if (paymentDateYn === 'Y') $('input:checkbox[name=paymentDateYn]').prop('checked', true);
        if (registrationDateYn === 'Y') $('input:checkbox[name=registrationDateYn]').prop('checked', true);
        if (lockerDateYn === 'Y') $('input:checkbox[name=lockerDateYn]').prop('checked', true);
        if (useNumberYn === 'Y') $('input:checkbox[name=useNumberYn]').prop('checked', true);

		if(seqPartnerBranch)
			$('select[name="seqPartnerBranch"]').val(seqPartnerBranch);
		else
			$('select[name="seqPartnerBranch"] option:eq(1)').attr("selected", "selected");
		if(isHeadquarter || isGoto)
			$('select[name="seqPartnerBranch"]').css("display", "inline-block");

		$('select[name="seqGroup"]').val('0');
        $('select[name="seqPartnerPass"]').val('0');
        $('select[name="seqPartnerCoach"]').val('0');
        $('select[name="seqMemberCoach"]').val('0');
        $('select[name="useNumberSearchType"]').val('LESS');

        $(".calendar").filter(function(){
            $(this).datepicker({
                yearSuffix: "년",
                monthNames: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
                dayNamesMin: [ "일", "월", "화", "수", "목", "금", "토" ],
                dateFormat: 'yy-mm-dd',
                firstDay: 1,
                defaultDate:new Date()
            });
        });

        $.fn.dataTable.ext.errMode = 'none';
        let $formData = "";
        const $totalForm = $('form[name="totalSearch"]');
        const $detailForm = $('form[name="memberSearchDetail"]');

        if ($totalForm.find('input[name="searchWord"]').val().length > 0)
            $formData = $totalForm.serialize();
        else
            $formData =  $detailForm.serialize();

        let memberTable = $('#memberSearchList').DataTable( {
            processing: true,
			serverSide: true,
			ajax: {
                url: '/member/search?' + $formData,
				type: 'GET',
				dataSrc: function(json) {
                    let tableData = [];
					for (let i=0; i<json.data.length; i++) {
						let data = json.data [i];

						let checkbox = '<input type="checkbox" name="seqMember" id="member_'+data.seqMember+'" value="'+data.seqMember+'"' +
							'data-sms-agree="'+data.smsAgreeYn+'" data-mobile="'+data.mobile+'" data-name="'+data.name+'" data-membership-no="'+data.membershipNo+'"/>' +
							'<label for="member_'+data.seqMember+'">&nbsp;</label>';

						let serviceData = "";
						if (data.serviceList.length > 0) {
							for(let j = 0; j < data.serviceList.length; j++) {
							    let service = data.serviceList[j];

							    let className = "";
							    const $form = $('form[name="memberSearchDetail"]');
							    const $useNumberType = $form.find('input[name="useNumberType"]:checked');
							    const $serviceType = $form.find('input[name="serviceType"]:checked');
							    const $seqPartnerPass = $form.find('select[name="seqPartnerPass"]');

							    if (useNumberType.length > 0 || serviceType.length > 0 || $seqPartnerPass.val() > 0) {

                                    let isNumberType = false;
                                    if ($useNumberType.length > 0) {
                                        $useNumberType.each(function(index, item) {
                                            if ($(item).val() === service.useNumberType) {
                                                isNumberType = true;
                                                return false;
                                            }
                                        });
                                    } else {
                                        isNumberType = true;
                                    }

                                    let isServiceType = false;
                                    if ($serviceType.length > 0) {
                                        $serviceType.each(function(index, item) {
                                            if ($(item).val() === service.serviceType) {
                                                isServiceType = true;
                                                return false;
                                            }
                                        });
                                    } else {
                                        isServiceType = true;
                                    }

                                    let isPartnerPass = false;
                                    if ($seqPartnerPass.val() > 0) {
                                        if (parseInt($seqPartnerPass.val()) === service.seqPartnerPass)
                                            isPartnerPass = true;
                                    } else {
                                        isPartnerPass = true;
                                    }

                                    if (isNumberType && isServiceType && isPartnerPass) className = "pass";
								}

								/*
								회원구분 항목을 '미수금회원'으로 검색하는 경우,
									검색 결과는 [이용권 정보 > 미수금 내역]으로 변경하고
									데이터는 미수금이 남아 있는 판매 건의 가격정책이름과 미수금 금액을 보여준다.
								*/
								if (searchType === 'RECEIVABLES') {
									$('[data-msg="service"]').text('미수금 내역');

									let serviceStr = `
											<span class="${className}">
												${service.orderName || ""}
												[<span class="c_red">미수: ${getComma(service.receivables || 0)}원</span>]
											</span>`;

									if (j > 0) serviceStr = "<br/>" + serviceStr;

									serviceData = serviceData + serviceStr;

								} else {
									let defaultInfo = "";
									if (service.usePeriod) {
										defaultInfo = service.usePeriod;
										if (service.usePeriodType === "M") defaultInfo = defaultInfo + "개월";
										else if (service.usePeriodType === "D") defaultInfo = defaultInfo + "일";

										defaultInfo = defaultInfo +
												(service.useNumberType === 'P' ? "" : " " + service.totalNumber + "회");
									}

									if (service.serviceCoachName && service.serviceCoachName !== "") {
										if (defaultInfo.length > 0) defaultInfo = defaultInfo + " / ";
										defaultInfo = defaultInfo + service.serviceCoachName;
									}

									if (defaultInfo.length > 0) defaultInfo = " [" + defaultInfo + "]";

									let serviceStr = "<span class=\""+className+"\">" + service.passName +
										defaultInfo +
										" - 만료 : " + (service.useEndDt ? service.useEndDt.substr(0, 10) : "") +
										(service.useNumberType === 'P' ? "" : " / " + service.useNumber + "회") + "</span>";

									let pauseStr = "";
									if (service.pauseEndDt && service.pauseEndDt !== '') {
										pauseStr = "<br/><span class=\"pause\"> - [중지 " + service.pauseEndDt.substr(0, 10) + "까지]</span>"
									}

									if (j > 0) serviceStr = "<br/>" + serviceStr;

									serviceData = serviceData + serviceStr + pauseStr;
								}
							}
						}

						let lockerData = "";
						data.lockerList.forEach(item => {
							const lockerNo = item.lockerNo;
							let endDate = item.lockerEndDt;
							endDate = (endDate) ? endDate.substr(0, 10) : "미설정";
							lockerData += `<p>${lockerNo}번 / ${endDate}</p>`;
						});

						let branchName = data.branchName || "-";
						let name = data.name;
						if(data.safeCheckinFlag)
							name += `<span class="safe-checkin"></span>`;
						let gender = data.sex === 'M' ? "남자" : "여자";
						let age = data.age;
						let mobile = data.mobile;
						let point = data.point;
						let first = data.firstPaymentDate ? data.firstPaymentDate.substr(0,10) : "";
						let latest = data.latestPaymentDate ? data.latestPaymentDate.substr(0,10) : "";
						let endDate = (searchType === 'RECEIVABLES') ? '-' :
								data.endDate ? data.endDate.substr(0,10) : "";
						let remaining = (searchType === 'RECEIVABLES') ? '-' :
								data.remaining > 0 ? data.remaining : "-";
						let visitDate = data.visitDate ? data.visitDate.substr(0,10) : "";
						let visitCount = data.visitCount;
						let coachName = data.coachName ? data.coachName : "";
						let sms = data.smsAgreeYn === 'Y' ? "동의" : "미동의";
						let group = (data.groupNames) ? data.groupNames : "";

						let row = {
							'checkbox' : checkbox,
							'branchName' : branchName,
							'name' : name,
							'gender' : gender,
							'age' : age,
							'mobile' : mobile,
							'point' : point,
							'first' : first,
							'latest' : latest,
							'service' : serviceData,
							'endDate' : endDate,
							'remaining' : remaining,
							'locker' : lockerData,
							'visitDate' : visitDate,
							'visitCount' : visitCount,
							'group' : group,
							'sms' : sms,
							'coachName' : coachName
						};
						tableData.push(row);
					}

					return tableData;
				},
				data : function ( data ) {
                    let order = data.order.length > 0 ? data.order[0].column : null;
                    let orderDir = data.order.length > 0 ? data.order[0].dir : "asc";
                    let params = {
                        "draw": data.draw,
						"start": data.start,
						"length": data.length,
						"order": order,
						"orderDir": orderDir
					};
                    return params;
				}
			},
            columns : [
                {'data' : 'checkbox'},
                {'data' : 'branchName'},
                {'data' : 'name'},
                {'data' : 'gender'},
                {'data' : 'age'},
                {'data' : 'mobile'},
				{'data' : 'point'},
                {'data' : 'first'},
                {'data' : 'latest'},
                {'data' : 'service'},
                {'data' : 'endDate'},
                {'data' : 'remaining'},
                {'data' : 'locker'},
                {'data' : 'visitDate'},
                {'data' : 'visitCount'},
				{'data' : 'group'},
                {'data' : 'sms'},
                {'data' : 'coachName'}
            ],
            columnDefs: [{
                orderable: false,
                targets: [0,5,12,15]
            }, {
                "type": "num",
                targets: [4,6,11,14]
            }, {
                targets: [1, 9],
				createdCell : function (td, cellData, rowData, row, col) {
					if (col === 1) {
						$(td).attr('class', 'branchDisplay');
					} else if (col === 9) {
                        $(td).css('padding-right', '10px').css('line-height', '20px').css('text-align', 'right');
					}
				}
			}],
            order: [[8, 'desc']],
            bFilter: false,
            bLengthChange: true,
            bInfo: true,
            paging: true,
            pagingType: "full_numbers",
            bDestroy: true,
			pageLength: 25,
            dom: 'Blirtp',
            language: {
                url: "/datatables/localisation/memberSearch-ko_KR.json"
            }
        }).on('draw.dt', function(){

        });

        $('#memberTotalSearchBtn').on('click', function(event) {
            event.preventDefault();
            let $form = $('form[name="totalSearch"]');
            let $searchWord = $form.find('input[name="searchWord"]');

            if ($searchWord.val().length > 0) {
                memberTable.state.clear();
                $form.submit();
            } else {
                alert("검색어를 입력하세요.")
            }
        });

        $('#memberDetailSearch').on('click', function(event) {
            event.preventDefault();
            memberTable.state.clear();
            let $form = $('form[name="memberSearchDetail"]');
            const checkDate = () => {
				const form = document.querySelector("[name='memberSearchDetail']");
				const dateList = {
					expiration : {
						title : "만료일",
						useYn : form.getValue("expirationDateYn"),
						fromDate : form.getValue("expirationFromDate", true),
						toDate : form.getValue("expirationToDate", true),
					},
					locker : {
						title : "락커 만료일",
						useYn : form.getValue("lockerDateYn"),
						fromDate : form.getValue("lockerFromDate", true),
						toDate : form.getValue("lockerToDate", true),
					},
					visit : {
						title : "최근 방문일",
						useYn : form.getValue("visitDateYn"),
						fromDate : form.getValue("visitFromDate", true),
						toDate : form.getValue("visitToDate", true),
					},
					payment : {
						title : "최근 결제일",
						useYn : form.getValue("paymentDateYn"),
						fromDate : form.getValue("paymentFromDate", true),
						toDate : form.getValue("paymentToDate", true),
					},
					registration : {
						title : "첫 결제일",
						useYn : form.getValue("registrationDateYn"),
						fromDate : form.getValue("registrationFromDate", true),
						toDate : form.getValue("registrationToDate", true),
					}
				};
				for(let name in dateList) {
					const object = dateList[name];
					const title = object.title;
					const error = (object.useYn == "Y" && getNumber(object.fromDate) > getNumber(object.toDate));
					if(error) {
						alert(title + "의 종료 날짜를 시작 날짜 보다 크게 설정해 주세요.");
						return false;
					}
				}
				return true;
			};
			if(!checkDate()) return;
            $form.submit();
        });

        // $('#memberDetailSearch').on('click', function(event) {
        //     event.preventDefault();
        //     memberTable.state.clear();
        //     $('form[name="memberSearchDetail"]').submit();
		// });

        // $('#memberDetailSearch').on('click', function(event) {
		// 	event.preventDefault();
		// 	memberTable.state.clear();
		// 	console.log('aaaa');
		// 	let $form = $('form[name="memberSearchDetail"]');
		// 	console.log($form.serialize());
        //     $.ajax({
        //         type : 'GET',
        //         contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
        //         url : '/member/search',
        //         data : $form.serialize(),
        //         dataType : 'json',
        //         success : function(returnData) {
        //             // console.log(returnData);
		// 			try{
		//
		// 				let tableData = [];
		// 				for (let i=0; i<returnData.response.length; i++) {
		// 					let data = returnData.response[i];
		//
		// 					let checkbox = '<input type="checkbox" name="seqMember" id="member_'+data.seqMember+'" value="'+data.seqMember+'"' +
		// 						'data-sms-agree="'+data.smsAgreeYn+'" data-mobile="'+data.mobile+'" data-name="'+data.name+'" data-membership-no="'+data.membershipNo+'"/>' +
		// 						'<label for="member_'+data.seqMember+'">&nbsp;</label>';
		// 					let name = data.name;
		// 					let gender = data.sex === 'M' ? "남자" : "여자";
		// 					let age = 1;
		// 					let mobile = data.mobile;
		// 					let first = data.firstPaymentDate;
		// 					let latest = data.latestPaymentDate;
		// 					let endDate = data.endDate;
		// 					let remaining = data.remaining;
		// 					let visitDate = data.visitDate;
		// 					let visitCount = data.visitCount;
		// 					let coachName = data.coachName;
		// 					let sms = data.smsAgreeYn === 'Y' ? "동의" : "미동의";
		//
		// 					let row = {
		// 					    'checkbox' : checkbox,
		// 						'name' : name,
		// 						'gender' : gender,
		// 						'age' : age,
		// 						'mobile' : mobile,
		// 						'first' : first,
		// 						'latest' : latest,
		// 						'service' : null,
		// 						'endDate' : endDate,
		// 						'remaining' : remaining,
		// 						'locker' : null,
		// 						'visitDate' : visitDate,
		// 						'visitCount' : visitCount,
		// 						'sms' : sms,
		// 						'coachName' : coachName
		// 					};
		// 					tableData.push(row);
		// 				}
		//
		//
		//
		// 			} catch (e) {
		// 				console.trace(e);
		// 				alert("결과 처리 중 오류가 발생 하였습니다. 데스크에 문의 해주세요.");
		// 			}
		//
        //         },
        //         error : function(data) {
        //             alert('작업 중 에러가 발생하였습니다.');
        //             console.trace(data);
        //         },
        //         beforeSend : function(xhr) {
        //             $.blockUI({
        //                 message : '<h5 style="padding-top: 15px">처리 중 입니다.</h5>',
        //                 css : {
        //                     'height' : '50px',
        //                     'z-index' : 2010
        //                 }
        //             });
        //         },
        //         complete : function(xhr, textStatus) {
        //             $.unblockUI();
        //         }
        //     });
		// });

        $('#memberSearchReset').on('click', function(){
            const $form = $('form[name="memberSearchDetail"]');
            $form[0].reset();
            $form.find('#useNumber').val('');
            $form.find('#searchTypeAvailable').prop('checked', true);
            $form.find('select[name="useNumberSearchType"]').val("LESS");

            const dateList = $form[0].querySelectorAll("input[name*='FromDate'], input[name*='ToDate']");
            const today = getCalendar();
            dateList.forEach(item => item.value = today);
		});

        $('button.toggle').bind('click', function() {
            let $memberSearchArea = $('div#memberSearchSection');
            let $searchArea = $('div.search_area');
            if ($(this).hasClass('search_close')) {
                $(this).hide();
                $('button.search_open').show();
                $searchArea.hide();
                $memberSearchArea.hide();
            } else {
                $(this).hide();
                $('button.search_close').show();
                $searchArea.show();
                $memberSearchArea.show();
            }
        });

		// 회원구분 항목을 '미수금회원' 혹은 '만료회원'으로 검색하는 경우, '회원구분' 하단의 세부 검색은 사용할 수 없다.
		$('#receivables, #expiration').on('click', function() {
			const $form = $('form[name="memberSearchDetail"]');
			$form[0].reset();
			$(this).prop('checked', true);
		});

		const setSearchType = () => {
			const form = document.getElementById("memberSearchDetail");
			const input = form.querySelectorAll("[name='searchType']");
			const setActive = (isDisable) => {
				const nodeList = form.querySelector("tbody").querySelectorAll("input, select");
				nodeList.forEach(item => {
					const name = item.name;
					const getTr = (node) => {
						for(let i = 0; i < 10; i++) {
							node = node.parentNode;
							if(!node) return;
							const tagName = node.tagName.toLowerCase();
							if(tagName == "tr") return node;
						}
					};
					if(name != "searchType") {
						item.disabled = isDisable;
						const tr = getTr(item);
						if(tr) tr.className = (isDisable) ? "deactive" : "";
					}
				});
			};
			input.forEach(item => {
				item.addEventListener("change", function() {
					const value = this.value;
					if(value === "RECEIVABLES" || value === "EXPIRATION") {
						setActive(true);
					} else {
						setActive(false);
					}
				})
			});
			if(searchType == "RECEIVABLES")
				setActive(true);
		};
		setSearchType();

        $('.quick').on('click', function() {
            const $form = $('form[name="memberSearchDetail"]');
            $form[0].reset();

			let $data = $(this).data('action');
			if ($data === 'quick1') {
				$form.find('#searchTypeAvailable').prop('checked', true);
				$form.find('#useNumberYn').prop('checked', true);
				$form.find('#useNumber').val(3);
				$form.find('select[name="useNumberSearchType"]').val("LESS");
			} else if ($data === 'quick2') {
                $form.find('#searchTypeAvailable').prop('checked', true);
                $form.find('#serviceTypeAppointment').prop('checked', true);
                $form.find('#useNumberYn').prop('checked', true);
                $form.find('#useNumber').val(3);
                $form.find('select[name="useNumberSearchType"]').val("LESS");
			} else if ($data === 'quick3') {
                $form.find('#searchTypeAvailable').prop('checked', true);
                $form.find('#serviceTypeClass').prop('checked', true);
                $form.find('#useNumberYn').prop('checked', true);
                $form.find('#useNumber').val(3);
                $form.find('select[name="useNumberSearchType"]').val("LESS");
            } else if ($data === 'quick4') {
                $form.find('#searchTypeAvailable').prop('checked', true);
                $form.find('#expirationDateYn').prop('checked', true);
                $form.find('#expirationFromDate').datepicker("setDate", new Date());
                $form.find('#expirationToDate').datepicker("setDate", 5);
            } else if ($data === 'quick5') {
                $form.find('#searchTypeAll').prop('checked', true);
                $form.find('#expirationDateYn').prop('checked', true);

                let now = new Date();
                let firstDate = new Date(now.getFullYear(), now.getMonth(), 1);
				let lastDate = new Date(now.getFullYear(), now.getMonth()+1, 0);

                $form.find('#expirationFromDate').datepicker("setDate", firstDate);
                $form.find('#expirationToDate').datepicker("setDate", lastDate);
            } else if($data === 'quick6') {
                $form.find('#searchTypeAvailable').prop('checked', true);
                $form.find('#expirationDateYn').prop('checked', true);

                let now = new Date();
                let firstDate = new Date(now.getFullYear(), now.getMonth()+1, 1);
                let lastDate = new Date(now.getFullYear(), now.getMonth()+2, 0);

                $form.find('#expirationFromDate').datepicker("setDate", firstDate);
                $form.find('#expirationToDate').datepicker("setDate", lastDate);
            }
        });

        $('#memberSearchList tbody').on('click', 'tr td+td', function(){
            let data = $(this).parent().children().first().find('input').val();
            memberTable.state.save();
            // location.href = "/manager/member/memberInfo/" + data;
			location.href = "/member/" + data + "/home";
        });

        $('#memberSelectAll').on('click', function() {
            let rows = memberTable.rows({'search' : 'applied'}).nodes();
			if ($(this).prop('checked')) {
                $('input[id^="member_"]', rows).prop('checked', true);
			} else {
                $('input[id^="member_"]', rows).prop('checked', false);
			}
		});

        $('[data-action="openPopupSendSMSAll"]').on("click", function() {
            let $formData = "";
            const $totalForm = $('form[name="totalSearch"]');
            const $detailForm = $('form[name="memberSearchDetail"]');

            if ($totalForm.find('input[name="searchWord"]').val().length > 0)
                $formData = $totalForm.serialize();
            else
                $formData =  $detailForm.serialize();

            $.ajax({
                url : '/member/search/sms',
                type : 'GET',
                contentType: 'application/x-www-form-urlencoded',
                data : $formData,
                dataType : 'json',
                beforeSend : function(xhr) {
                    $.blockUI({
                        message : '<h5 style="padding-top: 15px">로딩중입니다...</h5>',
                        css : {
                            'height' : '50px',
                            'z-index' : 2010
                        }
                    });
                },
                success : function(returnData) {

                    try {
                        const memberList = [];
                        $(returnData).each(function() {
							const member = {
								seqPartner : '774',
								seqMember : this.seqMember,
								memberName : this.name,
								membershipNo : this.membershipNo,
								sendRoute : "MEMBER",
								fromNumber : $('select[name="fromNumber"]').val(),
								receiveNumber : this.mobile,
								reservationYn : 'N',
								smsAgreeYn : this.smsAgreeYn,
								regId : '9807',
								updateId : '9807'
							};
							memberList.push(member);
                        });

                        const data = {
                            smsMemberList : memberList
                        };

						popupSmsSend.open(data);
//                      smsSendPopup.open($('[data-popup-location="팝업 위치"]'), data, null);

                    } catch (ex) {
                        alert('작업을 완료했으나 스크립트에 오류가 있습니다.');
                        console.trace(ex);
                        $.unblockUI();
                    }
                },
                error : function(data) {
                    alert('작업 중 오류가 발생하였습니다.');
                    console.trace(data);
                },
                complete : function(xhr, textStatus) {
                    $.unblockUI();
                }
            });
        });

        $('[data-action="openPopupSendSMS"]').on("click", function() {
            const $checkedMembers = $('input[id^="member_"]:checked');
            if (!validate($checkedMembers)) {
                return false;
            }

            const memberList = [];
            $('input[id^="member_"]').each(function() {
                if (this.checked) {
                    const member = {
                        seqPartner : '774',
                        seqMember : $(this).val(),
                        memberName : $(this).data('name'),
                        membershipNo : $(this).data('membershipNo'),
                        sendRoute : "MEMBER",
                        fromNumber : $('select[name="fromNumber"]').val(),
                        receiveNumber : $(this).data('mobile'),
                        reservationYn : 'N',
                        smsAgreeYn : $(this).data('smsAgree'),
                        regId : '9807',
                        updateId : '9807'
                    };
                    memberList.push(member);
                }
            });

            const data = {
                smsMemberList : memberList
            };
            popupSmsSend.open(data);
//          smsSendPopup.open($('[data-popup-location="팝업 위치"]'), data, null);
        });


		$('[data-action="openPopupSendAlimTalkAll"]').on("click", function() {
			let $formData = "";
			const $totalForm = $('form[name="totalSearch"]');
			const $detailForm = $('form[name="memberSearchDetail"]');

			if ($totalForm.find('input[name="searchWord"]').val().length > 0)
				$formData = $totalForm.serialize();
			else
				$formData =  $detailForm.serialize();

			$.ajax({
				url : '/member/search/sms',
				type : 'GET',
				contentType: 'application/x-www-form-urlencoded',
				data : $formData,
				dataType : 'json',
				beforeSend : function(xhr) {
					$.blockUI({
						message : '<h5 style="padding-top: 15px">로딩중입니다...</h5>',
						css : {
							'height' : '50px',
							'z-index' : 2010
						}
					});
				},
				success : function(returnData) {
					try {
						const memberList = [];
						$(returnData).each(function() {
							const member = {
								seqPartner : '774',
								seqMember : this.seqMember,
								memberName : this.name,
								membershipNo : this.membershipNo,
								sendRoute : "MEMBER",
								fromNumber : $('select[name="fromNumber"]').val(),
								receiveNumber : this.mobile,
								reservationYn : 'N',
								smsAgreeYn : this.smsAgreeYn,
								regId : '9807',
								updateId : '9807'
							};
							memberList.push(member);
						});

						const data = {
							smsMemberList : memberList
						};

						kakaoAlimTalkSendPopup.open(data, 'USER');

					} catch (ex) {
						alert('작업을 완료했으나 스크립트에 오류가 있습니다.');
						console.trace(ex);
						$.unblockUI();
					}
				},
				error : function(data) {
					alert('작업 중 오류가 발생하였습니다.');
					console.trace(data);
				},
				complete : function(xhr, textStatus) {
					$.unblockUI();
				}
			});
		});


		$('[data-action="openPopupSendAlimTalk"]').on('click', () => {
			const $checkedMembers = $('input[id^="member_"]:checked');
			if (!validate($checkedMembers)) {
				return false;
			}

			const memberList = [];
			$('input[id^="member_"]').each(function() {
				if (this.checked) {
					const member = {
						seqPartner : '774',
						seqMember : $(this).val(),
						memberName : $(this).data('name'),
						membershipNo : $(this).data('membershipNo'),
						sendRoute : "MEMBER",
						receiveNumber : $(this).data('mobile'),
						reservationYn : 'N',
						smsAgreeYn : $(this).data('smsAgree'),
						regId : '9807',
						updateId : '9807'
					};
					memberList.push(member);
				}
			});

			const data = {
				smsMemberList : memberList
			};

			kakaoAlimTalkSendPopup.open(data, 'USER');
		});

		$('[data-action="openPopupSendBpayCoupon"]').on('click', () => {
			const checkedMemberList = $('input[id^="member_"]:checked');
			// if(!validate(checkedMemberList)) return false;
			const memberList = [];
			checkedMemberList.each(function() {
				memberList.push(Number(this.value));
			});
			popupSendBPayCoupon.open(memberList);
		});

		$('[data-action="openPopupSendBpayCouponAll"]').on('click', () => {
			const checkedMemberList = $('input[id^="member_"]');
//			if(!validate(checkedMemberList)) return;
			const memberList = [];
			checkedMemberList.each(function() {
				memberList.push(Number(this.value));
			});
			popupSendBPayCoupon.open(memberList);
		});


        const validate = function($checkedMembers) {
            if ($checkedMembers.length === 0) {
                alert('선택된 회원이 없습니다.');
                return false;
            }

            const smsAgreeMembers = $checkedMembers.filter((idx, ele) => {
                return $(ele).data('smsAgree') === 'Y';
            });
            if (smsAgreeMembers.length === 0) {
                alert('선택한 회원은 모두 SMS 수신을 \'미동의\'한 회원입니다.');
                return false;
            }

            return true;
        };

        $("#openPopupSendExtension").on("click", function() {
        	if(partnerInfo.partner.isHeadquarter) {
        		alert("지점을 선택해 주세요.");
        		return;
			}
            memberInfo.openPopupSendExtension();
        });

        $("#btnAddMemberGroup").on("click", function() {
			if(partnerInfo.partner.isHeadquarter) {
				alert("지점을 선택해 주세요.");
				return;
			}

            if($("input[id^='member_']:checked").length == 0) {
                alert('선택된 회원이 없습니다.');
                return;
            }

            memberInfo.retrieveCheckedSeqMember();
            memberInfo.btnGroupSearch();
            memberInfo.popOpen($('.group_add'));
        });

        $("#btnAddMemberMission").on("click", function() {
            if($("input[id^='member_']:checked").length == 0) {
                alert('선택된 회원이 없습니다.');
                return;
            }

            memberInfo.retrieveCheckedSeqMember();
            memberInfo.btnMissionSearch();
            memberInfo.popOpen($('.mission_add'));
        });

        $("#btnDeleteMember").on("click", function() {
			if(partnerInfo.partner.isHeadquarter) {
				alert("지점을 선택해 주세요.");
				return;
			}

        	const table = document.getElementById("memberSearchList");
        	const checkedList = Array.from(table.querySelectorAll("tbody [name='seqMember']:checked"));
        	const removeList = checkedList.map(item => {
				return item.getAttribute("data-name") || "-";
			});
            if(!checkedList.length) {
                alert("선택된 회원이 없습니다.");
                return;
            }
            const getRemoveInfo = () => {
            	const maxLength = 3;
            	const length = removeList.length;
            	if(length < maxLength) {
            		return removeList.join(", ");
				} else {
					const sliceList = removeList.slice(0, maxLength).join(", ");
					const remainLength = length - maxLength;
					return sliceList + ((remainLength) ? " 외 " + getComma(remainLength) + "명" : "");
				}
			};
			uiPopup({
				template : `
					<style type="text/css">
						.popupRemoveMember .middle				{text-align:center; font-size:13.5px}
						.popupRemoveMember .middle .ui-note		{margin:8px 0}
					</style>
					<div class="popupRemoveMember tiny">
						<div class="top">
							<h2>
								회원 삭제
								<a data-event="close"></a>
							</h2>
						</div>
						<div class="middle">
							아래 선택된 회원(들)을 삭제합니다.<br>
							<p class="ui-note red" style="display:block; margin-top:1em; text-align:center">
								${getRemoveInfo()}
							</p>
							<b class="red">삭제 후, 복구가 불가능</b>하며, 결제내역은 사라지지 않습니다.<br>
							정말로 삭제하시겠습니까?<br>
						</div>
						<div class="bottom">
							<button class="ui-button gray" data-event="close">취소</button>
							<button class="ui-button red" data-event="remove">삭제</button>
						</div>
					</div>
				`,
				event : {
					click : {
						close : function() {
							uiPopup();
						},
						remove : function() {
							memberInfo.btnDeleteMember();
						}
					}
				}
			});
        });

        $("#btnAddMemberCall").on("click", function() {
            if($("input[id^='member_']:checked").length == 0) {
                alert('선택된 회원이 없습니다.');
                return;
            }

            memberInfo.popOpen($('.call_member'));
        });

        $('#btnSelectAll').on('click', function () {
            if($(this).prop('checked')) {
                memberInfo.btnSelectAll();
            } else {
                memberInfo.btnDeSelectAll();
            }
        });

        $('#btnSelectMember').on('click', function () {
            memberInfo.btnSelectMember();
        });

        $('#btnAddGroup').on('click', function () {
            memberInfo.btnAddGroup($('.group_add'));
        });

        $('#btnAddMission').on('click', function () {
            memberInfo.btnAddMission($('.group_add'));
        });

        $("#btnMemberRegist").on("click", function() {
            memberInfo.btnMemberRegist();
        });

        $("#btnSearch").on("click", function() {
            memberInfo.btnSearch();
        });

        $("#btnExpireSearch").on("click", function() {
            if ( $("select[name$='search_expire']").val() == "" )
            {
                alert("기간 검색조건을 선택해 주세요");
                return false;
            }

            $("#expireSearchYn").val("Y");

            memberInfo.btnSearch();
        });

        $("#btnRemainNumberSearch").on("click", function() {
            if ( $("select[name$='search_number']").val() == "" )
            {
                alert("기간 검색조건을 선택해 주세요");
                return false;
            }

            if ( $("#fromRemainNumber").val() == "" || $("#toRemainNumber").val() == "" )
            {
                alert("이용횟수를 입력해 주세요");
                return false;
            }

            $("#remainNumberSearchYn").val("Y");

            memberInfo.btnSearch();
        });


        $("#btnGroupSearch").on("click", function () {
        	/*
            var groupSearchWord = "" + $("input[name$='groupSearchWord']").val();
            if(groupSearchWord.length === 0) {
                alert("그룹명을 입력하여 주십시오.");
                return;
            }
			*/
            memberInfo.btnGroupSearch();
        });

        $("#btnMissionSearch").on("click", function () {
            var missionSearchWord = "" + $("input[name$='missionSearchWord']").val();
            if(missionSearchWord.length === 0) {
                alert("미션명을 입력하여 주십시오.");
                return;
            }

            memberInfo.btnMissionSearch();
        });

        $('.tabBtn').on('click', function () {
            $('#frmMemberSearch').find(".selectBox").find('option:first').prop("selected", "selected");
            $('.tabBtn').removeClass('active');
            $(this).addClass('active');
            $('input[name=memberPayment]').val($(this).val());

            if ( $('input[name=memberPayment]').val().indexOf("EXPIRED_") != -1 )
            {
                $('input[name=expireGubun]').val($(this).data("expire-gubun"));
            }

            memberInfo.btnSearch();
        });

        $("#smsTextArea").keyup(function() {
            checkStringByteLength($(this));
        });


        function checkStringByteLength(target) {
            const stringByteLength = memberInfo.textByte(target);
            $('#stringByteLength').text(stringByteLength);

            const smsType = $('#smsType');

            if ($('[name="mmsImg"]').val() !== '') {
                smsType.text('');
                const html = "<i class=\"c_red\">MMS로 전송되며, 6회 차감됩니다.</i>";
                smsType.append(html);

            } else if (stringByteLength * 1 > 80) {
                smsType.text('');
                const html = "<i class=\"c_red\">LMS로 전송되며, 3회 차감됩니다.</i>";
                smsType.append(html);

            } else {
                smsType.text('SMS');
            }
        }


        $("input[name$='memberSearchWord']").val("");
        $("select[name$='orderby']").val("");

        var memberAges = '' * 1;
        if( memberAges != 0) {
            $("select[name$='memberAges']").val("");
        }




        // [신규고객 등록] 버튼 클릭
        $(document).on('click', '[data-function="신규고객 등록 팝업 열기"]', function() {
            memberRegistPopup.open('regist', $('[data-popup-location="팝업 위치"]'));
        });

        $('[name="mmsImg"]').on({
            change : (event) => {
                event.preventDefault();
                checkStringByteLength($("#smsTextArea"));
            }
        });

        $('[data-action="deleteMmsImg"]').on('click', (event) => {
            event.preventDefault();
            $('[name="mmsImg"]').val('');
            checkStringByteLength($("#smsTextArea"));
        });
   };

    var memberInfo = {

        memberCheck : function() {
            $('.fl > h4').text(memberCount + '명의 회원 중 ' + $("input[id^='member_']:checked").length + '명이 선택되었습니다.');
        },
        btnMemberRegist : function() {
            location.href = "/manager/member/memberRegist";
        },
        textByte : function (obj) {
            var stringByteLength = (function(s,b,i,c){
                for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?2:c>>7?2:1);
                return b
            })(obj.val());

            return stringByteLength;
        },
        btnSearch : function() {

            $("#frmMemberSearch").attr("action", "/member");
            $("#frmMemberSearch").attr("method", "post");
            $('#frmMemberSearch').submit();
        },

        btnSelectMember : function () {
            $('.select').show();
            $('#btnSelectMember').hide();
            $('#btnMemberRegist').hide();
        },
        btnSelectAll : function () {
            $('.checkBox').prop('checked', true);
            $('.fl > h4').text(memberCount + '명의 회원 중 ' + $("input[id^='member_']:checked").length + '명이 선택되었습니다.');
        },
        btnDeSelectAll : function () {
            $('.checkBox').prop('checked', false);
            $('.fl > h4').text(memberCount + '명의 회원 중 ' + $("input[id^='member_']:checked").length + '명이 선택되었습니다.');
        },
        btnGroupSearch : function() {
            var url = "/manager/mission/missionGroupSearch/";
            //var formData = $("#frmMemberSearch").serialize();
            var formData = $("input[name$='groupSearchWord']").serialize();

            $.ajax({
                type: 'POST',
                dataType: "json",
                contentType: 'application/x-www-form-urlencoded;charset=utf-8',
                url: url,
                data: formData,
                success: function (data) {
                    if(data.result === 'ok') {
                        var groupSearchList = data.groupSearchList;
                        $("#divSearchResult").html('');

                        if(groupSearchList.length === 0) {
                            var listHtml = '<div class=\"no_data\"><p>검색 결과가 없습니다.</p></div>';
                            //					$("#divSearchResult").attr('class','no_data');
                            $("#divSearchResult").html(listHtml);
                        } else {
                            $("#divSearchResult").attr('class','grid_list latest');
                            $("#divSearchResult").attr('style','height:150px');
                            var listHtml = '<ul>';
                            for(var i in groupSearchList) {
                                var group = groupSearchList[i];
                                //시작일 ~ 종료일 format 필요.
                                var objStartDt = moment(group.startDt);
                                var formattedStartDt = objStartDt.get('year') + "." + (objStartDt.get('month') + 1) + "." + objStartDt.get('date');
                                var objEndDt = moment(group.endDt);
                                var formattedEndDt = objEndDt.get('year') + "." + (objEndDt.get('month') + 1) + "." + objEndDt.get('date');
                                listHtml = listHtml
                                    + '<li>'
                                    + '<input type="checkbox" name="seqGroup" id="g_' + i + '" value="' + group.seqGroup + '"><label for="g_' + i + '">선택하기</label>'
                                    + '  <div class="card_itm">'
                                    + '    <p class="title">' + group.groupName + '</p>'
                                    + '    <p class="unit"><strong>기간</strong> <span>' + formattedStartDt + ' - ' + formattedEndDt + '</span></p>'
                                    + '    <p class="unit"><strong>인원</strong> <span>' + group.memberCount + '</span></p>'
                                    + '        <div class="info">'
                                    + '      <p class="pic"><img src="' + group.coachImgUrl + '" alt="" onerror="this.onerror=null;this.src=\'/img/pic/male.jpg\';"></p>'
                                    + '      <p class="name"><span></span> ' + group.coachName + '</p>'
                                    + '    </div>'
                                    + '  </div>'
//                                  + '  <a href="/manager/group/groupMemberInfo/' + group.seqGroup +'" class="view" target="_blank">상세보기</a>'
                                    + '</li>';
                            }
                            listHtml += '</ul>';
                            $("#divSearchResult").html(listHtml);
                        }
                        popHeight();
                    } else {
                        alert("error");
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });
        },
        popOpen : function(obj){
            obj.fadeIn(300);
            popHeight(); // 화면 정렬을 위한 팝업 사이즈 높이 값 계산
            return false;
        },
        popClose : function(){
            $('.popup').fadeOut(300);
            $('.popup').find('textarea').val('');
            $('.popup').find('input').val('');
            $('#stringByteLength').text('0');
            return false;
        },
        extensionInsert : function(){
			const extensionCount = $('input[name=extensionCount]').val();
        	const extensionDate = $('input[name=extensionDate]').val();
			const extensionType = $('input[name=extensionType]:checked').val();
            $extensionDay = $('input[name=extensionDay]').val();

            if (!confirm("이용중인 전체 회원의 이용기간이 "+$extensionDay+"일 만큼 연장 됩니다.\n\n계속 진행 하시겠습니다까?")) {
                return;
            }

			if(!extensionDate) {
				alert('기준 날짜 선택해 주세요.');
				$('input[name=extensionDate]').focus();
				return;
			}

            if($extensionDay == '') {
                alert('전체 이용권 기간 연장일을 입력해 주세요.');
                $('input[name=extensionDay]').focus();
                return;
            }

            if($extensionDay > 365) {
                alert('전체 이용권 기간 연장일은 1년을 초과할 수 없습니다.');
                $('input[name=extensionDay]').focus();
                return;
            }
            const url = `/manager/member/insertExtension?extensionDay=${$extensionDay}&userNum=${extensionCount}&extensionDate=${extensionDate}&extensionType=${extensionType}`;

            $.ajax({
                type: 'POST',
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                url: url,
                data: "",
				beforeSend : function(xhr) {
					$.blockUI({
						message : '<h5 style="padding-top: 15px">처리 중입니다.<br>(시간이 오래 걸릴 수 있습니다.)</h5>',
						css : {
							'height' : '65px',
							'z-index' : 2010
						}
					});
				},
                success: function (data) {
                    if(data.result == 'ok') {
                        alert('이용권이 연장 되었습니다.');
                        location.reload();
                    } else {
                        alert(data.result_code);
                    }
                },
                error: function (data) {
                    console.log(data);
                    alert('이용권이 연장에 실패하였습니다.\n관리자에게 문의하십시오.');
                },
				complete : function(xhr, textStatus) {
					$.unblockUI();
				}
            });
        },

		getAvailableCount : function(extensionDate, callback) {
			let url = '/member/search/available-cnt';
			if(extensionDate) url += "?extensionDate=" + extensionDate;
			$.ajax({
				url : url,
				type : 'GET',
				contentType : 'application/x-www-form-urlencoded',
				dataType : 'json',
				beforeSend : function(xhr) {
					$.blockUI({
						message : '<h5 style="padding-top: 15px">로딩중입니다...</h5>',
						css : {
							'height' : '50px',
							'z-index' : 2010
						}
					});
				},
				success : function(extensionCount) {
					if(callback) callback(extensionCount);
				},
				error : function(data) {
					alert('작업 중 오류가 발생하였습니다.');
					console.trace(data);
				},
				complete : function(xhr, textStatus) {
					$.unblockUI();
				}
			});
		},

        openPopupSendExtension : function (extensionDate) {
			this.getAvailableCount(null, (extensionCount) => {
				const self = this;
				const $extensionPopup = $('.extension');
				const setExtensionCount = (extensionCount) => {
					$extensionPopup.find('[name="extensionCount"]').val(extensionCount);
					$extensionPopup.find('[data-display="memberCnt"]').text('총 ' + extensionCount + '명');
				};
				memberInfo.popOpen($extensionPopup);
				setExtensionCount(extensionCount);
				$extensionPopup.find('.calendar').datepicker("setDate", new Date());
				$extensionPopup.find('.calendar').on('change', function() {
					const extensionDate = this.value;
					self.getAvailableCount(extensionDate, (extensionCount) => {
						setExtensionCount(extensionCount);
					});
				});
			});
		},

        btnAddGroup : function () {
            memberInfo.retrieveCheckedSeqGroup();
            if ($("input[name$='checkedSeqGroup']").val() === '') {
                alert('그룹을 선택해주세요');
                return false;
            }

            memberInfo.retrieveCheckedSeqMember();
            var url = "/manager/member/memberAddGroups";
            var formData = $("#frmSearchGroupList").serialize();

            $.ajax({
                type: 'POST',
                dataType: "json",
                contentType: 'application/x-www-form-urlencoded',
                url: url,
                data: formData,
                success: function (data) {
                    if(data.result === 'ok') {
                        alert("그룹이 추가 되었습니다.");
                        location.reload();
                    } else {
                        alert('그룹 추가중 오류가 발생하였습니다.\n관리자에게 문의하십시오.');
                    }
                },
                error: function (data) {
                    console.log(data);
                    alert('그룹 추가중 오류가 발생하였습니다.\n관리자에게 문의하십시오.');
                }
            });
        },
        btnMissionSearch : function() {

            var url = "/manager/group/groupMissionSearch/";
            //var formData = $("#frmMemberSearch").serialize();
            var formData = $("input[name$='missionSearchWord']").serialize();
            $.ajax({
                type: 'POST',
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                url: url,
                data: formData,
                success: function (data) {
                    if(data.result === 'ok') {
                        var missionSearchList = data.missionSearchList;

                        $("#divMissionSearchResult").html('');
                        if(missionSearchList.length === 0) {
                            var listHtml = '<div class=\"no_data\"><p>검색 결과가 없습니다.</p></div>';
                            //					$("#divMissionSearchResult").attr('class','no_data');
                            $("#divMissionSearchResult").html(listHtml);
                        } else {
                            $("#divMissionSearchResult").attr('class','grid_list latest');
                            $("#divMissionSearchResult").attr('style','height:150px');
                            var listHtml = '<ul>';
                            for(var i in missionSearchList) {
                                var mission = missionSearchList[i];
                                //시작일 ~ 종료일 format 필요.
                                var objStartDt = moment(mission.startDt);
                                var formattedStartDt = objStartDt.get('year') + "." + (objStartDt.get('month') + 1) + "." + objStartDt.get('date');
                                var objEndDt = moment(mission.endDt);
                                var formattedEndDt = objEndDt.get('year') + "." + (objEndDt.get('month') + 1) + "." + objEndDt.get('date');
                                listHtml = listHtml + '<li><input type="checkbox" name="seqMission" value="' + mission.seqMission + '" id="mb_' + mission.seqMission + '"><label for="mb_' + mission.seqMission + '">선택하기</label>'
                                    + ' <div class="card_itm">'
                                    + ' <p class="title">' + mission.name + '</p>'
                                    + ' <p class="unit"><strong>기간</strong> <span>' + formattedStartDt + ' - ' + formattedEndDt + '</span></p>'
                                    + ' </div>'
                                    + ' <a href="/manager/mission/missionMemberInfo/' + mission.seqMission +'" class="view" target="_blank">상세보기</a></li>';
                            }
                            listHtml += '</ul>';
                            $("#divMissionSearchResult").html(listHtml);
                        }
                        popHeight();
                    } else {
                        alert("error");
                    }
                },
                error: function (data) {
                    console.log(data);
                    alert("error");
                }
            });
        },
        btnAddMission : function () {
            memberInfo.retrieveCheckedSeqMember();
            memberInfo.retrieveCheckedSeqMission();

            if($("input:checkbox[name=seqMission]:checked").length == 0) {
                alert('미션을 1개이상 선택하여 주십시오.');
                return;
            }

            var url = "/manager/member/memberAddMissions";
            var formData = $("#frmSearchMissionList").serialize();

            $.ajax({
                type: 'POST',
                dataType: "json",
                contentType: 'application/x-www-form-urlencoded',
                url: url,
                data: formData,
                success: function (data) {
                    if(data.result === 'ok') {
                        alert("미션이 추가 되었습니다.");
                        location.reload();
                    } else {
                        alert('미션 추가중 오류가 발생하였습니다.\n관리자에게 문의하십시오.');
                    }
                },
                error: function (data) {
                    console.log(data);
                    alert('미션 추가중 오류가 발생하였습니다.\n관리자에게 문의하십시오.');
                }
            });
        },
        retrieveCheckedSeqMember : function () {
            var checkedMember = [];
            $("input[id^='member_']").each(function() {
                if(this.checked) {
                    checkedMember.push($(this).val());
                }
            });
            $("input[name$='checkedMember']").val(checkedMember);
        },
        retrieveCheckedSeqMission : function () {
            var checkedSeqMission = [];
            $("input[name$='seqMission']").each(function() {
                if(this.checked) {
                    checkedSeqMission.push($(this).val());
                }
            });
            $("input[name$='checkedSeqMission']").val(checkedSeqMission);
        },
        retrieveCheckedSeqGroup : function () {
            var checkedSeqGroup = [];
            $("input[name$='seqGroup']").each(function() {
                if(this.checked) {
                    checkedSeqGroup.push($(this).val());
                }
            });
            $("input[name$='checkedSeqGroup']").val(checkedSeqGroup);
        },

        btnDeleteMember : function() {
            const members = $('input[type="checkbox"][id^="member_"]:checked').get().map(member => {
                return {
                    seqMember : $(member).val()
                }
            });
            const data = {
                members : members
            };


            MemberController.delete(data, function(resultData) {
                alert('선택된 회원이 삭제되었습니다.');
                location.reload();
            });
        }
    };

	function searchExcelDown(){
		let $formData = "";
		const $totalForm = $('form[name="totalSearch"]');
		const $detailForm = $('form[name="memberSearchDetail"]');

		const excelLink = $("#searchMemberExcel");
		const excelButton = excelLink.find("button");

		if($totalForm.find('input[name="searchWord"]').val().length > 0)
			$formData = $totalForm.serialize();
		else
			$formData = $detailForm.serialize();

//		아래와 같이 단순하게 다운로드 가능
//		location.href = "/member/search/excel?" + $formData;

		const excelDownload = function(url, data) {
			return new Promise(function(resolve, reject) {
				url = url + "?" + data;
				const request = new XMLHttpRequest();
				request.open("GET", url);
				request.responseType = "blob";
				request.onreadystatechange  = function() {
					if(this.readyState == 4) {
						if(this.status == 200) {
							const disposition = request.getResponseHeader("content-disposition");
							const isFilename = (disposition && disposition.indexOf("filename") > -1);
							const filename = (isFilename) ? disposition.split("filename=")[1].split(";")[0] : "excel.xml";
							const a = document.createElement("a");
							const url = URL.createObjectURL(this.response);
							a.href = url;
							a.download = filename;
							document.body.appendChild(a);
							a.click();
							window.URL.revokeObjectURL(url);
							resolve(this);
						} else {
							reject(this);
						}
					}
				}
				request.send();
			});
		};
		const changeButton = (isActive) => {
			if(isActive) {
				excelLink.attr("href", "javascript:searchExcelDown()");
				excelButton.text("검색된 전체 회원 엑셀 다운로드");
				excelButton.attr("class", "btn green excel");
			} else {
				excelLink.attr("href", "#");
				excelButton.text("다운로드 중 입니다. 잠시만 기다려 주세요.");
				excelButton.attr("class", "btn gray excel");
			}
		};

		changeButton(false);
		excelDownload("/member/search/excel", $formData).then(data => {
			console.log(data);
			changeButton(true);
		}).catch(error => {
			console.log(error);
			alert("다운로드에 실패하였습니다.");
			changeButton(true);
		});
	}

    function excelDown(){
        var resultBool = false;
        $.ajax({
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            dataType: 'json',
            url: "/exceldown?category=member",
            data: "",
            beforeSend : function() {
                $("#excelDownBtn").text("다운 로드 중입니다.... 잠시만 기다려 주세요.");
                $("#excelDownBtn").attr("href","#")
            },
            success: function(data) {

                if(data.result =="ok") {
                    location.href=data.fileName;
                }else if(data.result =="NO") {
                    resultBool = true;
                    location.href="/manager/accounting/authCheck?redirectUrl=/manager/member/";
                }else{
                    alert("다운로드가 실패 되었습니다.\n\n다시 시도해 주세요.");
                }
            },
            error: function(request) {
                alert("다운로드가 실패 되었습니다.\n\n다시 시도해 주세요");
            },
            complete : function(data) {
                if(!resultBool){
                    excelBtnRollback();
                }
            }
        });
    }

    function excelBtnRollback(){
        $("#excelDownBtn").text("전체 회원 엑셀 다운로드");
        $("#excelDownBtn").attr("href","javascript:excelDown();");
        alert("다운로드가 완료 되었습니다.\n\n다운로드 폴더를 확인해 주세요.")
    }
</script>
<style>
	.search_bar .con_top{background: #ffffff; height: 65px; margin-left: -130px; margin-top: -25px;}
	.search_bar .con_top>div>.data_info>.fls{width: 180px;}
	.search_bar .con_top>div>.data_info>.fls #use_exist{max-width: 180px; margin-left: -45px;}
	@media only screen and (max-width:1425px) {
		.search_bar .con_top{margin-left: -40px;}
		.search_bar .con_top>div>.data_info>.fls{width: 135px;}
		.search_bar .con_top>div>.data_info>.fls2{margin-left: 50px;}
	}
</style>

                                                                                                                                                                                                         <!-- body E -->

	</div>
</body>
</html>
