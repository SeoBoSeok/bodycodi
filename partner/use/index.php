
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
	<script type="text/javascript" src="/static/js/controller/partnerController.js"></script>
	<script type="text/javascript" src="/static/js/common/jquery/jquery.dataTables.min.js"></script>
	<link type="text/css" rel="stylesheet" href="/static/css/jquery/jquery.dataTables.css">
	<style type="text/css"></style>
</head>
<body>



<!-- 로컬 네비게이션 바 -->
<nav class="ui-nav" data-index="센터관리">
	<div class="right">
		<a href="/sms/send">SMS/알림톡</a>
		<a href="/partner/naver">네이버 연동</a>
		<a href="/partner/keepfit">키핏 연동</a>
		<a href="/partner/operation">센터 설정</a>
		<a href="/manager/group">그룹 관리</a>
		<a href="/locker">락커 관리</a>
		<a href="/product/public">일반 상품 관리</a>
		<a href="/reservationsetting/setting/appointment">예약정책</a>
		<a href="/partner/use">입장 내역</a>
		<a href="/manager/history/index">히스토리</a>
	</div>
	<script type="text/javascript">
		(function() {
			const pathname = window.location.pathname;
			const a = document.querySelector(".ui-nav").querySelectorAll("a");
			a.forEach(item => {
				if(pathname == item.getAttribute("href"))
					item.classList.add("focus");
			});
		})();
	</script>
</nav>


