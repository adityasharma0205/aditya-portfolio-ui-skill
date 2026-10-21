import { useEffect, useRef } from 'react';

// Canvas adaptation of the portfolio's FlickeringGrid component.
export default function FlickeringGrid({ mode = 'dark', squareSize = 2, gridGap = 2, flickerChance = 0.3, maxOpacity = 0.3 }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!container || !canvas || !context) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let columns = 0;
    let rows = 0;
    let squares = new Float32Array();
    let pixelRatio = window.devicePixelRatio || 1;
    let frameId = 0;
    let lastTime = 0;
    let visible = false;

    const resolveColor = () => {
      const probe = document.createElement('span');
      probe.style.cssText = 'position:absolute;visibility:hidden;color:var(--foreground)';
      container.appendChild(probe);
      const value = getComputedStyle(probe).color || (mode === 'dark' ? 'rgb(250,250,250)' : 'rgb(20,20,20)');
      probe.remove();
      return value;
    };

    let color = resolveColor();

    const resize = () => {
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      pixelRatio = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      columns = Math.floor(width / (squareSize + gridGap));
      rows = Math.floor(height / (squareSize + gridGap));
      squares = new Float32Array(columns * rows);
      for (let index = 0; index < squares.length; index += 1) squares[index] = Math.random() * maxOpacity;
      color = resolveColor();
      draw();
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let column = 0; column < columns; column += 1) {
        for (let row = 0; row < rows; row += 1) {
          context.fillStyle = color;
          context.globalAlpha = squares[column * rows + row];
          context.fillRect(
            column * (squareSize + gridGap) * pixelRatio,
            row * (squareSize + gridGap) * pixelRatio,
            squareSize * pixelRatio,
            squareSize * pixelRatio,
          );
        }
      }
      context.globalAlpha = 1;
    };

    const animate = (time) => {
      if (!visible || reducedMotion) return;
      const deltaTime = lastTime ? (time - lastTime) / 1000 : 0;
      lastTime = time;
      for (let index = 0; index < squares.length; index += 1) {
        if (Math.random() < flickerChance * deltaTime) squares[index] = Math.random() * maxOpacity;
      }
      draw();
      frameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frameId);
      lastTime = 0;
      if (visible && !reducedMotion) frameId = requestAnimationFrame(animate);
    });
    visibilityObserver.observe(canvas);
    resize();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, [flickerChance, gridGap, maxOpacity, mode, squareSize]);

  return <div className="pixel-banner" ref={containerRef} aria-hidden="true"><canvas ref={canvasRef} /></div>;
}
