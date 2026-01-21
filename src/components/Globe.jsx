import { Home, Send, Shield } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import emailjs from "@emailjs/browser"; // --- UNCOMMENT THIS IN YOUR LOCAL PROJECT ---
import { FuzzyText } from "./Portfolio";

// --- 3D Globe Component ---
const GlobeScene = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // 1. Scene Setup
        const scene = new THREE.Scene();
        // Pure black background for portfolio
        scene.fog = new THREE.FogExp2(0x000000, 0.03);

        const camera = new THREE.PerspectiveCamera(45, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
        camera.position.z = 7.5;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        // 2. Objects Group
        const mainGroup = new THREE.Group();
        scene.add(mainGroup);

        // -- A. The Black Hole Core (Occlusion) --
        const coreGeo = new THREE.SphereGeometry(1.98, 64, 64);
        const coreMat = new THREE.MeshBasicMaterial({
            color: 0x020217,
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        mainGroup.add(core);

        // -- B. The "Ocean" (Dotted Map) --
        const maxParticles = 25000;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(maxParticles * 3);
        const pSizes = new Float32Array(maxParticles);

        for (let i = 0; i < maxParticles; i++) {
            pPos[i * 3] = 0; pPos[i * 3 + 1] = 0; pPos[i * 3 + 2] = 0;
            pSizes[i] = 0;
        }

        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        pGeo.setAttribute('size', new THREE.BufferAttribute(pSizes, 1));

        // GREEN Data Points
        const pMat = new THREE.PointsMaterial({
            size: 0.035,
            color: 0x4ade80, // Green-400
            transparent: true,
            opacity: 1,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true,
        });
        const landPoints = new THREE.Points(pGeo, pMat);
        mainGroup.add(landPoints);

        // --- EARTH TEXTURE LOADING ---
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg';

        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            const newPos = new Float32Array(maxParticles * 3);
            const newSizes = new Float32Array(maxParticles);

            let particleIndex = 0;
            let attempts = 0;
            const maxAttempts = 300000;

            while (particleIndex < maxParticles && attempts < maxAttempts) {
                attempts++;
                const u = Math.random();
                const v = Math.random();
                const theta_s = 2 * Math.PI * u;
                const phi_s = Math.acos(2 * v - 1);

                const r = 2.02;
                const x = r * Math.sin(phi_s) * Math.cos(theta_s);
                const y = r * Math.sin(phi_s) * Math.sin(theta_s);
                const z = r * Math.cos(phi_s);

                const lat = Math.asin(y / r);
                const lon = Math.atan2(x, z);
                const mapU = (lon / (2 * Math.PI)) + 0.5;
                const mapV = (lat / Math.PI) + 0.5;

                const px = Math.floor(mapU * canvas.width);
                const py = Math.floor((1 - mapV) * canvas.height);
                const index = (py * canvas.width + px) * 4;
                const red = imgData.data[index];

                // Ocean (dark pixels) gets dots
                if (red < 50) {
                    newPos[particleIndex * 3] = x;
                    newPos[particleIndex * 3 + 1] = y;
                    newPos[particleIndex * 3 + 2] = z;
                    newSizes[particleIndex] = Math.random() > 0.8 ? 0.05 : 0.03;
                    particleIndex++;
                }
            }

            landPoints.geometry.setAttribute('position', new THREE.BufferAttribute(newPos, 3));
            landPoints.geometry.setAttribute('size', new THREE.BufferAttribute(newSizes, 1));
            landPoints.geometry.attributes.position.needsUpdate = true;
            landPoints.geometry.attributes.size.needsUpdate = true;
        };

        // Fallback Noise
        img.onerror = () => {
            const noisePos = new Float32Array(maxParticles * 3);
            const noiseSizes = new Float32Array(maxParticles);
            for (let i = 0; i < maxParticles; i++) {
                const phi = Math.acos(-1 + (2 * i) / maxParticles);
                const theta = Math.sqrt(maxParticles * Math.PI) * phi;
                const r = 2.02;
                let x = r * Math.cos(theta) * Math.sin(phi);
                let y = r * Math.sin(theta) * Math.sin(phi);
                let z = r * Math.cos(phi);
                const noise = Math.sin(x * 5) + Math.cos(y * 5) + Math.sin(z * 5);
                if (noise <= 0.5) {
                    noisePos[i * 3] = x; noisePos[i * 3 + 1] = y; noisePos[i * 3 + 2] = z;
                    noiseSizes[i] = 0.03;
                }
            }
            landPoints.geometry.setAttribute('position', new THREE.BufferAttribute(noisePos, 3));
            landPoints.geometry.setAttribute('size', new THREE.BufferAttribute(noiseSizes, 1));
            landPoints.geometry.attributes.position.needsUpdate = true;
            landPoints.geometry.attributes.size.needsUpdate = true;
        };

        // -- C. Atmosphere Glow --
        const atmosGeo = new THREE.SphereGeometry(2.3, 64, 64);
        const atmosMat = new THREE.MeshBasicMaterial({
            color: 0xffffff, // Green Atmosphere
            transparent: true,
            opacity: 0.05,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
        });
        const atmosphere = new THREE.Mesh(atmosGeo, atmosMat);
        scene.add(atmosphere);

        // -- D. Floating Particles --
        const floatCount = 150;
        const floatGeo = new THREE.BufferGeometry();
        const floatPos = new Float32Array(floatCount * 3);
        for (let i = 0; i < floatCount * 3; i++) {
            const r = 2.5 + Math.random() * 2;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            floatPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            floatPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            floatPos[i * 3 + 2] = r * Math.cos(phi);
        }
        floatGeo.setAttribute('position', new THREE.BufferAttribute(floatPos, 3));
        const floatMat = new THREE.PointsMaterial({
            size: 0.03,
            color: 0x4ade80, // Green particles
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending,
        });
        const floatParticles = new THREE.Points(floatGeo, floatMat);
        scene.add(floatParticles);

        // -- E. Orbiting Satellites with Trails (Atomic Style) --
        const orbitGroup = new THREE.Group();
        scene.add(orbitGroup);

        const orbits = [];
        const orbitCount = 4;

        for (let i = 0; i < orbitCount; i++) {
            const radius = 2.5;
            const speed = 0.015;
            const baseColor = new THREE.Color(0x4ade80);

            // 1. Trail Geometry (Arc segment)
            // We create an arc that starts negative relative to 0 so it looks like it's behind the satellite
            const trailLength = Math.PI; // Length of the tail
            const trailCurve = new THREE.EllipseCurve(
                0, 0,
                radius, radius,
                -trailLength, 0, // Arc from -Length to 0
                false,
                0
            );
            const trailPoints = trailCurve.getPoints(64);
            const trailGeo = new THREE.BufferGeometry().setFromPoints(trailPoints);

            // 2. Vertex Colors for Fading
            const colors = [];
            for (let j = 0; j < trailPoints.length; j++) {
                // j=0 is the tail tip (farthest back), j=length-1 is the head (at satellite)
                const alpha = Math.pow(j / (trailPoints.length - 1), 2); // Squared for smoother fade
                // Mix from Black (0,0,0) to Green
                colors.push(baseColor.r * alpha, baseColor.g * alpha, baseColor.b * alpha);
            }
            trailGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

            const trailMat = new THREE.LineBasicMaterial({
                vertexColors: true,
                transparent: true,
                opacity: 1.0,
                blending: THREE.AdditiveBlending
            });
            const trail = new THREE.Line(trailGeo, trailMat);

            // 3. Satellite (Sphere)
            const satGeo = new THREE.SphereGeometry(0.05, 16, 16);
            const satMat = new THREE.MeshBasicMaterial({ color: 0x4ade80 });
            const satellite = new THREE.Mesh(satGeo, satMat);

            // 4. Group Configuration
            const ringGroup = new THREE.Group();
            ringGroup.rotation.x = Math.PI / 3;
            ringGroup.rotation.y = i * (Math.PI / 1.5);

            // Add to ring group
            ringGroup.add(trail);
            ringGroup.add(satellite);

            orbitGroup.add(ringGroup);

            orbits.push({
                satellite: satellite,
                trail: trail,
                speed: speed,
                angle: Math.random() * Math.PI * 2,
                radius: radius
            });
        }

        // 3. Lighting
        const ambientLight = new THREE.AmbientLight(0x000000, 1); // Dark ambient
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0x4ade80, 1.5); // Green Light
        dirLight.position.set(5, 3, 5);
        scene.add(dirLight);

        // 4. Animation
        let animationId;
        let mouseX = 0;
        let mouseY = 0;

        const animate = () => {
            animationId = requestAnimationFrame(animate);
            const time = Date.now() * 0.0005;

            mainGroup.rotation.y += 0.002;
            floatParticles.rotation.y -= 0.0005;
            floatParticles.rotation.x = Math.sin(time * 0.5) * 0.1;

            // Update Satellites & Trails
            orbits.forEach(orbit => {
                orbit.angle += orbit.speed;

                // Move Satellite
                orbit.satellite.position.x = Math.cos(orbit.angle) * orbit.radius;
                orbit.satellite.position.y = Math.sin(orbit.angle) * orbit.radius;

                // Rotate Trail to follow satellite
                // The trail geometry ends at angle 0, so rotating the mesh to orbit.angle
                // aligns the head of the trail with the satellite.
                orbit.trail.rotation.z = orbit.angle;
            });

            const scale = 1 + Math.sin(time * 3) * 0.01;
            atmosphere.scale.set(scale, scale, scale);

            mainGroup.rotation.x += (mouseY * 0.3 - mainGroup.rotation.x) * 0.05;
            mainGroup.rotation.z += (mouseX * 0.3 - mainGroup.rotation.z) * 0.05;

            renderer.render(scene, camera);
        };

        animate();

        // 5. Events
        const handleResize = () => {
            if (!mountRef.current) return;
            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        const handleMouseMove = (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            coreGeo.dispose(); coreMat.dispose();
            pGeo.dispose(); pMat.dispose();
            atmosGeo.dispose(); atmosMat.dispose();
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="w-full h-full" />;
};

// --- UI Components ---

const ContactForm = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // --- EMAILJS INTEGRATION (Uncomment in local project) ---
        // 1. Run: npm install @emailjs/browser
        // 2. Uncomment the import at the top
        // 3. Uncomment this block and remove the setTimeout simulation below

        emailjs
          .send(
            'service_qv82lsc',
            'template_is51e9m',
            {
              from_name: formState.name,
              to_name: "Aditya Kumar",
              from_email: formState.email,
              to_email: "kaditya000567@gmail.com",
              message: formState.message,
            },
            '0-UsfOoUWzac9PnFs'
          )
          .then(
            () => {
              setIsSubmitting(false);
              setSuccess(true);
              setFormState({ name: '', email: '', message: '' });
              
              setTimeout(() => setSuccess(false), 5000);
            },
            (error) => {
              setIsSubmitting(false);
              console.error("EmailJS Error:", error);
              alert("Ahh, something went wrong. Please try again.");
            }
          );
    

        // --- SIMULATED SUBMISSION FOR PREVIEW ---
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(true);
            setFormState({ name: '', email: '', message: '' });
            setTimeout(() => setSuccess(false), 5000);
        }, 2000);
    };

    return (
        // Updated to Glassmorphism Style: bg-[#121212]/40, border-white/20
        <div className="w-full max-w-[550px] p-8 bg-gradient-to-b from-[#121212] via-black/100 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl relative overflow-hidden">

            <div className="relative z-10">
                <h2 className="text-2xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-[#4ade80] to-[#059669] bg-clip-text text-transparent">
                    Get in Touch
                </h2>

                {success ? (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-lg flex flex-col items-center justify-center animate-pulse gap-2">
                        <Shield size={32} />
                        <span className="font-semibold">Message Sent</span>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-1">
                            <label htmlFor="name" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                value={formState.name}
                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                className="w-full bg-transparent border-b border-white/20 text-white px-0 py-2 placeholder-white/30 focus:outline-none focus:border-[#4ade80] transition-all font-sans text-sm"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="email" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                className="w-full bg-transparent border-b border-white/20 text-white px-0 py-2 placeholder-white/30 focus:outline-none focus:border-[#4ade80] transition-all font-sans text-sm"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="message" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Message
                            </label>
                            <textarea
                                id="message"
                                required
                                rows={4}
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                className="w-full bg-transparent border-b border-white/20 text-white px-0 py-2 placeholder-white/30 focus:outline-none focus:border-[#4ade80] transition-all resize-none font-sans text-sm"
                                placeholder="How can we help?"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full mt-4 bg-gradient-to-r from-[#4ade80] to-[#059669] hover:opacity-90 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
                        >
                            {isSubmitting ? (
                                <span className="animate-pulse">Sending...</span>
                            ) : (
                                <>
                                    <span>Send Message</span>
                                    <Send size={16} />
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

const Globe = () => {
    return (
        <div className="min-h-screen bg-black text-slate-200 selection:bg-emerald-500/30 flex flex-col relative overflow-hidden font-sans">

            {/* Subtle Background Glows */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/10 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-900/10 blur-[150px] rounded-full"></div>
            </div>

            {/* Main Layout */}
            <div className="flex-1 flex flex-col z-10 relative">

                {/* Hero Section */}
                <main className="flex-1 flex flex-col lg:flex-row items-center justify-center w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">

                    {/* Left Side: 3D Globe */}
                    <div className="w-full lg:w-[60%] h-[400px] lg:h-[600px] relative order-2 lg:order-1">
                        {/* 3D Scene Wrapper */}
                        <div className="absolute inset-0 cursor-move z-10">
                            <GlobeScene />
                        </div>
                    </div>

                    {/* Right Side: Contact Form Area */}
                    <div className="w-full md:w-[55%] flex flex-col justify-center items-center lg:items-start order-1 lg:order-2">
                        <div className="mb-6 text-center lg:text-left relative w-full">
                            <div className="flex items-center gap-4 text-xs md:text-sm text-gray-500 mb-6 tracking-wider pt-8 ">
                                <a href="#" className="flex items-center gap-1 hover:text-[#00ff41] transition-colors group">
                                    <Home size={14} />
                                    <span className="group-hover:underline">root</span>
                                </a>
                                <span>/</span>
                                <span className="hover:text-white cursor-pointer transition-colors">system</span>
                                <span>/</span>
                                <span className="text-[#00ff41]">Contact</span>
                            </div>

                            <div className="mb-6 -ml-10 md:-ml-12">
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
                                    Let's Connect
                                </FuzzyText>
                            </div>
                            <p className="text-sm max-w-[550px] text-slate-500 leading-relaxed border-l-2 border-[#4ade80]/30 pl-4">
                                Secure connection established. Ready to deploy creative solutions across the digital landscape.
                            </p>
                        </div>

                        <ContactForm />
                    </div>
                </main>
            </div>

            <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; box-shadow: 0 0 10px #4ade80; }
          50% { opacity: 0.5; box-shadow: 0 0 2px #4ade80; }
        }
      `}</style>
        </div>
    );
};

export default Globe;