import AIPerformanceCard from "./AIperformancecard";
import FloorMapLegend from "./floormaplegend";
import HotelNumber from "./HotelNumber";

function HotelMapLayout() {
  return (
    <section className="max-w-7xl flex gap-4">
      <div className="w-[70%] bg-surface border-2 border-border rounded-2xl p-4">
        <div className="flex justify-between py-4 px-2 items-center ">
          <p className="text-sm font-mono text-text-secondary ">
            Hotel Floor Map — Live Incidents
          </p>
          <p className="text-xs font-sans text-text-secondary">
            Click room for details
          </p>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex flex-col ">
            <div className="flex flex-col gap-2">
              <HotelNumber floorNumber={400} />
              <HotelNumber floorNumber={300} />
              <HotelNumber floorNumber={200} />
              <HotelNumber floorNumber={100} />
            </div>

            <FloorMapLegend />
          </div>
        </div>
      </div>
      <div className="w-[30%]">
        <AIPerformanceCard />
      </div>
    </section>
  );
}

export default HotelMapLayout;
