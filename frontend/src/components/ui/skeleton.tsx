import { cn } from "../../lib/utils";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-md border border-border/60 bg-surface-raised/70",
        className,
      )}
      {...props}
    />
  );
}

export default Skeleton;
