"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.assignColor = exports.pickColor = exports.genTimeBlock = exports.genDateBlock = exports.setLocale = exports.formatDate = void 0;
var moment_1 = __importDefault(require("moment"));
var formatDate = function (date, format) {
    return (0, moment_1["default"])(date).format(format);
};
exports.formatDate = formatDate;
var setLocale = function (locale) {
    moment_1["default"].locale(locale);
};
exports.setLocale = setLocale;
/**
 * @example genDateBlock("mon")
 */
var genDateBlock = function (dayOW) {
    if (typeof dayOW !== 'string') {
        throw new Error("genDateBlock got parameter type: ".concat(typeof dayOW, ", but string expected"));
    }
    var dayOWMap = {
        mon: '01',
        tue: '02',
        wed: '03',
        thu: '04',
        fri: '05',
        sat: '06',
        sun: '07'
    };
    return new Date("2019-07-".concat(dayOWMap[dayOW], "T00:00:00"));
};
exports.genDateBlock = genDateBlock;
var genTimeBlock = function (dayOW, hours, minutes) {
    if (hours === void 0) { hours = 0; }
    if (minutes === void 0) { minutes = 0; }
    var date = genDateBlock(dayOW);
    date.setHours(hours);
    if (minutes != null) {
        date.setMinutes(minutes);
    }
    return date;
};
exports.genTimeBlock = genTimeBlock;
var assignColor = function (events) {
    // add color to item
    return events.reduce(function (acc, item, idx) {
        var sameOne = acc.find(function (elem) {
            return elem.title === item.title;
        });
        var count = acc.reduce(function (acc, item) {
            if (acc[acc.length - 1] !== item.title) {
                acc.push(item.title);
            }
            return acc;
        }, []).length;
        acc.push(__assign(__assign({}, item), { color: sameOne === undefined ? pickColor(count) : sameOne.color, id: idx }));
        return acc;
    }, []);
};
exports.assignColor = assignColor;
var pickColor = function (num) {
    var colorList = [
        // apple calendar color
        // 'rgba(246,206,218,1)',
        // 'rgba(250,227,209,1)',
        // 'rgba(248,238,207,1)',
        // 'rgba(224,245,214,1)',
        // 'rgba(215,235,252,1)',
        // 'rgba(235,217,244,1)',
        // 'rgba(228,223,217,1)',
        // // prev
        // 'rgba(212,196,251,1)',
        // 'rgba(193,225,197,1)',
        // 'rgba(190,211,243,1)',
        // '#81E1B8',
        // 'rgba(190,218,220,1)',
        // 'rgba(254,243,189,1)',
        // 'rgba(247,141,167,1)',
        // 'rgba(196,222,246,1)',
        // 'rgba(250,208,195,1)',
        // '#cc9af4',
        // '#f8b3eb',
        // '#ff8080',
        // '#9af49f',
        // '#9aeff4',
        // '#a8e6cf',
        // '#fdffab',
        // 'rgba(0,208,132,0.9)',
        // 'rgba(217,227,240,0.9)',
        // 'rgba(105,108,137,0.8)',
        // 'rgba(142,209,252,0.9)',
        // 'rgba(6,147,227,0.8)',
        // 'rgba(153,0,239,0.9)',
        'rgba(235,20,76,0.9)',
        'rgba(83,0,235,1)',
        'rgba(18,115,222,1)',
        'rgba(0,107,118,1)',
        'rgba(129,199,132,1)',
        'rgba(184,0,0,1)',
    ];
    return colorList[num % colorList.length];
};
exports.pickColor = pickColor;
