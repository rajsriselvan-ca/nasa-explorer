
const SpaceBackground = () => {
  const stars = Array.from({ length: 200 }).map((_, i) => (
    <div
      key={i}
      className="absolute bg-white rounded-full animate-pulse"
      style={{
        width: `${Math.random() * 3}px`,
        height: `${Math.random() * 3}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.7 + 0.3,
        animationDuration: `${Math.random() * 3 + 1}s`
      }}
    />
  ));

  return (
    <div className="fixed inset-0 bg-black z-0">
      {stars}
    </div>
  );
};

export default SpaceBackground;