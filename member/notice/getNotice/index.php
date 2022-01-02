
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






<link type="text/css" rel="stylesheet" href="/static/css/jquery/jquery.dataTables.css">
<link type="text/css" rel="stylesheet" href="/static/css/notice.css?v=202009091130">
<script type="text/javascript" src="/static/js/common/jquery/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="/static/js/ui/uiDateSelector.js"></script>
<script type="text/javascript" src="/static/js/component/componentMember.js"></script>
<script type="text/javascript" src="/static/js/ckeditor/uploadAdapter.js"></script>
<script src="https://cdn.ckeditor.com/ckeditor5/22.0.0/decoupled-document/ckeditor.js"></script>
<link type="text/css" rel="stylesheet" href="/static/css/ckeditor/ckeditor.css?v=2">

<style>
.dim {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 20;
    background-color: rgba(0,0,0,0.6);
    display: none;
}

.free_area {
    margin-left: 275px;
    height: 100%;
    border-left: 1px solid #ccc;
}
</style>




<!-- 로컬 네비게이션 바 -->
<nav class="ui-nav" data-index="고객관리">
	<div class="right">
		<a href="/member">회원 검색</a>
		<a href="/member-counseling/index">회원 관리</a>
		<a href="/sales/member-prospective">잠재고객 관리</a>
		<a class="focus" href="/community/notice">커뮤니티 관리</a>
		<a href="/sales/analysis">세일즈 성과 분석</a>
	</div>
</nav>

<!-- 사이드 메뉴 -->
<aside class="ui-side">
	<div class="menu">
		<h4>커뮤니티 관리</h4>
		<ul>
			<li><a href="/community/notice">공지사항</a></li>
			<li><a href="/community/notice/banner">배너공지</a></li>
			<li><a href="/community/notice/popup/ad">이미지 팝업</a></li>
			<li><a href="/community/board/member/app">회원앱 커뮤니티</a></li>
			<li><a href="/community/qna">문의사항 관리</a></li>
			
		</ul>
	</div>

	<script type="text/javascript">
		(function() {
			const pathname = window.location.pathname;
			const a = document.querySelector(".ui-side").querySelectorAll("a");
			a.forEach(item => {
				const href = item.getAttribute("href");
				if(pathname == href || pathname.indexOf(href) > -1 || pathname == href + "Reg")
					item.parentNode.classList.add("focus");
			});
		})();
	</script>
</aside>


<div id="dim" class="dim"></div>

<div class="free_area">
<!-- 콘텐츠 -->
<div class="contents" id="loadNoticeUpd" style="position: relative">

<div id="noticePreviewPopupLoad" style="z-index: 20; display: none; width: 360px; height: 640px; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color:#000; padding-left: 20px; padding-right: 20px; padding-bottom: 5px;">
</div>

	<!-- 메인 -->
	<main>
		<section class="notice">
			<p class="ui-note blue" style="margin:0 0 15px 0">
				회원 APP 공지사항 메뉴에서 확인 가능한 공지 내용을 등록할 수 있습니다. 회원 APP 첫화면(홈)에 공지를 노출해야 하는 중요공지의 경우, 반드시 공지 배너를 등록 후 공지사항과 연결시켜주세요.
			</p>
			<div class="search">
				<div class="left">
					전체 : <var data-msg="postCount" id="noticeCnt"></var>
				</div>
				<div class="right">
					<div class="searchBox">
						<select class="ui-select" name="searchType" id="noticeSchType">
							<option value=""></option>
							<option value="TITLE" selected>제목</option>
							<option value="CONTENTS">내용</option>
							<option value="ALL">제목 + 내용</option>
							<option value="AUTHOR">등록자</option>
						</select>
						<span></span>
						<input id="noticeSch" name="searchWord" type="text" data-event="searchWord">
						<button data-event="searchWord" onclick="loadNoticeList()"><span></span></button>
					</div>
					<a href="/member/notice/getNoticeReg"><button class="ui-button blue">등록</button></a>
					<!--<button class="ui-button red" data-event="remove">삭제</button>-->
				</div>
			</div>

		    <div id="loadNoticeList" class="list">

		    </div>

		</section>
	</main>
</div>
</div>


<script type="text/javascript">
function loadNoticeUpd (seqNotice,targetNm) {

	var url = '/member/notice/getNoticeUpd?seqNotice=' + seqNotice+'&targetNm='+targetNm;

     $.ajax({
        url : url,
        type : "GET",
        contentType : "application/json",
        //data : formData,
        dataType : "text",
        beforeSend : function(xhr) {
            $.blockUI({
                message : '<h5 style="padding-top: 15px">처리 중 입니다.</h5>',
                css : {
                    'height' : '50px',
                    'z-index' : 2010
                }
            });
        },
        error : function(data) {
	        alert("오류가 발생 하였습니다.\n관리자에게 문의하십시오.");
	    },
        complete : function () {
            $.unblockUI();
        },
        success : function (data) {
            try {
                $('#loadNoticeUpd').html(data)
            }
            catch (e) {
           	 console.trace(e);
		     alert("결과 처리 중 오류가 발생 하였습니다. 데스크에 문의 해주세요.");
            }
        }
    });
}
loadNoticeList();
function loadNoticeList () {


	var noticeSch = $('#noticeSch').val();
	var noticeSchType = $("#noticeSchType option:selected").val();
	var url = "/member/notice/getNoticeList?noticeSchType=" + noticeSchType + '&noticeSch=' + noticeSch

     $.ajax({
        url : url,
        type : "GET",
        contentType : "application/json",
        //data : formData,
        dataType : "text",
        beforeSend : function(xhr) {
            $.blockUI({
                message : '<h5 style="padding-top: 15px">처리 중 입니다.</h5>',
                css : {
                    'height' : '50px',
                    'z-index' : 2010
                }
            });
        },
        error : function(data) {
	        alert("오류가 발생 하였습니다.\n관리자에게 문의하십시오.");
	    },
        complete : function () {
            $.unblockUI();
        },
        success : function (data) {
            try {
                $('#loadNoticeList').html(data)
            }
            catch (e) {
           	 console.trace(e);
		     alert("결과 처리 중 오류가 발생 하였습니다. 데스크에 문의 해주세요.");
            }
        }
    });
}
</script>
</html>
