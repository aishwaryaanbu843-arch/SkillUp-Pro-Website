export function ProgressBar({
  value,
  max = 100,
  color = 'ember',
  height = 'h-2.5',
  showLabel = false,
  label,
}: {
  value: number;
  max?: number;
  color?: 'ember' | 'crimson' | 'midnight' | 'green';
  height?: string;
  showLabel?: boolean;
  label?: string;
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const colorMap = {
    ember: 'bg-ember-500',
    crimson: 'bg-crimson-500',
    midnight: 'bg-midnight-700',
    green: 'bg-green-500',
  };
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm font-semibold text-midnight-700">{label}</span>
          <span className="text-sm font-bold text-midnight-900">{Math.round(pct)}%</span>
        </div>
      )}
      <div className={`w-full ${height} bg-midnight-100 rounded-full overflow-hidden`}>
        <div
          className={`${height} ${colorMap[color]} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
