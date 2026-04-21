const years = Array.from({ length: 200 }, (_, i) => 1800 + i);

export default function TimeLine() {
  return (
    <div className="w-48 h-screen overflow-y-auto border-r">
      <div className="flex flex-col">
        {years.map((year) => (
          <div
            key={year}
            className="h-12 flex items-center justify-center border-b text-sm"
          >
            {year}
          </div>
        ))}
      </div>
    </div>
  );
}
