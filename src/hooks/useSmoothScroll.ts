import Lenis from "lenis"
import { useEffect } from "react"

export function useSmoothScroll() {
  useEffect(() => {
    // Initialize Lenis with moderate inertial effect
    const lenis = new Lenis({
      duration: 0.5, // Reduced duration for minimal inertial effect
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.375, // Minimal multiplier for very subtle momentum
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenis.destroy()
    }
  }, [])
}
