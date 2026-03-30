/**
 * Card Component
 * Flexible container component with variants
 */

const variants = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg',
    outlined: 'bg-transparent border-2 border-gray-300',
    filled: 'bg-gray-50',
};

export default function Card({
    children,
    variant = 'default',
    className = '',
    padding = 'md',
    ...props
}) {
    const paddingStyles = {
        none: '',
        sm: 'p-3',
        md: 'p-5',
        lg: 'p-8',
    };

    return (
        <div
            className={`rounded-xl ${variants[variant]} ${paddingStyles[padding]} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

// Card subcomponents for structured layouts
Card.Header = function CardHeader({ children, className = '' }) {
    return (
        <div className={`pb-4 border-b border-gray-100 ${className}`}>
            {children}
        </div>
    );
};

Card.Body = function CardBody({ children, className = '' }) {
    return <div className={`py-4 ${className}`}>{children}</div>;
};

Card.Footer = function CardFooter({ children, className = '' }) {
    return (
        <div className={`pt-4 border-t border-gray-100 ${className}`}>
            {children}
        </div>
    );
};
