// Generated by CoffeeScript 1.7.1
var AbsSlb;

AbsSlb = function (params) {
    var comGroup, statusSynchroImage, textWrapGroup, titleText, _config, _params;
    _params = params || {};
    _config = {
        kind: 'slb'
    };
    _params = $.extend({}, _config, _params);
    comGroup = new AbsCom(_params);
    titleText = new kk.Text({
        x: 30,
        y: 86,
        width: 50,
        height: 42,
        align: 'center',
        text: "" + (tools.showOverflowText(comGroup.data.name, global.titleLenNormal)),
        fontSize: 12,
        wrap: 'char',
        fontFamily: 'monospace',
        fill: 'black'
    });
    textWrapGroup = new kk.Group;
    textWrapGroup.add(titleText);
    comGroup.add(textWrapGroup);
    comGroup.texts = {
        titleText: titleText
    };
    statusSynchroImage = new kk.Image({
        x: 35,
        y: -30,
        image: global.images.statusEdit,
        width: 28,
        height: 35,
        visible: false
    });
    comGroup.images.statusSynchro = statusSynchroImage;
    comGroup.add(statusSynchroImage);
    comGroup.data.openList = {
        isPublicAddress: true,
        isOpen: false
    };
    return comGroup;
};
