import {ICloudOptions} from '../type/type'
import { Shape } from './Shape';

class Cloud extends Shape {
  ctx: CanvasRenderingContext2D;
  r: number;
  startX: number;
  startY: number;
  x_number: number;
  y_number: number;
  width: number;
  height: number;
  constructor(ctx: CanvasRenderingContext2D, options: ICloudOptions) {
    super(ctx, {
      ...options,
      type: 'cloud',
    
    });
    const {
      r,
      startX,
      startY,
      width,
      height,
    } = options;

    this.ctx = ctx;
    this.r = r;
    this.startX = startX;
    this.startY = startY;
    this.x_number = (Math.abs(width) - 4*r)/(2 *r) < 0 ?  0 : (Math.abs(width) - 4*r)/(2 *r);
    this.y_number = (Math.abs(height) - 4*r)/(2 *r)<0 ? 0: (Math.abs(height) - 4*r)/(2 *r);

    this.width = Math.ceil((width) / (2 *r))* 2*r;
    this.height = Math.ceil((height) / (2 * r)) * 2*r;;
    
    if(width <0){
      this.startX = this.startX  + width ;

    }
    if(height <0 && Math.abs(height) > r) {
      this.startY = this.startY + height;
    }
  }

  drawTopWidthArc(_startX: number, _startY: number,ctx: CanvasRenderingContext2D | Path2D) {
    for (let i = 0; i < this.x_number + 1; i++) {
      ctx.moveTo(_startX + 3 * this.r, _startY);
      ctx.arc(_startX + 2 * this.r, _startY, this.r, 0, Math.PI, true);
      _startX += 2 * this.r;
    }
    return {
      x: _startX,
      y: _startY,
    };
  }
  drawBottomWidthArc(_startX: number, _startY: number, ctx: CanvasRenderingContext2D | Path2D) {
    for (let i = 0; i < this.x_number + 1; i++) {
      ctx.moveTo(_startX + 3 * this.r, _startY);
      ctx.arc(_startX + 2 * this.r, _startY, this.r, 0, Math.PI, false);
      _startX -= 2 * this.r;
    }
    return {
      x: _startX,
      y: _startY,
    };
  }
  drawLeftHeightArc(_startX: number, _startY: number, ctx: CanvasRenderingContext2D | Path2D) {
    for (let i = 0; i < this.y_number + 1; i++) {
      ctx.moveTo(_startX, _startY + 3 * this.r);
      ctx.arc(_startX, _startY + 2 * this.r, this.r, 0.5 * Math.PI, -0.5 * Math.PI, false);
      _startY -= 2 * this.r;
    }
    return {
      x: _startX,
      y: _startY,
    };
  }
  drawRightHeightArc(_startX: number, _startY: number, ctx: CanvasRenderingContext2D | Path2D) {
    for (let i = 0; i < this.y_number + 1; i++) {
      ctx.moveTo(_startX, _startY + 3 * this.r);
      ctx.arc(_startX, _startY + 2 * this.r, this.r, 0.5 * Math.PI, -0.5 * Math.PI, true);
      _startY += 2 * this.r;
    }
    return {
      x: _startX,
      y: _startY,
    };
  }
  draw(ctx: CanvasRenderingContext2D | Path2D){
    ctx.arc(this.startX, this.startY, this.r, Math.PI / 2, 0, false);
    const { x, y } = this.drawTopWidthArc(this.startX, this.startY + this.r, ctx);
    ctx.arc(x, y, this.r, -Math.PI, 0.5 * Math.PI, false);
    const { x: x2, y: y2 } = this.drawRightHeightArc(x, y, ctx);

    ctx.arc(x2, y2, this.r, -0.5 * Math.PI, Math.PI, false);

    const { x: x3, y: y3 } = this.drawBottomWidthArc(x2 - 4 * this.r, y2, ctx);
    this.drawLeftHeightArc(x3 + 4 * this.r, y3 - 2 * this.r, ctx);
  }
  renderCloud() {
    this.ctx.save();
    this.ctx.beginPath();
    this.draw(this.ctx);
    this.ctx.stroke();
    this.ctx.restore();

  }
  getShapeData(): Record<string, any> {
    const shape = super.getShapeData()
      return {
        ...shape,
        startX: this.startX,
        startY: this.startY,
        width: this.currentX - this.startX,
        height: this.currentY - this.startY,
        r: this.r
      }
  }
}
export {
  Cloud
}