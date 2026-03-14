import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'available' | 'occupied' | 'preparing' | 'ready' | 'critical' | 'stable' | 'en-route' | 'confirmed' | 'pending';
  label?: string;
  className?: string;
  pulse?: boolean;
}

const statusStyles: Record<string, string> = {
  available: 'bg-success/10 text-success border-success/20',
  ready: 'bg-success/10 text-success border-success/20',
  confirmed: 'bg-success/10 text-success border-success/20',
  stable: 'bg-success/10 text-success border-success/20',
  occupied: 'bg-emergency/10 text-emergency border-emergency/20',
  critical: 'bg-emergency/10 text-emergency border-emergency/20',
  preparing: 'bg-warning/10 text-warning border-warning/20',
  pending: 'bg-warning/10 text-warning border-warning/20',
  'en-route': 'bg-medical-blue/10 text-medical-blue border-medical-blue/20',
};

export function StatusBadge({ status, label, className, pulse }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize',
        statusStyles[status],
        pulse && 'emergency-pulse',
        className
      )}
    >
      <span className={cn(
        'h-1.5 w-1.5 rounded-full',
        status === 'available' || status === 'ready' || status === 'confirmed' || status === 'stable' ? 'bg-success' : '',
        status === 'occupied' || status === 'critical' ? 'bg-emergency' : '',
        status === 'preparing' || status === 'pending' ? 'bg-warning' : '',
        status === 'en-route' ? 'bg-medical-blue' : '',
      )} />
      {label || status}
    </span>
  );
}
