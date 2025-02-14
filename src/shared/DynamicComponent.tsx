import * as React from 'react';

type DynamicComponentProps = {
    as?: keyof JSX.IntrinsicElements | React.ElementType;
    children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<any>;

const DynamicComponent: React.FC<DynamicComponentProps> = ({
    as: Component = "div",
    children,
    ...props
}) => {
    return <Component {...props}>{children}</Component>;
};

export default DynamicComponent;