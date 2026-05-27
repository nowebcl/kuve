import CanvasController from "@/components/CanvasController";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <main className="relative w-full h-full overflow-hidden">
      {/* Custom dynamic glowing cursor */}
      <CustomCursor />

      {/* Main Single-Canvas Horizontal Cinematic Transition System */}
      <CanvasController />
    </main>
  );
}
