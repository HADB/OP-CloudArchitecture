// Generated by CoffeeScript 1.6.3
$(function() {
  return $.extend({
    tooltip: function(options) {
      var html, _options;
      _options = {
        left: 0,
        top: 0,
        text: '_tooltip_content_',
        arrow: 'right',
        appendTo: $('body'),
        _id: 'ui-tooltip-' + tools.rand(),
        _font_size: 16
      };
      $.extend(_options, options);
      html = ['<div id="', _options._id, '" class="tooltip fade in ', _options.arrow, '" style="position:absolute;left:', _options.left.toString(), 'px;top:', _options.top.toString(), 'px">', '<div class="tooltip-arrow"></div>', '<div class="tooltip-inner">', '<div class="tip-wrap" style="text-align:left;font-size:', _options._font_size, 'px">', _options.text.toString(), '</div>', '</div>', '</div>'].join('');
      $('.tooltip').remove();
      $(html).appendTo(_options.appendTo);
      return _options._id;
    },
    comtip: function(pos, data) {
      var id, netType, os, os_text, _tip_data, _tip_text_remark, _tip_text_storage;
      _tip_data = {
        text: '',
        left: pos.x + 255,
        top: pos.y
      };
      _tip_text_remark = data.remark;
      if ("" === _tip_text_remark) {
        _tip_text_remark = "咩~未配置备注";
      }
      switch (data.kind) {
        case "ecs":
          _tip_text_storage = '';
          if ("undefined" !== typeof data.disks) {
            data.disks.each(function(disk_item, curkey) {
              return _tip_text_storage += '<li>第' + (curkey + 1) + '块 :' + disk_item.size + 'GB</li>';
            });
          }
          if ("" === _tip_text_storage) {
            _tip_text_storage += "没有数据盘";
          } else {
            _tip_text_storage = '<ul style="font-size:14px; margin:2px 0 5px 20px;">' + _tip_text_storage + '</ul>';
          }
          os = data.osVal.split('_');
          os_text = os[0].replace(/[\d]u[\d]/, function(a) {
            return a.replace('u', '.');
          }) + '_' + os[1];
          _tip_data.text = ['', '<p>名称: ', data.name, '</p>', '<p>CPU: ', data.cpu, '核</p>', '<p>内存: ', data.memory, 'MB</p>', '<p>操作系统: ', os_text, '</p>', '<p>磁盘: ', _tip_text_storage, '</p>', '<p>带宽: ', data.bandWidth, 'mbps</p>', '<p>备注: ', _tip_text_remark, '</p>', ''].join('');
          break;
        case "rds":
          _tip_data.text = ['', '<p>名称: ', data.name, '</p>', '<p>类型: ', data.dbType, '</p>', '<p>内存: ', data.memory, 'MB</p>', '<p>储存: ', data.storage, 'GB</p>', '<p>备注: ', _tip_text_remark, '</p>', ''].join('');
          break;
        case "slb":
          netType = "公网";
          if ("undefined" !== typeof data.openList && "undefined" !== typeof data.openList.isPublicAddress && data.openList.isPublicAddress === false) {
            netType = "私网";
          }
          _tip_data.text = ['', '<p>名称: ', data.name, '</p>', '<p>网络类型: ', netType, '</p>', '<p>备注: ', _tip_text_remark, '</p>', ''].join('');
          break;
        case "oss":
          _tip_data.text = ['', '<p>名称: ', data.name, '</p>', '<p>备注: ', _tip_text_remark, '</p>', ''].join('');
      }
      id = $.tooltip(_tip_data);
      return $('#' + id).css({
        top: ($('#' + id).position().top - $('#' + id).outerHeight() / 2 + 140).toString() + 'px'
      });
    }
  });
});
