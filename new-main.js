
$(document).ready(function() {
   /* var xmlhttp = new XMLHttpRequest();
    var upper_page_url = document.referrer;
    xmlhttp.open('GET', upper_page_url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var content = xmlhttp.responseText;
            var heroimg = $(content).find('img.rollovercartItemImg').attr('src');
            var top = '<img class=\'heroimg\' src=\'' + heroimg + '\'/>';
            $('div.wtb-main-banner').prepend(top);
        }
    }*/

    function icon_active(obj) {
        var rwd = obj.attr('class');
        var check = rwd.split('-');
        if (check[1] === "bottombar") {
            obj.css({ 'background-color': '#d4231d'});
        } else if (check[1] === "sidebar") {
            obj.find('.wtb-icon-active').css({ 'display': 'block' });
            obj.find('.wtb-icon-inactive').css({ 'display': 'none' });
            obj.find('p').css('color', '#fff');
            obj.css({
                'background-color': '#4AC0E0'
            });
        } else {
            obj.find('.wtb-icon-active').css({ 'display': 'block' });
            obj.find('.wtb-icon-inactive').css({ 'display': 'none' });
            var fontColor = obj.attr('data-color');
            obj.find('p').css('color', '#FFFFFF');
            obj.css('background-color', fontColor);
        }
    }

    function icon_inactive(obj) {
        var rwd = obj.attr('class');
        var check = rwd.split('-');
        if (check[1] === "bottombar") {
            obj.css({ 'background-color': '#A3A3A3' });
        } else if (check[1] === "sidebar") {
            obj.find('.wtb-icon-active').css({ 'display': 'none' });
            obj.find('.wtb-icon-inactive').css({ 'display': 'block' });
            var fontColor = obj.attr('data-color');
            obj.find('p').css({ 'color': '#333333' });
            obj.css('background-color', '#fff')
        } else {
            obj.find('.wtb-icon-active').css({ 'display': 'none' });
            obj.find('.wtb-icon-inactive').css({ 'display': 'block' });
            var fontColor = obj.attr('data-color');
            obj.find('p').css({ 'color': fontColor });
            obj.css('color', fontColor);
            obj.css('background-color', '#fff');
        }
    }

    function setting_data_check() {
        var productType = new Array("laptops", "tablets", "smartphones", "desktops", "workstations", "servers&storage", "accessories");
        var retailerStatus = new Array();
        var resellerStatus = new Array();
        for (var i = 0; i < productType.length; i++) {
            var product = productType[i];
            retailerStatus[i] = 0;
            resellerStatus[i] = 0;
            for (var x = 0; x < bpLogos.length; x++) {
                var thisProduct = bpLogos[x];
                var check = thisProduct[product].split('/');
                if (check[0] === "y") { retailerStatus[i] = retailerStatus[i] + 1; } else if (check[1] === "y") { resellerStatus[i] = resellerStatus[i] + 1; }
            }
        }
        for (var z = 0; z < productType.length; z++) {
            if (retailerStatus[z] === 0) {
                var prefix = productType[z].split('&');
                $('.wtb-retail .wtb-sidebar-' + prefix[0]).hide().attr('data-switch', 'off');
                $('.wtb-retail .wtb-bottombar-' + prefix[0]).hide().attr('data-switch', 'off');
            }
            if (resellerStatus[z] === 0) {
                var prefix = productType[z].split('&');
                $('.wtb-reseller .wtb-sidebar-' + prefix[0]).hide().attr('data-switch', 'off');
                $('.wtb-reseller .wtb-bottombar-' + prefix[0]).hide().attr('data-switch', 'off');
            }
        }
        var retailerNum = 0;
        for (var m = 0; m < retailerStatus.length; m++) { retailerNum = retailerNum + retailerStatus[m]; }
        var resellerNum = 0;
        for (var n = 0; n < resellerStatus.length; n++) { resellerNum = resellerNum + resellerStatus[n]; }
        if (retailerNum === 0) {
            $('.wtb-main-content .wtb-retail').hide().attr('data-switch', 'off');
            $('.wtb-main-menu .wtb-main-menu-retail').hide().attr('data-switch', 'off');
        }
        if (resellerNum === 0) {
            $('.wtb-main-content .wtb-reseller').hide().attr('data-switch', 'off');
            $('.wtb-main-menu .wtb-main-menu-reseller').hide().attr('data-switch', 'off');
        }
        for (var f = 0; f < otherSection.length; f++) {
            var other = otherSection[f];
            if (other["switch"] === "off") {
                $('.wtb-main-content .wtb-' + other["section-name"]).hide().attr('data-switch', 'off');
                $('.wtb-main-menu .wtb-main-menu-' + other["section-name"]).hide().attr('data-switch', 'off');
            }
        }
    }
    setting_data_check();

    function switch_check() {
        var n = 0;
        $('.wtb-main-menu').children().each(function() {
            var check = $(this).attr('data-switch');
            if (check === "off") { n = n + 1; }
        });
        switch (n) {
            case 0:
                console.log("Full Mode");
                break;
            case 1:
                $('.wtb-main-menu li').css({ 'width': 'calc(33.33333% - 20px)' });
                break;
            case 2:
                $('.wtb-main-menu li').css({ 'width': 'calc(50% - 20px)' });
                break;
            case 3:
                $('.wtb-main-menu li').css({ 'width': 'calc(100% - 20px)' });
                break;
        }
    }
    switch_check();

    function produce_bpLogos(obj, target, x) {
        var product = obj.attr('data-product');
        for (var i = 0; i < bpLogos.length; i++) {
            var thisObj = bpLogos[i];
            var check = thisObj[product].split('/');
            if (check[x] === "y") {
                var name = thisObj["name"];
                var url = thisObj["url"];
                var logo = thisObj["src"];
                var ccode = $('meta[name="lenovo.country"]').attr('content');
                var tracker = ccode + "-wtb-" + name;
                var number = '';
                var urlStr = document.referrer;
                var arrNum = urlStr.trim().split('/');
                var n = arrNum[arrNum.length - 2];
                if (n === 'p') { number = '-' + arrNum[arrNum.length - 1]; }
                var trackingCode = "s_logButtonClick(this.href,'','event73','prop17','" + tracker + number + "');" + "dataLayer.push({'event': '" + tracker + "'});";
                target.append('<li style="display:none; opacity:0;"><a href="' + url + '" target="_blank" onclick="' + trackingCode + '"><img src="' + logo + '"></a></li>');
                var l = target.find('li').length - 1;
                var thisLi = target.children()[l];
            }
        }
        var s = 0;
        var interval = setInterval(function() {
            var obj = target.children();
            obj.eq(s).css('display', 'block').animate({ "opacity": "1" }, 500);
            s += 1;
            if (obj.length === 0 || s >= obj.length) { clearInterval(interval); }
        }, 100);
    }

    function defult_active(section) {
        var sectionClasses = section.attr('class');
        var sectionName = sectionClasses.split(" ");
        if (sectionName[1] === "wtb-retail") {
            var x = 0;
        } else {
            var x = 1;
        }
        $('.' + sectionName[1] + ' .wtb-sidebar tr').each(function() {
            var status = $(this).attr('data-status');
            if (status === "active") {
                icon_active($(this));
                var target = $('.' + sectionName[1] + ' .wtb-bp-container ul');
                produce_bpLogos($(this), target, x);
                var objName = $(this).attr('class');
                var rwdObjName = objName.replace('sidebar', 'bottombar');
                var rwdObj = $('.' + sectionName[1] + ' .' + rwdObjName);
                icon_active(rwdObj);
                var productTitle = rwdObj.find('p').html();
                $('.' + sectionName[1] + ' .wtb-bp-title ul li').html(productTitle);
            }
        });
    }
    defult_active($('.wtb-retail'));
    defult_active($('.wtb-reseller'));

    function hover_interaction(obj) {
        obj.hover(function() {
            var status = $(this).attr('data-status');
            if (status === 'inactive') { icon_active($(this)); }
        }, function() {
            status = $(this).attr('data-status');
            if (status === 'inactive') { icon_inactive($(this)); }
        });
    }
    hover_interaction($('.wtb-main-menu li'));
    hover_interaction($('.wtb-sidebar tr'));
    hover_interaction($('.wtb-bottombar li'));
    $('.wtb-main-menu li').click(function() {
        var thisSq = $(this).index();
        /*图片切换*/
        $('.wtb-main-nav li').addClass('hidePic');
         $('.wtb-main-nav li').eq(thisSq).removeClass('hidePic');
        $('.wtb-main-nav li').eq(thisSq).addClass('showPic');
    
        var status = $(this).attr('data-status');
        if (status === 'inactive') {
            $(this).attr('data-status', 'active');
            var section = $(this).attr('data-section');
            var sectionClass = '.' + section;
            var sectionTitle = $(this).find('p').html();
            $('.wtb-title p').html(sectionTitle);
            var otherSq;
            var otherSectionClass;
            $('.wtb-main-menu li').not(this).each(function() {
                var otherStatus = $(this).attr('data-status');
                if (otherStatus === "active") {
                    otherSq = $(this).index();
                    $(this).attr('data-status', 'inactive');
                    icon_inactive($(this));
                    var otherSection = $(this).attr('data-section');
                    otherSectionClass = '.' + otherSection;
                    return otherSq;
                    return otherSectionClass;
                }
            });
            if (thisSq > otherSq) {
                $('.inner-container').stop().css({ 'width': '200%', 'margin-left': '0' });
                $('.inner-container').children().not(otherSectionClass).css({ 'display': 'none' });
                $(sectionClass).css({ 'width': '50%', 'float': 'left', 'display': 'block' });
                $(otherSectionClass).css({ 'width': '50%', 'float': 'left' });
                $('.inner-container').animate({ 'margin-left': '-100%' }, 500, function() {
                    $('.inner-container').css({ 'width': '100%', 'margin-left': '0' });
                    $(sectionClass).css({ 'width': '100%', 'float': 'none' });
                    $('.inner-container').children().not(sectionClass).css({ 'width': '100%', 'float': 'none', 'display': 'none' });
                });
            } else {
                $('.inner-container').stop().css({ 'width': '200%', 'margin-left': '-100%' });
                $('.inner-container').children().not(otherSectionClass).css({ 'display': 'none' });
                $(sectionClass).css({ 'width': '50%', 'float': 'left', 'display': 'block' });
                $(otherSectionClass).css({ 'width': '50%', 'float': 'left' });
                $('.inner-container').animate({ 'margin-left': '0' }, 500, function() {
                    $('.inner-container').css({ 'width': '100%', 'margin-left': '0' });
                    $(sectionClass).css({ 'width': '100%', 'float': 'none' });
                    $('.inner-container').children().not(sectionClass).css({ 'width': '100%', 'float': 'none', 'display': 'none' });
                });
            }
        }
    });

    function bar_interaction(obj, target, section) {
        if (section === ".wtb-retail") {
            var x = 0;
        } else {
            var x = 1;
        }
        var objSelector = section + ' ' + obj;
        $(objSelector).click(function() {
            var status = $(this).attr('data-status');
            if (status === "inactive") {
                var className = $(this).attr('class');
                var selector = className.split('-')[2];
                var sideObj = $(section + ' .wtb-sidebar-' + selector);
                var sideObjs = $(section + ' .wtb-sidebar tr');
                var bottomObj = $(section + ' .wtb-bottombar-' + selector);
                var bottomObjs = $(section + ' .wtb-bottombar li');
                var bpContianer = $(section + ' .wtb-bp-container ul');
                bpContianer.html('');
                produce_bpLogos(sideObj, bpContianer, x);
                sideObj.attr('data-status', 'active');
                icon_active(sideObj);
                sideObjs.not(sideObj).attr('data-status', 'inactive');
                sideObjs.not(sideObj).each(function() { icon_inactive($(this)); });
                bottomObj.attr('data-status', 'active');
                icon_active(bottomObj);
                bottomObjs.not(bottomObj).attr('data-status', 'inactive');
                bottomObjs.not(bottomObj).each(function() { icon_inactive($(this)); });
                var title = bottomObj.find('p').html();
                $(section + ' .wtb-bp-title ul li').html(title);
            } /*panou.logo height fixed*/ /*$('.wtb-reseller .wtb-bp-container ul li:last').find('img').css('margin', '9px 0');*/
        }); /*panou.logo height fixed*/ /*$('.wtb-reseller .wtb-bp-container ul li:last').find('img').css('margin', '9px 0');*/
    }
    bar_interaction('.wtb-sidebar tr', '.wtb-bp-container ul', '.wtb-retail');
    bar_interaction('.wtb-bottombar li', '.wtb-bp-container ul', '.wtb-retail');
    bar_interaction('.wtb-sidebar tr', '.wtb-bp-container ul', '.wtb-reseller');
    bar_interaction('.wtb-bottombar li', '.wtb-bp-container ul', '.wtb-reseller');
    var str = document.referrer;
    var arr = str.trim().split('/');
    if (arr[5] != 'laptops' && arr[5] != 'tablets' && arr[5] != 'desktops' && arr[5] != 'smartphones' && arr[5] != 'smart-devices' && arr[5] != 'workstations' && arr[5] != 'systems' && arr[5] != 'accessories' && arr[5] != 'promo') {
        var value = 'laptops';
    } else if (arr[5] == 'smart-devices') { value = 'smartphones'; } else if (arr[5] == 'systems') { value = 'servers'; } else if (arr[5] == 'promo' && arr[6] == 'laptops') { value = 'laptops'; } else if (arr[5] == 'promo' && arr[6] == 'tablets') { value = 'tablets'; } else if (arr[5] == 'promo' && arr[6] == 'desktops') { value = 'desktops'; } else if (arr[5] == 'promo' && arr[6] == 'smartphones') { value = 'smartphones'; } else if (arr[5] == 'promo' && arr[6] == 'accessories') { value = 'accessories'; } else { value = arr[5]; }
    var selector = '.wtb-retail .wtb-sidebar-' + value;
    $(selector).click();
});
