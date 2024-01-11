import { Shape } from "./Shape";
import { IRectOptions } from "../type/type";
class Rect extends Shape {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  ctx: CanvasRenderingContext2D;
  constructor(ctx: CanvasRenderingContext2D, options: IRectOptions) {
    super(ctx, {
      ...options,
      type: "rect",
    });
    const {type,startX, startY, currentX, currentY } = options
    this.startX = startX;
    this.startY = startY;
    this.currentX = currentX;
    this.currentY = currentY;
    this.ctx = ctx;
  }
  draw(ctx: Path2D | CanvasRenderingContext2D) {
    ctx.rect(this.startX, this.startY, this.currentX - this.startX, this.currentY - this.startY);
    ctx.closePath();
  }
  renderRect(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    
  }
  getShapeData(): Record<string, any>{
   const shape = super.getShapeData();
    return {
      ...shape,
      x: this.startX,
      y: this.startY,
      width: this.currentX - this.startX,
      height: this.currentY - this.startY,
    }
  }
}

export {
  Rect
}