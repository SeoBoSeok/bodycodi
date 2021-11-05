/**
 * barcode scanner worker
 */

 const BarcodeCore = function(){
	this.getBarcodeNum = function(barcode){
		defineCurrentLocation(barcode);
	},
	defineCurrentLocation = function(barcode){
		const curPath = location.pathname;
		if(curPath == "/manager/checkin/index") {
			checkinWithBarcodeNum(barcode);
		} else if (curPath == "/checkin") {
			checkinWithBarcodeNum(barcode);
		} else {
			if(typeof popupBarcode != "undefined") {
				if(popupBarcode.barcode)
					popupBarcode.barcode.value = barcode;
			}
			if(typeof popupRegisterMember != "undefined") {
				if(popupRegisterMember.barcode)
					popupRegisterMember.barcode.value = barcode;
			}
		}
	}
	,this.updateMemberSetEntranceBarcode = function(barcode,seqMember,cbFunc){
		const data = { };
		data.entranceBarcode = barcode;
		data.seqMember = seqMember;
		data.seqPartner = partnerId;
		$.ajax({
			type : 'POST',
			contentType : 'application/json; charset=UTF-8',
			url : '/member/ajax/updateMemberSetEntranceBarcode',
			data : JSON.stringify(data),
			dataType : 'json',
			success : function(resultData) {
				callBackToCaller(cbFunc,null,resultData);
			},
			statusCode : {
				400 : function(data){
					callBackToCaller(cbFunc,'이미 등록된 카드입니다.');
				}
			},
			error : function(data) {
				console.trace(data);
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
	this.deleteMemberSetEntranceBarcode = function(seqMember,cbFunc){
		const data = { };
		data.entranceBarcode = "";
		data.seqMember = seqMember;
		data.seqPartner = partnerId;
		$.ajax({
			type : 'POST',
			contentType : 'application/json; charset=UTF-8',
			url : '/member/ajax/deleteMemberSetEntranceBarcode',
			data : JSON.stringify(data),
			dataType : 'json',
			success : function(resultData) {
				callBackToCaller(cbFunc,null,resultData);
			},
			statusCode : {
				400 : function(data){
					callBackToCaller(cbFunc,'바코드 정보 삭제에 실패했습니다.');
				}
			},
			error : function(data) {
				console.trace(data);
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
	callBackToCaller = function(target,errLog,...args){
		if (typeof target === 'function') {
			try {
				let resArgs = [];
				if(typeof args != 'undefined'){
					for(let i in args){
						resArgs.push(args[i]);
					}
				}
				target(errLog,resArgs);
			} catch (ex) {
				alert('작업 중 에러가 발생하였습니다.');
				console.trace(ex);
			}
		}
	}

}

const barcodeCore = new BarcodeCore();
