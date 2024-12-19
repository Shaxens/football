import { GameState, Shot } from './types';

export const initialState: GameState = {
  scoreA: 0,
  scoreB: 0,
  currentRound: 1,
  shots: [],
  isFinished: false,
};

const simulateShot = (): boolean => Math.random() > 0.3;

const updateScore = (state: GameState, shot: Shot): GameState => {
  const newState = {
    ...state,
    shots: [...state.shots, shot],
    scoreA: shot.team === 'A' && shot.scored ? state.scoreA + 1 : state.scoreA,
    scoreB: shot.team === 'B' && shot.scored ? state.scoreB + 1 : state.scoreB,
    currentRound:
      shot.team === 'B' ? state.currentRound + 1 : state.currentRound,
  };

  return checkWinner(newState);
};

export const checkWinner = (state: GameState): GameState => {
  const { scoreA, scoreB, currentRound } = state;
  const maxRemainingShots = 5 - currentRound + 1;

  if (
    scoreA > scoreB + maxRemainingShots ||
    scoreB > scoreA + maxRemainingShots
  ) {
    return {
      ...state,
      isFinished: true,
      winner: scoreA > scoreB ? 'A' : 'B',
    };
  }

  if (currentRound > 5 && scoreA !== scoreB) {
    return {
      ...state,
      isFinished: true,
      winner: scoreA > scoreB ? 'A' : 'B',
    };
  }

  return state;
};

const playRound = (state: GameState): GameState => {
  if (state.isFinished) return state;

  const shotA: Shot = {
    team: 'A',
    scored: simulateShot(),
    round: state.currentRound,
  };

  const stateAfterA = updateScore(state, shotA);
  if (stateAfterA.isFinished) return stateAfterA;

  const shotB: Shot = {
    team: 'B',
    scored: simulateShot(),
    round: state.currentRound,
  };

  return updateScore(stateAfterA, shotB);
};

const display = (state: GameState, prevState: GameState): void => {
  const newShots = state.shots.slice(prevState.shots.length);
  let currentScoreA = prevState.scoreA;
  let currentScoreB = prevState.scoreB;

  newShots.forEach((shot) => {
    if (shot.scored) {
      if (shot.team === 'A') {
        currentScoreA++;
      } else {
        currentScoreB++;
      }
    }
    const score = `${currentScoreA}/${currentScoreB}`;
    const result = shot.scored ? '+1' : '0';
    const teamDisplay =
      shot.team === 'A'
        ? `(Équipe A : ${result} | Équipe B : -)`
        : `(Équipe A : - | Équipe B : ${result})`;

    console.log(
      `Tir ${shot.round * 2 - (shot.team === 'A' ? 1 : 0)} : Score : ${score} ${teamDisplay}`,
    );
  });

  if (state.isFinished && state.winner) {
    console.log(
      `Victoire : Équipe ${state.winner} (Score : ${state.scoreA}/${state.scoreB})`,
    );
  }
};

export const playPenaltyShootout = (
  state: GameState = initialState,
): GameState => {
  const newState = playRound(state);
  display(newState, state);
  return newState.isFinished ? newState : playPenaltyShootout(newState);
};
