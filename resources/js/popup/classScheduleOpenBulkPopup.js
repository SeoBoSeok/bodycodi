const classScheduleOpenBulkPopup = {
	$templateSeletor : '',
	spaces : '',
	classSchedules : '',


	setSpaces(spaces) {
		this.spaces = spaces;
	},

	setClassSchedules(classSchedules) {
		this.classSchedules = classSchedules;
	},

	setTemplateSeletor(templateSeletor) {
		this.$templateSeletor = $(templateSeletor);
	},

	open(startDt, endDt, seqPartnerSpaces) {
		Promise.all([
			schedulePopup.setPlace(),
			this.search(startDt, endDt, seqPartnerSpaces)
		]).then(([spaces, classSchedules]) => {
			this.setSpaces(spaces);
			this.setClassSchedules(classSchedules);

			this.init(startDt, endDt, seqPartnerSpaces);
		});
	},

	close() {
		this.$templateSeletor.fadeOut(300, function() {
			classScheduleOpenBulkPopup.$templateSeletor.remove();
			schedulePopup.resetReload();
		});
	},


	init(startDt, endDt, seqPartnerSpaces) {
		const $popupLocation = $('[data-popup-location="팝업 위치"]');
		$popupLocation.append(this.template.render());
		this.setTemplateSeletor(this.template.getSelectorSource());
		this.$templateSeletor.find('[name="startDt"], [name="endDt"]').datepicker({
			dateFormat : 'yy-mm-dd',
			firstDay : 1,
			defaultDate : new Date()
		});


		this.$templateSeletor.find('[name="startDt"]').val(dhtmlSchedulerUtil.date_to_str.YYMMDD(startDt));
		this.$templateSeletor.find('[name="endDt"]').val(dhtmlSchedulerUtil.date_to_str.YYMMDD(endDt));
		seqPartnerSpaces.map(e => {
			this.$templateSeletor.find('[name="spaceList"]').val(e).prop('selected', 'selected');
		});
		this.$templateSeletor.find('[name="spaceList"]').SumoSelect({
			placeholder : '장소를 선택해주세요',
			csvDispCount : 3,
			captionFormat : '{0}개 선택',
			captionFormatAllSelected : '모두 선택',
			selectAll : true
		});


		this.$templateSeletor.fadeIn(300);
		this.setInitEvent();
		popHeight();
	},


	setInitEvent() {
		this.$templateSeletor.find('[data-action="toggleAll-on-off"]').click(() => {
			if (this.$templateSeletor.find('[name="selectAll"]').is(':checked')) {
				this.$templateSeletor.find('[name="openYn"]').prop('checked', true);
			} else {
				this.$templateSeletor.find('[name="openYn"]').prop('checked', false);
			}
		});


		this.$templateSeletor.find('[data-action="update"]').click(() => {
			const data = this.$templateSeletor.find('[name="openYn"]').get().map(e => {
				return {
					seqPartnerClassSchedule : $(e).val(),
					openYn : $(e).is(':checked') ? 'Y' : 'N'
				}
			});

			this.updatesOpen(data);
		});


		this.$templateSeletor.find('[data-action="search"]').click(() => {
			const startDt = moment(this.$templateSeletor.find('[name="startDt"]').val());
			const endDt = moment(this.$templateSeletor.find('[name="endDt"]').val());

			if (endDt.diff(startDt, 'days') < 0) {
				alert('검색 종료일은 시작일보다 이를 수 없습니다.');
				return false;
			}

			if (endDt.diff(startDt, 'days') >= 92) {
				alert('검색 기간은 최대 92일(3개월)입니다.');
				return false;
			}

			const seqPartnerSpace = this.$templateSeletor.find('[name="spaceList"]').val();
			this.searchAndDisplay(moment(startDt), moment(endDt), seqPartnerSpace);
		});


		this.$templateSeletor.find('[data-action="close"]').click(() => {
			this.close();
		});
	},


	searchAndDisplay(startDt, endDt, seqPartnerSpace) {
		this.search(startDt, endDt, seqPartnerSpace).then((classSchedules) => {
			this.setClassSchedules(classSchedules);

			const $renderArea = this.$templateSeletor.find('[data-render-area="classSchedules"]');
			$renderArea.empty();
			$renderArea.append(this.template.renderClassSchedules());
			popHeight();
		});
	},


	updatesOpen(data) {
		ClassScheduleController.updatesOpen(data).then(() => {
			this.close();
		});
	},


	search(startDt, endDt, seqPartnerSpaces) {
		return ClassScheduleController.findAllByPartnerInRangeAndSpaces({
			classScheduleDto : {
				startDt : startDt,
				endDt : endDt
			},
			seqPartnerSpaces : seqPartnerSpaces
		});
	},


	template : {
		_templateName : 'data-popup',
		_templateValue : 'classScheduleOpenBulkPopupTemplate',

		getSelectorSource() {
			return `[${this._templateName}="${this._templateValue}"]`;
		},

		render() {
			return `
				<div class="popup pop_white" ${this._templateName}=${this._templateValue}>
					<div class="box" style="width: 750px !important;">
						<h2>수업 공개</h2>
						<div class="pop_con">
							<div class="state_box">
								<fieldset>
									<p>
										<span class="mr_30">
											<span class="label" style="width: 70px;">수업 기간</span>
											<span class="date_set">
												<input class="calendar" type="text" name="startDt">
												<span>-</span>
												<input class="calendar" type="text" name="endDt">
											</span>
										</span>
										<span>
											<span class="label" style="width: 40px;">장소</span>
											<span class="date_set">
												<select name="spaceList" data-render-area="space" multiple="multiple"
														title="장소" style="min-width: 200px">
													${this.renderSpace()}
												</select>
											</span>
										</span>
										<button type="button" class="btn green ml_20" data-action="search">검색</button>
									</p>
								</fieldset>
							</div>

							<hr style="border: 1px dashed #ccc; margin: 15px 0;">

							<div class="table_area height_add">
								<table>
									<thead>
										<tr>
											<th style="width: 90px" class="tb_left">
												<span class="ct_setting mt_20">
													<span class="use_check">
														<input type="checkbox" id="classSchedule-openYn" name="selectAll"
																data-action="toggleAll-on-off">
														<label for="classSchedule-openYn"></label>
													</span>
												</span>
											</th>
											<th style="width: 100px">수업 일시</th>
											<th style="width: 100px">수업 이름</th>
											<th style="width: 100px">담당 강사</th>
											<th style="width: 100px">장소</th>
										</tr>
									</thead>
									<tbody data-render-area="classSchedules">
										${this.renderClassSchedules()}
									</tbody>
								</table>
							</div>
						</div>
						<div class="pop_btn">
							<button type="button" class="btn gray" data-action="close">취소</button>
							<button type="button" class="btn blue" data-action="update">저장</button>
						</div>

						<a href="#" class="close" data-action="close">팝업 닫기</a>
					</div>
				</div>
			`;
		},


		renderSpace() {
			const dataHtml = classScheduleOpenBulkPopup.spaces.map(value => {
				return `<option value="${value.key}">${value.label}</option>`;
			});

			return dataHtml.join('');
		},


		renderClassSchedules() {
			if (classScheduleOpenBulkPopup.classSchedules.length === 0) {
				return `<tr><td class="tb_center" colspan="5">수업이 없습니다</td></tr>`;
			}

			const dataHtml = classScheduleOpenBulkPopup.classSchedules.map(value => {
				return `
					<tr>
						<td class="tb_left">
							<span class="ct_setting mt_20">
								<span class="use_check">
									<input type="checkbox" name="openYn" ${value.openYn === 'Y' ? 'checked' : ''}
											id="classSchedule-openYn-${value.seqPartnerClassSchedule}"
											value="${value.seqPartnerClassSchedule}">
									<label for="classSchedule-openYn-${value.seqPartnerClassSchedule}"></label>
								</span>
							</span>
						</td>
						<td>
							${moment(value.startDt).format('YYYY-MM-DD(ddd)')}
							${moment(value.startTime, 'hh:mm:ss').format('HH:mm')}
						</td>
						<td>${value.lessonName}</td>
						<td>${(value.coach) ? value.coach.coachName : "-"}</td>
						<td>${(value.space) ? value.space.spaceName : "-"}</td>
					</tr>`;
			});

			return dataHtml.join('');
		}
	}
};
