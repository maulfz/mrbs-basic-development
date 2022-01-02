function ajaxGet(url, param, success) {
    var innerParam = param;
    if (typeof param === "function" && typeof success !== "function") {
        innerParam = null;
        success = param;
    } else if (typeof param === "function" && typeof success === "function") {
        innerParam = param();
    }
    innerParam = innerParam || {};
    innerParam.r = Math.random();
    $.ajax({
        url: url,
        data: innerParam,
        type: 'get',
        dataType: 'json',
        success: success
    });
}

Date.prototype.format = function (format) {
    var date = this;

    var map = {
        "M": date.getMonth() + 1,
        "d": date.getDate(),
        "h": date.getHours(),
        "m": date.getMinutes(),
        "s": date.getSeconds(),
        "q": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    };
    format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
        var v = map[t];
        if (v !== undefined) {
            if (all.length > 1) {
                v = '0' + v;
                v = v.substr(v.length - 2);
            }
            return v;
        }
        else if (t === 'y') {
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
};

function dateFormat (date, format) {
    if (!date) return "";

    date = new Date(date);

    var map = {
        "M": date.getMonth() + 1, //月份
        "d": date.getDate(), //日
        "D": date.getDate(), //日
        "h": date.getHours(), //小时
        "H": date.getHours(), //小时
        "m": date.getMinutes(), //分
        "s": date.getSeconds(), //秒
        "q": Math.floor((date.getMonth() + 3) / 3), //季度
        "f": date.getMilliseconds() //毫秒
    };
    format = format.replace(/([yMdHhmsqf])+/g, function (all, t) {
        var v = map[t];
        if (v !== undefined) {
            if (all.length > 1) {
                v = '0' + v;
                v = v.substr(v.length - 2);
            }
            return v;
        }
        else if (t === 'y') {
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
};

function minuteFormat (minuteInDay) {
    if (!minuteInDay && minuteInDay != 0) return "";
    var hour = parseInt(minuteInDay / 60);
    var minute = parseInt(minuteInDay % 60);
    return (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute);
};
