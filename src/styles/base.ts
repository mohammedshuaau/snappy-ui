import { cva } from 'class-variance-authority';

export const focusRingClasses = [
    'outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
    'dark:focus:ring-primary-400 dark:ring-offset-slate-950',
];

export const transitionClasses = [
    'transition-all duration-300',
];

export const baseStyles = cva([
    // Focus ring styles
    ...focusRingClasses,
    // Transition
    ...transitionClasses,
]); 