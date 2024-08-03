import { create } from "zustand";

type GameState = {
  blocksCount: number;
};

export default create<GameState>()(() => {
  return {
    blocksCount: 3,
  };
});
