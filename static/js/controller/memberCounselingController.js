const memberCounselingController = {
	common : function(command, data) {
		data = JSON.stringify(data);
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member-counseling/ajax/" + command,
				type		: "post",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
				data 		: data,
				success 	: function(data) {
					if(data.result == "SUCCESS" || data.resultCode == "000")
    	                resolve(data);
					else
						reject(data);
				},
				error		: function(data) {
					reject(data);
				},
				beforeSend	: uiBlock,
				complete	: uiUnblock
			});
		});
	},
	
	update : function(data) {
		return this.common("update", data);
	},
	
	insert : function(data) {
		return this.common("insert", data);
	},
	
	delete : function(data) {
		return this.common("delete", data);
	},
	
	select : function(data) {
		return this.common("select", data);
	},
	
	selectMore : function(data) {
		return this.common("selectMore", data);
	}
}