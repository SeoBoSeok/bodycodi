const dhtmlSchedulerUtil = {
	date_to_str : {
		YYMMDD(date) {
			const formatFuncYYMMDD = scheduler.date.date_to_str('%Y-%m-%d');
			return formatFuncYYMMDD(date);
		}
	}
};
