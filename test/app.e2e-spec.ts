import { checkWinner, initialState } from 'src/functional-core/play_functions';
import { GameState } from 'src/functional-core/types';

describe('Penalty Shootout', () => {
  it('should initialize with correct state', () => {
    expect(initialState).toEqual({
      scoreA: 0,
      scoreB: 0,
      currentRound: 1,
      shots: [],
      isFinished: false,
    });
  });

  it('should detect early winner', () => {
    const state: GameState = {
      ...initialState,
      scoreA: 3,
      scoreB: 0,
      currentRound: 3,
      shots: [],
    };

    const result = checkWinner(state);
    expect(result.isFinished).toBe(true);
    expect(result.winner).toBe('A');
  });
});
