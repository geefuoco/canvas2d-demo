import React, { useEffect, useRef } from "react";
import { CanvasProps } from "../canvasProps";
import Vehicle from "../../Util/Vehicle";
import "./SteerCanvas.css";
import Vector2D from "../../Util/Vector2D";
import { Link } from "react-router-dom";
import Circle from "../../Util/Circle";

const SteerCanvas: React.FC<CanvasProps> = ({ height, width }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let animationId: number;
  let vehicle: Vehicle;
  let target: Circle;

  const drawLoop = (context: CanvasRenderingContext2D) => {
    context.fillStyle = "rgb(0, 0, 0)";
    context.fillRect(0, 0, width, height);

    if (vehicle && target) {
      target.draw();
      vehicle.update();
      vehicle.steer(target.getPosition());
    }

    animationId = requestAnimationFrame(() => drawLoop(context));
  };

  useEffect(() => {
    const { current } = canvasRef;
    if (current) {
      const context = current.getContext("2d");
      if (context) {
        vehicle = new Vehicle({
          context,
          color: "white",
          position: new Vector2D(100, 100),
          velocity: new Vector2D(1, 0),
          acceleration: new Vector2D(0, 0),
          mass: 1,
          maxSpeed: 0.02
        });
        target = new Circle({
          context,
          color: "green",
          position: new Vector2D(width / 2, height / 2),
          velocity: new Vector2D(0, 0),
          acceleration: new Vector2D(0, 0),
          radius: 5
        });
        drawLoop(context);

        return () => {
          cancelAnimationFrame(animationId);
        };
      }
    }
  }, []);

  return (
    <>
      <Link to="/randomwalk">RandomWalk</Link>
      <div className="canvas-container">
        <canvas ref={canvasRef} width={width} height={height}></canvas>
      </div>
    </>
  );
};

export default SteerCanvas;
