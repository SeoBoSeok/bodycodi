<?php
// 이 파일은 새로운 파일 생성시 반드시 포함되어야 함
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가
$link = $_SERVER['REQUEST_URI'];
$link_array = explode('/',$link);
$pagel = end($link_array);
// if (!$member['mb_id'] && ($pagel !== "login.php"))
// 	header('Location: /bbs/login.php');

// print_r($_SERVER);

$g5_debug['php']['begin_time'] = $begin_time = get_microtime();

if (!isset($g5['title'])) {
    $g5['title'] = $config['cf_title'];
    $g5_head_title = $g5['title'];
}
else {
    // 상태바에 표시될 제목
    $g5_head_title = implode(' | ', array_filter(array($g5['title'], $config['cf_title'])));
}

$g5['title'] = strip_tags($g5['title']);
$g5_head_title = strip_tags($g5_head_title);

// 현재 접속자
// 게시판 제목에 ' 포함되면 오류 발생
$g5['lo_location'] = addslashes($g5['title']);
if (!$g5['lo_location'])
    $g5['lo_location'] = addslashes(clean_xss_tags($_SERVER['REQUEST_URI']));
$g5['lo_url'] = addslashes(clean_xss_tags($_SERVER['REQUEST_URI']));
if (strstr($g5['lo_url'], '/'.G5_ADMIN_DIR.'/') || $is_admin == 'super') $g5['lo_url'] = '';

/*
// 만료된 페이지로 사용하시는 경우
header("Cache-Control: no-cache"); // HTTP/1.1
header("Expires: 0"); // rfc2616 - Section 14.21
header("Pragma: no-cache"); // HTTP/1.0
*/
?>
<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<?php
if (G5_IS_MOBILE) {
    echo '<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=0,maximum-scale=10,user-scalable=yes">'.PHP_EOL;
    echo '<meta name="HandheldFriendly" content="true">'.PHP_EOL;
    echo '<meta name="format-detection" content="telephone=no">'.PHP_EOL;
} else {
    echo '<meta http-equiv="imagetoolbar" content="no">'.PHP_EOL;
    echo '<meta http-equiv="X-UA-Compatible" content="IE=edge">'.PHP_EOL;
}

if($config['cf_add_meta'])
    echo $config['cf_add_meta'].PHP_EOL;
?>
<title><?php echo $g5_head_title; ?></title>
<?php
$shop_css = '';
if (defined('_SHOP_')) $shop_css = '_shop';
echo '<link rel="stylesheet" href="'.run_replace('head_css_url', G5_THEME_CSS_URL.'/'.(G5_IS_MOBILE?'mobile':'default').$shop_css.'.css?ver='.G5_CSS_VER, G5_THEME_URL).'">'.PHP_EOL;
?>
<!--[if lte IE 8]>
<script src="<?php echo G5_JS_URL ?>/html5.js"></script>
<![endif]-->
<script>
// 자바스크립트에서 사용하는 전역변수 선언
var g5_url       = "<?php echo G5_URL ?>";
var g5_bbs_url   = "<?php echo G5_BBS_URL ?>";
var g5_is_member = "<?php echo isset($is_member)?$is_member:''; ?>";
var g5_is_admin  = "<?php echo isset($is_admin)?$is_admin:''; ?>";
var g5_is_mobile = "<?php echo G5_IS_MOBILE ?>";
var g5_bo_table  = "<?php echo isset($bo_table)?$bo_table:''; ?>";
var g5_sca       = "<?php echo isset($sca)?$sca:''; ?>";
var g5_editor    = "<?php echo ($config['cf_editor'] && $board['bo_use_dhtml_editor'])?$config['cf_editor']:''; ?>";
var g5_cookie_domain = "<?php echo G5_COOKIE_DOMAIN ?>";
<?php if (defined('G5_USE_SHOP') && G5_USE_SHOP) { ?>
var g5_theme_shop_url = "<?php echo G5_THEME_SHOP_URL; ?>";
var g5_shop_url = "<?php echo G5_SHOP_URL; ?>";
<?php } ?>
<?php if(defined('G5_IS_ADMIN')) { ?>
var g5_admin_url = "<?php echo G5_ADMIN_URL; ?>";
<?php } ?>
</script>
<?php
// add_javascript('<script src="'.G5_JS_URL.'/jquery-1.12.4.min.js"></script>', 0);
// add_javascript('<script src="'.G5_JS_URL.'/jquery-migrate-1.4.1.min.js"></script>', 0);
if (defined('_SHOP_')) {
    if(!G5_IS_MOBILE) {
        add_javascript('<script src="'.G5_JS_URL.'/jquery.shop.menu.js?ver='.G5_JS_VER.'"></script>', 0);
    }
} else {
    add_javascript('<script src="'.G5_JS_URL.'/jquery.menu.js?ver='.G5_JS_VER.'"></script>', 0);
}
add_javascript('<script src="'.G5_JS_URL.'/common.js?ver='.G5_JS_VER.'"></script>', 0);
add_javascript('<script src="'.G5_JS_URL.'/wrest.js?ver='.G5_JS_VER.'"></script>', 0);
add_javascript('<script src="'.G5_JS_URL.'/placeholders.min.js"></script>', 0);
add_stylesheet('<link rel="stylesheet" href="'.G5_JS_URL.'/font-awesome/css/font-awesome.min.css">', 0);

