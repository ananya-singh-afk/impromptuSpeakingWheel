import React, { useState, useRef, useEffect } from 'react'
import './SpinningWheel.css'

const SpinningWheel = ({ topics }) => {
  const canvasRef = useRef(null)
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState(null)
  const wheelColorsRef = useRef([])

  // Initialize wheel colors
  useEffect(() => {
    const colors = [
      '#FFF2C6',
      '#FFF8DE',
      '#AAC4F5',
      '#8CA9FF',
      '#FFE5CC',
      '#D4E4FF',
      '#FFD9B3',
      '#C0D9FF',
    ]
    wheelColorsRef.current = colors
    drawWheel(0)
  }, [topics])

  const drawWheel = (angle) => {
    const canvas = canvasRef.current
    if (!canvas || topics.length === 0) return

    const ctx = canvas.getContext('2d')
    const radius = canvas.width / 2
    const sliceAngle = (2 * Math.PI) / topics.length

    // Clear canvas
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw wheel
    topics.forEach((topic, index) => {
      const startAngle = angle + index * sliceAngle
      const endAngle = startAngle + sliceAngle

      // Draw slice
      ctx.beginPath()
      ctx.arc(radius, radius, radius - 10, startAngle, endAngle)
      ctx.lineTo(radius, radius)
      ctx.fillStyle = wheelColorsRef.current[index % wheelColorsRef.current.length]
      ctx.fill()

      // Draw border
      ctx.strokeStyle = '#FFFFFF'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw text
      ctx.save()
      ctx.translate(radius, radius)
      ctx.rotate(startAngle + sliceAngle / 2)
      ctx.textAlign = 'right'
      ctx.fillStyle = '#333333'
      ctx.font = 'bold 12px Arial'
      const maxWidth = radius - 40
      wrapText(ctx, topic, maxWidth - 20, 0, 12)
      ctx.restore()
    })

    // Draw center circle
    ctx.beginPath()
    ctx.arc(radius, radius, 30, 0, 2 * Math.PI)
    ctx.fillStyle = '#8CA9FF'
    ctx.fill()
    ctx.strokeStyle = '#FFFFFF'
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw pointer
    ctx.beginPath()
    ctx.moveTo(radius, 10)
    ctx.lineTo(radius - 15, 35)
    ctx.lineTo(radius + 15, 35)
    ctx.closePath()
    ctx.fillStyle = '#FF6B6B'
    ctx.fill()
    ctx.strokeStyle = '#FFFFFF'
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw center text
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 20px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('SPIN', radius, radius)
  }

  const wrapText = (ctx, text, maxWidth, x, lineHeight) => {
    const words = text.split(' ')
    let line = ''
    let y = x

    words.forEach((word) => {
      const testLine = line + word + ' '
      const metrics = ctx.measureText(testLine)
      if (metrics.width > maxWidth && line) {
        ctx.fillText(line, maxWidth, y)
        line = word + ' '
        y += lineHeight
      } else {
        line = testLine
      }
    })
    ctx.fillText(line, maxWidth, y)
  }

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setSelectedTopic(null)

    // Random spin between 5-8 full rotations plus random offset
    const spins = 5 + Math.random() * 3
    const randomOffset = Math.random() * 2 * Math.PI
    const finalAngle = rotation + spins * 2 * Math.PI + randomOffset

    // Animate the spin
    const startTime = Date.now()
    const duration = 4000 // 4 seconds spin

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentAngle = rotation + (finalAngle - rotation) * easeOut

      setRotation(currentAngle)
      drawWheel(currentAngle)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsSpinning(false)
        // Calculate which topic is selected (at the top)
        const normalizedAngle = (-(finalAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
        const sliceAngle = (2 * Math.PI) / topics.length
        const selectedIndex = Math.floor(normalizedAngle / sliceAngle) % topics.length
        setSelectedTopic(topics[selectedIndex])
      }
    }

    animate()
  }

  return (
    <div className="wheel-container">
      <div className="wheel-wrapper">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className={`wheel-canvas ${isSpinning ? 'spinning' : ''}`}
          onClick={spinWheel}
          style={{ cursor: isSpinning ? 'not-allowed' : 'pointer' }}
        />
      </div>

      <button
        className="spin-button"
        onClick={spinWheel}
        disabled={isSpinning}
      >
        {isSpinning ? 'SPINNING...' : 'SPIN THE WHEEL'}
      </button>

      {selectedTopic && !isSpinning && (
        <div className="topic-display">
          <div className="topic-label">Your Topic:</div>
          <div className="topic-text">{selectedTopic}</div>
          <div className="topic-hint">You have 1 minute to speak!</div>
        </div>
      )}

      {topics.length > 0 && (
        <div className="topic-count">
          {topics.length} topics available
        </div>
      )}
    </div>
  )
}

export default SpinningWheel
