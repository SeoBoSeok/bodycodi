/**
 *
 */
`use strict`

const PrinterCore = function(){
	this.successMsgPostfix = "님이 출석하였습니다.",

	this.getEntrancefailMsg = function(rawMsg){
		switch(rawMsg){
		case 'noProduct':
			return "님이 존재하지 않는 상품으로 입장시도를 하였습니다.";
		case 'startAfterCurrent':
			return "님이 이미 진행중인 일정의 상품으로 입장시도를 하였습니다.";
		case 'endBeforeCurrent':
			return "님이 이미 종료된 상품으로 입장시도를 하였습니다.";
		case 'outOfCount':
			return "님이 이용가능 횟수가 없는 상태로 입장시도를 하였습니다.";
		case 'noReEntrance':
			return "님이 재 입장을 허용하지 않는 상품 으로 입장시도를 하였습니다.";
		case 'alreadyEntrance':
			return "님이 이미 입장되어있는 상태에서 입장시도를 하였습니다.";
		case 'useWeekOver':
			return "님이 입장시도를 하였으나, 상품의 주간 입장 가능한 횟수를 초과되었습니다.";
		case 'alreadyEntranceSchedule':
			return "님이 이미 출석 처리된 수업에 입장시도를 하였습니다.";
		case 'paused':
			return "님이 입장시도를 하였으나, 사용 중지 회원입니다.";
		case 'noProductUsage':
			return "님이 이용권이 없는상태로 입장시도 하였습니다.";
		case 'alreadEnttranceStandby':
			return "님이 출석을 완료하지 않은 상태로 입장시도를 하였습니다.";
		case 'noSchedule':
			return "님, 예약내역 없음.";
		default :
			return "오류. 관리자에게 문의!";
		}
	},

	this.createPrintInfoJson = function(data,isFailure,failureMsg){
		const sendMsg = {};
		sendMsg.enterResult 		= isFailure;
		sendMsg.playSoundNumber 	= isFailure == 3 ? 2 : 4;//data.playSoundNumber; 현제는 2 / 4 로 제한시켜둡니다.
		sendMsg.msg 				= isFailure == 1 ? data.memberName + printerCore.getEntrancefailMsg(failureMsg) : data.memberName +this.successMsgPostfix ;
		sendMsg.data 				= {};
		sendMsg.data.partnerName 	= data.partnerName;
		sendMsg.data.memberEntranceDate = data.memberLastEntranceDate != null ? moment(data.memberLastEntranceDate).format('YYYY.MM.DD a hh:mm:ss') : moment().format('YYYY.MM.DD a hh:mm:ss')+'(err)';
		sendMsg.data.memberExpDate	= data.memberExpDate != null ? moment(data.memberExpDate).format('YYYY.MM.DD') : "이용권 없음" ;
		sendMsg.data.memberName 	= data.memberName;
		sendMsg.data.membershipNo	= data.membershipNo;
		sendMsg.data.lockerExpDate	= data.lockerExpDateTypeOfP != null ? moment(data.lockerExpDateTypeOfP).format('YYYY.MM.DD') : "이용 안함" ;
		const noticeStr				= data.noticeInfoExist ?  "특이사항 : "+data.noticeInfo+"\r\n------------------------------------------\r\n" : "------------------------------------------\r\n";
		sendMsg.data.product = noticeStr;

		if(data.productList){
			let productStr 				= "보유이용권\r\n";
			for(var i in data.productList){
				const startDt = moment(data.productList[i].useStartDt).format('YYYY.MM.DD') + " ~ " + moment(data.productList[i].useEndDt).format('YYYY.MM.DD');
				const remainDt =  data.productList[i].useNumberType == 'F' ? "" : "("+ data.productList[i].useNumber + "회)";
				productStr += data.productList[i].passName +" / "+ data.productList[i].remainDt +"일" + remainDt + "남음\r\n";
				const givinDt = data.productList[i].useNumberType == 'F' ? "무제한" :  data.productList[i].usePeriod+"회"  ;
				productStr += startDt+" / " +givinDt+ "\r\n\r\n";
			}
			sendMsg.data.product += productStr+"\r\n";
		}
		if(data.lockerList){
			let lockerStr = "개인락커\r\n";
			for(var i in data.lockerList){
				lockerStr += data.lockerList[i].lockerNo + "번 / ";
				lockerStr += data.lockerList[i].remainDt > -1 ? data.lockerList[i].remainDt + "일 남음 \r\n" : "이용기간 만료 \r\n";
				lockerStr += moment(data.lockerList[i].startDt).format('YYYY.MM.DD') + " ~ " + moment(data.lockerList[i].endDt).format('YYYY.MM.DD') + "\r\n";
			}
			sendMsg.data.product += lockerStr;
		}

		return sendMsg;
	},

	this.requestPrint = function(paramUri, seqMember, isFailure, failureMsg, callback){
		const myData = { memberId : seqMember, seqPartner : partnerId };
		$.ajax({
			type : 'POST',
			contentType : 'application/json; charset=utf-8',
			dataType : 'json',
			url : '/printer/req',
			data : JSON.stringify(myData),
			success : function(data) {
				const sendMsg =	printerCore.createPrintInfoJson(data,isFailure,failureMsg);
				console.log(sendMsg);
				if(typeof CallbackObject != "undefined")
					CallbackObject.userEntranceNotice(paramUri, JSON.stringify(sendMsg));
				else if(callback) callback();
			},
			statusCode : {
				400 : function(err){
					console.log('error with 400 statuscode');
				}
			},
			error : function(err) {
				console.log(err);
			}
		})
	},
	this.testPrint = function(caseNum){
		$.ajax({
			type : 'GET',
			contentType : 'application/json; charset=utf-8',
			dataType : 'text',
			url : '/printer/req/test/'+caseNum,
			success : function(data) {
				console.log("받았음");
				console.log(data);
				const paramUri = getParamUri('manager/checkin/entrance');
				CallbackObject.userEntranceNotice(paramUri, data);
			},
			statusCode : {
				400 : function(err){
					console.log('error with 400 statuscode');
				}
			},
			error : function(err) {
				console.log(err);
			}
		})
	}
};
