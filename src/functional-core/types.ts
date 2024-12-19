export type Shot = {
  team: 'A' | 'B';
  scored: boolean;
  round: number;
};

export type GameState = {
  scoreA: number;
  scoreB: number;
  currentRound: number;
  shots: Shot[];
  isFinished: boolean;
  winner?: 'A' | 'B';
};
