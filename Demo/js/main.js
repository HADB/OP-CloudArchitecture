// Generated by CoffeeScript 1.7.1
$(function() {
  loader.loadImages(resources.loadImages, function() {
    canvas.createStage('container');
    domBind.init();
    canvasBind.init();
    navImg.init();
    domFunc.loginSuccessExec();
    task.monitor();
  });
});
