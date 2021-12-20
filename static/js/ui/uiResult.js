function uiResult(resultData) {
	this.result = resultData.RESULT;
	this.resultCode = resultData.RESULT_CODE;
	this.resultMsg = resultData.RESULT_MSG;
}

uiResult.prototype.isSuccess = function() {
	return this.result === 'SUCCESS' && this.resultCode === '000';
};

uiResult.prototype.isErrOfUseWeekOver = function() {
	return this.resultCode === '-991';
};

uiResult.prototype.isErrOfUseDayOver = function() {
	return this.resultCode === '-983';
};

uiResult.prototype.isErrOfUseWeekAndDayOver = function() {
	return this.resultCode === '-997';
};

uiResult.prototype.isErrOfUseLimitOver = function() {
	return (this.resultCode === '-983' || this.resultCode === '-991' || this.resultCode === '-997');
};

uiResult.prototype.isErrOfSpace = function() {
	return this.resultCode === '-992';
};

uiResult.prototype.getMsgForCustomer = function() {
	let msg = '';
	switch (this.resultCode) {
		case '000' :
			msg = '성공하였습니다.';
			break;
		case '100' :
			msg = '작업 중 오류가 발생했습니다.';
			break;
		case '110' :
			msg = '필수 파라메터가 부족합니다.';
			break;
		case '120' :
			msg = '결과값이 없습니다.';
			break;
		case '130' :
			msg = '허용되지 않는 작업입니다.';
			break;
		case '1401' :
			msg = '결제 이력이 없는 이용권입니다.';
			break;
		case '1402' :
			msg = '취소 처리한 결제의 이용권입니다.';
			break;
		case '1403' :
			msg = '환불 처리한 결제의 이용권입니다.';
			break;
		case '1404' :
			msg = '양도한 결제의 이용권입니다.';
			break;
		case '-970' :
			msg = '변경할 수 없는 스케줄 시간입니다.';
			break;
		case '-971' :
			msg = '예약할 수 없는 스케줄 시간입니다.';
			break;
		case '-972' :
			msg = '휴일입니다.';
			break;
		case '-983' :
			msg = '일일 이용 가능 횟수 제한에 도달했습니다.';
			break;

		case '-984' :
			msg = '정원 마감된 수업입니다.';
			break;
		case '-986' :
			msg = '스케줄에 오류가 있습니다.';
			break;
		case '-987' :
			msg = '중지된 회원권입니다.';
			break;
		case '-988' :
			msg = '이용권의 잔여 횟수가 부족합니다.';
			break;
		case '-989' :
			msg = '회원이 시간대가 겹치는 예약이 있습니다.';
			break;
		case '-990' :
			msg = '코치가 시간대가 겹치는 예약이 있습니다.';
			break;
		case '-991' :
			msg = '주간 이용 가능 횟수 제한에 도달했습니다.';
			break;
		case '-992' :
			msg = '장소 이용 인원이 부족합니다.'
			break;
		case '-993' :
			msg = '강사의 스케줄이 유효하지 않습니다.';
			break;
		case '-996' :
			msg = '이용권의 사용 기간이 아닙니다.';
			break;
		case '-997' :
			msg = '주간 및 일일 횟수 제한에 도달했습니다.';
			break;
		default :
			msg = '정의되지 않는 오류가 발생했습니다.';
	}

	return msg;
};
