var AbsLayer;

AbsLayer = function (params) {
    var backRect, childWrapGroup, corner, dashRect, iconObj, k, layerGroup, leftBottomCorner, leftTopCorner, rightBottomCorner, rightTopCorner, tempImgIco, tempWedge, title, titleGroup, titleRect, titleText, _config, _corners, _id, _params, _ref;
    _params = params || {};
    _id = tools.rand();
    _config = {
        x: 80,
        y: 80,
        draggable: true,
        category: 'layer',
        kind: 'layer',
        name: "默认层" + (entities.layers.length + 1),
        id: "layer_" + _id,
        tname: _id,
        width: def.layer.width,
        height: def.layer.height
    };
    _params = $.extend({}, _config, _params);
    layerGroup = new kk.Group({
        x: _params.x,
        y: _params.y,
        draggable: _params.draggable,
        name: _params.name,
        id: _params.id,
        category: _params.category,
        kind: _params.kind,
        tname: _params.tname
    });
    dashRect = new kk.Rect({
        width: _params.width,
        height: _params.height,
        stroke: def.color.orange,
        strokeWidth: 4,
        dashArray: [8, 5],
        cornerRadius: 5,
        name: 'layerrect'
    });
    backRect = new kk.Rect({
        width: _params.width,
        height: _params.height,
        fill: '#dbe3ef',
        opacity: .3,
        name: 'layerbackground'
    });
    childWrapGroup = new kk.Group;
    childWrapGroup.add(backRect);
    childWrapGroup.add(dashRect);
    layerGroup.add(childWrapGroup);
    title = {
        x: 25,
        y: -11,
        w: def.title.w,
        h: def.title.h
    };
    titleRect = new kk.Rect({
        width: title.w,
        height: title.h,
        strokeWidth: 2,
        stroke: def.color.lightGray,
        cornerRadius: 10,
        fill: 'white',
        name: 'layertitleshape'
    });
    titleText = new kk.Text({
        width: title.w,
        height: title.h,
        text: "" + (tools.showOverflowText(_params.name, 10)),
        fontSize: 10,
        fontFamily: '微软雅黑',
        padding: 7,
        fill: '#444',
        align: 'center',
        name: "layertitle_" + _id
    });
    titleGroup = new kk.Group({
        x: title.x,
        y: title.y
    });
    titleGroup.add(titleRect);
    titleGroup.add(titleText);
    layerGroup.add(titleGroup);
    layerGroup.titleGroup = titleGroup;
    iconObj = global.images['layerInfo'];
    tempWedge = new kk.Circle({
        radius: def.layer.cornerR,
        fill: '#a7b3c4',
        name: 'layerwedge'
    });
    tempImgIco = new kk.Image({
        x: -iconObj.width / 2,
        y: -iconObj.height / 2,
        image: iconObj
    });
    leftTopCorner = new kk.Group({
        name: 'layercorner',
        visible: false
    });
    leftTopCorner.add(tempWedge);
    leftTopCorner.add(tempImgIco);
    layerGroup.add(leftTopCorner);
    iconObj = global.images['layerConnect'];
    tempWedge = new kk.Circle({
        radius: def.layer.cornerR,
        fill: '#a7b3c4',
        name: 'layerwedge'
    });
    tempImgIco = new kk.Image({
        x: -iconObj.width / 2,
        y: -iconObj.height / 2,
        image: iconObj
    });
    rightTopCorner = new kk.Group({
        x: _params.width,
        y: 0,
        name: 'layercorner',
        visible: false
    });
    rightTopCorner.add(tempWedge);
    rightTopCorner.add(tempImgIco);
    layerGroup.add(rightTopCorner);
    iconObj = global.images['layerOperate'];
    tempWedge = new kk.Circle({
        radius: def.layer.cornerR,
        fill: '#a7b3c4',
        name: 'layerwedge'
    });
    tempImgIco = new kk.Image({
        x: -iconObj.width / 2,
        y: -iconObj.height / 2,
        image: iconObj
    });
    leftBottomCorner = new kk.Group({
        x: 0,
        y: _params.height,
        name: 'layercorner',
        visible: false
    });
    leftBottomCorner.add(tempWedge);
    leftBottomCorner.add(tempImgIco);
    layerGroup.add(leftBottomCorner);
    iconObj = global.images['layerResize'];
    tempWedge = new kk.Circle({
        radius: def.layer.cornerR,
        fill: '#a7b3c4',
        name: 'layerwedge'
    });
    tempImgIco = new kk.Image({
        x: -iconObj.width / 2,
        y: -iconObj.height / 2,
        image: iconObj
    });
    rightBottomCorner = new kk.Group({
        x: _params.width,
        y: _params.height,
        name: 'layercorner',
        visible: false
    });
    rightBottomCorner.add(tempWedge);
    rightBottomCorner.add(tempImgIco);
    layerGroup.add(rightBottomCorner);
    layerGroup.texts = {
        titleText: titleText
    };
    layerGroup.rects = {
        dashRect: dashRect,
        backRect: backRect
    };
    layerGroup.corners = {
        leftTop: leftTopCorner,
        rightTop: rightTopCorner,
        leftBottom: leftBottomCorner,
        rightBottom: rightBottomCorner
    };
    layerGroup.category = layerGroup.attrs.category;
    layerGroup.kind = layerGroup.attrs.kind;
    layerGroup.tname = _id;
    layerGroup.on('mousedown touchstart', canFunc.onLayerMouseOrTouchDown);
    layerGroup.on('mouseup touchend', canFunc.onLayerMouseOrTouchEnd);
    layerGroup.on('click tap', canFunc.onLayerClick);
    layerGroup.on('dragstart', canFunc.onLayerEntitiesDragStart);
    layerGroup.on('dragmove', canFunc.onLayerEntitiesDragMove);
    layerGroup.on('dragend', canFunc.onLayerEntitiesDragEnd);
    layerGroup.on('mouseover', canFunc.onLayerEntitiesMouseOver);
    layerGroup.on('mouseout', canFunc.onLayerEntitiesMouseOut);
    layerGroup.corners.leftTop.on('click tap', canFunc.onLayerLeftTopMouseDown);
    layerGroup.corners.rightTop.on('mousedown touchstart', canFunc.onLayerRightTopMouseDown);
    layerGroup.corners.leftBottom.on('click tap', canFunc.onLayerLeftBottomMouseDown);
    layerGroup.corners.rightBottom.on('mousedown touchstart', canFunc.onLayerRightBottomMouseDown);
    layerGroup.corners.leftTop.on('mouseover', canFunc.onLeftTopMouseOver);
    layerGroup.corners.leftTop.on('mouseout', canFunc.onLeftTopMouseOut);
    _ref = layerGroup.corners;
    for (k in _ref) {
        corner = _ref[k];
        corner.on('mouseover', canFunc.cornerMouseOver);
        corner.on('mouseout', canFunc.cornerMouseOut);
    }
    entities.layers.push(layerGroup);
    layerGroup.data = data[_params.kind][_params.id] = {
        id: _params.id,
        name: _params.name,
        tname: _params.tname,
        kind: _params.kind,
        x: _params.x,
        y: _params.y,
        width: _params.width,
        height: _params.height,
        children: [],
        remark: ''
    };
    canFunc.initNewLayer(layerGroup);
    _id = null;
    _config = null;
    _corners = null;
    _params = null;
    dashRect = null;
    return layerGroup;
};
