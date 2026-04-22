"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

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
  const color = isSelected ? "black" : `rgba(120,120,120,${opacity})`;

  return (
    <div
      style={{
        height: `${ITEM_H}px`,
        display: "flex",
        alignItems: "center",
        paddingLeft: "16px",
        gap: "10px",
      }}
    >
      <motion.div
        animate={{
          width: tickW,
          height: isSelected ? 3 : 1,
          background: color,
        }}
        transition={{ duration: 0.14 }}
        style={{ flexShrink: 0 }}
      />
      <motion.span
        animate={{
          fontSize,
          color,
          letterSpacing: isSelected ? "0.04em" : "0.01em",
        }}
        transition={{ duration: 0.14 }}
        style={{
          fontWeight: isSelected ? 700 : 400,
          lineHeight: 1,
          whiteSpace: "nowrap",
          fontFamily: "'Courier New', monospace",
        }}
      >
        {year}
      </motion.span>
    </div>
  );
}

export default function TimeLine() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(100);

  useEffect(() => {
    if (scrollRef) {
      const el = scrollRef.current;
      if (el) el.scrollTop = selectedIndex * ITEM_H;
    }
  }, []);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollTop / ITEM_H);
    setSelectedIndex(Math.max(0, Math.min(YEARS.length - 1, idx)));
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Courier New', monospace",
      }}
    >
      <div
        ref={scrollRef}
        onScroll={onScroll}
        style={{
          width: "210px",
          overflowY: "scroll",
          flexShrink: 0,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          zIndex: 2,
        }}
      >
        <div style={{ height: "50vh" }} />
        {YEARS.map((year, i) => (
          <YearRow
            key={year}
            year={year}
            index={i}
            selectedIndex={selectedIndex}
          />
        ))}
        <div style={{ height: "50vh" }} />
      </div>
    </div>
  );
}
