
template.helper('dateFormat', function (date, format) {
    if (!date) return "";

    date = new Date(date);

    var map = {
        "M": date.getMonth() + 1,
        "d": date.getDate(),
        "D": date.getDate(),
        "h": date.getHours(),
        "H": date.getHours(),
        "m": date.getMinutes(),
        "s": date.getSeconds(),
        "q": Math.floor((date.getMonth() + 3) / 3),
        "f": date.getMilliseconds()
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
});

template.helper("minuteFormat", function (minuteInDay) {
    if (!minuteInDay && minuteInDay != 0) return "";
    var hour = parseInt(minuteInDay / 60);
    var minute = parseInt(minuteInDay % 60);
    return (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute);
});