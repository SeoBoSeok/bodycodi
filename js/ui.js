/**
 * Project : GYM DOCTOR
 * Date : 2017.01.25
 * Author : Sinjin Lim
 */

 function getParameter(name)						{var url=window.location.href;url="&"+url.substr(url.indexOf("?")+1);var a=url.indexOf("&"+name+"=");if(a<0)return "";else var a=url.indexOf("=",a+1)+1;var b=url.indexOf("&",a);if(b==-1)b=url.length;var v=url.substring(a,b);if(v==undefined)v="";return decodeURIComponent(v);}
 function getCalendar(date)						{if(!date)date=new Date();var day=date.getDate().toString();day=(day.length<2)?"0"+day:day;var month=(date.getMonth()+1).toString();month=(month.length<2)?"0"+month:month;var year=date.getFullYear().toString();return year+"-"+month+"-"+day}
 function getNumber(value)						{return (value)?Number(value.toString().replace(/[^0-9.]/gi,"")):0;}
 function getComma(value)						{return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");}
 
 function isNumber(value)						{return /^([0-9])+$/.test(value);}
 function isMail(value)							{return /^([_0-9a-zA-Z-.]{1,32})@([_0-9a-zA-Z-]{1,32})+(\.[0-9a-zA-Z]{2,4})*(\.[0-9a-zA-Z]{2,4})$/.test(value);}
 function isPhone(value)							{return /^([0-9]{7,11})$/.test(value.replace(/-/g,""));}
 function isMobile(value)						{return /^(01[0|1|6|7|8|9]\d{7,8})$/.test(value.replace(/-/g,""));}
 function isDate(value)							{if(typeof value=="string")value=new Date(value);return value instanceof Date && !isNaN(value);}
 
 function setCookie(name,value,day)				{var date=new Date;date.setTime(date.getTime()+(day*24*60*60*1000));var expire="expires="+date.toUTCString();document.cookie=name+"="+value+";"+expire+";path=/";}
 function getCookie(name)						{var array=document.cookie.split(";");for(var i=0;i<array.length;i++){var value=array[i].split("=");value[0]=value[0].substr(value[0].indexOf(" ")+1);if(value[0]==name)return value[1];}return "";}
 
 Node.prototype.getValue = function(name, isNumber) {
     name = "[name='" + name + "']";
     const node = this.querySelector(name);
     if(!node) return "";
 
     const nodeList = this.querySelectorAll(name);
     const checkedNodeList = this.querySelectorAll(name + ":checked");
     const checkedNode = this.querySelector(name + ":checked");
 
     switch(node.type) {
         case "checkbox" :
             if(nodeList.length > 1) {
                 return Array.from(checkedNodeList).map(item => {
                     return item.value;
                 });
             } else {
                 return (checkedNodeList.length > 0) ? "Y" : "N";
             }
             break;
         case "radio" :
             return (checkedNode) ? checkedNode.value : "";
         case "number" :
             return (node.value == "") ? "" : Number(node.value);
         default :
             return (isNumber) ? ((node.value) ? getNumber(node.value) : "") : node.value;
     }
 };
 
 Node.prototype.putValue = function(name, value) {
     const node = this.querySelector("[name='" + name + "']");
     if(!node) {
         const node = this.querySelector("[data-msg='" + name + "']");
         if(!node) return;
         node.innerHTML = value;
         return;
     }
     if(value == null || value == undefined) value = "";
 
     const nodeList = this.querySelectorAll("[name='" + name + "']");
     const type = (node.tagName.toLowerCase() == "select") ? "select" : node.type;
     const isArray = (typeof value == "object") ? true : false;
     if(isArray) {
         value = value.map(item => {
             return (typeof item == "number") ? item.toString() : item;
         });
     } else
         value = value.toString();
 
     switch(type) {
         case "radio" :
         case "checkbox" :
             if(nodeList.length > 1) {
                 nodeList.forEach(item => {
                     if(isArray && value.indexOf(item.value) > -1) item.checked = true;
                     else if(item.value == value) item.checked = true;
                 });
             } else {
                 node.checked = (value == "Y" || value && value == node.value) ? true : false;
             }
             break;
 
         case "select" :
             node.querySelectorAll("option").forEach(item => {
                 if((isArray && value.indexOf(item.value) > -1) || (!isArray && item.value == value))
                     item.setAttribute("selected", "");
                 else
                     item.removeAttribute("selected");
             });
             node.value = value;
             break;
 
         default :
             node.value = value;
             break;
     }
 };
 
 
 /*=======================================================================
  * Document Ready
  =======================================================================*/
 $(function(){
 
     var currentUrl = window.location.pathname;
     if(currentUrl.indexOf("/home") != -1) {
         //$("body").ㅁㅇㅇClass("main");
     } else {
         $("body").removeClass("main");
         $("#nav").find(" > a").removeClass("active");
     }
 
     /* Navigation Event */
     $("#nav").filter(function(){
 
         //Navigation Height
         navHeight(this);
 
         var $btn = $(this).find(" > a");
 
         if ($btn.hasClass("active")) {
             $btn.next().show();
             $btn.next().find("ul").css({left : "-20px"}); // "66px"
         }
 
         $btn.click(function(){
             return true;
             var $speed = 250;
 
             if (!$btn.hasClass("active")){
                 $btn.addClass("active");
                 $btn.next().stop().fadeIn($speed, function(){
                     $(this).find("ul").stop().animate({left : "-20px"}, $speed);
                 });
 
                 $("body").css("overflow", "hidden");
             } else {
                 if (!$("body").hasClass("main")){
                     $btn.next().find("ul").stop().animate({left : "-100%"}, $speed, function(){
                         $(this).parent().fadeOut($speed);
                         $btn.removeClass("active");
                     });
                 }
                 $("body").css("overflow", "auto");
             }
             return false;
         });
 
     });
 
 
     // File Fake
     $(".file_fake").filter(function(){
         var $pathField = $(this).find("input:text");
 
         $(this).find("input:file").change(function(){
             var $file = $(this).val().replace(/^.*\\/, "");
             $pathField.val($file);
         });
     });
 
 
     // 회원 리스트 상품 영역 슬라이드 이벤트
     $(".grid_list.member").find(".product_box").filter(function(){
         var $this = $(this),
             $itm = $this.find(".pr_group"),
             $ctrBox = "ctr_box",
             $btn = "<a href='#' class='ctr_btn prev'>이전</a><a href='#' class='ctr_btn next'>다음</a>";
 
         if ($itm.size() > 1){
 
             $this.wrapInner("<div class='"+$ctrBox+"'></div>");
 
             $this.find("." + $ctrBox).filter(function(){
                 var $width = $itm.outerHeight(true),
                     $size = $itm.size();
                 $(this).height(parseInt($width * $size));
             });
 
             $this.append($btn);
             $this.find(".prev").hide();
 
             $this.addClass("after_slide");
 
             $this.find(".ctr_btn").on("click", function(){
                 var $moveItm = $this.find("." + $ctrBox),
                     $boxHeight = parseInt($moveItm.outerHeight(true)),
                     $boxTop = parseInt($moveItm.css("top")),
                     $itmHeight = parseInt($itm.outerHeight(true)),
                     $resultTop = ($boxTop + $itmHeight),
                     $chkHeight = ($boxHeight - ($itmHeight * 1)) * -1,
                     $speed = 300;
 
                 if ($(this).hasClass("next") && $resultTop > $chkHeight) {
                     if ($this.find(".prev").css("display") == "none"){
                         $this.addClass("before_slide");
                         $this.find(".prev").show();
                     }
 
                     $moveItm.not(":animated").stop().animate({top: $boxTop + ($itmHeight * -1)}, $speed, function(){
                         if (parseInt($(this).css("top")) == $chkHeight) {
                             $this.removeClass("after_slide");
                             $this.find(".next").hide();
                         }
                     });
                 }
 
                 if ($(this).hasClass("prev") && $boxTop != 0){
                     if ($this.find(".next").css("display") == "none"){
                         $this.addClass("after_slide");
                         $this.find(".next").show();
                     }
 
                     $moveItm.not(":animated").stop().animate({top : ($boxTop + $itmHeight)}, $speed, function(){
                         if ($(this).css("top") == "0px") {
                             $this.removeClass("before_slide");
                             $this.find(".prev").hide();
                         }
                     });
                 }
                 return false;
             });
         }
     });
 
 
     // 미션 수행 버튼 기능
     $(".mission_check").filter(function(){
         if ($(this).find(".form").size() > 0){
             $(this).find("> .btn").click(function(){
                 var $form = $(this).next();
                 $form.animate({bottom: 0}, 300, function(){
                     $(this).find(".btn.red").one("click", function(){
                         $form.animate({bottom: "-100%"}, 300);
                     });
                 });
                 return false;
             });
         }
     });
 
 
     /* Tooltip */
     $("html").find("*").filter(function(){
         if (typeof $title !== typeof undefined && $title !== false) {
             var $this = $(this),
                 $title = $this.attr("title"),
                 $dataTooltip,
                 $elWidth = parseInt($this.outerWidth(true)),
                 $posTop = $this.offset().top,
                 $posLeft = $this.offset().right;
 
             $(this).hover(function () {
                 $dataTooltip = $title;
                 $("body").append("<div class='tooltip'><div class='box'>"+$dataTooltip+"</div></div>");
                 $(".tooltip").css({top : $posTop, right: ($posLeft + $elWidth)});
                 $(this).removeAttr("title");
             }, function () {
                 $(this).attr("title", $dataTooltip);
                 $("body").find(".tooltip").remove();
             });
         }
     });
 
 
 
 
 
     // Window Scroll Event
     /*
     var $conScTop = 0;
 
     $("body").on("click", ".page_top", function(){
         var $speed = 600;
         $("html, body").animate({scrollTop : 0}, $speed);
         return false;
     });
 
     $(window).scroll(function(){
         var $scTop = $(this).scrollTop(),
             $headerH = parseInt($("#header").outerHeight(true)),
             $barH = parseInt($(".bar_area").outerHeight(true));
 
         if ($scTop > $conScTop){
             $("#header, #nav").hide();
             $("#contents").css("marginTop", $barH);
             $(".bar_area").addClass("fix_sc").removeAttr("style");
 
             if ($("body").find(".page_top").size() > 0){
                 $("body").find(".page_top").remove();
             }
         } else {
             $(".bar_area").css("top", $headerH);
             $("#header, #nav").show();
 
             if ($("body").find(".page_top").size() == 0){
                 $("body").append("<p class='page_top'><a href='#'>위로</a></p>")
             }
 
             if ($scTop < $headerH){
                 $("#contents").removeAttr("style");
                 $(".bar_area").removeClass("fix_sc").removeAttr("style");
                 $("body").find(".page_top").remove();
             }
         }
 
         setTimeout(function(){
             $conScTop = $scTop;
         },200);
     });
     */
 });
 
 
 
 
 /*=======================================================================
  * Window Resize
  =======================================================================*/
 $(window).bind("resize", function(){
     navHeight("#nav"); //Navigation Height
 
 });
 
 
 
 /*=======================================================================
  * Function
  =======================================================================*/
 /* Navigation Height */
 function navHeight(nav){
     var $winH = $(window).height(),
         $headerH = parseInt($("#header").outerHeight(true));
     $(nav).find(".area").height($winH - $headerH);
 }
 
 
 
 /* Schedule Design Set */
 var $elH = 0;
 function weekHeight(){
     /*
      $(".week_plan").filter(function(){
      var $box = $(this),
      $boxH = $box.height(),
      $el = $(this).find("ul li");
 
      $box.removeAttr("style");
      $el.removeAttr("style");
 
      $el.each(function(){
      var $thisH = $(this).height();
 
      if ($thisH > $elH){
      $elH = $(this).height();
      $el.height($elH);
      } else if ($thisH >= $boxH){
      $box.height($elH)
      }
      });
 
      if ($elH <= $boxH){
      $el.height($boxH);
      } else {
      $box.height($elH);
      }
      });
      */
 }
 
 /* Popup Height */
 function popHeight(){
     $(".popup").filter(function(){
         var $pop = $(this),
             $title = $pop.find("h2").outerHeight(true),
             $cont = $pop.find(".pop_con").outerHeight(true),
             $btn = $pop.find(".pop_btn").outerHeight(true),
             $value = $title + $cont + $btn;
         $(this).find(".box").height($value);
         $(this).find(".box").css('max-height', window.innerHeight - 30);
     });
 }
 
 /*=======================================================================
  * Cell phone formatter
  =======================================================================*/
 function phoneFomatter(str) {
     str = str.replace(/[^0-9]/g, '');
     var tmp = '';
     if( str.length < 4){
         return str;
     }else if(str.length < 7){
         tmp += str.substr(0, 3);
         tmp += '-';
         tmp += str.substr(3);
         return tmp;
     }else if(str.length < 11){
         tmp += str.substr(0, 3);
         tmp += '-';
         tmp += str.substr(3, 3);
         tmp += '-';
         tmp += str.substr(6);
         return tmp;
     }else{
         tmp += str.substr(0, 3);
         tmp += '-';
         tmp += str.substr(3, 4);
         tmp += '-';
         tmp += str.substr(7);
         return tmp;
     }
     return str;
 }
 
 function OnCheckPhone(oTa) {
     var oForm = oTa.form ;
     var sMsg = oTa.value ;
     var onlynum = "" ;
     var imsi=0;
     onlynum = RemoveDash2(sMsg);  //하이픈 입력시 자동으로 삭제함
     onlynum =  checkDigit(onlynum);  // 숫자만 입력받게 함
     var retValue = "";
 
     if(event.keyCode != 12 ) {
         if(onlynum.substring(0,2) == '02') {  // 서울전화번호일 경우  10자리까지만 나타나교 그 이상의 자리수는 자동삭제
             if (GetMsgLen(onlynum) <= 1) oTa.value = onlynum ;
             if (GetMsgLen(onlynum) == 2) oTa.value = onlynum + "-";
             if (GetMsgLen(onlynum) == 4) oTa.value = onlynum.substring(0,2) + "-" + onlynum.substring(2,3) ;
             if (GetMsgLen(onlynum) == 4) oTa.value = onlynum.substring(0,2) + "-" + onlynum.substring(2,4) ;
             if (GetMsgLen(onlynum) == 5) oTa.value = onlynum.substring(0,2) + "-" + onlynum.substring(2,5) ;
             if (GetMsgLen(onlynum) == 6) oTa.value = onlynum.substring(0,2) + "-" + onlynum.substring(2,6) ;
             if (GetMsgLen(onlynum) == 7) oTa.value = onlynum.substring(0, 2) + "-" + onlynum.substring(2, 5) + "-" + onlynum.substring(5, 7);
             if (GetMsgLen(onlynum) == 8) oTa.value = onlynum.substring(0,2) + "-" + onlynum.substring(2,6) + "-" + onlynum.substring(6,8) ;
             if (GetMsgLen(onlynum) == 9) oTa.value = onlynum.substring(0,2) + "-" + onlynum.substring(2,5) + "-" + onlynum.substring(5,9) ;
             if (GetMsgLen(onlynum) == 10) oTa.value = onlynum.substring(0,2) + "-" + onlynum.substring(2,6) + "-" + onlynum.substring(6,10) ;
             if (GetMsgLen(onlynum) == 11) oTa.value = onlynum.substring(0,2) + "-" + onlynum.substring(2,6) + "-" + onlynum.substring(6,10) ;
             if (GetMsgLen(onlynum) == 12) oTa.value = onlynum.substring(0,2) + "-" + onlynum.substring(2,6) + "-" + onlynum.substring(6,10) ;
         }
         if(onlynum.substring(0,2) == '05') {  // 05로 시작되는 번호 체크
             if(onlynum.substring(2,3) == 0 ) {  // 050으로 시작되는지 따지기 위한 조건문
                 if (GetMsgLen(onlynum) <= 3) oTa.value = onlynum ;
                 if (GetMsgLen(onlynum) == 4) oTa.value = onlynum + "-";
                 if (GetMsgLen(onlynum) == 5) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,5) ;
                 if (GetMsgLen(onlynum) == 6) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,6) ;
                 if (GetMsgLen(onlynum) == 7) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,7) ;
                 if (GetMsgLen(onlynum) == 8) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) ;
                 if (GetMsgLen(onlynum) == 9) oTa.value = onlynum.substring(0, 4) + "-" + onlynum.substring(4, 7) + "-" + onlynum.substring(7, 9);
                 if (GetMsgLen(onlynum) == 10) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) + "-" + onlynum.substring(8,10) ;
                 if (GetMsgLen(onlynum) == 11) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,7) + "-" + onlynum.substring(7,11) ;
                 if (GetMsgLen(onlynum) == 12) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) + "-" + onlynum.substring(8,12) ;
                 if (GetMsgLen(onlynum) == 13) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) + "-" + onlynum.substring(8,12) ;
             } else {
                 if (GetMsgLen(onlynum) <= 2) oTa.value = onlynum ;
                 if (GetMsgLen(onlynum) == 3) oTa.value = onlynum + "-";
                 if (GetMsgLen(onlynum) == 4) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,4) ;
                 if (GetMsgLen(onlynum) == 5) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,5) ;
                 if (GetMsgLen(onlynum) == 6) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) ;
                 if (GetMsgLen(onlynum) == 7) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) ;
                 if (GetMsgLen(onlynum) == 8) oTa.value = onlynum.substring(0, 3) + "-" + onlynum.substring(3, 6) + "-" + onlynum.substring(6, 8);
                 if (GetMsgLen(onlynum) == 9) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,9) ;
                 if (GetMsgLen(onlynum) == 10) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) + "-" + onlynum.substring(6,10) ;
                 if (GetMsgLen(onlynum) == 11) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,11) ;
                 if (GetMsgLen(onlynum) == 12) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,11) ;
             }
         }
 
         if(onlynum.substring(0,2) == '03' || onlynum.substring(0,2) == '04'  || onlynum.substring(0,2) == '06' || onlynum.substring(0,2) == '07' || onlynum.substring(0,2) == '08') {  // 서울전화번호가 아닌 번호일 경우(070,080포함 // 050번호가 문제군요)
             if (GetMsgLen(onlynum) <= 2) oTa.value = onlynum ;
             if (GetMsgLen(onlynum) == 3) oTa.value = onlynum + "-";
             if (GetMsgLen(onlynum) == 4) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,4) ;
             if (GetMsgLen(onlynum) == 5) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,5) ;
             if (GetMsgLen(onlynum) == 6) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) ;
             if (GetMsgLen(onlynum) == 7) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) ;
             if (GetMsgLen(onlynum) == 8) oTa.value = onlynum.substring(0, 3) + "-" + onlynum.substring(3, 6) + "-" + onlynum.substring(6, 8);
             if (GetMsgLen(onlynum) == 9) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,9) ;
             if (GetMsgLen(onlynum) == 10) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) + "-" + onlynum.substring(6,10) ;
             if (GetMsgLen(onlynum) == 11) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,11) ;
             if (GetMsgLen(onlynum) == 12) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,11) ;
         }
         if(onlynum.substring(0,2) == '01') {  //휴대폰일 경우
             if (GetMsgLen(onlynum) <= 2) oTa.value = onlynum ;
             if (GetMsgLen(onlynum) == 3) oTa.value = onlynum + "-";
             if (GetMsgLen(onlynum) == 4) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,4) ;
             if (GetMsgLen(onlynum) == 5) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,5) ;
             if (GetMsgLen(onlynum) == 6) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) ;
             if (GetMsgLen(onlynum) == 7) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) ;
             if (GetMsgLen(onlynum) == 8) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,8) ;
             if (GetMsgLen(onlynum) == 9) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,9) ;
             if (GetMsgLen(onlynum) == 10) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) + "-" + onlynum.substring(6,10) ;
             if (GetMsgLen(onlynum) == 11) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,11) ;
             if (GetMsgLen(onlynum) == 12) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,11) ;
         }
 
         if(onlynum.substring(0,1) == 1) {  // 1588, 1688등의 번호일 경우
             if (GetMsgLen(onlynum) <= 3) oTa.value = onlynum ;
             if (GetMsgLen(onlynum) == 4) oTa.value = onlynum + "-";
             if (GetMsgLen(onlynum) == 5) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,5) ;
             if (GetMsgLen(onlynum) == 6) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,6) ;
             if (GetMsgLen(onlynum) == 7) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,7) ;
             if (GetMsgLen(onlynum) == 8) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) ;
             if (GetMsgLen(onlynum) == 9) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) ;
             if (GetMsgLen(onlynum) == 10) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) ;
             if (GetMsgLen(onlynum) == 11) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) ;
             if (GetMsgLen(onlynum) == 12) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) ;
         }
     }
 }
 
 function RemoveDash2(sNo) {
     var reNo = "";
     for(var i = 0 ; i < sNo.length ; i++) {
         if ( sNo.charAt(i) != "-" ) {
             reNo += sNo.charAt(i);
         }
     }
     return reNo;
 }
 
 function GetMsgLen(sMsg) { // 0-127 1byte, 128~ 2byte
     var count = 0;
     for(var i = 0 ; i < sMsg.length ; i++) {
         if ( sMsg.charCodeAt(i) > 127 ) {
             count += 2;
         }    else {
             count++;
         }
     }
     return count;
 }
 
 function checkDigit(num) {
     var Digit = "1234567890";
     var string = num;
     var len = string.length;
     var retVal = "";
 
     for (var i = 0 ; i < len ; i++)
     {
         if (Digit.indexOf(string.substring(i, i+1)) >= 0)
         {
             retVal = retVal + string.substring(i, i+1);
         }
     }
     return retVal;
 }
 
 function uiBlock() {
     $.blockUI({
         message : "잠시만 기다려 주세요.",
         css : {"left" : "50%", "top" : "50%", "padding" : "25px 50px", "width" : "auto", "background-color" : "#42485a", "border-radius" : "8px", "border" : "none", "font-size" : "14px", "font-weight" : "300", "color" : "white", "transform" : "translate(-50%, -50%)"}
     });
 }
 
 function uiUnblock() {
     $.unblockUI();
 }
 