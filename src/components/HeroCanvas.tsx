import { useEffect, useRef } from 'react'

interface Particle {
  emoji: string
  x: number; y: number; vx: number; vy: number
  size: number; opacity: number
  bobOffset: number; bobSpeed: number
  rotAngle: number; rotSpeed: number
}

interface MacroRing {
  label: string; unit: string; value: number
  progress: number; targetProgress: number
  color: string; trackColor: string
  x: number; y: number; vx: number; vy: number
  radius: number; bobOffset: number; bobSpeed: number
}

interface Props {
  cardRef: React.RefObject<HTMLDivElement>
  textRef: React.RefObject<HTMLDivElement>
}

const FOOD_EMOJIS = [
  '🍎','🥦','🥕','🥑','🫐','🍌',
  '🍓','🫑','🍋','🥝','🍇','🧄',
  '🍊','🥗','🫒','🌽',
]

const MACRO_CONFIG = [
  { label: 'Protein', unit: 'g',    value: 68,   progress: 0.72, color: '#3B82F6', trackColor: '#BFDBFE' },
  { label: 'Carbs',   unit: 'g',    value: 142,  progress: 0.55, color: '#F59E0B', trackColor: '#FDE68A' },
  { label: 'Fat',     unit: 'g',    value: 34,   progress: 0.41, color: '#EC4899', trackColor: '#FBCFE8' },
  { label: 'Fiber',   unit: 'g',    value: 18,   progress: 0.65, color: '#10B981', trackColor: '#A7F3D0' },
  { label: 'Cals',    unit: 'kcal', value: 1840, progress: 0.78, color: '#EA580C', trackColor: '#FED7AA' },
]

function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function bounceOffRect(
  obj: { x: number; y: number; vx: number; vy: number },
  halfSize: number,
  rect: DOMRect,
  pad = 14,
) {
  const L = rect.left   - pad - halfSize
  const R = rect.right  + pad + halfSize
  const T = rect.top    - pad - halfSize
  const B = rect.bottom + pad + halfSize

  if (obj.x < L || obj.x > R || obj.y < T || obj.y > B) return false

  const dL = obj.x - L, dR = R - obj.x, dT = obj.y - T, dB = B - obj.y
  const minD = Math.min(dL, dR, dT, dB)
  const rest = 0.65

  if      (minD === dL) { obj.x = L; if (obj.vx > 0) obj.vx = -obj.vx * rest }
  else if (minD === dR) { obj.x = R; if (obj.vx < 0) obj.vx = -obj.vx * rest }
  else if (minD === dT) { obj.y = T; if (obj.vy > 0) obj.vy = -obj.vy * rest }
  else                  { obj.y = B; if (obj.vy < 0) obj.vy = -obj.vy * rest }

  const speed = Math.sqrt(obj.vx * obj.vx + obj.vy * obj.vy)
  if (speed < 0.25) { const s = 0.25 / Math.max(speed, 0.01); obj.vx *= s; obj.vy *= s }
  return true
}