<!-- 콘텐츠 -->
<div class="contents">
	<main>
		<!-- 검색 -->
		<section data-id="search">
			<form name="search" action="" method="post" autocomplete="off" onsubmit="return false">
				<div class="ui-search">
					<div class="date">
						<input name="startDate" type="calendar" value="today">
						<span>부터</span>
						<input name="endDate" type="calendar" value="today">
						<span>까지</span>
						<div class="quick">
							<ul>
								<li><a>당해</a></li>
								<li><a>3개월</a></li>
								<li><a>당월</a></li>
								<li><a>전월</a></li>
								<li><a>오늘</a></li>
								<li><a>어제</a></li>
								<li><a>1주</a></li>
								<li><a>2주</a></li>
							</ul>
						</div>
					</div>
					<div class="time">
						<select class="ui-select" name="visitTimeStart">
							<option value="">시</option>
							<option value="">시</option>
							
								
								<option value="00">00</option>
							
								
								<option value="01">01</option>
							
								
								<option value="02">02</option>
							
								
								<option value="03">03</option>
							
								
								<option value="04">04</option>
							
								
								<option value="05">05</option>
							
								
								<option value="06">06</option>
							
								
								<option value="07">07</option>
							
								
								<option value="08">08</option>
							
								
								<option value="09">09</option>
							
								
								<option value="10">10</option>
							
								
								<option value="11">11</option>
							
								
								<option value="12">12</option>
							
								
								<option value="13">13</option>
							
								
								<option value="14">14</option>
							
								
								<option value="15">15</option>
							
								
								<option value="16">16</option>
							
								
								<option value="17">17</option>
							
								
								<option value="18">18</option>
							
								
								<option value="19">19</option>
							
								
								<option value="20">20</option>
							
								
								<option value="21">21</option>
							
								
								<option value="22">22</option>
							
								
								<option value="23">23</option>
							
						</select>
						:
						<select class="ui-select" name="visitMinStart">
							<option value="">분</option>
							<option value="">분</option>
							
								
								<option value="00">00</option>
							
								
								<option value="05">05</option>
							
								
								<option value="10">10</option>
							
								
								<option value="15">15</option>
							
								
								<option value="20">20</option>
							
								
								<option value="25">25</option>
							
								
								<option value="30">30</option>
							
								
								<option value="35">35</option>
							
								
								<option value="40">40</option>
							
								
								<option value="45">45</option>
							
								
								<option value="50">50</option>
							
								
								<option value="55">55</option>
							
						</select>
						-
						<select class="ui-select" name="visitTimeEnd">
							<option value="">시</option>
							<option value="">시</option>
							
								
								<option value="00">00</option>
							
								
								<option value="01">01</option>
							
								
								<option value="02">02</option>
							
								
								<option value="03">03</option>
							
								
								<option value="04">04</option>
							
								
								<option value="05">05</option>
							
								
								<option value="06">06</option>
							
								
								<option value="07">07</option>
							
								
								<option value="08">08</option>
							
								
								<option value="09">09</option>
							
								
								<option value="10">10</option>
							
								
								<option value="11">11</option>
							
								
								<option value="12">12</option>
							
								
								<option value="13">13</option>
							
								
								<option value="14">14</option>
							
								
								<option value="15">15</option>
							
								
								<option value="16">16</option>
							
								
								<option value="17">17</option>
							
								
								<option value="18">18</option>
							
								
								<option value="19">19</option>
							
								
								<option value="20">20</option>
							
								
								<option value="21">21</option>
							
								
								<option value="22">22</option>
							
								
								<option value="23">23</option>
							
						</select>
						:
						<select class="ui-select" name="visitMinEnd">
							<option value="">분</option>
							<option value="">분</option>
							
								
								<option value="00">00</option>
							
								
								<option value="05">05</option>
							
								
								<option value="10">10</option>
							
								
								<option value="15">15</option>
							
								
								<option value="20">20</option>
							
								
								<option value="25">25</option>
							
								
								<option value="30">30</option>
							
								
								<option value="35">35</option>
							
								
								<option value="40">40</option>
							
								
								<option value="45">45</option>
							
								
								<option value="50">50</option>
							
								
								<option value="55">55</option>
							
						</select>
					</div>
					<div class="condition">
						<select class="ui-select" name="seqPartnerGroup">
							<option value="">그룹 선택</option>
							<option value="">그룹 선택</option>
							
								<option value="617">6대1 그룹</option>
							
								<option value="703">최진호 그룹 확인</option>
							
						</select>
						<select class="ui-select" name="sex">
							<option value="">성별 선택</option>
							<option value="">성별 선택</option>
							<option value="M">남성</option>
							<option value="F">여성</option>
						</select>
						<select class="ui-select" name="seqPartnerProductPass">
							<option value="">서비스 선택</option>
							<option value="">서비스 선택</option>
							
								<option value="1">PT (헬스)</option>
							
								<option value="2">PT(프리미엄)</option>
							
								<option value="3">PT (필라테스)</option>
							
								<option value="4">기구필라테스 그룹레슨</option>
							
								<option value="5">그룹레슨</option>
							
								<option value="6">기구필라테스 그룹레슨</option>
							
								<option value="7">G.X</option>
							
								<option value="8">헬스 회원권</option>
							
								<option value="9">헬스</option>
							
								<option value="10">락카</option>
							
								<option value="11">락카</option>
							
								<option value="12">운동복</option>
							
								<option value="13">운동복</option>
							
								<option value="14">헬스 회원권</option>
							
								<option value="15">테니스 1:1 주3회(월수금)클레스</option>
							
								<option value="16">골프</option>
							
								<option value="17">골프</option>
							
								<option value="18">테니스 1:1  주2회(월수)클레스</option>
							
								<option value="19">인트로 수업</option>
							
								<option value="20">기구필라테스 그룹레슨</option>
							
								<option value="21">개인PT</option>
							
								<option value="22">골프</option>
							
								<option value="23">테니스 1:1  주2회(월수)클레스</option>
							
								<option value="24">PT (필라테스)</option>
							
								<option value="25">테니스 1:1 주3회(월수금)클레스</option>
							
								<option value="26">테니스 1:1 주3회(월수금)클레스</option>
							
								<option value="27">테니스 1:1 주3회(월수금)클레스</option>
							
								<option value="28">테니스 1:1 주3회(월수금)클레스</option>
							
								<option value="29">테니스 1:1 주3회(월수금)클레스</option>
							
								<option value="30">테니스 1:1  주2회(월수)클레스</option>
							
								<option value="31">테니스 1:1  주2회(월수)클레스</option>
							
								<option value="32">테니스 1:1  주2회(월수)클레스</option>
							
								<option value="33">테니스 1:1  주2회(월수)클레스</option>
							
								<option value="34">테니스 1:1  주2회(월수)클레스</option>
							
								<option value="35">테니스 1:1 주3회(월수금)클레스</option>
							
								<option value="36">헬스 PT</option>
							
								<option value="37">골프 PT 111111</option>
							
								<option value="38">골프</option>
							
								<option value="39">PT (20분)111</option>
							
								<option value="40">골프</option>
							
								<option value="41">GX</option>
							
								<option value="42">PT (필라테스)</option>
							
								<option value="43">프롬_그룹수업</option>
							
								<option value="44">프롬_개인 PT 10회</option>
							
								<option value="17770">123</option>
							
								<option value="17856">헬스 (횟수제)</option>
							
								<option value="17858">PT (테스트)</option>
							
								<option value="17884">락커</option>
							
								<option value="17936">개인레슨 /  회당 3만원</option>
							
								<option value="18042">락커</option>
							
								<option value="18111">삭제테스트용</option>
							
								<option value="18112">판매후삭제용</option>
							
								<option value="18359">정기레슨</option>
							
								<option value="18374">실전숏게임</option>
							
								<option value="18375">입문레슨C1</option>
							
								<option value="18376">실전숏게임</option>
							
								<option value="18377">실전9홀 레슨</option>
							
								<option value="18384">입문레슨 C1</option>
							
								<option value="18538">홈바디</option>
							
								<option value="18613">요가</option>
							
								<option value="18663">PT1</option>
							
								<option value="19015">필라테스 개인레슨</option>
							
								<option value="19047">시설이용권</option>
							
								<option value="19347">개인레슨</option>
							
								<option value="19513">정기레슨</option>
							
								<option value="19514">입문레슨 C1</option>
							
								<option value="19515">입문레슨 C2</option>
							
								<option value="19516">입문레슨 C3</option>
							
								<option value="19517">그룹레슨</option>
							
								<option value="19518">주말 레슨(쿠폰)</option>
							
								<option value="19519">커플레슨</option>
							
								<option value="19520">원포인트 레슨</option>
							
								<option value="19521">체인지레슨</option>
							
								<option value="19522">실전 숏게임 레슨</option>
							
								<option value="19523">개인레슨</option>
							
								<option value="19524">헬스</option>
							
								<option value="19542">정기레슨 30분</option>
							
								<option value="19543">정기레슨</option>
							
								<option value="19544">입문레슨 C1</option>
							
								<option value="19545">입문레슨 C2</option>
							
								<option value="19546">입문레슨 C3</option>
							
								<option value="19547">그룹레슨</option>
							
								<option value="19548">주말 레슨</option>
							
								<option value="19549">커플레슨(50분)</option>
							
								<option value="19550">원포인트</option>
							
								<option value="19551">체인지 레슨</option>
							
								<option value="19552">숏게임 레슨(1회)</option>
							
								<option value="19553">9홀 라운드 레슨</option>
							
								<option value="19554">정기레슨 70분</option>
							
								<option value="19558">숏게임 레슨(5회)</option>
							
								<option value="19559">숏게임 레슨(10회)</option>
							
								<option value="19561">풀패키지 입문레슨</option>
							
								<option value="19597">개인PT</option>
							
								<option value="19598">그룹수레슨</option>
							
								<option value="19599">헬스</option>
							
								<option value="19600">락커</option>
							
								<option value="19601">운동복</option>
							
								<option value="19667">펑셔널트레이닝</option>
							
								<option value="19729">개인레슨</option>
							
								<option value="19813">그룹수업</option>
							
								<option value="19838">ㅇㅇ</option>
							
								<option value="19864">평일(20분)</option>
							
								<option value="19915">H3M</option>
							
								<option value="19917">필라테스 48회 6M</option>
							
								<option value="19998">듀엣레슨</option>
							
								<option value="20069">테스트</option>
							
								<option value="20138">김반석</option>
							
								<option value="20164">1ㄹㄹㄹ</option>
							
								<option value="20192">11111</option>
							
								<option value="20193">307테스트</option>
							
								<option value="20195">요가 수업</option>
							
								<option value="20222">테스트</option>
							
								<option value="20236">선수코칭</option>
							
								<option value="20303">개인레슨</option>
							
								<option value="20476">개인 횟수 테스트</option>
							
								<option value="20477">테스트 락커</option>
							
								<option value="20478">시설</option>
							
								<option value="20523">테스트</option>
							
								<option value="20524">RRRR</option>
							
								<option value="20548">체형교정</option>
							
								<option value="20550">3대1</option>
							
								<option value="20551">3:1 레슨</option>
							
								<option value="20763">선생님 개인 15회</option>
							
								<option value="20810">22122</option>
							
								<option value="20872">test</option>
							
								<option value="20897">대관</option>
							
								<option value="20960">개인 레슨 (30분)</option>
							
								<option value="21017">1:6 그룹</option>
							
								<option value="21018">1:6 그룹 20회(3개월)</option>
							
								<option value="21019">주2회 3개월</option>
							
								<option value="21032">그룹레슨 (1:6)</option>
							
								<option value="21034">주2회 3개월</option>
							
								<option value="21274">바디프로필 그룹레슨</option>
							
								<option value="21275">바디프로필 개인레슨</option>
							
								<option value="21285">리포머 수업</option>
							
								<option value="21287">리포머 수업</option>
							
								<option value="21288">골프 (박정수 프로)</option>
							
								<option value="21290">원포인트 골프레슨 </option>
							
								<option value="21291">원포인트 골프레슨 </option>
							
								<option value="21292">마사지 서비스</option>
							
								<option value="21293">세신 </option>
							
								<option value="21308">벌크업 교육</option>
							
								<option value="21361">체험 프리다이빙</option>
							
								<option value="21362">라이프가드 그룹레슨 </option>
							
								<option value="21436">그룹수업 </option>
							
								<option value="21437">그룹수업</option>
							
								<option value="21464">1개월 주2회</option>
							
								<option value="21490">서비스 레슨</option>
							
								<option value="21529">봄맞이</option>
							
								<option value="21541">2:1 듀엣레슨 </option>
							
								<option value="21584">1:1 관리</option>
							
								<option value="21595">123123</option>
							
								<option value="21596">웨딩케어</option>
							
								<option value="21612">3:1 레슨 </option>
							
								<option value="21613">3:1 그룹레슨 </option>
							
								<option value="21659">그룹수업 </option>
							
								<option value="21729">개인PT</option>
							
								<option value="21791">라원 발레핏</option>
							
								<option value="21908">타석 이용권</option>
							
								<option value="21917">횟수제 시설</option>
							
								<option value="22074">유치원 1회 이용권</option>
							
								<option value="22080">유치원 20회 이용권 </option>
							
								<option value="22225">인어이용권 정기권</option>
							
								<option value="22289">인어다이브 쿠폰 20매</option>
							
								<option value="22470">1개월타석권</option>
							
								<option value="22472">ㄷㅈㄱㅈㄷㄱㅈㄷㄱ</option>
							
								<option value="22509">수영장 이용권</option>
							
								<option value="22587">타석이용권</option>
							
								<option value="22721">온라인 (PT)</option>
							
								<option value="22722">댄스 수업 (기간제)</option>
							
								<option value="22723">댄스 수업 (횟수제)</option>
							
								<option value="22766">테스트 그룹레슨</option>
							
								<option value="22780">GX 수업</option>
							
								<option value="22838">골프 15분 레슨 </option>
							
								<option value="22848">골프 30분 </option>
							
								<option value="22950">바디프로필 그룹 필라테스</option>
							
								<option value="22983">일일이용권</option>
							
								<option value="22984">라원 발레핏 일일수업</option>
							
								<option value="23001">수피아 OO지점</option>
							
								<option value="23030">1111111</option>
							
								<option value="23121">ㅎㅎ</option>
							
								<option value="23166">1:1 클라이밍 레슨</option>
							
								<option value="23167">[클라이밍] 이용권 </option>
							
								<option value="23201">ㅇㅇㅇ</option>
							
								<option value="23354">1회락커</option>
							
								<option value="23355">1회 이용권</option>
							
								<option value="23356">만쥬민주</option>
							
								<option value="23358">횟수권</option>
							
								<option value="23381">개인트레이닝11</option>
							
								<option value="23455">골프 20분 레슨</option>
							
								<option value="23483">[강남점] 개인레슨</option>
							
								<option value="23537">[강남점] 개인레슨</option>
							
								<option value="23722">삭제 테스트</option>
							
								<option value="23927">그룹 필라테스 46회 6개월</option>
							
								<option value="23943">pt</option>
							
								<option value="24157">탁구</option>
							
								<option value="24158">골프</option>
							
								<option value="24168">테테테스트</option>
							
								<option value="24179">daf</option>
							
								<option value="24181">헬스 시설 이용권</option>
							
								<option value="24183">운동복 대여</option>
							
								<option value="24215">필라테스 개인레슨</option>
							
								<option value="24342">서비스2회</option>
							
								<option value="24343">12345</option>
							
								<option value="24355">독클 스쿨 - 소형 10회</option>
							
								<option value="24372">123</option>
							
								<option value="24373">12회 세션당 50000원</option>
							
								<option value="24378">그룹수업 필라테스</option>
							
								<option value="24385">그룹수업 (해피아워)</option>
							
								<option value="24428">베이스레슨(취미)</option>
							
								<option value="24429">베이스기타(취미)</option>
							
								<option value="24550">캡틴짐 헬스 1개월</option>
							
								<option value="24553">24회권</option>
							
								<option value="24554">1:1 기구 필라테스</option>
							
								<option value="24561">일반헬스1개월</option>
							
								<option value="24563">일반헬스3개월</option>
							
								<option value="24571">최대예약테스트</option>
							
								<option value="24578">1:1 기구 필라테스</option>
							
								<option value="24579">5251</option>
							
								<option value="24598">락커(여부X)</option>
							
								<option value="24605">ddddddd</option>
							
								<option value="24618">개인레슨 11</option>
							
								<option value="24619">그룹수업 1</option>
							
								<option value="24698">트랙 수업 (실외)</option>
							
								<option value="24701">그룹</option>
							
								<option value="24722">헬스</option>
							
								<option value="24726">XX골프1:1레슨권</option>
							
								<option value="24760">11111</option>
							
								<option value="24761">ffcc</option>
							
								<option value="24812">차칸</option>
							
								<option value="24815">Sim Racing (아마추어)</option>
							
								<option value="24817">Sim Racing</option>
							
								<option value="24820">Real Track</option>
							
								<option value="24822">Real Track111</option>
							
								<option value="24823">패키지 1 (아마추어 Sim 5 + RT 1)</option>
							
								<option value="24824">패키지 2 (프로 Sim 3 + RT 1)</option>
							
								<option value="24825">패키지 3 (프로 Sim 9 + RT 3)</option>
							
								<option value="24826">패키지 4 (프로 Sim 3 + RT 10)</option>
							
								<option value="24827">패키지 5 (프로 Sim 30 + RT 10)</option>
							
								<option value="24849">개인레슨 이용권 상품 장소 테스트 버전</option>
							
								<option value="24850">개인레슨 이용권 상품 장소 테스트 버전</option>
							
								<option value="24854">핫딜핫딜</option>
							
								<option value="24859">유치원 10회권</option>
							
								<option value="24860">유치원 10회권</option>
							
								<option value="24873">유치원 100회권</option>
							
								<option value="24882">패키지 상품_Sim Racing</option>
							
								<option value="24888">상세페이지 테스트 60%</option>
							
								<option value="24890">테스트 개인레슨테스트 개인레슨</option>
							
								<option value="24891">필라테스 상세페이지 테스트 60%</option>
							
								<option value="24895">Real Track - Additional fee</option>
							
								<option value="24940">1:1 필라테스</option>
							
								<option value="24968">프로핏피트니스 테스트</option>
							
								<option value="25291">1:1 프리미엄 필라테스</option>
							
								<option value="25514">최진호 테스트</option>
							
								<option value="25515">최진호 개인 테스트</option>
							
								<option value="25517">최진호 bpay 테스트</option>
							
								<option value="25945">[스페셜레슨] 키즈필라테스</option>
							
								<option value="25946">[리윰] 스페셜 상품</option>
							
								<option value="26540">[대전_비페이]  듀엣 레슨_2인가격</option>
							
						</select>
						<select class="ui-select" name="seqPartnerCoach">
							<option value="">담당강사 선택</option>
							<option value="">담당강사 선택</option>
							
								<option value="21611">DG 강사 </option>
							
								<option value="21929">SL 강사</option>
							
								<option value="17122">강동원</option>
							
								<option value="21413">고종익</option>
							
								<option value="20000">골프 프로</option>
							
								<option value="9807">기본관리자</option>
							
								<option value="9817">김반석</option>
							
								<option value="20697">나인원 강사 (테스트)</option>
							
								<option value="21768">노동기 Instructor</option>
							
								<option value="22105">누림 강사 (테스트)</option>
							
								<option value="17192">문동규 강사</option>
							
								<option value="14597">민윤정</option>
							
								<option value="21697">바른샘</option>
							
								<option value="19677">박동훈</option>
							
								<option value="20962">블리스포인트 프로</option>
							
								<option value="19624">소피아</option>
							
								<option value="21610">알파 강사</option>
							
								<option value="14510">요가 강사 (테스트)</option>
							
								<option value="21783">원장</option>
							
								<option value="21160">윤지영</option>
							
								<option value="17471">이민주</option>
							
								<option value="17045">이민주(테스트)</option>
							
								<option value="9806">이석훈</option>
							
								<option value="21754">이창엽</option>
							
								<option value="21364">이행행</option>
							
								<option value="13508">장유진 강사 (테스트)</option>
							
								<option value="20031">전라원</option>
							
								<option value="18935">전상훈 </option>
							
								<option value="19610">점장리동무</option>
							
								<option value="21047">정두리</option>
							
								<option value="19704">정찬복</option>
							
								<option value="17422">조시영</option>
							
								<option value="20749">찐우</option>
							
								<option value="21409">청담 강사 (테스트)</option>
							
								<option value="22192">최진호</option>
							
								<option value="20590">테니스 강사 (테스트)</option>
							
								<option value="21457">티나 강사 (테스트)</option>
							
								<option value="18429">필라테스 전문가</option>
							
								<option value="21696">하나골프 강사</option>
							
								<option value="18685">홍상혁</option>
							
								<option value="9816">홍준선</option>
							
								<option value="20587">황의천(부스터)</option>
							
						</select>
						<input name="keyword" type="texd" placeholder="검색어 입력">
						<button class="ui-button blue" type="button" data-event="search">조회</button>
					</div>
				</div>
			</form>
		</section>
		<!-- 목록 -->
		<section data-id="list" style="margin-top:40px">
			<table class="ui-table dark even">
				<thead>
					<td>회원번호</td><td>회원명</td><td>휴대폰 번호</td><td>이용날짜</td><td>입장시간</td><td>퇴장시간</td>
					<td>장소 이용권</td><td>이용권 상태</td><td>담당강사</td><td>메모</td>
				</thead>
				<tbody>
					<td class="empty" colspan="20">데이터를 불러오는 중 입니다.</td>
				</tbody>
			</table>
		</section>
	</main>
