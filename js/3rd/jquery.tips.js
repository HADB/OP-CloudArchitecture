// Generated by CoffeeScript 1.7.1

/*
 @Author Ansel
 @params 
    options 包含name， desc， other
      other可以添加更丰富的信息
    obj Kinetic 对象
 @example 
    $.tips(options, obj)
    $.tips('hide') 可以隐藏当前画布的tips
 */
(function($) {
  var _options;
  _options = {
    left: 0,
    top: 0,
    positoin: 'absolute',
    id: 'jquery-tips-ca',
    maxWidth: 220,
    name: '',
    desc: '',
    radius: 10,
    arrowStyle: '',
    innerStyle: '',
    biasX: 0,
    biasY: 0
  };
  return $.extend({
    tips: function(options, obj) {
      var absPos, i, info, pos, radius, tipsHtml, _i, _len, _ref;
      if (options === 'hide') {
        $('.jquery-tips-ca').remove();
        return;
      }
      options = $.extend({}, _options, options);
      radius = 0;
      pos = {
        top: 0,
        left: 0
      };
      if (obj) {
        if (obj.className === 'Circle') {
          radius = obj.getRadius();
        } else {
          radius = options.radius;
        }
        absPos = obj.getAbsolutePosition();
        pos = {
          left: absPos.x + def.stage.marginH + options.biasX,
          top: absPos.y + def.stage.marginV + options.biasY
        };
      }
      if ($('#' + options.id).size() !== 0) {
        tipsHtml = $('#' + options.id);
      } else {
        tipsHtml = $("<div style=\"positoin:absolute;z-index:1;\" id=\"" + options.id + "\" class=\"tooltip jquery-tips-ca fade in\">\n  <div class=\"tooltip-arrow\" style=\"" + options.arrowStyle + "\"></div>\n  <div class=\"tooltip-inner\" style=\"" + options.innerStyle + "\">\n    <h3 class=\"name\"></h3>\n    <div class=\"desc\"></div>\n    <ul class=\"other\"></ul>\n  </div>\n</div>");
      }
      tipsHtml.find('.tooltip-inner .name').html(options.name);
      tipsHtml.find('.tooltip-inner .desc').html(options.desc);
      tipsHtml.find('.tooltip-inner .other').html('');
      if (options.other) {
        _ref = options.other;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          info = _ref[i];
          tipsHtml.find('.tooltip-inner .other').append("<li class=\"info\">" + info + "</li>");
        }
      }
      tipsHtml.css({
        maxWidth: options.maxWidth + 'px',
        width: 'auto'
      });
      setTimeout(function() {
        var height, left;
        height = tipsHtml.height() + 10;
        left = (pos.left - tipsHtml.width() / 2) + 'px';
        tipsHtml.remove('bottom').addClass('top');
        tipsHtml.css({
          top: (pos.top - height - radius) + 'px',
          left: left
        });
        return tipsHtml.show();
      }, 1);
      tipsHtml.appendTo('body').hide();
    }
  });
})($);