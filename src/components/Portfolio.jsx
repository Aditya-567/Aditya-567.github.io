/**
 * Portfolio Component
 * Main interactive 3D portfolio with animations, bento gallery, falling lines,
 * tilt effects, laser flows, and custom cursor interactions
 */

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
    Terminal
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
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
                        <img src="link.png" alt="linkdin" className="rounded-[15px] h-[100%] w-[100%] animate-data-glitch-right grayscale  opacity-80" />

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
                        <img src="github.jpg" alt="git" className=" rounded-[15px]  animate-data-glitch-right grayscale  opacity-80" />
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
                        <img src="leetcode.png" alt="git" className=" rounded-[15px]  animate-data-glitch-right grayscale  opacity-80" />
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

// --- HELPER COMPONENTS ---

/**
 * FallingLines Component
 * Canvas-based animated effect with falling vertical lines
 * Used as background decoration with customizable count and colors
 */
const FallingLines = ({ count = 40, colors = ["#ef4444", "#ffffff"] }) => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let animationFrameId;
        const resize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.offsetWidth;
                canvas.height = parent.offsetHeight;
            }
        };
        resize();
        window.addEventListener("resize", resize);
        const lines = Array.from({ length: count }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            length: Math.random() * 15 + 5,
            speed: Math.random() * 2 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: Math.random() * 0.4 + 0.1,
        }));
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            lines.forEach((line) => {
                ctx.globalAlpha = line.opacity;
                ctx.fillStyle = line.color;
                ctx.fillRect(line.x, line.y, 1, line.length);
                line.y += line.speed;
                if (line.y > canvas.height) {
                    line.y = -line.length;
                    line.x = Math.random() * canvas.width;
                }
            });
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();
        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [count, colors]);
    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10 mix-blend-overlay"
        />
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

// Calculate the arc path
// Radius is 270 to match the translate(270px) of the circles
// Center is 275, 275 (half of the 550px container)
const arcPath = describeArc(275, 275, 270, 96, 215);


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

// --- ADVANCED SHADER-BASED LASER FLOW EFFECT ---

/**
 * LaserFlow Component
 * Advanced WebGL shader-based animated laser/energy flow effect
 * Renders streaming energy beams with fog and wisp particles
 * Responds to mouse movement for interactive tilt effects
 * Uses Three.js for GPU-accelerated rendering
 */
