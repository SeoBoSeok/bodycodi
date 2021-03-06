$(function() {
	settingScheduler = new SettingScheduler();
	$(document).on('click', '[data-function=settingScheduler]', function() {
		settingScheduler.open();
	});

	$(document).on('click', '.schedule_setting [data-function=close]', function() {
		settingScheduler.close();
	});

	$(document).on('click', '.schedule_setting [data-function=save]', function() {
		settingScheduler.save();
	});


	$('.schedule_setting [data-function=sortCoachList]').sortable({ items: '[data-function=sortable]', distance: 10 });
	$(document).on('click', '.schedule_setting [data-function=sortCoachList] button', function() {
	    var btn = $(this);
	    var val = btn.val();
	    if (val == 'up')
	        moveUp(btn.parents('[data-function=sortable]'));
	    else
	        moveDown(btn.parents('[data-function=sortable]'));
	});

	$(document).on("click", "[data-function=configScheduler]", function() {
		popupConfigScheduler.open();
	});
});


var SettingScheduler = function() {
	this.template = $('.schedule_setting'),
	this.data,

	this._init = function(data) {
		this.data = data;
	}

	this.open = function() {
		this.selectData(function(context, returnData) {
			context._init(returnData);
			context.displayData();

			context.template.fadeIn(300);
			popHeight();
		});
	},

	this.close = function() {
		this.template.fadeOut(300);
	},

	this.selectData = function(cbFunc) {
		$.ajax({
			type: 'POST',
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			dataType: 'json',
			url: '/partner/selectScheduleSetting.php',
			context: this,
			success: function (returnData) {
				if (typeof cbFunc === 'function') {
					cbFunc(this, returnData);
				}
			}
		});
	},

	this.save = function() {
		var coachSortOrderArr = [];
		$(this.template).find('input[name="coachSortOrder"]').each(function(k, v) {
			coachSortOrderArr.push(Number($(v).val()));
		});


		var coachSortOrder = JSON.stringify(coachSortOrderArr);
		coachSortOrder = coachSortOrder.substring(1, coachSortOrder.length -1);

		var params = {
			defaultScheduler : $(this.template).find('[name=defaultScheduler]:checked').val(),
			schedulerStartTime : $(this.template).find('[name=startTimeHour]').val() + ':' + $(this.template).find('[name=startTimeMinute]').val(),
			schedulerEndTime : $(this.template).find('[name=endTimeHour]').val() + ':' + $(this.template).find('[name=endTimeMinute]').val(),
			defaultGroupSpace : $(this.template).find('[name=defaultGroupSpace]').val(),
			coachSortOrder : coachSortOrder
		}

		if(getNumber(params.schedulerStartTime) > getNumber(params.schedulerEndTime)) {
			alert("?????? ??????????????? ???????????? ?????? ?????? ??? ????????????.");
			return;
		}

		if(!params.defaultGroupSpace) {
			params.defaultGroupSpace = 0;
		}
		/*
		if(!params.defaultGroupSpace) {
			alert("?????? ?????? ?????? ????????? ????????? ?????????.");
			return;
		}
		*/

		const completeUrl = (params.defaultScheduler == "class") ?
			"/manager/schedule/class" : "/manager/schedule/promise";

		$.ajax({
			type: 'POST',
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			dataType: 'json',
			url: '/partner/insertScheduleSetting',
			data: params,
			success: function(returnData) {
				if (returnData.RESULT === 'SUCCESS') {
					alert(returnData.RESULT_MSG);
					settingScheduler.close();
					window.location.reload(true);
				} else {
					alert(returnData.RESULT_MSG);
				}
			},
			error: function() {
				alert('????????? ?????????????????????.');
			},
			beforeSend : function(xhr) {
				$.blockUI({
					message : '<h5 style="padding-top: 15px">??????????????????...</h5>',
					css : {
						'height' : '50px',
						'z-index' : 2010
					}
				});
			},
			complete : function(xhr, textStatus) {
				$.unblockUI();
			}
		});
	},

	this.displayData = function() {
		$(this.template).find('[name=defaultScheduler][value=' + this.data.partnerInfo.defaultScheduler + ']').prop('checked', true);

		var startTimeArr = this.data.partnerInfo.schedulerStartTime.split(':');
		var endTimeArr = this.data.partnerInfo.schedulerEndTime.split(':');

		$(this.template).find('[name=startTimeHour]').val(startTimeArr[0]);
		$(this.template).find('[name=startTimeMinute]').val(startTimeArr[1]);
		$(this.template).find('[name=endTimeHour]').val(endTimeArr[0]);
		$(this.template).find('[name=endTimeMinute]').val(endTimeArr[1]);

		$(this.template).find('[name=defaultGroupSpace]').empty();
		$(this.template).find('[name=defaultGroupSpace]').append(`<option value="0">??????</option>`);
		$.each(this.data.spaceList, function(k, v) {
			$('[name=defaultGroupSpace]').append('<option value="' + v.seq_partner_space + '">' + v.space_name + '</option>');
		});
		$(this.template).find('[name=defaultGroupSpace]').val(this.data.partnerInfo.defaultGroupSpace);

		$('.table_area tbody').empty();
		const dataHtml = this.data.coachList.map((coach, idx) => {
			const coachTypeText = [];
			if (coach.employeeTypeCode === '-1') {
				coachTypeText.push('?????? ?????????');

			} else if (coach.employeeTypeCode === '00') {
				coachTypeText.push('?????? ?????????');

			} else {
				if (coach.position != null) {
					coachTypeText.push(coach.position.title);
				}

				if (coach.teams.length > 0) {
					coach.teams.forEach(team => {
						coachTypeText.push(team.title);
					});
				}
			}

			return `
				<tr data-function="sortable">
					<input type="hidden" name="coachSortOrder" value="${coach.seqPartnerCoach}"/>
					<td>${idx + 1}</td>
					<td><a href="/coach/${coach.seqPartnerCoach}/overview">${coach.coachName}</a></td>
					<td>${coachTypeText.join(' / ')}</td>
					<td><button value="up">??????</button><button value="down">?????????</button></td>;
				</tr>;
			`;
		});

		$(this.template).find('.table_area tbody').append(dataHtml);
	}
}


