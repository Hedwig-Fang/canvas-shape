export interface ICloudOptions extends IShapeOptions{
  width: number;
  height: number;
  r: number;
}

export interface ICircle extends IShape {
  r: number;
}

export interface ICircleOptions extends IShapeOptions {
  r: number;
}
export interface ICircleData extends IShapeData {
  x: number;
  y: number;
  r: number;
}
export interface IRectOptions extends IShapeOptions{
  width: number;
  height: number;
}
export interface IRectData extends IShapeData {
  x: number;
  y: number;
  width: number;
  height: number;
}
// export interface IRect 

export interface IShapeData {
  type: string
}
export interface IShapeOptions {
  strokeStyle: any;
  type: string;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

export interface IShape {
  ctx: CanvasRenderingContext2D;
  options: IShapeOptions;
  getShapeData: () => {} 
}
