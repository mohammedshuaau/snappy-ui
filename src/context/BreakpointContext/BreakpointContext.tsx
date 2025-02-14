import React, {createContext, useContext, useEffect, useMemo} from 'react';

export interface Breakpoints {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
}

type BreakpointKey = keyof Breakpoints;

interface BreakpointContextType {
    /**
     * Current breakpoint
     */
    breakpoint: BreakpointKey;
    /**
     * All available breakpoints
     */
    breakpoints: Breakpoints;
    /**
     * Whether the current viewport is larger than the specified breakpoint
     */
    up: (breakpoint: BreakpointKey) => boolean;
    /**
     * Whether the current viewport is smaller than the specified breakpoint
     */
    down: (breakpoint: BreakpointKey) => boolean;
    /**
     * Whether the current viewport is between the specified breakpoints
     */
    between: (start: BreakpointKey, end: BreakpointKey) => boolean;
    /**
     * Whether the current viewport matches the specified breakpoint exactly
     */
    only: (breakpoint: BreakpointKey) => boolean;
    /**
     * Current viewport width
     */
    width: number;
}

const defaultBreakpoints: Breakpoints = {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
};

const BreakpointContext = createContext<BreakpointContextType | undefined>(undefined);

export interface BreakpointProviderProps {
    /**
     * Children to wrap with the provider
     */
    children: React.ReactNode;
    /**
     * Custom breakpoints configuration
     */
    breakpoints?: Partial<Breakpoints>;
}

export const BreakpointProvider: React.FC<BreakpointProviderProps> = ({
    children,
    breakpoints: customBreakpoints,
}) => {
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoints = { ...defaultBreakpoints, ...customBreakpoints };

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getCurrentBreakpoint = (width: number): BreakpointKey => {
        const breakpointEntries = Object.entries(breakpoints).sort((a, b) => b[1] - a[1]);
        const currentBreakpoint = breakpointEntries.find(([_, value]) => width >= value);
        return (currentBreakpoint?.[0] as BreakpointKey) || 'xs';
    };

    const value = useMemo(() => {
        const currentBreakpoint = getCurrentBreakpoint(width);

        return {
            breakpoint: currentBreakpoint,
            breakpoints,
            width,
            up: (breakpoint: BreakpointKey) => width >= breakpoints[breakpoint],
            down: (breakpoint: BreakpointKey) => width < breakpoints[breakpoint],
            between: (start: BreakpointKey, end: BreakpointKey) =>
                width >= breakpoints[start] && width < breakpoints[end],
            only: (breakpoint: BreakpointKey) => currentBreakpoint === breakpoint,
        };
    }, [width, breakpoints]);

    return (
        <BreakpointContext.Provider value={value}>
            {children}
        </BreakpointContext.Provider>
    );
};

export const useBreakpoint = (): BreakpointContextType => {
    const context = useContext(BreakpointContext);
    if (!context) {
        throw new Error('useBreakpoint must be used within a BreakpointProvider');
    }
    return context;
};

export default BreakpointProvider; 