import { cn } from '../../utils/cn.util';

export interface WaveDividerProps {
  className?: string;
  flip?: boolean;
}

export function WaveDivider({ className, flip = false }: WaveDividerProps) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn('block h-8 w-full', flip && 'rotate-180', className)}
    >
      <path
        fill="currentColor"
        d="M0 32c240 32 480 32 720 16s480-32 720 0v32H0Z"
      />
    </svg>
  );
}
