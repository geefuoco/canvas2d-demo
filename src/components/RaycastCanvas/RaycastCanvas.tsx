import React, { useEffect, useRef, useState } from "react";
import Line from "../../Util/Line";
import Vector2D from "../../Util/Vector2D";
import RayVehicle from "../../Util/RayVehicle";
import { Link } from "react-router-dom";
import "./RaycastCanvas.css";

interface Props {
  height: number;
  width: number;
}

const RaycastCanvas: React.FC<Props> = ({ height, width }) => {
  const [xOffset, setX] = useState<number>(0);
  const [yOffset, setY] = useState<number>(0);
  const [vehicle, setVehicle] = useState<RayVehicle>();
  const [lines, setLines] = useState<Line[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let animationId: number;

  const generateRandomLines = (
    context: CanvasRenderingContext2D,
    numberOfLines: number
  ) => {
    const lines: Line[] = [];
    for (let i = 0; i < numberOfLines; i++) {
      let x = Math.random() * width;
      const y = Math.random() * height;
      let x2 = Math.random() * width;
      const y2 = Math.random() * height;
      if (Math.abs(x - y) < 1) {
        x = Math.random() * width;
      }
      if (Math.abs(x2 - y2) < 1) {
        x2 = Math.random() * width;
      }
      lines.push(
        new Line({
          context,
          start: new Vector2D(x, y),
          end: new Vector2D(x2, y2)
        })
      );
    }
    return lines;
  };

  const drawLoop = (context: CanvasRenderingContext2D) => {
    context.fillStyle = "rgba(0, 0, 0, .4)";
    context.fillRect(0, 0, width, height);
    lines.forEach((line) => line.draw());
    if (vehicle) {
      vehicle.castTo(lines);
      vehicle.update();
    }
    animationId = requestAnimationFrame(() => drawLoop(context));
  };

  const setOffsets = (current: HTMLCanvasElement) => {
    const { x, y } = current.getBoundingClientRect();
    setX(Math.floor(x));
    setY(Math.floor(y));
  };

  const handleMouseMove = (ev: MouseEvent) => {
    if (vehicle) {
      vehicle.setPosition(
        new Vector2D(ev.clientX - xOffset, ev.clientY - yOffset)
      );
    }
  };

  useEffect(() => {
    const { current } = canvasRef;
    if (current) {
      const context = current.getContext("2d");
      if (context) {
        setOffsets(current);
        setLines(generateRandomLines(context, 5));
        const handleResize = () => {
          setOffsets(current);
        };
        setVehicle(
          new RayVehicle({
            context,
            color: "white",
            position: new Vector2D(width / 2, height / 2),
            radius: 10,
            velocity: new Vector2D(0, 0),
            acceleration: new Vector2D(0, 0)
          })
        );
        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }
    }
  }, []);

  useEffect(() => {
    const { current } = canvasRef;
    if (current) {
      const context = current.getContext("2d");
      if (context) {
        if (!animationId) {
          drawLoop(context);
        }

        current.addEventListener("mousemove", handleMouseMove);

        return () => {
          cancelAnimationFrame(animationId);
          current.removeEventListener("mousemove", handleMouseMove);
        };
      }
    }
  }, [xOffset, yOffset]);
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/randomwalk">Random Walk</Link>
      <div className="canvas-container">
        <canvas
          data-testid="raycast-canvas"
          ref={canvasRef}
          width={`${width}px`}
          height={`${height}px`}
        ></canvas>
      </div>
    </>
  );
};

export default RaycastCanvas;
