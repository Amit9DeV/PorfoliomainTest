import { useState, useEffect } from 'react';

/**
 * Wrapper component that only applies hover effects on desktop devices
 * On mobile/touch devices, hover classes are not applied
 */
export default function ConditionalHover({ children, className = '', hoverClassName = '' }) {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => {
            const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const isLargeScreen = window.innerWidth >= 1024;
            const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

            setIsDesktop(isLargeScreen && !isTouch && !hasCoarsePointer);
        };

        checkDesktop();
        window.addEventListener('resize', checkDesktop);

        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    // Apply hover class only on desktop
    const combinedClassName = isDesktop && hoverClassName
        ? `${className} ${hoverClassName}`
        : className;

    return (
        <div className={combinedClassName}>
            {children}
        </div>
    );
}
