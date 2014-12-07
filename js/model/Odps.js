// Generated by CoffeeScript 1.6.3
var AbsOdps;

AbsOdps = function (params) {
    var comGroup, textWrapGroup, titleText, _config, _params;
    _params = params || {};
    _config = {
        kind: 'odps'
    };
    _params = $.extend({}, _config, _params);
    comGroup = new AbsCom(_params);
    titleText = new kk.Text({
        x: 27,
        y: 82,
        width: 70,
        height: 20,
        align: 'center',
        text: "" + (comGroup.data.name.substr(0, 8)),
        fontSize: 12,
        fill: 'black'
    });
    textWrapGroup = new kk.Group;
    textWrapGroup.add(titleText);
    comGroup.add(textWrapGroup);
    comGroup.texts = {
        titleText: titleText
    };
    return comGroup;
};