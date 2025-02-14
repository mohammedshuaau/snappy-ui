import React, {createContext, useContext, useEffect, useMemo} from 'react';

interface MediaQueryContextType {
    /**
     * Whether the device is mobile
     */
    isMobile: boolean;
    /**
     * Whether the device is tablet
     */
    isTablet: boolean;
    /**
     * Whether the device is desktop
     */
    isDesktop: boolean;
    /**
     * Whether the device is in portrait orientation
     */
    isPortrait: boolean;
    /**
     * Whether the device is in landscape orientation
     */
    isLandscape: boolean;
    /**
     * Whether the device supports hover
     */
    hasHover: boolean;
    /**
     * Whether the device has a fine pointer (mouse)
     */
    hasFinePointer: boolean;
    /**
     * Current screen width
     */
    screenWidth: number;
    /**
     * Current screen height
     */
    screenHeight: number;
}

const MediaQueryContext = createContext<MediaQueryContextType | undefined>(undefined);

export interface MediaQueryProviderProps {
    /**
     * Children to wrap with the provider
     */
    children: React.ReactNode;
    /**
     * Mobile breakpoint in pixels
     */
    mobileBreakpoint?: number;
    /**
     * Tablet breakpoint in pixels
     */
    tabletBreakpoint?: number;
}

export const MediaQueryProvider: React.FC<MediaQueryProviderProps> = ({
    children,
    mobileBreakpoint = 640,
    tabletBreakpoint = 1024,
}) => {
    const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
    const [screenHeight, setScreenHeight] = React.useState(window.innerHeight);
    const [orientation, setOrientation] = React.useState<'portrait' | 'landscape'>(
        window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
    );

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
            setScreenHeight(window.innerHeight);
            setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const value = useMemo(
        () => ({
            isMobile: screenWidth < mobileBreakpoint,
            isTablet: screenWidth >= mobileBreakpoint && screenWidth < tabletBreakpoint,
            isDesktop: screenWidth >= tabletBreakpoint,
            isPortrait: orientation === 'portrait',
            isLandscape: orientation === 'landscape',
            hasHover: window.matchMedia('(hover: hover)').matches,
            hasFinePointer: window.matchMedia('(pointer: fine)').matches,
            screenWidth,
            screenHeight,
        }),
        [screenWidth, screenHeight, orientation, mobileBreakpoint, tabletBreakpoint]
    );

    return (
        <MediaQueryContext.Provider value={value}>
            {children}
        </MediaQueryContext.Provider>
    );
};

export const useMediaQuery = (): MediaQueryContextType => {
    const context = useContext(MediaQueryContext);
    if (!context) {
        throw new Error('useMediaQuery must be used within a MediaQueryProvider');
    }
    return context;
};

export default MediaQueryProvider; 