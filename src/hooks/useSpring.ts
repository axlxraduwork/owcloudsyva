import { useEffect, useRef, useState } from "react";

type SpringConfig = {
  stiffness?: number;
  damping?: number;
  precision?: number;
};

export function useSpring(target: number, config: SpringConfig = {}) {
  const { stiffness = 0.16, damping = 0.8, precision = 0.001 } = config;
  const [value, setValue] = useState(target);
  const velocityRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const tick = () => {
      setValue((prev) => {
        const displacement = target - prev;
        const nextVelocity = velocityRef.current * damping + displacement * stiffness;
        const nextValue = prev + nextVelocity;
        velocityRef.current = nextVelocity;

        if (Math.abs(displacement) < precision && Math.abs(nextVelocity) < precision) {
          velocityRef.current = 0;
          return target;
        }

        frameRef.current = window.requestAnimationFrame(tick);
        return nextValue;
      });
    };

    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current);
    }
    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [target, stiffness, damping, precision]);

  return value;
}
