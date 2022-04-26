
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
	<script type="text/javascript" src="/static/js/ui.js?v=20220114"></script>
	<script type="text/javascript" src="/static/js/ui/uiHeader.js?v=20220216"></script>

	<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" async></script>
	<script src="https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js"></script>
	<script src="https://www.gstatic.com/firebasejs/8.6.7/firebase-analytics.js"></script>

	<script type="text/javascript" src="/static/js/controller/commonController.js?v=20220216"></script>
	<script type="text/javascript" src="/static/js/controller/coachController.js?v=2.5"></script>
	<script type="text/javascript" src="/static/js/controller/memberController.js?v=20220119"></script>
	<script type="text/javascript" src="/static/js/controller/permissionController.js"></script>
	<script type="text/javascript" src="/static/js/controller/smsController.js?v=2.5"></script>

	<script type="text/javascript" src="/static/js/popup/popupCamera.js"></script>
	<script type="text/javascript" src="/static/js/popup/popupLoginCoach.js?v=2.5"></script>
	<script type="text/javascript" src="/static/js/popup/popupMember.js?v=20211116"></script>
	<script type="text/javascript" src="/static/js/popup/popupSendSms.js?v=20220208"></script>
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
				remainDate	: Number("552"),
				expireDate	: "2023-09-29 00:00:00"
			},
			state : {
				sms 		: "749"
			},
			scheduler : {
				default		: "promise"
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
	<script type="text/javascript" src="/static/js/ui/uiProfile.js?v=20210719"></script>
	<script type="text/javascript" src="/static/js/controller/serviceController.js?v=20210628"></script>
	<script type="text/javascript" src="/static/js/controller/scheduleController.js?v=20210628"></script>
	<script type="text/javascript" src="/static/js/controller/ticketController.js?v=20210628"></script>
	<script type="text/javascript" src="/static/js/controller/discountCouponController.js"></script>
	<script type="text/javascript" src="/static/js/popup/popupSearchBranch.js"></script>
	<script type="text/javascript" src="/static/js/component/componentMember.js?v=2.53"></script>
	<script type="text/javascript" src="/static/js/component/componentOrder.js?v=20210628"></script>
	<script type="text/javascript" src="/static/js/component/componentOrderPayment.js?v=20211209"></script>
	<script type="text/javascript" src="/static/js/popup/popupScheduleReservation.js?v=20210628"></script>
	<link type="text/css" rel="stylesheet" href="/static/css/memberOrder.css?v=2.53" />
	<style type="text/css">
.ui-list-result .list tbody td:first-child			{position:relative; overflow:visible}
.ui-list-result .list tbody td:first-child .icon	{position:absolute; left:48px; bottom:-8.5px; width:17px; height:17px; background:url(/static/img/icon/icon_dot_combine_green.png) no-repeat center center / 100%; z-index:2}

.ui-list-result .list .merge						{overflow:hidden}
.ui-list-result .list .merge td						{position:relative; padding:0; border-top:none; overflow:visible}
.ui-list-result .list .merge li						{padding:0; border:none}
.ui-list-result .list .merge li i					{font-style:normal}
.ui-list-result .list .merge li label				{display:block}
.ui-list-result .list .merge li span				{/*display:inline-block; vertical-align:middle; text-overflow:ellipsis; white-space:nowrap; overflow:hidden*/}
.ui-list-result .list .merge li span.name			{/*width:17.5%; max-width:200px;*/ font-weight:500; color:#333}
.ui-list-result .list .merge li span.summary		{/*padding:0 10px; width:82.5%; box-sizing:border-box*/ padding-left:5px; color:#888}
.ui-list-result .list .merge li + li				{margin-top:10px}

.ui-list-result .list .merge dl > *					{padding:15px 0; vertical-align:top; line-height:16px; box-sizing:border-box}
.ui-list-result .list .merge dl dt					{position:relative; width:115px; font-weight:normal; color:#37b772}
.ui-list-result .list .merge dl dd					{text-align:left}
.ui-list-result .list .merge dl dt h4				{padding-left:24px; font-size:13px; font-weight:500}
.ui-list-result .list .ui-input-radio				{padding-left:24px; line-height:16px}
.ui-list-result .list .ui-input-radio input + span	{width:16px !important; height:16px !important;}

.ui-list-result .list .merge .box					{position:relative; margin-top:-1px; padding:0; background-color:#f5f5f5; border:none; font-size:12px; overflow:hidden}
.ui-list-result .list .merge .box:before			{content:""; position:absolute; left:-10px; top:-10px; right:-10px; height:10px; box-shadow:0 2px 7px rgba(0,0,0,0.15)}
.ui-list-result .list .merge:last-child .box		{margin-bottom:0}

	</style>
</head>
<body>



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


<!-- 콘텐츠 -->
<div class="contents">
	<!-- 사이드 메뉴 -->
	<aside class="ui-side ui-profile"></aside>

	<main class="orderPayment">
		
			
			
				<!-- 상단 경로 탭 -->
				<div class="ui-path">
					<div class="left">
						<ul>
							<li><a href="/member/1484302/orderInfo">판매내역</a></li>
							<li><a href="/member/1484302/sell/pass">판매</a></li>
							<li class="focus"><a href="/member/1484302/sell/payment?seqPricing=50688">결제</a></li>
						</ul>
					</div>
				</div>
			
		

		<!-- 이용권 정보 설정 -->
		<section class="passInfo" data-id="passInfo">
			<div class="top">
				<h2 class="ui-title">
					
						이용권 정보 설정
					
					
				</h2>
			</div>
			<div class="middle">
				<div class="ui-list-result">
					<div class="list">
						<ul></ul>
					</div>
				</div>
				<p class="ui-note hidden" data-id="lockerInfo"></p>
			</div>
			<div clsas="bottom">
				
					
					
					
						<div class="ui-summary" data-id="summary">
							<ul>
								<li>
									현재 이용권 정가
									<h2><var data-msg="price">0</var>원</h2>
								</li>
								<li><span class="icon minus"></span></li>
								<li>
									이전 이용권 정가
									<h2 class="red"><var data-msg="beforeAmount">0</var>원</h2>
								</li>
								<li><span class="icon equal"></span></li>
								<li>
									결합 정가
									<h2 class="green"><var data-msg="salePrice">0</var>원</h2>
								</li>
							</ul>
						</div>
					
				
			</div>
		</section>

		<!-- 결제 정보 설정 -->
		<section class="paymentInfo" data-id="paymentInfo">
			<div class="top">
				<h2 class="ui-title">결제 정보 설정</h2>
			</div>
			<div class="middle">
				<div class="ui-note blue">
					<div class="left">
						<ul class="desc">
							<li>
								판매가 설정 : 판매가 또는 할인가를 입력해, 최종 판매가를 설정할 수 있습니다.<br>
								<span class="blue">판매가 = 정가 - 할인가 - 사용 포인트</span>
							</li>
							<li>
								판매가를 결정한 후, 아래 <b>[결제 정보 입력]</b>에서 실제 결제하신 수단을 선택 → 결제금액을 입력합니다.
							</li>
						</ul>
					</div>
				</div>
				<div class="ui-note white">
					<div class="left">
						<ul>
							<li class="bold">사용 가능한 포인트(<var data-msg="remainPoint">0</var>P) = 적립 포인트(<var data-msg="memberPoint">0</var>P) - 사용 포인트(<var data-msg="usedPoint">0</var>P)</li>
							<li class="gray">
								이용권별 결제금액이나 미수금액은, 아래 [결제 정보 입력]에서 실제 결제 수단별 금액을 우선 등록하고 변경이 필요한 경우에만 수정 바랍니다.
								<span class="right">
									<label class="ui-input-checkbox">
										<input name="customAmount" type="checkbox" data-event="customAmount">
										<span></span>
										결제금액 / 미수금액 수정하기
									</label>
								</span>
							</li>
						</ul>
					</div>
				</div>
				<div data-id="table">
					<table class="ui-table">
						<thead>
							<tr><td>서비스명</td><td>정가</td><td>할인가</td><td>사용 포인트</td><td>판매가</td><td>결제금액</td><td>미수금액</td><td>기타</td></tr>
						</thead>
						<tbody>
							<tr><td colspan="8">결제 정보를 불러오는 중 입니다.</td></tr>
						</tbody>
					</table>
				</div>
				<p class="ui-note">
					<span class="left">
						절사가 필요한 경우 오른쪽 버튼을 클릭해 주세요. 절사 금액은 할인으로 적용됩니다.
					</span>
					<span class="right">
						<button class="ui-button medium white" data-value="100" data-event="roundDown">100원 단위 절사</button>
						<button class="ui-button medium white" data-value="1000" data-event="roundDown">1,000원 단위 절사</button>
						<button class="ui-button medium white" data-value="" data-event="roundDown">할인가 및 포인트 초기화</button>
					</span>
				</p>
				<p class="ui-note red error" data-id="checkPayment">
					<span class="left">
						<em class="bg red">주의</em>아래 결제 수단별로 입력한 결제금액과 위에 이용권 별 결제금액이 다릅니다. 서로 일치해야만 저장할 수 있습니다.
					</span>
				</p>
				
			</div>
		</section>

		<!-- 결제 정보 입력 -->
		<section class="paymentList ui-form" data-id="paymentList">
			<div class="top">
				<h2 class="ui-title">결제 정보 입력</h2>
			</div>
			<div class="middle">
				<dl>
					<dt>
						<table>
							<tr>
								<th>결제 수단</th>
								<td>
									<button class="ui-button white" data-type="card" data-event="create">카드</button>
									<button class="ui-button white" data-type="cash" data-event="create">현금</button>
									<button class="ui-button white" data-type="transfer" data-event="create">이체</button>
								</td>
							</tr>
							<tr>
								<th>결제 내역</th>
								<td>
									<table class="ui-table">
										<thead>
											<tr><!--<td>결제일</td>--><td>결제수단</td><td>결제금액</td><!--<td>결제 담당자</td>--><td class="memo">결제정보</td><td>기타</td></tr>
										</thead>
										<tbody data-id="detail">
											<tr><td colspan="6">결제 내역이 없습니다.</td></tr>
										</tbody>
									</table>
								</td>
							</tr>
							<tr>
								<th>포인트 적립</th>
								<td>
									<input name="rewardPoint" type="currency" data-event="rewardPoint" value="0" disabled>P
									<label class="ui-input-checkbox">
										<input name="autoRewardPointYn" type="checkbox" data-event="autoRewardPointYn" data-permission="permissionPayment/customEarnMileage" checked>
										<span></span>
										자동계산(결제금액 <var data-msg="rewardPointRate">0</var>%)
									</label>
									<p class="ui-note">
										센터관리 메뉴 중 센터설정에서 기본 포인트 적립 비율을 변경 가능합니다.
									</p>
								</td>
							</tr>
						</table>
					</dt>
					<dd class="paymentSummaryInfo" data-id="paymentSummaryInfo">
						<div class="box">
							<table class="ui-table fixed">
								<tr><th>정가</th><td><var data-msg="price">0</var>원</td></tr>
								<tr class="hidden" data-id="beforeAmount">
									<th>
										이전 이용권 정가
										
									</th>
									<td><var data-msg="beforeAmount">0</var>원</td>
								</tr>
								<tr><th>할인가</th><td><var data-msg="discountAmount">0</var>원</td></tr>
								<tr><th>사용 포인트</th><td><var data-msg="usePoint">0</var>원</td></tr>
								<tr><th>판매가</th><td><var data-msg="salePrice">0</var>원</td></tr>
							</table>
							<table class="ui-table fixed">
								<tr><th>결제금액</th><td><var data-msg="paymentAmount">0</var>원</td></tr>
								<tr><th>결제(완료)금액</th><td class="green"><var data-msg="paidAmount">0</var>원</td></tr>
								<tr><th>미수금액</th><td class="red"><var data-msg="receivables">0</var>원</td></tr>
							</table>
						</div>
					</dd>
				</dl>
			</div>
		</section>

		<!-- 기타 정보 입력 -->
		<section class="otherInfo ui-form" data-id="otherInfo">
			<div class="top">
				<h2 class="ui-title">기타 정보 입력</h2>
			</div>
			<div class="middle">
				<table>
					
						<tr data-id="orderClassification">
							<th>판매 분류</th>
							<td>
								<label class="ui-input-radio">
									<input name="orderClassification" type="radio" value="NEW" data-permission="permissionPayment/changeSalesClassification">
									<span></span>
									신규등록
								</label>
								<label class="ui-input-radio">
									<input name="orderClassification" type="radio" value="INUSE" data-permission="permissionPayment/changeSalesClassification">
									<span></span>
									만료 전 재등록
								</label>
								<label class="ui-input-radio">
									<input name="orderClassification" type="radio" value="CHURN" data-permission="permissionPayment/changeSalesClassification">
									<span></span>
									만료 후 재등록
								</label>
								<p class="ui-note">
									판매 분류는 해당 고객의 상태에 따라서 자동으로 설정되어 있으며, 사용자가 변경 가능합니다. 해당 정보는 센터 판매 건에 대한 바디코디의 통계자료 및 데이터 분석에 기준이 됩니다.
								</p>
							</td>
						</tr>
					
					<tr>
						<th>판매 담당자</th>
						<td>
							<select class="ui-select" name="seqPartnerCoach">
								<option value="">선택해 주세요.</option>
							</select>
							<p class="ui-note">
								현재 로그인된 사용자로 기본 설정되며, 사용자가 변경 가능합니다. 판매 담당자는 해당 판매 건의 책임자로 설정되고, 판매 성과나 매출 커미션 수당 정산에 해당 내역이 추가되니 신중하게 선택해 주세요.
							</p>
						</td>
					</tr>
					<tr>
						<th>판매일시</th>
						<td>
							<input name="orderDate" type="calendar" value="today" data-permission="permissionPayment/changePaymentDate">

							<select class="ui-select date" name="orderTimeHour" data-permission="permissionPayment/changePaymentDate">
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
							<select class="ui-select date" name="orderTimeMinute" data-permission="permissionPayment/changePaymentDate">
								<option value="">분</option>
								
									
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
								
									
									<option value="24">24</option>
								
									
									<option value="25">25</option>
								
									
									<option value="26">26</option>
								
									
									<option value="27">27</option>
								
									
									<option value="28">28</option>
								
									
									<option value="29">29</option>
								
									
									<option value="30">30</option>
								
									
									<option value="31">31</option>
								
									
									<option value="32">32</option>
								
									
									<option value="33">33</option>
								
									
									<option value="34">34</option>
								
									
									<option value="35">35</option>
								
									
									<option value="36">36</option>
								
									
									<option value="37">37</option>
								
									
									<option value="38">38</option>
								
									
									<option value="39">39</option>
								
									
									<option value="40">40</option>
								
									
									<option value="41">41</option>
								
									
									<option value="42">42</option>
								
									
									<option value="43">43</option>
								
									
									<option value="44">44</option>
								
									
									<option value="45">45</option>
								
									
									<option value="46">46</option>
								
									
									<option value="47">47</option>
								
									
									<option value="48">48</option>
								
									
									<option value="49">49</option>
								
									
									<option value="50">50</option>
								
									
									<option value="51">51</option>
								
									
									<option value="52">52</option>
								
									
									<option value="53">53</option>
								
									
									<option value="54">54</option>
								
									
									<option value="55">55</option>
								
									
									<option value="56">56</option>
								
									
									<option value="57">57</option>
								
									
									<option value="58">58</option>
								
									
									<option value="59">59</option>
								
							</select>
						</td>
					</tr>
					<tr>
						<th>판매 메모</th>
						<td><textarea class="ui-textarea" name="memo" maxlength="500"></textarea></td>
					</tr>
				</table>
			</div>
			<div class="bottom">
				<a href="/member/1484302/sell/pass"><button class="ui-button gray" data-event="back">목록으로</button></a>
				<button class="ui-button blue" data-event="submit">저장</button>
			</div>
		</section>
	</main>
</div>
</body>
<script type="text/javascript">
let urlParams = new URLSearchParams(location.search); 
const seqOrderInfo = urlParams.get('seqOrderInfo');
const seqMember = urlParams.get('seqMember');
const orderType = "";
const crossType = "";
const serviceCategory = "";
const seqPassInfo = "";
const seqPricing = urlParams.get('seqPricing');
const orderClassification = "INUSE";

function doReady() {
	componentOrderPayment.open("create", seqPricing, seqOrderInfo);
}
</script>
</html>


</html>