const LaserFlow = ({
    className,
    style,
    wispDensity = 1,
    dpr,
    mouseSmoothTime = 0.0,
    mouseTiltStrength = 0.01,
    horizontalBeamOffset = 0.1,
    verticalBeamOffset = 0.0,
    flowSpeed = 0.35,
    verticalSizing = 2.0,
    horizontalSizing = 0.5,
    fogIntensity = 0.45,
    fogScale = 0.3,
    wispSpeed = 15.0,
    wispIntensity = 5.0,
    flowStrength = 0.25,
    decay = 1.1,
    falloffStart = 1.2,
    fogFallSpeed = 0.6,
    color = "#22c55e",
}) => {
    // --- RESTORED LASERFLOW COMPONENT ---
    const VERT = `
  precision highp float;
  attribute vec3 position;
  void main(){
    gl_Position = vec4(position, 1.0);
  }
  `;

    const FRAG = `
  #ifdef GL_ES
  #extension GL_OES_standard_derivatives : enable
  #endif
  precision highp float;
  precision mediump int;

  uniform float iTime;
  uniform vec3 iResolution;
  uniform vec4 iMouse;
  uniform float uWispDensity;
  uniform float uTiltScale;
  uniform float uFlowTime;
  uniform float uFogTime;
  uniform float uBeamXFrac;
  uniform float uBeamYFrac;
  uniform float uFlowSpeed;
  uniform float uVLenFactor;
  uniform float uHLenFactor;
  uniform float uFogIntensity;
  uniform float uFogScale;
  uniform float uWSpeed;
  uniform float uWIntensity;
  uniform float uFlowStrength;
  uniform float uDecay;
  uniform float uFalloffStart;
  uniform float uFogFallSpeed;
  uniform vec3 uColor;
  uniform float uFade;

  #define PI 3.14159265359
  #define TWO_PI 6.28318530718
  #define EPS 1e-6
  #define EDGE_SOFT (DT_LOCAL*4.0)
  #define DT_LOCAL 0.0038
  #define TAP_RADIUS 6
  #define R_H 150.0
  #define R_V 150.0
  #define FLARE_HEIGHT 16.0
  #define FLARE_AMOUNT 8.0
  #define FLARE_EXP 2.0
  #define TOP_FADE_START 0.1
  #define TOP_FADE_EXP 1.0
  #define FLOW_PERIOD 0.5
  #define FLOW_SHARPNESS 1.5

  #define W_BASE_X 1.5
  #define W_LAYER_GAP 0.25
  #define W_LANES 10
  #define W_SIDE_DECAY 0.5
  #define W_HALF 0.01
  #define W_AA 0.15
  #define W_CELL 20.0
  #define W_SEG_MIN 0.01
  #define W_SEG_MAX 0.55
  #define W_CURVE_AMOUNT 15.0
  #define W_CURVE_RANGE (FLARE_HEIGHT - 3.0)
  #define W_BOTTOM_EXP 10.0

  #define FOG_ON 1
  #define FOG_CONTRAST 1.2
  #define FOG_SPEED_U 0.1
  #define FOG_SPEED_V -0.1
  #define FOG_OCTAVES 5
  #define FOG_BOTTOM_BIAS 0.8
  #define FOG_TILT_TO_MOUSE 0.05
  #define FOG_TILT_DEADZONE 0.01
  #define FOG_TILT_MAX_X 0.35
  #define FOG_TILT_SHAPE 1.5
  #define FOG_BEAM_MIN 0.0
  #define FOG_BEAM_MAX 0.75
  #define FOG_MASK_GAMMA 0.5
  #define FOG_EXPAND_SHAPE 12.2
  #define FOG_EDGE_MIX 0.5

  #define HFOG_EDGE_START 0.20
  #define HFOG_EDGE_END 0.98
  #define HFOG_EDGE_GAMMA 1.4
  #define HFOG_Y_RADIUS 25.0
  #define HFOG_Y_SOFT 60.0

  #define EDGE_X0 0.22
  #define EDGE_X1 0.995
  #define EDGE_X_GAMMA 1.25
  #define EDGE_LUMA_T0 0.0
  #define EDGE_LUMA_T1 2.0
  #define DITHER_STRENGTH 1.0

      float g(float x){return x<=0.00031308?12.92*x:1.055*pow(x,1.0/2.4)-0.055;}
      float bs(vec2 p,vec2 q,float powr){
          float d=distance(p,q),f=powr*uFalloffStart,r=(f*f)/(d*d+EPS);
          return powr*min(1.0,r);
      }
      float bsa(vec2 p,vec2 q,float powr,vec2 s){
          vec2 d=p-q; float dd=(d.x*d.x)/(s.x*s.x)+(d.y*d.y)/(s.y*s.y),f=powr*uFalloffStart,r=(f*f)/(dd+EPS);
          return powr*min(1.0,r);
      }
      float tri01(float x){float f=fract(x);return 1.0-abs(f*2.0-1.0);}
      float tauWf(float t,float tmin,float tmax){float a=smoothstep(tmin,tmin+EDGE_SOFT,t),b=1.0-smoothstep(tmax-EDGE_SOFT,tmax,t);return max(0.0,a*b);} 
      float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+34.123);return fract(p.x*p.y);}
      float vnoise(vec2 p){
          vec2 i=floor(p),f=fract(p);
          float a=h21(i),b=h21(i+vec2(1,0)),c=h21(i+vec2(0,1)),d=h21(i+vec2(1,1));
          vec2 u=f*f*(3.0-2.0*f);
          return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
      }
      float fbm2(vec2 p){
          float v=0.0,amp=0.6; mat2 m=mat2(0.86,0.5,-0.5,0.86);
          for(int i=0;i<FOG_OCTAVES;++i){v+=amp*vnoise(p); p=m*p*2.03+17.1; amp*=0.52;}
          return v;
      }
      float rGate(float x,float l){float a=smoothstep(0.0,W_AA,x),b=1.0-smoothstep(l,l+W_AA,x);return max(0.0,a*b);}
      float flareY(float y){float t=clamp(1.0-(clamp(y,0.0,FLARE_HEIGHT)/max(FLARE_HEIGHT,EPS)),0.0,1.0);return pow(t,FLARE_EXP);}

      float vWisps(vec2 uv,float topF){
      float y=uv.y,yf=(y+uFlowTime*uWSpeed)/W_CELL;
      float dRaw=clamp(uWispDensity,0.0,2.0),d=dRaw<=0.0?1.0:dRaw;
      float lanesF=floor(float(W_LANES)*min(d,1.0)+0.5); // WebGL1-safe
      int lanes=int(max(1.0,lanesF));
      float sp=min(d,1.0),ep=max(d-1.0,0.0);
      float fm=flareY(max(y,0.0)),rm=clamp(1.0-(y/max(W_CURVE_RANGE,EPS)),0.0,1.0),cm=fm*rm;
      const float G=0.05; float xS=1.0+(FLARE_AMOUNT*W_CURVE_AMOUNT*G)*cm;
      float sPix=clamp(y/R_V,0.0,1.0),bGain=pow(1.0-sPix,W_BOTTOM_EXP),sum=0.0;
      for(int s=0;s<2;++s){
          float sgn=s==0?-1.0:1.0;
          for(int i=0;i<W_LANES;++i){
              if(i>=lanes) break;
              float off=W_BASE_X+float(i)*W_LAYER_GAP,xc=sgn*(off*xS);
              float dx=abs(uv.x-xc),lat=1.0-smoothstep(W_HALF,W_HALF+W_AA,dx),amp=exp(-off*W_SIDE_DECAY);
              float seed=h21(vec2(off,sgn*17.0)),yf2=yf+seed*7.0,ci=floor(yf2),fy=fract(yf2);
              float seg=mix(W_SEG_MIN,W_SEG_MAX,h21(vec2(ci,off*2.3)));
              float spR=h21(vec2(ci,off+sgn*31.0)),seg1=rGate(fy,seg)*step(spR,sp);
              if(ep>0.0){float spR2=h21(vec2(ci*3.1+7.0,off*5.3+sgn*13.0)); float f2=fract(fy+0.5); seg1+=rGate(f2,seg*0.9)*step(spR2,ep);}
              sum+=amp*lat*seg1;
          }
      }
      float span=smoothstep(-3.0,0.0,y)*(1.0-smoothstep(R_V-6.0,R_V,y));
      return uWIntensity*sum*topF*bGain*span;
  }

  void mainImage(out vec4 fc,in vec2 frag){
      vec2 C=iResolution.xy*.5; float invW=1.0/max(C.x,1.0);
      float sc=512.0/iResolution.x*.4;
      vec2 uv=(frag-C)*sc,off=vec2(uBeamXFrac*iResolution.x*sc,uBeamYFrac*iResolution.y*sc);
      vec2 uvc = uv - off;
      float a=0.0,b=0.0;
      float basePhase=1.5*PI+uDecay*.5; float tauMin=basePhase-uDecay; float tauMax=basePhase;
      float cx=clamp(uvc.x/(R_H*uHLenFactor),-1.0,1.0),tH=clamp(TWO_PI-acos(cx),tauMin,tauMax);
      for(int k=-TAP_RADIUS;k<=TAP_RADIUS;++k){
          float tu=tH+float(k)*DT_LOCAL,wt=tauWf(tu,tauMin,tauMax); if(wt<=0.0) continue;
          float spd=max(abs(sin(tu)),0.02),u=clamp((basePhase-tu)/max(uDecay,EPS),0.0,1.0),env=pow(1.0-abs(u*2.0-1.0),0.8);
          vec2 p=vec2((R_H*uHLenFactor)*cos(tu),0.0);
          a+=wt*bs(uvc,p,env*spd);
      }
      float yPix=uvc.y,cy=clamp(-yPix/(R_V*uVLenFactor),-1.0,1.0),tV=clamp(TWO_PI-acos(cy),tauMin,tauMax);
      for(int k=-TAP_RADIUS;k<=TAP_RADIUS;++k){
          float tu=tV+float(k)*DT_LOCAL,wt=tauWf(tu,tauMin,tauMax); if(wt<=0.0) continue;
          float yb=(-R_V)*cos(tu),s=clamp(yb/R_V,0.0,1.0),spd=max(abs(sin(tu)),0.02);
          float env=pow(1.0-s,0.6)*spd;
          float cap=1.0-smoothstep(TOP_FADE_START,1.0,s); cap=pow(cap,TOP_FADE_EXP); env*=cap;
          float ph=s/max(FLOW_PERIOD,EPS)+uFlowTime*uFlowSpeed;
          float fl=pow(tri01(ph),FLOW_SHARPNESS);
          env*=mix(1.0-uFlowStrength,1.0,fl);
          float yp=(-R_V*uVLenFactor)*cos(tu),m=pow(smoothstep(FLARE_HEIGHT,0.0,yp),FLARE_EXP),wx=1.0+FLARE_AMOUNT*m;
          vec2 sig=vec2(wx,1.0),p=vec2(0.0,yp);
          float mask=step(0.0,yp);
          b+=wt*bsa(uvc,p,mask*env,sig);
      }
      float sPix=clamp(yPix/R_V,0.0,1.0),topA=pow(1.0-smoothstep(TOP_FADE_START,1.0,sPix),TOP_FADE_EXP);
      float L=a+b*topA;
      float w=vWisps(vec2(uvc.x,yPix),topA);
      float fog=0.0;
  #if FOG_ON
      vec2 fuv=uvc*uFogScale;
      float mAct=step(1.0,length(iMouse.xy)),nx=((iMouse.x-C.x)*invW)*mAct;
      float ax = abs(nx);
      float stMag = mix(ax, pow(ax, FOG_TILT_SHAPE), 0.35);
      float st = sign(nx) * stMag * uTiltScale;
      st = clamp(st, -FOG_TILT_MAX_X, FOG_TILT_MAX_X);
      vec2 dir=normalize(vec2(st,1.0));
      fuv+=uFogTime*uFogFallSpeed*dir;
      vec2 prp=vec2(-dir.y,dir.x);
      fuv+=prp*(0.08*sin(dot(uvc,prp)*0.08+uFogTime*0.9));
      float n=fbm2(fuv+vec2(fbm2(fuv+vec2(7.3,2.1)),fbm2(fuv+vec2(-3.7,5.9)))*0.6);
      n=pow(clamp(n,0.0,1.0),FOG_CONTRAST);
      float pixW = 1.0 / max(iResolution.y, 1.0);
  #ifdef GL_OES_standard_derivatives
      float wL = max(fwidth(L), pixW);
  #else
      float wL = pixW;
  #endif
      float m0=pow(smoothstep(FOG_BEAM_MIN - wL, FOG_BEAM_MAX + wL, L),FOG_MASK_GAMMA);
      float bm=1.0-pow(1.0-m0,FOG_EXPAND_SHAPE); bm=mix(bm*m0,bm,FOG_EDGE_MIX);
      float yP=1.0-smoothstep(HFOG_Y_RADIUS,HFOG_Y_RADIUS+HFOG_Y_SOFT,abs(yPix));
      float nxF=abs((frag.x-C.x)*invW),hE=1.0-smoothstep(HFOG_EDGE_START,HFOG_EDGE_END,nxF); hE=pow(clamp(hE,0.0,1.0),HFOG_EDGE_GAMMA);
      float hW=mix(1.0,hE,clamp(yP,0.0,1.0));
      float bBias=mix(1.0,1.0-sPix,FOG_BOTTOM_BIAS);
      float browserFogIntensity = uFogIntensity;
      browserFogIntensity *= 1.8;
      float radialFade = 1.0 - smoothstep(0.0, 0.7, length(uvc) / 120.0);
      float safariFog = n * browserFogIntensity * bBias * bm * hW * radialFade;
      fog = safariFog;
  #endif
      float LF=L+fog;
      float dith=(h21(frag)-0.5)*(DITHER_STRENGTH/255.0);
      float tone=g(LF+w);
      vec3 col=tone*uColor+dith;
      float alpha=clamp(g(L+w*0.6)+dith*0.6,0.0,1.0);
      float nxE=abs((frag.x-C.x)*invW),xF=pow(clamp(1.0-smoothstep(EDGE_X0,EDGE_X1,nxE),0.0,1.0),EDGE_X_GAMMA);
      float scene=LF+max(0.0,w)*0.5,hi=smoothstep(EDGE_LUMA_T0,EDGE_LUMA_T1,scene);
      float eM=mix(xF,1.0,hi);
      col*=eM; alpha*=eM;
      col*=uFade; alpha*=uFade;
      fc=vec4(col,alpha);
  }

  void main(){
    vec4 fc;
    mainImage(fc, gl_FragCoord.xy);
    gl_FragColor = fc;
  }
  `;

    const mountRef = useRef(null);
    const rendererRef = useRef(null);
    const uniformsRef = useRef(null);
    const hasFadedRef = useRef(false);
    const rectRef = useRef(null);
    const baseDprRef = useRef(1);
    const currentDprRef = useRef(1);
    const lastSizeRef = useRef({ width: 0, height: 0, dpr: 0 });
    const fpsSamplesRef = useRef([]);
    const lastFpsCheckRef = useRef(performance.now());
    const emaDtRef = useRef(16.7);
    const pausedRef = useRef(false);
    const inViewRef = useRef(true);

    const hexToRGB = (hex) => {
        let c = hex.trim();
        if (c[0] === "#") c = c.slice(1);
        if (c.length === 3)
            c = c
                .split("")
                .map((x) => x + x)
                .join("");
        const n = parseInt(c, 16) || 0xffffff;
        return {
            r: ((n >> 16) & 255) / 255,
            g: ((n >> 8) & 255) / 255,
            b: (n & 255) / 255,
        };
    };

    useEffect(() => {
        const mount = mountRef.current;

        // Add try-catch for WebGL Context Creation
        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({
                antialias: false,
                alpha: true,
                depth: false,
                stencil: false,
                powerPreference: "high-performance",
                premultipliedAlpha: false,
                preserveDrawingBuffer: false,
                failIfMajorPerformanceCaveat: false,
                logarithmicDepthBuffer: false,
            });
        } catch (e) {
            console.error("Failed to create WebGLRenderer", e);
            return;
        }

        rendererRef.current = renderer;

        baseDprRef.current = Math.min(dpr ?? (window.devicePixelRatio || 1), 2);
        currentDprRef.current = baseDprRef.current;

        renderer.setPixelRatio(currentDprRef.current);
        renderer.shadowMap.enabled = false;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.setClearColor(0x000000, 0); // Transparent black

        const canvas = renderer.domElement;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.display = "block";
        mount.appendChild(canvas);

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]),
                3
            )
        );

        const uniforms = {
            iTime: { value: 0 },
            iResolution: { value: new THREE.Vector3(1, 1, 1) },
            iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
            uWispDensity: { value: wispDensity },
            uTiltScale: { value: mouseTiltStrength },
            uFlowTime: { value: 0 },
            uFogTime: { value: 0 },
            uBeamXFrac: { value: horizontalBeamOffset },
            uBeamYFrac: { value: verticalBeamOffset },
            uFlowSpeed: { value: flowSpeed },
            uVLenFactor: { value: verticalSizing },
            uHLenFactor: { value: horizontalSizing },
            uFogIntensity: { value: fogIntensity },
            uFogScale: { value: fogScale },
            uWSpeed: { value: wispSpeed },
            uWIntensity: { value: wispIntensity },
            uFlowStrength: { value: flowStrength },
            uDecay: { value: decay },
            uFalloffStart: { value: falloffStart },
            uFogFallSpeed: { value: fogFallSpeed },
            uColor: { value: new THREE.Vector3(1, 1, 1) },
            uFade: { value: hasFadedRef.current ? 1 : 0 }, // Initialize to 0 so it fades in
        };
        uniformsRef.current = uniforms;

        const material = new THREE.RawShaderMaterial({
            vertexShader: VERT,
            fragmentShader: FRAG,
            uniforms,
            transparent: true, // IMPORTANT
            depthTest: false,
            depthWrite: false,
            blending: THREE.NormalBlending,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.frustumCulled = false;
        scene.add(mesh);

        const clock = new THREE.Clock();
        let prevTime = 0;
        let fade = hasFadedRef.current ? 1 : 0;

        const mouseTarget = new THREE.Vector2(0, 0);
        const mouseSmooth = new THREE.Vector2(0, 0);

        const setSizeNow = () => {
            const w = mount.clientWidth || 1;
            const h = mount.clientHeight || 1;
            const pr = currentDprRef.current;

            const last = lastSizeRef.current;
            const sizeChanged =
                Math.abs(w - last.width) > 0.5 || Math.abs(h - last.height) > 0.5;
            const dprChanged = Math.abs(pr - last.dpr) > 0.01;
            if (!sizeChanged && !dprChanged) {
                return;
            }

            lastSizeRef.current = { width: w, height: h, dpr: pr };
            renderer.setPixelRatio(pr);
            renderer.setSize(w, h, false);
            uniforms.iResolution.value.set(w * pr, h * pr, pr);
            rectRef.current = canvas.getBoundingClientRect();

            if (!pausedRef.current) {
                renderer.render(scene, camera);
            }
        };

        let resizeRaf = 0;
        const scheduleResize = () => {
            if (resizeRaf) cancelAnimationFrame(resizeRaf);
            resizeRaf = requestAnimationFrame(setSizeNow);
        };

        setSizeNow();
        const ro = new ResizeObserver(scheduleResize);
        ro.observe(mount);

        const io = new IntersectionObserver(
            (entries) => {
                inViewRef.current = entries[0]?.isIntersecting ?? true;
            },
            { root: null, threshold: 0 }
        );
        io.observe(mount);

        const onVis = () => {
            pausedRef.current = document.hidden;
        };
        document.addEventListener("visibilitychange", onVis, { passive: true });

        const updateMouse = (clientX, clientY) => {
            const rect = rectRef.current;
            if (!rect) return;
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            const ratio = currentDprRef.current;
            const hb = rect.height * ratio;
            mouseTarget.set(x * ratio, hb - y * ratio);
        };
        const onMove = (ev) => updateMouse(ev.clientX, ev.clientY);
        const onLeave = () => mouseTarget.set(0, 0);
        canvas.addEventListener("pointermove", onMove, { passive: true });
        canvas.addEventListener("pointerdown", onMove, { passive: true });
        canvas.addEventListener("pointerenter", onMove, { passive: true });
        canvas.addEventListener("pointerleave", onLeave, { passive: true });

        const onCtxLost = (e) => {
            e.preventDefault();
            pausedRef.current = true;
        };
        const onCtxRestored = () => {
            pausedRef.current = false;
            scheduleResize();
        };
        canvas.addEventListener("webglcontextlost", onCtxLost, false);
        canvas.addEventListener("webglcontextrestored", onCtxRestored, false);

        let raf = 0;

        const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
        const dprFloor = 0.6;
        const lowerThresh = 50;
        const upperThresh = 58;
        let lastDprChangeRef = 0;
        const dprChangeCooldown = 2000;

        const adjustDprIfNeeded = (now) => {
            const elapsed = now - lastFpsCheckRef.current;
            if (elapsed < 750) return;

            const samples = fpsSamplesRef.current;
            if (samples.length === 0) {
                lastFpsCheckRef.current = now;
                return;
            }
            const avgFps = samples.reduce((a, b) => a + b, 0) / samples.length;

            let next = currentDprRef.current;
            const base = baseDprRef.current;

            if (avgFps < lowerThresh) {
                next = clamp(currentDprRef.current * 0.85, dprFloor, base);
            } else if (avgFps > upperThresh && currentDprRef.current < base) {
                next = clamp(currentDprRef.current * 1.1, dprFloor, base);
            }

            if (
                Math.abs(next - currentDprRef.current) > 0.01 &&
                now - lastDprChangeRef > dprChangeCooldown
            ) {
                currentDprRef.current = next;
                lastDprChangeRef = now;
                setSizeNow();
            }

            fpsSamplesRef.current = [];
            lastFpsCheckRef.current = now;
        };

        const animate = () => {
            raf = requestAnimationFrame(animate);
            if (pausedRef.current || !inViewRef.current) return;

            const t = clock.getElapsedTime();
            const dt = Math.max(0, t - prevTime);
            prevTime = t;

            const dtMs = dt * 1000;
            emaDtRef.current = emaDtRef.current * 0.9 + dtMs * 0.1;
            const instFps = 1000 / Math.max(1, emaDtRef.current);
            fpsSamplesRef.current.push(instFps);

            uniforms.iTime.value = t;

            const cdt = Math.min(0.033, Math.max(0.001, dt));
            uniforms.uFlowTime.value += cdt;
            uniforms.uFogTime.value += cdt;

            if (!hasFadedRef.current) {
                const fadeDur = 1.0;
                fade = Math.min(1, fade + cdt / fadeDur);
                uniforms.uFade.value = fade;
                if (fade >= 1) hasFadedRef.current = true;
            }

            const tau = Math.max(1e-3, mouseSmoothTime);
            const alpha = 1 - Math.exp(-cdt / tau);
            mouseSmooth.lerp(mouseTarget, alpha);
            uniforms.iMouse.value.set(mouseSmooth.x, mouseSmooth.y, 0, 0);

            renderer.render(scene, camera);

            adjustDprIfNeeded(performance.now());
        };

        animate();

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            io.disconnect();
            document.removeEventListener("visibilitychange", onVis);
            canvas.removeEventListener("pointermove", onMove);
            canvas.removeEventListener("pointerdown", onMove);
            canvas.removeEventListener("pointerenter", onMove);
            canvas.removeEventListener("pointerleave", onLeave);
            canvas.removeEventListener("webglcontextlost", onCtxLost);
            canvas.removeEventListener("webglcontextrestored", onCtxRestored);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
            if (mount.contains(canvas)) mount.removeChild(canvas);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dpr]);

    useEffect(() => {
        const uniforms = uniformsRef.current;
        if (!uniforms) return;

        uniforms.uWispDensity.value = wispDensity;
        uniforms.uTiltScale.value = mouseTiltStrength;
        uniforms.uBeamXFrac.value = horizontalBeamOffset;
        uniforms.uBeamYFrac.value = verticalBeamOffset;
        uniforms.uFlowSpeed.value = flowSpeed;
        uniforms.uVLenFactor.value = verticalSizing;
        uniforms.uHLenFactor.value = horizontalSizing;
        uniforms.uFogIntensity.value = fogIntensity;
        uniforms.uFogScale.value = fogScale;
        uniforms.uWSpeed.value = wispSpeed;
        uniforms.uWIntensity.value = wispIntensity;
        uniforms.uFlowStrength.value = flowStrength;
        uniforms.uDecay.value = decay;
        uniforms.uFalloffStart.value = falloffStart;
        uniforms.uFogFallSpeed.value = fogFallSpeed;

        const { r, g, b } = hexToRGB(color || "#FFFFFF");
        uniforms.uColor.value.set(r, g, b);
    }, [
        wispDensity,
        mouseTiltStrength,
        horizontalBeamOffset,
        verticalBeamOffset,
        flowSpeed,
        verticalSizing,
        horizontalSizing,
        fogIntensity,
        fogScale,
        wispSpeed,
        wispIntensity,
        flowStrength,
        decay,
        falloffStart,
        fogFallSpeed,
        color,
    ]);

    return (
        <div
            ref={mountRef}
            className={`w-full h-full relative overflow-hidden ${className}`}
            style={{ background: "none", ...style }}
        />
    );
};

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

