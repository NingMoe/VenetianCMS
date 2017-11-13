/*
 * common function
*/
import { Message } from 'element-ui';

/*The number of times a character appears in the string*/
export function stringRepeatTimes(str, char) {
  let arr = [];
  let times = 0;
  arr = Array.from(str);
  for(let v of arr) {
    if(v == char) {
      times++;
    }
  }
  return times;
}

/*Alert an error message*/
export function errorMessage(str) {
  Message({
    message: str,
    duration: '1500',
    type: 'error'
  })
}

/*adjust user's input is legal Number*/
export function legalNumber(ele, val) {
  if(val == '') {
    return false;
  }
  let reg = new RegExp(/^[\-\d][\.][1-9][\d]{0,}$/);
  let reg1 = new RegExp(/^[\-1-9]\d{0,}$/);
  if(stringRepeatTimes(val, '.') > 1) {
    errorMessage('请输入合法数字');
    ele.value = '';
    return false;
  }
  if(val.charAt(0) == '0') {
    if(reg.test(val)) {
      return true;
    } else {
      errorMessage('请输入合法数字');
      ele.value = '';
      return false
    }
  } else {
    if(val.includes('.')) {
      let r = val.split('.')[1];
      if( r.length > 0 && parseInt(r) > 0 && r.charAt(r.length-1) != 0) {
        return true;
      } else {
        errorMessage('请输入合法数字');
        ele.value = '';
        return false;
      }
    }

    if(reg1.test(val)) {
      return true;
    } else {
      errorMessage('请输入合法数字');
      ele.value = '';
      return false;
    }
  }
}

/* check phone number */
export function checkPhoneNumber(str) {
  if(str == '' || str == undefined || str == null) {
    errorMessage('请输入号码');
    return false;
  }
  if(typeof str != 'string') {
    if(typeof str == 'number') {
      str = str.toString();
    } else {
      errorMessage('输入有误, 请重新输入！');
      return false;
    }
  }
  let reg = new RegExp(/^1[3|4|5|7|8]\d{9}$/, 'g');
  if(reg.test(str)) {
    return true;
  } else {
    errorMessage('手机号码格式不正确，请重新输入');
    return false;
  }
  
}