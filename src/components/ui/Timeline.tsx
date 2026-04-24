"use client";

import { useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { parseAsString, useQueryState } from "nuqs";

const YEARS = Array.from({ length: 200 }, (_, i) => 1800 + i);
const ITEM_H = 40;

function YearRow({
  year,
  index,
  selectedIndex,
}: {
  year: number;
  index: number;
  selectedIndex: number;
}) {
  const dist = Math.abs(index - selectedIndex);
  const isSelected = index === selectedIndex;
  const isCentury = year % 100 === 0;
  const isDecade = year % 10 === 0;

  const tickW = isSelected ? 40 : isCentury ? 35 : isDecade ? 30 : 20;
  const fontSize = Math.max(10, 28 - dist * 2.2);
  const opacity = Math.max(0.5, 1 - dist * 0.14);
  const color = isSelected ? "rgba(0,0,0,1)" : `rgba(120,120,120,${opacity})`;

  return (
    <div className="flex items-center h-10 gap-2.5 pl-2">
      <motion.div
        animate={{
          width: tickW,
          height: isSelected ? 3 : 1,
          background: color,
        }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        initial={{ fontWeight: 400 }}
        animate={{
          fontSize,
          color,
          letterSpacing: isSelected ? "0.04em" : "0.01em",
        }}
        transition={{ duration: 0.15 }}
        style={{ fontWeight: isSelected ? 700 : 400 }}
      >
        {year}
      </motion.span>
    </div>
  );
}

export default function TimeLine() {
  const [year, setYear] = useQueryState(
    "year",
    parseAsString.withDefault("1850"),
  );

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const selectedIndex = YEARS.findIndex((y) => y === Number(year));

  useEffect(() => {
    const el = scrollRef.current;
    const idx = YEARS.findIndex((y) => y === Number(year));
    if (el) el.scrollTop = idx * ITEM_H;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollTop / ITEM_H);
    const clamped = YEARS[Math.max(0, Math.min(YEARS.length - 1, idx))];
    setYear(String(clamped));
  }, [setYear]);

  return (
    <div className="h-screen flex relative overflow-hidden font-mono">
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="w-50 overflow-y-scroll shrink-0 z-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="h-[50vh]" />
        {YEARS.map((y, i) => (
          <YearRow key={y} year={y} index={i} selectedIndex={selectedIndex} />
        ))}
        <div className="h-[50vh]" />
      </div>
    </div>
  );
}
