import { cn } from '@/ui/utils/style'

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-white/20', className)} {...props} />
}
