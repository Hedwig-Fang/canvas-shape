import { IShape, IShapeOptions } from "../type/type";

class Shape implements IShape {
  strokeStyle: any;
  type!: string;
  startX!: number;
  startY!: number;
  currentX!: number;
  currentY!: number;
  ctx!: CanvasRenderingContext2D;
  options!: IShapeOptions;
  constructor(_ctx: CanvasRenderingContext2D, options: IShapeOptions) {
    this.type = options.type;
    this.strokeStyle = options.strokeStyle;
  }


  getShapeData(): Record<string, string>{
    return {
      type: this.type,
      strokeStyle: this.strokeStyle
    }; // 返回形状的类型
  }

}
export {
  Shape
}