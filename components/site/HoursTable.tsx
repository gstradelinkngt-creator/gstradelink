"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { HOURS } from "@/lib/site";

const noopSubscribe = () => () => {};

/** Weekly hours; highlights today on the client so cached pages stay correct. */
export function HoursTable({ className }: { className?: string }) {
  // null during SSR; the visitor's weekday once hydrated
  const today = useSyncExternalStore(
    noopSubscribe,
    () => new Date().getDay(),
    () => null,
  );

  return (
    <table className={cn("w-full text-sm", className)}>
      <tbody>
        {HOURS.map(({ day, time, open }, i) => {
          const isToday = i === today;
          return (
            <tr key={day} className={cn("border-t border-line", isToday && "bg-signal-soft/60")}>
              <th scope="row" className={cn("py-2.5 pl-2 text-left font-medium", isToday ? "text-ink" : "text-ink-soft")}>
                {day}
                {isToday && (
                  <span className="ml-2 rounded bg-ink px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-white">
                    Today
                  </span>
                )}
              </th>
              <td
                className={cn(
                  "py-2.5 pr-2 text-right font-mono text-[0.8rem] tabular-nums",
                  !open ? "text-red-600" : isToday ? "font-medium text-ink" : "text-ink-soft",
                )}
              >
                {time}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
