// Generated by CoffeeScript 1.7.1
var navImg;

navImg = {
  init: function() {
    var middleBoard, navScale, stagePos, stageSize, thumbImg, thumbSize, workArea, workSize;
    if (navigator.platform === 'iPad') {
      $('#canvasNav').remove();
      return;
    }
    middleBoard = $('#middle-board');
    stageSize = {
      width: middleBoard.width() - def.stage.marginH,
      height: middleBoard.height() - def.stage.marginV
    };
    stagePos = stage.getAbsolutePosition();
    workArea = tools.getWorkArea();
    workSize = {
      width: workArea.r - workArea.l,
      height: workArea.b - workArea.t
    };
    navScale = global.stageScale * Math.min(def.navImg.w / workSize.width, def.navImg.h / workSize.height);
    thumbSize = {
      width: workSize.width * navScale,
      height: workSize.height * navScale
    };

    /*
    clone对象的 toImage 的坐标起点是页面的像素点, 而且起点是从当前对象的原点开始算
    toImage 的尺寸也是如此
     */
    thumbImg = layer.toImage({
      x: workArea.l + stagePos.x,
      y: workArea.t + stagePos.y,
      width: workSize.width,
      height: workSize.height,
      callback: function(img) {
        var currFrame, _img;
        _img = $(img).css({
          maxWidth: def.navImg.w,
          maxHeight: def.navImg.h
        });
        $('#canvasNavImg .img').html(_img);
        currFrame = $('<div></div>');
        currFrame.css({
          position: 'absolute',
          width: stageSize.width * navScale + 'px',
          height: stageSize.height * navScale + 'px',
          top: (20 - (workArea.t + stagePos.y) * navScale) + 'px',
          left: (20 - (workArea.l + stagePos.x) * navScale) + 'px'
        });
        currFrame.draggable({
          containment: 'parent',
          cursor: 'move',
          drag: function() {
            var newStagePos, pos, posTmp;
            posTmp = $(this).position();
            pos = {
              x: (posTmp.left - 20) / navScale,
              y: (posTmp.top - 20) / navScale
            };
            newStagePos = {
              x: Math.floor(-(workArea.l + pos.x)),
              y: Math.floor(-(workArea.t + pos.y))
            };
            stage.setPosition(newStagePos);
            canFunc.fixBackLayer();
            canFunc.fixMaskBackLayer();
            stage.batchDraw();
          }
        }).addTouch();
        $('#canvasNavImg .border').html(currFrame);
      }
    });
  }
};