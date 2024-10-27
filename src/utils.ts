export const modFromAbilityScore = (score: number | null) => (score
  ? Math.floor((score - 10) / 2)
  : 0);

export const formatModifier = (modifier: number) => (
  modifier < 0 ? `${modifier}` : `+${modifier}`
);
