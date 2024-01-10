export interface ICloud extends IShape{
  x: number;
  y: number;
  width: number;
  height: number;
  r: number;
}

export interface ICircle extends IShape {
  x: number;
  y: number;
  r: number;
}

export interface Rect extends IShape{
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IShape {
  type: string; // 形状类型
}