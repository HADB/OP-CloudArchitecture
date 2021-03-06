// Generated by CoffeeScript 1.7.1
var canvasBind;

canvasBind = {
  init: function() {
    var container, jDocument, templayer;
    stage.on('mousedown touchstart', canFunc.onStageMouseDown);
    stage.on('mousemove touchmove', canFunc.onStageMouseMove);
    stage.on('mouseup touchend', canFunc.onStageMouseUp);
    stage.on('dragstart', canFunc.onDragStageStart);
    stage.on('dragend', canFunc.onDragStageEnd);
    stage.on('click tap', canFunc.onStageClick);
    container = $("#container");
    jDocument = $(document);
    if (!($.cookie('isEdit') || $.cookie('archiname') || $.cookie('structid'))) {
      templayer = new comFactory({
        kind: 'layer'
      });
      layer.add(templayer);
      layer.batchDraw();
    }
    canFunc.initEvent();
  }
};