</div>
</body>
<script type="text/javascript">
function doReady() {
	doPage.open();
}

const doPage = {
	container : undefined,
	data : {},
	open : function(isUpdate) {
		this.container = document.querySelector("main");
		const form = this.container.querySelector("[data-id='search']");
		const data = {
			startDate : form.getValue("startDate"),
			endDate : form.getValue("endDate"),
			visitTimeStart : form.getValue("visitTimeStart"),
			visitMinStart : form.getValue("visitMinStart"),
			visitTimeEnd : form.getValue("visitTimeEnd"),
			visitMinEnd : form.getValue("visitMinEnd"),
			seqPartnerGroup : form.getValue("seqPartnerGroup", true),
			sex : form.getValue("sex"),
			seqPartnerProductPass : form.getValue("seqPartnerProductPass", true),
			seqParnterCoach : form.getValue("seqParnterCoach", true),			// 백엔드 오타 수정 필요
			keyword : form.getValue("keyword")
		};
		if(getPeriod(data.startDate, data.endDate) < 0) {
			alert("종료 날짜를 시작 날짜 보다 크게 설정해 주세요.");
			return;
		};
		partnerController.history.entrance.search(data).then(data => {
			this.data = data;
			this.render(isUpdate);
		}).catch(error => {
			console.log(error);
			alert("데이터를 가져오는데 실패하였습니다.");
		});
	},
	render : function(isUpdate) {
		const setSearch = () => {
			const section = this.container.querySelector("[data-id='search']");
			const button = section.querySelector("[data-event='search']");
			button.addEventListener("click", () => {
				this.open(true);
			});
			uiSearch("오늘");
		};
		const setList = () => {
			const section = this.container.querySelector("[data-id='list']");
			section.innerHTML = this.template();
			uiTable(section);
		};
		if(!isUpdate) {
			setSearch();
		}
		setList();
	},
	template : function() {
		const tr = this.data.map(item => {
			const getState = () => {
				if(item.seq_partner_product_pass != "-999") {
					const useStartDate = item.use_start_dt;
					const useEndDate = item.use_end_dt;
					if(!useStartDate) return "-";
					const usedNumber = getComma(item.used_number);
					const useNumber = (item.use_number == "무제한") ? `무제한` : getComma(item.use_number) + "회";
					return `${useStartDate} - ${useEndDate} · ${useNumber} 중 ${usedNumber}번째 이용`;
				} else {
					return "-";
				}
			};
			const getMemo = () => {
				const memo = uiSafeValue(item.MEMO);
				return (memo) ? `<a>보기<div><span>${memo}</span></div></a>` : ``;
			};
			const getTime = (value) => {
				if(!value) return "";
				value = value.replace(/[^0-9]/gi, "");
				if(value.length != 4) return "-";
				return value.substr(0, 2) + ":" + value.substr(2, 2);
			};
			return `
				<tr>
					<td>${item.membership_no}</td>
					<td>
						<a class="underline" href="/member/${item.seq_member}/home">${item.name}</a>
					</td>
					<td>${item.mobile}</td>
					<td>${item.use_date}</td>
					<td>${getTime(item.entrance_start_datetime)}</td>
					<td>${getTime(item.entrance_end_datetime)}</td>
					<td>${item.pass_name}</td>
					<td>${getState()}</td>
					<td>${item.coach_name}</td>
					<td class="memo tip">${getMemo()}</td>
				</tr>
			`;
		});
		return `
			<table class="ui-data-table dark even" data-table-dom="fltp" data-table-length="20">
				<thead>
					<td>회원번호</td><td>회원명</td><td>휴대폰 번호</td><td>이용날짜</td><td>입장시간</td><td>퇴장시간</td>
					<td>장소 이용권</td><td>이용권 상태</td><td>담당강사</td><td>메모</td>
				</thead>
				<tbody>
					${tr.join("")}
				</tbody>
			</table>
		`;
	}
};

</script>
</html>
</html>
