import { ChevronRight, Code, Cpu, Globe, Loader2, Terminal, Zap } from 'lucide-react';
import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { FuzzyText } from "./Portfolio";
import RippleGrid from './RippleGrid';


// --- 1. UTILITY: LOAD GSAP DYNAMICALLY ---
const useGsap = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (window.gsap) {
            setLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.async = true;
        script.onload = () => setLoaded(true);
        document.body.appendChild(script);

        return () => { };
    }, []);

    return loaded;
};

// --- 2. CARD COMPONENT ---
const Card = forwardRef(({ customClass, children, ...rest }, ref) => (
    <div
        ref={ref}
        {...rest}
        className={`absolute top-1/2 left-1/2 rounded-xl  bg-zinc-950 
    shadow-[0_0_20px_rgba(0,0,0,0.8)] [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] 
    ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
    >
        {/* Matrix/Cyberpunk decorative glow */}
        <div className="absolute inset-0 rounded-xl border border-green-500/20 pointer-events-none shadow-[inset_0_0_20px_rgba(34,197,94,0.05)]"></div>
        {children}
    </div>
));
Card.displayName = 'Card';

// --- 3. LOGIC HELPERS ---
const makeSlot = (i, distX, distY, total) => ({
    x: i * distX,
    y: -i * distY,
    z: -i * distX * 1.5,
    zIndex: total - i
});

const placeNow = (el, slot, skew) => {
    if (!window.gsap) return;
    window.gsap.set(el, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        xPercent: -50,
        yPercent: -50,
        skewY: skew,
        transformOrigin: 'center center',
        zIndex: slot.zIndex,
        force3D: true,
        opacity: 1, // Ensure visibility
        rotationY: 0
    });
};

// --- 4. CARDSWAP COMPONENT ---
const CardSwap = forwardRef(({
    width = 500,
    height = 400,
    cardDistance = 40,
    verticalDistance = 40,
    delay = 4000,
    pauseOnHover = true,
    onCardClick,
    onIndexChange,
    skewAmount = 4,
    easing = 'elastic',
    isGsapReady,
    children
}, ref) => {
    // Use smoother easing for circular loop feel
    const config = {
        ease: 'power3.inOut',
        durDrop: 1.2,
        durMove: 1.0,
        durReturn: 1.2,
        promoteOverlap: 0.8, // Start moving others sooner
        returnDelay: 0.1
    };

    const childArr = useMemo(() => Children.toArray(children), [children]);
    const refs = useMemo(() => childArr.map(() => React.createRef()), [childArr.length]);
    const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

    const tlRef = useRef(null);
    const intervalRef = useRef();
    const container = useRef(null);

    const refreshLayout = () => {
        if (!window.gsap) return;
        const total = refs.length;
        order.current.forEach((originalIndex, i) => {
            const el = refs[originalIndex].current;
            if (el) placeNow(el, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
        });
        if (onIndexChange) onIndexChange(order.current[0]);
    };

    useImperativeHandle(ref, () => ({
        jumpTo: (targetIndex) => {
            if (!window.gsap) return;
            const currentPos = order.current.indexOf(targetIndex);
            if (currentPos === 0 || currentPos === -1) return;

            const newOrder = [...order.current];
            const item = newOrder.splice(currentPos, 1)[0];
            newOrder.unshift(item);
            order.current = newOrder;

            if (tlRef.current) tlRef.current.kill();
            refreshLayout();

            clearInterval(intervalRef.current);
            intervalRef.current = window.setInterval(performSwap, delay);
        }
    }));

    const performSwap = () => {
        if (!window.gsap || order.current.length < 2) return;

        const [front, ...rest] = order.current;
        const elFront = refs[front].current;
        const tl = window.gsap.timeline();
        tlRef.current = tl;

        if (onIndexChange) onIndexChange(rest[0]);

        // --- CIRCULAR LOOP ANIMATION ---
        // 1. Front card slides out to the right and deep into Z space
        // It stays visible (opacity 1) to maintain "5 cards" illusion
        tl.to(elFront, {
            x: width * 0.8, // Slide out
            y: 0,
            z: -300, // Move back
            rotationY: -15,
            duration: config.durDrop,
            ease: 'power2.inOut'
        });

        // 2. Start moving other cards forward almost immediately
        tl.addLabel('promote', `-=${config.durDrop * 0.7}`);

        rest.forEach((idx, i) => {
            const el = refs[idx].current;
            const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
            tl.set(el, { zIndex: slot.zIndex }, 'promote');
            tl.to(el, {
                x: slot.x,
                y: slot.y,
                z: slot.z,
                duration: config.durMove,
                ease: config.ease
            }, `promote+=${i * 0.05}`);
        });

        const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);

        // 3. Tuck the front card (now back) behind the stack
        // Change zIndex instantly when it's furthest back
        tl.call(() => { window.gsap.set(elFront, { zIndex: backSlot.zIndex }); }, undefined, 'promote+=0.3');

        // 4. Slide it into the final back slot
        tl.to(elFront, {
            x: backSlot.x,
            y: backSlot.y,
            z: backSlot.z,
            rotationY: 0,
            duration: config.durReturn,
            ease: 'power2.out'
        }, 'promote+=0.5');

        tl.call(() => { order.current = [...rest, front]; });
    };

    useEffect(() => {
        if (!isGsapReady) return;

        const total = refs.length;
        refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

        intervalRef.current = window.setInterval(performSwap, delay);

        if (pauseOnHover) {
            const node = container.current;
            const pause = () => { tlRef.current?.pause(); clearInterval(intervalRef.current); };
            const resume = () => { tlRef.current?.play(); intervalRef.current = window.setInterval(performSwap, delay); };
            node?.addEventListener('mouseenter', pause);
            node?.addEventListener('mouseleave', resume);
            return () => {
                node?.removeEventListener('mouseenter', pause);
                node?.removeEventListener('mouseleave', resume);
                clearInterval(intervalRef.current);
            };
        }
        return () => clearInterval(intervalRef.current);
    }, [isGsapReady, cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

    const rendered = childArr.map((child, i) =>
        isValidElement(child) ? cloneElement(child, {
            key: i,
            ref: refs[i],
            style: { width, height, ...(child.props.style ?? {}) },
            onClick: e => { child.props.onClick?.(e); onCardClick?.(i); }
        }) : child
    );

    return (
        <div
            ref={container}
            className="absolute bottom-1/4 right-0 transform translate-x-[-48%] translate-y-[20%] lg:translate-y-[35%] origin-center perspective-[1000px] overflow-visible z-10 
      max-[1024px]:scale-[0.8] max-[768px]:scale-[0.65] max-[768px]:translate-x-[40%] max-[768px]:translate-y-[30%] max-[768px]:bottom-[10%]"
            style={{ width, height }}
        >
            {rendered}
        </div>
    );
});
CardSwap.displayName = 'CardSwap';

// --- 5. DATA ---
const experiences = [
    {
        id: 0, title: "Once Hub", role: "Technical Associate", date: "Jan 2025 - Now", desc: "Software Developer at OnceHub  ", icon: <Zap size={20} />, color: "text-yellow-400", border: "border-yellow-400", bgColor: "bg-yellow-400"
    },

    {
        id: 1, title: "Project x IBM Intern", role: "Cloud Dev", date: "2024", desc: "Developed a real-time banking website featuring comprehensive monthly analysis tools to enhance financial decision-making and user engagement.", icon: <Globe size={20} />, color: "text-sky-400", border: "border-blue-400", bgColor: "bg-sky-400"
    },

    { id: 2, title: "CSA Hackathon 3.0", role: "Finalist", date: "March 2024", desc: "We built RAM, a scalable API rate-limiting platform using React.js, Python, and AWS (Lambda, API Gateway, DynamoDB, ElastiCache, and CloudFront) that authenticates users, applies tier-based limits with multiple algorithms, and provides a real-time testing dashboard.", icon: <Cpu size={20} />, color: "text-purple-400", border: "border-purple-400", bgColor: "bg-purple-400" },
    { id: 3, title: "Hacktoberfest", role: "Open Source Contributor", date: "Oct 2023", desc: "My contribution involved detailed problem-solving and coding, which was recognized by the community. I am proud to have earned the 'Completed All Levels' badge for my contributions.", icon: <Code size={20} />, color: "text-orange-400", border: "border-orange-400", bgColor: "bg-orange-400" },

    { id: 4, title: "CSA Hackathon 2.0", role: "Finalist", date: "April 2023", desc: "Engineered voice-enabled medical data graph visualization app using AWS services(AWS Lambda ,AWS Medical Comprehend, AWS Neptune, AWS Lex ,AWS EC2) that reduced data analysis time by for healthcare professionals.", icon: <Terminal size={20} />, color: "text-blue-400", border: "border-blue-400", bgColor: "bg-blue-400" },
];



// --- 6. MAIN APP COMPONENT ---
export default function App() {
    const [activeIndex, setActiveIndex] = useState(0);
    const cardSwapRef = useRef(null);
    const isGsapReady = useGsap();

    const handleListClick = (index) => {
        setActiveIndex(index);
        if (cardSwapRef.current) {
            cardSwapRef.current.jumpTo(index);
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-black text-white p-6 md:p-12 overflow-hidden flex flex-col items-center justify-center">


            {/* Main Content Area */}
            <div className="relative z-20 w-full max-w-6xl flex flex-col lg:flex-row gap-0 lg:h-[600px] items-center">

                {/* LEFT: Interactive List - Adjusted with -translate-y-12 */}
                <div className="w-full lg:w-2/5 flex flex-col justify-center gap-3 -translate-y-12 pt-10 relative ">

                    <FuzzyText
                        fontSize="clamp(2rem, 5vw, 4rem)"
                        fontWeight={1000}
                        color="#ffffff"
                        baseIntensity={0.25}
                        hoverIntensity={0.6}
                        fuzzRange={16}
                        className="absolute -top-10 -left-12"

                    >
                        Experience
                    </FuzzyText>
                    <h3 className="text-[10px] border border-white/20 rounded-lg px-2 py-1 w-fit text-zinc-500 uppercase tracking-[0.2em] mb-2 ml-1">Timeline Selection</h3>

                    {experiences.map((exp, idx) => {
                        const isActive = activeIndex === idx;
                        return (
                            <button
                                key={exp.id}
                                onClick={() => handleListClick(idx)}
                                className={`group relative flex items-center gap-4 p-3 rounded-lg text-left transition-all duration-300 w-full
                  ${isActive
                                        ? 'bg-zinc-900/80 border border-green-500/30'
                                        : 'bg-zinc-900/30 border border-green-500/5 hover:bg-zinc-900/70 hover:border-green-500/20'
                                    }`}
                            >
                                {/* Active Indicator Line */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-green-600 rounded-r shadow-[0_0_15px_#22c55e]" />
                                )}

                                {/* Icon Box */}
                                <div className={`p-2 rounded-md bg-black border border-zinc-800 transition-colors 
                  ${isActive ? 'border-green-500/50 text-green-400' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                                    {exp.icon}
                                </div>

                                {/* Text Info */}
                                <div className="flex-1">
                                    <div className="flex justify-between items-center text-[18px]">
                                        <h4 className={`font-bold transition-colors ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                                            {exp.title}
                                        </h4>

                                    </div>
                                    <p className="text-xs text-zinc-600 font-medium tracking-wide">{exp.date}</p>
                                </div>

                                {isActive && <ChevronRight size={18} className="text-green-500 text-center" />}
                            </button>


                        );
                    })}
                </div>

                {/* RIGHT: 3D Card Swap Area */}
                <div className="w-full lg:w-3/5 h-[510px] lg:h-full relative pointer-events-none lg:pointer-events-auto">
                    {/* Decorative Grid behind cards */}
                    <div className="absolute inset-0 "><RippleGrid></RippleGrid></div>


                    {!isGsapReady ? (
                        <div className="absolute inset-0 flex items-center justify-center text-green-500">
                            <Loader2 className="animate-spin mr-2" /> Initializing Core...
                        </div>
                    ) : (
                        <CardSwap
                            ref={cardSwapRef}
                            isGsapReady={isGsapReady}
                            onIndexChange={setActiveIndex}
                            delay={4000}
                            width={320}
                            height={420}
                            skewAmount={2}
                        >
                            {experiences.map((exp) => (
                                
                                <Card
                                    key={exp.id}
                                    className={`bg-zinc-900 p-6 flex flex-col justify-between border-2 ${exp.border} border-opacity-50 pointer-events-auto cursor-grab active:cursor-grabbing`}
                                >
                                    {/* Card Header */}
                                    <div className="flex justify-between items-start">
                                        <div className={`p-2 rounded bg-black/50 border border-white/20 ${exp.color}`}>
                                            {exp.icon}
                                        </div>
                                        <span className="font-mono text-5xl font-bold text-white/10 select-none tracking-tighter">
                                            0{exp.id + 1}
                                        </span>
                                    </div>

                                    {/* Card Body */}
                                    <div className="relative z-10 mt-4">
                                        <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-white/5 border border-white/10 mb-3">
                                            <span className={`w-1.5 h-1.5 rounded-full ${exp.bgColor}`}></span>

                                            <span className="text-[10px] uppercase tracking-wider text-zinc-300 font-bold">{exp.role}</span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-white mb-2 leading-tight">{exp.title}</h2>
                                        <p className="text-sm text-zinc-400 leading-relaxed">
                                            {exp.desc}
                                        </p>
                                    </div>

                                    {/* Card Footer / Stats */}
                                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex gap-1">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className={`w-1 h-1 rounded-full ${i === 1 ? 'bg-red-500' : i === 2 ? 'bg-yellow-500' : 'bg-green-500'}`} />
                                            ))}
                                        </div>
                                        <div className="font-mono text-[10px] text-zinc-600 flex gap-2">
                                            <span>ID: 8X-{exp.id}2</span>
                                            <span>REL: {exp.date.split(' ')[0]}</span>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </CardSwap>
                    )}
                </div>

            </div>
        </div>
    );
}