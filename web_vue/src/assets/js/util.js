/*
 * description： 所有项目公用方法
 * author： liudehua
 */

(function (window) {
  const Util = {};

  /**
   * 为一个Vue的data添加一个新的属性,如果是数组, 则为每一项都添加一个新的属性
   */
  Util.addVueDataProperty = function (vm, source, key, defaultValue) {
    if (source instanceof Array) {
      for (var idx = 0; idx < source.length; idx++) {
        var item = source[idx];
        vm.$set(item, key, defaultValue)
      }
    } else {
      vm.$set(source, key, defaultValue)
    }
  };

  /**
   * 作者 刘德华
   * 日期 20170711
   * 把json对象转成URL形式
   * param: json
   * key: 转成url之后,给每个参数附加一个父节点, 比如 key.p1=1
   */
  Util.parseParam = function (param, key) {
    let paramStr = "";
    for (let key in param) {
      if (param[key]) paramStr += '&' + key + '=' + param[key];
    }
    return paramStr.substr(1);
  };

  /**
   * 手机号验证
   */
  Util.phoneVerify = function (phone = '') {
    if (/^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$/.test(phone)) {
      return false;
    } else {
      return true;
    }
  };
  /**
   * 深拷贝对象
   */
  Util.deepCopyObj = function (obj) {
    if (obj instanceof Array || typeof obj != 'object') {
      return obj;
    }
    let newobj = {};
    for (let attr in obj) {
      newobj[attr] = this.deepCopyObj(obj[attr]);
    }
    return newobj;
  }
  /**
   * 作者 刘德华
   * 日期 20170710
   * 描述 处理所有的vue-axios的response 并判断是否成功
   * 2个回调函数, 处理成功和失败
   */
  Util.processRes = function (vm, response, sucessCallback, failCallback) {
    // 数据通道
    if (response.data.data && response.data.code == 200) {
      if (sucessCallback)
        sucessCallback.call(response, response.data)
      return
    } else {
      // 登录验证
      if (response.data.code == '201') {
        Util.message(vm, '您的登录状态已失效,请重新登录', 'warning');
      } else {
        Util.message(vm, response.data.msg, 'error');
        if (failCallback)
          failCallback.call(response, response.data.data)
      }
    }
  };
  /**
   * author 刘德华
   * time 20180612
   * description 提示 
   * directions Util.message(vm,title,msg,type);
   */
  Util.message = (vm, msg, type = 'info') => {
    vm.$message({
      showClose: true,
      message: msg,
      type: type
    });
  };
  /** 
   * auth liudehua
   * time 20170626
   * description 清除element-ui 自带的upload上传失败的展示
   * directions Util.delUpload(list)
   */
  Util.delUpload = function (list) {
    list.push({
      name: 'delUplad'
    });
    list.splice(list.length - 1, 1);
    return list;
  }
  // 数组转字符串
  Util.propsArrayToString = function (array, type = 'checked', id = "id") {
    var resultArray = []
    for (var i = 0; i < array.length; i++) {
      var current = array[i]
      if (current[type]) {
        resultArray.push(current[id])
      }
    }

    return resultArray.join(',')
  };

  /**
   * 作者 刘德华
   * 日期 20170712
   * 指定字符串切割 可前后
   * 用法 Util.getCutOutStr('12334','3')  34;
   */
  Util.getCutOutStr = function (string, str, type = 0) {
    var str_before = string.split(str)[0];
    var str_after = string.split(str)[1];
    return type ? str_before : str_after
  };
  /**
   * 作者 刘德华
   * 日期 20180627
   * list 键名转化
   * 用法 Util.setListAction(list, key, value) ;
   */
  Util.setListAction = function (list, value = 'id', key = 'title') {
    if (list.length) {
      let oList = [];
      list.forEach(element => {
        oList.push({
          key: element[key],
          value: element[value]
        })
      });
      return oList;
    } else {
      return list
    }
  }
  /**
   * 作者 刘德华
   * 日期 20180625
   * 设置local
   * 用法 Util.localStorage(type, name, data);
   */
  Util.localStorage = function (type = 'get', name, data) {
    if (type == 'get') {
      return localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : '';
    } else if (type == 'set') {
      return localStorage.setItem(name, data ? JSON.stringify(data) : '');
    } else {
      return localStorage.removeItem(name);
    }
  }
  window.Util = Util;

})(window);

export default {
  install: function (Vue) {
    Vue.Util
  }
}
