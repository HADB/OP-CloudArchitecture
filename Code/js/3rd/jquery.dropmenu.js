    $(function(){
      if( "undefined" === typeof $.UI ) $.UI = [];
      $.extend( $.UI, {
        canvasdropmenu: function( options, xthis ){
          var _options = {
            offsetX : "100px",
            offsetY : "100px",
            position: "absolute",
            callback: function(){},
            item: [
              'copy',
              'del',
              'release',
              'config',
              'remark',
              'view',
              'save',
              'disklist',
              'script'
            ],
            _html :  ['<div class="option-list" style= >',
                        '<ul>',
                          '<li class="op-item op-copy" style="display: none;"><a href="javascript:void(0);" >复制</a></li>',
                          '<li class="op-item op-del" style="display: none;"><a href="javascript:void(0);" >从画布删除</a></li>',
                          '<li class="op-item op-release" style="display: none;"><a href="javascript:void(0);" >释放服务</a></li>',
                          '<li class="op-item op-save" style="display: none;"><a href="javascript:void(0);" >存为模板</a></li>',
                          '<li class="op-item op-config" style="display: none;"><a href="javascript:void(0);" >配置</a></li>',
                          '<li class="op-item op-remark" style="display: none;"><a href="javascript:void(0);" >备注</a></li>',
                          '<li class="op-item op-view" style="display: none;"><a href="javascript:void(0);">查看</a></li>',
                          '<li class="op-item op-disklist" style="display: none;"><a href="javascript:void(0);">数据盘列表</a></li>',
                          '<li class="op-item op-script" style="display: none;"><a href="javascript:void(0);">执行代码列表</a></li>',
                        '</ul>',
                      '</div>'].join("\r\n")
          };
          $.extend( _options, options );

          if( "undefined" !== typeof xthis ){
            var _kind = xthis.parent.kind ;
            _pos = xthis.getAbsolutePosition();
            _options.offsetX = $('canvas').offset().left + _pos.x - 15 - 8 * global.stageScale;
            _options.offsetY = $('canvas').offset().top + _pos.y + 15 * global.stageScale;
            switch( _kind ){
              case "layer":
                _options.item = ['del', 'copy', 'save'];
                _options.offsetX = $('canvas').offset().left + _pos.x - 5 - 15 * global.stageScale;
                _options.offsetY = $('canvas').offset().top + _pos.y + 15;
                break;
              case 'ecs':
                break;
              case 'slb':
                _options.item = ['del', 'copy', 'config'];
                break;
              case 'rds':
                _options.item = ['del', 'copy', 'save', 'config'];
                break;
              case "oss":
                _options.item = ['del', 'release'];
                break;
              default:
                _options.item = ['del'];
                break;
            }
          }

          $( _options._html )
          .css({ left: _options.offsetX, top: _options.offsetY, position: _options.position })
          .appendTo( $('body'));
          for( i = 0; i < _options.item.length; i++ ){
            $('.option-list .op-item.op-'+_options.item[i]).show();
          }
          
          _options.callback();
        }
      
      });
      
      $(document).on('mousedown, touchstart',function(){
        if($('.option-list')) $('.option-list').fadeOut(function(){
          $('.option-list').remove();
        });
      });
      
    });
