'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from 'react';

interface MouseTrackerContextType {
  x: number;
  y: number;
  isVisible: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  global: boolean;
}

const MouseTrackerContext = createContext<MouseTrackerContextType>({
  x: -100,
  y: -100,
  isVisible: false,
  containerRef: { current: null },
  global: false,
});

export function useMouseTracker() {
  return useContext(MouseTrackerContext);
}

export interface MouseTrackerProviderProps {
  children: ReactNode;
  className?: string;
  global?: boolean;
  hideNativeCursor?: boolean;
}

export function MouseTrackerProvider({
  children,
  className = '',
  global = false,
  hideNativeCursor = false,
}: MouseTrackerProviderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Only disable on strictly touch-only devices without a mouse/trackpad
    if (typeof window !== 'undefined') {
      const touchQuery = window.matchMedia('(hover: none) and (pointer: coarse)');
      setIsTouchDevice(touchQuery.matches);

      const onChange = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
      touchQuery.addEventListener('change', onChange);
      return () => touchQuery.removeEventListener('change', onChange);
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    if (global) {
      const handleMouseMove = (e: MouseEvent) => {
        setPos({ x: e.clientX, y: e.clientY });
        if (!isVisible) setIsVisible(true);
      };

      const handleMouseLeave = () => setIsVisible(false);
      const handleMouseEnter = () => setIsVisible(true);

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);

      if (hideNativeCursor) {
        document.documentElement.classList.add('hide-native-cursor');
      }

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('mouseenter', handleMouseEnter);
        if (hideNativeCursor) {
          document.documentElement.classList.remove('hide-native-cursor');
        }
      };
    } else {
      // Container mode: find container or parent element if placed as a sibling/helper
      const el = containerRef.current;
      if (!el) return;

      const target =
        el.parentElement && (el.offsetHeight === 0 || el.offsetWidth === 0)
          ? el.parentElement
          : el;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = target.getBoundingClientRect();
        setPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
        if (!isVisible) setIsVisible(true);
      };

      const handleMouseLeave = () => setIsVisible(false);
      const handleMouseEnter = () => setIsVisible(true);

      target.addEventListener('mousemove', handleMouseMove, { passive: true });
      target.addEventListener('mouseleave', handleMouseLeave);
      target.addEventListener('mouseenter', handleMouseEnter);

      if (hideNativeCursor) {
        target.classList.add('hide-native-cursor');
      }

      return () => {
        target.removeEventListener('mousemove', handleMouseMove);
        target.removeEventListener('mouseleave', handleMouseLeave);
        target.removeEventListener('mouseenter', handleMouseEnter);
        if (hideNativeCursor) {
          target.classList.remove('hide-native-cursor');
        }
      };
    }
  }, [global, isTouchDevice, isVisible, hideNativeCursor]);

  const contextValue: MouseTrackerContextType = {
    x: pos.x,
    y: pos.y,
    isVisible: !isTouchDevice && isVisible,
    containerRef,
    global,
  };

  if (global) {
    return (
      <MouseTrackerContext.Provider value={contextValue}>
        {children}
      </MouseTrackerContext.Provider>
    );
  }

  return (
    <MouseTrackerContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className={`mouse-tracker-container ${className}`}
        style={{ position: 'relative' }}
      >
        {children}
      </div>
    </MouseTrackerContext.Provider>
  );
}

// Default themed monochrome pointer SVG
export function ThemedPointerIcon({ size = 26, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#000"
      stroke="#fff"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{
        filter: 'drop-shadow(0 2px 10px rgba(0, 0, 0, 0.9))',
        transform: 'translate(-2px, -2px)',
      }}
      aria-hidden="true"
    >
      <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z" />
    </svg>
  );
}

export interface PointerProps {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Pointer({ children, className = '', style }: PointerProps) {
  const { x, y, isVisible, global } = useMouseTracker();

  return (
    <div
      className={`mouse-pointer ${className}`}
      style={{
        position: global ? 'fixed' : 'absolute',
        top: 0,
        left: 0,
        transform: `translate3d(${x}px, ${y}px, 0)`,
        pointerEvents: 'none',
        zIndex: 99999,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.2s ease',
        willChange: 'transform',
        ...style,
      }}
      aria-hidden="true"
    >
      {children || <ThemedPointerIcon />}
    </div>
  );
}

export type FollowerAlign = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';

export interface PointerFollowerProps {
  children: ReactNode;
  align?: FollowerAlign;
  offset?: { x?: number; y?: number };
  className?: string;
  ease?: number;
  style?: React.CSSProperties;
}

export function PointerFollower({
  children,
  align = 'bottom-right',
  offset,
  className = '',
  ease = 0.18,
  style,
}: PointerFollowerProps) {
  const { x, y, isVisible, global } = useMouseTracker();
  const followerRef = useRef<HTMLDivElement | null>(null);
  const currentPos = useRef({ x, y });
  const targetPos = useRef({ x, y });
  const rafId = useRef<number | null>(null);
  const initialized = useRef(false);

  // Compute offset based on alignment
  const getAlignmentOffset = useCallback((): { x: number; y: number } => {
    const customX = offset?.x ?? 0;
    const customY = offset?.y ?? 0;

    switch (align) {
      case 'bottom-right':
        return { x: 12 + customX, y: 16 + customY };
      case 'bottom-left':
        return { x: -12 + customX, y: 16 + customY };
      case 'top-right':
        return { x: 12 + customX, y: -16 + customY };
      case 'top-left':
        return { x: -12 + customX, y: -16 + customY };
      case 'center':
        return { x: customX, y: customY };
      default:
        return { x: 12 + customX, y: 16 + customY };
    }
  }, [align, offset]);

  // Sync target position
  useEffect(() => {
    const { x: offX, y: offY } = getAlignmentOffset();
    targetPos.current = { x: x + offX, y: y + offY };

    // Snap to position on first appearance to prevent flying in from (0, 0)
    if (!initialized.current && isVisible && x > -50 && y > -50) {
      currentPos.current = { x: x + offX, y: y + offY };
      initialized.current = true;
    }
  }, [x, y, isVisible, getAlignmentOffset]);

  // Smooth animation loop
  useEffect(() => {
    let active = true;

    const animate = () => {
      if (!active) return;

      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;

      currentPos.current.x += dx * ease;
      currentPos.current.y += dy * ease;

      if (followerRef.current) {
        let alignTranslate = '';
        if (align === 'bottom-left') alignTranslate = 'translate(-100%, 0)';
        else if (align === 'top-right') alignTranslate = 'translate(0, -100%)';
        else if (align === 'top-left') alignTranslate = 'translate(-100%, -100%)';
        else if (align === 'center') alignTranslate = 'translate(-50%, -50%)';

        followerRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) ${alignTranslate}`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      active = false;
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [align, ease]);

  return (
    <div
      ref={followerRef}
      className={`mouse-follower ${className}`}
      style={{
        position: global ? 'fixed' : 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 99998,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.25s ease',
        willChange: 'transform',
        ...style,
      }}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

// Aliases matching HextaUI
export {
  MouseTrackerProvider as CursorProvider,
  Pointer as Cursor,
  PointerFollower as CursorFollow,
};
