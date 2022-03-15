import MovableShape, { MovableShapeOptions } from "./MovableShape";
import Vector2D from "./Vector2D";

interface VehicleOptions extends MovableShapeOptions {
  mass: number;
  maxSpeed: number;
}

export default class Vehicle extends MovableShape {
  mass: number;
  maxSpeed: number;
  constructor({
    context,
    color,
    position,
    velocity,
    acceleration,
    mass,
    maxSpeed
  }: VehicleOptions) {
    super({ context, color, position, velocity, acceleration });
    this.mass = mass;
    this.maxSpeed = maxSpeed;
  }

  applyForce(vector: Vector2D) {
    this.acceleration.add(vector.divide(this.mass));
  }

  steer(vector: Vector2D) {
    const desiredVelocity = Vector2D.subtract(vector, this.position);
    desiredVelocity.setMagnitude(this.maxSpeed);
    const steeringVelocity = Vector2D.subtract(desiredVelocity, this.velocity);
    this.applyForce(steeringVelocity);
  }

  draw(): void {
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.moveTo(this.position.getX(), this.position.getY());
    this.context.lineTo(this.position.getX() + 40, this.position.getY() + 10);
    this.context.lineTo(this.position.getX(), this.position.getY() + 20);
    this.context.lineTo(this.position.getX(), this.position.getY());
    this.context.fill();
  }
}
