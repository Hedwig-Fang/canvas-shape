import {  ICircleOptions } from "../type/type";
import { Shape } from "../shape/Shape";
class Circle extends Shape  {

  r: number;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  ctx: CanvasRenderingContext2D;
  constructor(ctx: CanvasRenderingContext2D, options: ICircleOptions) {
    const { startX, startY,currentX,currentY, r} = options;
    super(ctx, {
      ...options,
      type: 'circle',
    });
    this.ctx = ctx;
    this.startX = startX;
    this.startY = startY;
    this.currentX = currentX;
    this.currentY = currentY;
    this.r = r;
  }
  // 重绘时可传入path
  draw(ctx: CanvasRenderingContext2D | Path2D) {
    const rx = (this.currentX - this.startX);
    const ry = (this.currentY - this.startY);
    const r = Math.sqrt(rx * rx + ry * ry);

    // ctx.arc(rx + lastX, ry + lastY, r, 0, 2 * Math.PI);
    ctx.arc((this.startX + this.currentX) / 2, (this.startY + this.currentY) / 2, r / 2, 0, 2 * Math.PI);
  }
  // 用户画的时候渲染
  renderCricle(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    this.draw(this.ctx)
    ctx.closePath();
    ctx.restore();
  }
  getShapeData(): Record<string, any> {
   const shape = super.getShapeData();
    return {
      ...shape,
      x: (this.startX + this.currentX) / 2,
      y: (this.startY + this.currentY) / 2,
      r: this.r / 2,
    }
  }
}
export {
  Circle
}