export function HeroCanvas({ cardRef, textRef }: Props) {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const mouse      = useRef({ x: -9999, y: -9999 })
  const particles  = useRef<Particle[]>([])
  const rings      = useRef<MacroRing[]>([])
  const rafId      = useRef<number>(0)
  const timeRef    = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Const aliases so TypeScript knows these are non-null inside closures
    const cv = canvas
    const cx2 = ctx

    const resize = () => { cv.width = window.innerWidth; cv.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const W = () => cv.width
    const H = () => cv.height

    particles.current = FOOD_EMOJIS.map((emoji) => ({
      emoji,
      x: rand(0, W()), y: rand(0, H()),
      vx: rand(-0.35, 0.35), vy: rand(-0.35, 0.35),
      size: rand(26, 46), opacity: rand(0.45, 0.80),
      bobOffset: rand(0, Math.PI * 2), bobSpeed: rand(0.0025, 0.005),
      rotAngle: rand(0, Math.PI * 2), rotSpeed: rand(-0.004, 0.004),
    }))

    rings.current = MACRO_CONFIG.map((cfg) => ({
      ...cfg, targetProgress: cfg.progress,
      x: rand(80, W() - 80), y: rand(80, H() - 80),
      vx: rand(-0.22, 0.22), vy: rand(-0.22, 0.22),
      radius: rand(38, 56),
      bobOffset: rand(0, Math.PI * 2), bobSpeed: rand(0.0018, 0.003),
    }))

    const MOUSE_REPEL = 130, MOUSE_STRENGTH = 0.07

    function applyMouseRepel(obj: { x: number; y: number; vx: number; vy: number }, scale: number) {
      const dx = obj.x - mouse.current.x, dy = obj.y - mouse.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < MOUSE_REPEL && dist > 1) {
        const force = ((MOUSE_REPEL - dist) / MOUSE_REPEL) * MOUSE_STRENGTH * scale
        obj.vx += (dx / dist) * force; obj.vy += (dy / dist) * force
      }
    }

    function wrapEdge(obj: { x: number; y: number }, margin: number) {
      const w = cv.width, h = cv.height
      if (obj.x < -margin) obj.x = w + margin
      if (obj.x > w + margin) obj.x = -margin
      if (obj.y < -margin) obj.y = h + margin
      if (obj.y > h + margin) obj.y = -margin
    }

    function drawRing(ring: MacroRing, t: number) {
      const bY = Math.sin(t * ring.bobSpeed + ring.bobOffset) * 9
      const rx = ring.x, ry = ring.y + bY, r = ring.radius
      const lw = Math.max(5, r * 0.14)

      cx2.beginPath(); cx2.arc(rx, ry, r, 0, Math.PI * 2)
      cx2.strokeStyle = ring.trackColor + 'AA'; cx2.lineWidth = lw; cx2.stroke()

      cx2.beginPath(); cx2.arc(rx, ry, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ring.progress)
      cx2.strokeStyle = ring.color + 'CC'; cx2.lineWidth = lw; cx2.lineCap = 'round'; cx2.stroke()

      cx2.save(); cx2.textAlign = 'center'; cx2.textBaseline = 'middle'
      const valSize = Math.max(10, r * 0.34)
      cx2.font = `600 ${valSize}px Raleway, sans-serif`
      cx2.fillStyle = ring.color + 'EE'
      cx2.fillText(ring.unit === 'kcal' ? `${ring.value}` : `${ring.value}${ring.unit}`, rx, ry - valSize * 0.28)
      const lblSize = Math.max(8, r * 0.24)
      cx2.font = `400 ${lblSize}px Raleway, sans-serif`; cx2.fillStyle = '#64748B'
      cx2.fillText(ring.label, rx, ry + valSize * 0.72)
      cx2.restore()
    }

    function drawFood(p: Particle, t: number) {
      const bY = Math.sin(t * p.bobSpeed + p.bobOffset) * 10
      cx2.save(); cx2.translate(p.x, p.y + bY); cx2.rotate(p.rotAngle)
      cx2.globalAlpha = p.opacity; cx2.font = `${p.size}px serif`
      cx2.textAlign = 'center'; cx2.textBaseline = 'middle'
      cx2.fillText(p.emoji, 0, 0); cx2.restore()
    }

    function frame() {
      const t = ++timeRef.current, w = cv.width, h = cv.height
      const cardRect = cardRef.current?.getBoundingClientRect() ?? null
      const textRect = textRef.current?.getBoundingClientRect() ?? null

      const grad = cx2.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, w * 0.72)
      grad.addColorStop(0, '#FFFFFF'); grad.addColorStop(1, '#DCFCE7')
      cx2.fillStyle = grad; cx2.fillRect(0, 0, w, h)

      for (const p of particles.current) {
        applyMouseRepel(p, 1); p.vx *= 0.982; p.vy *= 0.982
        p.x += p.vx; p.y += p.vy; p.rotAngle += p.rotSpeed
        if (cardRect) bounceOffRect(p, p.size * 0.5, cardRect)
        if (textRect) bounceOffRect(p, p.size * 0.5, textRect)
        wrapEdge(p, 60); drawFood(p, t)
      }

      for (const ring of rings.current) {
        applyMouseRepel(ring, 1.4); ring.vx *= 0.975; ring.vy *= 0.975
        ring.x += ring.vx; ring.y += ring.vy
        ring.progress = ring.targetProgress + Math.sin(t * 0.015 + ring.bobOffset) * 0.04
        if (cardRect) bounceOffRect(ring, ring.radius + 8, cardRect)
        if (textRect) bounceOffRect(ring, ring.radius + 8, textRect)
        wrapEdge(ring, 80); drawRing(ring, t)
      }

      rafId.current = requestAnimationFrame(frame)
    }

    rafId.current = requestAnimationFrame(frame)

    const onMouseMove  = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY } }
    const onTouchMove  = (e: TouchEvent) => {
      if (e.touches.length > 0) mouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    return () => {
      cancelAnimationFrame(rafId.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [cardRef, textRef])

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, display: 'block' }} />
}
