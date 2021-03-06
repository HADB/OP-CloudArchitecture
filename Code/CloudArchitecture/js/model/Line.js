// Generated by CoffeeScript 1.6.3
var Line;

Line = (function () {
    var getLineGroup, lineBroken, lineComs, lineLayerCom, lineLayers;

    getLineGroup = function (lineID) {
        var beginCircle, endCircle, group, infoCircle, path;
        group = new kk.Group({
            id: lineID,
            visible: global.lineVisible
        });
        path = new kk.Path({
            stroke: 'yearColor',
            lineJoin: 'round',
            strokeWidth: 2,
            opacity: 0.2,
            //dashArray: [5, 3]
        });
        beginCircle = new kk.Circle({
            radius: 8,
            fill: '#fff',
            stroke: '#bbb',
            strokeWidth: 2,
            visible: 0
        });
        endCircle = new kk.Circle({
            radius: 8,
            fill: '#fff',
            stroke: '#bbb',
            strokeWidth: 2,
            visible: 0
        });
        infoCircle = new kk.Circle({
            radius: 9,
            fillPatternImage: global.images['lineInfoIcon'],
            fillPatternX: 9,
            fillPatternY: 9
        });
        beginCircle.on('mouseover', function (e) {
            e.cancelBubble = true;
            return $('#container').css('cursor', 'pointer');
        });
        beginCircle.on('mouseout', function (e) {
            return $('#container').css('cursor', '-webkit-grab');
        });
        endCircle.on('mouseover', function (e) {
            e.cancelBubble = true;
            return $('#container').css('cursor', 'pointer');
        });
        endCircle.on('mouseout', function (e) {
            return $('#container').css('cursor', '-webkit-grab');
        });
        beginCircle.on('click tap', canFunc.delLine);
        endCircle.on('click tap', canFunc.delLine);
        infoCircle.on('click tap', canFunc.editLineInfo);
        infoCircle.on('mouseover', canFunc.onMouseOverLine);
        infoCircle.on('mouseout', canFunc.onMouseOutLine);
        group.add(path);
        group.add(beginCircle);
        group.add(endCircle);
        group.add(infoCircle);
        group.path = path;
        group.beginCircle = beginCircle;
        group.endCircle = endCircle;
        group.infoCircle = infoCircle;
        group.points = {};
        group.select = function () {
            this.beginCircle.setVisible(true);
            this.endCircle.setVisible(true);
            this.infoCircle.setFillPatternImage(global.images['lineInfoIcon_dark']);
            this.moveToTop();
            this.beginCircle.moveToTop();
            this.endCircle.moveToTop();
            this.infoCircle.setOpacity(1);
            this.path.setOpacity(1);
        };
        group.blur = function () {
            window.tl = this;
            this.beginCircle.setVisible(false);
            this.endCircle.setVisible(false);
            this.infoCircle.setFillPatternImage(global.images['lineInfoIcon']);
            this.moveToTop();
            this.path.setOpacity(0.2);
            this.infoCircle.setOpacity(0.2);
        };
        group.setColor = function (color) {
            group.path.setStroke(color);
        };
        group.redraw = function () {
            var data, _Q;
            if (global.lineType === def.lineType.rightAngle) {
                data = "M" + this.points.begin.x + " " + this.points.begin.y + " L" + this.points.p1.x + " " + this.points.p1.y + " L" + this.points.p2.x + " " + this.points.p2.y + " L" + this.points.end.x + " " + this.points.end.y;
            } else {
                if (this.points.begin.x === this.points.p1.x) {
                    _Q = {
                        x1: this.points.p1.x,
                        y1: this.points.begin.y + (this.points.p1.y - this.points.begin.y) / 2,
                        x2: this.points.p1.x + (this.points.p2.x - this.points.p1.x) / 2,
                        y2: this.points.p1.y + (this.points.p2.y - this.points.p1.y) / 2
                    };
                } else {
                    _Q = {
                        x1: this.points.begin.x + (this.points.p1.x - this.points.begin.x) / 2,
                        y1: this.points.p1.y,
                        x2: this.points.p1.x + (this.points.p2.x - this.points.p1.x) / 2,
                        y2: this.points.p1.y + (this.points.p2.y - this.points.p1.y) / 2
                    };
                }
                data = "M" + this.points.begin.x + " " + this.points.begin.y + " Q" + _Q.x1 + " " + _Q.y1 + " " + _Q.x2 + " " + _Q.y2 + " T" + this.points.end.x + " " + this.points.end.y;
            }
            this.path.setData(data);
        };
        return group;
    };

    lineLayerCom = function () { };

    lineLayers = function () { };

    lineComs = function () { };

    lineBroken = function (lineID, isRightAngle) {
        var absSumPadding, beginPos, data, diff, endPos, group, lineTo1, lineTo2, middleLen, middlePos, middleX, _Q;
        middleX = this.fromMiddlePos.x + (this.toMiddlePos.x - this.fromMiddlePos.x) / 2;
        diff = {
            x: this.toMiddlePos.x - this.fromMiddlePos.x,
            y: this.toMiddlePos.y - this.fromMiddlePos.y
        };
        absSumPadding = {
            x: Math.abs(this.fromSize.width / 2 + this.toSize.width / 2),
            y: Math.abs(this.fromSize.height / 2 + this.toSize.height / 2)
        };
        middleLen = {
            x: Math.abs(diff.x) - absSumPadding.x,
            y: Math.abs(diff.y) - absSumPadding.y
        };
        /* 逻辑说明
        如果是纵轴有叠加的情况，而水平没有叠加的时候，从下面连线
        其他情况从两边连线
        */

        if (Math.abs(diff.y) > absSumPadding.y && Math.abs(diff.x) < absSumPadding.x) {
            beginPos = {
                x: Math.floor(this.fromMiddlePos.x),
                y: Math.floor(this.fromMiddlePos.y + (diff.y > 0 ? this.fromSize.height / 2 : -this.fromSize.height / 2))
            };
            endPos = {
                x: Math.floor(this.toMiddlePos.x),
                y: Math.floor(this.toMiddlePos.y + (diff.y > 0 ? -this.toSize.height / 2 : this.toSize.height / 2))
            };
            lineTo1 = {
                x: beginPos.x,
                y: Math.floor(beginPos.y + (diff.y > 0 ? middleLen.y / 2 : -middleLen.y / 2))
            };
            lineTo2 = {
                x: endPos.x,
                y: lineTo1.y
            };
        } else {
            beginPos = {
                x: Math.floor(this.fromMiddlePos.x + this.fromSize.width / 2),
                y: Math.floor(this.fromMiddlePos.y)
            };
            endPos = {
                x: Math.floor(this.toMiddlePos.x - this.toSize.width / 2),
                y: Math.floor(this.toMiddlePos.y)
            };
            lineTo1 = {
                x: Math.floor(beginPos.x + Math.abs(middleLen.x / 2)),
                y: Math.floor(beginPos.y)
            };
            lineTo2 = {
                x: lineTo1.x,
                y: Math.floor(endPos.y)
            };
        }
        if (isRightAngle) {
            data = "M" + beginPos.x + " " + beginPos.y + " L" + lineTo1.x + " " + lineTo1.y + " L" + lineTo2.x + " " + lineTo2.y + " L" + endPos.x + " " + endPos.y;
        } else {
            if (beginPos.x === lineTo1.x) {
                _Q = {
                    x1: lineTo1.x,
                    y1: beginPos.y + (lineTo1.y - beginPos.y) / 2,
                    x2: lineTo1.x + (lineTo2.x - lineTo1.x) / 2,
                    y2: lineTo1.y + (lineTo2.y - lineTo1.y) / 2
                };
            } else {
                _Q = {
                    x1: beginPos.x + (lineTo1.x - beginPos.x) / 2,
                    y1: lineTo1.y,
                    x2: lineTo1.x + (lineTo2.x - lineTo1.x) / 2,
                    y2: lineTo1.y + (lineTo2.y - lineTo1.y) / 2
                };
            }
            data = "M" + beginPos.x + " " + beginPos.y + " Q" + _Q.x1 + " " + _Q.y1 + " " + _Q.x2 + " " + _Q.y2 + " T" + endPos.x + " " + endPos.y;
        }
        middlePos = {
            x: Math.floor(beginPos.x / 2 + endPos.x / 2),
            y: Math.floor(beginPos.y / 2 + endPos.y / 2)
        };
        group = getLineGroup(lineID);
        group.path.setData(data);
        group.beginCircle.setPosition(beginPos);
        group.endCircle.setPosition(endPos);
        group.infoCircle.setPosition(middlePos);
        group.points = {
            begin: beginPos,
            end: endPos,
            p1: lineTo1,
            p2: lineTo2
        };
        return group;
    };

    function Line(obj1, obj2, lineID) {
        var category, category1, category2, countLayer, middlePos1, middlePos2, pos1, pos2, setProperty, size1_inner, size1_outer, size2_inner, size2_outer;
        setProperty = function (reverse) {
            if (reverse) {
                this.from = obj2;
                this.to = obj1;
                this.fromMiddlePos = middlePos2;
                this.toMiddlePos = middlePos1;
                this.fromSize = size2_inner;
                this.toSize = size1_inner;
            } else {
                this.from = obj1;
                this.to = obj2;
                this.fromMiddlePos = middlePos1;
                this.toMiddlePos = middlePos2;
                this.fromSize = size1_inner;
                this.toSize = size2_inner;
            }
        };
        pos1 = tools.convertAbsToRelPos(obj1);
        pos2 = tools.convertAbsToRelPos(obj2);
        size1_inner = obj1.getInnerSize();
        size2_inner = obj2.getInnerSize();
        size1_outer = obj1.getRealSize();
        size2_outer = obj2.getRealSize();
        category1 = obj1.getCategory();
        category2 = obj2.getCategory();
        middlePos1 = {
            x: pos1.x + size1_outer.width / 2,
            y: pos1.y + size1_outer.height / 2
        };
        middlePos2 = {
            x: pos2.x + size2_outer.width / 2,
            y: pos2.y + size2_outer.height / 2
        };
        category = [category1, category2];
        countLayer = category.count('layer');
        if (middlePos2.x - middlePos1.x > 0) {
            setProperty(false);
        } else {
            setProperty(true);
        }
        if (global.lineType === def.lineType.rightAngle) {
            return lineBroken(lineID, true);
        } else {
            return lineBroken(lineID, false);
        }
    }

    return Line;

})();
