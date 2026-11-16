/** Início da carreira profissional, base do "X+ anos de experiência" exibido no site. */
const CAREER_START = { year: 2018, month: 0, day: 1 } as const;

/**
 * Anos completos de experiência desde 01/01/2018 até `now`.
 * Usado nas mensagens via placeholder `{years}` (ex.: "{years}+ anos de experiência").
 */
export function getYearsOfExperience(now: Date = new Date()): number {
  let years = now.getFullYear() - CAREER_START.year;
  const beforeAnniversary =
    now.getMonth() < CAREER_START.month ||
    (now.getMonth() === CAREER_START.month && now.getDate() < CAREER_START.day);
  if (beforeAnniversary) years -= 1;
  return years;
}
