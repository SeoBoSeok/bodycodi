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
			url: '/partner/selectScheduleSetting',
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
			alert("수업 시작시간은 종료시간 보다 작을 수 없습니다.");
			return;
		}

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
				alert('오류가 발생하였습니다.');
			},
			beforeSend : function(xhr) {
				$.blockUI({
					message : '<h5 style="padding-top: 15px">로딩중입니다...</h5>',
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
		$.each(this.data.spaceList, function(k, v) {
			$('[name=defaultGroupSpace]').append('<option value="' + v.seq_partner_space + '">' + v.space_name + '</option>');
		});
		$(this.template).find('[name=defaultGroupSpace]').val(this.data.partnerInfo.defaultGroupSpace);

		$('.table_area tbody').empty();
		const dataHtml = this.data.coachList.map((coach, idx) => {
			const coachTypeText = [];
			if (coach.employeeTypeCode === '-1') {
				coachTypeText.push('기본 관리자');

			} else if (coach.employeeTypeCode === '00') {
				coachTypeText.push('대표 관리자');

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
					<td><a href="/coach/view?cn=${coach.seqPartnerCoach}">${coach.coachName}</a></td>
					<td>${coachTypeText.join(' / ')}</td>
					<td><button value="up">위로</button><button value="down">아래로</button></td>;
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