if(G5_IS_MOBILE) {
    add_javascript('<script src="'.G5_JS_URL.'/modernizr.custom.70111.js"></script>', 1); // overflow scroll 감지
}
if(!defined('G5_IS_ADMIN'))
    echo $config['cf_add_script'];
?>
<link type="text/css" rel="stylesheet" href="<?php echo G5_URL; ?>/bootstrap/css/bootstrap.min.css"/>
<link type="text/css" rel="stylesheet" href="<?php echo G5_URL; ?>/bootstrap/css/datepicker.css"/>
<link type="text/css" rel="stylesheet" href="<?php echo G5_URL; ?>/css/jquery-ui.min.css"/>

<link type="text/css" rel="stylesheet" href="<?php echo G5_URL; ?>/css/common.css?v=20210224">
<link type="text/css" rel="stylesheet" href="<?php echo G5_URL; ?>/css/layout.css">
<link type="text/css" rel="stylesheet" href="<?php echo G5_URL; ?>/static/css/ui.css?v=20210224">
<link type="text/css" rel="stylesheet" href="<?php echo G5_URL; ?>/static/css/popup/popupHeader.css?v=20210204">
<link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosanskr.css">
<link type="text/css" rel="stylesheet" href="/static/css/home.css">

<script type="text/javascript" src="<?php echo G5_URL; ?>/static/js/common/jquery/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="<?php echo G5_URL; ?>/static/js/common/jquery/jquery.blockUI.js"></script>
<script src="<?php echo G5_URL; ?>/jquery/jquery.number.min.js"></script>
<script src="<?php echo G5_URL; ?>/jquery/jquery.cookie.js"></script>
<script src="<?php echo G5_URL; ?>/jquery/jquery-ui.js"></script>
<script src="<?php echo G5_URL; ?>/jquery/i18n/datepicker-ko.js"></script>
<script type="text/javascript" src="<?php echo G5_URL; ?>/static/js/common/socketio/socket.io.1.7.3.js"></script>
<script type="text/javascript" src="<?php echo G5_URL; ?>/static/js/common/printer_core.js"></script>
<script type="text/javascript" src="<?php echo G5_URL; ?>/static/js/common/bootstrap/moment.js"></script>
<script type="text/javascript" src="<?php echo G5_URL; ?>/static/js/common/bootstrap/moment-with-locales.min.js"></script>
<script type="text/javascript" src="<?php echo G5_URL; ?>/static/js/common/barcode_core.js"></script>
<script type="text/javascript" src="<?php echo G5_URL; ?>/static/js/common.js?v=20210224"></script>
<script type="text/javascript" src="<?php echo G5_URL; ?>/static/js/ui.js?v=20210304"></script>
<script type="text/javascript" src="<?php echo G5_URL; ?>/static/js/ui/uiHeader.js?v=20210216"></script>

<script src="/bootstrap/js/bootstrap.min.js"></script>
<script src="/bootstrap/js/moment.js"></script>
<script src="/bootstrap/js/moment-with-locales.js"></script>
<script type="text/javascript" src="/resources/static/bower_components/moment/min/moment-with-locales.min.js"></script>
<script src="/bootstrap/js/bootstrap-datetimepicker.min.js"></script>

