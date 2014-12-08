// Generated by CoffeeScript 1.6.3
var canvas;

canvas = {
  createStage: function(containerId) {
    var backImage, jQBody, stageHeight, stageWidth;
    jQBody = $('body');
    stageWidth = Math.max(jQBody.width(), 1124) - def.stage.marginH;
    stageHeight = Math.max(jQBody.height(), 768) - def.stage.marginV;
    window.stage = new kk.Stage({
      x: 0,
      y: 0,
      width: stageWidth,
      height: stageHeight,
      container: containerId,
      draggable: false
    });
    window.backLayer = new kk.Layer();
    window.layer = new kk.Layer();
    layer.category = 'globalLayer';
    layer.kind = 'globalLayer';
    global.horizontalLine = new kk.Line({
      strokeWidth: 1,
      stroke: def.color.guideLine,
      points: [0, stageHeight / 2, stageWidth, stageHeight / 2],
      visible: false
    });
    global.verticalLine = new kk.Line({
      strokeWidth: 1,
      stroke: def.color.guideLine,
      points: [stageWidth / 2, 0, stageWidth / 2, stageHeight],
      visible: false
    });
    layer.add(global.horizontalLine);
    layer.add(global.verticalLine);
    backImage = new kk.Image({
      id: 'backGridImage',
      x: 0,
      y: 0,
      width: stageWidth / global.stageScale,
      height: stageHeight / global.stageScale,
      fillPatternImage: global.images['backGrid']
    });
    backLayer.add(backImage);
    stage.add(backLayer);
    stage.add(layer);
    return stage;
  },
  resizeStage: function() {
    var availHeight, availWidth, jQBody;
    jQBody = $('body');
    availWidth = Math.max(jQBody.width(), 1024) - def.stage.marginH;
    availHeight = Math.max(jQBody.height(), 768) - def.stage.marginV;
    stage.setSize({
      width: availWidth,
      height: availHeight
    });
  },
  redrawBackgrid: function() {
    var availHeight, availWidth, backImage, jQBody;
    backImage = backLayer.getChildren()[0];
    jQBody = $('body');
    availWidth = Math.max(jQBody.width(), 1024) - def.stage.marginH;
    availHeight = Math.max(jQBody.height(), 768) - def.stage.marginV;
    backImage.setSize({
      width: availWidth / global.stageScale,
      height: availHeight / global.stageScale
    });
    stage.batchDraw();
  }
};