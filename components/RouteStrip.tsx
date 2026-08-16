export function RouteStrip({ className = "" }: { className?: string }) {
  return <div className={`route-strip ${className}`} aria-hidden="true" />;
}