<script src="/bootstrap/js/validator.js"></script>

<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" async></script>

<script type="text/javascript" src="<?php echo G5_URL; ?>/static/js/controller/commonController.js?v=20210204"></script>
<script type="text/javascript" src="<?php echo G5_URL; ?>/static/js/controller/coachController.js?v=20210204"></script>
<script type="text/javascript" src="<?php echo G5_URL; ?>/static/js/controller/memberController.js?v=20210204"></script>
<script type="text/javascript" src="<?php echo G5_URL; ?>/static/js/controller/permissionController.js"></script>
<script type="text/javascript" src="<?php echo G5_URL; ?>/static/js/controller/smsController.js?v=20210204"></script>

<script type="text/javascript" src="<?php echo G5_URL; ?>/static/js/popup/popupCamera.js"></script>
<script type="text/javascript" src="<?php echo G5_URL; ?>/static/js/popup/popupLoginCoach.js?v=20210204"></script>
<script type="text/javascript" src="<?php echo G5_URL; ?>/static/js/popup/popupMember.js?v=20210330"></script>
<script type="text/javascript" src="<?php echo G5_URL; ?>/static/js/popup/popupSendSms.js?v=20210326"></script>
<script type="text/javascript" src="<?php echo G5_URL; ?>/static/js/popup/popupTodo.js"></script>
<script type="text/javascript" src="/static/js/common/chart.min.js"></script>
<script type="text/javascript" src="/static/js/popup/popupGuide.js?v=20210303"></script>
<script type="text/javascript">
    const partnerId = Number("774");
    const branchId = Number("0");
    const printerCore = new PrinterCore();
    const socketAddress = {
        https	: "https://crm.bodycodi.com:8043",
        http	: "http://52.78.149.182:8081/"
    };

    const partnerInfo = {
        partner : {
            id			: Number("774"),
            name		: "바디코디",
            branchUseYn	: "N",
            headquartersYn : "N"
        },
        branch : {
            id			: Number("0"),
            name        : ""
        },
        employee : {
            id			: Number("9807"),
            name		: "기본 관리자",
            thumbnail	: "https://d27pagl1acwik5.cloudfront.net/upload/coach/774/2020/09/03/20200903151541",
            typeCode	: "-1",
            sex 		: "",
        },
        licence : {
            isPayment	: "Y",
            remainDate	: Number("61"),
            expireDate	: "2021-05-31 00:00:00"
        },
        state : {
            sms 		: "13"
        },
        scheduler : {
            default		: "class"
        },
        permission : {
            member : {
                create : ("true" == "true") ? true : false,
                update : ("true" == "true") ? true : false,
                remove : ("true" == "true") ? true : false,
                sms : ("true" == "true") ? true : false,
                locker : ("true" == "true") ? true : false,
                point : ("true" == "true") ? true : false,
            },
            payment : {
                payment : ("true" == "true") ? true : false,
                cross : ("true" == "true") ? true : false,
            },
            permissionPayment : {
            },
            permissionMember : {
            },
            permissionSchedule : {
            },
            permissionAccounting : {
                readSales : "true",
                readExpenditure : "true",
                readAccount : "true",
                registExpenditure : "true",
                accessAccounting : "true",
                configStaffPay : "true",
                readStaffPay : "true"
            },
            permissionStatistics : {
                sales : "true",
                member : "true",
                appointment : "true",
                classes : "true"
            },
            permissionProduct : {
            }
        }
    };

    window.addEventListener("DOMContentLoaded", function(){
        uiHeader();
    }, true);
</script>
</head>
<body<?php echo isset($g5['body_script']) ? $g5['body_script'] : ''; ?> class="browser">
<?php
if ($is_member) { // 회원이라면 로그인 중이라는 메세지를 출력해준다.
    $sr_admin_msg = '';
    if ($is_admin == 'super') $sr_admin_msg = "최고관리자 ";
    else if ($is_admin == 'group') $sr_admin_msg = "그룹관리자 ";
    else if ($is_admin == 'board') $sr_admin_msg = "게시판관리자 ";

    echo '<div id="hd_login_msg">'.$sr_admin_msg.get_text($member['mb_nick']).'님 로그인 중 ';
    echo '<a href="'.G5_BBS_URL.'/logout.php">로그아웃</a></div>';
}