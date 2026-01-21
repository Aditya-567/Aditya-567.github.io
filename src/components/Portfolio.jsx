
import {
    Bike,
    ChevronDown,
    Cloud,
    Code2,
    Gamepad2,
    Github,
    LinkedinIcon,
    Monitor,
    Palette,
    Terminal,
    Linkedin,
    Code2Icon
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ApproachSection from "./ApproachSection";
import CardSwap from "./CardSwap";
import Globe from "./Globe";
import LetterGlitch from "./LetterGlitch";
import ProjectsSection from "./ProjectsSection";
import SystemStatus from "./SystemStatus";
import TestimonialSection from "./TestimonialSection";

/**
 * BentoGallery Component
 * Interactive grid-based gallery with UFO and jet fighter animations
 * Displays skill cards with icons, titles, and social media links
 */
const BentoGallery = () => {
    // Semi-transparent dark background for gallery cells
    const fill = "rgba(30, 41, 59, 0.8)";

    /**
     * CellContent - Individual gallery cell content renderer
     * Renders icon, title, and subtitle with hover animations
     */
    const CellContent = ({
        icon: Icon,
        title,
        subtitle,
        color,
        rotate = 0,
        iconSize = 32,
        glitchClass = "",
    }) => (
        <div
            className={`w-full h-full flex flex-col items-center justify-center p-2 text-center group cursor-pointer hover:bg-white/5 transition-colors ${glitchClass}`}
            style={{ borderRadius: "inherit" }}
        >
            {Icon && (
                <Icon
                    size={iconSize}
                    className={`${color} mb-1 drop-shadow-md transform transition-transform group-hover:scale-110 duration-300`}
                    style={{ transform: `rotate(${rotate}deg)` }}
                />
            )}
            {title && (
                <h3 className="text-white font-bold text-sm leading-tight">{title}</h3>
            )}
            {subtitle && (
                <p className="text-slate-400 text-[8px] uppercase tracking-wider mt-0.5 font-mono">
                    {subtitle}
                </p>
            )}
        </div>
    );

    return (
        <div className="w-full flex justify-center py-10">
            <div className="relative transform scale-[0.85] sm:scale-100 md:scale-110 transition-transform duration-500">
                <div style={{ position: "relative", width: 300, height: 480 }}>
                    {/* UFO PATROL UNIT */}
                    <div
                        className="absolute -top-24 z-30 animate-ufo-bento-patrol pointer-events-none opacity-50"
                        style={{ left: "33%" }}
                    >
                        <div className="animate-ufo-hover-vertical">
                            <div
                                className="absolute top-[70%] -left-[44%] -translate-x-1/2 w-28 h-80 bg-gradient-to-b from-green-300/50 via-green-400/10 to-transparent -z-10 blur-[4px] animate-beam-bento-glow origin-top"
                                style={{
                                    clipPath: "polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)",
                                }}
                            ></div>
                            <svg
                                width="60"
                                height="60"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-green-300/30 drop-shadow-[0_0_15px_rgba(74,222,128,0.9)]"
                            >
                                <path d="M7 12a5 5 0 0 1 10 0" fill="rgba(34,197,94,0.2)" />
                                <path d="M2 12h20" />
                                <path
                                    d="M4 12c0 3 2 5 8 5s8-2 8-5"
                                    fill="rgba(21,128,61,0.8)"
                                />
                            </svg>
                            <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2 flex gap-1.5">
                                <div className="w-1 h-1 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,1)]"></div>
                                <div className="w-1 h-1 bg-red-400 rounded-full animate-pulse delay-75 shadow-[0_0_8px_rgba(248,113,113,1)]"></div>
                                <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-150 shadow-[0_0_8px_rgba(250,204,21,1)]"></div>
                            </div>
                        </div>
                    </div>

                    {/* --- JET FIGHTER SQUADRON (Intercepts UFO on Right) --- */}

                    {/* Fighter 1 (Top Flank) */}
                    <div className="absolute top-[-40px] right-[-160px] z-20 animate-jet-sortie-top pointer-events-none">
                        <div className="relative transform rotate-[275deg]">
                            {/* Jet Body */}
                            <svg
                                width="20"
                                height="40"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="text-slate-400 fill-slate-800 drop-shadow-lg"
                            >
                                <path d="M12 2L2 22L12 18L22 22L12 2Z" />{" "}
                                {/* Delta Wing Shape */}
                                <path d="M12 18V2" className="text-slate-600" />
                            </svg>
                            {/* Engine Glow */}
                            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-orange-500 blur-[2px]"></div>

                            <div style={{
                                background: "repeating-linear-gradient(to top, #f87171 0 4px, transparent 4px 8px)",
                                filter: "blur(0.6px)"
                            }}
                                className="absolute bottom-[100%] left-1/2 -translate-x-1/2 w-[1px] h-24 bg-red-400 blur-[1px] animate-laser-fire-vertical delay-75 origin-bottom"></div>

                        </div>
                    </div>

                    {/* Fighter 2 (Bottom Flank) */}
                    <div className="absolute top-[80px] right-[-50px] z-20 animate-jet-sortie-bottom pointer-events-none">
                        <div className="relative transform -rotate-[10deg]">
                            {/* Jet Body */}
                            <svg
                                width="30"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="text-slate-500 fill-slate-800 drop-shadow-lg"
                            >
                                <path d="M12 2L2 22L12 18L22 22L12 2Z" />
                                <path d="M12 18V2" className="text-slate-600" />
                            </svg>
                            {/* Engine Glow */}
                            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-1.5 h-5 bg-orange-500 blur-[2px]"></div>
                            {/* Laser Fire (Vertical) */}
                            <div
                                style={{
                                    background: "repeating-linear-gradient(to top, #f87171 0 4px, transparent 4px 8px)",
                                    filter: "blur(0.6px)"
                                }}
                                className="absolute bottom-[100%] left-1/2 -translate-x-1/2 w-0.5 h-20 bg-red-400 blur-[1px] animate-laser-fire-vertical delay-75 origin-bottom"></div>
                        </div>
                    </div>

                    {/* Grid Items */}

                    <div
                        className="animate-shake-bento-left rounded-[20px] bg-slate-800/20 border border-slate-600"
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: 200,
                            height: 280,
                        }}
                    >
                        <img src="coding.jpeg" alt="Biking" className=" rounded-[20px]  h-[100%] w-[100%] animate-data-glitch-left grayscale  opacity-80" />
                    </div>

                    <div
                        className="bg-slate-800/50 border border-slate-600"
                        style={{
                            position: "absolute",
                            left: 210,
                            top: 230,
                            width: 100,
                            height: 322,
                            borderRadius: "20px",

                        }}
                    >
                        <img src="banner.jpg" alt="cloud" className=" rounded-[20px] grayscale  opacity-80 " />
                    </div>

                    <div
                        className="bg-slate-800/20 border border-slate-600"
                        style={{
                            position: "absolute",
                            left: 210,
                            top: 180,
                            width: 100,
                            height: 40,
                            borderRadius: "15px",

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <div className="w-full h-full flex items-center justify-center animate-data-glitch-right">
                            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    <div
                        className="bg-slate-800/50 border border-slate-600 "
                        style={{
                            position: "absolute",
                            left: 50,
                            top: 290,
                            width: 150,
                            height: 150,
                            borderRadius: "20px",

                        }}
                    >
                        <img src="bike.jpeg" alt="Biking" className=" rounded-[20px] grayscale  opacity-80" />
                    </div>

                    <div
                        className="animate-shake-bento-right bg-slate-800/20 border border-slate-600"
                        style={{
                            position: "absolute",
                            left: 210,
                            top: 130,
                            width: 100,
                            height: 40,

                            borderRadius: "15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <div className="w-full h-full flex items-center justify-center animate-data-glitch-right">
                            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors"><Github size={20} /></a>
                        </div>
                    </div>

                    <div
                        className="animate-shake-bento-right bg-slate-800/20 border border-slate-600"
                        style={{
                            position: "absolute",
                            left: 210,
                            top: 80,
                            width: 100,
                            height: 40,

                            borderRadius: "15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <div className="w-full h-full flex items-center justify-center animate-data-glitch-right">
                            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors"><Code2Icon size={20} /></a>
                        </div>
                    </div>

                    <div
                        className="animate-shake-bento-right bg-slate-800/20 border border-slate-600"
                        style={{
                            position: "absolute",
                            left: 210,
                            top: 0,
                            width: 100,
                            height: 70,

                            borderRadius: "20px",
                        }}
                    >
                        <CellContent
                            icon={Gamepad2}
                            title="GAMER"
                            color="text-purple-400"
                            iconSize={24}
                            glitchClass="animate-data-glitch-right"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

const LoopingRoles = () => {
    const roles = [
        "Full Stack Developer",
        "Web Developer",
        "Cloud-Enthusiast",
        "Coder",
        "Front End Developer",
    ];
    const allRoles = [...roles, ...roles, ...roles, ...roles, ...roles, ...roles];
    return (
        <div className="relative w-full overflow-hidden py-4">
            <div className="absolute top-0 bottom-0 left-0 w-8 md:w-16 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute top-0 bottom-0 right-0 w-8 md:w-16 bg-gradient-to-l from-black to-transparent z-10" />
            <div className="flex w-max gap-4 animate-scroll-ltr">
                {allRoles.map((role, i) => (
                    <div
                        key={i}
                        className="px-4 py-1.5 md:px-6 md:py-1.5 rounded-full  bg-gradient-to-b from-[#222]/80 to-black  text-white/80 font-mono font-bold text-[10px] md:text-sm tracking-widest uppercase shadow-[0_0_15px_rgba(34,197,94,0.1)] backdrop-blur-sm hover:bg-green-500/20 transition-colors cursor-default whitespace-nowrap"
                    >
                        {role}
                    </div>
                ))}
            </div>
        </div>
    );
};
const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
    };
};

const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    // Path command: Move to start -> Arc to end
    return [
        'M', start.x, start.y,
        'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');
};

// Configuration for the circles with specific Colors for each role
const circles = [
    {
        angle: 215, delay: '0s', icon: <Monitor size={24} />, label: 'Frontend Dev',
        color: 'text-blue-400',
        hoverColor: 'group-hover:text-blue-300',
        borderColor: 'group-hover:border-blue-400',
        shadow: 'group-hover:shadow-[0_0_25px_rgba(96,165,250,0.6)]'
    },
    {
        angle: 192, delay: '0.2s', icon: <Code2 size={24} />, label: 'Coder',
        color: 'text-yellow-400',
        hoverColor: 'group-hover:text-yellow-200',
        borderColor: 'group-hover:border-yellow-400',
        shadow: 'group-hover:shadow-[0_0_25px_rgba(250,204,21,0.6)]'
    },
    {
        angle: 168, delay: '0.4s', icon: <Gamepad2 size={24} />, label: 'Gamer',
        color: 'text-purple-500',
        hoverColor: 'group-hover:text-purple-300',
        borderColor: 'group-hover:border-purple-500',
        shadow: 'group-hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]'
    },
    {
        angle: 144, delay: '0.6s', icon: <Palette size={24} />, label: 'Painter',
        color: 'text-pink-500',
        hoverColor: 'group-hover:text-pink-300',
        borderColor: 'group-hover:border-pink-500',
        shadow: 'group-hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]'
    },
    {
        angle: 120, delay: '0.8s', icon: <Cloud size={24} />, label: 'Cloud Enthusiast',
        color: 'text-cyan-400',
        hoverColor: 'group-hover:text-cyan-200',
        borderColor: 'group-hover:border-cyan-400',
        shadow: 'group-hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]'
    },
    {
        angle: 96, delay: '1s', icon: <Bike size={24} />, label: 'Biker',
        color: 'text-red-500',
        hoverColor: 'group-hover:text-red-300',
        borderColor: 'group-hover:border-red-500',
        shadow: 'group-hover:shadow-[0_0_25px_rgba(239,68,68,0.6)]'
    },
];



const FuzzyText = ({
    children,
    fontSize = "clamp(2rem, 10vw, 10rem)",
    fontWeight = 900,
    fontFamily = "inherit",
    color = "#fff",
    enableHover = true,
    baseIntensity = 0.18,
    hoverIntensity = 0.5,
    fuzzRange = 30,
    fps = 60,
    direction = "horizontal",
    transitionDuration = 0,
    clickEffect = false,
    glitchMode = false,
    glitchInterval = 2000,
    glitchDuration = 200,
    gradient = null,
    letterSpacing = 0,
    className = "",
}) => {
    const canvasRef = useRef(null);
    useEffect(() => {
        let animationFrameId;
        let isCancelled = false;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const init = async () => {
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const computedFontFamily =
                fontFamily === "inherit"
                    ? window.getComputedStyle(canvas).fontFamily || "sans-serif"
                    : fontFamily;
            const fontSizeStr =
                typeof fontSize === "number" ? `${fontSize}px` : fontSize;
            try {
                await document.fonts.load(
                    `${fontWeight} ${fontSizeStr} ${computedFontFamily}`
                );
            } catch { }
            if (isCancelled) return;
            let numericFontSize;
            if (typeof fontSize === "number") numericFontSize = fontSize;
            else {
                const temp = document.createElement("span");
                temp.style.fontSize = fontSize;
                document.body.appendChild(temp);
                numericFontSize = parseFloat(window.getComputedStyle(temp).fontSize);
                document.body.removeChild(temp);
            }
            const text = React.Children.toArray(children)
                .map((child) => (typeof child === "string" ? child : ""))
                .join("");
            const offscreen = document.createElement("canvas");
            const offCtx = offscreen.getContext("2d");
            if (!offCtx) return;
            offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
            offCtx.textBaseline = "alphabetic";
            let totalWidth = offCtx.measureText(text).width;
            if (letterSpacing !== 0) {
                totalWidth = 0;
                for (const char of text)
                    totalWidth += offCtx.measureText(char).width + letterSpacing;
                totalWidth -= letterSpacing;
            }
            const metrics = offCtx.measureText(text);
            const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;
            const actualDescent =
                metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;
            const tightHeight = Math.ceil(actualAscent + actualDescent);
            const offscreenWidth = Math.ceil(totalWidth + 20);
            offscreen.width = offscreenWidth;
            offscreen.height = tightHeight;
            const xOffset = 10;
            offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
            offCtx.textBaseline = "alphabetic";
            if (gradient && Array.isArray(gradient) && gradient.length >= 2) {
                const grad = offCtx.createLinearGradient(0, 0, offscreenWidth, 0);
                gradient.forEach((c, i) =>
                    grad.addColorStop(i / (gradient.length - 1), c)
                );
                offCtx.fillStyle = grad;
            } else {
                offCtx.fillStyle = color;
            }
            if (letterSpacing !== 0) {
                let xPos = xOffset;
                for (const char of text) {
                    offCtx.fillText(char, xPos, actualAscent);
                    xPos += offCtx.measureText(char).width + letterSpacing;
                }
            } else {
                offCtx.fillText(text, xOffset, actualAscent);
            }
            const horizontalMargin = fuzzRange + 20;
            const verticalMargin =
                direction === "vertical" || direction === "both" ? fuzzRange + 10 : 0;
            canvas.width = offscreenWidth + horizontalMargin * 2;
            canvas.height = tightHeight + verticalMargin * 2;
            ctx.translate(horizontalMargin, verticalMargin);
            let currentIntensity = baseIntensity;
            const run = () => {
                if (isCancelled) return;
                ctx.clearRect(
                    -fuzzRange - 20,
                    -fuzzRange - 10,
                    offscreenWidth + 2 * (fuzzRange + 20),
                    tightHeight + 2 * (fuzzRange + 10)
                );
                for (let j = 0; j < tightHeight; j++) {
                    let dx = 0,
                        dy = 0;
                    if (direction === "horizontal" || direction === "both")
                        dx = Math.floor(
                            currentIntensity * (Math.random() - 0.5) * fuzzRange
                        );
                    if (direction === "vertical" || direction === "both")
                        dy = Math.floor(
                            currentIntensity * (Math.random() - 0.5) * fuzzRange * 0.5
                        );
                    ctx.drawImage(
                        offscreen,
                        0,
                        j,
                        offscreenWidth,
                        1,
                        dx,
                        j + dy,
                        offscreenWidth,
                        1
                    );
                }
                animationFrameId = window.requestAnimationFrame(run);
            };
            run();
        };
        init();
        return () => {
            isCancelled = true;
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [
        children,
        fontSize,
        fontWeight,
        fontFamily,
        color,
        baseIntensity,
        fuzzRange,
        direction,
        gradient,
        letterSpacing,
    ]);
    return <canvas ref={canvasRef} className={className} />;
};
export { FuzzyText };



/**
 * Reveal/InViewAnimator Component
 * Triggers fade-in and slide animations when element enters viewport
 * Uses Intersection Observer API to detect visibility
 * @param {string} direction - Slide direction: 'up', 'down', 'left', 'right'
 * @param {number} delay - Animation delay in milliseconds for staggering
 * @param {string} className - Additional CSS classes to apply
 */
const Reveal = ({ children, className = "", delay = 0, direction = "up" }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    // Set up Intersection Observer to detect when element enters viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    // Map direction string to Tailwind translate class
    const getTransform = () => {
        switch (direction) {
            case "up":
                return "translate-y-10";
            case "down":
                return "-translate-y-10";
            case "left":
                return "translate-x-10";
            case "right":
                return "-translate-x-10";
            default:
                return "translate-y-10";
        }
    };

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out ${className} ${isVisible
                ? "opacity-100 translate-y-0 translate-x-0"
                : `opacity-0 ${getTransform()}`
                }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

/**
 * ParallaxElement Component
 * Creates parallax scrolling effect based on mouse position
 * @param {number} speed - Multiplier for parallax effect intensity
 * @param {object} mousePos - Current mouse position coordinates
 */
const ParallaxElement = ({
    children,
    className,
    speed = 1,
    mousePos,
    customTransform = null,
}) => {
    // Calculate parallax offset based on mouse position and speed
    const x = (mousePos.x * speed) / 100;
    const y = (mousePos.y * speed) / 100;
    const baseTransform = `translate(${x}px, ${y}px)`;
    const combinedTransform = customTransform
        ? `${customTransform} ${baseTransform}`
        : baseTransform;

    return (
        <div
            className={`absolute pointer-events-none opacity-20 transition-transform duration-1000 ease-out ${className}`}
            style={{ transform: combinedTransform }}
        >
            {children}
        </div>
    );
};

/**
 * Skills/TechCarousel Component
 * Infinite scrolling carousel of technology skills in two rows
 * Icons rotate smoothly and scroll in opposite directions
 * Pause animation on hover for better readability
 */
const Skills = () => {
    // Array of technologies with names, icon identifiers, and brand colors
    const skills = [
        { name: "AWS", icon: "task", color: "#FF9900" },
        { name: "Angular", icon: "angular", color: "#DD0031" },
        { name: "TypeScript", icon: "typescript", color: "#3178C6" },
        { name: "React", icon: "react", color: "#61DAFB" },
        { name: "JavaScript", icon: "javascript", color: "#F7DF1E" },
        { name: "HTML", icon: "html5", color: "#E34F26" },
        { name: "CSS", icon: "css", color: "#1572B6" },
        { name: "Git", icon: "git", color: "#F05032" },
        { name: "Docker", icon: "docker", color: "#2496ED" },
        { name: "MongoDB", icon: "mongodb", color: "#47A248" },
        { name: "Node.js", icon: "nodedotjs", color: "#339933" },
        { name: "Express", icon: "express", color: "#ffffff" },
        { name: "Tailwind", icon: "tailwindcss", color: "#06B6D4" },
        { name: "C", icon: "c", color: "#A8B9CC" },
        { name: "C++", icon: "cplusplus", color: "#00599C" },
    ];

    const technologies = skills.map((s) => ({
        name: s.name,
        color: s.color,
        icon: `https://cdn.simpleicons.org/${s.icon}/${s.color.replace("#", "")}`,
    }));

    // Split skills into two rows
    const midPoint = Math.ceil(technologies.length / 2);
    const row1 = technologies.slice(0, midPoint);
    const row2 = technologies.slice(midPoint);

    // Duplicate for seamless looping
    const duplicatedRow1 = [...row1, ...row1, ...row1, ...row1];
    const duplicatedRow2 = [...row2, ...row2, ...row2, ...row2];

    const SkillCard = ({ tech, rotateClass }) => (
        <div className="group/card relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 mx-2 transition-all duration-300 hover:-translate-y-2 cursor-pointer z-10">
            <div
                className={`w-full h-full bg-gradient-to-b from-[#222] to-black border border-white/20 rounded-full flex flex-col items-center justify-center gap-1 group-hover/card:bg-slate-800/80 group-hover/card:border-blue-500/30 transition-colors shadow-lg shadow-blue-500/10 ${rotateClass}`}
            >
                <div className="w-6 h-6 sm:w-8 sm:h-8 relative flex items-center justify-center">
                    <img
                        src={tech.icon}
                        alt={tech.name}
                        className="w-full h-full object-contain filter drop-shadow-[0_0_5px_rgba(255,255,255,0.1)]"
                    />
                </div>
                <span className="text-[8px] sm:text-[10px] font-mono text-slate-300 group-hover/card:text-white transition-colors">
                    {tech.name}
                </span>

                {/* Hover Glow Effect */}
                <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover/card:opacity-20 transition-opacity duration-300 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at center, ${tech.color}, transparent 70%)`,
                    }}
                ></div>
            </div>
        </div>
    );

    return (
        <div className="w-[88%] mx-auto px-16 py-12 overflow-hidden ">
            <div className="text-center mb-6">
                <h2 className="text-4xl font-extrabold mb-2 flex items-center justify-center gap-3">
                    <FuzzyText
                        fontSize="clamp(2rem, 5vw, 4rem)"
                        fontWeight={1000}
                        color="#ffffff"
                        baseIntensity={0.25}
                        hoverIntensity={0.6}
                        fuzzRange={16}
                    >
                        Tech Stack
                    </FuzzyText>
                </h2>

                <p className="text-green-300/70">Technologies I trust to ship fast, scale smart, and stay reliable.</p>
            </div>

            <div className="flex flex-col gap-6">
                {/* Row 1: Left to Right (Icons rotate Clockwise) */}
                <div className="relative w-full overflow-hidden group/row py-4">
                    <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                    <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
                    <div className="flex w-max animate-scroll-ltr group-hover/row:[animation-play-state:paused]">
                        {duplicatedRow1.map((tech, i) => (
                            <SkillCard
                                key={`${tech.name}-r1-${i}`}
                                tech={tech}
                                rotateClass="animate-spin-slow group-hover/row:[animation-play-state:paused]"
                            />
                        ))}
                    </div>
                </div>

                {/* Row 2: Right to Left (Icons rotate Counter-Clockwise) */}
                <div className="relative w-full overflow-hidden group/row py-4">
                    <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                    <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
                    <div className="flex w-max animate-scroll-rtl group-hover/row:[animation-play-state:paused]">
                        {duplicatedRow2.map((tech, i) => (
                            <SkillCard
                                key={`${tech.name}-r2-${i}`}
                                tech={tech}
                                rotateClass="animate-spin-slow-reverse group-hover/row:[animation-play-state:paused]"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PORTFOLIO COMPONENT ---

/**
 * Portfolio - Main Component
 * Root component that orchestrates all sections: hero, about, experience, projects, and contact
 * Manages global state like scroll position, level counter, and mouse tracking
 * Handles navigation and section references for smooth scrolling
 */
const Portfolio = () => {
    // Global state management
    const [scrolled, setScrolled] = useState(false);
    const [level, setLevel] = useState(1); // Experience/skill level counter
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // Track mouse for parallax effects
    const [expandNav, setExpandNav] = useState(false); // Toggle nav expansion

    // Refs for each section to enable smooth scroll navigation
    const heroRef = useRef(null);
    const aboutRef = useRef(null);
    const expRef = useRef(null);
    const projectRef = useRef(null);
    const contactRef = useRef(null);

    useEffect(() => {
        // Inject Custom Styles
        const style = document.createElement("style");
        style.innerHTML = `
      @keyframes glitch-1 { 0% { clip-path: inset(20% 0 80% 0); } 20% { clip-path: inset(60% 0 10% 0); } 40% { clip-path: inset(40% 0 50% 0); } 60% { clip-path: inset(80% 0 5% 0); } 80% { clip-path: inset(10% 0 70% 0); } 100% { clip-path: inset(30% 0 50% 0); } }
      @keyframes glitch-2 { 0% { clip-path: inset(10% 0 60% 0); } 20% { clip-path: inset(80% 0 5% 0); } 40% { clip-path: inset(30% 0 10% 0); } 60% { clip-path: inset(50% 0 80% 0); } 80% { clip-path: inset(10% 0 40% 0); } 100% { clip-path: inset(70% 0 20% 0); } }
      @keyframes run-across { 0% { left: -10%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { left: 110%; opacity: 0; } }
      @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
      @keyframes ufo-bento-patrol { 0% { left: 33%; transform: translate(-50%, -20px) rotate(-2deg); } 30% { left: 33%; transform: translate(-50%, -20px) rotate(2deg); } 45% { left: 82%; transform: translate(-50%, -20px) rotate(5deg); } 50% { left: 82%; transform: translate(-50%, -20px) rotate(-2deg); } 80% { left: 82%; transform: translate(-50%, -20px) rotate(2deg); } 90% { left: 33%; transform: translate(-50%, -20px) rotate(-5deg); } 100% { left: 33%; transform: translate(-50%, -20px) rotate(-2deg); } }
      @keyframes beam-bento-glow { 0%, 40% { opacity: 0.3; transform: scaleY(1); } 42% { opacity: 0.9; transform: scaleY(1.1); } 63% { opacity: 0.9; transform: scaleY(1.1); } 65% { opacity: 0.3; transform: scaleY(1); } 100% { opacity: 0.3; transform: scaleY(1); } }
      @keyframes shake-bento-left { 0% { transform: translate(1px, -11px) rotate(0deg); } 10% { transform: translate(-1px, -14px) rotate(-1deg); } 20% { transform: translate(-3px, -12px) rotate(1deg); } 30% { transform: translate(3px, -10px) rotate(0deg); } 40% { transform: translate(1px, -13px) rotate(1deg); } 50% { transform: translate(-1px, -10px) rotate(-1deg); } 60% { transform: translate(-3px, -11px) rotate(0deg); } 70% { transform: translate(3px, -11px) rotate(-1deg); } 80% { transform: translate(-1px, -13px) rotate(1deg); } 90% { transform: translate(1px, -10px) rotate(0deg); } 100% { transform: translate(1px, -14px) rotate(-1deg); } }
      @keyframes shake-bento-right { 0%, 50% { transform: translate(0, 0); } 50% { transform: translate(1px, -11px) rotate(0deg); } 60% { transform: translate(-1px, -14px) rotate(-1deg); } 70% { transform: translate(-3px, -12px) rotate(1deg); } 80% { transform: translate(3px, -10px) rotate(0deg); } 100% { transform: translate(0, 0); } }
      
      /* Jet Sortie Top - Swoops in during Right Flank (50-80%) */
      @keyframes jet-sortie-top {
        0%, 45% { opacity: 0; transform: translate(50px, -50px) rotate(15deg); }
        50% { opacity: 1; transform: translate(-10px, 10px) rotate(15deg); }
        60% { transform: translate(0px, 0px) rotate(12deg); }
        70% { transform: translate(-5px, 5px) rotate(15deg); }
        80% { opacity: 1; transform: translate(50px, -50px) rotate(45deg); }
        100% { opacity: 0; }
      }

      /* Jet Sortie Bottom */
      @keyframes jet-sortie-bottom {
        0%, 48% { opacity: 0; transform: translate(50px, 50px) rotate(-10deg); }
        53% { opacity: 1; transform: translate(-15px, -5px) rotate(-10deg); }
        63% { transform: translate(0px, 0px) rotate(-12deg); }
        73% { transform: translate(-10px, -5px) rotate(-10deg); }
        83% { opacity: 1; transform: translate(50px, 50px) rotate(-45deg); }
        100% { opacity: 0; }
      }

      /* Laser Fire Horizontal */
      @keyframes laser-fire {
        0%, 100% { opacity: 0; width: 0; }
        50%, 75% { opacity: 1; width: 80px; }
      }
      
      /* Laser Fire Vertical */
      @keyframes laser-fire-vertical {
        0%, 100% { opacity: 0; height: 0; }
        50%, 75% { opacity: 1; height: 80px; }
      }

      @keyframes ufo-diagonal { 0% { transform: translate(0, 0) rotate(-5deg); } 25% { transform: translate(15px, -15px) rotate(5deg); } 50% { transform: translate(-5px, -35px) rotate(-3deg); } 75% { transform: translate(-20px, -10px) rotate(3deg); } 100% { transform: translate(0, 0) rotate(-5deg); } }
      @keyframes ufo-diagonal-reverse { 0% { transform: translate(0, 0) rotate(5deg); } 25% { transform: translate(-15px, 15px) rotate(-5deg); } 50% { transform: translate(5px, 35px) rotate(3deg); } 75% { transform: translate(20px, 10px) rotate(-3deg); } 100% { transform: translate(0, 0) rotate(5deg); } }
      @keyframes bike-wobble { 0% { transform: translate(0, 0) rotate(0deg); } 25% { transform: translate(-1px, -1px) rotate(-2deg); } 50% { transform: translate(1px, 1px) rotate(0deg); } 75% { transform: translate(-1px, 1px) rotate(2deg); } 100% { transform: translate(0, 0) rotate(0deg); } }
      @keyframes ufo-hover-vertical { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      @keyframes scroll-ltr { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
      @keyframes scroll-rtl { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes spin-slow-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
      @keyframes grid-move { 0% { transform: translateY(0); } 100% { transform: translateY(40px); } }
      .perspective-grid { transform: perspective(500px) rotateX(60deg); transform-origin: center top; }
      .animate-scroll-ltr { animation: scroll-ltr 40s linear infinite; }
      .animate-scroll-rtl { animation: scroll-rtl 40s linear infinite; }
      .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      .animate-spin-slow-reverse { animation: spin-slow-reverse 8s linear infinite; }
      .animate-ufo-bento-patrol { animation: ufo-bento-patrol 6s ease-in-out infinite; }
      .animate-beam-bento-glow { animation: beam-bento-glow 10s ease-in-out infinite; }
      .animate-shake-bento-left { animation: shake-bento-left 3s ease-in-out infinite; animation-delay: 0s; animation-play-state: running; }
      .animate-shake-bento-right { animation: shake-bento-right 3s ease-in-out infinite; animation-delay: 5s; animation-play-state: running; }
      .animate-type-glitch-left { animation: type-glitch-left 10s ease-in-out infinite; }
      .animate-type-glitch-right { animation: type-glitch-right 10s ease-in-out infinite; }
      .animate-ufo { animation: ufo-diagonal 5s ease-in-out infinite; }
      .animate-ufo-reverse { animation: ufo-diagonal-reverse 4s ease-in-out infinite; }
      .animate-bike { animation: bike-wobble 0.1s linear infinite; }
      .animate-ufo-hover-vertical { animation: ufo-hover-vertical 2s ease-in-out infinite; }
      .animate-data-glitch-left { animation: glitch-1 0.01s infinite; }
      .animate-data-glitch-right { animation: glitch-2 0.2s infinite; }
      .animate-jet-sortie-top { animation: jet-sortie-top 10s ease-in-out infinite; }
      .animate-jet-sortie-bottom { animation: jet-sortie-bottom 10s ease-in-out infinite; }
      .animate-laser-fire { animation: laser-fire 0.2s linear infinite; }
      .animate-laser-fire-vertical { animation: laser-fire-vertical 0.2s linear infinite; }
    `;
        document.head.appendChild(style);

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            const scrollPercentage = scrollPosition / (docHeight - windowHeight);
            const newLevel = Math.floor(scrollPercentage * 50) + 1;
            setLevel(newLevel);
            setScrolled(scrollPosition > 50);
        };

        const handleMouseMove = (e) => {
            setMousePos({
                x: e.clientX - window.innerWidth / 2,
                y: e.clientY - window.innerHeight / 2,
            });
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
            document.head.removeChild(style);
        };
    }, []);

    const scrollToSection = (ref) =>
        ref.current?.scrollIntoView({ behavior: "smooth" });

    return (
        <div className="min-h-screen  bg-black text-slate-100 font-sans selection:bg-green-500 selection:text-black overflow-x-hidden ">
 

            <nav
                className={`fixed z-50 transition-all   duration-500 backdrop-blur-sm ease-in-out left-1/2 -translate-x-1/2 overflow-hidden ${scrolled
                    ? "top-2 w-[96%] md:top-4 md:w-[80%] rounded-full border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.15)] py-2"
                    : "top-0 w-full rounded-none bg-transparent border-transparent py-6"
                    }`}
            >
                {scrolled && (
                    <div className="absolute inset-0 -z-10 bg-black/70">
                        <div className="absolute inset-0 z-0"></div>
                    </div>
                )}
                <div className="max-w-7xl mx-auto px-2 flex justify-between items-center h-full  relative z-20">
                    <div
                        className="flex items-center gap-2 interactive-hover cursor-pointer"
                        onClick={() => setExpandNav(!expandNav)}
                    >
                        {/* Avatar Image */}
                        <div
                            className={`rounded-full overflow-hidden border-2 border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all duration-300 bg-slate-800 ${expandNav ? "w-28 h-28" : "w-11 h-11"
                                }`}
                        >
                            <img
                                src="UserImage.jpeg"
                                alt="Player Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="hidden md:block ml-3 transition-all duration-300">
                            <p className="text-sm text-green-400 font-mono leading-none">
                                Player: Aditya Kumar
                            </p>
                            <p className="text-xs text-slate-400 font-mono leading-none mt-1">
                                Lvl {level * 2 - 2}
                            </p>

                            {expandNav && (
                                <div className="mt-2 text-sm text-slate-300 space-y-1">
                                    <p className="leading-none">
                                        HACKTOBERFEST <span className="text-green-400 font-bold">2023</span>{" "}

                                    </p>
                                    <p className="leading-none">
                                        Leetcode Contest Rating:{" "}
                                        <span className="text-yellow-400 font-semibold">
                                            1571
                                        </span>
                                    </p>
                                    <p className="leading-none">
                                        Projects:{" "}
                                        <span className="text-green-300 font-medium">12</span>
                                    </p>
                                    <p className="leading-none">
                                        LeetCode:{" "}
                                        <span className="text-blue-300 font-medium">400+</span>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-1 md:gap-6 text-xs md:text-sm font-mono">
                        {["About", "Experience", "Projects", "Contact Me"].map((item) => (
                            <button
                                key={item}
                                onClick={() => {
                                    if (item === "About") scrollToSection(aboutRef);
                                    if (item === "Experience") scrollToSection(expRef);
                                    if (item === "Projects") scrollToSection(projectRef);
                                    if (item === "Contact Me") scrollToSection(contactRef);
                                }}
                                className="px-3 py-2 hover:text-green-400 hover:bg-green-500/10 rounded-t-2xl transition-colors duration-300 relative group interactive-hover"
                            >
                                {item}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 h-0.5 bg-slate-800 w-full z-30">
                    <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-300 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(34,197,94,0.7)]"
                        style={{ width: `${(level / 50) * 100}%` }}
                    />
                </div>
            </nav>

            {/*hero section with LaserFlow and Parallax Elements*/}
            <section
                ref={heroRef}
                className="min-h-screen  flex items-center justify-start relative overflow-hidden bg-black w-full pl-40  mx-auto "
            >
                <div className="relative z-10 text-left flex flex-row  w-full pointer-events-none">
                    <ParallaxElement
                        className="absolute top-[24%] left-[28%] z-50"
                        speed={2}
                        mousePos={mousePos}
                        customTransform="rotate(16deg)"
                    >
                        <div
                            className="relative animate-ufo-bento-patrol "
                            style={{ left: "70%" }}
                        >
                            <div className="animate-ufo-hover-vertical">
                                <div
                                    className="absolute top-[55%] animate-pulse left-1/2 -translate-x-1/2 w-14 h-36 bg-gradient-to-b from-green-500 via-green-500/80 to-transparent -z-10 blur-[2px]"
                                    style={{
                                        clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                                    }}
                                ></div>
                                <svg
                                    width="60"
                                    height="60"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-green-400"
                                    style={{
                                        filter:
                                            "drop-shadow(0 0 15px rgba(74,222,128,0.9)) drop-shadow(0 0 30px rgba(74,222,128,0.6))",
                                    }}
                                >
                                    <path d="M7 12a5 5 0 0 1 10 0" fill="rgba(34,197,94,0.2)" />
                                    <path d="M2 12h20" />
                                    <path
                                        d="M4 12c0 3 2 5 8 5s8-2 8-5"
                                        fill="rgba(21,128,61,0.8)"
                                    />
                                </svg>
                                <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2 flex gap-1.5">
                                    <div className="w-1.5 h-1.5 bg-blue-200 rounded-full animate-pulse shadow-[0_0_8px_rgba(134,239,172,1)]"></div>
                                    <div className="w-1.5 h-1.5 bg-blue-200 rounded-full animate-pulse delay-75 shadow-[0_0_8px_rgba(252,165,165,1)]"></div>
                                    <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse delay-150 shadow-[0_0_8px_rgba(147,197,253,1)]"></div>
                                </div>
                            </div>
                        </div>
                    </ParallaxElement>

                    <div className="pointer-events-auto flex flex-col items-start justify-center w-full h-[100vh] z-20 pt-14">
                        <Reveal delay={100}>
                            <SystemStatus />
                        </Reveal>
                        <Reveal delay={300}>
                            <div className="mb-2 -ml-6 md:-ml-9">
                                <FuzzyText
                                    fontSize="clamp(2rem, 5vw, 5rem)"
                                    fontWeight={1000}
                                    color="#ffffff"
                                    baseIntensity={0.25}
                                    hoverIntensity={0.6}
                                    fuzzRange={16}
                                >
                                    Hi, I'm
                                </FuzzyText>
                            </div>
                            <div className="mb-1 -ml-6 md:-ml-10">
                                <FuzzyText
                                    fontSize="clamp(2rem, 7vw, 6rem)"
                                    fontWeight={1000}
                                    gradient={["#4ade80", "#059669"]}
                                    baseIntensity={0.3}
                                    hoverIntensity={0.8}
                                    fuzzRange={24}
                                    glitchMode={true}
                                    glitchInterval={3000}
                                >
                                    Aditya Kumar
                                </FuzzyText>
                            </div>
                        </Reveal>
                        <Reveal delay={300}>
                            <div className="w-full  rounded-r-full sm:max-w-xl md:max-w-xl lg:max-w-2xl mb-2 md:ml-0 overflow-hidden">
                                <LoopingRoles />
                            </div>
                        </Reveal>
                        <Reveal delay={700}>
                            <div className="flex justify-start mt-6 gap-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open("https://github.com/Aditya-567?tab=repositories", "_blank");
                                    }}

                                    className="interactive-hover group rounded-full p-3 px-4 bg-gradient-to-b from-[#222]/80 to-black border border-white/10 hover:border-green-500/70 hover:text-green-400/70 transition-all flex items-center gap-2 transform hover:scale-105 backdrop-blur-sm text-sm md:text-base"
                                >

                                    <Github
                                        size={24}
                                        className="group-hover:rotate-12 transition-transform"
                                    />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open("https://www.linkedin.com/in/aditya-kumar0/", "_blank");
                                    }}
                                    className="interactive-hover group p-3 px-4 bg-gradient-to-b from-[#222]/80 to-black border border-white/10 rounded-full hover:border-green-500/70 hover:text-green-400/70 transition-all flex items-center gap-2 transform hover:scale-105 backdrop-blur-sm text-sm md:text-base"
                                >
                                    <LinkedinIcon
                                        size={24}
                                        className="group-hover:-translate-y-1 transition-transform"
                                    />
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open("https://leetcode.com/u/Aditya000567/", "_blank");
                                    }}
                                    className="interactive-hover group p-3 px-4 bg-gradient-to-b from-[#222]/80 to-black border border-white/10 rounded-full hover:border-green-500/70 hover:text-green-400/70 transition-all flex items-center gap-2 transform hover:scale-105 backdrop-blur-sm text-sm md:text-base"
                                >

                                    <img src="leetcode.png" alt="LinkedIn" className="w-full h-8 rounded-full" />
                                </button>
                                <div className=" py-1"><div className="h-full border border-white/20 mx-4"></div></div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        scrollToSection(contactRef);
                                    }}
                                    className="interactive-hover group p-3 px-5 bg-gradient-to-b from-[#222]/80 to-black border border-white/10 rounded-full hover:border-green-500/70 hover:text-green-400/70 transition-all flex items-center gap-2 transform hover:scale-105 backdrop-blur-sm text-sm md:text-base"
                                >

                                    Get in Touch
                                </button>
                            </div>
                        </Reveal>
                    </div>
                    <div className="z-40 w-full flex items-center justify-end px-8  pointer-events-none">

                        {/* --- CUSTOM ANIMATION STYLES --- */}
                        <style>{`
        @keyframes orbit-entrance {
          0% {
            opacity: 0;
            transform: rotate(-50deg) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: rotate(0deg) scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        /* SVG Dash Draw Animation (Optional extra polish) */
        @keyframes draw-line {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }

        .animate-orbit-in {
          animation: orbit-entrance 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-draw {
           stroke-dasharray: 1000;
           animation: draw-line 2s ease-out forwards;
        }
      `}</style>



                        <div className="relative w-[550px] h-[550px] flex items-center rounded-full justify-center">



                            {/* 2. The Central Image */}
                            <div className="relative z-40 h-[400px] w-[400px] rounded-full bg-[#1B1212]/70">
                                {/* Image Container with black backdrop */}

                                <img
                                    src="gif.gif"
                                    alt="Central Visual"
                                    className="h-full w-full object-cover opacity-90 rounded-full"
                                    style={{
                                        boxShadow: `
    inset 0 0 140px rgba(0, 0, 0, 0.85),
    inset 0 0 240px rgba(0, 0, 0, 0.65),
    inset 0 0 320px rgba(0, 0, 0, 0.45),
    0 0 90px rgba(0, 0, 0, 0.9),
    0 0 160px rgba(0, 0, 0, 0.75),
    0 0 240px rgba(0, 0, 0, 0.6)
  `
                                    }}
                                />
                                <div className="absolute rounded-full inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>


                            </div>

                            {/* 3. The Orbiting Circles Container */}
                            <div className="absolute inset-0 animate-orbit-in z-20">
                                {circles.map((circle, index) => (
                                    <div
                                        key={index}
                                        className="absolute left-0 top-0 w-full h-full flex items-center justify-center pointer-events-none"
                                        style={{
                                            transform: `rotate(${circle.angle}deg)`,
                                        }}
                                    >
                                        {/* Translation Wrapper */}
                                        <div
                                            style={{ transform: 'translate(270px)' }}
                                        >
                                            {/* Counter-Rotation Wrapper */}
                                            <div style={{ transform: `rotate(-${circle.angle}deg)` }}>

                                                {/* The Visual Circle */}
                                                <div
                                                    className={`group w-[86px] h-[86px] rounded-full backdrop-blur-md bg-gradient-to-b from-[#222]/90 to-black/70 border border-white/20 hover:bg-slate-800 shadow-[0_0_15px_rgba(100,116,139,0.1)] pointer-events-auto animate-float flex flex-col items-center justify-center transition-all duration-300 cursor-pointer px-1 
                        ${circle.borderColor} ${circle.shadow}`} // Apply Dynamic Hover Styles
                                                    style={{
                                                        animationDelay: circle.delay
                                                    }}
                                                >
                                                    {/* Icon with Dynamic Colors */}
                                                    <div className={`${circle.color} ${circle.hoverColor} transition-colors drop-shadow-md`}>
                                                        {circle.icon}
                                                    </div>

                                                    {/* Label */}
                                                    <span className="text-[10px] mt-1 uppercase tracking-wider font-bold text-slate-300 group-hover:text-white transition-colors text-center leading-tight">
                                                        {circle.label}
                                                    </span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>


                        </div>

                    </div>

                    <div className=" absolute top-0 -right-[22%] z-10 w-full h-full opacity-60">
                        <LetterGlitch
                            glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
                            glitchSpeed={50}
                            centerVignette={false}
                            outerVignette={true}
                            smooth={true}
                        />
                    </div>
                </div>
                <div className="absolute z-50 bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-500 pointer-events-none">
                    <ChevronDown size={32} />
                </div>
            </section>


            <section className=" mx-auto w-[90%]  relative overflow-hidden  pt-20">

                <Reveal className="relative z-10">
                    <Skills />
                </Reveal>
            </section>

            {/* ABOUT / STATS SECTION */}
            <section ref={aboutRef} className="py-24 pt-36 relative overflow-hidden">
                <div className="w-full mx-auto px-6">
                    <div className="flex flex-col lg:flex-row lg:w-[80%] mx-auto gap-24 items-center lg:items-start">
                        <div className="w-[90%] md:w-[80%] lg:w-1/3 lg:sticky lg:top-24 z-10 perspective-container flex justify-center">
                            <Reveal direction="right">
                                <BentoGallery />
                            </Reveal>
                        </div>
                        <div className="w-full md:w-[80%] lg:w-2/3 pt-12">
                            <Reveal delay={200}>
                                <h2 className="text-5xl font-extrabold mb-4 flex items-center gap-3">
                                    <FuzzyText
                                        fontSize="clamp(2rem, 5vw, 4rem)"
                                        fontWeight={1000}
                                        color="#ffffff"
                                        baseIntensity={0.25}
                                        hoverIntensity={0.6}
                                        fuzzRange={16}
                                        className="absolute -top-14 -left-12"

                                    >
                                        Origin Story
                                    </FuzzyText>


                                </h2>
                                <div className="prose prose-invert max-w-none text-slate-300 space-y-6">
                                    <p className="text-base leading-relaxed text-slate-400">
                                        I'm a developer who lives for the kick. Beyond building
                                        scalable apps, I’m a creative at heart—painting, gaming, and
                                        riding. Whether debugging code or cruising the highway, I’m
                                        always chasing the next adventure.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            {
                                                icon: Palette,
                                                color: "text-purple-400",
                                                title: "The Creator",
                                                text: "Painting and crafting to bring imaginative concepts to life.",
                                            },
                                            {
                                                icon: Gamepad2,
                                                color: "text-blue-400",
                                                title: "The Gamer",
                                                text: "Exploring virtual worlds. I treat bugs like boss battles.",
                                            },
                                            {
                                                icon: Bike,
                                                color: "text-orange-400",
                                                title: "The Rider",
                                                text: "Finding clarity on the open road. The highway rush matches a successful deployment.",
                                            },
                                            {
                                                icon: Cloud,
                                                color: "text-sky-400",
                                                title: "The Techie",
                                                text: "Constantly expanding my INT stat to stay updated on Web trends.",
                                            }, {
                                                icon: Terminal,
                                                color: "text-sky-400",
                                                title: "The Coder",
                                                text: "Breaking down complex challenges into simple logic.\nEngineering ideas into working reality.",
                                            },
                                        ].map((card, i) => (
                                            <div
                                                key={i}
                                                className="bg-gradient-to-b from-[#222]/70 to-black   p-4 rounded-xl border border-[#333] hover:border-green-500 hover:bg-[#222] transition-all duration-300 hover:-translate-y-1 interactive-hover group"
                                            >
                                                <card.icon
                                                    className={`mb-2 ${card.color} group-hover:scale-110 transition-transform`}
                                                />
                                                <h3 className="font-extrabold text-[20px] text-white mb-1 group-hover:text-green-400 transition-colors">
                                                    {card.title}
                                                </h3>
                                                <p className="text-sm text-slate-400">{card.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-[80%] mx-auto">

                <ApproachSection></ApproachSection>
            </section>


            {/* EXPERIENCE / QUEST LOG */}
            <section ref={expRef} className="py-10 relative w-full overflow-hidden ">
                <div className="relative"><CardSwap />
                </div>


            </section>

            {/* PROJECTS / LOOT */}
            <section ref={projectRef} className=" relative w-full mx-auto">


                <ProjectsSection />
            </section>

            <section className="w-[90%] mx-auto ">

                <TestimonialSection /></section>




            <section ref={contactRef} className="w-[90%] mt-20  mx-auto"> <Globe /></section>


            <footer className="py-8 mt-20 text-center text-slate-600 text-sm font-mono border-t border-slate-700">
                <p>Built with Coding + Passion + Caffeine. © 2025 Aditya Kumar.</p>
            </footer>
        </div>
    );
};

export default Portfolio;
