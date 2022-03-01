const sitemap = {
	// 기타
	""														: {1 : "로그인"},
	"/checkin"												: {1 : "체크인"},
	"/home"													: {1 : "홈"},

	// 스케줄러
	"/manager/schedule/promise"								: {1 : "스케줄러", 2 : "개인레슨"},
	"/manager/schedule/class"								: {1 : "스케줄러", 2 : "그룹수업"},
	"/manager/schedule/lesson"								: {1 : "스케줄러", 2 : "그룹수업 관리"},
	"/manager/reservation/index"							: {1 : "스케줄러", 2 : "예약내역"},

	// 입장관리
	"/manager/entrance-member"								: {1 : "입장관리"},

	// 고객관리
	"/member"												: {1 : "고객관리", 2 : "회원검색"},
	"/member/{number}/home"									: {1 : "고객관리", 2 : "회원상세", 3 : "홈"},
	"/member/{number}/pass"									: {1 : "고객관리", 2 : "회원상세", 3 : "이용권 목록"},
	"/member/{number}/pass/{number}"						: {1 : "고객관리", 2 : "회원상세", 3 : "이용권 상세"},
	"/member/{number}/pass/{number}/pause"					: {1 : "고객관리", 2 : "회원상세", 3 : "이용권 중지"},

	"/member/{number}/booking"								: {1 : "고객관리", 2 : "회원상세", 3 : "예약 내역"},
	"/member/{number}/attendance"							: {1 : "고객관리", 2 : "회원상세", 3 : "출석/결석 내역"},

	"/member/{number}/sell/pass"							: {1 : "고객관리", 2 : "회원상세", 3 : "이용권 판매"},
	"/member/{number}/sell/payment"							: {1 : "고객관리", 2 : "회원상세", 3 : "이용권 판매 결제"},
	"/member/{number}/sell/payment/modify"					: {1 : "고객관리", 2 : "회원상세", 3 : "이용권 판매 수정"},

	"/member/{number}/orderInfo/{number}"					: {1 : "고객관리", 2 : "회원상세", 3 : "판매상세"},
	"/member/{number}/orderInfo/{number}/transfer"			: {1 : "고객관리", 2 : "회원상세", 3 : "이용권 양도"},
	"/member/{number}/orderInfo/{number}/transfer/payment"	: {1 : "고객관리", 2 : "회원상세", 3 : "이용권 양도 결제"},

	"/member/{number}/orderInfo"							: {1 : "고객관리", 2 : "회원상세", 3 : "판매내역"},
	"/member/{number}/history/pass"							: {1 : "고객관리", 2 : "회원상세", 3 : "변경내역"},

	"/sales/member-prospective"								: {1 : "고객관리", 2 : "잠재고객"},
	"/member-counseling/index"								: {1 : "고객관리", 2 : "고객상담"},
	"/sales/analysis"										: {1 : "고객관리", 2 : "세일즈 성과분석"},
	"/sales/member-prospective"								: {1 : "고객관리", 2 : "잠재고객"},
	"/sales/member-prospective"								: {1 : "고객관리", 2 : "잠재고객"},

	"/member/notice/getNotice"								: {1 : "고객관리", 2 : "공지사항", 3 : "공지사항"},
	"/member/notice/getNoticeReg"							: {1 : "고객관리", 2 : "공지사항", 3 : "공지사항"},
	"/member/notice/getNoticeBanner"						: {1 : "고객관리", 2 : "공지사항", 3 : "공지배너"},
	"/member/notice/getNoticeBannerReg"						: {1 : "고객관리", 2 : "공지사항", 3 : "공지배너"},
	"/member/bannerad/getPopupAd"							: {1 : "고객관리", 2 : "공지사항", 3 : "팝업공지"},
	"/member/notice/getPopupAdReg"							: {1 : "고객관리", 2 : "공지사항", 3 : "팝업공지"},

	"/member/notice/getBannerAd"							: {1 : "고객관리", 2 : "배너광고", 3 : "플로팅배너"},
	"/member/notice/getBannerAdReg"							: {1 : "고객관리", 2 : "배너광고", 3 : "플로팅배너"},
	"/member/notice/getSponsorAd"							: {1 : "고객관리", 2 : "배너광고", 3 : "스폰서배너"},
	"/member/notice/getSponsorAdReg"						: {1 : "고객관리", 2 : "배너광고", 3 : "스폰서배너"},
	"/member/notice/getGotoPick"							: {1 : "고객관리", 2 : "배너광고", 3 : "고투픽"},

	"/batch-extension/history"								: {1 : "고객관리", 2 : "만료일 연장내역"},

	"/community/notice"										: {1 : "고객관리", 2 : "커뮤니티 관리", 3 : "공지사항"},
	"/community/notice/create"								: {1 : "고객관리", 2 : "커뮤니티 관리", 3 : "공지사항 등록"},
	"/community/notice/{number}/update"						: {1 : "고객관리", 2 : "커뮤니티 관리", 3 : "공지사항 수정"},

	"/community/notice/banner"								: {1 : "고객관리", 2 : "커뮤니티 관리", 3 : "배너공지"},
	"/community/notice/banner/create"						: {1 : "고객관리", 2 : "커뮤니티 관리", 3 : "배너공지 등록"},
	"/community/notice/banner/{number}/update"				: {1 : "고객관리", 2 : "커뮤니티 관리", 3 : "배너공지 수정"},

	"/community/notice/popup/ad"							: {1 : "고객관리", 2 : "커뮤니티 관리", 3 : "이미지 팝업"},
	"/community/notice/popup/ad/create"						: {1 : "고객관리", 2 : "커뮤니티 관리", 3 : "이미지 팝업 등록"},
	"/community/notice/popup/ad/{number}/update"			: {1 : "고객관리", 2 : "커뮤니티 관리", 3 : "이미지 팝업 수정"},

	"/community/board/member/app"							: {1 : "고객관리", 2 : "커뮤니티 관리", 3 : "회원앱 커뮤니티"},
	"/community/board/member/app/create"					: {1 : "고객관리", 2 : "커뮤니티 관리", 3 : "회원앱 커뮤니티 등록"},
	"/community/board/member/app/{number}/update"			: {1 : "고객관리", 2 : "커뮤니티 관리", 3 : "회원앱 커뮤니티 수정"},

	"/community/qna"										: {1 : "고객관리", 2 : "커뮤니티 관리", 3 : "문의사항 관리"},
	"/community/qna/{number}/detail"						: {1 : "고객관리", 2 : "커뮤니티 관리", 3 : "문의사항 상세"},


	"/member/app/approve"									: {1 : "고객관리", 2 : "회원 관리", 3 : "회원앱 연동신청 관리"},

	// 이용권 관리
	"/services"												: {1 : "이용권 관리", 2 : "현장 판매 이용권"},
	"/services/create"										: {1 : "이용권 관리", 2 : "현장 판매 이용권", 3 : "등록"},
	"/services/package/create"								: {1 : "이용권 관리", 2 : "현장 판매 이용권", 3 : "패키지 등록"},
	"/services/normal/{number}"								: {1 : "이용권 관리", 2 : "현장 판매 이용권", 3 : "수정"},
	"/services/package/{number}"							: {1 : "이용권 관리", 2 : "현장 판매 이용권", 3 : "패키지 수정"},
	"/services/remove"										: {1 : "이용권 관리", 2 : "현장 판매 중지 이용권"},

	"/coupon/discount"										: {1 : "이용권 관리", 2 : "현장 판매 프로모션"},
	"/coupon/discount/create"								: {1 : "이용권 관리", 2 : "현장 판매 프로모션", 3 : "등록"},
	"/coupon/discount/{number}"								: {1 : "이용권 관리", 2 : "현장 판매 프로모션", 3 : "수정"},

	"/b-pay/service"										: {1 : "이용권 관리", 2 : "b.pay 판매 이용권"},
	"/b-pay/service/create"									: {1 : "이용권 관리", 2 : "b.pay 판매 이용권", 3 : "등록"},
	"/b-pay/service/package/create"							: {1 : "이용권 관리", 2 : "b.pay 판매 이용권", 3 : "패키지 등록"},
	"/b-pay/service/normal/{number}"						: {1 : "이용권 관리", 2 : "b.pay 판매 이용권", 3 : "수정"},
	"/b-pay/service/package/{number}"						: {1 : "이용권 관리", 2 : "b.pay 판매 이용권", 3 : "패키지 수정"},
	"/b-pay/service/standby"								: {1 : "이용권 관리", 2 : "b.pay 판매 대기 이용권"},
	"/b-pay/service/remove"									: {1 : "이용권 관리", 2 : "b.pay 판매 중지 이용권"},

	"/b-pay/coupon"											: {1 : "이용권 관리", 2 : "b.pay 프로모션"},
	"/b-pay/coupon/create"									: {1 : "이용권 관리", 2 : "b.pay 프로모션", 3 : "등록"},

	// 인사관리
	"/coach"												: {1 : "인사관리", 2 : "임직원 관리"},
	"/coach/create"											: {1 : "인사관리", 2 : "임직원 관리", 3 : "등록"},
	"/coach/{number}/update"								: {1 : "인사관리", 2 : "임직원 관리", 3 : "수정"},
	"/coach/{number}/overview"								: {1 : "인사관리", 2 : "임직원 관리", 3 : "상세"},
	"/coach/{number}/setting/schedule"						: {1 : "인사관리", 2 : "임직원 관리", 3 : "상세"},
	"/coach/{number}/setting/holiday"						: {1 : "인사관리", 2 : "임직원 관리", 3 : "상세"},
	"/coach/{number}/setting/reservation"					: {1 : "인사관리", 2 : "임직원 관리", 3 : "상세"},

	"/coach/payroll/setting"								: {1 : "인사관리", 2 : "급여설정"},
	"/coach/{number}/payroll"								: {1 : "인사관리", 2 : "급여설정", 3 : "상세"},
	"/coach/{number}/payroll/create"						: {1 : "인사관리", 2 : "급여설정", 3 : "등록"},
	"/coach/{number}/payroll/{number}"						: {1 : "인사관리", 2 : "급여설정", 3 : "수정"},

	"/settlement"											: {1 : "인사관리", 2 : "급여정산"},
	"/settlement/coach/{number}/current"					: {1 : "인사관리", 2 : "급여정산", 3 : "상세"},
	"/settlement/coach/{number}/confirm"					: {1 : "인사관리", 2 : "급여정산", 3 : "상세"},

	// 회계관리
	"/summary/sales"										: {1 : "회계관리", 2 : "이용권 매출조회"},
	"/manager/accounting/sales/salesList/productPublic"		: {1 : "회계관리", 2 : "일반 상품 매출조회"},
	"/manager/expenditure/index"							: {1 : "회계관리", 2 : "지출등록"},
	"/manager/accounting/expenditure"						: {1 : "회계관리", 2 : "지출조회"},

	// 통계분석
	"/statistics/appointment/index"							: {1 : "통계분석", 2 : "개인레슨 통계"},
	"/statistics/class/index"								: {1 : "통계분석", 2 : "그룹수업 통계"},

	// 센터관리
	"/sms/send"												: {1 : "센터관리", 2 : "SMS/알림톡", 3 : "SMS 발송내역"},
	"/sms/charge"											: {1 : "센터관리", 2 : "SMS/알림톡", 3 : "SMS 충전내역"},
	"/sms/auto"												: {1 : "센터관리", 2 : "SMS/알림톡", 3 : "SMS 자동 문자발송"},
	"/sms/sender"											: {1 : "센터관리", 2 : "SMS/알림톡", 3 : "SMS 발신번호 등록"},
	"/sms/history"											: {1 : "센터관리", 2 : "SMS/알림톡", 3 : "SMS 이용내역"},
	"/kakao/alimtalk"										: {1 : "센터관리", 2 : "SMS/알림톡", 3 : "SMS 알림톡"},

	"/partner/naver"										: {1 : "센터관리", 2 : "네이버 연동", 3 : "네이버 연동 설정"},
	"/partner/naver/booking"								: {1 : "센터관리", 2 : "네이버 연동", 3 : "네이버 예약 내역"},
	"/partner/naver/accounting"								: {1 : "센터관리", 2 : "네이버 연동", 3 : "네이버 정산"},

	"/partner/keepfit"										: {1 : "센터관리", 2 : "키핏 연동", 3 : "키핏 서비스 연동"},

	"/partner/operation"									: {1 : "센터관리", 2 : "센터설정", 3 : "운영관리"},
	"/partner/checkin"										: {1 : "센터관리", 2 : "센터설정", 3 : "입장관리"},
	"/partner/branch"										: {1 : "센터관리", 2 : "센터설정", 3 : "지점관리"},
	"/partner/info"											: {1 : "센터관리", 2 : "센터설정", 3 : "센터정보"},
	"/partner/license"										: {1 : "센터관리", 2 : "센터설정", 3 : "라이선스"},
	"/partner/customer"										: {1 : "센터관리", 2 : "센터설정", 3 : "거래처 관리"},

	"/b-pay/policy"											: {1 : "센터관리", 2 : "센터설정", 3 : "b.pay 정책관리"},
	"/partner/contract"										: {1 : "센터관리", 2 : "센터설정", 3 : "계약관리"},

	"/manager/group"										: {1 : "센터관리", 2 : "그룹관리"},

	"/locker"												: {1 : "센터관리", 2 : "락커관리"},

	"/product/public"										: {1 : "센터관리", 2 : "일반상품관리"},

	"/reservationsetting/setting/appointment"				: {1 : "센터관리", 2 : "예약정책", 3 : "개인레슨"},
	"/reservationsetting/setting/class"						: {1 : "센터관리", 2 : "예약정책", 3 : "그룹수업"},

	"/partner/use"											: {1 : "센터관리", 2 : "입장내역"},

	"/manager/history/index"								: {1 : "센터관리", 2 : "히스토리"},

	"/permission/index"										: {1 : "센터관리", 2 : "권한관리"},
};

