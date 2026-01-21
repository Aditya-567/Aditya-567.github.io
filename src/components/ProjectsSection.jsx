import React, { useState } from 'react';
import { ExternalLink, Github, Code2, Cpu, Home, X, Maximize2, Minimize2 } from 'lucide-react';

import { FuzzyText } from "./Portfolio";

const ProjectsSection = () => {
    // 1. Define Skills with Icons
    const skills = [
        { name: "AWS", icon: "amazonaws", color: "#FF9900" },
        { name: "Angular", icon: "angular", color: "#DD0031" },
        { name: "TypeScript", icon: "typescript", color: "#3178C6" },
        { name: "React", icon: "react", color: "#61DAFB" },
        { name: "JavaScript", icon: "javascript", color: "#F7DF1E" },
        { name: "HTML", icon: "html5", color: "#E34F26" },
        { name: "CSS", icon: "css3", color: "#1572B6" },
        { name: "Git", icon: "git", color: "#F05032" },
        { name: "Docker", icon: "docker", color: "#2496ED" },
        { name: "MongoDB", icon: "mongodb", color: "#47A248" },
        { name: "Node.js", icon: "nodedotjs", color: "#339933" },
        { name: "Express", icon: "express", color: "#ffffff" },
        { name: "Tailwind", icon: "tailwindcss", color: "#06B6D4" },
        { name: "C", icon: "c", color: "#A8B9CC" },
        { name: "C++", icon: "cplusplus", color: "#00599C" },
        { name: "Python", icon: "python", color: "#3776AB" },
        { name: "Next.js", icon: "nextdotjs", color: "#FFFFFF" },
        { name: "Cloudinary", icon: "cloudinary", color: "#3448C5" },
        { name: "Judge0", icon: "json", color: "#000000" },
        { name: "Firebase", icon: "firebase", color: "#FFCA28" },
        { name: "HTML", icon: "html5", color: "#E34F26" },
        { name: "CSS", icon: "css3", color: "#1572B6" },
        { name: "Git", icon: "git", color: "#F05032" },
    ];

    const technologies = skills.map((s) => ({
        name: s.name,
        color: s.color,
        icon: `https://cdn.simpleicons.org/${s.icon}/${s.color.replace("#", "")}`,
    }));

    const getTech = (name) => technologies.find(t => t.name === name);

    // Real Data
    const projects = [
        {
            id: 'p1',
            number: '01',
            title: 'CodeOnce',
            category: 'Frontend Arch',
            date: 'Feb 2025 - Aug 2025',
            description: 'Led the development of two major frontend modules: User Management and Report Management. Collaborated closely with cross-functional teams to ensure seamless integration with backend services.',
            techStack: ['Angular', 'Judge0', 'Tailwind'],
            image: '/api/placeholder/800/600',
            demoLink: '#',
            repoLink: '#',
        },
        {
            id: 'p2',
            number: '02',
            title: 'RAM API LIMITER',
            category: 'Cloud Engineering',
            date: 'April 2024',
            description: 'Developed a serverless architecture using AWS Lambda to authenticate requests and enforce rate limits via DynamoDB. Implemented three distinct rate-limiting algorithms.',
            techStack: ['React', 'Python', 'AWS'],
            image: '/api/placeholder/800/600',
            demoLink: '#',
            repoLink: '#',
        },
        {
            id: 'p3',
            number: '03',
            title: 'WebSleuth',
            category: 'Web Scraping',
            date: 'Feb 2024 - April 2024',
            description: 'Engineered a price tracking platform for online shopping with real-time notifications. Automated product data extraction via custom web scraping scripts and developed an email alert system.',
            techStack: ['React', 'Next.js', 'MongoDB'],
            image: '/api/placeholder/800/600',
            demoLink: '#',
            repoLink: '#',
        },
        {
            id: 'p4',
            number: '04',
            title: 'Text Behind Image',
            category: 'Creative Tool',
            date: 'Jan 2026 - Present',
            description: 'An Angular application creating depth effects by layering customizable text between a subject and its background. Leverages Cloudinary for AI background removal and stylized effects.',
            techStack: ['Angular', 'Tailwind', 'Cloudinary','HTML','CSS'],
            image: '/api/placeholder/800/600',
            demoLink: '#',
            repoLink: '#',
        },
        {
            id: 'p5',
            number: '05',
            title: 'Coming Soon',
            category: 'Managing Tool',
            date: 'Jan 2026 - Present',
            techStack: ['Angular', 'Tailwind', 'Cloudinary'],
            image: '/api/placeholder/800/600',
            demoLink: '#',
            repoLink: '#',
        }
    ];

    const [selectedId, setSelectedId] = useState(null);

    return (
        <section className="min-h-screen text-white selection:bg-[#00ff41] selection:text-black relative overflow-hidden ">


            {/* HEADER SECTION */}
            <div className="max-w-7xl px-12  mx-auto mb-12 relative transition-all duration-500">
                <div className="flex items-center gap-4 text-xs md:text-sm text-gray-500 mb-6 font-mono tracking-wider pt-8 px-4">
                    <a href="#" className="flex items-center gap-1 hover:text-[#00ff41] transition-colors group">
                        <Home size={14} />
                        <span className="group-hover:underline">root</span>
                    </a>
                    <span>/</span>
                    <span className="hover:text-white cursor-pointer transition-colors">system</span>
                    <span>/</span>
                    <span className="text-[#00ff41]">projects</span>
                    <span className="ml-auto opacity-50 hidden md:block">v2.4.0-stable</span>
                </div>

                <div className="relative z-10 px-4">
                    
                    <FuzzyText
                        fontSize="clamp(2rem, 5vw, 4rem)"
                        fontWeight={1000}
                        color="#ffffff"
                        className="absolute -top-16 -left-12"
                    >Mission Logs
                    </FuzzyText>
                    <div className="h-1 w-24 bg-[#00ff41] mt-16 md:mt-20 shadow-[0_0_10px_#00ff41]"></div>
                </div>
            </div>

            {/* --- EXPANDING GRID VIEW --- */}
            <div className="max-w-7xl px-16 mx-auto ">
                {/* Changed justify-center to default (flex-start) so the last item aligns left */}
                <div className="flex flex-wrap gap-4 md:gap-6">
                    {projects.map((project, idx) => {
                        const isSelected = selectedId === project.id;

                        return (
                            <div
                                key={project.id}
                                onClick={() => setSelectedId(isSelected ? null : project.id)}
                                style={{
                                    transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1.0)',
                                }}
                                className={`
                                    relative bg-[#121212] border rounded-xl overflow-hidden cursor-pointer group
                                    ${isSelected
                                        ? 'w-full md:w-[650px] h-[420px] border-white/20 z-20 order-first md:order-none'
                                        : 'w-full md:w-[calc(50%-16px)] lg:w-[calc(33.33%-24px)] h-[200px] border-gray-800 hover:border-green-400/50 hover:shadow-[0_0_15px_rgba(0,255,65,0.1)] grayscale hover:grayscale-0'
                                    }
                                `}
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                    style={{
                                        backgroundImage: `url(${project.image})`,
                                        opacity: isSelected ? 0.3 : 0.6
                                    }}
                                ></div>

                                {/* Shared Overlays bg */}
                                <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/100 to-transparent transition-opacity duration-500 ${isSelected ? 'opacity-90' : 'opacity-80'}`}></div>
                                {isSelected && <div className="absolute inset-0 bg-green-400/5 pointer-events-none"></div>}

                                {/* --- COMPACT VIEW CONTENT --- */}
                                <div className={`absolute inset-0 p-6 flex flex-col justify-end transition-opacity duration-300 ${isSelected ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                                    <span className="absolute top-4 right-6 text-6xl font-bold text-white/5 group-hover:text-white/20 transition-colors">
                                        {project.number}
                                    </span>
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="flex items-center gap-2  border border-white/20 w-fit px-2 rounded-lg mb-12 ">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                                            <span className="text-white/50 text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-lg ">
                                                 {project.category}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-extrabold text-white/80 mb-2 group-hover:text-green-400 transition-colors">

                                            <FuzzyText
                                                fontSize="clamp(2rem, 3vw, 2rem)"
                                                fontWeight={1000}
                                                gradient={["#4ade80", "#059669"]}
                                                baseIntensity={0.3}
                                                hoverIntensity={0.8}
                                                fuzzRange={8}
                                                glitchMode={true}
                                                glitchInterval={3000}
                                                className="absolute top-9 -left-10"
                                            >
                                                {project.title}
                                            </FuzzyText>
                                        </h3>
                                        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                                            {project.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-green-400 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                            <Maximize2 size={14} />
                                            Expand
                                        </div>
                                    </div>
                                </div>

                                {/* --- EXPANDED VIEW CONTENT (700px x 450px) --- */}
                                <div className={`absolute inset-0 flex flex-col p-8 transition-all duration-500 delay-100 ${isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>

                                    {/* Close Icon */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                        className="absolute top-4 right-4 text-gray-500 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors z-30"
                                    >
                                        <Minimize2 size={24} />
                                    </button>

                                    {/* Big Background Number */}
                                    <div className="absolute top-0 right-0 text-[120px] font-bold text-white/10 leading-none select-none pointer-events-none">
                                        {project.number}
                                    </div>

                                    {/* Top Info */}
                                    <div className="relative z-10 space-y-4 mt-2">
                                        <div className="flex items-center gap-3 pb-16">
                                            <span className="px-2 py-1 bg-[#00ff41] text-black text-[10px] font-bold uppercase rounded-sm tracking-wider">
                                                {project.category}
                                            </span>
                                            <div className="h-px w-12 bg-[#00ff41]/50"></div>
                                            <span className="text-[#00ff41] text-xs font-mono">{project.date}</span>
                                        </div>

                                        
                                        <FuzzyText
                                            fontSize="clamp(2rem, 3vw, 4rem)"
                                            fontWeight={1000}
                                            gradient={"#ffffff"}
                                            baseIntensity={0.3}
                                            hoverIntensity={0.8}
                                            fuzzRange={8}
                                            glitchMode={true}
                                            glitchInterval={3000}
                                            className="absolute top-9 -left-10"
                                        >
                                            {project.title}
                                        </FuzzyText>

                                        <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-[#00ff41] pl-4 max-w-[80%] line-clamp-3">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Middle: Tech & Monitor */}
                                    <div className="flex-1 flex items-end justify-between gap-4 pb-4 mt-auto">

                                        {/* Tech Stack */}
                                        <div className="flex-1">
                                            <h4 className="text-gray-500 text-[10px] uppercase tracking-widest mb-2">Technologies_</h4>
                                            <div className="flex flex-wrap gap-1.5">
                                                {project.techStack.map((techName, idx) => {
                                                    const tech = getTech(techName);
                                                    return (
                                                        <div key={idx} className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full hover:border-[#00ff41]/50 transition-colors">
                                                            {tech ? (
                                                                <img src={tech.icon} alt={tech.name} className="w-7 h-10 object-contain" />
                                                            ) : (
                                                                <Code2 size={20} className="text-gray-400" />
                                                            )}
                                                          
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Monitor Preview */}
                                        <div className="hidden sm:block w-[180px] h-[110px] relative shrink-0 perspective-1000 group/monitor">
                                            <div className="absolute inset-0 bg-black border border-gray-700 rounded p-1 shadow-lg transform rotate-y-[-5deg] group-hover/monitor:rotate-y-0 transition-transform duration-500">
                                                <div className="w-full h-full relative overflow-hidden bg-gray-900">
                                                    <img src={project.image} alt="Preview" className="w-full h-full object-cover opacity-80" />
                                                    <div className="absolute top-1 left-1 text-[8px] text-[#00ff41] bg-black/50 px-1 rounded">LIVE_FEED</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Actions */}
                                    <div className="pt-4 border-t border-gray-800 flex gap-3">
                                        <a href={project.demoLink} onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 bg-[#ef4444] hover:bg-[#dc2626] text-white px-5 py-2 rounded text-xs font-bold uppercase tracking-wider shadow-lg transition-transform active:scale-95">
                                            <ExternalLink size={14} />
                                            Launch Demo
                                        </a>
                                        
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;