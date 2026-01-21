import { ArrowRight, Code, Lightbulb, Palette, Plane, Target } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { FuzzyText } from './Portfolio';

/* --- Pixel Animation Logic ---
  Refactored from your provided code to work within this single file.
*/

class Pixel {
    constructor(canvas, context, x, y, color, speed, delay) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = context;
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = this.getRandomValue(0.1, 0.9) * speed;
        this.size = 0;
        this.sizeStep = Math.random() * 0.4;
        this.minSize = 0.5;
        this.maxSizeInteger = 2;
        this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
        this.delay = delay;
        this.counter = 0;
        this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
        this.isIdle = false;
        this.isReverse = false;
        this.isShimmer = false;
    }

    getRandomValue(min, max) {
        return Math.random() * (max - min) + min;
    }

    draw() {
        const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
    }

    appear() {
        this.isIdle = false;
        if (this.counter <= this.delay) {
            this.counter += this.counterStep;
            return;
        }
        if (this.size >= this.maxSize) {
            this.isShimmer = true;
        }
        if (this.isShimmer) {
            this.shimmer();
        } else {
            this.size += this.sizeStep;
        }
        this.draw();
    }

    disappear() {
        this.isShimmer = false;
        this.counter = 0;
        if (this.size <= 0) {
            this.isIdle = true;
            return;
        } else {
            this.size -= 0.1;
        }
        this.draw();
    }

    shimmer() {
        if (this.size >= this.maxSize) {
            this.isReverse = true;
        } else if (this.size <= this.minSize) {
            this.isReverse = false;
        }
        if (this.isReverse) {
            this.size -= this.speed;
        } else {
            this.size += this.speed;
        }
    }
}

function getEffectiveSpeed(value, reducedMotion) {
    const min = 0;
    const max = 100;
    const throttle = 0.001;
    const parsed = parseInt(value, 10);

    if (parsed <= min || reducedMotion) {
        return min;
    } else if (parsed >= max) {
        return max * throttle;
    } else {
        return parsed * throttle;
    }
}

const VARIANTS = {
    default: {
        activeColor: null,
        gap: 3,
        speed: 120,
        colors: '#000000',
        noFocus: false
    },
    blue: {
        activeColor: '#e0f2fe',
        gap: 3,
        speed: 125,
        colors: '#e0f2fe,#7dd3fc,#0ea5e9',
        noFocus: false
    },
    yellow: {
        activeColor: '#fef08a',
        gap: 3,
        speed: 120,
        colors: '#fef08a,#fde047,#eab308',
        noFocus: false
    },
    pink: {
        activeColor: '#fecdd3',
        gap: 3,
        speed: 120,
        colors: '#fecdd3,#fda4af,#e11d48',
        noFocus: true
    }
};

