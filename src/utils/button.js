export const getButtonClassName = (variant, className = '') => {
    return `btn ${variant ? `btn-${variant}` : ''} ${className}`.trim();
};