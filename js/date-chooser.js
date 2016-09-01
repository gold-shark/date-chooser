(function($, undefined) {
  /* 当前日期   */
  var defaultDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  };
  /* 是否闰年  */
  function leapYear(year) {
    if((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      return true;
    } else {
      return false;
    }
  };
  /* 某个月的天数  */
  function dayNumber(date) {
    switch(date.month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        return 31;
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        return 30;
        break;
      case 2:
        if(leapYear(date.year)) {
          return 29;
        } else {
          return 28;
        }
        break;
      default:
        return 30;
        break;
    }
  };
  /* 对象扩展  */
  function extend(target, source) {
    var arr = {};
    for(var i in target) {
      arr[i] = target[i];
    }
    for(var i in source) {
      arr[i] = source[i];
    }
    return arr;
  };
  /* 上一个月  */
  function prevMonth(date) {
    if(date.month === 1) {
      return {
        year: date.year - 1,
        month: date.month
      };
    } else {
      return {
        year: date.year,
        month: date.month - 1
      };
    }
  };
  /* 日历选择  */
  $.dateChooser = function(options) {
    var date = extend(defaultDate, options);
    var dateArray = new Array(42);
    var upNumber = dayNumber(prevMonth(date)); //上月天数
    var theNumber = dayNumber(date); //当月天数
    var oneWeek = new Date(date.year, date.month - 1, 1).getDay(); //当月一号星期
    /* 如果一号是星期日则从第二行开始  */
    if(oneWeek === 0) {
      oneWeek = 7;
    }
    for(var i = 0; i < oneWeek; i++) {
      dateArray[i] = {
        value: upNumber - oneWeek + i + 1,
        state: -1
      };
    }
    for(var i = 0; i < theNumber; i++) {
      if(date.year === date.year && date.month === date.month && (i + 1) === date.day) {
        dateArray[oneWeek + i] = {
          value: i + 1,
          state: 0
        };
      } else {
        dateArray[oneWeek + i] = {
          value: i + 1,
          state: 1
        };
      }
    }
    for(var i = 0; i < dateArray.length - theNumber - oneWeek; i++) {
      dateArray[theNumber + oneWeek + i] = {
        value: i + 1,
        state: -1
      };
    }
    return dateArray;
  };
}(window));