function PixelCard({ variant = 'default', gap, speed, colors, noFocus, className = '', children }) {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const pixelsRef = useRef([]);
    const animationRef = useRef(null);
    const timePreviousRef = useRef(performance.now());
    const reducedMotion = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches).current;

    const variantCfg = VARIANTS[variant] || VARIANTS.default;
    const finalGap = gap ?? variantCfg.gap;
    const finalSpeed = speed ?? variantCfg.speed;
    const finalColors = colors ?? variantCfg.colors;
    const finalNoFocus = noFocus ?? variantCfg.noFocus;

    const initPixels = () => {
        if (!containerRef.current || !canvasRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const width = Math.floor(rect.width);
        const height = Math.floor(rect.height);
        const ctx = canvasRef.current.getContext('2d');

        canvasRef.current.width = width;
        canvasRef.current.height = height;
        canvasRef.current.style.width = `${width}px`;
        canvasRef.current.style.height = `${height}px`;

        const colorsArray = finalColors.split(',');
        const pxs = [];
        for (let x = 0; x < width; x += parseInt(finalGap, 10)) {
            for (let y = 0; y < height; y += parseInt(finalGap, 10)) {
                const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];

                const dx = x - width / 2;
                const dy = y - height / 2;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const delay = reducedMotion ? 0 : distance;

                pxs.push(new Pixel(canvasRef.current, ctx, x, y, color, getEffectiveSpeed(finalSpeed, reducedMotion), delay));
            }
        }
        pixelsRef.current = pxs;
    };

    const doAnimate = fnName => {
        animationRef.current = requestAnimationFrame(() => doAnimate(fnName));
        const timeNow = performance.now();
        const timePassed = timeNow - timePreviousRef.current;
        const timeInterval = 1000 / 60;

        if (timePassed < timeInterval) return;
        timePreviousRef.current = timeNow - (timePassed % timeInterval);

        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx || !canvasRef.current) return;

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        let allIdle = true;
        for (let i = 0; i < pixelsRef.current.length; i++) {
            const pixel = pixelsRef.current[i];
            pixel[fnName]();
            if (!pixel.isIdle) {
                allIdle = false;
            }
        }
        if (allIdle) {
            cancelAnimationFrame(animationRef.current);
        }
    };

    const handleAnimation = name => {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = requestAnimationFrame(() => doAnimate(name));
    };

    const onMouseEnter = () => handleAnimation('appear');
    const onMouseLeave = () => handleAnimation('disappear');
    const onFocus = e => {
        if (e.currentTarget.contains(e.relatedTarget)) return;
        handleAnimation('appear');
    };
    const onBlur = e => {
        if (e.currentTarget.contains(e.relatedTarget)) return;
        handleAnimation('disappear');
    };

    useEffect(() => {
        initPixels();
        const observer = new ResizeObserver(() => {
            initPixels();
        });
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }
        return () => {
            observer.disconnect();
            cancelAnimationFrame(animationRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [finalGap, finalSpeed, finalColors, finalNoFocus]);

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden grid place-items-center border border-[#27272a] rounded-xl isolate transition-colors duration-200 ease-[cubic-bezier(0.5,1,0.89,1)] select-none bg-[#121212]/70 ${className}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onFocus={finalNoFocus ? undefined : onFocus}
            onBlur={finalNoFocus ? undefined : onBlur}
            tabIndex={finalNoFocus ? -1 : 0}
        >
            <canvas className="absolute inset-0 w-full h-full block pointer-events-none opacity-40 mix-blend-screen" ref={canvasRef} />
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
}

/* --- Main App Section ---
*/

export default function ApproachSection() {
    const steps = [
        {
            id: "01",
            title: "Discovery",
            description: "We dive deep into your business goals, audience needs, and market landscape to build a solid foundation.",
            icon: <Lightbulb className="w-8 h-8" />,
            variant: "blue",
            colors: "#e0f2fe,#7dd3fc,#0ea5e9"
        },
        {
            id: "02",
            title: "Strategy",
            description: "Crafting a roadmap that aligns your vision with actionable steps, ensuring every move counts towards growth.",
            icon: <Target className="w-8 h-8" />,
            variant: "default",
            colors: "#f8fafc,#f1f5f9,#cbd5e1"
        },
        {
            id: "03",
            title: "Design",
            description: "Translating concepts into stunning visual identities and intuitive interfaces that resonate with users.",
            icon: <Palette className="w-8 h-8" />,
            variant: "pink",
            colors: "#fecdd3,#fda4af,#e11d48"
        },
        {
            id: "04",
            title: "Development",
            description: "Building robust, scalable solutions using cutting-edge technology to bring the designs to life.",
            icon: <Code className="w-8 h-8" />,
            variant: "yellow",
            colors: "#fef08a,#fde047,#eab308"
        }
    ];

    return (
        <div className="min-h-screen  bg-black text-white font-sans selection:bg-zinc-800">
            <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">

                {/* Header Section */}
                <div className="mb-10 max-w-3xl relative">
                    <h2 className="text-sm font-medium tracking-wider text-zinc-400 uppercase mb-20">
                        How I Work
                    </h2>
                   
                    <FuzzyText
                        fontSize="clamp(2rem, 5vw, 4rem)"
                        fontWeight={1000}
                        color="#ffffff"
                        className="absolute top-8 -left-16"
                    >
                        My Approach
                    </FuzzyText>

                    <p className="text-zinc-400 leading-relaxed">
                        From the initial spark of an idea to the final launch, my approach is rooted in collaboration, creativity, and a relentless pursuit of excellence. Here’s how I turn visions into reality:
                    </p>
                </div>

                {/* Grid Section Container with Relative positioning for the trail */}
                <div className="relative">

                    {/* Animated Trail Overlay - Visible on Large Screens */}
                    <div className="absolute inset-0 pointer-events-none hidden lg:block z-20 overflow-visible">
                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                            <defs>
                                <linearGradient id="trail-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                                    <stop offset="20%" stopColor="#3b82f6" stopOpacity="0.5" />
                                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                                    <stop offset="80%" stopColor="#eab308" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#eab308" stopOpacity="1" />
                                </linearGradient>
                            </defs>
                            {/* Curved Path (Arcing Up to Top) */}
                            {/* M12.5,50 starts at center of 1st card. C50,50 and 65,30 control points create the curve up to 87.5,0 (top of 4th card) */}
                            <path
                                d="M 12.5 50 C 50 50, 65 30, 87.5 0"
                                fill="none"
                                stroke="url(#trail-gradient)"
                                strokeWidth="2"
                                strokeDasharray="4 2"
                                vectorEffect="non-scaling-stroke"
                            />
                        </svg>

                        {/* Plane Icon at the end of the trail (Top of 4th card) */}
                        <div className="absolute top-0 left-[87.5%] -translate-y-1/2 -translate-x-1/2">
                            {/* Rotated -45deg to point North-East towards the top destination */}
                            <div className="rotate-[15deg] p-2">
                                <Plane className="w-9 h-10 text-yellow-400 fill-yellow-400/30 p-1" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                        {steps.map((step) => (
                            <PixelCard
                                key={step.id}
                                variant={step.variant}
                                colors={step.colors}
                                className="h-[420px] w-full"
                            >
                                <div className="h-full flex flex-col justify-between p-8">

                                    {/* Top: Icon & Number */}
                                    <div className="flex justify-between items-start">
                                        <div className={`p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm text-${step.variant === 'default' ? 'zinc' : step.variant}-300`}>
                                            {step.icon}
                                        </div>
                                        <span className="text-4xl font-bold text-white/10 font-mono">
                                            {step.id}
                                        </span>
                                    </div>

                                    {/* Bottom: Content */}
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-bold tracking-wide">
                                            {step.title}
                                        </h3>
                                        <p className="text-zinc-400 leading-relaxed text-sm">
                                            {step.description}
                                        </p>

                                        {/* Hover visual cue */}
                                        <div className="pt-4 flex items-center text-xs font-medium uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors duration-300">
                                            Learn More <ArrowRight className="w-4 h-4 ml-2" />
                                        </div>
                                    </div>

                                </div>
                            </PixelCard>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 flex flex-col md:flex-row items-center justify-between p-12 rounded-[30px] border border-zinc-800 bg-zinc-900/30 backdrop-blur-4xl relative overflow-hidden">
                    <div className="relative z-10 max-w-xl">
                        
<FuzzyText
                                    fontSize="clamp(2rem, 5vw, 2.5rem)"
                                    fontWeight={1000}
                                    gradient={"ffffff"}
                                    baseIntensity={0.3}
                                    hoverIntensity={0.8}
                                    fuzzRange={10}
                                    glitchMode={true}
                                    glitchInterval={3000}
                                    className="mb-3 -ml-10"
                                >
                            Ready to start your journey?
                                </FuzzyText>
                        <p className="text-white/40 leading-relaxed">Let's collaborate to build something extraordinary together.</p>
                    </div>
                    <button className="relative z-10 mt-8 md:mt-0 px-8 py-4 bg-white/70 text-black font-bold rounded-full hover:bg-white transition-transform active:scale-95 duration-200">
                        Get in Touch
                    </button>

                    {/* Decorative gradient bloom */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
                </div>

            </div>
        </div>
    );
}