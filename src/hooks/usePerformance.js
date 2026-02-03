import { useState, useEffect, useRef } from 'react';

/**
 * Hook to detect if device is desktop (1024px+)
 * Used to conditionally render expensive animations
 */
export const useIsDesktop = () => {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        checkDesktop();
        window.addEventListener('resize', checkDesktop);

        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    return isDesktop;
};

/**
 * Hook to detect if user prefers reduced motion
 * Respects system accessibility settings
 */
export const usePrefersReducedMotion = () => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = () => {
            setPrefersReducedMotion(mediaQuery.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return prefersReducedMotion;
};

/**
 * Hook for touch device detection
 * Returns true if device has touch capability
 */
export const useIsTouchDevice = () => {
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        setIsTouch(
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            window.matchMedia('(pointer: coarse)').matches
        );
    }, []);

    return isTouch;
};

/**
 * Combined hook for determining if animations should run
 * Considers desktop size, reduced motion preference, and touch capability
 */
export const useShouldAnimate = () => {
    const isDesktop = useIsDesktop();
    const prefersReducedMotion = usePrefersReducedMotion();
    const isTouch = useIsTouchDevice();

    return isDesktop && !prefersReducedMotion && !isTouch;
};

/**
 * Responsive breakpoints matching Tailwind
 */
export const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
};

/**
 * Get current breakpoint
 */
export const useBreakpoint = () => {
    const [breakpoint, setBreakpoint] = useState('xs');

    useEffect(() => {
        const updateBreakpoint = () => {
            const width = window.innerWidth;
            if (width >= breakpoints['2xl']) setBreakpoint('2xl');
            else if (width >= breakpoints.xl) setBreakpoint('xl');
            else if (width >= breakpoints.lg) setBreakpoint('lg');
            else if (width >= breakpoints.md) setBreakpoint('md');
            else if (width >= breakpoints.sm) setBreakpoint('sm');
            else setBreakpoint('xs');
        };

        updateBreakpoint();
        window.addEventListener('resize', updateBreakpoint);
        return () => window.removeEventListener('resize', updateBreakpoint);
    }, []);

    return breakpoint;
};

/**
 * Debounce hook for performance optimization
 */
export const useDebounce = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};

/**
 * Throttle hook for scroll/resize events
 */
export const useThrottle = (value, limit = 100) => {
    const [throttledValue, setThrottledValue] = useState(value);
    const lastRan = useRef(Date.now());

    useEffect(() => {
        const handler = setTimeout(() => {
            if (Date.now() - lastRan.current >= limit) {
                setThrottledValue(value);
                lastRan.current = Date.now();
            }
        }, limit - (Date.now() - lastRan.current));

        return () => clearTimeout(handler);
    }, [value, limit]);

    return throttledValue;
};
