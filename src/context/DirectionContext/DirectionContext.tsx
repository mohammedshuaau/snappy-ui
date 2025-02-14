import React, {createContext, useCallback, useContext, useMemo} from 'react';

type Direction = 'ltr' | 'rtl';

interface DirectionContextType {
    /**
     * Current text direction
     */
    direction: Direction;
    /**
     * Function to toggle direction
     */
    toggleDirection: () => void;
    /**
     * Function to set direction explicitly
     */
    setDirection: (direction: Direction) => void;
    /**
     * Whether the current direction is RTL
     */
    isRTL: boolean;
}

const DirectionContext = createContext<DirectionContextType | undefined>(undefined);

export interface DirectionProviderProps {
    /**
     * Initial direction
     */
    defaultDirection?: Direction;
    /**
     * Children to wrap with the provider
     */
    children: React.ReactNode;
}

export const DirectionProvider: React.FC<DirectionProviderProps> = ({
    defaultDirection = 'ltr',
    children,
}) => {
    const [direction, setDirectionState] = React.useState<Direction>(defaultDirection);

    const toggleDirection = useCallback(() => {
        setDirectionState((prev) => (prev === 'ltr' ? 'rtl' : 'ltr'));
    }, []);

    const setDirection = useCallback((newDirection: Direction) => {
        setDirectionState(newDirection);
    }, []);

    const isRTL = useMemo(() => direction === 'rtl', [direction]);

    // Update document direction
    React.useEffect(() => {
        document.dir = direction;
        document.documentElement.setAttribute('dir', direction);
    }, [direction]);

    const value = useMemo(
        () => ({
            direction,
            toggleDirection,
            setDirection,
            isRTL,
        }),
        [direction, toggleDirection, setDirection, isRTL]
    );

    return (
        <DirectionContext.Provider value={value}>
            {children}
        </DirectionContext.Provider>
    );
};

export const useDirection = (): DirectionContextType => {
    const context = useContext(DirectionContext);
    if (!context) {
        throw new Error('useDirection must be used within a DirectionProvider');
    }
    return context;
};

export default DirectionProvider; 