
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
	<style type="text/css">
.ui-input-radio.more span + span						{margin:0}
.ui-input-radio.more input + span + span				{display:inline-block}
.ui-input-radio.more input:checked + span + span		{display:none}
.ui-input-radio.more input:checked + span + span + span	{display:inline-block}

main 							{line-height:35px}
main i							{font-style:normal}
main h4							{margin-bottom:5px; font-size:16px}
main li + li					{margin-top:50px}
main li li + li					{margin-top:25px}
main .time						{margin:0 5px !important; width:55px; max-width:55px; text-align:center}
main li.hidden					{display:none}
main.class .class,
main.appointment .appointment	{display:block}
main li.submit					{padding-bottom:10px; text-align:center}
main li.submit button			{width:150px}

	</style>
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
		<a class="focus" href="/reservationsetting/setting/appointment">예약정책</a>
		<a href="/partner/use">입장 내역</a>
		<a href="/manager/history/index">히스토리</a>
	</div>
</nav>

<!-- 콘텐츠 -->
<div class="contents">
	<!-- 사이드 메뉴 -->
	<aside class="ui-side">
		<div class="menu">
			<h4>예약정책</h4>
			<ul>
				<li><a href="/reservationsetting/setting/appointment">개인레슨</a></li>
				<li><a href="/reservationsetting/setting/class">그룹수업</a></li>
			</ul>
		</div>
	</aside>

	<!-- 메인 -->
	<main>
		<ul>
			<li>
				<h2 class="ui-title">
					
						개인레슨 예약시간 설정
					
					
				</h2>
				<ul>
					<li>
						<p class="ui-note blue">
							회원이 가맹점 전용 멤버스 앱을 통하여 개인레슨 이용권를 예약할 수 있는 조건을 설정합니다.<br>
							개인레슨 이용권의 예약 가능 시간은 현재 시간부터 설정된 시간 이후로 시간이 비어 있을 경우에만 예약이 가능합니다.<br>
							예약 변경/취소 가능 시간이 지나면 회원은 더 이상 예약을 취소하거나 변경할 수 없습니다.
						</p>
					</li>
					<li>
						<h4>예약 가능 시간</h4>
						<div>
							<label class="ui-input-radio">
								<input type="radio" name="reservationPossibleTimeType" value="F" checked>
								<span></span>
								수업 시작 전 항상 가능
							</label>
						</div>
						<div>
							<label class="ui-input-radio more">
								<input type="radio" name="reservationPossibleTimeType" value="I">
								<span></span>
								<span>수업 예약 가능한 시간 설정</span>
								<span>
									수업시간
									<input class="time" name="reservationPossibleTimeDay" type="integer" min="0" value="0">일
									<select class="ui-select time" name="reservationPossibleTimeHour" data-type="hour">
										<option>시</option>
									</select>
									시
									<select class="ui-select time" name="reservationPossibleTimeminute" data-type="minute">
										<option>분</option>
									</select>
									분 전까지 <i class="red">예약</i> 가능
								</span>
							</label>
						</div>
					</li>
					<li>
						<h4>예약 변경/취소 가능 시간</h4>
						<div>
							<label class="ui-input-radio">
								<input type="radio" name="reservationChangeTimeType" value="F" checked>
								<span></span>
								수업 시작 전 항상 가능
							</label>
							<label class="ui-input-radio">
								<input type="radio" name="reservationChangeTimeType" value="X">
								<span></span>
								예약 후 변경 및 취소 불가
							</label>
							<label class="ui-input-radio">
								<input type="radio" name="reservationChangeTimeType" value="T">
								<span></span>
								당일 취소 및 변경 불가
							</label>
						</div>
						<div>
							<label class="ui-input-radio more">
								<input type="radio" name="reservationChangeTimeType" value="I">
								<span></span>
								<span>수업 취소/변경 가능한 시간 설정</span>
								<span>
									수업시간
									<input class="time" name="reservationChangeTimeDay" type="integer" min="0" value="0">일
									<select class="ui-select time" name="reservationChangeTimeHour" data-type="hour">
										<option>시</option>
									</select>
									시
									<select class="ui-select time" name="reservationChangeTimeMinute" data-type="minute">
										<option>분</option>
									</select>
									분 전까지 <i class="red">취소</i> 가능
								</span>
							</label>
						</div>
					</li>
				</ul>
			</li>
			<li>
				<h2 class="ui-title">결석 처리 기준 설정</h2>
				<ul>
					<li>
						<p class="ui-note blue">
							회원이 예약한 서비스의 종료 전까지 센터에 배치된 입장 체커(터치 스크린)에서 예약한 서비스를 선택하고,<br>
							입장하지 않거나 서비스 제공자(강사)가 코치 앱을 통해 출결처리를 하지 않은 경우 익일 오전 4시에 자동 결석으로 처리됩니다.
						</p>
					</li>
					<li>
						<div>
							<label class="ui-input-radio">
								<input type="radio" name="autoAbsenceYn" value="Y" checked>
								<span></span>
								수업종료 시 자동결석 처리
							</label>
						</div>
						<!--
						<div>
							<label class="ui-input-radio">
								<input type="radio" name="autoAbsenceYn" value="N">
								<span></span>
								수업종료 시 자동결석 미처리
							</label>
						</div>
						-->
					</li>
				</ul>
			</li>
			<li>
				<h2 class="ui-title">결석 시 이용권 차감 유무 설정</h2>
				<ul>
					<li>
						<p class="ui-note blue">
							회원이 결석처리가 되었을 경우 예약하기 위해 사용했던 이용권의 남은 횟수가 차감되거나 차감되지 않도록 설정할 수 있습니다.<br>
							이용권 차감으로 설정 시, 회원들에게 미리 예약하고 결석하면 남은 횟수가 차감된다는 사실을 알려주시기 바랍니다.
						</p>
					</li>
					<li>
						<h4>결석 시 이용권 차감 유무 (결석 처리 시, 이용권 차감 유무 설정은 회원이 예약했을 때 설정값이 적용됩니다.)</h4>
						<div>
							<label class="ui-input-radio">
								<input type="radio" name="voucherMinusYn" value="Y" checked>
								<span></span>
								이용권 차감
							</label>
						</div>
						<div>
							<label class="ui-input-radio">
								<input type="radio" name="voucherMinusYn" value="N">
								<span></span>
								이용권 미차감
							</label>
						</div>
					</li>
				</ul>
			</li>

			<!-- 그룹수업 -->
			<li class="hidden class">
				<h2 class="ui-title">그룹수업 대기신청 옵션 설정</h2>
				<ul>
					<li>
						<h4>이용권의 예약 + 출석 횟수가 주간 이용횟수를 초과 시 추가 대기신청</h4>
						<div>
							<label class="ui-input-radio">
								<input type="radio" name="mustValidWeekReservationToWait" value="true" checked>
								<span></span>
								가능
							</label>
						</div>
						<div>
							<label class="ui-input-radio">
								<input type="radio" name="mustValidWeekReservationToWait" value="false">
								<span></span>
								불가능
							</label>
						</div>
					</li>
					<li>
						<h4>이용권의 예약 + 출석 횟수가 1일 이용횟수를 초과 시 대기신청</h4>
						<div>
							<label class="ui-input-radio">
								<input type="radio" name="mustValidDayReservationToWait" value="true">
								<span></span>
								가능
							</label>
						</div>
						<div>
							<label class="ui-input-radio">
								<input type="radio" name="mustValidDayReservationToWait" value="false" checked>
								<span></span>
								불가능
							</label>
						</div>
					</li>
					<li>
						<h4>이용권의 예약 횟수가 최대예약횟수를 초과 시 대기신청</h4>
						<div>
							<label class="ui-input-radio">
								<input type="radio" name="mustValidMaxReservationToWait" value="true">
								<span></span>
								가능
							</label>
						</div>
						<div>
							<label class="ui-input-radio">
								<input type="radio" name="mustValidMaxReservationToWait" value="false" checked>
								<span></span>
								불가능
							</label>
						</div>
					</li>
					<li>
						<h4>이용권의 사용(출석/결석) + 예약 횟수가 전체횟수를 초과 시 대기 신청</h4>
						<div>
							<label class="ui-input-radio">
								<input type="radio" name="mustValidSpendNumberToWait" value="true">
								<span></span>
								가능
							</label>
						</div>
						<div>
							<label class="ui-input-radio">
								<input type="radio" name="mustValidSpendNumberToWait" value="false" checked>
								<span></span>
								불가능
							</label>
						</div>
					</li>
				</ul>
			</li>

			<!-- 개인레슨 -->
			<li class="hidden appointment">
				<h2 class="ui-title">코치앱 출석기능</h2>
				<ul>
					<li>
						<p class="ui-note blue">
							코치앱에서 강사/트레이너 선생님이 직접 출석처리할 수 있는 기능을 설정할 수 있습니다.
						</p>
					</li>
					<li>
						<h4>코치앱 출석기능</h4>
						<div>
							<label class="ui-input-radio">
								<input type="radio" name="canEntranceCoachApp" value="true">
								<span></span>
								출석처리 가능
							</label>
						</div>
						<div>
							<label class="ui-input-radio">
								<input type="radio" name="canEntranceCoachApp" value="false" checked>
								<span></span>
								완료 요청만 가능
							</label>
						</div>
					</li>
				</ul>
			</li>
			<li class="hidden appointment">
				<h2 class="ui-title">회원앱 예약 기능</h2>
				<ul>
					<li>
						<p class="ui-note blue">
							회원앱에서 회원님이 직접 개인레슨 예약 가능 여부를 설정할 수 있습니다.
						</p>
					</li>
					<li>
						<h4>회원앱 예약 기능</h4>
						<div>
							<label class="ui-input-radio">
								<input type="radio" name="showAppointmentScheduleMemberApp" value="true" checked>
								<span></span>
								예약 가능
							</label>
						</div>
						<div>
							<label class="ui-input-radio">
								<input type="radio" name="showAppointmentScheduleMemberApp" value="false">
								<span></span>
								예약 불가능
							</label>
						</div>
					</li>
				</ul>
			</li>
			<li class="submit">
				<button class="ui-button blue" data-event="submit" data-permission="permissionOperation/reservationSetting">저장</button>
			</li>
		</ul>
	</main>
