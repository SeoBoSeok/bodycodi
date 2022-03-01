
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
				remainDate	: Number("622"),
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
	<script type="text/javascript" src="/static/js/component/componentCoach.js?v=2.53"></script>
	<link type="text/css" rel="stylesheet" href="/static/css/jquery/jquery.dataTables.css">
	<style type="text/css">
main section											{position:relative}
main section .middle .preview							{position:absolute; left:768px; bottom:0px; width:390px}
main section .middle .preview figure					{position:relative; padding-bottom:35px}
main section .middle .preview figure .background		{width:100%}
main section .middle .preview figure .name				{position:absolute; left:55px; top:185px; width:150px; height:25px; background-color:white; line-height:25px; font-size:19px; font-weight:bold; color:#222; white-space:nowrap; text-overflow:ellipsis; overflow:hidden}
main section .middle .preview figure .thumbnail			{position:absolute; right:60px; top:177px; width:60px; height:60px; background-color:white; border-radius:100%; border:1px solid white; object-fit:cover}
main section .middle .preview figure .description		{position:absolute; padding:2px; left:77px; top:257px; width:257.5px; height:90px; background-color:#f8f8f8; border:none; line-height:1.5; font-size:15px; box-sizing:border-box}
main section .middle .preview figure .description		{display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:4; overflow:hidden}
main section .middle .preview figure .description.empty	{color:#999}
main section .middle .preview figcaption				{position:absolute; left:0; bottom:0; width:100%; line-height:35px; text-align:center; font-size:14px; font-weight:500}
	</style>
</head>
<body>



<!-- 로컬 네비게이션 바 -->
<nav class="ui-nav" data-index="인사관리">
	<div class="right">
		<a class="focus" href="/coach">임직원 관리</a>
		
			<a href="/coach/payroll/setting">급여설정</a>
		
		
			<a href="/settlement">급여정산</a>
		
	</div>
</nav>

<!-- 콘텐츠 -->
<div class="contents">
	<!-- 메인 -->
	<main>
		<form autocomplete="off" onsubmit="return false">
			<!-- 상단 경로 탭 -->
			<div class="ui-path">
				<div class="left">
					<ul>
						<li><a href="/coach">임직원 관리</a></li>
						
							<li class="focus"><a href="/coach/create">임직원 등록</a></li>
						
						
					</ul>
				</div>
			</div>

			<!-- 기본정보 -->
			<section class="ui-form">
				<div class="top">
					<h2 class="ui-title">기본 정보</h2>
				</div>
				<div class="middle">
					<table>
						<tr class="ui-thumbnail">
							<th>
								<div>
									<img id="profileImage" src="/static/img/brand/symbol_gray.png">
								</div>
							</th>
							<td>
								<input name="imgUrl" type="hidden">
								<label class="ui-input-file">
									<span>첨부된 파일이 없습니다.</span>
									<button class="ui-button" type="button">파일 찾기</button>
									<input name="profileImage" type="file" data-event="profileImage">
								</label>
								<p class="ui-note">정면, 상반신 사진을 등록해 주세요.</p>
							</td>
						</tr>
						<tr>
							<th>이름</th>
							<td>
								<input name="coachName" type="text" max="24" data-event="preview" tabIndex>
							</td>
						</tr>
						<tr>
							<th>성별</th>
							<td>
								<label class="ui-input-radio">
									<input name="sex" type="radio" value="M">
									<span></span>
									남성
								</label>
								<label class="ui-input-radio">
									<input name="sex" type="radio" value="F">
									<span></span>
									여성
								</label>
							</td>
						</tr>
						<tr>
							<th>휴대폰 번호</th>
							<td class="ui-input-phone">
								<input name="mobileNo" type="number" maxlength="3" tabIndex>
								<span>-</span>
								<input name="mobileNo" type="number" maxlength="4" tabIndex>
								<span>-</span>
								<input name="mobileNo" type="number" maxlength="4" tabIndex>
							</td>
						</tr>
						<tr>
							<th>이메일</th>
							<td>
								<input class="wide" name="email" type="text" maxlength="128" tabIndex>
							</td>
						</tr>
						<tr>
							<th>생년월일</th>
							<td class="ui-input-date">
								<input class="year" name="birthday" type="number" min="1900" max="2100" maxlength="4" tabIndex>
								<span>년</span>
								<input class="month" name="birthday" type="number" min="1" max="12" maxlength="2" tabIndex>
								<span>월</span>
								<input class="day" name="birthday" type="number" min="1" max="31" maxlength="2" tabIndex>
								<span>일</span>
							</td>
						</tr>
						<tr>
							<th>임직원 소개</th>
							<td>
								<textarea class="ui-textarea" name="profile" maxlength="1000" tabIndex></textarea>
							</td>
						</tr>
						<tr>
							<th>강사님 한마디</th>
							<td>
								<textarea class="ui-textarea" name="bpayComment" maxlength="100" placeholder="바디코디 회원앱에서 개인레슨 이용권 상세페이지 강사소개에 보여집니다. 미입력시 기본 인사말이 출력됩니다. (100자 제한) 한마디 예시 : 국가대표 트레이너 출신의 새롭고 다양한 프로그램과 세밀한 관리로 새로운 몸으로 같이 만들어가요!" data-event="preview" tabIndex></textarea>
							</td>
						</tr>
						<tr>
							<th>수업 준비 시간</th>
							<td>
								<input name="breakTime" type="integer" min="0" max="1440" value="0">
								<span class="unit">분</span>
							</td>
						</tr>
					</table>
					<div class="preview" data-id="preview">
						<figure>
							<img class="background" src="/static/img/bpay/preview_coach.png" />
							<h2 class="name" data-msg="previewName">바디코디</h2>
							<img class="thumbnail" src="/static/img/brand/symbol_gray.png" data-id="previewThumbnail" />
							<p class="description" data-id="previewDescription"></p>
							<figcaption>강사님 한마디 미리보기</figcaption>
						</figure>
					</div>
				</div>
			</section>

			<!-- 인사정보 -->
			<section class="ui-form">
				<div class="top">
					<h2 class="ui-title">인사 정보</h2>
				</div>
				<div class="middle">
					<table>
						<tr style="display:none">
							<th>지점</th>
							<td>
								<select class="ui-select" name="seqPartner">
									<option value="">지점 선택</option>
								</select>
							</td>
						</tr>
						<tr>
							<th>직급</th>
							<td>
								<select class="ui-select" name="seqPosition">
									<option value="">직급 선택</option>
								</select>
							</td>
						</tr>
						<tr>
							<th>팀/부서</th>
							<td>
								<select class="ui-select" name="seqTeam">
									<option value="">팀/부서 선택</option>
									<option value="">미선택</option>
								</select>
							</td>
						</tr>
						<tr>
							<th>직무</th>
							<td>
								<label class="ui-input-checkbox">
									<input name="salesYn" type="checkbox" value="Y">
									<span></span>
									결제와 세일즈
								</label>
								<label class="ui-input-checkbox">
									<input name="appointmentYn" type="checkbox" value="Y">
									<span></span>
									개인레슨
								</label>
								<label class="ui-input-checkbox">
									<input name="classYn" type="checkbox" value="Y">
									<span></span>
									그룹수업
								</label>
							</td>
						</tr>
						<tr>
							<th>재직구분</th>
							<td>
								<label class="ui-input-radio">
									<input name="retirementYn" type="radio" value="N" checked data-event="retirementYn">
									<span></span>
									재직중
								</label>
								<label class="ui-input-radio">
									<input name="retirementYn" type="radio" value="Y" data-event="retirementYn">
									<span></span>
									퇴사
								</label>
							</td>
						</tr>
						<tr>
							<th>입사일</th>
							<td>
								<input name="joinDate" type="calendar" placeholder="입사일">
							</td>
						</tr>
						<tr>
							<th>퇴사일</th>
							<td>
								<input id="retirementDate" name="retirementDate" type="calendar" placeholder="퇴사일">
							</td>
						</tr>
					</table>
				</div>
				<div class="bottom">
					<a href="/coach"><button class="ui-button gray" type="button">목록으로</button></a>
					<button class="ui-button blue" type="button" data-event="submit">저장하기</button>
				</div>
			</section>
		</form>
	</main>
</div>

<script type="text/javascript">
function doReady() {
	const seqPartnerCoach = Number("");
	if(!seqPartnerCoach && partnerInfo.partner.isHeadquarter) {
		alert("선택된 지점이 없습니다.");
		window.location.href = "/coach";
		return;
	}
	componentCoach.update.open(seqPartnerCoach);
}
</script>
</html>
