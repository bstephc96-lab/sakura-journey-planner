export function Petals({ count = 18 }: { count?: number }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${(i * 100) / count + Math.random() * 5}%`,
            animationDuration: `${10 + Math.random() * 12}s`,
            animationDelay: `${-Math.random() * 15}s`,
            transform: `scale(${0.6 + Math.random()})`,
          }}
        />
      ))}
    </div>
  );
}
