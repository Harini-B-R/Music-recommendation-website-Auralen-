import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function AnimatedBackground() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="absolute inset-0 -z-10">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          particles: {
            number: { value: 40 },
            color: { value: ["#ff6ec7", "#42a5f5", "#00e676", "#ffeb3b"] },
            shape: { type: "circle" },
            opacity: { value: 0.7 },
            size: { value: { min: 3, max: 8 } },
            move: { enable: true, speed: 2, direction: "none", random: true },
          },
        }}
      />
    </div>
  );
}