</div>
</body>
<script type="text/javascript">

const mode = "appointment";
const data = `{"seqPartnerReservationSetting":"2908","settingRoute":"COM_COACH","reservationPossibleTimeType":"F","reservationPossibleTimeDay":"3","reservationPossibleTimeHour":"0","reservationPossibleTimeminute":"0","reservationChangeTimeType":"I","reservationChangeTimeDay":"1","reservationChangeTimeHour":"12","reservationChangeTimeMinute":"0","autoAbsenceYn":"Y","seqPartnerCoach":"0","seqPartnerClass":"0","voucherMinusYn":"Y","showAppointmentScheduleMemberApp":true,"canEntranceCoachApp":false,"mustValidSpendNumberToWait":false,"mustValidMaxReservationToWait":false,"mustValidWeekReservationToWait":false,"mustValidDayReservationToWait":false,"useYn":"Y"}`;

function doReady() {
	doPage.open(mode, data);
}

const doPage = {
	container : undefined,
	data : {},
	permission : {},
	open : function(mode, data) {
		permissionController.getList().then(permission => {
			this.mode = mode;
			this.data = JSON.parse(data);
			this.permission = uiPermission.data = permission;
			this.render();
		}).catch(error => {
			console.log(error);
			alert("데이터를 가져오는데 실패하였습니다.");
		});
	},
	render : function() {
		this.container = document.querySelector("main");
		const self = this.event.self = this;
		const setMode = () => {
			const main = this.container;
			main.classList.add(this.mode);
			const side = document.querySelector("aside");
			const aList = side.querySelectorAll("a");
			aList.forEach(item => {
				const href = item.getAttribute("href");
				if(href.indexOf(this.mode) > -1)
					item.parentNode.classList.add("focus");
			});
		};
		const setTime = () => {
			["hour", "minute"].forEach(item => {
				const select = this.container.querySelectorAll("select[data-type='" + item + "']");
				const j = (item == "hour") ? 24 : 60;
				select.forEach(item => {
					const option = [];
					for(let i = 0; i < j; i++) {
						const value = i.zf(2);
						option.push(`<option value="${value}">${value}</option>`);
					}
					item.innerHTML += option.join("");
				});
			});
		};
		const setButton = () => {
			const button = this.container.querySelector("[data-event='submit']");
			button.addEventListener("click", () => {this.event.submit()});
		};
		setMode();
		setTime();
		setButton();
		this.prepare();
		uiPermission(this.container);
	},
	prepare : function() {
		for(let name in this.data) {
			let value = this.data[name];
			if(name.indexOf("TimeHour") > -1 || name.indexOf("TimeMinute") > -1 || name.indexOf("Timeminute") > -1)
				value = String(value).zf(2);
			this.container.putValue(name, value);
		}
	},
	event : {
		submit : function() {
			const mode = this.self.mode;
			const form = this.self.container;
			const seqPartnerReservationSetting = this.self.data.seqPartnerReservationSetting;
			const data = {
				settingRoute : (mode == "appointment") ? "COM_COACH" : "COM_CLASS",
				useYn : "Y",
				seqPartnerReservationSetting : seqPartnerReservationSetting,
				reservationPossibleTimeType : form.getValue("reservationPossibleTimeType"),
				reservationPossibleTimeDay : form.getValue("reservationPossibleTimeDay"),
				reservationPossibleTimeHour : form.getValue("reservationPossibleTimeHour"),
				reservationPossibleTimeminute : form.getValue("reservationPossibleTimeminute"),
				reservationChangeTimeType : form.getValue("reservationChangeTimeType"),
				reservationChangeTimeDay : form.getValue("reservationChangeTimeDay"),
				reservationChangeTimeHour : form.getValue("reservationChangeTimeHour"),
				reservationChangeTimeMinute : form.getValue("reservationChangeTimeMinute"),
				autoAbsenceYn : form.getValue("autoAbsenceYn"),
				voucherMinusYn : form.getValue("voucherMinusYn"),
			};
			if(mode == "appointment") {
				data.canEntranceCoachApp = form.getValue("canEntranceCoachApp");
				data.showAppointmentScheduleMemberApp = form.getValue("showAppointmentScheduleMemberApp");
			} else {
				data.mustValidWeekReservationToWait = form.getValue("mustValidWeekReservationToWait");
				data.mustValidDayReservationToWait = form.getValue("mustValidDayReservationToWait");
				data.mustValidMaxReservationToWait = form.getValue("mustValidMaxReservationToWait");
				data.mustValidSpendNumberToWait = form.getValue("mustValidSpendNumberToWait");
			}
			partnerController.reservation.update(data).then(data => {
				alert("저장되었습니다.");
				window.location.reload(true);
			}).catch(error => {
				console.log(error);
				alert("저장 중 오류가 발생하였습니다.");
			});
		}
	}
};
</script>
</html>
</html>
