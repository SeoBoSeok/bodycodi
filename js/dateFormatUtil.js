String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};
Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var shortWeekName = ["일", "월", "화", "수", "목", "금", "토"];
    var d = this;
     
    return f.replace(/(yyyy|yy|sM|MM|sd|dd|E|sE|sh|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "sM": return (d.getMonth() + 1);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "sd": return d.getDate();
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "sE": return shortWeekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "sh": return ((h = d.getHours() % 12) ? h : 12);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};


Number.prototype.weekName = function() {
	if (!(0 <= this && this <= 6)) {
		return false;
	}
	
	var weekNameArr = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
	return weekNameArr[this];
};


// 두 날짜 사이의 간격 가져오기(날짜 포맷은 yyyy-MM-dd)
var getUsingTerm = function(startDt, endDt) {
	var startDtSplit = startDt.split('-');
	var startDate = new Date(startDtSplit[0], startDtSplit[1] - 1, startDtSplit[2]);

	var endDtSplit = endDt.split('-');
	var endDate = new Date(endDtSplit[0], endDtSplit[1] - 1, endDtSplit[2]);

	var currDay = 24 * 60 * 60 * 1000;
	var usingTerm = Math.ceil((endDate - startDate) / currDay);

	return usingTerm;
};


function convertDate(target, format, defaultValue) {
	if (target === undefined || target === '') return defaultValue;
	return  new Date(target).format(format);
}


function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}