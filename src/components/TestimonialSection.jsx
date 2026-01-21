
import {  Quote } from 'lucide-react';
import { FuzzyText  } from './Portfolio';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Manya Aggarwal",
    role: "SRE1 @ PhonePe | Ex-DevOps Intern @ Groww",
    content:
      "Aditya is a passionate developer with an exceptional ability to learn fast.\nHe consistently delivers clean, scalable solutions using modern frameworks.\nA reliable teammate who brings clarity and maturity to every project.",
    image: "person.svg",
    rating: 5,
    theme: "blue"
  },
  {
    id: 2,
    name: "Manav Khandurie",
    role: "Associate @ ZS | Full-Stack & Cloud Developer",
    content:
      "Aditya is one of the finest full-stack developers I’ve worked with.\nHis leadership and technical depth drove our hackathon finalist projects.\nHe combines strong problem-solving with real DevOps and cloud expertise.",
    image: "person.svg",
    rating: 5,
    theme: "pink"
  },
  {
    id: 3,
    name: "Rahul Singh Nagesh",
    role: "DevOps Engineer",
    content:
      "Aditya stands out for his frontend expertise and UI/UX mindset.\nHe also brings solid cloud knowledge that strengthens any engineering team.\nDedicated, collaborative, and driven to deliver high-quality solutions.",
    image: "person.svg",
    rating: 5,
    theme: "yellow"
  }
];


// Double the array to ensure seamless looping
const MARQUEE_ITEMS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

const THEME_COLORS = {
  blue: {
    border: "group-hover:border-sky-500/50",
    glow: "group-hover:shadow-[0_0_30px_-5px_rgba(14,165,233,0.3)]",
    text: "text-sky-400",
    bg: "bg-sky-500/10"
  },
  pink: {
    border: "group-hover:border-rose-500/50",
    glow: "group-hover:shadow-[0_0_30px_-5px_rgba(225,29,72,0.3)]",
    text: "text-rose-400",
    bg: "bg-rose-500/10"
  },
  yellow: {
    border: "group-hover:border-yellow-500/50",
    glow: "group-hover:shadow-[0_0_30px_-5px_rgba(234,179,8,0.3)]",
    text: "text-yellow-400",
    bg: "bg-yellow-500/10"
  }
};

export default function TestimonialSection() {
  return (
    <div className=" text-white font-sans overflow-hidden relative selection:bg-[121212]">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]"></div>
      </div>

      {/* CSS for the marquee animation */}
      <style>{`
        @keyframes marquee-right {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }
        .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">SYSTEM_FEEDBACK_LOGS</span>
          </div>
        

          <FuzzyText
            fontSize="clamp(2rem, 5vw, 4rem)"
                                              fontWeight={1000}
                                              gradient={"ffffff"}
                                              baseIntensity={0.3}
                                              hoverIntensity={0.8}
                                              fuzzRange={16}
                                              glitchMode={true}
                                              glitchInterval={3000}
                                          >
            Trusted by Visionaries
                                          </FuzzyText>
          <p className="text-white/50 pt-2 w-full text-sm leading-relaxed">
            We collaborate with ambitious brands to build digital products that leave a lasting impact.
          </p>
        </div>
      </div>

      {/* Marquee Container with Gradient Masks */}
      <div className="relative w-full z-10">
        
        {/* Left Gradient Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
        
        {/* Right Gradient Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

        {/* Moving Track */}
        <div className="flex w-fit animate-marquee-right hover:cursor-grab active:cursor-grabbing">
          {MARQUEE_ITEMS.map((item, idx) => {
            const theme = THEME_COLORS[item.theme];
            
            return (
              <div 
                key={`${item.id}-${idx}`} 
                className="w-[400px] md:w-[500px] flex-shrink-0 px-4 group"
              >
                <div className={`
                  h-full bg-[#0f0f10] relative border border-white/20 rounded-xl p-8 pt-10 
                  transition-all duration-500 ease-out
                  ${theme.border} ${theme.glow}
                  hover:-translate-y-1
                `}>
                  
                  {/* Pixel Corners */}
                  <div className={`absolute top-0 rounded-tl-xl left-0 w-2 h-2 border-t-2 border-l-2 border-green-400 transition-colors duration-300 ${theme.text.replace('text', 'border')}`} />
                  <div className={`absolute top-0 rounded-tr-xl right-0 w-2 h-2 border-t-2 border-r-2 border-green-400 transition-colors duration-300 ${theme.text.replace('text', 'border')}`} />
                  <div className={`absolute bottom-0 rounded-bl-xl left-0 w-2 h-2 border-b-2 border-l-2 border-green-400 transition-colors duration-300 ${theme.text.replace('text', 'border')}`} />
                  <div className={`absolute bottom-0 rounded-br-xl right-0 w-2 h-2 border-b-2 border-r-2 border-green-400 transition-colors duration-300 ${theme.text.replace('text', 'border')}`} />

                  {/* Header: User & Rating */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12">
                        <div className={`absolute inset-0 rounded-full blur bg-white/10`}></div>
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full p-2 object-cover rounded-full border border-zinc-700 relative z-10"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg leading-none mb-1">
                          {item.name}
                        </h4>
                        <p className={`text-xs font-mono uppercase tracking-wider opacity-70 ${theme.text}`}>
                          {item.role}
                        </p>
                       
                      </div>
                    </div>
                    
                    
                  </div>

                  {/* Quote Icon */}
                  <div className="absolute top-8 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Quote className="w-12 h-12 text-white" />
                  </div>

                  {/* Content */}
                  <p className="text-zinc-400 text-sm leading-relaxed relative z-10 group-hover:text-zinc-200 transition-colors duration-300">
                    "{item.content}"
                  </p>

                 
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}