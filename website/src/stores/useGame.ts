import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type GameState = {
  blocksCount: number;
  phase: string;
  start: () => void;
  restart: () => void;
  end: () => void;
  startTime: number;
  endTime: number;
};

export default create<GameState>()(
  subscribeWithSelector((set) => {
    return {
      blocksCount: 3,

      // Phases
      phase: "ready",
      start: () =>
        set((state) => {
          if (state.phase === "ready") {
            return { phase: "playing", startTime: Date.now() };
          }
          return {};
        }),
      restart: () =>
        set((state) => {
          if (state.phase === "playing" || state.phase === "ended") {
            return { phase: "ready" };
          }
          return {};
        }),
      end: () =>
        set((state) => {
          if (state.phase === "playing") {
            return { phase: "ended", endTime: Date.now() };
          }
          return {};
        }),

      // Time
      startTime: 0,
      endTime: 0,
    };
  })
);
