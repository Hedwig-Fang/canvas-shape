'use strict';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var Shape = /** @class */ (function () {
    function Shape(_ctx, options) {
        this.type = options.type;
        this.strokeStyle = options.strokeStyle;
    }
    Shape.prototype.getShapeData = function () {
        return {
            type: this.type,
            strokeStyle: this.strokeStyle
        }; // 返回形状的类型
    };
    return Shape;
}());

var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(ctx, options) {
        var _this = this;
        var startX = options.startX, startY = options.startY, currentX = options.currentX, currentY = options.currentY, r = options.r;
        _this = _super.call(this, ctx, __assign(__assign({}, options), { type: 'circle' })) || this;
        _this.ctx = ctx;
        _this.startX = startX;
        _this.startY = startY;
        _this.currentX = currentX;
        _this.currentY = currentY;
        _this.r = r;
        return _this;
    }
    // 重绘时可传入path
    Circle.prototype.draw = function (ctx) {
        var rx = (this.currentX - this.startX);
        var ry = (this.currentY - this.startY);
        var r = Math.sqrt(rx * rx + ry * ry);
        // ctx.arc(rx + lastX, ry + lastY, r, 0, 2 * Math.PI);
        ctx.arc((this.startX + this.currentX) / 2, (this.startY + this.currentY) / 2, r / 2, 0, 2 * Math.PI);
    };
    // 用户画的时候渲染
    Circle.prototype.renderCricle = function (ctx) {
        ctx.save();
        ctx.beginPath();
        this.draw(this.ctx);
        ctx.closePath();
        ctx.restore();
    };
    Circle.prototype.getShapeData = function () {
        var shape = _super.prototype.getShapeData.call(this);
        return __assign(__assign({}, shape), { x: (this.startX + this.currentX) / 2, y: (this.startY + this.currentY) / 2, r: this.r / 2 });
    };
    return Circle;
}(Shape));

var Cloud = /** @class */ (function (_super) {
    __extends(Cloud, _super);
    function Cloud(ctx, options) {
        var _this = _super.call(this, ctx, __assign(__assign({}, options), { type: 'cloud' })) || this;
        var r = options.r, startX = options.startX, startY = options.startY, width = options.width, height = options.height;
        _this.ctx = ctx;
        _this.r = r;
        _this.startX = startX;
        _this.startY = startY;
        _this.x_number = (Math.abs(width) - 4 * r) / (2 * r) < 0 ? 0 : (Math.abs(width) - 4 * r) / (2 * r);
        _this.y_number = (Math.abs(height) - 4 * r) / (2 * r) < 0 ? 0 : (Math.abs(height) - 4 * r) / (2 * r);
        _this.width = Math.ceil((width) / (2 * r)) * 2 * r;
        _this.height = Math.ceil((height) / (2 * r)) * 2 * r;
        if (width < 0) {
            _this.startX = _this.startX + width;
        }
        if (height < 0 && Math.abs(height) > r) {
            _this.startY = _this.startY + height;
        }
        return _this;
    }
    Cloud.prototype.drawTopWidthArc = function (_startX, _startY, ctx) {
        for (var i = 0; i < this.x_number + 1; i++) {
            ctx.moveTo(_startX + 3 * this.r, _startY);
            ctx.arc(_startX + 2 * this.r, _startY, this.r, 0, Math.PI, true);
            _startX += 2 * this.r;
        }
        return {
            x: _startX,
            y: _startY,
        };
    };
    Cloud.prototype.drawBottomWidthArc = function (_startX, _startY, ctx) {
        for (var i = 0; i < this.x_number + 1; i++) {
            ctx.moveTo(_startX + 3 * this.r, _startY);
            ctx.arc(_startX + 2 * this.r, _startY, this.r, 0, Math.PI, false);
            _startX -= 2 * this.r;
        }
        return {
            x: _startX,
            y: _startY,
        };
    };
    Cloud.prototype.drawLeftHeightArc = function (_startX, _startY, ctx) {
        for (var i = 0; i < this.y_number + 1; i++) {
            ctx.moveTo(_startX, _startY + 3 * this.r);
            ctx.arc(_startX, _startY + 2 * this.r, this.r, 0.5 * Math.PI, -0.5 * Math.PI, false);
            _startY -= 2 * this.r;
        }
        return {
            x: _startX,
            y: _startY,
        };
    };
    Cloud.prototype.drawRightHeightArc = function (_startX, _startY, ctx) {
        for (var i = 0; i < this.y_number + 1; i++) {
            ctx.moveTo(_startX, _startY + 3 * this.r);
            ctx.arc(_startX, _startY + 2 * this.r, this.r, 0.5 * Math.PI, -0.5 * Math.PI, true);
            _startY += 2 * this.r;
        }
        return {
            x: _startX,
            y: _startY,
        };
    };
    Cloud.prototype.draw = function (ctx) {
        ctx.arc(this.startX, this.startY, this.r, Math.PI / 2, 0, false);
        var _a = this.drawTopWidthArc(this.startX, this.startY + this.r, ctx), x = _a.x, y = _a.y;
        ctx.arc(x, y, this.r, -Math.PI, 0.5 * Math.PI, false);
        var _b = this.drawRightHeightArc(x, y, ctx), x2 = _b.x, y2 = _b.y;
        ctx.arc(x2, y2, this.r, -0.5 * Math.PI, Math.PI, false);
        var _c = this.drawBottomWidthArc(x2 - 4 * this.r, y2, ctx), x3 = _c.x, y3 = _c.y;
        this.drawLeftHeightArc(x3 + 4 * this.r, y3 - 2 * this.r, ctx);
    };
    Cloud.prototype.renderCloud = function () {
        this.ctx.save();
        this.ctx.beginPath();
        this.draw(this.ctx);
        this.ctx.stroke();
        this.ctx.restore();
    };
    Cloud.prototype.getShapeData = function () {
        var shape = _super.prototype.getShapeData.call(this);
        return __assign(__assign({}, shape), { startX: this.startX, startY: this.startY, width: this.currentX - this.startX, height: this.currentY - this.startY, r: this.r });
    };
    return Cloud;
}(Shape));

var Rect = /** @class */ (function (_super) {
    __extends(Rect, _super);
    function Rect(ctx, options) {
        var _this = _super.call(this, ctx, __assign(__assign({}, options), { type: "rect" })) || this;
        options.type; var startX = options.startX, startY = options.startY, currentX = options.currentX, currentY = options.currentY;
        _this.startX = startX;
        _this.startY = startY;
        _this.currentX = currentX;
        _this.currentY = currentY;
        _this.ctx = ctx;
        return _this;
    }
    Rect.prototype.draw = function (ctx) {
        ctx.rect(this.startX, this.startY, this.currentX - this.startX, this.currentY - this.startY);
        ctx.closePath();
    };
    Rect.prototype.renderRect = function (ctx) {
        ctx.beginPath();
    };
    Rect.prototype.getShapeData = function () {
        var shape = _super.prototype.getShapeData.call(this);
        return __assign(__assign({}, shape), { x: this.startX, y: this.startY, width: this.currentX - this.startX, height: this.currentY - this.startY });
    };
    return Rect;
}(Shape));

exports.Circle = Circle;
exports.Cloud = Cloud;
exports.Rect = Rect;
