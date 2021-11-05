<?php
include_once('../common.php');

define('_SUB_', true);
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가

include_once(G5_THEME_PATH.'/head.php');
?>
<link type="text/css" rel="stylesheet" href="/static/css/uiList.css?v=20210120">
<link type="text/css" rel="stylesheet" href="/static/css/jquery/jquery.dataTables.css">
<style type="text/css">
main > .top .left								{width:300px}
main > .top .left ul							{line-height:35px}

main > .middle .left							{width:300px}
main > .middle .left li {width: 100%;}
main > .middle .left li a						{background:white url("/static/img/icon/icon_next_black.png") no-repeat right 8px center / 8px}
main > .middle .left li button					{right:25px}
main > .middle .left ul + button				{display:none; position:absolute; left:50%; margin-left:-75px; bottom:10px; width:150px; height:35px; border-radius:35px; line-height:33px; z-index:2}
main > .middle .left.update ul + button			{display:block}
main > .middle .right							{left:325px}

main > .middle .right table td:first-child img	{display:inline-block; vertical-align:middle; width:30px; height:30px; border-radius:100%; border:1px solid #ccc; object-fit:cover}
main > .middle .right table td span.small		{font-size:12px; color:#646464}
main > .middle .right table td button:disabled	{opacity:0.33}

</style>

<nav class="ui-nav" data-index="인사관리">
	<div class="right">
		<a class="focus" href="/coach">임직원 관리</a>
		
			<a href="/coach/payroll/setting">급여설정</a>
		
		
			<a href="/settlement">급여정산</a>
		
	</div>
<div class="quick">
			<a class="home" href="/home"></a>
			<a class="back" href="javascript:uiHistory.back()" data-event="uiHistoryBack"></a>
			<a class="refresh" href="javascript:window.location.reload(true)"></a>
		</div></nav>

    <div class="contents">
	<main>
		<div class="top" data-id="top">
			<div class="left">
				<div class="ui-tab">
					<ul>
						<li><label><input name="tab" type="radio" value="position" data-event="tab" checked=""><div>직급</div></label></li>
						<li><label><input name="tab" type="radio" value="team" data-event="tab"><div>팀</div></label></li>
					</ul>
				</div>
			</div>
			<div class="right">
				<div class="keyword">
					<input name="keyword" type="text" placeholder="검색어 입력 (최소 2자 이상)" autocomplete="off" data-event="keyword">
					<a data-event="reset"></a>
				</div>
				<button class="ui-button green" data-event="create">임직원 등록</button>
			</div>
		</div>
		<div class="middle" data-id="middle">
			<div class="left" data-id="groupList">
				<div class="top">
					직급 목록
				</div>
				<div class="middle">
					<ul data-event="drag">
						<li data-type="position" data-sequence="0">
							<a class="" data-event="focus">
								전체
							</a>
						</li>
						
					<li data-type="position" data-sequence="3386" draggable="true">
						<a class="" data-event="focus">
							트레이너
						</a>
						<button class="ui-button small white" data-event="update">수정</button>
					</li>
				
					<li data-type="position" data-sequence="4099" draggable="true">
						<a class="" data-event="focus">
							점장이동무
						</a>
						<button class="ui-button small white" data-event="update">수정</button>
					</li>
				
					<li data-type="position" data-sequence="2376" draggable="true">
						<a class="" data-event="focus">
							견습
						</a>
						<button class="ui-button small white" data-event="update">수정</button>
					</li>
				
					<li data-type="position" data-sequence="1949" draggable="true">
						<a class="" data-event="focus">
							미용사
						</a>
						<button class="ui-button small white" data-event="update">수정</button>
					</li>
				
					<li data-type="position" data-sequence="3285" draggable="true">
						<a class="" data-event="focus">
							팀장
						</a>
						<button class="ui-button small white" data-event="update">수정</button>
					</li>
				
					<li data-type="position" data-sequence="2375" draggable="true">
						<a class="" data-event="focus">
							샵매니저
						</a>
						<button class="ui-button small white" data-event="update">수정</button>
					</li>
				
					<li data-type="position" data-sequence="4150" draggable="true">
						<a class="" data-event="focus">
							친구들
						</a>
						<button class="ui-button small white" data-event="update">수정</button>
					</li>
				
					<li data-type="position" data-sequence="4339" draggable="true">
						<a class="" data-event="focus">
							대표님
						</a>
						<button class="ui-button small white" data-event="update">수정</button>
					</li>
				
					<li data-type="position" data-sequence="4345" draggable="true">
						<a class="" data-event="focus">
							트래이너
						</a>
						<button class="ui-button small white" data-event="update">수정</button>
					</li>
				
					<li data-type="position" data-sequence="4382" draggable="true">
						<a class="" data-event="focus">
							베이스 강사
						</a>
						<button class="ui-button small white" data-event="update">수정</button>
					</li>
				
					<li data-type="position" data-sequence="4446" draggable="true">
						<a class="" data-event="focus">
							유치원 트레이너
						</a>
						<button class="ui-button small white" data-event="update">수정</button>
					</li>
				
					</ul>
					<button class="ui-button green" data-event="order">순서 변경 적용</button>
				</div>
				<div class="bottom">
					<button data-type="position" data-event="create">
						<span></span>
						새로운 직급 등록
					</button>
				</div>
			</div>
			<div class="right" data-id="coachList">
				<table class="ui-table dark even">
					<thead>
						<tr>
							<td>구분</td>
							<td>이름</td>
							<td>성별</td>
							<td>휴대폰번호</td>
							<td>직급</td>
							<td>팀/부서</td>
							<td>입사일</td>
							<td>기타</td>
						</tr>
					</thead>
					<tbody>
					<tr data-sequence="9806">
						<td><img src="https://d27pagl1acwik5.cloudfront.net/upload/coach/774/2020/09/03/20200903151516"></td>
						<td>이석훈</td>
						<td><span class="skyblue">남성</span></td>
						<td>010-8923-1943</td>
						<td>대표자<br><span class="small">(점장이동무)</span></td>
						<td>미용</td>
						<td>2021-01-01</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove" disabled="">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="9807">
						<td><img src="https://d27pagl1acwik5.cloudfront.net/upload/coach/774/2020/09/03/20200903151541"></td>
						<td>기본관리자</td>
						<td><span class="skyblue">남성</span></td>
						<td>000-0000-0000</td>
						<td>기본 관리자<br><span class="small">(미용사)</span></td>
						<td>샵</td>
						<td>-</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove" disabled="">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="17122">
						<td><img src="https://d27pagl1acwik5.cloudfront.net/upload/coach/774/2021/04/29/20210429115530"></td>
						<td>강동원</td>
						<td><span class="skyblue">남성</span></td>
						<td>015-456-789</td>
						<td>트레이너</td>
						<td>트레이닝</td>
						<td>-</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="20000">
						<td><img src="/static/img/login/female.jpg"></td>
						<td>골프 프로</td>
						<td><span class="pink">여성</span></td>
						<td>090-1234-5687</td>
						<td>트레이너</td>
						<td>-</td>
						<td>-</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="20697">
						<td><img src="/static/img/login/female.jpg"></td>
						<td>나인원 강사 (테스트)</td>
						<td><span class="pink">여성</span></td>
						<td>010-5609-3732</td>
						<td>트레이너</td>
						<td>-</td>
						<td>-</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="17192">
						<td><img src="https://d27pagl1acwik5.cloudfront.net/upload/coach/774/2021/05/24/20210524110730"></td>
						<td>문동규 강사</td>
						<td><span class="pink">여성</span></td>
						<td>010-3133-1769</td>
						<td>트레이너</td>
						<td>트레이닝</td>
						<td>-<br><span class="small">(퇴사 : 2021-10-22)</span></td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="14597">
						<td><img src="https://d27pagl1acwik5.cloudfront.net/upload/coach/774/2021/01/20/20210120122927"></td>
						<td>민윤정</td>
						<td><span class="pink">여성</span></td>
						<td>010-9336-9804</td>
						<td>트레이너</td>
						<td>트레이닝</td>
						<td>-</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="21697">
						<td><img src="/static/img/login/male.jpg"></td>
						<td>바른샘</td>
						<td><span class="skyblue">남성</span></td>
						<td>010-9242-9589</td>
						<td>트레이너</td>
						<td>-</td>
						<td>-</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="19677">
						<td><img src="/static/img/login/male.jpg"></td>
						<td>박동훈</td>
						<td><span class="skyblue">남성</span></td>
						<td>010-2222-9999</td>
						<td>트레이너</td>
						<td>-</td>
						<td>-<br><span class="small">(퇴사)</span></td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="20962">
						<td><img src="/static/img/login/male.jpg"></td>
						<td>블리스포인트 프로</td>
						<td><span class="skyblue">남성</span></td>
						<td>123-2131-1231</td>
						<td>트레이너</td>
						<td>-</td>
						<td>-</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="19624">
						<td><img src="https://d27pagl1acwik5.cloudfront.net/upload/coach/774/2021/08/23/20210823113704"></td>
						<td>소피아</td>
						<td><span class="pink">여성</span></td>
						<td>010-3023-6277</td>
						<td>트레이너</td>
						<td>트레이닝</td>
						<td>-</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="21610">
						<td><img src="/static/img/login/male.jpg"></td>
						<td>알파 강사</td>
						<td><span class="skyblue">남성</span></td>
						<td>010-5098-0543</td>
						<td>트레이너</td>
						<td>-</td>
						<td>-</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="21160">
						<td><img src="https://d27pagl1acwik5.cloudfront.net/upload/coach/774/2021/10/09/20211009144819"></td>
						<td>윤지영</td>
						<td><span class="pink">여성</span></td>
						<td>010-9538-3358</td>
						<td>트레이너</td>
						<td>트레이닝</td>
						<td>2021-10-09</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="21364">
						<td><img src="/static/img/login/male.jpg"></td>
						<td>이행행</td>
						<td><span class="skyblue">남성</span></td>
						<td>1111-1111-1111</td>
						<td>트레이너</td>
						<td>-</td>
						<td>2021-10-20</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="20031">
						<td><img src="/static/img/login/female.jpg"></td>
						<td>전라원</td>
						<td><span class="pink">여성</span></td>
						<td>010-9755-0403</td>
						<td>트레이너</td>
						<td>트레이닝</td>
						<td>2021-09-01</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="20749">
						<td><img src="/static/img/login/male.jpg"></td>
						<td>찐우</td>
						<td><span class="skyblue">남성</span></td>
						<td>010-5536-4445</td>
						<td>트레이너</td>
						<td>트레이닝</td>
						<td>2021-09-01</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="21409">
						<td><img src="/static/img/login/female.jpg"></td>
						<td>청담 강사 (테스트)</td>
						<td><span class="pink">여성</span></td>
						<td>010-3153-1381</td>
						<td>트레이너</td>
						<td>-</td>
						<td>-</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="20590">
						<td><img src="/static/img/login/female.jpg"></td>
						<td>테니스 강사 (테스트)</td>
						<td><span class="pink">여성</span></td>
						<td>010-2496-5754</td>
						<td>트레이너</td>
						<td>-</td>
						<td>-</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="21457">
						<td><img src="/static/img/login/female.jpg"></td>
						<td>티나 강사 (테스트)</td>
						<td><span class="pink">여성</span></td>
						<td>010-6354-9281</td>
						<td>트레이너</td>
						<td>-</td>
						<td>-</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="18429">
						<td><img src="https://d27pagl1acwik5.cloudfront.net/upload/coach/774/2021/06/26/20210626190059"></td>
						<td>필라테스 전문가</td>
						<td><span class="pink">여성</span></td>
						<td>090-5195-2673</td>
						<td>트레이너</td>
						<td>-</td>
						<td>-</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="21696">
						<td><img src="/static/img/login/female.jpg"></td>
						<td>하나골프 강사</td>
						<td><span class="pink">여성</span></td>
						<td>010-3006-0111</td>
						<td>트레이너</td>
						<td>-</td>
						<td>-</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="19610">
						<td><img src="/static/img/login/male.jpg"></td>
						<td>점장리동무</td>
						<td><span class="skyblue">남성</span></td>
						<td>090-8566-1776</td>
						<td>점장이동무</td>
						<td>-</td>
						<td>-</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="9817">
						<td><img src="https://d27pagl1acwik5.cloudfront.net/upload/coach/774/2020/09/03/20200903151622"></td>
						<td>김반석</td>
						<td><span class="skyblue">남성</span></td>
						<td>010-8299-1948</td>
						<td>견습</td>
						<td>샵</td>
						<td>2021-01-01</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="14510">
						<td><img src="https://d27pagl1acwik5.cloudfront.net/upload/coach/774/2021/03/09/20210309115254"></td>
						<td>요가 강사 (테스트)</td>
						<td><span class="pink">여성</span></td>
						<td>010-3678-2171</td>
						<td>견습</td>
						<td>리셉션</td>
						<td>2021-01-01</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="17045">
						<td><img src="/static/img/login/female.jpg"></td>
						<td>이민주(테스트)</td>
						<td><span class="pink">여성</span></td>
						<td>090-6633-3429</td>
						<td>견습</td>
						<td>트레이닝</td>
						<td>2021-04-01</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="13508">
						<td><img src="https://d27pagl1acwik5.cloudfront.net/upload/coach/774/2021/04/06/20210406095929"></td>
						<td>장유진 강사 (테스트)</td>
						<td><span class="pink">여성</span></td>
						<td>010-7747-4058</td>
						<td>견습</td>
						<td>트레이닝</td>
						<td>2021-01-01</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="17422">
						<td><img src="/static/img/login/male.jpg"></td>
						<td>조시영</td>
						<td><span class="skyblue">남성</span></td>
						<td>010-9927-4477</td>
						<td>미용사</td>
						<td>-</td>
						<td>-</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="21413">
						<td><img src="https://d27pagl1acwik5.cloudfront.net/upload/coach/774/2021/10/20/20211020173219"></td>
						<td>고종익</td>
						<td><span class="skyblue">남성</span></td>
						<td>010-3129-0000</td>
						<td>팀장</td>
						<td>트레이닝</td>
						<td>-</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="17471">
						<td><img src="https://d27pagl1acwik5.cloudfront.net/upload/coach/774/2021/08/09/20210809103502"></td>
						<td>이민주</td>
						<td><span class="pink">여성</span></td>
						<td>010-6633-3429</td>
						<td>팀장</td>
						<td>-</td>
						<td>-</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="18935">
						<td><img src="https://d27pagl1acwik5.cloudfront.net/upload/coach/774/2021/08/23/20210823112552"></td>
						<td>전상훈 </td>
						<td><span class="skyblue">남성</span></td>
						<td>010-8730-7678</td>
						<td>팀장</td>
						<td>-</td>
						<td>-</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="19704">
						<td><img src="/static/img/login/male.jpg"></td>
						<td>정찬복</td>
						<td><span class="skyblue">남성</span></td>
						<td>010-4529-4526</td>
						<td>팀장</td>
						<td>-</td>
						<td>-</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="18685">
						<td><img src="/static/img/login/male.jpg"></td>
						<td>홍상혁</td>
						<td><span class="skyblue">남성</span></td>
						<td>010-5090-2325</td>
						<td>팀장</td>
						<td>-</td>
						<td>2021-07-01</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="20587">
						<td><img src="/static/img/login/male.jpg"></td>
						<td>황의천(부스터)</td>
						<td><span class="skyblue">남성</span></td>
						<td>010-2898-9976</td>
						<td>팀장</td>
						<td>트레이닝</td>
						<td>-</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="9816">
						<td><img src="https://d27pagl1acwik5.cloudfront.net/upload/coach/774/2020/09/03/20200903151605"></td>
						<td>홍준선</td>
						<td><span class="skyblue">남성</span></td>
						<td>010-6711-8282</td>
						<td>샵매니저</td>
						<td>샵</td>
						<td>2021-01-01</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="21611">
						<td><img src="/static/img/login/female.jpg"></td>
						<td>DG 강사 </td>
						<td><span class="pink">여성</span></td>
						<td>010-2871-4440</td>
						<td>대표님</td>
						<td>-</td>
						<td>-</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="21768">
						<td><img src="https://d27pagl1acwik5.cloudfront.net/upload/coach/774/2021/11/01/20211101185012"></td>
						<td>노동기 Instructor</td>
						<td><span class="skyblue">남성</span></td>
						<td>010-9111-8385</td>
						<td>대표님</td>
						<td>-</td>
						<td>-</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="21047">
						<td><img src="/static/img/login/female.jpg"></td>
						<td>정두리</td>
						<td><span class="pink">여성</span></td>
						<td>010-4370-7878</td>
						<td>대표님</td>
						<td>-</td>
						<td>-</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="21754">
						<td><img src="/static/img/login/male.jpg"></td>
						<td>이창엽</td>
						<td><span class="skyblue">남성</span></td>
						<td>010-8382-1399</td>
						<td>트래이너</td>
						<td>-</td>
						<td>-</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				
					<tr data-sequence="21783">
						<td><img src="/static/img/login/male.jpg"></td>
						<td>원장</td>
						<td><span class="skyblue">남성</span></td>
						<td>010-9750-4225</td>
						<td>유치원 트레이너</td>
						<td>트레이닝</td>
						<td>2021-11-01</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove">삭제</button>
						</td>
					</tr>
				</tbody>
				</table>
			</div>
		</div>
	</main>
</div>

<script type="text/javascript">
function doReady() {
	doPage.open();
}

const doPage = {
	container : undefined,
	data : {},
	open : function() {
		Promise.all([
			commonController.positionList(),
			commonController.teamList(),
			coachController.coachList()
//			commonController.coachList()
		]).then(([positionList, teamList, coachList]) => {
			this.data = {
				positionList : positionList || [],
				teamList : teamList || [],
				coachList : (coachList || []).map(item => {
					const seqPosition = item.seqPosition;
					const seqTeam = item.seqTeam = (item.teams && item.teams[0] && item.teams[0].seqTeam) ? item.teams[0].seqTeam : "";
					item.positionInfo = positionList.filter(item => {
						return (item.seqPosition == seqPosition);
					})[0];
					item.teamInfo = teamList.filter(item => {
						return (item.seqTeam == seqTeam);
					})[0];
					return item;
				}).sort(function(a, b) {
					let typeCodeA = Number(a.employeeTypeCode);
					let typeCodeB = Number(b.employeeTypeCode);
					if(typeCodeA < 0) typeCodeA = 1;
					if(typeCodeB < 0) typeCodeB = 1;
					const positionA = (a.positionInfo) ? a.positionInfo.order : 99;
					const positionB = (b.positionInfo) ? b.positionInfo.order : 99;
					const sequence = (positionA < positionB) ? -1 : (positionA > positionB) ? 1 : 0;
					return (typeCodeA == typeCodeB) ? sequence : (typeCodeA < typeCodeB) ? -1 : (typeCodeA > typeCodeB) ? 1 : 0;
				}),
				search : {
					keyword : "",
					seqPosition : 0,
					seqTeam : 0
				}
			};
			this.render();
		}).catch(error => {
			alert("데이터를 가져오는데 실패하였습니다.");
		});
	},
	render : function() {
		this.container = document.querySelector("main");
		const self = this;
		const setTop = () => {
			const div = this.container.querySelector("[data-id='top']");
			const input = div.querySelector("[name='keyword']");
			uiEvent(div, {
				click : {
					reset : function() {
						const input = this.parentNode.querySelector("input");
						input.value = "";
						input.parentNode.classList.remove("focus");
						self.data.search.keyword = "";
						self.coachList.update();
					},
					create : function() {
						window.location.href = "/coach/create";
					}
				},
				input : {
					keyword : function() {
						const value = this.value.trim();
						if(value)
							input.parentNode.classList.add("focus");
						else
							input.parentNode.classList.remove("focus");
						self.data.search.keyword = (value.length < 2) ? "" : value;
						self.coachList.update();
					}
				},
				change : {
					tab : function() {
						const tab = div.getValue("tab");
						self.groupList.update(tab);
					}
				}
			});
		};
		const setMiddle = () => {
			this.groupList.open(this, "position");
			this.coachList.open(this);
		};
		setTop();
		setMiddle();
	},
	groupList : {
		container : undefined,
		mode : "position",
		data : {},
		open : function(context, mode) {
			this.mode = mode;
			this.data = context.data;
			this.dragInfo = {
				target : undefined,
				tagName : undefined,
				offset : 0
			};
			this.render();
		},
		update : function(mode, isRefresh) {
			this.mode = mode;
			this.container.classList.remove("update");
			if(isRefresh) {
				Promise.all([
					commonController.positionList(),
					commonController.teamList(),
				]).then(([positionList, teamList]) => {
					this.data.positionList = positionList || [];
					this.data.teamList = teamList || [];
					this.data.coachList.forEach(item => {
						const seqPosition = item.seqPosition;
						const seqTeam = item.seqTeam;
						item.positionInfo = positionList.filter(item => {
							return (item.seqPosition == seqPosition);
						})[0];
						item.teamInfo = teamList.filter(item => {
							return (item.seqTeam == seqTeam);
						})[0];
					});
					this.render();
					doPage.coachList.update();
				});
			} else {
				this.data.search.seqPosition = this.data.search.seqTeam = 0;
				this.render();
				doPage.coachList.update();
			}
		},
		render : function() {
			this.container = document.querySelector("[data-id='groupList']");
			this.container.innerHTML = this.template();
			const self = this.event.self = this;
			uiEvent(this.container, {
				click : {
					update : function() {self.event.update(this)},
					focus : function() {self.event.focus(this)},
					create : function() {self.event.create(this)},
					order : function() {self.event.updateOrder()}
				},
				dragstart : {
					drag : function() {self.event.drag(event)}
				},
				dragover : {
					drag : function() {self.event.drag(event)}
				},
				dragend : {
					drag : function() {self.event.drag(event)}
				}
			});
		},
		event : {
			drag : function(event) {
				switch(event.type) {
					case "dragstart" :
						this.self.dragInfo = {
							target : event.target,
							tagName : event.target.tagName,
							offset : event.pageY
						};
					break;
					case "dragover" :
						const dragInfo = this.self.dragInfo;
						let currentTarget = event.target;
						if(currentTarget.tagName == "A" || currentTarget.tagName == "BUTTON");
							currentTarget = currentTarget.parentNode;
						const sequence = Number(currentTarget.getAttribute("data-sequence"));
						if(dragInfo.target && dragInfo.target != currentTarget && dragInfo.tagName == currentTarget.tagName && sequence) {
							if(event.offsetY > 0 && dragInfo.offset < event.pageY) {
								currentTarget.parentNode.insertBefore(dragInfo.target, currentTarget.nextElementSibling);
							} else {
								currentTarget.parentNode.insertBefore(dragInfo.target, currentTarget);
							}
						}
					break;
					case "dragend" :
						this.self.dragInfo = {
							target : undefined,
							tagName : undefined,
							offset : 0
						};
						this.checkOrder();
					break;
				}
			},
			checkOrder : function() {
				const mode = this.self.mode;
				const changeList = [];
				this.self.container.querySelectorAll("li").forEach(item => {
					changeList.push(Number(item.getAttribute("data-sequence")));
				});
				const dataList = (mode == "position") ? this.self.data.positionList : this.self.data.teamList;
				let isUpdate = false;
				dataList.forEach((item, index) => {
					const sequence = (mode == "position") ? item.seqPosition : item.seqTeam;
					if(!isUpdate && changeList[index] != sequence)
						isUpdate = true;
				});
				if(isUpdate) {
					this.self.container.classList.add("update");
				} else {
					this.self.container.classList.remove("update");
				}
			},
			updateOrder : function() {
				const mode = this.self.mode;
				const dataList = (mode == "position") ? this.self.data.positionList : this.self.data.teamList;
				const orderList = [];
				Array.from(this.self.container.querySelectorAll("li")).filter(item => {
					return (Number(item.getAttribute("data-sequence")));
				}).forEach((item, index) => {
					const sequence = Number(item.getAttribute("data-sequence"));
					const data = dataList.filter(item => {
						return (((mode == "position") ? item.seqPosition : item.seqTeam) == sequence);
					})[0];
					data.order = index;
					orderList.push(data);
				});
				coachController[mode].order(dataList).then(data => {
					alert("변경되었습니다.");
					doPage.groupList.update(mode, true);
				}).catch(error => {
					console.log(error);
					alert("변경 중 오류가 발생하였습니다.");
				});
			},
			create : function(object) {
				const type = object.getAttribute("data-type");
				this.self.popup.open(this.self, type);
			},
			update : function(object) {
				const type = object.parentNode.getAttribute("data-type");
				const sequence = Number(object.parentNode.getAttribute("data-sequence"));
				this.self.popup.open(this.self, type, sequence);
			},
			focus : function(object) {
				const sequence = Number(object.parentNode.getAttribute("data-sequence"));
				const container = this.self.container;
				const a = container.querySelectorAll("a");
				a.forEach(item => {
					if(item != object)
						item.className = "";
				});
				const isFocus = (sequence) ? (object.classList.toggle("focus")) : false;
				const type = object.parentNode.getAttribute("data-type");
				const search = this.self.data.search;
				search.seqPosition = search.seqTeam = 0;
				if(type == "position") search.seqPosition = (isFocus) ? sequence : 0;
				else if(type == "team") search.seqTeam = (isFocus) ? sequence : 0;
				doPage.coachList.update();
			}
		},
		template : function() {
			const mode = this.mode;
			const dataList = (mode == "team") ? this.data.teamList : this.data.positionList;
			const seqSearch = (mode == "team") ? this.data.search.seqTeam : this.data.search.seqPosition;
			const li = dataList.map(item => {
				const sequence = (mode == "team") ? item.seqTeam : item.seqPosition;
				const isFocus = (seqSearch == sequence) ? "focus" : "";
				return `
					<li data-type="${this.mode}" data-sequence="${sequence}" draggable="true">
						<a class="${isFocus}" data-event="focus">
							${item.title}
						</a>
						<button class="ui-button small white" data-event="update">수정</button>
					</li>
				`;
			});
			const typeName = (mode == "team") ? "팀" : "직급";
			return `
				<div class="top">
					${typeName} 목록
				</div>
				<div class="middle">
					<ul data-event="drag">
						<li data-type="${this.mode}" data-sequence="0">
							<a class="" data-event="focus">
								전체
							</a>
						</li>
						${li.join("")}
					</ul>
					<button class="ui-button green" data-event="order">순서 변경 적용</button>
				</div>
				<div class="bottom">
					<button data-type="${mode}" data-event="create">
						<span></span>
						새로운 ${typeName} 등록
					</button>
				</div>
			`;
		},
		popup : {
			popup : undefined,
			mode : "create",
			data : {},
			open : function(context, type, sequence) {
				if(this.popup) return;
				this.mode = (sequence) ? "update" : "create";
				this.type = type;
				this.sequence = sequence;
				const dataList = (type == "position") ? context.data.positionList : context.data.teamList;
				const dataInfo = (sequence) ? dataList.filter(item => {
					return (type == "position") ? (item.seqPosition == sequence) : (item.seqTeam == sequence);
				})[0] : {};
				this.data = {
					coachList : context.data.coachList || [],
					dataList : dataList,
					dataInfo : dataInfo,
					search : context.data.search
				};
				this.render();
			},
			close : function(isUpdate) {
				this.popup = undefined;
				uiPopup();
				if(isUpdate)
					doPage.groupList.update(this.type, true);
			},
			render : function() {
				const self = this.event.self = this;
				this.popup = uiPopup({
					template : this.template(),
					event : {
						click : {
							close : function() {self.close()},
							create : function() {self.event.update()},
							update : function() {self.event.update()},
							remove : function() {self.event.remove()}
						}
					}
				});
				if(this.mode == "update") {
					this.popup.putValue("name", this.data.dataInfo.title);
					this.popup.putValue("order", this.data.dataInfo.order + 1);
				}
			},
			event : {
				update : function() {
					const type = this.self.type;
					const mode = this.self.mode;
					const dataInfo = this.self.data.dataInfo;
					const dataList = this.self.data.dataList;
					const data = {
						title : this.self.popup.getValue("name").trim(),
						order : (mode == "create") ? dataList.length : this.self.popup.getValue("order", true) - 1
					};
					if(type == "position") data.seqPosition =  (mode == "create") ? 0 : dataInfo.seqPosition;
					if(type == "team") data.seqTeam =  (mode == "create") ? 0 : dataInfo.seqTeam;
					if(!data.title) {
						alert("이름을 입력해 주세요.");
						const input = this.self.popup.querySelector("[name='name']");
						if(input) input.focus();
						return;
					}
					if(mode == "create") {
						dataList.push(data);
					} else {
						dataList.forEach(item => {
							if(type == "position") {
								if(item.seqPosition == this.self.sequence)
									Object.assign(item, data);
							} else {
								if(item.seqTeam == this.self.sequence)
									Object.assign(item, data);
							}
						});
						dataList.sort((a, b) => {
							return (a.order == b.order) ? -1 : (a.order < b.order) ? -1 : 1;
						}).map((item, index) => {
							return item.order = index;
						});
					}
					coachController[type][mode](data).then(data => {
						coachController[type].order(dataList).then(data => {
							alert(((mode == "create") ? "등록" : "수정") + "되었습니다.");
							this.self.close(true);
						});
					}).catch(error => {
						console.log(error);
						alert("처리 중 오류가 발생하였습니다.");
					});
				},
				remove : function() {
					const type = this.self.type;
					const dataInfo = this.self.data.dataInfo;
					const sequence = (type == "position") ? dataInfo.seqPosition : dataInfo.seqTeam;

					const hasCoach = this.self.data.coachList.some(item => {
						return (type == "position") ? (item.seqPosition == sequence) : (item.seqTeam == sequence);
					});
					if(type == "position" && hasCoach) {
						alert("해당 직급으로 설정된 임직원이 있습니다. 변경 후 다시 삭제해 주세요.");
						return;
					}

					if(!confirm("정말로 삭제하시겠습니까?")) return;
					const dataList = this.self.data.dataList.filter(item => {
						return (type == "position") ? (item.seqPosition != sequence) : (item.seqTeam != sequence);
					}).map((item, index) => {
						item.order = index;
						return item;
					});

					this.self.data.search.seqPosition = this.self.data.search.seqTeam = 0;
					coachController[type].remove(sequence).then(data => {
						coachController[type].order(dataList).then(data => {
							alert("삭제되었습니다.");
							this.self.close(true);
						});
					}).catch(error => {
						console.log(error);
						alert("처리 중 오류가 발생하였습니다.");
					});
				}
			},
			template : function() {
				const typeName = (this.type == "team") ? "팀" : "직급";
				const modeName = (this.mode == "update") ? "수정" : "등록";
				const getOrder = () => {
					if(this.mode == "create") return "";
					const option = this.data.dataList.map((item, index) => {
						return `<option value="${index + 1}">${index + 1}</option>`;
					});
					return `
						<tr>
							<th>정렬 순서</th>
							<td>
								<select class="ui-select" name="order" style="text-align-last:center">
									<option value="">정렬순서 선택</option>
									${option.join("")}
								</select>
							</td>
						</tr>
					`;
				};
				const getButton = () => {
					return (this.mode == "update") ? `
						<button class="ui-button red" data-event="remove">삭제</button>
						<button class="ui-button green" data-event="update">수정</button>
					` : `
						<button class="ui-button" data-event="create">등록</button>
					`;
				};
				return `
					<div class="tiny">
						<div class="top">
							<h2>
								${typeName} ${modeName}
								<a data-event="close"></a>
							</h2>
						</div>
						<div class="middle ui-form">
							<table>
								<tr>
									<th>${typeName} 명칭</th>
									<td><input class="wide" name="name" maxlength="16" autocomplete="off" placeholder="${typeName} 명칭 입력"></td>
								</tr>
								${getOrder()}
							</table>
						</div>
						<div class="bottom">
							<button class="ui-button gray" data-event="close">취소</button>
							${getButton()}
						</div>
					</div>
				`;
			}
		}
	},
	coachList : {
		container : undefined,
		data : {},
		open : function(context) {
			this.data = context.data;
			this.render();
		},
		update : function() {
			this.render();
		},
		render : function(isUpdate) {
			this.container = document.querySelector("[data-id='coachList']");
			const tbody = this.container.querySelector("tbody");
			tbody.innerHTML = this.template();
			const self = this.event.self = this;
			uiEvent(tbody, {
				click : {
					remove : function() {self.event.remove(this);},
					update : function() {self.event.update(this);},
					overview : function() {self.event.overview(this);}
				}
			});
		},
		event : {
			remove : function(object) {
				const seqPartnerCoach = Number(object.parentNode.parentNode.getAttribute("data-sequence"));
				if(!confirm("임직원을 삭제하면 해당 임직원의 스케줄, 급여정산 내역 등이 모두 삭제 됩니다. 추후 퇴사 기능 업데이트 후 퇴사처리할 수 있습니다. 그래도 삭제 하시겠습니까?")) return;
				coachController.remove(seqPartnerCoach).then(data => {
					if(data.result != "SUCCESS" || data.resultCode == "1302") {
						const appointmentList = (data.data) ? data.data.onGoingAppointmentList : [];
						const classList = (data.data) ? data.data.onGoingClassScheduleList : [];
						if(appointmentList) {
							alert("진행 중인 개인레슨 스케줄이 있습니다.");
						} else if(classList) {
							alert("진행 중인 그룹수업 스케줄이 있습니다.");
						} else {
							alert("처리 중 오류가 발생하였습니다.");
						}
					} else {
						alert("삭제되었습니다.");
						this.self.data.coachList = this.self.data.coachList.filter(item => {
							return (item.seqPartnerCoach == seqPartnerCoach) ? false : true;
						});
						this.self.update();
					}
				}).catch(error => {
					console.log(error);
					alert("처리 중 오류가 발생하였습니다.");
				});
			},
			update : function(object) {
				const seqPartnerCoach = Number(object.parentNode.parentNode.getAttribute("data-sequence"));
				window.location.href = "/coach/" + seqPartnerCoach + "/update";
			},
			overview : function(object) {
				const seqPartnerCoach = Number(object.parentNode.parentNode.getAttribute("data-sequence"));
				window.location.href = "/coach/" + seqPartnerCoach + "/overview";
			}
		},
		template : function() {
			const search = this.data.search;
			const tr = this.data.coachList.filter(item => {
				if(search.keyword) {
					const isCoachName = (item.coachName.indexOf(search.keyword) > -1);
					const isPosition = (item.positionInfo && item.positionInfo.title.indexOf(search.keyword) > -1);
					const isTeam = (item.teamInfo && item.teamInfo.title.indexOf(search.keyword) > -1);
					if(!isCoachName && !isPosition && !isTeam) return false;
				}
				if(search.seqPosition)
					return (item.seqPosition == search.seqPosition);
				if(search.seqTeam)
					return (item.seqTeam == search.seqTeam);
				return true;
			}).map(item => {
				const getKeyword = (value) => {
					if(!search.keyword) return value;
					return value.replaceAll(search.keyword, `<i class="red">${search.keyword}</i>`);
				};
				const getThumb = () => {
					const src = (item.imgUrl) ? item.imgUrl : ("/static/img/login/" + ((item.sex == "M") ? "male.jpg" : "female.jpg"));
					return `<img src="${src}"></img>`
				};
				const getName = () => {
					return getKeyword(item.coachName);
				};
				const getSex = () => {
					const name = (item.sex == "M") ? "남성" : "여성";
					const color = (item.sex == "M") ? "skyblue" : "pink";
					return `<span class=${color}>${name}</span>`;
				};
				const getPosition = () => {
					if(!item.positionInfo) return "-";
					const typeCode = item.employeeTypeCode;		// 대표자 "00", 기본관리자 "-1"
					title = getKeyword(item.positionInfo.title);
					if(typeCode == "00")
						title = `대표자<br><span class="small">(${title})</span>`;
					else if(typeCode == "-1")
						title = `기본 관리자<br><span class="small">(${title})</span>`;

					return title;
				};
				const getTeam = () => {
					if(!item.teamInfo) return "-";
					return getKeyword(item.teamInfo.title);
				};
				const getJoinDate = () => {
					return (item.joinDate || "-") + ((item.retirementYn == "Y") ? (item.retirementDate) ? `<br><span class="small">(퇴사 : ${item.retirementDate})</span>` : `<br><span class="small">(퇴사)</span>` : ``);
				};
				const disabled = (item.employeeTypeCode == "-1" || item.employeeTypeCode == "00") ? "disabled" : "";
				return `
					<tr data-sequence="${item.seqPartnerCoach}">
						<td>${getThumb()}</td>
						<td>${getName()}</td>
						<td>${getSex()}</td>
						<td>${item.mobileNo}</td>
						<td>${getPosition()}</td>
						<td>${getTeam()}</td>
						<td>${getJoinDate()}</td>
						<td>
							<button class="ui-button small white" data-event="overview">상세</button>
							<button class="ui-button small white" data-event="update">수정</button>
							<button class="ui-button small white" data-event="remove" ${disabled}>삭제</button>
						</td>
					</tr>
				`;
			});
			return (tr.length == 0) ? `<tr><td class="empty" colspan="10">등록된 임직원이 없습니다.</td></tr>` : tr.join("");
		},
	},
};
</script>

<style type="text/css">
    #twc-chat-plugin #chat-icon {box-sizing: border-box;position:fixed;bottom:25px;right:25px; z-index:32;display:none;-webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1); }
    #twc-chat-plugin #chat-icon p{margin:0;width:60px;height:60px;border-radius:50%;overflow:hidden;background: url(https://public-common-sdk.s3.ap-northeast-2.amazonaws.com/image/icon_chatbot_bg_v2.png) no-repeat top left;}
    #twc-chat-plugin #chat-icon p img { width:100%;-webkit-transition: 0.4s cubic-bezier(0.25, 0.8, 0.5, 1);transition: 0.4s cubic-bezier(0.25, 0.8, 0.5, 1);}
    #twc-chat-plugin #chat-icon.online::after {content: '';position:absolute;top:4px;right:1px;width:14px;height:14px;border-radius:50%;overflow:hidden;background-color:#52C41A;}
    #twc-chat-plugin #chat-icon.new::after {content: '';position:absolute;top:0;right:0;width:24px;height:24px;border-radius:50%;overflow:hidden;background: url('https://storage.googleapis.com/cloud-gate-cdn/image/img/img_webchat_new_icon.png') no-repeat top left;background-size: 100% auto;}
    #twc-chat-plugin #chat-frame-box { box-sizing: border-box; position:fixed;bottom:-150%;right:25px;z-index:42;border-radius: 10px;overflow:hidden;background-color:#fff;-webkit-transition: 0.4s cubic-bezier(0.25, 0.8, 0.5, 1);transition: 0.4s cubic-bezier(0.25, 0.8, 0.5, 1); box-shadow: 2px 2px 25px rgba(94, 94, 94, 0.5); }
    #twc-chat-plugin #chat-frame-box iframe{ width:410px;height:767px;border:0;vertical-align: top; }
    #twc-chat-plugin .loader, #twc-chat-plugin .loader:after {box-sizing: border-box;border-radius: 50%;width: 30px;height: 30px;}
    #twc-chat-plugin .loader {box-sizing: border-box;font-size: 10px;position:absolute; top:14px;left:14px;text-indent: -9999em;border-top: 4px solid rgba(255, 255, 255, 1);border-right: 4px solid rgba(255, 255, 255, 1);border-bottom: 4px solid rgba(255, 255, 255, 0);border-left: 4px solid #ffffff;-webkit-transform: translateZ(0);-ms-transform: translateZ(0);transform: translateZ(0);-webkit-animation: load8 1.1s infinite linear;animation: load8 1.1s infinite linear;display:none;}
    @-webkit-keyframes load8 { 0% {-webkit-transform: rotate(0deg);transform: rotate(0deg);} 100% {-webkit-transform: rotate(360deg);transform: rotate(360deg);}}
    @keyframes load8 { 0% {-webkit-transform: rotate(0deg);transform: rotate(0deg);} 100% {-webkit-transform: rotate(360deg);transform: rotate(360deg);}}
    #twc-chat-plugin.on img { -ms-transform: scale(0);-moz-transform: scale(0);-o-transform: scale(0);-webkit-transform: scale(0);transform: scale(0); }
    #twc-chat-plugin.on .loader {display:block;opacity:1;}
</style>

<?php
include_once(G5_THEME_PATH.'/tail.php');