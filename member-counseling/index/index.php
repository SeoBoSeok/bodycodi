
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
	<script type="text/javascript" src="/static/js/controller/memberCounselingController.js"></script>
	<script type="text/javascript" src="/static/js/component/componentMember.js"></script>
	
	<style type="text/css">
main .search input									{padding:0 10px; max-width:250px; text-align:center}
main .search select									{margin-right:8px; text-align-last:center}
main .search select option:first-child				{display:block}

main .result										{margin-top:35px}
main .result table td								{background-color:transparent !important}
main .result table tr > *							{height:auto; border:1px solid #ccc !important; text-align:center; white-space:nowrap; text-overflow:ellipsis; overflow:hidden}
main .result table tr.hidden						{display:none}
main .result table td.memo							{max-width:250px; text-align:left}
main .result table tbody tr							{cursor:pointer}
main .result table tbody tr:hover					{background-color:rgba(33,150,243,0.15) !important}
main .result table tbody tr.empty					{cursor:default}
main .result table tbody tr.empty:hover				{background-color:white !important}
main .result button									{display:none; margin:0 auto; margin-top:25px; width:135px}
main .result button.focus							{display:block}

.ui-popup .detail .middle							{margin:25px; padding:0; border:1px solid #ccc}
.ui-popup .detail .middle > dl						{border-bottom:1px solid #ccc; text-align:center; table-layout:fixed}
.ui-popup .detail .middle > dl dt					{vertical-align:middle; width:90px; border-right:1px solid #ccc}
.ui-popup .detail .middle > dl dt img				{display:inline-block; width:70px; height:70px; border-radius:100%; border:1px solid #ccc; object-fit:cover; box-sizing:border-box}

.ui-popup .detail table								{line-height:1.3; text-align:center}
.ui-popup .detail table tr > *						{background-color:white; border-left:1px solid #ccc !important; border:none; white-space:nowrap; text-overflow:ellipsis; overflow:hidden}
.ui-popup .detail table tr > th:first-child			{border-left:none !important}
.ui-popup .detail table tr + tr						{border-top:1px solid #ccc}
.ui-popup .detail table th							{width:22.5% !important; background-color:#f0f0f0; font-weight:500}
.ui-popup .detail table th + td						{width:30%}
.ui-popup .detail textarea							{width:100%; max-width:100%; height:150px; border:none}

.ui-popup .register .middle							{}
.ui-popup .register .middle .popupSearchMember		{right:100px}
.ui-popup .register .middle .ui-input-search input	{max-width:300px}
.ui-popup .register .middle .ui-input-search button	{width:100px}
.ui-popup .register .middle table					{text-align:left; font-size:13px; color:#42485a}
.ui-popup .register .middle table tbody th			{vertical-align:top; width:135px; line-height:35px}
.ui-popup .register .middle table tbody tr > *		{padding:7px 0}
.ui-popup .register .middle p						{margin-top:8px; padding:10px; background-color:#f2f2f2; line-height:1.45; color:#626262}
.ui-popup .register .middle p a						{position:relative; float:right; top:-1px; padding:0 8px; background-color:white; border-radius:1em; border:1px solid #999; line-height:19px; font-size:11.5px; text-decoration:none}
	</style>
</head>
<body>
<!-- 로컬 네비게이션 -->

	


<!-- 로컬 네비게이션 바 -->
<nav class="ui-nav" data-index="고객관리">
	<div class="right">
		<a href="/member">회원 검색</a>
		<a class="focus" href="/member-counseling/index">회원 관리</a>
		<a href="/sales/member-prospective">잠재고객 관리</a>
		<a href="/member/notice/getNotice">커뮤니티 관리</a>
		<a href="/sales/analysis">세일즈 성과 분석</a>
	</div>
</nav>
<aside class="ui-side">
	<div class="menu">
		<h4>회원 관리</h4>
		<ul>
			
				<li><a href="/member/app/approve">회원앱 연동신청 관리</a></li>
			
			<li><a href="/member-counseling/index">고객 상담</a></li>
			<li><a href="/batch-extension/history">만료일 연장 내역</a></li>
		</ul>
	</div>
	<script type="text/javascript">
		(function() {
			const pathname = window.location.pathname;
			const a = document.querySelector(".ui-side").querySelectorAll("a");
			a.forEach(item => {
				if(pathname == item.getAttribute("href")) {
					item.parentNode.classList.add("focus");
				}
			});
		})();
	</script>
</aside>


<!-- 사이드 메뉴 -->

<!-- 상단 탭 -->
<main>
	
	<section class="search">
		<form onsubmit="return false" autocomplete="off">
			<div class="ui-search">
				<input name="seqMember" type="hidden" value="">
				<input name="isMember" type="hidden" value="">

				<div class="date">
					<input name="fromDate" type="calendar" value="2021-12-26">
					<span>부터</span>
					<input name="toDate" type="calendar" value="2022-01-02">
					<span>까지</span>
					<div class="quick">
						<ul>
							<li><a>당월</a></li>
							<li><a>전월</a></li>
							<li><a>오늘</a></li>
							<li><a>어제</a></li>
							<li><a>1주</a></li>
						</ul>
					</div>
					
				</div>

				
					<div class="member">
						<!--
						<select class="ui-select" name="seqCenter" data-value="" required>
							<option value="">지점 선택</option>
						</select>
						-->

						<select class="ui-select" name="seqPartnerCoach" data-value="" required>
							<option value="">고객 관리 담당자</option>
							
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

						<select class="ui-select" name="memberPaymentStatus" data-value="" required>
							<option value="">신규 / 재등록</option>
							<option value="신규">신규</option>
							<option value="재등록">재등록</option>
						</select>

						<input name="searchWord" type="text" value="" placeholder="이름, 전화번호, 이메일, 메모">

						<button class="ui-button blue" type="button" data-event="search">상담 검색</button>
						<button class="ui-button green" type="button" data-event="register">상담 등록</button>
					</div>
				
			</div>
		</form>
	</section>

	<section class="result">
		
		
		<table class="ui-table dark even">
			<thead>
				<tr><td>상담 날짜</td><!--<td>상담지점</td>--><td class="">이름</td><td class="">성별</td><td class="">휴대폰 번호</td><td>상담 담당자</td><td>상담 수단</td><td>상담 목적</td><td>상담 내용</td></tr>
			</thead>
			<tbody>
				
					
					
						<tr class="empty"><td colspan="9">검색 결과가 없습니다.</td></tr>
					
				
			</tbody>
		</table>
		<button class="ui-button blue" type="button" data-event="list">더 보기</button>
	</section>
</main>

<script type="text/javascript">

const isMember = ("" == "true") ? true : false;
const doDetail = {
	object : undefined,
	data : undefined,
	id : {
		member : 0,
		counseling : 0
	},

	open : function(object) {
		this.id.member = object.getAttribute("data-id-member");
		this.id.counseling = object.getAttribute("data-id-counseling");
		this.object = object;
		const data = {
			searchParamMap : {
				seqMemberCounseling : this.id.counseling,
			}
		};
		memberCounselingController.select(data).then(data => {
			this.data = data.data.memberCounseling;
			this.render();
		});
	},

	close : function() {
		uiPopup();
	},

	delete : function() {
		if(!confirm("정말로 삭제하시겠습니까?")) return;
		const data = {
			memberCounseling : {
				seqMemberCounseling : this.id.counseling,
			}
		};
		memberCounselingController.delete(data).then(data => {
			this.object.parentNode.removeChild(this.object);
			alert("삭제되었습니다.");
			this.refresh();
			this.close();
		});
	},

	refresh : function() {
		const tr = document.querySelectorAll("main table tbody tr");
		if(tr.length == 1)
			tr[0].classList.remove("hidden");
		else
			tr[tr.length - 1].classList.add("hidden");
	},

	update : function() {
		let memo = this.popup.querySelector("[name='memo']").value;
		memo = memo.replace(/\</g, "&lt;").replace(/\>/g, "&gt;");
		const data = {
			memberCounseling : {
				seqMemberCounseling : this.id.counseling,
				memo : memo
			}
		};
		memberCounselingController.update(data).then(data => {
			const td = this.object.querySelector("td.memo");
			td.innerHTML = memo.substring(0, 100);
			alert("수정되었습니다.");
			this.close();
		});
	},

	sales : function() {
		location.href = "/member/" + this.id.member + "/order";
//		window.location.href = "/manager/member/memberSelectProduct/" + this.id.member;
	},

	render : function() {
		this.popup = uiPopup({
			template : this.template(),
			event : {
				click : {
					close	: function() {doDetail.close();},
					delete	: function() {doDetail.delete();},
					update	: function() {doDetail.update();},
					sales	: function() {doDetail.sales();}
				}
			}
		});
	},

	template : function() {
		const getDate = function(value) {
			if(!value) return "-";
			return getCalendar(new Date(value));
		};
		const getAmount = function(value) {
			if(!value) return "-";
			return getComma(parseInt(getNumber(value) / 10000)) + "만원";
		};

//		console.log(this.data);

		const amount = getAmount(this.data.accumulate_payment);
		const isRecent = (this.data.recent_reg_dt) ? true : false;
		let recent = "-";
		if(isRecent)
			recent = this.data.recent_product_name + " / " + getDate(this.data.recent_reg_dt) + " / " + getAmount(this.data.recent_total_amount);
		const sex = (this.data.sex == "M") ? "남성" : "여성";
		let thumbnail = this.data.img_url;
		if(!thumbnail) {
			thumbnail = (sex == "남성") ? "male" : "female";
			thumbnail = "/static/img/login/" + thumbnail + ".jpg";
		}
		// const link = "/manager/member/memberInfo/" + this.data.seq_member;
		const link = "/member/" + this.data.seq_member + "/home";

		return `
			<div class="detail medium">
				<div class="top">
					<h2>상담 내역<a data-event="close"></a></h2>
				</div>
				<div class="middle">
					<dl>
						<dt>
							<img src="${thumbnail}" />
						</dt>
						<dd>
							<table class="ui-table dark">
								<tr>
									<th>이름</th><td><a href="${link}">${this.data.name}</a></td>
									<th>성별</th><td>${sex}</td>
									<th>휴대폰 번호</th><td>${this.data.mobile}</td>
									<th>가입 날짜</th><td>${getDate(this.data.first_reg_dt)}</td>
								</tr>
								<tr>
									<th>관리 담당자</th><td>${this.data.coach_name || "-"}</td>
									<th>상담 날짜</th><td>${getDate(this.data.counseling_date)}</td>
									<th>상담 수단</th><td>${this.data.counseling_means_value || "-"}</td>
									<th>상담 목적</th><td>${this.data.counseling_purpose_value || "-"}</td>
								</tr>
								<tr>
									<th>누적 결제</th><td>${amount}</td>
									<th>최근 결제</th><td colspan="7">${recent}</td>
								</tr>
							</table>
						</dd>
					</dl>
					<textarea class="ui-textarea" name="memo" placeholder="내용을 입력하지 않았습니다.">${this.data.memo || ""}</textarea>
				</div>
				<div class="bottom">
					<button class="ui-button gray" data-event="close">닫기</button>
					
						<button class="ui-button red" data-event="delete">상담 삭제</button>
						<button class="ui-button green" data-event="update">상담 수정</button>
					
					<button class="ui-button blue" data-event="sales">상품 판매</button>
				</div>
			</div>
		`;
	}
}



const doRegister = {
	data : undefined,

	open : function() {
		this.render();
	},

	close : function() {
		uiPopup();
	},

	render : function() {
		this.popup = uiPopup({
			template : this.template(),
			event : {
				click : {
					"close"			: function() {doRegister.close();},
					"submit"		: function() {doRegister.submit();},
					"submit&sales"	: function() {doRegister.submit(true);}
				}
			}
		});

		uiCalendar(this.popup);
		this.popup.querySelector("[name='date']").value = getCalendar();

		popupSearchMember.init(this.popup, function(id) {
			if(!id) return;
			memberController.counselingForm({
				member : {
					seqMember : id
				}
			}).then(data => {
				doRegister.data = data;
				doRegister.update();
			});
		});

		const seqMember = document.querySelector("main form [name='seqMember']").value;
		if(seqMember) {
			memberController.counselingForm({
				member : {
					seqMember : seqMember
				}
			}).then(data => {
				doRegister.data = data;
				doRegister.update();
			});
		}
	},

	check : function(data) {
		const checkList = ["seqMember", "seqPartnerCoach", "counselingMeansAttr", "memo"];
		data = data.memberCounseling;
		let error = "";
		for(let i = 0; i < checkList.length; i++) {
			const name = checkList[i];
			const value = data[name];
			switch(name) {
				case "seqMember" : if(!value) error = "회원 검색 후 회원을 선택해 주세요."; break;
				case "seqPartnerCoach" : if(!value) error = "상담 담당자를 선택해 주세요."; break;
				case "counselingMeansAttr" : if(!value) error = "상담 수단을 선택해 주세요."; break;
				case "memo" : if(!value) error = "상담 내용을 입력해 주세요."; break;
			}
			if(error) {
				alert(error);
				return false;
			}
		}
		return true;
	},

	submit : function(isAction) {
		let date = this.popup.querySelector("[name='date']").value;
		date = new Date(date).toISOString();
		const data = {
			memberCounseling : {
				seqMember : this.popup.querySelector("[name='searchMemberId']").value,
				counselingDate : date,
				seqPartnerCoach : this.popup.querySelector("[name='manager']").value,
				counselingMeansAttr : this.popup.querySelector("[name='path']").value,
				counselingPurpose : this.popup.querySelector("[name='purpose']").value,
				memo : this.popup.querySelector("[name='memo']").value
			}
		};

		if(!this.check(data)) return;

		memberCounselingController.insert(data).then(data => {
			if(isAction) {
				alert("등록되었습니다. 상품 판매 페이지로 이동합니다.");
				window.location.href = "/manager/member/memberSelectProduct/" + data.data.memberCounseling.seqMember;
				return;
			}

			alert("등록되었습니다.");
			const id = data.data.memberCounseling.seqMemberCounseling;
			memberCounselingController.select({
				searchParamMap : {
					seqMemberCounseling : id
				}
			}).then(data => {
				doList("insert", data.data.memberCounseling);
				this.close();
			}).catch(error => {
				console.log(error);
				this.close();
			});
		});
	},

	update : function() {
		const popup = this.popup;

		const setSummary = function(data) {
//			console.log(data);

			const p = popup.querySelector("[data-message='member']");
			const summary = [];
			summary.push(data.name);
			summary.push((data.sex == "M") ? "남" : "여");
			summary.push(data.mobile);
//			summary.push("<a href='/manager/member/memberInfo/" + data.seq_member + "'>자세히 보기</a>");
			summary.push("<a href='/member/" + data.seq_member + "/home'>자세히 보기</a>");
//			if(data.coach_name) summary.push(data.coach_name);
			p.innerHTML = summary.join(" / ");
		};

		const setSelect = function(name, label, value, data) {
			const select = popup.querySelector("[name='" + name + "']");
			const optionList = [];
			data.forEach(item => {
				optionList.push('<option value="' + item[value] + '">' + item[label] + '</option>');
			});
			select.innerHTML += optionList;
		};

		setSummary(this.data.member);
		setSelect("manager", "coach_name", "seq_partner_coach", this.data.coachList);
		setSelect("purpose", "attr_value", "seq_attr_value", this.data.counselingPurposeList);
		setSelect("path", "attr_value", "seq_attr_value", this.data.counselingMeansList);
	},

	template : function() {
		const searchMemberYn = (isMember) ? "none" : "";
		const searchMemberId = document.querySelector("main form [name='seqMember']").value;
		const seqPartnerBranch = (partnerInfo.partner.branchUseYn == "Y") ? partnerInfo.branch.id : "";

		return `
			<div class="register small">
				<div class="top">
					<h2>상담 등록<a data-event="close"></a></h2>
				</div>
				<div class="middle ui-form">
					<form action="" onsubmit="return false" autocomplete="off">
						<table>
							<tr class="search" style="display:${searchMemberYn}">
								<th>회원 검색</th>
								<td style="overflow:visible">
									<label class="ui-input-search">
										<input name="searchMemberName" type="text" data-event="searchMember" placeholder="이름 또는 휴대폰 번호">
										<input name="searchMemberId" type="hidden" value="${searchMemberId}">
										<input name="seqPartnerBranch" type="hidden" value="${seqPartnerBranch}">
										<button class="ui-button" type="button" data-event="searchMember">회원 검색</button>
										<div class="popupSearchMember"></div>
									</label>
									<p class="note" data-message="member">회원 이름 또는 휴대폰 번호를 입력 후 검색 버튼을 클릭해 주세요.</p>
								</td>
							</tr>
							<tr>
								<th>상담 날짜</th>
								<td>
									<input name="date" type="calendar">
								</td>
							</tr>
							<tr>
								<th>상담 담당자</th>
								<td>
									<!--
									<select class="ui-select" name="center" required>
										<option value="">지점 선택</option>
									</select>
									-->
									<select class="ui-select" name="manager" required>
										<option value="">담당자 선택</option>
									</select>
								</td>
							</tr>
							<tr>
								<th>상담 수단 및 목적</th>
								<td>
									<select class="ui-select" name="path" required>
										<option value="">상담 수단</option>
									</select>
									<select class="ui-select" name="purpose" required>
										<option value="">상담 목적</option>
									</select>
								</td>
							</tr>
							<tr>
								<th>상담 내용</th>
								<td>
									<textarea class="ui-textarea" name="memo" maxlength="1000" placeholder="상담 내용을 입력해 주세요."></textarea>
								</td>
							</tr>
						</table>
					</form>
				</div>
				<div class="bottom">
					<button class="ui-button gray" data-event="close">취소</button>
					<button class="ui-button" data-event="submit">등록</button>
					<!--
						<button class="ui-button blue" data-event="submit&sales">등록 후 상품판매</button>
					-->
				</div>
			</div>
		`;
	}
}




function doReady() {
	const setTable = function() {
		const nodeList = document.querySelectorAll("main table tr");
		nodeList.forEach(item => {
			if(!item.classList.contains("empty"))
				item.onclick = function() {doDetail.open(this)};
		});
	};

	const setSelect = function() {
		let select = document.querySelector("[name='seqPartnerCoach']");
		if(select) select.value = select.getAttribute("data-value");

		select = document.querySelector("[name='memberPaymentStatus']");
		if(select) select.value = select.getAttribute("data-value");
	};

	const setButton = function() {
		// Read More
		let button = document.querySelector("[data-event='list']");
		const nodeList = document.querySelectorAll("main table tr");
		if(nodeList.length >= 15) button.classList.add("focus");
		button.addEventListener("click", function() {doList("more", this)});

		// Search
		const form = document.querySelector("main form");
		button = document.querySelector("[data-event='search']");
		button.addEventListener("click", function() {
			const fromDate = form.getValue("fromDate");
			const toDate = form.getValue("toDate");
			if(getNumber(fromDate) > getNumber(toDate)) {
				alert("종료 날짜를 시작 날짜 보다 크게 설정해 주세요.");
				return;
			}
			form.submit();
		});

		// Register
		button = document.querySelector("[data-event='register']");
		button.addEventListener("click", function() {doRegister.open()});
	};

	uiSearch();
	setSelect();
	setTable();
	setButton();
	if(isMember) componentMember.setMainTab(4);
}



function doList(command, object) {
	const tr = document.querySelectorAll("main table tbody tr");
	const startTr = tr[0];
	const endTr = tr[tr.length - 1];
	const trCount = tr.length;

	switch(command) {
		case "more" :
			const id = tr[tr.length - 2].getAttribute("data-id-counseling");
			if(!id) return;
			memberCounselingController.selectMore({
				searchParamMap : {
					seqMemberCounseling	: id,
					fromDate			: "2021-12-26",
					toDate				: "2022-01-02",
					seqPartnerCoach		: "",
					searchWord			: "",
					memberPaymentStatus	: "",
					seqMember			: ""
				}
			}).then(data => {
				data = data.data.memberCounselingList;
				if(data.length < 15) {
					object.classList.remove("focus");
					if(data.length == 0)
						alert("검색 결과가 더 이상 없습니다.");
				}
				doList("append", data);
			});
			break;

		case "insert" :
		case "append" :
			const data = (Array.isArray(object)) ? object : [object];
			const isHidden = ("" == "true") ? "hidden" : "";
			data.forEach(item => {
				const tr = document.createElement("tr");
				tr.setAttribute("data-id-counseling", item.seq_member_counseling);
				tr.setAttribute("data-id-member", item.seq_member);
				const date = getCalendar(new Date(item.counseling_date));
				const sex = (item.sex == "M") ? "남" : "여";
				const memo = (item.memo) ? item.memo.substring(0, 100) : "-";
				tr.innerHTML = `
					<td>${date}</td>
					<!--<td>-</td>-->
					<td class="${isHidden}">${item.name}</td>
					<td class="${isHidden}">${sex}</td>
					<td class="${isHidden}">${item.mobile}</td>
					<td>${item.coach_name}</td>
					<td>${item.counseling_means_value}</td>
					<td>${item.counseling_purpose_value || "-"}</td>
					<td class="memo">${memo}</td>
				`;
				tr.onclick = function() {doDetail.open(this)};

				if(command == "insert")
					startTr.parentNode.insertBefore(tr, startTr);
				else
					startTr.parentNode.appendChild(tr);

				if(trCount.length > 0)
					endTr.classList.remove("hidden");
				else
					endTr.classList.add("hidden");
			});
		break;
	}
}

</script>
</html>
</html>