const TiltCard = ({ children, className = "" }) => {
    // Stores the current 3D transform state (perspective + rotation + scale)
    const [transform, setTransform] = useState("");
    // Dynamic shadow that changes based on mouse position relative to card
    const [shadow, setShadow] = useState("");

    /**
     * handleMouseMove - Updates 3D perspective and shadow based on cursor position
     * Calculates rotation angles for tilt effect with maximum 10 degree rotation
     * Creates directional shadow that points away from cursor
     */
    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation angles based on mouse position relative to card center
        // Max rotation is 10 degrees from horizontal/vertical axis
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        // Apply 3D transformation with slight scale increase for emphasis
        setTransform(
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
        );
        // Create shadow that responds to rotation direction
        setShadow(`
      ${-rotateY * 2}px ${rotateX * 2}px 30px rgba(34, 197, 94, 0.2), 
      0 0 0 1px rgba(34, 197, 94, 0.3)
    `);
    };

    // Reset card state when mouse leaves the element
    const handleMouseLeave = () => {
        setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)");
        setShadow("none");
    };

    return (
        <div
            className={`transition-all duration-200 ease-out ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform, boxShadow: shadow }}
        >
            {children}
        </div>
    );
};

/**
 * CustomCursor Component
 * Renders a custom animated cursor that expands/contracts on interactive elements
 * Tracks mouse movement for smooth cursor following effect using GPU-accelerated translate3d
 * Hides native cursor and replaces it with custom animated elements
 */
const CustomCursor = () => {
    const cursorRef = useRef(null);
    const innerRef = useRef(null);

    // Set up mouse movement tracking and interactive element detection
    useEffect(() => {
        const cursor = cursorRef.current;
        const inner = innerRef.current;

        // Track mouse movement and update cursor position
        const moveCursor = (e) => {
            // Use translate3d for GPU acceleration with no delay
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

            // Detect if hovering over interactive elements (buttons, links, etc.)
            const target = e.target;
            if (
                target.tagName.toLowerCase() === "button" ||
                target.tagName.toLowerCase() === "a" ||
                target.closest(".interactive-hover")
            ) {
                // Expand and highlight cursor over interactive elements
                inner.classList.add(
                    "scale-150",
                    "bg-green-500/30",
                    "border-transparent"
                );
                inner.classList.remove("border-green-500");
            } else {
                // Reset cursor to normal state
                inner.classList.remove(
                    "scale-150",
                    "bg-green-500/30",
                    "border-transparent"
                );
                inner.classList.add("border-green-500");
            }
        };

        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
            style={{ transform: "translate3d(0,0,0)" }}
        >
            <div
                ref={innerRef}
                className="w-8 h-8 rounded-full border-2 border-green-500 transition-transform duration-150 -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
            />
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
        <div className="min-h-screen  bg-black text-slate-100 font-sans selection:bg-green-500 selection:text-black overflow-x-hidden cursor-none">
            <CustomCursor />

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
                    <div className="z-40 w-full flex items-center justify-end px-8 ">

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
