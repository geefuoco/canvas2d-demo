import Vector2D from "./Vector2D";
import Shape, { ShapeOptions, Movable } from "./Shape";

export interface MovableShapeOptions extends ShapeOptions {
  velocity: Vector2D;
  acceleration: Vector2D;
}

export default abstract class MovableShape extends Shape implements Movable {
  velocity: Vector2D;
  acceleration: Vector2D;
  constructor({
    context,
    color,
    position,
    velocity,
    acceleration
  }: MovableShapeOptions) {
    super({ context, position, color });
    this.velocity = velocity;
    this.acceleration = acceleration;
  }

  getVelocity(): Vector2D {
    return this.velocity;
  }

  setVelocity(velocity: Vector2D): void {
    this.velocity = velocity;
  }

  abstract draw(): void;

  update(): void {
    this.velocity = this.velocity.add(this.acceleration);
    this.position = this.position.add(this.velocity);
    this.acceleration.setX(0);
    this.acceleration.setY(0);
    this.draw();
  }
}
