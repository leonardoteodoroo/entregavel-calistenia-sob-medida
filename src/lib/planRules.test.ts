import { getTodayDayNumber } from './planRules';

describe('getTodayDayNumber', () => {
  it('retorna o próximo dia baseado nos concluídos', () => {
    expect(getTodayDayNumber([])).toBe(1);
    expect(getTodayDayNumber([1, 2, 3])).toBe(4);
  });

  it('limita ao máximo de 28 dias', () => {
    const days = Array.from({ length: 28 }, (_, index) => index + 1);
    expect(getTodayDayNumber(days)).toBe(28);
  });
});