(function() {
	try {
		const isNumber = (value) => {return /^([0-9])+$/.test(value);};
		const isId = (value) => {return /^([A-Z]{2})([0-9]{13})$/.test(value);};

		let pathName = window.location.pathname || "";
		if(pathName.substr(-1) == "/")
			pathName = pathName.substr(0, pathName.length - 1);
		pathName = pathName.split("/").map(item => {
			return (isNumber(item) || isId(item)) ? "{number}" : item;
		});
		pathName = pathName.join("/");

		const nameList = sitemap[pathName] || {};
		let pathList = [];
		for(let name in nameList)
			pathList.push(nameList[name]);
		const pathInfo = pathList.join(" > ");

		document.title = "바디코디 : " + pathInfo;
		if(!document.bodycodi)
			document.bodycodi = {}
		 document.bodycodi.pathInfo = pathInfo;
	} catch(error) {
		console.log(error);
	}
})();

window.addEventListener("DOMContentLoaded", function() {
	try {
		const firebaseConfig = {
			apiKey: "AIzaSyAgyGcU0KQ5W5EBVIVNqrTjeauQl1xGz_w",
			authDomain: "bodycodi-crm.firebaseapp.com",
			projectId: "bodycodi-crm",
			storageBucket: "bodycodi-crm.appspot.com",
			messagingSenderId: "236538312483",
			appId: "1:236538312483:web:3526a1faeb351ea9ccfe96",
			measurementId: "G-CHDZDQ3XBK"
		};
		firebase.initializeApp(firebaseConfig);
		const analytics = firebase.analytics();
		analytics.setUserProperties({
			partner_id : partnerInfo.partner.id,
			employee_id : partnerInfo.employee.id
		});
	 	analytics.logEvent("screen_view", {
			screen_name : document.bodycodi.pathInfo
		});
	} catch(error) {
		console.log(error);
	}
});

