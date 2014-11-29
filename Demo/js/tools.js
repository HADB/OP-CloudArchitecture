// Generated by CoffeeScript 1.7.1
var tools;

tools = {
  rand: function() {
    return parseInt(Math.random() * 1000) + (new Date()).valueOf().toString();
  },
  time: function() {
    return Date.parse(new Date()) / 1000;
  },
  is_iPad: function() {
    var ua;
    ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('ipad') >= 0) {
      return true;
    } else {
      return false;
    }
  },
  dValue: function(x, y) {
    return Math.abs(x - y);
  },
  post: function(_url, _data, _callback, msg, time, dataType, ajaxErr) {
    var abortBtn, ajaxBefore, ajaxComplete, ajaxError;
    _callback = _callback || null;
    msg = msg || '正在处理中，请稍候...';
    dataType = dataType || '';
    abortBtn = "<a href='javascript:void(0)' class='abortBtn'>×</a>";
    msg += abortBtn;
    ajaxBefore = function() {
      var loadPosL, loadPosT;
      loadPosL = $(window).width() / 2 - 150;
      loadPosT = $(window).height() / 2 - 20;
      $('#ajaxLoading').html(abortBtn).css({
        marginLeft: loadPosL,
        marginTop: loadPosT
      }).html(msg);
      $('#ajaxLoading, #ajaxOverlay').show();
    };
    if (ajaxErr) {
      ajaxError = ajaxErr;
    } else {
      ajaxError = function(err) {
        if (err.status === 400) {
          if (err.responseText === 'miss-session') {
            $.notify({
              msg: 'Session丢失或过期，请重新登录',
              type: 'danger',
              timeout: 3000
            });
            tools.clearLoginInfo();
          }
        } else {
          if (err.statusText === 'abort') {
            return;
          }
          console.log(err);
          alert('网络异常，请刷新重试');
        }
      };
    }
    ajaxComplete = function() {
      $('#ajaxLoading, #ajaxOverlay').hide();
    };
    global.ajaxReq = $.ajax({
      type: 'POST',
      timeout: time || 60000,
      url: _url,
      data: _data,
      dataType: dataType,
      success: _callback,
      beforeSend: ajaxBefore,
      error: ajaxError,
      complete: ajaxComplete
    });
  },
  abortReq: function() {
    if (global.ajaxReq) {
      global.ajaxReq.abort();
    }
  },
  reloadCaptcha: function() {
    var _this;
    _this = $('#captcha-link');
    _this.html('');
    _this.html('<img src="/captcha.jpg" alt="" style="cursor:pointer"/>');
  },
  convertAbsToRelPos: function(obj, flag) {
    var _absPos, _relPos;
    if (flag) {
      _absPos = obj;
    } else {
      _absPos = obj.getAbsolutePosition();
    }
    _relPos = {
      x: Math.round((_absPos.x - global.stagePosition.x) / global.stageScale),
      y: Math.round((_absPos.y - global.stagePosition.y) / global.stageScale)
    };
    return _relPos;
  },
  convertRelToAbsPos: function(relPos) {
    var _absPos;
    _absPos = {
      x: Math.round((relPos.x * global.stageScale) + global.stagePosition.x),
      y: Math.round((relPos.y * global.stageScale) + global.stagePosition.y)
    };
    return _absPos;
  },
  convertPagePos: function(e, eType, kind, flag) {
    var _eType, _kind, _params;
    _params = {};
    _eType = eType || 'mouseup';
    _kind = kind || null;
    if (e.type === _eType) {
      _params.y = e.pageY;
      _params.x = e.pageX;
    } else {
      if (e.changedTouches) {
        _params.y = e.changedTouches[0].pageY;
        _params.x = e.changedTouches[0].pageX;
      } else {
        _params.y = e.originalEvent.changedTouches[0].pageY;
        _params.x = e.originalEvent.changedTouches[0].pageX;
      }
    }
    if (!flag) {
      _params.y = _params.y - def.stage.marginV;
      _params.x = _params.x - def.stage.marginH;
    }
    if (_kind && _kind === 'layer') {
      _params.x -= def.layer.xRadius * global.stageScale;
      _params.y -= def.layer.yRadius * global.stageScale;
    } else if (_kind) {
      _params.x -= def.component.radius * global.stageScale;
      _params.y -= def.component.radius * global.stageScale;
    }
    return _params;
  },
  reCalculatePos: function(pos) {
    var gridSize, _absPos, _relPos;
    gridSize = def.gridMin * global.stageScale;
    _relPos = {
      x: Math.round((pos.x - global.stagePosition.x) / gridSize) * gridSize,
      y: Math.round((pos.y - global.stagePosition.y) / gridSize) * gridSize
    };
    _absPos = {
      x: _relPos.x + global.stagePosition.x,
      y: _relPos.y + global.stagePosition.y
    };
    return _absPos;
  },
  formatByGrid: function(pos) {
    var gridSize;
    gridSize = def.gridMin * global.stageScale;
  },
  calculateCanPlaced: function(params) {
    var i, isOverLayer, j, tempArr, _i, _j, _len, _len1, _params, _pos;
    tempArr = [10, 20, 30, 40, 50, -10, -20, -30, -40, -50];
    for (_i = 0, _len = tempArr.length; _i < _len; _i++) {
      i = tempArr[_i];
      for (_j = 0, _len1 = tempArr.length; _j < _len1; _j++) {
        j = tempArr[_j];
        _pos = tools.reCalculatePos({
          x: params.x + i,
          y: params.y + j
        });
        _params = $.extend({}, params, _pos);
        isOverLayer = impact.comIsOverLayer(_params, 1);
        if (isOverLayer.isOver) {
          return _pos;
        }
      }
    }
    return params;
  },
  reCalculateLayerSize: function(_self) {
    var gridSize, newSize, oldSize;
    gridSize = def.gridMin * global.stageScale;
    oldSize = _self.getRealSize();
    newSize = {
      width: Math.ceil(oldSize.width / gridSize) * gridSize,
      height: Math.ceil(oldSize.height / gridSize) * gridSize
    };
    return newSize;
  },
  getPagePosOfNode: function(node) {
    var nodePos;
    nodePos = node.getAbsolutePosition();
    return nodePos;
  },
  setLineType: function(lineType) {
    global.lineType = lineType;
    entities.lines.forEach(function(lineGroup) {
      lineGroup.line.redraw();
    });
    layer.batchDraw();
  },
  setCanvasCenter: function(obj) {
    var centerPos_obj, centerPos_stage, diff_move, jWindow, move, newPos_stage, objPos, objSize, stagePos, stageSize;
    jWindow = $(window);
    objSize = obj.getRealSize();
    objPos = tools.convertAbsToRelPos(obj);
    centerPos_obj = {
      x: objPos.x + objSize.width / 2,
      y: objPos.y + objSize.height / 2
    };
    stageSize = {
      height: jWindow.height() - 45,
      width: jWindow.width() - 500
    };
    stagePos = global.stagePosition;
    centerPos_stage = {
      x: stageSize.width / 2 / global.stageScale - stagePos.x,
      y: stageSize.height / 2 / global.stageScale - stagePos.y
    };
    diff_move = {
      x: centerPos_stage.x - centerPos_obj.x,
      y: centerPos_stage.y - centerPos_obj.y
    };
    newPos_stage = {
      x: stagePos.x + diff_move.x,
      y: stagePos.y + diff_move.y
    };
    move = new kk.Tween({
      node: stage,
      x: Math.ceil(newPos_stage.x * global.stageScale),
      y: Math.floor(newPos_stage.y * global.stageScale),
      duration: 0.4,
      easing: Kinetic.Easings.EaseInOut,
      onFinish: function() {
        return canFunc.reDrawBackLayer();
      }
    });
    move.play();
  },
  restoreStagePos: function() {
    var com, move, _i, _len, _ref, _tempx, _tempy;
    _tempx = 0;
    _tempy = 0;
    _ref = entities.elements;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      com = _ref[_i];
      console.log(com.data.x, com.data.y);
      _tempx = _tempx > com.data.x ? com.data.x : _tempx;
      _tempy = _tempy > com.data.y ? com.data.y : _tempy;
    }
    console.log(_tempx, _tempy);
    move = new kk.Tween({
      node: stage,
      x: Math.abs(_tempx) + 100,
      y: Math.abs(_tempy) + 100,
      duration: 0.4,
      easing: Kinetic.Easings.EaseInOut,
      onFinish: function() {
        return canFunc.reDrawBackLayer();
      }
    });
    move.play();
  },
  getOverlayLines: function(circle) {
    var i, line, pos, pos_end, pos_start, result, _ref;
    result = [];
    pos = circle.getAbsolutePosition();
    _ref = entities.lines;
    for (i in _ref) {
      line = _ref[i];
      pos_start = line.line.beginCircle.getAbsolutePosition();
      pos_end = line.line.endCircle.getAbsolutePosition();
      if ((Object.equal(pos_start, pos)) || (Object.equal(pos_end, pos))) {
        result.push(line.line);
      }
    }
    return result;
  },
  getRealArea: function() {
    var arr, i, last, obj, pos, size, stagePos, _height, _i, _len, _width;
    arr = [].add(entities.layers).add(entities.components);
    _height = $('#middle-board').height();
    _width = $('#middle-board').width();
    stagePos = stage.getPosition();
    last = {};
    for (i = _i = 0, _len = arr.length; _i < _len; i = ++_i) {
      obj = arr[i];
      pos = tools.convertAbsToRelPos(obj);
      size = obj.getRealSize();
      if (i === 0) {
        last = {
          l: pos.x,
          t: pos.y,
          r: pos.x + size.width,
          b: pos.y + size.height
        };
      }
      if ((last.t == null) || pos.y < last.t) {
        last.t = pos.y;
      }
      if ((last.r == null) || (pos.x + size.width) > last.r) {
        last.r = pos.x + size.width;
      }
      if ((last.b == null) || (pos.y + size.height) > last.b) {
        last.b = pos.y + size.height;
      }
      if ((last.l == null) || pos.x < last.l) {
        last.l = pos.x;
      }
    }
    last.l -= 30;
    last.t -= 30;
    last.r += 30;
    last.b += 30;
    return last;
  },
  getAreaByComs: function() {
    var last, stagePos, _height, _width;
    last = tools.getRealArea();
    _height = $('#middle-board').height();
    _width = $('#middle-board').width();
    if ((last.r - last.l) < _width) {
      last.r = last.l + _width;
    }
    if ((last.b - last.t) < _height) {
      last.b = last.t + _height;
    }
    stagePos = stage.getPosition();
    if (last.l + stagePos.x > 0) {
      last.l = -stagePos.x;
    }
    if (last.t + stagePos.y > 0) {
      last.t = -stagePos.y;
    }
    if (_width - stagePos.x > last.r) {
      last.r = _width - stagePos.x;
    }
    if (_height - stagePos.y > last.b) {
      last.b = _height - stagePos.y;
    }
    return last;
  },
  getWorkArea: function() {
    var area, result;
    area = tools.getAreaByComs();
    result = {
      t: area.t - def.navImg.offset,
      l: area.l - def.navImg.offset,
      r: area.r + def.navImg.offset,
      b: area.b + def.navImg.offset
    };
    return result;
  },
  checkLogin: function(flag) {
    var loginMail;
    loginMail = $.cookie('loginMail');
    if (loginMail) {
      return true;
    } else {
      if (!flag) {
        $('#loginModal').modal('show');
      }
      return false;
    }
  },
  getOsCode: function(osStr) {
    var k, v, _ref;
    _ref = def.osStr;
    for (k in _ref) {
      v = _ref[k];
      if (v === osStr) {
        return parseInt(k);
      }
    }
    return 0;
  },
  getOsVal: function(osCode) {
    var k, v, _ref;
    _ref = def.osStr;
    for (k in _ref) {
      v = _ref[k];
      if (parseInt(k) === osCode) {
        return v;
      }
    }
    return null;
  },
  getOsValByStr: function(str) {
    var index, k, v, _ref;
    index = 0;
    _ref = def.os;
    for (k in _ref) {
      v = _ref[k];
      if (v === str) {
        index = k;
        break;
      }
    }
    return def.osStr[index];
  },
  getOsStrByVal: function(val) {
    var index, k, v, _ref;
    index = 0;
    _ref = def.osStr;
    for (k in _ref) {
      v = _ref[k];
      if (v === val) {
        index = k;
        break;
      }
    }
    if (index > 0) {
      return def.os[index];
    } else {
      return val;
    }
  },
  getOsBit: function(osStr, isMapped) {
    var osCode;
    osCode = tools.getOsCode(osStr);
    switch (osCode) {
      case 6:
      case 9:
        return 32;
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 7:
      case 8:
      case 10:
        return 64;
      default:
        if (isMapped) {
          return 64;
        } else {
          if (global.imageInfoList[osStr]) {
            return global.imageInfoList[osStr].osBit;
          } else {
            return 0;
          }
        }
    }
  },
  getOsType: function(osStr) {
    var osCode;
    osCode = tools.getOsCode(osStr);
    switch (osCode) {
      case 1:
      case 2:
        return 'centos';
      case 3:
        return 'ubuntu';
      case 4:
        return 'debian';
      case 5:
        return 'redhat';
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
        return 'windows';
      default:
        if (global.imageInfoList[osStr]) {
          return global.imageInfoList[osStr].osType;
        } else {
          return 'custom';
        }
    }
  },
  getImageType: function(imageId) {
    var systemImageIndex;
    systemImageIndex = tools.getOsCode(imageId);
    if (systemImageIndex > 0) {
      return 'System';
    } else {
      return 'Custom';
    }
  },
  getSysClass: function(osValue) {
    var first3str;
    first3str = osValue.substr(0, 3);
    switch (first3str) {
      case 'ubu':
        return 'ubuntu';
      case 'ali':
        return 'aliyun-linux';
      case 'win':
        return 'windows-server';
      case 'deb':
        return 'debian';
      case 'cen':
        return 'centos';
    }
  },
  formatOsType: function(str) {
    var _str;
    _str = str.remove(' ').toLowerCase();
    if (_str.has('window')) {
      return 'windows';
    } else if (_str.has('radhat')) {
      return 'redhat';
    } else if (_str.has('dibian')) {
      return 'debian';
    } else if (_str.has('ubuntu')) {
      return 'ubuntu';
    } else if (_str.has('centos')) {
      return 'centos';
    } else {
      return _str;
    }
  },
  getCpu: function(n) {
    return "" + n + "核";
  },
  getDbMemory: function(n) {
    return "" + n + "M";
  },
  getAutoUnit: function(m, u) {
    m = parseInt(m);
    u = u || 1024;
    switch (false) {
      case !(m < u):
        return "" + m + "M";
      default:
        return "" + (m / u) + "G";
    }
  },
  HTMLEncode: function(str) {
    var s;
    s = "";
    if (str.length === 0) {
      return "";
    }
    s = str.replace(/&/g, "&");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/\'/g, "'");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\n/g, "<br>");
    return s;
  },
  HTMLDecode: function(str) {
    var s;
    s = "";
    if (str.length === 0) {
      return "";
    }
    s = str.replace(/&gt;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/'/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(/<br>/g, "\n");
    return s;
  },
  checkValidPos: function(node, node_pos) {
    var i, l, l_pos, l_size, node_size, parent_pos, parent_size, parent_type, _ref;
    node_size = node.getRealSize();
    parent_type = node.parent.getType();
    if (parent_type === 'Layer') {
      _ref = entities.layers.union(entities.components);
      for (i in _ref) {
        l = _ref[i];
        if (l.parent.kind && l.parent.kind !== 'globalLayer') {
          continue;
        }
        l_pos = l.getPosition();
        l_size = l.getRealSize();
        if (l !== node && l_pos.x < (node_pos.x + node_size.width + def.gridMin) && (l_pos.x + l_size.width + def.gridMin) > node_pos.x && l_pos.y < (node_pos.y + node_size.height + def.gridMin * 1) && (l_pos.y + l_size.height + def.gridMin * 1) > node_pos.y) {
          return false;
        }
      }
      return true;
    } else {
      parent_size = node.parent.getRealSize();
      parent_pos = node.parent.getPosition();
      if (node_pos.x > 0 && node_pos.y > 0 && node_pos.x + node_size.width < parent_size.width && node_pos.y + node_size.height < parent_size.height) {
        return true;
      } else {
        return false;
      }
    }
  },
  deleteNode: function(isReleaseServer, node) {
    var kind, msg, name, _instanceId, _map, _ref;
    node = node != null ? node : global.selectObj;
    kind = node.kind;
    name = node.data.name;
    msg = "您确定删除组件 <span class=\"com-name-confirm\" title=\"" + name + "\">" + name + "</span> 吗？";
    if (kind === 'layer') {
      msg = "删除层 <span class=\"com-name-confirm\" title=\"" + name + "\">" + name + "</span>，层内的组件也会删除，并且在同步之后，将会释放已关联的服务。您确定吗？";
    } else if (kind === 'ecs') {
      if (isReleaseServer === true && tools.isMapped(node.data)) {
        msg = "删除ECS <span class=\"com-name-confirm\" title=\"" + name + "\">" + name + "</span> 组件，在同步之后将会释放以下ECS服务:";
        msg += "<ul class=\"list-delete-confirm\">";
        _ref = node.data.maps;
        for (_instanceId in _ref) {
          _map = _ref[_instanceId];
          msg += "<li>InstanceId: " + _instanceId + "</li>";
        }
        msg += "</ul>";
        msg += "你确定吗？";
      }
    }
    bootbox.confirm(msg, function(callback) {
      if (callback === true) {
        if (isReleaseServer === true) {
          switch (node.getKind()) {
            case 'ecs':
              task.ecs.pushDel(node.data);
              break;
            case 'oss':
              task.oss.pushDel(node);
          }
        }
        canFunc.destroyObj(node);
        domFunc.hideTip();
        domFunc.onRightArrowHide();
        return canFunc.saveHistory();
      }
    });
    $('.option-list').remove();
    return false;
  },
  moveNode: function(node, direction) {

    /*
    获取自己的位置，获取父级的类型和位置
    检查父级是不是group
    如果是group，那么检查父级边缘，然后移动
    如果不是group，那么检查层，然后移动
     */
    var absPos, node_pos;
    node_pos = node.getPosition();
    switch (direction) {
      case 't':
        node_pos.y -= def.gridMin;
        break;
      case 'b':
        node_pos.y += def.gridMin;
        break;
      case 'l':
        node_pos.x -= def.gridMin;
        break;
      case 'r':
        node_pos.x += def.gridMin;
        break;
      default:
        break;
    }
    node_pos = {
      x: 10 * (Math.round(node_pos.x / 10)),
      y: 10 * (Math.round(node_pos.y / 10))
    };
    if (tools.checkValidPos(node, node_pos)) {
      node.setPosition(node_pos);
      absPos = node.getAbsolutePosition();
      node.setAbsPos(absPos.x, absPos.y);
      node.moveToTop();
      canFunc.distroyLine(node);
      canFunc.reLine(node);
      try {
        canFunc.lineSelect(node);
      } catch (_error) {}
      domFunc.hideTip();
      layer.batchDraw();
    }
  },
  setCursor: function(style) {
    $('#container').css('cursor', style);
  },
  guid: function() {
    var s4;
    s4 = function() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  },
  addIcheckStyle: function(obj, ichecktype) {
    if (ichecktype) {
      if (ichecktype === 'checkbox') {
        obj.iCheck({
          checkboxClass: 'icheckbox_flat-orange'
        });
      } else {
        obj.iCheck({
          radioClass: 'iradio_flat-orange'
        });
      }
    } else {
      obj.iCheck({
        checkboxClass: 'icheckbox_flat-orange',
        radioClass: 'iradio_flat-orange'
      });
    }
  },
  calculateEcsDiskSize: function(disks) {
    var disk, tempSize, _i, _len;
    tempSize = 0;
    for (_i = 0, _len = disks.length; _i < _len; _i++) {
      disk = disks[_i];
      if (!disk.isSystem) {
        tempSize += disk.size;
      }
    }
    return tempSize;
  },
  addLog: function(logType, parmObj) {
    var checkLogin, loginMail, postData;
    checkLogin = tools.checkLogin(1);
    if (logType === 'login') {
      checkLogin = true;
    }
    if (checkLogin) {
      loginMail = $.cookie('loginMail');
      postData = {
        type: logType,
        loginMail: loginMail,
        content: $.toJSON(parmObj)
      };
      $.post('/log/add', postData);
    }
  },
  getOpenEcs: function() {
    var com, tempArr, _i, _len, _ref;
    tempArr = [];
    _ref = entities.components;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      com = _ref[_i];
      if (com.kind === 'ecs') {
        tempArr.push(com);
      }
    }
    return tempArr;
  },
  getOpenCom: function() {
    var com, tempArr, _i, _len, _ref;
    tempArr = [];
    _ref = entities.components;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      com = _ref[_i];
      if (Object.size(com.data.maps) > 0) {
        tempArr.push(com);
      }
    }
    return tempArr;
  },
  disableModal: function(modal_id) {
    $("#" + modal_id).removeClass('modal');
    $("#" + modal_id + " .close").removeAttr('data-dismiss');
    $("#" + modal_id + " .modal-footer .btn-default").removeAttr('data-dismiss');
    $("#" + modal_id + " .modal-footer .btn-warning").attr('disabled', 'disabled');
  },
  enableModal: function(modal_id) {
    $("#" + modal_id).addClass('modal');
    $("#" + modal_id + " .close").attr('data-dismiss', 'modal');
    $("#" + modal_id + " .modal-footer .btn-default").attr('data-dismiss', 'modal');
    $("#" + modal_id + " .modal-footer .btn-warning").removeAttr('disabled');
  },
  isAllOk: function(type) {
    var e, i, result, _ref;
    result = true;
    switch (type) {
      case 'ecs':
        _ref = data.ecs;
        for (i in _ref) {
          e = _ref[i];
          if (e.osVal == null) {
            result = false;
            break;
          } else {
            continue;
          }
        }
        break;
      default:
        break;
    }
    return result;
  },
  showOverflowText: function(str, w, f) {
    var charCode, currLen, i, len, newStr, realLen, subLen, _i;
    currLen = 0;
    len = realLen = str.length;
    charCode = -1;
    newStr = '';
    for (i = _i = 0; _i < len; i = _i += 1) {
      charCode = str.charCodeAt(i);
      if (charCode >= 0 && charCode <= 128) {
        currLen++;
      } else {
        currLen += 2;
        realLen++;
      }
      newStr += str[i];
      if (currLen >= w) {
        break;
      }
    }
    if (!f) {
      if (currLen < realLen) {
        subLen = str.charCodeAt(newStr.length - 1) <= 128 ? newStr.length - 2 : newStr.length - 1;
        newStr = newStr.substr(0, subLen) + '...';
      }
    }
    return newStr;
  },
  getNodeIdByInstanceId: function(instanceId) {
    var id, obj, _ref, _ref1, _ref2, _ref3;
    _ref = data.ecs;
    for (id in _ref) {
      obj = _ref[id];
      if (Object.size(obj.maps)) {
        if (obj.maps[instanceId]) {
          return obj.id;
        }
      }
    }
    _ref1 = data.rds;
    for (id in _ref1) {
      obj = _ref1[id];
      if (Object.size(obj.maps)) {
        if (obj.maps[instanceId]) {
          return obj.id;
        }
      }
    }
    _ref2 = data.slb;
    for (id in _ref2) {
      obj = _ref2[id];
      if (Object.size(obj.maps)) {
        if (obj.maps[instanceId]) {
          return obj.id;
        }
      }
    }
    _ref3 = data.oss;
    for (id in _ref3) {
      obj = _ref3[id];
      if (Object.size(obj.maps)) {
        if (obj.maps[instanceId]) {
          return obj.id;
        }
      }
    }
    return instanceId;
  },
  getNodeIdByOpenListsEcsId: function(instanceId) {
    var id, nodeId, obj, _obj, _ref;
    nodeId = instanceId;
    _ref = data.ecs;
    for (id in _ref) {
      obj = _ref[id];
      _obj = obj.openLists.find(function(_ol) {
        return _ol.instanceId === instanceId;
      });
      if (_obj) {
        nodeId = id;
        break;
      }
    }
    return nodeId;
  },
  playSound: function(type) {
    var notifyAudio;
    switch (type) {
      case 'notify':
        notifyAudio = $('#notify-audio').get(0);
        notifyAudio.play();
        break;
      default:
        notifyAudio = $('#notify-audio').get(0);
        notifyAudio.play();
    }
  },
  checkLoginStatus: function(callback) {
    var loginMail;
    loginMail = $.cookie('loginMail');
    if (loginMail) {
      $.get('/user/checklogin', function(data) {
        return callback(data);
      });
    }
  },
  clearLoginInfo: function() {
    $.removeCookie('loginMail');
    $.removeCookie('archiid');
    $.removeCookie('archiinfo');
    $.removeCookie('archiname');
    $.removeCookie('isRam');
    $('#mylogin,#myreg,#saveBtn').show();
    $('#userinfo,#comListModelBtn,#saveModelBtn,#scriptBtn,#monitorBtn,#notifyBtn,#structListModelBtn').hide();
    $('#components2 .components-inner').html('');
    return $('#bottomBoardScriptList').html('');
  },
  isMapped: function(node) {
    if (node) {
      if (!node.depend && Object.size(node.maps) > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      if (Object.size(global.comList) > 0 && global.accessKeyId) {
        return true;
      } else {
        return false;
      }
    }
  },
  getDateBytime: function(_time) {
    var d, date, fmt, h, m, mm, ms, ss, y;
    date = new Date(parseInt(_time) * 1000);
    y = date.getFullYear();
    m = date.getMonth() + 1;
    d = date.getDate();
    h = date.getHours();
    mm = date.getMinutes();
    ss = date.getSeconds();
    ms = date.getMilliseconds();
    fmt = "" + y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + ss;
    return fmt;
  },
  formateDate: function(date, sign) {
    var d, fmt, h, m, mm, ms, s, ss, y;
    y = date.getFullYear();
    m = date.getMonth() + 1;
    d = date.getDate();
    h = date.getHours();
    mm = date.getMinutes();
    ss = date.getSeconds();
    ms = date.getMilliseconds();
    s = sign || '/';
    fmt = "" + y + s + m + s + d + " " + h + ":" + mm + ":" + ss;
    return fmt;
  },
  setLayerMask: function(comObj, color, opacity) {
    var _color, _opacity;
    _color = color || 'orange1';
    _opacity = opacity || opacity === 0 ? opacity : .1;
    if (comObj) {
      comObj.setColor(_color);
    }
  },
  getAngle: function(pos1, pos2) {
    var angle, arr, arrowAngle, arrowCenter, arrowLength;
    arr = [];
    arrowLength = def.lineArrow.length;
    arrowCenter = def.lineArrow.center;
    arrowAngle = def.lineArrow.angle;
    angle = parseInt(Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x) / Math.PI * 180);
    arr[0] = pos2.x - parseInt(arrowLength * Math.cos(Math.PI / 180 * (angle - arrowAngle)));
    arr[1] = pos2.y - parseInt(arrowLength * Math.sin(Math.PI / 180 * (angle - arrowAngle)));
    arr[2] = pos2.x - parseInt(arrowLength * Math.cos(Math.PI / 180 * (angle + arrowAngle)));
    arr[3] = pos2.y - parseInt(arrowLength * Math.sin(Math.PI / 180 * (angle + arrowAngle)));
    arr[4] = pos2.x - parseInt(arrowCenter * Math.cos(angle * Math.PI / 180));
    arr[5] = pos2.y - parseInt(arrowCenter * Math.sin(angle * Math.PI / 180));
    return arr;
  },
  renameOpenLists: function(_data) {
    var i, item, name, _i, _len, _ref;
    name = _data.name;
    _ref = _data.openLists;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      item = _ref[i];
      item.instanceName = "" + name + (i + 1);
    }
    return _data.openLists;
  },
  clearDeletedComponent: function(instanceId, kind) {
    var dataKind, findNode, idKind, isClear, nodeData, nodeId;
    isClear = false;
    dataKind = data[kind];
    if (!Object.size(dataKind)) {
      return;
    }
    idKind = 'instanceId';
    switch (kind) {
      case 'ecs':
        idKind = 'instanceId';
        break;
      case 'rds':
        idKind = 'DBInstanceId';
        break;
      case 'slb':
        idKind = 'LoadBalancerId';
        break;
      case 'oss':
        idKind = 'Name';
    }
    for (nodeId in dataKind) {
      nodeData = dataKind[nodeId];
      if (tools.isMapped(nodeData)) {
        if (Object.has(nodeData.maps, instanceId)) {
          isClear = true;
          if (Object.size(nodeData.maps === 1)) {
            canFunc.destroyObj(nodeData.id);
          } else {
            delete nodeData.maps[instanceId];
            nodeData.openLists.remove(function(n) {
              return n[idKind] === instanceId;
            });
            findNode = layer.find("#" + nodeData.id);
            if (findNode[0]) {
              findNode[0].setAmount(Object.size(nodeData.maps));
            }
          }
        }
      }
    }
    delete global.comList[instanceId];
    delete global.selectComObjList[instanceId];
    return isClear;
  },
  getQueryString: function(name) {
    var r, reg;
    reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    r = window.location.search.substr(1).match(reg);
    if (r !== null) {
      return unescape(r[2]);
    }
    return null;
  }
};