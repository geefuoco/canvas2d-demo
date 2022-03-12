export default class Vector2D {
  x: number;
  y: number;
  magnitude: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.magnitude = this.calculateMagnitude(x, y);
  }

  private calculateMagnitude(x: number, y: number): number {
    return Math.hypot(x, y);
  }

  static fromAngle(angle: number): Vector2D {
    return new Vector2D(Math.cos(angle), Math.sin(angle));
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  getMagnitude(): number {
    return this.magnitude;
  }

  setX(x: number) {
    this.x = x;
  }

  setY(y: number) {
    this.y = y;
  }

  setMagnitude(magnitude: number) {
    this.normalize;
    this.multiply(magnitude);
  }

  add(vector: Vector2D): Vector2D {
    this.x += vector.getX();
    this.y += vector.getY();
    return this;
  }

  subtract(vector: Vector2D): Vector2D {
    this.x -= vector.getX();
    this.y -= vector.getY();
    return this;
  }

  multiply(scalar: number): Vector2D {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  normalize(): Vector2D {
    this.x /= this.magnitude;
    this.y /= this.magnitude;
    return this;
  }

  dot(vector: Vector2D): number {
    return this.x * vector.getX() + this.y + vector.getY();
  }

  angleBetween(vector: Vector2D): number {
    const value = this.dot(vector);
    return Math.acos((value / this.magnitude) * vector.getMagnitude());
  }
}