//reference::http://jsfiddle.net/P2XDc/9/
function moveUp(item) {
    var prev = item.prev();
    if (prev.length == 0)
        return;
    prev.css('z-index', 999).css('position','relative').animate({ top: item.height() }, 250);
    item.css('z-index', 1000).css('position', 'relative').animate({ top: '-' + prev.height() }, 300, function () {
        prev.css('z-index', '').css('top', '').css('position', '');
        item.css('z-index', '').css('top', '').css('position', '');
        item.insertBefore(prev);
    });
}
function moveDown(item) {
    var next = item.next();
    if (next.length == 0)
        return;
    next.css('z-index', 999).css('position', 'relative').animate({ top: '-' + item.height() }, 250);
    item.css('z-index', 1000).css('position', 'relative').animate({ top: next.height() }, 300, function () {
        next.css('z-index', '').css('top', '').css('position', '');
        item.css('z-index', '').css('top', '').css('position', '');
        item.insertAfter(next);
    });
}



const popupConfigScheduler = {
	popup : undefined,
	data : {},
	open : function() {
		if(this.popup) return;
		const data = JSON.parse(window.localStorage.getItem("configScheduler") || "{}");
		const appointmentInfo = (data.appointment) ? data.appointment : {};
		const classInfo = (data.class) ? data.class : {};
		this.data = {
			appointment : {
				hourSize : appointmentInfo.hourSize || 1,
				hourHeight : 44,
				unitCount : appointmentInfo.unitCount || 7,
				separateYn : appointmentInfo.separateYn || "N",
				titleType : appointmentInfo.titleType || 1,
				titleAlign : appointmentInfo.titleAlign || "center",

			},
			class : {
				hourSize : classInfo.hourSize || 1,
				hourHeight : 44,
				separateYn : classInfo.separateYn || "N",
				titleType : classInfo.titleType || 1,
				titleAlign : classInfo.titleAlign || "center",
			}
		};
		this.render();
	},
	close : function() {
		this.popup = uiPopup();
	},
	submit : function() {
		const form = this.popup.querySelectorAll("form");
		const data = {
			appointment : {
				hourSize : Number(form[0].querySelector("[name='hourSize']").value),
				hourHeight : 44,
				unitCount : Number(form[0].querySelector("[name='unitCount']").value),
				separateYn : form[0].querySelector("[name='separateYn']:checked").value || "N",
				titleType : Number(form[0].querySelector("[name='titleType']:checked").value),
				titleAlign : form[0].querySelector("[name='titleAlign']:checked").value,
			},
			class : {
				hourSize : Number(form[1].querySelector("[name='hourSize']").value),
				hourHeight : 44,
				separateYn : form[1].querySelector("[name='separateYn']:checked").value || "N",
				titleType : Number(form[1].querySelector("[name='titleType']:checked").value),
				titleAlign : form[1].querySelector("[name='titleAlign']:checked").value,
			}
		};
		window.localStorage.setItem("configScheduler", JSON.stringify(data));
		window.location.reload(true);
	},
	render : function() {
		this.popup = uiPopup({
			template : this.template(),
			event : {
				click : {
					close : () => {this.close();},
					submit : () => {this.submit();}
				}
			}
		});
		this.preset();
		uiTab(this.popup);
	},
	preset : function() {
		const form = this.popup.querySelectorAll("form");
		["appointment", "class"].forEach((item, index) => {
			const data = this.data[item];
			const putValue = (name, value) => {
				const node = form[index].querySelector("[name='" + name + "']");
				if(node) {
					switch(node.type) {
						case "radio"	:
							const input = form[index].querySelector("[name='" + name + "'][value='" + value + "']");
							if(input) input.checked = true;
							break;
						case "checkbox"	:
							node.checked = (value == "Y");
							break;
						default			:
							node.value = value;
							break;
					}
				}
			};
			for(let name in data) {
				const value = data[name];
				putValue(name, value);
			}
		});
		const serviceType = scheduleList.serviceType || "appointment";
		const input = this.popup.querySelector("[name='tab'][value='" + serviceType + "']");
		this.popup.querySelector("[name='tab'][value='" + serviceType + "']").checked = true;
		form[(serviceType == "appointment") ? 0 : 1].parentNode.classList.add("focus");
	},
	template : function() {
		return `
			<style type="text/css">
				.popupConfigScheduler											{max-width:640px}
				.popupConfigScheduler .middle label,
				.popupConfigScheduler .middle .ui-select						{cursor:pointer}
				.popupConfigScheduler .middle .ui-select.wide					{width:100%; max-width:100%}
				.popupConfigScheduler .middle .ui-tab							{margin-bottom:15px}
				.popupConfigScheduler .middle .tab								{display:none}
				.popupConfigScheduler .middle .tab.focus						{display:block}
				.popupConfigScheduler .middle td ul								{font-size:inherit}
				.popupConfigScheduler .middle td ul li							{display:block}
				.popupConfigScheduler .middle td ul li + li						{border:none}
			</style>
			<div class="popupConfigScheduler">
				<div class="top">
					<h2>
						???????????? ?????? ??????
						<a data-event="close"></a>
					</h2>
				</div>
				<div class="middle ui-form">
					<div class="ui-tab">
						<ul>
							<li><label><input name="tab" type="radio" value="appointment"><div>????????????</div></label></li>
							<li><label><input name="tab" type="radio" value="class"><div>????????????</div></label></li>
						</ul>
					</div>
					<div class="tab tab-1">
						<form>
							<table>
								<tr>
									<th>
										????????? ?????? ??????
									</th>
									<td>
										<select class="ui-select" name="hourSize">
											<option value="">??????</option>
											<option value="1" selected>??????</option>
											<option value="1.5">1.5???</option>
											<option value="2">2???</option>
											<option value="2.5">2.5???</option>
											<option value="3">3???</option>
										</select>
										<p class="ui-note">
											??????????????? ????????? ????????? ???????????? ??? ????????????.
										</p>
									</td>
								</tr>
								<tr>
									<th>
										????????? ?????? ??????
									</th>
									<td>
										<ul>
											<li>
												<label class="ui-input-radio">
													<input name="titleType" type="radio" value="1" checked>
													<span></span>
													?????????
												</label>
												<label class="ui-input-radio">
													<input name="titleType" type="radio" value="2">
													<span></span>
													????????? + ????????????
												</label>
												<label class="ui-input-radio">
													<input name="titleType" type="radio" value="3">
													<span></span>
													????????? + ?????????
												</label>
											</li>
											<li>
												<label class="ui-input-radio">
													<input name="titleAlign" type="radio" value="left">
													<span></span>
													?????? ??????
												</label>
												<label class="ui-input-radio">
													<input name="titleAlign" type="radio" value="center" checked>
													<span></span>
													????????? ??????
												</label>
												<label class="ui-input-radio">
													<input name="titleAlign" type="radio" value="right">
													<span></span>
													????????? ??????
												</label>
											</li>
										</ul>
										<p class="ui-note">
											????????? ????????? ???????????? ????????? ???????????? ??? ????????????.
										</p>
									</td>
								</tr>
								<tr>
									<th>
										????????? ?????? ??????
									</th>
									<td>
										<label class="ui-input-radio">
											<input name="separateYn" type="radio" value="N" checked>
											<span></span>
											?????????
										</label>
										<label class="ui-input-radio">
											<input name="separateYn" type="radio" value="Y">
											<span></span>
											??????
										</label>
										<p class="ui-note">
											???????????? ???????????? ???????????? ?????? ???????????? ??????, ???????????? ????????? ???????????????.
										</p>
									</td>
								</tr>
								<tr>
									<th>?????? ?????? ??? ??????</th>
									<td>
										<select class="ui-select" name="unitCount">
											<option value="">??????</option>
											<option value="7" selected>7???</option>
											<option value="6">6???</option>
											<option value="5">5???</option>
											<option value="4">4???</option>
											<option value="3">3???</option>
											<option value="2">2???</option>
											<option value="1">1???</option>
										</select>
										<p class="ui-note">
											?????????????????? ????????? ???????????? ?????? ??? ?????????.
										</p>
									</td>
								</tr>
							</table>
						</form>
					</div>
					<div class="tab tab-2">
						<form>
							<table>
								<tr>
									<th>
										????????? ?????? ??????
									</th>
									<td>
										<select class="ui-select" name="hourSize">
											<option value="">??????</option>
											<option value="1" selected>??????</option>
											<option value="1.5">1.5???</option>
											<option value="2">2???</option>
											<option value="2.5">2.5???</option>
											<option value="3">3???</option>
										</select>
										<p class="ui-note">
											??????????????? ????????? ????????? ???????????? ??? ????????????.
										</p>
									</td>
								</tr>
								<tr>
									<th>
										????????? ?????? ??????
									</th>
									<td>
										<ul>
											<li>
												<label class="ui-input-radio">
													<input name="titleType" type="radio" value="1" checked>
													<span></span>
													?????????
												</label>
												<label class="ui-input-radio">
													<input name="titleType" type="radio" value="2">
													<span></span>
													?????????
												</label>
												<label class="ui-input-radio">
													<input name="titleType" type="radio" value="3">
													<span></span>
													????????? + ?????????
												</label>
												<label class="ui-input-radio">
													<input name="titleType" type="radio" value="4">
													<span></span>
													????????? + ?????????
												</label>
											</li>
											<li>
												<label class="ui-input-radio">
													<input name="titleType" type="radio" value="5">
													<span></span>
													????????? + ????????????
												</label>
											</li>
											<li><hr style="margin:5px 0"></li>
											<li>
												<label class="ui-input-radio">
													<input name="titleAlign" type="radio" value="left">
													<span></span>
													?????? ??????
												</label>
												<label class="ui-input-radio">
													<input name="titleAlign" type="radio" value="center" checked>
													<span></span>
													????????? ??????
												</label>
												<label class="ui-input-radio">
													<input name="titleAlign" type="radio" value="right">
													<span></span>
													????????? ??????
												</label>
											</li>
										</ul>
										<p class="ui-note">
											????????? ????????? ???????????? ????????? ???????????? ??? ????????????.
										</p>
									</td>
								</tr>
								<tr>
									<th>
										????????? ?????? ??????
									</th>
									<td>
										<label class="ui-input-radio">
											<input name="separateYn" type="radio" value="N" checked>
											<span></span>
											?????????
										</label>
										<label class="ui-input-radio">
											<input name="separateYn" type="radio" value="Y">
											<span></span>
											??????
										</label>
										<p class="ui-note">
											???????????? ???????????? ???????????? ?????? ???????????? ??????, ???????????? ????????? ???????????????.
										</p>
									</td>
								</tr>
							</table>
						</form>
					</div>
					<p class="ui-note red">
						?????? ????????? ????????? ????????? ?????? ?????? ?????? ??????????????? ????????????,
						???????????? ?????? ??? <span class="red">??????????????? ?????? ????????????, ????????? ????????? ?????????</span>?????????. (?????? ??????????????? ???????????????.)
					</p>
				</div>
				<div class="bottom">
					<button class="ui-button gray" data-event="close">??????</button>
					<button class="ui-button green" data-event="submit">??????</button>
				</div>
			</div>
		`;
	}
};
