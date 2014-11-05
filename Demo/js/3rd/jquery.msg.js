    (function($) {

      $.msg = {
        
        // These properties can be read/written by accessing $.msg.propertyName from your scripts at any time
        
        verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
        horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
        repositionOnResize: true,           // re-centers the dialog on window resize
        overlayOpacity: .01,                // transparency level of overlay
        overlayColor: '#000',               // base color of overlay
        draggable: true,                    // make the dialogs draggable (requires UI Draggables plugin)
        okButton: '&nbsp;OK&nbsp;',         // text for the OK button
        cancelButton: '&nbsp;Cancel&nbsp;', // text for the Cancel button
        dialogClass: null,                  // if specified, this class will be applied to all dialogs
        
        // $.msg.config({okButton:"确定", cancelButton:"取消"})
        config: function( data ){
          if( typeof data.okButton !== undefined ) $.msg.okButton = data.okButton;
          if( typeof data.cancelButton !== undefined ) $.msg.cancelButton = data.cancelButton;
        },
        
        // Public methods
        
        alert: function(message, title, callback) {
          if( title == null ) title = 'Alert';
          $.msg._show(title, message, null, 'alert', function(result) {
            if( callback ) callback(result);
          });
        },
        
        confirm: function(message, title, callback) {
          if( title == null ) title = 'Confirm';
          $.msg._show(title, message, null, 'confirm', function(result) {
            if( callback ) callback(result);
          });
        },

        info: function(message, title, callback) {
          if( title == null ) title = 'Infomation';
          $.msg._show(title, message, null, 'info', function(result) {
            if( callback ) callback(result);
          });
        },

        ok: function(message, title, callback) {
          if( title == null ) title = 'Ok';
          $.msg._show(title, message, null, 'ok', function(result) {
            if( callback ) callback(result);
          });
        },

        error: function(message, title, callback) {
          if( title == null ) title = 'Error';
          $.msg._show(title, message, null, 'error', function(result) {
            if( callback ) callback(result);
          });
        },
        
        prompt: function(message, value, title, callback, placeholder) {
          if( title == null ) title = 'Prompt';
          $.msg._show(title, message, value, 'prompt', function(result) {
            if( callback ) callback(result);
          }, placeholder);
        },
        
        // Private methods
        
        _show: function(title, msg, value, type, callback, placeholder) {
          
          $.msg._hide();
          $.msg._overlay('show');
          
          $("BODY").append(['',
            '<div class="ui-modal">',
              '<table border="0">',
                '<tr>',
                  '<th colspan=10 class="span10 title" >Title</th>',
                '</tr>',
                '<tr>',
                  '<td class="icon" colspan=2>',
                    '<div></div>',
                  '</td>',
                  '<td class="message" colspan=8>',
                    '<div>',
                    '</div>',
                  '</td>',
                '</tr>',
                '<tr>',
                  '<td class="btn-panel span10" colspan=10>',
                    '',
                    '',
                  '</td>',
                '</tr>',
              '</table>',
            '</div>',
            ''].join("\r\n"));
          
          if( $.msg.dialogClass ) $(".ui-modal").addClass($.msg.dialogClass);
          
          // IE6 Fix
          var pos = (navigator.appVersion.indexOf("MSIE 6.")!=-1) ? 'absolute' : 'fixed'; 
          
          $(".ui-modal").css({
            position: pos,
            zIndex: 99999,
            padding: 0,
            margin: 0
          });
          
          $(".ui-modal .title").text(title);
          var icon = [];
          icon = {
            "confirm": {
              path:"M16,1.466C7.973,1.466,1.466,7.973,1.466,16c0,8.027,6.507,14.534,14.534,14.534c8.027,0,14.534-6.507,14.534-14.534C30.534,7.973,24.027,1.466,16,1.466z M17.328,24.371h-2.707v-2.596h2.707V24.371zM17.328,19.003v0.858h-2.707v-1.057c0-3.19,3.63-3.696,3.63-5.963c0-1.034-0.924-1.826-2.134-1.826c-1.254,0-2.354,0.924-2.354,0.924l-1.541-1.915c0,0,1.519-1.584,4.137-1.584c2.487,0,4.796,1.54,4.796,4.136C21.156,16.208,17.328,16.627,17.328,19.003z",
              color:"#CF8E3A"
            },
            "info": {
              path: "M16,1.466C7.973,1.466,1.466,7.973,1.466,16c0,8.027,6.507,14.534,14.534,14.534c8.027,0,14.534-6.507,14.534-14.534C30.534,7.973,24.027,1.466,16,1.466z M14.757,8h2.42v2.574h-2.42V8z M18.762,23.622H16.1c-1.034,0-1.475-0.44-1.475-1.496v-6.865c0-0.33-0.176-0.484-0.484-0.484h-0.88V12.4h2.662c1.035,0,1.474,0.462,1.474,1.496v6.887c0,0.309,0.176,0.484,0.484,0.484h0.88V23.622z",
              color:"#5F92FF"
            },
            "ok": {
              path:"M2.379,14.729 5.208,11.899 12.958,19.648 25.877,6.733 28.707,9.561 12.958,25.308z",
              color: "#39CC25"
            },
            "error":{
              path: "M29.225,23.567l-3.778-6.542c-1.139-1.972-3.002-5.2-4.141-7.172l-3.778-6.542c-1.14-1.973-3.003-1.973-4.142,0L9.609,9.853c-1.139,1.972-3.003,5.201-4.142,7.172L1.69,23.567c-1.139,1.974-0.207,3.587,2.071,3.587h23.391C29.432,27.154,30.363,25.541,29.225,23.567zM16.536,24.58h-2.241v-2.151h2.241V24.58zM16.428,20.844h-2.023l-0.201-9.204h2.407L16.428,20.844z",
              color: "#FF470D"
            }
          };
          //console.log(icon);
          var iooo = null;
          if(typeof Raphael == "function")switch( type ){
            case "confirm":
              iooo = icon.confirm;
              break;
            case "info":
              iooo = icon.info;
              break;
            case "ok":
              iooo = icon.ok;
              break;
            case "error":
              iooo = icon.error;
              break;
          }
          if( iooo != null && iooo != undefined ){
            path = iooo.path;
            color = iooo.color;
            paper = Raphael( $('.ui-modal .icon div')[0] , 50, 50)
            paper.path( path ).attr({
              "fill": color,
              "stroke": color
            }).transform("s1.6,1.6,0,0");
          }

          $(".message div").html(msg);
          
          $("#popup_container").css({
            minWidth: $("#popup_container").outerWidth(),
            maxWidth: $("#popup_container").outerWidth()
          });
          
          $.msg._reposition();
          $.msg._maintainPosition(true);

          $('.btn-cancel').hide();
          switch( type ) {
            case 'confirm':
              $('.ui-modal table tr:last td:last').html('<a href="javascript:void(0);" class="btn btn-ok">' + $.msg.okButton + '</a> <a href="javascript:void(0);" class="btn btn-cancel">' + $.msg.cancelButton + '</a>');
              $(".btn.btn-ok").click( function() {
                $.msg._hide();
                if( callback ) callback(true);
              });
              $(".btn.btn-cancel").click( function() {
                $.msg._hide();
                if( callback ) callback(false);
              });
              //$(".btn.btn-ok").focus();
              $(".btn.btn-ok, .btn.btn-cancel").keypress( function(e) {
                if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
                if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
              });
              $('.btn-cancel').show();
            break;
            case 'prompt':
              if( "undefined" == typeof placeholder ) placeholder = "";
              $('.ui-modal td.icon').remove();
              $('.ui-modal td.message div').html(  $('.ui-modal td.message div').html() + '<input type="text" placeholder="' + placeholder + '" value="' + value + '" id="popup_prompt">' ).css({'padding':'30px 60px 20px 60px'});
              $('.ui-modal table tr:last td:last').html('<a href="javascript:void(0);" class="btn btn-ok">' + $.msg.okButton + '</a> <a href="javascript:void(0);" class="btn btn-cancel">' + $.msg.cancelButton + '</a>');
              $("#popup_prompt").width( $("#popup_message").width() );
              $(".btn.btn-ok").click( function() {
                var val = $("#popup_prompt").val();
                $.msg._hide();
                if( callback ) callback( val );
              });
              $(".btn.btn-cancel").click( function() {
                $.msg._hide();
                if( callback ) callback( null );
              });
              $("#popup_prompt, #popup_ok, #popup_cancel").keypress( function(e) {
                if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
                if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
              });
              $("#popup_prompt").focus().select();
            break;
            default:
              $('.ui-modal table tr:last td:last').html('<a href="javascript:void(0);" class="btn btn-ok">' + $.msg.okButton + '</a>');
              $(".btn.btn-ok").click( function() {
                $.msg._hide();
                callback( $('#popup_prompt').val() );
              });
              $(".btn.btn-ok").keypress( function(e) {
                if( e.keyCode == 13 || e.keyCode == 27 ) $(".btn.btn-ok").trigger('click');
              });
            break;
          }
          
          // Make draggable
          if( $.msg.draggable ) {
            try {
              $(".ui-modal").draggable({ handle: $(".ui-modal table .title") });
              $(".ui-modal table .title").css({ cursor: 'move' });
              
              // Fix the bug about drag action chaos the overlay background.
              $(".window-overlay").removeClass('window-overlay').addClass('window-overlay-drag');
            } catch(e) { /* requires jQuery UI draggables */ }
          }
          $('.ui-modal').css({margin:'-'+($('.ui-modal').height()/2).toString()+'px -'+($('.ui-modal').width()/2).toString()+'px'})
        },
        
        _hide: function() {
          $(".ui-modal").remove();
          $.msg._overlay('hide');
          $.msg._maintainPosition(false);
        },
        
        _overlay: function(status) {
          switch( status ) {
            case 'show':
              $.msg._overlay('hide');
              $("BODY").append('<div id="popup_overlay" class="window-overlay"></div>');
              /*$("#popup_overlay").css({
                position: 'absolute',
                zIndex: 99998,
                top: '0px',
                left: '0px',
                width: '100%',
                height: $(document).height(),
                background: $.msg.overlayColor,
                opacity: $.msg.overlayOpacity
              });*/
            break;
            case 'hide':
              $("#popup_overlay").remove();
            break;
          }
        },
        
        _reposition: function() {
          var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.msg.verticalOffset;
          var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.msg.horizontalOffset;
          if( top < 0 ) top = 0;
          if( left < 0 ) left = 0;
          
          // IE6 fix
          if( navigator.appVersion.indexOf("MSIE 6." ) > -1 ) top = top + $(window).scrollTop();
          
          $("#popup_container").css({
            top: top + 'px',
            left: left + 'px'
          });
          $("#popup_overlay").height( $(document).height() );
        },
        
        _maintainPosition: function(status) {
          if( $.msg.repositionOnResize ) {
            switch(status) {
              case true:
                $(window).bind('resize', $.msg._reposition);
              break;
              case false:
                $(window).unbind('resize', $.msg._reposition);
              break;
            }
          }
        }
        
      }
      
    })(jQuery);
    
