function HotelNumber({ floorNumber }: { floorNumber: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-text-secondary text-[14px] p-2 font-mono  text-nowrap">
        Floor {floorNumber / 100}
      </span>
      <div className="flex gap-3">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="bg-surface-raised px-2 py-1 border h-fit rounded-sm border-border text-text-secondary text-[12px] font-light cursor-pointer hover:border-border-strong hover:text-text-primary  hover:bg-surface transition-all"
          >
            {floorNumber + i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HotelNumber;
