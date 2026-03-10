interface UsageCounterProps {
  used: number;
  limit: number;
}

export function UsageCounter({ used, limit }: UsageCounterProps) {
  const percentage = limit === Infinity ? 0 : (used / limit) * 100;
  const isAtLimit = used >= limit;

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            isAtLimit ? "bg-error-500" : percentage > 80 ? "bg-warning-500" : "bg-primary-500"
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <span className={`font-body text-sm shrink-0 ${isAtLimit ? "text-error-500 font-medium" : "text-neutral-500"}`}>
        {used} de {limit === Infinity ? "∞" : limit} usadas
      </span>
    </div>
  );
}
