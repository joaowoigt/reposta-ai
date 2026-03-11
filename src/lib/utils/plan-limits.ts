export const PLAN_LIMITS: Record<string, number> = {
  free: 5,
  creator: 50,
  pro: Infinity,
};

export function getPlanLimit(plan: string): number {
  return PLAN_LIMITS[plan] ?? 0;
}

export function getRemainingGenerations(plan: string, used: number): number {
  const limit = getPlanLimit(plan);
  if (limit === Infinity) return Infinity;
  return Math.max(0, limit - used);
}

export function canGenerate(plan: string, used: number): boolean {
  return used < getPlanLimit(plan);
}
