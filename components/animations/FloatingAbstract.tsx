import React from "react";

export function FloatingAbstract() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[0] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw] max-w-[1200px] max-h-[1200px] rounded-full mix-blend-lighten opacity-100"
        style={{
          background: "radial-gradient(circle, rgba(201,168,76,0.4) 0%, rgba(201,168,76,0) 60%)",
          animation: "float-slow 20s ease-in-out infinite alternate"
        }}
      />
      <div 
        className="absolute w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] max-w-[900px] max-h-[900px] rounded-full mix-blend-lighten opacity-100"
        style={{
          background: "radial-gradient(circle, rgba(201,168,76,0.5) 0%, rgba(201,168,76,0) 60%)",
          animation: "float-slow-reverse 25s ease-in-out infinite alternate"
        }}
      />
      <style>{`
        @keyframes float-slow {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(5%, 5%) scale(1.1); }
          100% { transform: translate(-5%, -5%) scale(0.9); }
        }
        @keyframes float-slow-reverse {
          0% { transform: translate(10%, 10%) scale(0.9); }
          50% { transform: translate(-5%, -10%) scale(1.1); }
          100% { transform: translate(10%, -5%) scale(1); }
        }
      `}</style>
    </div>
  );
}
