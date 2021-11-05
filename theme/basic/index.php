<?php
if (!defined('_INDEX_')) define('_INDEX_', true);
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가

if (G5_IS_MOBILE) {
    include_once(G5_THEME_MOBILE_PATH.'/index.php');
    return;
}

if(G5_COMMUNITY_USE === false) {
    include_once(G5_THEME_SHOP_PATH.'/index.php');
    return;
}

include_once(G5_THEME_PATH.'/head.php');

?>

<?php if (!defined('_SUB_')) { ?>

<main>
  <section class="top" data-id="top">
    <div class="wrap">
      <div class="left">
        <ul>
          <li><button class="prev" data-type="prev" data-event="prev">◀</button></li>
          <li><input name="date" type="calendar" value="today" data-type="calendar" data-event="calendar"></li>
          <li><button class="today" data-type="today" data-event="today">오늘</button></li>
          <li><button class="next" data-type="next" data-event="next">▶</button></li>
        </ul>
      </div>
      <div class="right">
        <ul>
          <li><button class="focus" data-type="todo" data-event="tab">업무관리</button></li>
          <li><button data-type="appointment" data-event="tab">개인레슨</button></li>
          <li><button data-type="class" data-event="tab">그룹수업</button></li>
          <li><button data-type="place" data-event="tab">시설이용</button></li>
        </ul>
      </div>
    </div>
  </section>
  <section class="middle" data-id="middle">
    <div class="wrap">
      <ul>
        <li data-id="todo">
          <div class="todo">
            <div class="top">
              <div class="left">
                <label class="ui-input-checkbox">
                  <input name="filter-coach" type="checkbox" data-event="filter">
                  <span></span>
                  내 업무만 보기
                </label>
                <label class="ui-input-checkbox">
                  <input name="filter-complete" type="checkbox" data-event="filter">
                  <span></span>
                  미완료만 보기
                </label>
              </div>
              <div class="right">
                <button class="ui-button green" data-event="create">새로운 업무 등록</button>
              </div>
            </div>
            <div class="bottom">
              <table class="ui-table dark even">
                <colgroup><col width="27.5%"><col width="35%"><col width="15%"><col width="15%"><col width="7.5%"></colgroup>
                <thead>
                  <tr><td>업무 기간</td><td>업무 내용</td><td>업무 결과</td><td>담당자</td><td>완료</td></tr>
                </thead>
                <tbody>
                  <tr class="empty"><td colspan="5">데이터를 불러오는 중 입니다.</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </li>
        <li data-id="chart">
          <div class="chart">
            <div class="canvas">
              <canvas data-id="canvas"></canvas>
              <button class="prev" data-type="prev" data-event="button"></button>
              <button class="next" data-type="next" data-event="button"></button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
  <section class="bottom">
    <div class="wrap">
      <div class="menu" data-id="menu">
        <ul>
          
            
            
              <li><a href="/manager/schedule/class"><span class="icon_calendar"></span>스케줄러</a></li>
            
          
          <li><a href="/manager/entrance-member"><span class="icon_enter"></span>입장관리</a></li>
          <li><a href="/member/"><span class="icon_member"></span>고객관리</a></li>
          <li><a href="/coach"><span class="icon_member"></span>인사관리</a></li>

          
          
          
            
              
            
            
            
          
          <li class=""><a href="/summary/sales"><span class="icon_calculate"></span>회계관리</a></li>

          
          
          
            
              
            
            
            
          
          <li class=""><a href="/statistics/appointment/index"><span class="icon_report"></span>통계 분석</a></li>
          <li><a href="/locker"><span class="icon_locker"></span>락커관리</a></li>
          <li><a href="/member/notice/getNotice"><span class="icon_book"></span>공지</a></li>
        </ul>
      </div>
      <div class="quick">
        <ul>
          <li><a href="/checkin?v=2" target="_blank"><span class="icon_enter"></span>체크인</a></li>
          <li><a href="https://blog.naver.com/bodycodi_bms" target="_blank"><span class="icon_navigator"></span>블로그 매뉴얼</a></li>
        </ul>
      </div>
    </div>
  </section>
</main>
<script type="text/javascript">
const seqPartner = partnerInfo.partner.id;
const seqPartnerCoach = partnerInfo.employee.id;

function doReady() {
	doPage.open();
	// popupGuide.open("2021-03-03", "2021-03-09");
}

const doPage = {
	container : undefined,
	data : {},
	open : function() {
		this.render();
	},
	render : function() {
		this.container = document.querySelector("main");
		const self = this.event.self = this;
		const section = this.container.querySelector("[data-id='top']");
		uiEvent(section, {
			click : {
				tab : function() {self.event.changeTab(this)},
				prev : function() {self.event.changeDate(this)},
				next : function() {self.event.changeDate(this)},
				today : function() {self.event.changeDate(this)},
			},
			change : {
				calendar : function() {self.event.changeDate(this)}
			}
		});
		this.event.changeTab();
	},
	event : {
		changeDate : function(object) {
			const type = object.getAttribute("data-type");
			const input = this.self.container.querySelector("[name='date']");
			const date = input.value;
			switch(type) {
				case "prev" : input.value = getElapse(date, 0, 0, -1); break;
				case "next" : input.value = getElapse(date, 0, 0, 1); break;
				case "today" : input.value = getCalendar(); break;
			}
			this.changeTab();
		},
		changeTab : function(object) {
			const container = this.self.container;
			if(!object) object = container.querySelectorAll("[data-event='tab']")[0];
			const type = object.getAttribute("data-type");
			const button = container.querySelectorAll("[data-event='tab']");
			const li = container.querySelectorAll("[data-id='middle'] > div > ul > li");
			li[0].className = li[1].className = "";
			button.forEach((item, index) => {
				item.className = "";
				const j = (index) ? 1 : 0;
				if(item == object)
					item.className = li[j].className = "focus";
			});
			const date = container.getValue("date");
			switch(type) {
				case "appointment" :
				case "class" :
				case "place" : this.self.scheduleInfo.open(type); break;
				case "todo" : this.self.todoList.open(date); break;
			}
		}
	},
	todoList : {
		container : undefined,
		data : {},
		open : function(date) {
			Promise.all([
				commonController.todo.list(seqPartner, date),
				commonController.coachList(),
			]).then(([todoList, coachList]) => {
				this.data = {
					date : date,
					seqPartner : seqPartner,
					seqPartnerCoach : seqPartnerCoach,
					todoList : todoList.data || [],
					coachList : coachList || []
				};
				popupTodo.data = popupTodoUpdate.data = this.data;
				this.render();
				this.event.updateHeader();
			}).catch(error => {
        console.error(error);
				uiError(error);
			});
		},
		update : function() {
			this.open(this.data.date);
		},
		render : function(isUpdate) {
			this.container = document.querySelector("[data-id='todo']");
			const self = this.event.self = this;
			const tbody = this.container.querySelector("tbody");
			tbody.innerHTML = this.template();
			this.container.querySelectorAll("td:not(:last-child)").forEach(item => {
				item.onclick = function() {
					const seqTodo = Number(this.parentNode.getAttribute("data-sequence"));
					popupTodoUpdate.open(seqTodo, () => {
						self.update();
					});
				};
			});
			this.container.querySelectorAll("[data-event='complete']").forEach(item => {
				item.onchange = function() {
					self.event.changeComplete(this);
				};
			});
			if(!isUpdate) {
				uiEvent(this.container, {
					change : {
						filter : function() {self.event.filter()},
					},
					click : {
						create : function() {self.event.create()}
					}
				});
			}
		},
		event : {
			filter : function() {
				this.self.render(true);
			},
			create : function() {
				popupTodoUpdate.open(0, () => {
					this.self.update();
				});
			},
			changeComplete : function(object) {
				const seqTodo = Number(object.getAttribute("data-sequence"));
				const seqPartner = this.self.data.seqPartner;
				const data = this.self.data.todoList.filter(item => {
					return (item.seqTodo == seqTodo);
				})[0];
				if(!data) return;
				data.isCompleted = (object.checked);
				commonController.todo.update(seqPartner, seqTodo, data).then(data => {
					this.updateHeader();
				}).catch(error => {
					uiError(error);
				});
			},
			updateHeader : function() {
				let count = 0;
				this.self.data.todoList.forEach(item => {
					if(item.isCompleted == false) count++;
				});
				const span = document.querySelector(".ui-header [data-msg='todo']");
				if(span) span.innerHTML = getComma(count);
			}
		},
		template : function() {
			const isComplete = this.container.getValue("filter-complete");
			const isCoach = this.container.getValue("filter-coach");
			const seqPartnerCoach = this.data.seqPartnerCoach;

			const tr = this.data.todoList.filter(item => {
				if(isComplete == "Y" && item.isCompleted) return false;
				if(isCoach == "Y" && item.seqPartnerCoach != seqPartnerCoach) return false;
				return true;
			}).map(item => {
				const getCoachName = (seqPartnerCoach) => {
					const data = this.data.coachList.filter(item => {
						return (item.seqPartnerCoach == seqPartnerCoach);
					})[0];
					return (data) ? data.coachName : "-";
				};
				const isComplete = (item.isCompleted) ? "checked" : "";
				const startDate = uiDate(new Date(item.startAt).format("yyyy-mm-ddThh:MM:ss"));
				const endDate = uiDate(new Date(item.endAt).format("yyyy-mm-ddThh:MM:ss"));
				const period = (startDate == endDate) ? startDate : startDate + " ~ " + endDate;
				return `
					<tr data-sequence="${item.seqTodo}">
						<td>${period}</td>
						<td class="left">${item.message || "-"}</td>
						<td>${item.comment || "-"}</td>
						<td>${getCoachName(item.seqPartnerCoach)}</td>
						<td>
							<label class="ui-input-switch">
								<input type="checkbox" ${isComplete} data-sequence="${item.seqTodo}" data-event="complete">
								<span></span>
							</label>
						</td>
					</tr>
				`;
			});
			return (tr.length == 0) ? `<tr class="empty"><td colspan="5">업무 정보가 없습니다.</td></tr>` : tr.join("");
		}
	},
	scheduleInfo : {
		container : undefined,
		canvas : {
			object : undefined,
			perCount : 10,
			maxCount : 0,
			index : 0,
			maxIndex : 0,
			color : {
				gray : "rgb(201,203,207)",
				blue : "rgb(0,79,236)",
				green : "rgb(55,183,114)",
				background : {
					gray : "rgba(201,203,207,0.2)",
					blue : "rgba(0,79,236,0.2)",
					green : "rgba(55,183,114,0.2)",
				}
			}
		},
		data : {},
		open : function(type) {
			const main = document.querySelector("main");
			const date = main.getValue("date");
			const typeName = type + "List";
			Promise.all([
				commonController.statistics[type](date)
			]).then(([scheduleList]) => {
				this.data.type = type;
				this.data.dataList = this.data[typeName] = scheduleList || [];
				this.canvas.index = 0;
				this.canvas.perCount = (type == "place") ? 15 : 10;
				this.canvas.maxCount = this.data.dataList.length;
				this.canvas.maxIndex =  Math.ceil(this.canvas.maxCount / this.canvas.perCount);
				if(type == "class") {
					this.data.dataList = this.data.dataList.sort((a, b) => {
						const timeA = getNumber(a.classSchedule.startTime);
						const timeB = getNumber(b.classSchedule.startTime);
						return (timeA == timeB) ? 0 : (timeA < timeB) ? -1 : 1;
					});
				}
				this.render();
			}).catch(error => {
				console.log(error);
				alert("데이터를 가져오는데 실패하였습니다.");
			});
		},
		render : function() {
			this.container = document.querySelector("[data-id='chart']");
			const self = this;
			const setCanvas = () => {
				if(this.canvas.chart) return;
				const canvas = this.container.querySelector("canvas");
				const ctx = canvas.getContext("2d");
				this.canvas.container = canvas.parentNode;
				this.canvas.chart = new Chart(ctx, {
					type : "line",
					options : {
						responsive : true,
						maintainAspectRatio : false,
						layout : {
							padding : 0
						},
						elements : {
							line : {
								borderWidth : 1,
							},
						},
						scales : {
							xAxes : [{
								ticks : {
									beginAtZero : true,
									autoSkip: false,
								},
							}],
							yAxes : [{
								ticks : {
									beginAtZero : true,
									min : 0
								}
							}]
						},
						tooltips : {
							mode : "index",
							intersect : false,
							axes : "y",
							callbacks : {
								title : function(item, data) {
									return data.labels[item[0].index];
								},
								label : function(item, data, values) {
									const label = data.datasets[item.datasetIndex].label;
									if(self.data.type != "appointment") return `${label} : ${item.yLabel}`;
									const h = Number.parseInt(item.yLabel / 3600, 10);
									const m = Number.parseInt((item.yLabel % 3600) / 60, 10);
									const v = [];
									if(h > 0) v.push(`${h}시간`);
									if(m > 0) v.push(`${m}분`);
									if(v.length < 1) v.push("0분");
									return `${label} : ${v.join(" ")}`;
								},
							},
						}
					}
				});
			};
			const setDraw = () => {
				const chart = this.canvas.chart;
				const tickInfo = chart.options.scales.yAxes[0].ticks;
				const index = this.canvas.index;
				const perCount = this.canvas.perCount;
				const maxCount = this.canvas.maxCount;
				let start = index * perCount;
				let end = start + perCount;
				if(end > maxCount) {
					start = (maxCount - perCount < 0) ? 0 : maxCount - perCount;
					end = maxCount;
				}
				const dataList = this.data.dataList.slice(start, end);
				if(dataList.length == 0)
					this.canvas.container.classList.add("empty");
				else
					this.canvas.container.classList.remove("empty");
				const dataSetList = [];
				let labelList = [];
				let max = 0, step = 5;

				switch(this.data.type) {
					case "appointment" :
						labelList = dataList.map(item => {
							max = Math.max(max, item.reservable, item.reserved + item.entranced + item.absenced);
							return item.coach.coachName;
						});
						dataSetList.push({
							backgroundColor : this.canvas.color.background.gray,
							borderColor : this.canvas.color.gray,
							label : "예약 가능 시간",
							data : dataList.map(item => item.reservable),
						});
						dataSetList.push({
							backgroundColor : this.canvas.color.background.blue,
							borderColor : this.canvas.color.blue,
							label : "예약된 시간",
							data : dataList.map(item => item.reserved + item.entranced + item.absenced),
						});
						dataSetList.push({
							backgroundColor : this.canvas.color.background.green,
							borderColor : this.canvas.color.green,
							label : "수업진행(출석) 시간",
							data : dataList.map(item => item.entranced),
						});
						tickInfo.stepSize = step = 3600 * 2;
						tickInfo.callback = function(value) {
							if(Math.floor(value / 3600) == value / 3600)
								return Math.floor(value / 3600);
						};
						break;

					case "class" :
						labelList = dataList.map(item => {
							max = Math.max(max, item.limit, item.reserved + item.entranced + item.absenced);
							return [item.classSchedule.startTime.substr(0, 5), item.classSchedule.lessonName];
						});
						dataSetList.push({
							backgroundColor : this.canvas.color.background.gray,
							borderColor : this.canvas.color.gray,
							label : "수업 정원",
							data : dataList.map(item => item.limit),
						});
						dataSetList.push({
							backgroundColor : this.canvas.color.background.blue,
							borderColor : this.canvas.color.blue,
							label : "예약 현황",
							data : dataList.map(item => item.reserved + item.entranced + item.absenced),
						});
						dataSetList.push({
							backgroundColor : this.canvas.color.background.green,
							borderColor : this.canvas.color.green,
							label : "출석 현황",
							data : dataList.map(item => item.entranced),
						});
						tickInfo.stepSize = step = 5;
						delete tickInfo.callback;
						break;

					case "place" :
						labelList = dataList.map(item => {
							max = Math.max(max, item.count);
							const date = new Date(item.step);
							const startTime = date.format("hh:MM");
							date.setHours(date.getHours() + 1);
							const endTime = date.format("hh:MM");
							return [startTime + " ~", endTime];
						});
						dataSetList.push({
							backgroundColor : this.canvas.color.background.blue,
							borderColor : this.canvas.color.blue,
							label : "입장건수",
							data : dataList.map(item => item.count),
						});
						tickInfo.stepSize = step = 5;
						delete tickInfo.callback;
						break;
				}
				max = (Math.ceil(max / step) * step) + step;
				tickInfo.max = max;
				chart.data.labels = labelList;
				chart.data.datasets = dataSetList;
				chart.update();
			};
			const setButton = () => {
				const button = this.container.querySelectorAll("[data-event='button']");
				const updateButton = (object) => {
					const type = (object) ? object.getAttribute("data-type") : "";
					let index = self.canvas.index;
					const maxIndex = self.canvas.maxIndex;
					if(type == "prev") index--;
					else if(type == "next") index++;
					if(index < 0) index = 0;
					else if(index > maxIndex) index = maxIndex;
					const isChanged = (index != self.canvas.index);
					self.canvas.index = index;
					button.forEach(item => {
						item.classList.remove("focus");
					});
					if(index - 1 >= 0) button[0].classList.add("focus");
					else if(index + 1 < maxIndex) button[1].classList.add("focus");
					if(isChanged) setDraw();
				};
				button.forEach(item => {
					item.addEventListener("click", function() {updateButton(this)});
				});
				updateButton();
			};
			setCanvas();
			setButton();
			setDraw();
		},
	}
};

</script>

<?php } else if (isset($_SERVER['REQUEST_URI'])) { 



} ?>

<?php
include_once(G5_THEME_PATH.'/tail.php');