// Simplified ScrollReveal - No Animations for Performance
const ScrollReveal = ({ children, className = "", width = "100%" }) => {
    return (
        <div className={`scroll-reveal-static ${className}`} style={{ width }}>
            {children}
        </div>
    );
};

export default ScrollReveal;
