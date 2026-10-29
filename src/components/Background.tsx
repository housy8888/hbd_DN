export function Background() {
  return (
    <div className="bg" aria-hidden="true">
      <div className="bg-gradient" />
      <div className="bg-orbs">
        <span className="orb o1" />
        <span className="orb o2" />
        <span className="orb o3" />
      </div>
      <div className="bg-grid" />
      <div className="bg-noise" />
    </div>
  )
}
