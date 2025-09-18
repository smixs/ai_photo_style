import React from 'react';

export function RetroGrid({ className }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute h-full w-full overflow-hidden [perspective:200px] ${className || ''}`}
      style={{ '--grid-angle': `65deg` } as React.CSSProperties}
    >
      {/* Grid */}
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div
          className={
            "animate-grid " +
            "[background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] " +
            "[margin-left:-50%] [transform-origin:100%_0_0] [width:600vw] " +
            "[background-image:linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.4)_1px,transparent_0)]"
          }
        />
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent to-90%" />
    </div>
  );
}
