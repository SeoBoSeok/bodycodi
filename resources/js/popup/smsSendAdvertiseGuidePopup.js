const smsSendAdvertiseGuidePopup = {
	open() {
		const $template = $(this.prepareTemplate());
		this._bindEvent($template);

		$('[data-popup-location="팝업 위치"]').append($template);
		$template.fadeIn(300);
		popHeight();
	},


	_bindEvent($template) {
		$template.find('[data-action="close"]').on({
			click : () => {
				$template.fadeOut(300, () => {
					$template.remove();
				});
			}
		});
	},


	prepareTemplate() {
		return `
			<div class="popup" style="z-index: 1050;">
				<div class="box" style="width: 800px !important; overflow: hidden; word-break: keep-all;">
					<h2>광고문자 전송 가이드</h2>
					<div class="pop_con" style="font-size: 15px; line-height: 1.5;">
						<h3>
							<span style="color: #00c6b5;">광고문자</span>를 전송하실 경우에는 <span style="color: #00c6b5;">반드시 아래 내용이 포함</span>되어야 합니다.
						</h3>

						<div style="border: 1px solid darkgray; border-radius: 10px; padding: 15px;">
							<div style="display: inline-block; text-align: center; border: 1px solid #ccc; border-radius: 20px; width: 270px; height: 400px; margin-right: 20px; font-size: 20px; font-weight: bold;">
								<div style="margin: 10px 0; font-size: initial;">4월 16일(목) 오전 9:30</div>
								<div style="background-color: #eeeeee; width: 90%; margin: 0 auto; height: 340px; padding: 10px; border-radius: 5px;">
									<div style="position: relative; height: 300px;">
										<div>① (광고) + ② 발송자정보</div>
										<div style="margin: 10px 5px 15px; height: 80%; padding-top: 40%;">문자내용</div>
									</div>
								</div>
							</div>

							<div style="display: inline-block">
								<div>
									<p style="font-size: 20px;"><strong>① 광고임을 표시</strong></p>
									<div style="margin-left: 20px;">[광고], &lt;광고&gt;, 광고 및 기타 특수기호 사용(<span class="c_red">X</span>)</div>
								</div>
								<div style="margin: 15px 0;">
									<p style="font-size: 20px;"><strong>② 어떤 제품/서비스인지 표시</strong></p>
									<div style="margin-left: 20px;">
										<div style="margin-bottom: 10px">
											<strong>회사명, 브랜드명, 서비스명 등 입력</strong>
											<br/>
											개인의 경우 회사명 또는 판매하는 제품의 브랜드 입력
											<br/>
											- 홍길동 (<span class="c_red">X</span>)
											<br/>
											- 삼성카드 홍길동 (<span style="color: #00c6b5;">O</span>)
											<br/>
										</div>
										<div style="margin-bottom: 10px">
											<strong>(광고) 뒤에 발송자정보 바로 나와야 함</strong>
											<br/>
											- (광고)안녕하세요? 스타벅스성수점입니다. (<span class="c_red">X</span>)
											<br/>
											- (광고)스타벅스성수점 안녕하세요? (<span style="color: #00c6b5;">O</span>)
											<br/>
										</div>
										<div style="margin-bottom: 10px">
											<strong>하나의 발송자정보를 다양하게 표현할 경우 전부 등록</strong>
											<br/>
											- 스타벅스성수점, 성수역스타벅스, 스타벅스코리아 등
										</div>
									</div>
								</div>
							</div>
						</div>

						<div>
							<div style="margin: 15px">
								<h3 style="color: #00c6b5;">어떤 피해가 발생하나요?</h3>
								<strong>광고 표기 미준수 시 수신자에게 전달되지 않고 발송실패됩니다.
								<br/>
								가이드 미준수로 발송 실패 및 제한되는 피해가 발생하고 있으니 반드시 해당 문구를 입력하신 후 보내시기 바랍니다.</strong>
								<ul>
									<li>* 불법스팸 문자는 가이드 준수와 상관없이 발송제한 됩니다.</li>
									<li>* 발송제한된 전화번호는 향후에도 사용하실 수 없습니다.</li>
								</ul>
							</div>
							<div style="margin: 15px">
								<h3 style="color: #00c6b5;">광고문자란?</h3>
								매장 또는 웹사이트 등 업체의 방문을 유도하는 모든 문자를 광고문자라고 합니다.
							</div>
						</div>
					</div>
					<div class="pop_btn">
						<button data-action="close" class="btn gray">닫기</button>
					</div>
					<a class="close" data-action="close">팝업 닫기</a>
				</div>
			</div>
		`;
	}
};
