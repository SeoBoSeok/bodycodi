<?php
include_once('../common.php');

define('_SUB_', true);
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가

include_once(G5_THEME_PATH.'/head.php');
?>

<script src="<?php echo G5_URL; ?>/resources/js/popup/coachPwdConfirmPopup.js"></script>
<script src="<?php echo G5_URL; ?>/resources/js/controller/loginController.js"></script>
<script src="<?php echo G5_URL; ?>/resources/js/controller/lockerController.js"></script>
<style type="text/css">
main											{margin:0 auto}
main .use										{background-color:#8ac97b !important}
main .expiring									{background-color:#e0dc9a !important}
main .expired									{background-color:#f1656a !important}
main .none										{background-color:#fff !important; border-color:#ccc !important}
main .none:before								{content:""; position:absolute; left:50%; top:-50%; margin-top:-1px; width:2px; height:200%; background-color:#f1656a; transform:rotate(45deg)}

main .top										{margin-bottom:35px; padding:25px; height:35px; background-color:#f0f0f0; line-height:35px}
main .top button								{min-width:125px}
main .top .left									{display:none; width:200px}
main .top .center div							{display:none}
main .top .center .daily						{text-align:left}
main.period .top .left							{display:table-cell}
main.daily .top .center .daily,
main.period .top .center .period				{display:block}

main .top .center ul							{display:inline-block; text-align:center}
main .top .center ul li							{display:inline-block}
main .top .center ul li + li					{margin-left:15px}
main .top .center ul li span					{position:relative; display:inline-block; vertical-align:middle; margin-top:-2px; margin-right:8px; width:16px; height:16px; border:1px solid rgba(0,0,0,0.05); overflow:hidden}
main .top .center ul li span.none				{border-color:#ccc}

main .top .right								{width:500px; text-align:right}
main .top .right *								{margin-left:8px; vertical-align:top; height:35px; line-height:33px}
main .top .right select							{background-color:white}

main .middle 									{margin-left:-5px; margin-right:-5px}
main .middle:after								{content:""; display:table; clear:both}
main .middle ul									{text-align:left; font-size:0}
main .middle ul li								{position:relative; float:left; margin:5px; width:120px; height:120px; background-color:white; border:1px solid #ccc; font-size:13px; box-sizing:border-box; overflow:hidden}
main .middle ul li:hover						{background-color:rgba(33,150,243,0.125); border-color:#004fec !important}
main .middle ul li.disable:hover				{background-color:white; border-color:#ccc !important}
main .middle ul li.none:hover					{background-color:rgba(255,87,34,0.1) !important; border-color:#ff5722 !important}
main .middle ul li a							{position:relative; display:block; height:100%; cursor:pointer; overflow:hidden}
main .middle ul li.disable a					{cursor:default}
main .middle ul li button						{position:absolute; right:0; top:0; width:24px; height:24px; background:transparent url(/static/img/icon/icon_pencil_gray.png) no-repeat center center / 12px; border:none; cursor:pointer}
main .middle ul li.use button					{background-image:url(/static/img/icon/icon_pencil_white.png); opacity:0.85}
main .middle ul li button.focus:before			{content:""; position:absolute; right:5px; bottom:5px; width:4px; height:4px; background-color:#ff5722}

main .middle .box								{display:table; width:100%; height:100%; table-layout:fixed}
main .middle .box > div							{display:table-cell; width:100%; height:100%; padding:10px; vertical-align:middle; text-align:center; font-size:13px}
main .middle .box span							{position:relative}
main .middle .box .info							{display:none}
main .middle .box .info h4						{white-space:nowrap; text-overflow:"ellipsis"; font-size:13px; font-weight:normal; overflow:hidden}
main .middle .box .info p						{text-align:center}

main .middle li.use .box span.number			{position:absolute; left:0; top:0; width:100%; height:24px; background-color:#222; line-height:25px; font-size:13px; font-family:"roboto"; color:white; opacity:0.9}
main .middle li.use .box span.number:after		{content:""; position:absolute; left:5px; top:50%; margin-top:-7px; width:14px; height:14px; background:url(/static/img/icon/icon_link_small_white.png) no-repeat center center / 14px; opacity:0}
main .middle li.use .box .info					{display:block; padding-top:18px}
main .middle li.use.link .box span.number:after	{opacity:0.75}

	</style>
<!-- 버전 2.0 -->
<nav class="ui-nav" data-index="센터관리">
	<div class="right">
		<a href="/sms/send">SMS/알림톡</a>
		<a href="/partner/naver">네이버 연동</a>
		<a href="/partner/keepfit">키핏 연동</a>
		<a href="/partner/operation">센터 설정</a>
		<a href="/manager/group">그룹 관리</a>
		<a href="/locker" class="focus">락커 관리</a>
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
<div class="quick">
			<a class="home" href="/home"></a>
			<a class="back" href="javascript:uiHistory.back()" data-event="uiHistoryBack"></a>
			<a class="refresh" href="javascript:window.location.reload(true)"></a>
		</div></nav>
<main class="period" style="width: 1760px;">
		<div class="top">
			<dl>
				<dd class="left">
					<button class="ui-button blue" type="button" data-event="batch" data-permission="permissionMember/locker">이용권 일괄 연동</button>
				</dd>
				<dd class="center">
					<div class="period">
						<ul>
							<li><span class="use"></span>사용 중</li>
							<li><span class="expiring"></span>사용기간 만료 5일 전</li>
							<li><span class="expired"></span>사용기간 만료</li>
							<li><span class="none"></span>사용 불가</li>
						</ul>
					</div>
					<div class="daily">
						<ul>
							<li><span class="use"></span>사용 중</li>
							<li><span class="expiring"></span>사용기간 5시간 경과</li>
							<li><span class="none"></span>사용 불가</li>
						</ul>
					</div>
				</dd>
				<dd class="right">
					<select class="ui-select" name="seqPartnerLocker" data-event="group">
				<option value="">락커를 선택해 주세요.</option>
				
					<optgroup label="기간">
						<option value="724">(기간) 기간제 락커</option><option value="1509">(기간) ㅁ</option><option value="1621">(기간) 여성 탈의실</option>
					</optgroup>
				
					<optgroup label="일일">
						<option value="1221">(일일) 일일락커</option><option value="1425">(일일) 일일 테스트 락커</option><option value="1872">(일일) 트와이스</option><option value="2067">(일일) 용인 스피드웨이</option>
					</optgroup>
				
			</select>
					<button class="ui-button red" type="button" data-event="setting" data-permission="permissionMember/locker">락커 관리</button>
					<button class="ui-button green icon excel" type="button" data-permission="permissionMember/excelDownload" data-event="excel">다운로드</button>
				</dd>
			</dl>
		</div>
		<div class="middle">
			<ul data-id="lockerList">
						<li class="use expired">
							<a data-sequence="114428" data-event="info">
								<div class="box">
									<div>
										<span class="number">1</span>
										<div class="info">
											<h4>박은정</h4>
											<p>
												2020-08-11<br>
												2021-02-10
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114428" data-event="memo"></button>
						</li>
					
						<li class="use expired">
							<a data-sequence="114429" data-event="info">
								<div class="box">
									<div>
										<span class="number">2</span>
										<div class="info">
											<h4>마크짐  </h4>
											<p>
												2020-09-14<br>
												2020-09-14
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114429" data-event="memo"></button>
						</li>
					
						<li class="use expired">
							<a data-sequence="114430" data-event="info">
								<div class="box">
									<div>
										<span class="number">3</span>
										<div class="info">
											<h4>코치짐  </h4>
											<p>
												2020-02-28<br>
												2020-08-28
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114430" data-event="memo"></button>
						</li>
					
						<li class="use link">
							<a data-sequence="114431" data-event="info">
								<div class="box">
									<div>
										<span class="number">4</span>
										<div class="info">
											<h4>문동규 (테스트)</h4>
											<p>
												2021-07-14<br>
												2022-01-31
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114431" data-event="memo"></button>
						</li>
					
						<li class="use expired link">
							<a data-sequence="114432" data-event="info">
								<div class="box">
									<div>
										<span class="number">5</span>
										<div class="info">
											<h4>윤지영</h4>
											<p>
												2021-07-13<br>
												2021-10-06
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114432" data-event="memo"></button>
						</li>
					
						<li class="use expired link">
							<a data-sequence="114433" data-event="info">
								<div class="box">
									<div>
										<span class="number">6</span>
										<div class="info">
											<h4>김반석</h4>
											<p>
												2021-04-30<br>
												2021-06-10
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="focus" data-sequence="114433" data-event="memo"></button>
						</li>
					
						<li class="use expired">
							<a data-sequence="114434" data-event="info">
								<div class="box">
									<div>
										<span class="number">7</span>
										<div class="info">
											<h4>김근희</h4>
											<p>
												2021-04-23<br>
												2021-06-11
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114434" data-event="memo"></button>
						</li>
					
						<li class="use expired">
							<a data-sequence="114435" data-event="info">
								<div class="box">
									<div>
										<span class="number">8</span>
										<div class="info">
											<h4>박은정</h4>
											<p>
												2020-09-10<br>
												2020-09-10
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114435" data-event="memo"></button>
						</li>
					
						<li class="use expired">
							<a data-sequence="114436" data-event="info">
								<div class="box">
									<div>
										<span class="number">9</span>
										<div class="info">
											<h4>김찬희</h4>
											<p>
												2021-08-16<br>
												2021-08-16
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114436" data-event="memo"></button>
						</li>
					
						<li class="use link">
							<a data-sequence="114437" data-event="info">
								<div class="box">
									<div>
										<span class="number">10</span>
										<div class="info">
											<h4>아아아</h4>
											<p>
												2021-10-13<br>
												2022-01-12
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="focus" data-sequence="114437" data-event="memo"></button>
						</li>
					
						<li class="use expired">
							<a data-sequence="114438" data-event="info">
								<div class="box">
									<div>
										<span class="number">11</span>
										<div class="info">
											<h4>휴먼 회원 (테스트)</h4>
											<p>
												2020-07-30<br>
												2020-10-31
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114438" data-event="memo"></button>
						</li>
					
						<li class="use expired">
							<a data-sequence="114439" data-event="info">
								<div class="box">
									<div>
										<span class="number">12</span>
										<div class="info">
											<h4>제이핏  </h4>
											<p>
												2020-08-18<br>
												2020-09-17
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114439" data-event="memo"></button>
						</li>
					
						<li class="use expired">
							<a data-sequence="114440" data-event="info">
								<div class="box">
									<div>
										<span class="number">13</span>
										<div class="info">
											<h4>하루  </h4>
											<p>
												2020-08-18<br>
												2020-11-17
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114440" data-event="memo"></button>
						</li>
					
						<li class="use expired">
							<a data-sequence="114441" data-event="info">
								<div class="box">
									<div>
										<span class="number">14</span>
										<div class="info">
											<h4>전석현</h4>
											<p>
												2020-05-15<br>
												2020-06-28
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114441" data-event="memo"></button>
						</li>
					
						<li class="use expired">
							<a data-sequence="114442" data-event="info">
								<div class="box">
									<div>
										<span class="number">15</span>
										<div class="info">
											<h4>김실장</h4>
											<p>
												2020-10-07<br>
												2021-02-03
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114442" data-event="memo"></button>
						</li>
					
						<li class="use expiring link">
							<a data-sequence="114443" data-event="info">
								<div class="box">
									<div>
										<span class="number">16</span>
										<div class="info">
											<h4>플랜비 회원 (테스트)</h4>
											<p>
												2021-06-10<br>
												2021-11-07
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114443" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114444" data-event="assign">
								<div class="box">
									<div>
										<span class="number">17</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114444" data-event="memo"></button>
						</li>
					
						<li class="none">
							<a data-sequence="114445" data-event="assign">
								<div class="box">
									<div>
										<span class="number">18</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114445" data-event="memo"></button>
						</li>
					
						<li class="use expired link">
							<a data-sequence="114446" data-event="info">
								<div class="box">
									<div>
										<span class="number">19</span>
										<div class="info">
											<h4>디에스 회원 (테스트)</h4>
											<p>
												2020-12-15<br>
												2021-08-30
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114446" data-event="memo"></button>
						</li>
					
						<li class="use expired link">
							<a data-sequence="114447" data-event="info">
								<div class="box">
									<div>
										<span class="number">20</span>
										<div class="info">
											<h4>김반석</h4>
											<p>
												2020-10-05<br>
												2021-01-01
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114447" data-event="memo"></button>
						</li>
					
						<li class="use">
							<a data-sequence="114448" data-event="info">
								<div class="box">
									<div>
										<span class="number">21</span>
										<div class="info">
											<h4>박 회원 </h4>
											<p>
												2021-03-31<br>
												2021-12-18
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114448" data-event="memo"></button>
						</li>
					
						<li class="use expired link">
							<a data-sequence="114449" data-event="info">
								<div class="box">
									<div>
										<span class="number">22</span>
										<div class="info">
											<h4>고형주</h4>
											<p>
												2020-12-02<br>
												2021-01-01
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114449" data-event="memo"></button>
						</li>
					
						<li class="use expired">
							<a data-sequence="114450" data-event="info">
								<div class="box">
									<div>
										<span class="number">23</span>
										<div class="info">
											<h4>김지혜</h4>
											<p>
												2020-12-15<br>
												2020-12-20
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114450" data-event="memo"></button>
						</li>
					
						<li class="use expired">
							<a data-sequence="114451" data-event="info">
								<div class="box">
									<div>
										<span class="number">24</span>
										<div class="info">
											<h4>원더 회원 (테스트)</h4>
											<p>
												2021-01-29<br>
												2021-04-28
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114451" data-event="memo"></button>
						</li>
					
						<li class="none">
							<a data-sequence="114452" data-event="assign">
								<div class="box">
									<div>
										<span class="number">25</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="focus" data-sequence="114452" data-event="memo"></button>
						</li>
					
						<li class="use expired">
							<a data-sequence="114453" data-event="info">
								<div class="box">
									<div>
										<span class="number">26</span>
										<div class="info">
											<h4>기무</h4>
											<p>
												2021-06-09<br>
												2021-06-09
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114453" data-event="memo"></button>
						</li>
					
						<li class="use expired">
							<a data-sequence="114454" data-event="info">
								<div class="box">
									<div>
										<span class="number">27</span>
										<div class="info">
											<h4>잠재고객-판매간</h4>
											<p>
												2020-12-14<br>
												2021-05-05
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114454" data-event="memo"></button>
						</li>
					
						<li class="use expired link">
							<a data-sequence="114455" data-event="info">
								<div class="box">
									<div>
										<span class="number">28</span>
										<div class="info">
											<h4>박효성</h4>
											<p>
												2021-03-02<br>
												2021-10-02
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114455" data-event="memo"></button>
						</li>
					
						<li class="use expired">
							<a data-sequence="114456" data-event="info">
								<div class="box">
									<div>
										<span class="number">29</span>
										<div class="info">
											<h4>박유진</h4>
											<p>
												2021-09-10<br>
												2021-09-24
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114456" data-event="memo"></button>
						</li>
					
						<li class="use expired">
							<a data-sequence="114457" data-event="info">
								<div class="box">
									<div>
										<span class="number">30</span>
										<div class="info">
											<h4>에이 회원 (테스트)</h4>
											<p>
												2021-03-18<br>
												2021-10-24
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114457" data-event="memo"></button>
						</li>
					
						<li class="use expired link">
							<a data-sequence="114458" data-event="info">
								<div class="box">
									<div>
										<span class="number">31</span>
										<div class="info">
											<h4>박효성1</h4>
											<p>
												2021-02-24<br>
												2021-05-23
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114458" data-event="memo"></button>
						</li>
					
						<li class="use expired link">
							<a data-sequence="114459" data-event="info">
								<div class="box">
									<div>
										<span class="number">32</span>
										<div class="info">
											<h4>문근영</h4>
											<p>
												2021-03-09<br>
												2021-10-08
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114459" data-event="memo"></button>
						</li>
					
						<li class="use expired link">
							<a data-sequence="114460" data-event="info">
								<div class="box">
									<div>
										<span class="number">33</span>
										<div class="info">
											<h4>잇스 (테스트)</h4>
											<p>
												2021-04-01<br>
												2021-07-01
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114460" data-event="memo"></button>
						</li>
					
						<li class="use expired link">
							<a data-sequence="114461" data-event="info">
								<div class="box">
									<div>
										<span class="number">34</span>
										<div class="info">
											<h4>Lydia</h4>
											<p>
												2021-04-05<br>
												2021-04-07
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114461" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114462" data-event="assign">
								<div class="box">
									<div>
										<span class="number">35</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114462" data-event="memo"></button>
						</li>
					
						<li class="use link">
							<a data-sequence="114463" data-event="info">
								<div class="box">
									<div>
										<span class="number">36</span>
										<div class="info">
											<h4>이석훈</h4>
											<p>
												2021-06-07<br>
												2022-01-04
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114463" data-event="memo"></button>
						</li>
					
						<li class="use expired link">
							<a data-sequence="114464" data-event="info">
								<div class="box">
									<div>
										<span class="number">37</span>
										<div class="info">
											<h4>조이 회원 (테스트)</h4>
											<p>
												2021-04-28<br>
												2021-08-10
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114464" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114465" data-event="assign">
								<div class="box">
									<div>
										<span class="number">38</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114465" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114466" data-event="assign">
								<div class="box">
									<div>
										<span class="number">39</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114466" data-event="memo"></button>
						</li>
					
						<li class="use link">
							<a data-sequence="114467" data-event="info">
								<div class="box">
									<div>
										<span class="number">40</span>
										<div class="info">
											<h4>김주우(테스트)</h4>
											<p>
												2021-06-09<br>
												2022-10-30
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114467" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114468" data-event="assign">
								<div class="box">
									<div>
										<span class="number">41</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114468" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114469" data-event="assign">
								<div class="box">
									<div>
										<span class="number">42</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114469" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114470" data-event="assign">
								<div class="box">
									<div>
										<span class="number">43</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114470" data-event="memo"></button>
						</li>
					
						<li class="use expired link">
							<a data-sequence="114471" data-event="info">
								<div class="box">
									<div>
										<span class="number">44</span>
										<div class="info">
											<h4>아무개</h4>
											<p>
												2021-04-29<br>
												2021-08-11
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114471" data-event="memo"></button>
						</li>
					
						<li class="use link">
							<a data-sequence="114472" data-event="info">
								<div class="box">
									<div>
										<span class="number">45</span>
										<div class="info">
											<h4>이강치</h4>
											<p>
												2021-06-28<br>
												2021-11-21
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="focus" data-sequence="114472" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114473" data-event="assign">
								<div class="box">
									<div>
										<span class="number">46</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114473" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114474" data-event="assign">
								<div class="box">
									<div>
										<span class="number">47</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114474" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114475" data-event="assign">
								<div class="box">
									<div>
										<span class="number">48</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114475" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114476" data-event="assign">
								<div class="box">
									<div>
										<span class="number">49</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114476" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114477" data-event="assign">
								<div class="box">
									<div>
										<span class="number">50</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114477" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114478" data-event="assign">
								<div class="box">
									<div>
										<span class="number">51</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114478" data-event="memo"></button>
						</li>
					
						<li class="use link">
							<a data-sequence="114479" data-event="info">
								<div class="box">
									<div>
										<span class="number">52</span>
										<div class="info">
											<h4>박찬영</h4>
											<p>
												2021-05-20<br>
												2022-06-18
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114479" data-event="memo"></button>
						</li>
					
						<li class="use link">
							<a data-sequence="114480" data-event="info">
								<div class="box">
									<div>
										<span class="number">53</span>
										<div class="info">
											<h4>주디</h4>
											<p>
												2021-06-16<br>
												2021-11-13
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114480" data-event="memo"></button>
						</li>
					
						<li class="use expired link">
							<a data-sequence="114481" data-event="info">
								<div class="box">
									<div>
										<span class="number">54</span>
										<div class="info">
											<h4>바디 회원 (테스트)</h4>
											<p>
												2021-05-03<br>
												2021-08-26
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114481" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114482" data-event="assign">
								<div class="box">
									<div>
										<span class="number">55</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114482" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114483" data-event="assign">
								<div class="box">
									<div>
										<span class="number">56</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114483" data-event="memo"></button>
						</li>
					
						<li class="use expired">
							<a data-sequence="114484" data-event="info">
								<div class="box">
									<div>
										<span class="number">57</span>
										<div class="info">
											<h4>이의주</h4>
											<p>
												2021-04-28<br>
												2021-06-22
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114484" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114485" data-event="assign">
								<div class="box">
									<div>
										<span class="number">58</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114485" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114486" data-event="assign">
								<div class="box">
									<div>
										<span class="number">59</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114486" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114487" data-event="assign">
								<div class="box">
									<div>
										<span class="number">60</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114487" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114488" data-event="assign">
								<div class="box">
									<div>
										<span class="number">61</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114488" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114489" data-event="assign">
								<div class="box">
									<div>
										<span class="number">62</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114489" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114490" data-event="assign">
								<div class="box">
									<div>
										<span class="number">63</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114490" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114491" data-event="assign">
								<div class="box">
									<div>
										<span class="number">64</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114491" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114492" data-event="assign">
								<div class="box">
									<div>
										<span class="number">65</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114492" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114493" data-event="assign">
								<div class="box">
									<div>
										<span class="number">66</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114493" data-event="memo"></button>
						</li>
					
						<li class="use expired">
							<a data-sequence="114494" data-event="info">
								<div class="box">
									<div>
										<span class="number">67</span>
										<div class="info">
											<h4>이은정 회원 테스트</h4>
											<p>
												2021-07-21<br>
												2021-07-21
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114494" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114495" data-event="assign">
								<div class="box">
									<div>
										<span class="number">68</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114495" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114496" data-event="assign">
								<div class="box">
									<div>
										<span class="number">69</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114496" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114497" data-event="assign">
								<div class="box">
									<div>
										<span class="number">70</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114497" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114498" data-event="assign">
								<div class="box">
									<div>
										<span class="number">71</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114498" data-event="memo"></button>
						</li>
					
						<li class="use link">
							<a data-sequence="114499" data-event="info">
								<div class="box">
									<div>
										<span class="number">72</span>
										<div class="info">
											<h4>이해은</h4>
											<p>
												2021-10-06<br>
												2022-04-05
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114499" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114500" data-event="assign">
								<div class="box">
									<div>
										<span class="number">73</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114500" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114501" data-event="assign">
								<div class="box">
									<div>
										<span class="number">74</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114501" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114502" data-event="assign">
								<div class="box">
									<div>
										<span class="number">75</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114502" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="114503" data-event="assign">
								<div class="box">
									<div>
										<span class="number">76</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="114503" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="421732" data-event="assign">
								<div class="box">
									<div>
										<span class="number">77</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="421732" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="448003" data-event="assign">
								<div class="box">
									<div>
										<span class="number">78</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="448003" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="448004" data-event="assign">
								<div class="box">
									<div>
										<span class="number">79</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="448004" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="448005" data-event="assign">
								<div class="box">
									<div>
										<span class="number">80</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="448005" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="448006" data-event="assign">
								<div class="box">
									<div>
										<span class="number">81</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="448006" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="448007" data-event="assign">
								<div class="box">
									<div>
										<span class="number">82</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="448007" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="448008" data-event="assign">
								<div class="box">
									<div>
										<span class="number">83</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="448008" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="448009" data-event="assign">
								<div class="box">
									<div>
										<span class="number">84</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="448009" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="448010" data-event="assign">
								<div class="box">
									<div>
										<span class="number">85</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="448010" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="448011" data-event="assign">
								<div class="box">
									<div>
										<span class="number">86</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="448011" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="448012" data-event="assign">
								<div class="box">
									<div>
										<span class="number">87</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="448012" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="448013" data-event="assign">
								<div class="box">
									<div>
										<span class="number">88</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="448013" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="448014" data-event="assign">
								<div class="box">
									<div>
										<span class="number">89</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="448014" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="448015" data-event="assign">
								<div class="box">
									<div>
										<span class="number">90</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="448015" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="448016" data-event="assign">
								<div class="box">
									<div>
										<span class="number">91</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="448016" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="448017" data-event="assign">
								<div class="box">
									<div>
										<span class="number">92</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="448017" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="448018" data-event="assign">
								<div class="box">
									<div>
										<span class="number">93</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="448018" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="448019" data-event="assign">
								<div class="box">
									<div>
										<span class="number">94</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="448019" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="448020" data-event="assign">
								<div class="box">
									<div>
										<span class="number">95</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="448020" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="448021" data-event="assign">
								<div class="box">
									<div>
										<span class="number">96</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="448021" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="448022" data-event="assign">
								<div class="box">
									<div>
										<span class="number">97</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="448022" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="448023" data-event="assign">
								<div class="box">
									<div>
										<span class="number">98</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="448023" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="448024" data-event="assign">
								<div class="box">
									<div>
										<span class="number">99</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="448024" data-event="memo"></button>
						</li>
					
						<li class="empty">
							<a data-sequence="448025" data-event="assign">
								<div class="box">
									<div>
										<span class="number">100</span>
										<div class="info">
											<h4>-</h4>
											<p>
												undefined<br>
												undefined
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="" data-sequence="448025" data-event="memo"></button>
						</li>
					</ul>
		</div>
	</main>

  <script type="text/javascript">
const seqPartnerLocker = Number("");

function doReady() {
	window.addEventListener("resize", doResize);
	doResize();
	componentLocker.open();
}

function doResize() {
	const main = document.querySelector("main");
	const width = document.documentElement.clientWidth || document.body.clientWidth;
	let mainWidth = (parseInt((width - 80) / 130) * 130) + 80 - 10;
	if(mainWidth > 1890) mainWidth += (1890 - mainWidth);
	main.style.width = mainWidth + "px";
}

const componentLocker = {
	data : {
		lockerType : "",
		seqPartnerLocker : 0,
		groupList : [],
		lockerList : []
	},
	permission : {},
	open : function() {
		permissionController.getList().then(data => {
			uiPermission.data = this.permission = data;
			this.update();
		}).catch(error => {
			console.log(error);
			alert("정보를 가져오는데 실패하였습니다.");
		});
	},
	update : function(seqPartnerLocker, callback) {
		const isUpdate = (seqPartnerLocker !== undefined) ? true : false;
		lockerController.list(seqPartnerLocker).then(data => {
			this.data.groupList = data.lockerGroup || [];
			this.data.lockerList = data.lockerList || [];
			this.data.seqPartnerLocker = Number(data.lockerOnSelect);
			/*
			this.data.groupList = this.data.lockerList = [];
			this.data.seqPartnerLocker = 0
			*/
			const groupInfo = this.data.groupList.filter(item => {
				return (item.seq_partner_locker == this.data.seqPartnerLocker);
			})[0];
			if(groupInfo) {
				this.data.lockerType = groupInfo.locker_type;
				this.data.seqPartnerLocker = groupInfo.seq_partner_locker;
			}
			this.render(isUpdate);
			if(callback) callback();
		});
	},
	render : function(isUpdate) {
		const main = document.querySelector("main");
		const self = this.event.self = this;
		const setGroupList = () => {
			const groupList = this.data.groupList.filter(item => {
				return (item.maked_locker_count > 0);
			});
			const select = main.querySelector("[name='seqPartnerLocker']");
			const optionGroupList = [{type : "P", name : "기간"}, {type : "D", name : "일일"}];
			const optionGroup = optionGroupList.map(item => {
				const name = item.name;
				const type = item.type;
				const optionList = groupList.filter(item => {
					return (item.locker_type == type);
				}).map(item => {
					return `<option value="${item.seq_partner_locker}">(${name}) ${item.locker_name}</option>`;
				});
				return `
					<optgroup label="${name}">
						${optionList.join("")}
					</optgroup>
				`;
			});
			select.innerHTML = `
				<option value="">락커를 선택해 주세요.</option>
				${(groupList.length) ? optionGroup.join("") : ""}
			`;

			if(this.data.seqPartnerLocker)
				select.value = this.data.seqPartnerLocker;
		};
		const setLockerList = () => {
			const isPermission = (this.permission.permissionMember.locker);
			const lockerList = this.data.lockerList;
			const lockerType = this.data.lockerType;
			main.className = (lockerType == "P") ? "period" : "daily";
			const ul = main.querySelector("[data-id='lockerList']");
			let li = "";
			const isDisable = (isPermission) ? "" : "disable";

			if(lockerType == "P") {
				li = lockerList.map(item => {
					const useState = this.event.getLockerState(item);
					const eventName = (useState == "" || useState == "none" || useState == "empty") ? "assign" : "info";
					const memberName = item.name || item.no_member_name || "-";
					const isLink = (item.seq_pass_info) ? "link" : "";
					const isMemo = (item.memo && item.memo.length > 0) ? "focus" : "";
					const className = [useState];
					if(isDisable) className.push(isDisable);
					if(isLink) className.push(isLink);
					return `
						<li class="${className.join(" ")}">
							<a data-sequence="${item.seq_partner_locker_list}" data-event="${eventName}">
								<div class="box">
									<div>
										<span class="number">${item.locker_no}</span>
										<div class="info">
											<h4>${memberName}</h4>
											<p>
												${item.start_dt}<br>
												${item.end_dt}
											</p>
										</div>
									</div>
								</div>
							</a>
							<button class="${isMemo}" data-sequence="${item.seq_partner_locker_list}" data-event="memo"></button>
						</li>
					`;
				});
			} else {
				li = lockerList.map(item => {
					const useState = this.event.getLockerState(item);
					const eventName = (useState == "" || useState == "none" || useState == "empty") ? "assign" : "info";
					const memberName = item.name || item.no_member_name || "-";
					const isMemo = (item.memo && item.memo.length > 0) ? "focus" : "";
					return `
						<li class="${useState}">
							<a data-sequence="${item.seq_partner_locker_list}" data-event="${eventName}">
								<div class="box">
									<div>
										<span class="number">${item.locker_no}</span>
										<div class="info">
											<h4>${memberName}</h4>
											<p>사용 중</p>
										</div>
									</div>
								</div>
							</a>
							<button class="${isMemo}" data-sequence="${item.seq_partner_locker_list}" data-event="memo"></button>
						</li>
					`;
				});
			}
			ul.innerHTML = li.join("");
			uiEvent(ul, {
				click : {
					assign : function() {self.popup.assign.open(self, this);},
					info : function() {self.popup.info.open(self, this);},
					memo : function() {self.popup.memo.open(self, this);}
				}
			});
		};
		setGroupList();
		setLockerList();
		if(!isUpdate) {
			uiEvent(main, {
				change : {
					group : function() {self.event.changeGroup(this)}
				},
				click : {
					setting : function() {self.popup.setting.open(self)},
					excel : function() {self.event.exportExcel(this)},
					batch : function() {self.popup.syncPass.open(self)}
				}
			});
			uiPermission(main);
		}
	},
	event : {
		exportExcel : function(object) {
			object.classList.add("disabled");
			object.disabled = true;
			const excelDownload = function(url, data) {
				return new Promise(function(resolve, reject) {
					url = (data) ? url + "?" + data : url;
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
			excelDownload("/exceldown?category=locker").then(data => {
				console.log(data);
				object.disabled = false;
				object.classList.remove("disabled");
			}).catch(error => {
				console.log(error);
				object.disabled = false;
				object.classList.remove("disabled");
				alert("다운로드에 실패하였습니다.");
			});
		},
		changeGroup : function(object) {
			this.self.update(Number(object.value));
		},
		getLockerState : function(item) {
			const lockerType = item.locker_type;
			if(lockerType == "D") {
				if(item.use_status == "N") return "none";
				return (item.pass_time == "N") ? "use" : (item.pass_time == "Y") ? "use expiring" : "";
			} else if(lockerType == "P") {
				switch(item.use_status) {
					case "Y" : return "use";
					case "S" : return "use expiring";
					case "E" : return "use expired";
					case "N" : return "none";
				}
			}
			return "empty";
		},
		updatePassList : function(popup, seqPassInfo) {
			const select = popup.querySelector("[name='seqPassInfo']");
			const passList = this.self.data.passList || [];
			const option = passList.map(item => {
				const selected = (item.seqPassInfo == seqPassInfo) ? "selected" : "";
				const passName = componentMember.getPassName(item);
				const getLockerInfo = () => {
					if(!(item.lockerList && item.lockerList.locker)) return "";
					const lockerNo = item.lockerList.lockerNo;
					const lockerName = item.lockerList.locker.lockerName;
					return ` 🡢 ${lockerNo}번(${lockerName})`;
				};
				return `<option value="${item.seqPassInfo}" ${selected}>${passName}${getLockerInfo()}</option>`;
			});
			if(seqPassInfo === undefined)
				select.disabled = false;
			select.innerHTML = `
				<option value="">연동 이용권을 선택해 주세요. (선택)</option>
				<option value="" selected>연동 이용권 미선택</option>
				${option.join("")}
			`;
		}
	},
	popup : {
		assign : {
			popup : undefined,
			open : function(context, object) {
				if(this.popup) return;
				const isPermission = context.permission.permissionMember.locker;
				if(!isPermission) {
					alert("해당 기능에 대한 권한이 설정되어 있지 않습니다. 사용자 변환을 하거나 사용자 권한을 설정해 주세요.");
					return;
				}
				const seqPartnerLockerList = Number(object.getAttribute("data-sequence"));
				this.data = context.data;
				this.data.lockerInfo = this.data.lockerList.filter(item => {
					return (item.seq_partner_locker_list == seqPartnerLockerList);
				})[0] || {};
				this.render();
			},
			close : function(seqPartnerLocker, useState) {
				if(!seqPartnerLocker || useState != "U") {
					this.popup = undefined;
					uiPopup();
				}
				if(seqPartnerLocker) {
					componentLocker.update(seqPartnerLocker);
				}
			},
			check : function(data) {
				let error = "";
				for(let name in data) {
					const value = data[name];
					const isEmpty = (!value);
					switch(name) {
						case "endDate" :
							if(isLessDate(data.startDate, data.endDate))
								error = "종료 날짜를 시작 날짜 보다 크게 설정해 주세요.";
							break;
						case "noMemName" :
							if(isEmpty) error = "사용자 이름을 입력해 주세요.";
							break;
						case "noMemMobile" :
							if(isEmpty) error = "사용자 휴대폰 번호를 입력해 주세요.";
							break;
						case "seqMember" :
							if(isEmpty) error = "락커 배정 회원을 선택해 주세요.";
							break;
					}
					if(error) {
						alert(error);
						const input = this.popup.querySelector("[name='" + name + "']");
						if(input) input.focus();
						return false;
					}
				}
				return true;
			},
			submit : function() {
				const lockerInfo = this.data.lockerInfo;
				const seqPartnerLocker = lockerInfo.seq_partner_locker;
				const seqPartnerLockerList = lockerInfo.seq_partner_locker_list;

				const seqPassInfo = this.popup.getValue("seqPassInfo", true);
				const memberType = this.popup.getValue("memberType");
				const startDate = this.popup.getValue("startDate");
				const endDate = this.popup.getValue("endDate");
				const seqMember = this.popup.getValue("searchMemberId", true);
				const noMemName = this.popup.getValue("noMemName");
				const noMemMobile = this.popup.getValue("noMemMobile");
				const data = {
					memberType : memberType,
					seqPartnerLockerList : seqPartnerLockerList,
					startDate : startDate,
					endDate : endDate
				};
				if(memberType == "M") {
					data.seqMember = seqMember;
					if(seqPassInfo)
						data.seqPassInfo = seqPassInfo;
				} else {
					data.noMemName = noMemName;
					data.noMemMobile = noMemMobile;
				}
				if(!this.check(data)) return;

				lockerController.assign.update(data).then(data => {
					alert("배정되었습니다.");
					this.close(seqPartnerLocker);
				}).catch(error => {
					if(error.status == 409) {
						const response = error.responseJSON.data || {};
						const seqPartnerLockerList = response.seqPartnerLockerList;
						if(!seqPartnerLockerList) {
							alert("락커 배정 중 오류가 발생하였습니다.");
							return;
						}
						if(!confirm("연결된 락커 정보가 있습니다.\n이전 연결을 해제하고 다시 배정하시겠습니까?")) return;
						data.seqPartnerLockerListToDeallocate = seqPartnerLockerList;
						lockerController.assign.exchange(data).then(data => {
							alert("재배정되었습니다.");
							this.close(seqPartnerLocker);
						}).catch(error => {
							alert("락커 배정 중 오류가 발생하였습니다.");
						});

					} else {
						alert("락커 배정 중 오류가 발생하였습니다.");
					}
				});
			},
			render : function() {
				const data = this.data.lockerInfo;
				const self = this.event.self = this;
				this.popup = uiPopup({
					template : this.template(),
					event : {
						click : {
							close : function() {self.close()},
							submit : function() {self.submit()}
						},
						change : {
							useState : function() {self.event.changeUseState()},
							memberType : function() {self.event.changeMemberType(this)},
							pass : function() {self.event.changePass()}
						}
					}
				});
				uiCalendar(this.popup);
				uiPermission(this.popup);
				popupSearchMember.init(this.popup, (seqMember) => {
					memberController.passLockerList(seqMember).then(data => {
						this.data.passList = (data.availableList || []).filter(item => {
							return (item.serviceType == "OPTION" && item.optionType == "LOCKER");
						});
						componentLocker.event.updatePassList(this.popup);
					});
				});
				this.popup.putValue("useState", data.use_status);
				this.event.changeUseState(true);
			},
			event : {
				changePass : function() {
					const popup = this.self.popup;
					const seqPassInfo = popup.getValue("seqPassInfo", true);
					const startDate = popup.querySelector("[name='startDate']");
					const endDate = popup.querySelector("[name='endDate']");
					// startDate.disabled = endDate.disabled = (seqPassInfo) ? true : false;
					if(seqPassInfo) {
						const passInfo = this.self.data.passList.filter(item => {
							return (item.seqPassInfo == seqPassInfo);
						})[0];
						startDate.value = passInfo.useStartDate;
						endDate.value = passInfo.useEndDate;
					}
				},
				changeMemberType : function(object) {
					const popup = this.self.popup;
					const memberType = popup.getValue("memberType");
					const td = object.parentNode.parentNode;
					td.className = (memberType == "N") ? "non-member" : "member";
				},
				changeUseState : function(isRender) {
					const popup = this.self.popup;
					const useState = popup.getValue("useState");
					if(!isRender && !confirm("락커 상태를 변경 하시겠습니까?")) {
						popup.putValue("useState", (useState == "U") ? "N" : "U");
						return;
					}
					const input = popup.querySelectorAll("input");
					input.forEach(item => {
						item.disabled = (useState == "N" && item.name != "useState") ? true : false;
					});
					if(isRender) return;

					const lockerInfo = this.self.data.lockerInfo;
					const seqPartnerLocker = lockerInfo.seq_partner_locker;
					const seqPartnerLockerList = lockerInfo.seq_partner_locker_list;

					lockerController.change.useState(seqPartnerLockerList, useState).then(data => {
						alert("변경되었습니다.");
						this.self.close(seqPartnerLocker, useState);
					}).catch(error => {
						console.log(error);
						alert("변경 중 오류가 발생하였습니다.");
					});

				},
			},
			template : function() {
				const data = this.data.lockerInfo;
				const lockerNo = data.locker_no;
				const lockerType = data.locker_type;
				const isHidden = (lockerType == "D") ? "hidden" : "";
				const memo = data.memo || "<span>입력된 내용이 없습니다.</span>";
				const getBranchInfo = () => {
					if(partnerInfo.partner.branchUseYn != "Y") return "";
					const seqPartnerBranch = partnerInfo.branch.id;
					return `<input name="seqPartnerBranch" type="hidden" value="${seqPartnerBranch}">`;
				};
				return `
					<style type="text/css">
						.popupLockerAssign										{overflow:visible !important}
						.popupLockerAssign .hidden								{display:none}
						.popupLockerAssign .type td > div						{display:none; margin-top:5px}
						.popupLockerAssign .type .member .member,
						.popupLockerAssign .type .non-member .non-member		{display:block}
						.popupLockerAssign .ui-input-search > div				{right:100px}
						.popupLockerAssign .ui-input-search input				{margin:0; padding-right:110px; width:320px !important; max-width:320px}
						.popupLockerAssign .ui-input-search button				{width:100px}
						.popupLockerAssign .type .member > ul > li + li			{margin-top:10px}
						.popupLockerAssign .type .member > ul > li select		{width:320px; max-width:320px}
						.popupLockerAssign .type .non-member input:first-child	{width:125px}
						.popupLockerAssign .type .non-member input:last-child	{margin:0; width:200px; max-width:200px}
						.popupLockerAssign .empty								{color:#aaa}
					</style>
					<div class="popupLockerAssign small">
						<div class="top">
							<h2>
								${lockerNo}번 락커 배정
								<a data-event="close"></a>
							</h2>
						</div>
						<div class="middle ui-form">
							<table>
								<tr>
									<th>락커 상태</th>
									<td>
										<label class="ui-input-radio">
											<input name="useState" type="radio" value="U" data-event="useState">
											<span></span>
											사용 가능
										</label>
										<label class="ui-input-radio">
											<input name="useState" type="radio" value="N" data-event="useState">
											<span></span>
											사용 불가
										</label>
									</td>
								</tr>
								<tr>
									<th>기간 설정</th>
									<td>
										<input type="calendar" name="startDate" value="today">부터
										<input type="calendar" name="endDate" value="today">까지
									</td>
								</tr>
								<tr class="type">
									<th>회원 구분</th>
									<td class="member">
										<label class="ui-input-radio">
											<input name="memberType" type="radio" value="M" data-event="memberType" checked>
											<span></span>
											등록 회원
										</label>
										<label class="ui-input-radio">
											<input name="memberType" type="radio" value="N" data-event="memberType">
											<span></span>
											미등록 회원
										</label>
										<div class="member">
											<ul>
												<li>
													<form autocomplete="off" onsubmit="return false">
														<label class="ui-input-search">
															<input name="searchMemberName" type="text" placeholder="이름 또는 휴대폰 번호" data-event="searchMember">
															<input name="searchMemberId" type="hidden">
															${getBranchInfo()}
															<button class="ui-button" type="button" data-event="searchMember">회원 검색</button>
															<div class="popupSearchMember"></div>
														</label>
													</form>
												</li>
												<li class="${isHidden}">
													<select class="ui-select" name="seqPassInfo" data-event="pass" disabled>
														<option value="">연동 이용권을 선택해 주세요. (선택)</option>
													</select>
													<p class="ui-note blue">
														이용권과 연동하시면, 이용권 기간에 비례하여 락커 기간이 설정되게 됩니다.
													</p>
												</li>
											</ul>
										</div>
										<div class="non-member">
											<input name="noMemName" maxLength="16" placeholder="이름" autocomplete="off">
											<input name="noMemMobile" maxLength="13" placeholder="휴대폰 번호" autocomplete="off">
										</div>
									</td>
								</tr>
								<tr>
									<th>락커 메모</th>
									<td>${memo}</td>
								</tr>
							</table>
						</div>
						<div class="bottom">
							<button class="ui-button gray" data-event="close">취소</button>
							<button class="ui-button" data-event="submit" data-permission="permissionMember/locker">저장</button>
						</div>
					</div>
				`;
			}
		},
		info : {
			popup : undefined,
			data : {},
			open : function(context, object) {
				if(this.popup) return;
				const seqPartnerLockerList = Number(object.getAttribute("data-sequence"));
				this.data = context.data;
				this.data.passList = [];
				this.data.passInfo = {};
				this.data.lockerInfo = this.data.lockerList.filter(item => {
					return (item.seq_partner_locker_list == seqPartnerLockerList);
				})[0] || {};
				const seqMember = this.data.lockerInfo.seq_member;
				if(seqMember) {
					const seqPassInfo = this.data.lockerInfo.seq_pass_info;
					memberController.passList(seqMember).then(data => {
						this.data.passList = (data.availableList || []).filter(item => {
							return (item.serviceType == "OPTION" && item.optionType == "LOCKER");
						}).concat(data.expirationList.filter(item => {
							return (item.seqPassInfo == seqPassInfo);
						}));
						this.data.passInfo = this.data.passList.filter(item => {
							return (item.seqPassInfo == seqPassInfo);
						})[0] || {};
						this.render();
					});
				} else {
					this.render();
				}
			},
			close : function(seqPartnerLocker) {
				this.popup = undefined;
				uiPopup();
				if(seqPartnerLocker) {
					componentLocker.update(seqPartnerLocker);
				}
			},
			render : function() {
				const self = this.event.self = this;
				this.popup = uiPopup({
					template : this.template(),
					event : {
						click : {
							close : function() {self.close()},
							remove : function() {self.event.remove()},
							update : function() {self.event.update()}
						},
						change : {
							pass : function() {self.event.changePass()}
						}
					}
				});
				const seqPassInfo = this.data.lockerInfo.seq_pass_info;
				componentLocker.event.updatePassList(this.popup, seqPassInfo);
				if(seqPassInfo) {
					const startDate = this.popup.querySelector("[name='startDate']");
					const endDate = this.popup.querySelector("[name='endDate']");
					if(this.data.passInfo.status != "AVAILABLE" && this.data.passInfo.status != "PAUSE")
						startDate.disabled = endDate.disabled = true;
				}
				uiCalendar(this.popup);
				uiPermission(this.popup);
			},
			event : {
				remove : function() {
					if(!confirm("정말로 해제 하시겠습니까?")) return;
					const lockerInfo = this.self.data.lockerInfo;
					const seqPartnerLocker = lockerInfo.seq_partner_locker;
					const seqPartnerLockerList = lockerInfo.seq_partner_locker_list;
					lockerController.assign.remove(seqPartnerLockerList).then(data => {
						alert("해제되었습니다.");
						this.self.close(seqPartnerLocker);
					}).catch(error => {
						console.log(error);
						alert("해제 중 오류가 발생하였습니다.");
					});
				},
				update : function() {
					const popup = this.self.popup;
					const lockerInfo = this.self.data.lockerInfo;
					const seqPartnerLocker = lockerInfo.seq_partner_locker;
					const seqPartnerLockerList = lockerInfo.seq_partner_locker_list;
					const seqPassInfo = popup.getValue("seqPassInfo");
					const startDate = popup.getValue("startDate");
					const endDate = popup.getValue("endDate");
					if(isLessDate(startDate, endDate)) {
						alert("시작날짜가 종료날짜 보다 작을 수 없습니다.");
						return;
					}
					const data = {
						seqPartnerLockerList : seqPartnerLockerList,
						startDt : startDate,
						endDt : endDate,
						seqPassInfo : seqPassInfo
					};
					lockerController.change.usePeriod(data).then(data => {
						alert("변경되었습니다.");
						this.self.close(seqPartnerLocker);
					}).catch(error => {
						console.log(error);
						alert("변경 중 오류가 발생하였습니다.");
					});
				},
				changePass : function() {
					const popup = this.self.popup;
					const seqPassInfo = popup.getValue("seqPassInfo", true);
					const startDate = popup.querySelector("[name='startDate']");
					const endDate = popup.querySelector("[name='endDate']");
					if(seqPassInfo) {
						const passInfo = this.self.data.passList.filter(item => {
							return (item.seqPassInfo == seqPassInfo);
						})[0];
						startDate.value = passInfo.useStartDate;
						endDate.value = passInfo.useEndDate;
						startDate.disabled = endDate.disabled = (passInfo.status != "AVAILABLE" && passInfo.status != "PAUSE");
					}
				},
			},
			template : function() {
				const data = this.data.lockerInfo;
				const isExpiration = (this.data.passInfo.status == "EXPIRATION");
				const seqMember = data.seq_member;
				const memberType = data.member_type;
				const lockerNo = data.locker_no;
				const lockerType = data.locker_type;
				const memberName = ((memberType == "N") ? data.no_member_name : `${data.name}`) || "-";
				const memberMobile = ((memberType == "N") ? data.no_member_mobile : data.mobile) || "-";
				const memberImage = (memberType == "N") ? "/static/img/brand/symbol_gray.png" : ((data.img_url) ? data.img_url : "/static/img/login/" + ((data.sex == "M") ? "male.jpg" : "female.jpg"));
				const startDate = data.start_dt;
				const endDate = data.end_dt;
				const memberTag = (memberType == "N") ? "<em class='bg red'>비회원</em>" : (data.seq_pass_info) ? (isExpiration) ? "<em class='bg gray'>연동</em>" : "<em class='bg green'>연동</em>" : "<em class='bg gray'>미연동</em>";
				const isHidden = (memberType == "N" || lockerType == "D") ? "hidden" : "";
				const memo = data.memo || "입력된 내용이 없습니다.";
				const memberLink = (memberType == "N") ? `` : `<a href="/member/${seqMember}/home/">회원정보</a>`;

				return `
					<style type="text/css">
						.popupLockerInfo						{}
						.popupLockerInfo .middle dt				{vertical-align:top; width:95px; font-size:0}
						.popupLockerInfo .middle dt img			{margin-top:10px; width:75px; height:75px; border-radius:100%; border:1px solid #ccc; object-fit:cover; overflow:hidden}
						.popupLockerInfo .middle dd h4			{font-size:16px}
						.popupLockerInfo .middle dd h4 em		{margin-top:-4px; font-size:12px}
						.popupLockerInfo .middle dd h4 a		{float:right; margin-top:4px; padding:4px 6px; border:1px solid #ccc; line-height:1; font-size:11px; font-weight:normal; color:#555}
						.popupLockerInfo .middle dd h5			{margin-top:2px; font-size:14px}
						.popupLockerInfo .middle dd hr			{margin:12px 0 15px 0; border-bottom-style:dashed}
						.popupLockerInfo .middle dd > div		{margin-top:10px}
						.popupLockerInfo .middle dd input		{margin-right:5px}
						.popupLockerInfo .middle dd select		{margin-top:10px; width:calc(100% - 10px); max-width:calc(100% - 10px)}
						.popupLockerInfo .middle .hidden		{display:none}
					</style>
					<div class="popupLockerInfo tiny">
						<div class="top">
							<h2>
								${lockerNo}번 락커 정보
								<a data-event="close"></a>
							</h2>
						</div>
						<div class="middle">
							<dl>
								<dt><img src="${memberImage}"/></dt>
								<dd>
									<h4>
										${memberTag}${memberName}
										${memberLink}
									</h4>
									<h5>${memberMobile}</h5>
									<p class="ui-note">락커메모 : ${memo}</p>
									<hr class="${isHidden}">
									<div>
										<input type="calendar" name="startDate" value="${startDate}">부터
										<input type="calendar" name="endDate" value="${endDate}">까지
										<select class="ui-select ${isHidden}" name="seqPassInfo" data-event="pass"></select>
									</div>
								</dd>
							</dl>
						</div>
						<div class="bottom">
							<button class="ui-button gray" data-event="close">닫기</button>
							<button class="ui-button red" data-event="remove" data-permission="permissionMember/locker">해제</button>
							<button class="ui-button green" data-event="update" data-permission="permissionMember/locker">수정</button>
						</div>
					</div>
				`;
			}
		},
		setting : {
			popup : undefined,
			data : {},
			open : function(context) {
				if(this.popup) return;
				this.data = context.data;
				this.render();
			},
			close : function() {
				this.popup = undefined;
				uiPopup();
			},
			submit : function() {
				const groupInfo = this.data.groupInfo;
				const lockerCount = this.popup.getValue("lockerCount", true);
				const data = {
					seqPartnerLocker : "",
					lockerType : this.popup.getValue("lockerType"),
					lockerName : this.popup.getValue("lockerName").trim(),
					lockerCount : lockerCount,
					nowLockerCount : lockerCount
				};
				if(!this.check(data)) return;
				lockerController.create(data).then(data => {
					this.popup.putValue("lockerType", "P");
					this.popup.putValue("lockerName", "");
					this.popup.putValue("lockerCount", "");
					alert("등록되었습니다.");
					this.update();
				}).catch(error => {
					console.log(error);
					alert("등록 중 오류가 발생하였습니다.");
				});
			},
			update : function() {
				const seqPartnerLocker = this.data.seqPartnerLocker;
				componentLocker.update(seqPartnerLocker, () => {
					this.event.updateLockerList();
				});
			},
			render : function() {
				const self = this.event.self = this;
				this.popup = uiPopup({
					template : this.template(),
					event : {
						click : {
							close : function() {self.close()},
							create : function() {self.event.create()},
							submit : function() {self.submit()},
						}
					}
				});
				this.event.updateLockerList();
			},
			event : {
				create : function(object) {
					componentLocker.popup.settingInfo.open(this.self);
				},
				active : function(object) {
					const tr = object.parentNode.parentNode;
					const seqPartnerLocker = Number(tr.getAttribute("data-sequence"));
					const lockerInfo = this.getLockerInfo(seqPartnerLocker);
					lockerController.active({
						seq_partner_locker : seqPartnerLocker,
						locker_count : lockerInfo.locker_count
					}).then(item => {
						alert("락커가 생성되었습니다.");
						this.self.update();
					}).catch(error => {
						alert("락커 생성 중 오류가 발생하였습니다.");
					});
				},
				update : function(object) {
					const tr = object.parentNode.parentNode;
					const seqPartnerLocker = Number(tr.getAttribute("data-sequence"));
					componentLocker.popup.settingInfo.open(this.self, seqPartnerLocker);
				},
				remove : function(object) {
					const tr = object.parentNode.parentNode;
					const seqPartnerLocker = Number(tr.getAttribute("data-sequence"));
					if(!confirm("정말로 삭제하시겠습니까?")) return;
					const getSeqPartnerLocker = (seqPartnerLocker) => {
						const data = this.self.data.groupList;
						for(let i = 0; i < data.length; i++) {
							if(data[i] != seqPartnerLocker)
								return data[i].seq_partner_locker;
						}
						return 0;
					};
					lockerController.remove(seqPartnerLocker).then(item => {
						alert("락커가 삭제되었습니다.");
						if(seqPartnerLocker == this.self.data.seqPartnerLocker) {
							const data = this.self.data.groupList;
							for(let i = 0; i < data.length; i++) {
								if(data[i] != seqPartnerLocker) {
									this.self.data.seqPartnerLocker = data[i].seq_partner_locker;
									break;
								}
							}
						}
						this.self.update();
					}).catch(error => {
						alert("락커 삭제 중 오류가 발생하였습니다.");
					});
				},
				getLockerInfo : function(seqPartnerLocker) {
					const groupList = this.self.data.groupList;
					return groupList.filter(item => {
						return (item.seq_partner_locker == seqPartnerLocker);
					})[0];
				},
				updateLockerList : function() {
					const div = this.self.popup.querySelector("[data-id='lockerList']");
					const tbody = div.querySelector("tbody");
					const lockerList = this.self.data.groupList;
					const tr = lockerList.map(item => {
						const lockerType = (item.locker_type == "P") ? "기간제" : "일일";
						const isActive = (item.maked_locker_count);
						const lockerState = (isActive) ? "완료" : `<button class="ui-button medium blue" type="button" data-event='active'>생성</button>`;
						return `
							<tr data-sequence="${item.seq_partner_locker}">
								<td>${lockerType}</td>
								<td>${item.locker_name}</td>
								<td>${item.locker_count}</td>
								<td>${lockerState}</td>
								<td>
									<button class="ui-button medium green" type="button" data-event="update">수정</button>
									<button class="ui-button medium red" type="button" data-event="remove">삭제</button>
								</td>
							</tr>
						`
					});
					tbody.innerHTML = (tr.length == 0) ? `<tr class="empty"><td colspan="5">등록된 락커가 없습니다.</td></tr>` : tr.join("");
					const self = this;
					uiEvent(tbody, {
						click : {
							remove : function() {self.remove(this)},
							update : function() {self.update(this)},
							active : function() {self.active(this)},
						}
					});
				}
			},
			template : function() {
				return `
					<style type="text/css">
						.popupLockerSetting											{}
						.popupLockerSetting .lockerList								{position:relative; margin-top:5px; min-height:300px; max-height:450px; background-color:#ccc; border:1px solid #ccc; overflow-y:auto}
						.popupLockerSetting .lockerList table						{background-color:white; line-height:1.2; text-align:center}
						.popupLockerSetting .lockerList table tr > *				{padding:8px}
						.popupLockerSetting .lockerList table tr td					{border:none; border-right:1px solid #ccc; border-bottom:1px solid #ccc}
						.popupLockerSetting .lockerList table tr td:last-child		{border-right:none}
						.popupLockerSetting .lockerList table tr:last-child td		{border-bottom:none}
						.popupLockerSetting .lockerList table thead tr td			{position:sticky; position:-webkit-sticky; top:0; background-color:#686d7b; overflow:visible; z-index:2}
						.popupLockerSetting .ui-form table input.name				{max-width:175px; text-align:center}
						.popupLockerSetting .ui-form table input.count				{margin:0; max-width:100px}
					</style>
					<div class="popupLockerSetting small">
						<div class="top">
							<h2>
								락커 관리
								<a data-event="close"></a>
							</h2>
						</div>
						<div class="middle">
							<div class="lockerList" data-id="lockerList">
								<table class="ui-table dark even">
									<colgroup><col><col width="35%"></colgroup>
									<thead>
										<tr><td>구분</td><td>락커명</td><td>수량</td><td>상태</td><td>기타</td></tr>
									</thead>
									<tbody></tbody>
								</table>
							</div>
							<p class="ui-note blue">락커를 등록하신 후 목록에서 락커 생성 버튼을 클릭해 락커 생성을 완료해 주세요.</p>
						</div>
						<div class="bottom">
							<button class="ui-button gray" data-event="close">닫기</button>
							<button class="ui-button" data-event="create">락커 등록</button>
						</div>
					</div>
				`;
			}
		},
		settingInfo : {
			popup : undefined,
			mode : "create",
			data : {},
			open : function(context, seqPartnerLocker) {
				if(this.popup) return;
				this.mode = (seqPartnerLocker) ? "update" : "create";
				this.data = context.data;
				if(this.mode == "update") {
					this.data.groupInfo = this.data.groupList.filter(item => {
						return (item.seq_partner_locker == seqPartnerLocker);
					})[0];
				} else {
					this.data.groupInfo = {};
				}
				this.render();
			},
			close : function() {
				this.popup = undefined;
				uiPopup();
			},
			check : function(data) {
				let error = "";
				for(let name in data) {
					const value = data[name];
					const isEmpty = (!value);
					switch(name) {
						case "lockerType" : if(isEmpty) error = "락커 종류를 선택해 주세요."; break;
						case "lockerName" : if(isEmpty) error = "락커 이름을 입력해 주세요."; break;
						case "lockerCount" :
							if(isEmpty) error = "락커 개수를 최소 1개 이상 입력해 주세요.";
							else {
								const changeLockerCount = Number(value);
								const lockerCount = this.data.groupInfo.locker_count;
								if(changeLockerCount < lockerCount) {
									const lockerList = this.data.lockerList;
									for(let i = changeLockerCount; i < lockerList.length; i++) {
										const item = lockerList[i];
										if(!(item.use_status == "N" || item.use_status == "U")) {
											error = "삭제될 락커 중에 배정된 락커가 있습니다.\n락커배정 해제 후 다시 변경해 주세요";
											break;
										}
									}
								}
							}
							break;
					}
					if(error) {
						alert(error);
						const input = this.popup.querySelector("[name='" + name + "']");
						if(input) input.focus();
						return false;
					}
				}
				return true;
			},
			submit : function() {
				const groupInfo = this.data.groupInfo;
				const lockerCount = this.popup.getValue("updateLockerCount", true);
				const data = {
					seqPartnerLocker : groupInfo.seq_partner_locker || 0,
					lockerType : this.popup.getValue("updateLockerType"),
					lockerName : this.popup.getValue("updateLockerName").trim(),
					lockerCount : lockerCount,
					nowLockerCount : lockerCount
				};
				if(!this.check(data)) return;
				if(this.mode == "create") {
					lockerController.create(data).then(data => {
						alert("등록되었습니다.");
						componentLocker.popup.setting.update();
						this.close();
					}).catch(error => {
						console.log(error);
						alert("등록 중 오류가 발생하였습니다.");
					});
				} else {
					data.nowLockerCount = groupInfo.locker_count;
					lockerController.update(data).then(data => {
						alert("수정되었습니다.");
						componentLocker.popup.setting.update();
						this.close();
					}).catch(error => {
						console.log(error);
						alert("수정 중 오류가 발생하였습니다.");
					});
				}
			},
			render : function() {
				const self = this;
				this.popup = uiPopup({
					template : this.template(),
					event : {
						click : {
							close : function() {self.close()},
							submit : function() {self.submit()}
						}
					}
				});
				if(this.mode == "update") {
					const data = this.data.groupInfo;
					this.popup.putValue("updateLockerType", data.locker_type);
					this.popup.putValue("updateLockerName", data.locker_name);
					this.popup.putValue("updateLockerCount", data.locker_count);
				}
			},
			template : function() {
				const buttonName = (this.mode == "create") ? "등록" : "수정";
				const buttonColor = (this.mode == "create") ? "" : "green";
				const disabled = (this.mode == "update") ? "disabled" : "";
				return `
					<style type="text/css">
						.popupLockerUpdate											{}
						.popupLockerUpdate .ui-form table input.name				{max-width:175px; text-align:center}
						.popupLockerUpdate .ui-form table input.count				{margin:0; max-width:100px}
					</style>
					<div class="popupLockerUpdate tiny">
						<div class="top">
							<h2>
								락커 ${buttonName}
								<a data-event="close"></a>
							</h2>
						</div>
						<div class="middle ui-form">
							<table>
								<tr>
									<th>락커 종류</th>
									<td>
										<label class="ui-input-radio">
											<input name="updateLockerType" type="radio" value="P" checked ${disabled}>
											<span></span>
											기간제 락커
										</label>
										<label class="ui-input-radio">
											<input name="updateLockerType" type="radio" value="D" ${disabled}>
											<span></span>
											일일 락커
										</label>
									</td>
								</tr>
								<tr>
									<th>락커 이름</th>
									<td>
										<input class="name" name="updateLockerName" type="text" maxlength="32" placeholder="락커 이름 입력" autocomplete="off">
									</td>
								</tr>
								<tr>
									<th>락커 수량</th>
									<td>
										<input name="updateLockerCount" type="number" min="0" placeholder="수량" autocomplete="off">
									</td>
								</tr>
								<!--
								<tr>
									<th>시작 번호(선택)</th>
									<td>
										<input name="updateLockerStartNumber" type="number" min="0" placeholder="시작 번호(선택)" autocomplete="off">
										<p class="ui-note">락커 시작 번호를 500으로 입력하시면, 락커 번호가 501부터 시작하게 됩니다.</p>
									</td>
								</tr>
								-->
							</table>
						</div>
						<div class="bottom">
							<button class="ui-button gray" data-event="close">닫기</button>
							<button class="ui-button ${buttonColor}" data-event="submit">${buttonName}</button>
						</div>
					</div>
				`;
			}
		},
		memo : {
			popup : undefined,
			data : {},
			open : function(context, button) {
				if(this.popup) return;
				const seqPartnerLockerList = Number(button.getAttribute("data-sequence"));
				this.data = context.data;
				this.data.lockerInfo = this.data.lockerList.filter(item => {
				this.button = button;
					return (item.seq_partner_locker_list == seqPartnerLockerList);
				})[0] || {};
				this.render();
			},
			close : function() {
				this.popup = undefined;
				uiPopup();
			},
			submit : function(isRemove) {
				const memo = (isRemove) ? "" : this.popup.getValue("memo").trim();
				const seqPartnerLockerList = this.data.lockerInfo.seq_partner_locker_list;
				lockerController.change.memo({
					seqPartnerLockerList : seqPartnerLockerList,
					memo : memo
				}).then(data => {
					alert("저장되었습니다.");
					this.data.lockerInfo.memo = memo;
					if(memo.length > 0)
						this.button.classList.add("focus");
					else
						this.button.classList.remove("focus");
					this.close();
				}).catch(error => {
					console.log(error);
					alert("저장 중 오류가 발생하였습니다.");
				});
			},
			render : function() {
				const self = this;
				this.popup = uiPopup({
					template : this.template(),
					event : {
						click : {
							close : function() {self.close()},
							remove : function() {self.submit(true)},
							submit : function() {self.submit()}
						}
					}
				});
				this.popup.putValue("memo", this.data.lockerInfo.memo || "");
			},
			template : function() {
				return `
					<div class="popupMemo tiny">
						<div class="top">
							<h2>
								락커 메모
								<a data-event="close"></a>
							</h2>
						</div>
						<div class="middle">
							<textarea class="ui-textarea" name="memo" placeholder="최대 200자 이하로 입력해 주세요."></textarea>
							<p class="ui-note blue">
								락커 메모는 락커에 관련된 메모로 배정된 회원과는 무관합니다.
							</p>
						</div>
						<div class="bottom">
							<button class="ui-button gray" data-event="close">취소</button>
							<button class="ui-button red" data-event="remove">삭제</button>
							<button class="ui-button green" data-event="submit">수정</button>
						</div>
					</div>
				`;
			}
		},
		syncPass : {
			popup : undefined,
			data : {},
			open : function(context) {
				if(this.popup) return;
				this.data = context.data;
				this.render();
			},
			close : function(isUpdate) {
				this.popup = undefined;
				uiPopup();
				if(isUpdate) {
					const seqPartnerLocker = this.data.seqPartnerLocker;
					componentLocker.update(seqPartnerLocker);
				}
			},
			submit : function(object) {
				object.disabled = true;
				const syncType = this.popup.getValue("syncType");
				if(!syncType) {
					alert("연동 기준을 선택해 주세요.");
					object.disabled = false;
					return;
				}

				lockerController.syncPass({
					syncType : syncType
				}).then(data => {
					alert("일괄 연동되었습니다.");
					this.close(true);
				}).catch(error => {
					console.log(error);
					alert("일괄 연동에 실패하였습니다.");
					object.disabled = false;
				});
			},
			render : function() {
				const self = this;
				this.popup = uiPopup({
					template : this.template(),
					event : {
						click : {
							close : function() {self.close()},
							submit : function() {self.submit(this)}
						}
					}
				});
			},
			template : function() {
				return `
					<style type="text/css">
						.popupBatch							{}
						.popupBatch .middle .ui-note		{margin:10px 0}
						.popupBatch .middle label			{margin-top:10px}
						.popupBatch .middle label + label	{margin-left:0 !important}
					</style>
					<div class="popupBatch tiny">
						<div class="top">
							<h2>
								락커-이용권 일괄 연동
								<a data-event="close"></a>
							</h2>
						</div>
						<div class="middle">
							락커 1개가 배정된 회원 중 실제 락커 이용권과 연동이 안되어 있는 경우 일괄적으로 락커와 이용권을 연동합니다.
							<p class="ui-note red">
								이용권이 2개 이상이거나 하나의 회원이 여러개의 락커가 배정되어 있는 경우에는 <span class="red">일괄 연동 기능에서 제외</span>되고,
								개별적으로 이용권을 선택 후 연동해야 합니다.
							</p>
							락커와 이용권을 연동할 때 이용기간의 기준을 선택해 주세요.
							<div>
								<label class="ui-input-radio">
									<input name="syncType" type="radio" value="pass">
									<span></span>
									이용권 기간으로 배정된 락커 기간을 설정
								</label>
								<label class="ui-input-radio">
									<input name="syncType" type="radio" value="locker">
									<span></span>
									배정된 락커의 기간으로 이용권 기간을 설정
								</label>
							</div>
						</div>
						<div class="bottom">
							<button class="ui-button gray" data-event="close">취소</button>
							<button class="ui-button" data-event="submit">일괄 연동</button>
						</div>
					</div>
				`;
			}
		}
	}
};
</script>

<div class="ui-quick"><a class="">TOP</a></div>
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