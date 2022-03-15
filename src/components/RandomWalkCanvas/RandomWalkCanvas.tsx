import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Rectangle from "../../Util/Rectangle";
import Vector2D from "../../Util/Vector2D";
import { CanvasProps } from "../canvasProps";
import "./RandomWalkCanvas.css";

const RandomWalkCanvas: React.FC<CanvasProps> = ({ height, width }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let animationId: number;
  let mover: Rectangle;

  const drawLoop = (context: CanvasRenderingContext2D) => {
    if (mover) {
      mover.setVelocity(Vector2D.fromAngle(Math.random() * 360));
      mover.update();
    }
    animationId = requestAnimationFrame(() => drawLoop(context));
  };

  useEffect(() => {
    const { current } = canvasRef;
    if (current) {
      const context = current.getContext("2d");
      if (context) {
        context.fillStyle = "rgb(0, 0, 0, 1)";
        context.fillRect(0, 0, width, height);
        mover = new Rectangle({
          context,
          color: "white",
          width: 2,
          length: 2,
          position: new Vector2D(width / 2, height / 2),
          velocity: new Vector2D(0, 0),
          acceleration: new Vector2D(0, 0)
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
      <Link to="/raycast">Raycast</Link>
      <Link to="/steer">Steer</Link>
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          data-testid="randomwalk-canvas"
          height={height}
          width={width}
        ></canvas>
      </div>
    </>
  );
};

export default RandomWalkCanvas;
