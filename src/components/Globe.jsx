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

        const disposables = [];

        // 1. Scene Setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.03);

        const camera = new THREE.PerspectiveCamera(45, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
        camera.position.z = 7.5;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        // 2. Objects Group
        const mainGroup = new THREE.Group();
        scene.add(mainGroup);

        // -- A. Core --
        const coreGeo = new THREE.SphereGeometry(1.98, 64, 64);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
        const core = new THREE.Mesh(coreGeo, coreMat);
        mainGroup.add(core);
        disposables.push(coreGeo, coreMat);

        // -- B. Particles (Now on SEA) --
        const maxParticles = 40000;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(maxParticles * 3);
        const pSizes = new Float32Array(maxParticles);
        const pRandoms = new Float32Array(maxParticles);

        for (let i = 0; i < maxParticles; i++) {
            pPos[i * 3] = 0; pPos[i * 3 + 1] = 0; pPos[i * 3 + 2] = 0;
            pSizes[i] = 0;
            pRandoms[i] = Math.random();
        }

        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        pGeo.setAttribute('size', new THREE.BufferAttribute(pSizes, 1));
        pGeo.setAttribute('random', new THREE.BufferAttribute(pRandoms, 1));

        const pMat = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0.0 },
                color: { value: new THREE.Color(0x4ade80) }
            },
            vertexShader: `
                attribute float size;
                attribute float random;
                uniform float time;
                varying float vAlpha;
                void main() {
                    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                    gl_PointSize = size * ( 300.0 / -mvPosition.z );
                    gl_Position = projectionMatrix * mvPosition;
                    float blink = sin(time * 2.0 + random * 100.0);
                    vAlpha = 0.3 + 0.7 * (0.5 + 0.5 * blink); 
                }
            `,
            fragmentShader: `
                uniform vec3 color;
                varying float vAlpha;
                void main() {
                    vec2 center = gl_PointCoord - 0.5;
                    if (length(center) > 0.5) discard;
                    gl_FragColor = vec4(color, vAlpha);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        const oceanPoints = new THREE.Points(pGeo, pMat);
        mainGroup.add(oceanPoints);
        disposables.push(pGeo, pMat);

        // -- C. Communication Beams (Now on SEA) --
        const maxLines = 100;
        const pointsPerLine = 60;

        const staticLineGeo = new THREE.BufferGeometry();
        const beamGeo = new THREE.BufferGeometry();
        const towerGeo = new THREE.BufferGeometry();

        const segmentCount = maxLines * (pointsPerLine - 1);
        const linePos = new Float32Array(segmentCount * 2 * 3);
        const lineColors = new Float32Array(segmentCount * 2 * 3);
        const beamProgress = new Float32Array(segmentCount * 2);
        const beamOffsets = new Float32Array(segmentCount * 2);
        const towerPos = new Float32Array(maxLines * 2 * 3);
        const towerColors = new Float32Array(maxLines * 2 * 3);

        staticLineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
        staticLineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

        beamGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
        beamGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
        beamGeo.setAttribute('aProgress', new THREE.BufferAttribute(beamProgress, 1));
        beamGeo.setAttribute('aOffset', new THREE.BufferAttribute(beamOffsets, 1));

        towerGeo.setAttribute('position', new THREE.BufferAttribute(towerPos, 3));
        towerGeo.setAttribute('color', new THREE.BufferAttribute(towerColors, 3));

        const staticLineMat = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.05,
            blending: THREE.AdditiveBlending,
        });

        const beamMat = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
            },
            vertexShader: `
                attribute float aProgress;
                attribute float aOffset;
                attribute vec3 color;
                uniform float time;
                varying float vOpacity;
                varying vec3 vColor;
                
                void main() {
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    vColor = color;
                    
                    float speed = 0.8; 
                    float pulsePos = fract(time * speed + aOffset);
                    float diff = pulsePos - aProgress;
                    if (diff < 0.0) diff += 1.0; 
                    
                    float tailLength = 0.4; 
                    
                    if (diff > 0.0 && diff < tailLength) {
                        float fade = 1.0 - (diff / tailLength); 
                        vOpacity = pow(fade, 2.0); 
                    } else {
                        vOpacity = 0.0;
                    }
                }
            `,
            fragmentShader: `
                varying float vOpacity;
                varying vec3 vColor;
                void main() {
                    if (vOpacity < 0.01) discard;
                    vec3 finalColor = mix(vColor, vec3(1.0), smoothstep(0.8, 1.0, vOpacity));
                    gl_FragColor = vec4(finalColor, vOpacity);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        const towerMat = new THREE.PointsMaterial({
            size: 0.12,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            map: (() => {
                const canvas = document.createElement('canvas');
                canvas.width = 32;
                canvas.height = 32;
                const context = canvas.getContext('2d');
                const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
                gradient.addColorStop(0, 'rgba(255,255,255,1)');
                gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
                gradient.addColorStop(0.5, 'rgba(255,255,255,0.2)');
                gradient.addColorStop(1, 'rgba(0,0,0,0)');
                context.fillStyle = gradient;
                context.fillRect(0, 0, 32, 32);
                const texture = new THREE.CanvasTexture(canvas);
                return texture;
            })()
        });

        const staticLines = new THREE.LineSegments(staticLineGeo, staticLineMat);
        const beams = new THREE.LineSegments(beamGeo, beamMat);
        const towers = new THREE.Points(towerGeo, towerMat);

        mainGroup.add(staticLines);
        mainGroup.add(beams);
        mainGroup.add(towers);

        disposables.push(staticLineGeo, staticLineMat, beamGeo, beamMat, towerGeo, towerMat);

        // --- Helper: Generate Beams ---
        const generateBeams = (validCoords) => {
            if (validCoords.length < 50) return;

            let vertexIndex = 0;
            let towerIndex = 0;

            const beamColors = [
                new THREE.Color(0x22d3ee), // Cyan
                new THREE.Color(0xf97316), // Orange
            ];

            let linesCreated = 0;
            let attempts = 0;

            while (linesCreated < maxLines && attempts < maxLines * 10) {
                attempts++;
                const p1 = validCoords[Math.floor(Math.random() * validCoords.length)];
                const p2 = validCoords[Math.floor(Math.random() * validCoords.length)];

                const distance = p1.distanceTo(p2);

                if (distance < 0.5 || distance > 3.0) continue;

                const mid = p1.clone().add(p2).multiplyScalar(0.5);
                const midLength = mid.length();
                mid.normalize().multiplyScalar(midLength + distance * 0.7);

                const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
                const points = curve.getPoints(pointsPerLine - 1);

                const randomOffset = Math.random() * 10.0;
                const color = beamColors[Math.floor(Math.random() * beamColors.length)];

                towerPos[towerIndex * 3] = p1.x;
                towerPos[towerIndex * 3 + 1] = p1.y;
                towerPos[towerIndex * 3 + 2] = p1.z;
                towerColors[towerIndex * 3] = color.r;
                towerColors[towerIndex * 3 + 1] = color.g;
                towerColors[towerIndex * 3 + 2] = color.b;
                towerIndex++;

                towerPos[towerIndex * 3] = p2.x;
                towerPos[towerIndex * 3 + 1] = p2.y;
                towerPos[towerIndex * 3 + 2] = p2.z;
                towerColors[towerIndex * 3] = color.r;
                towerColors[towerIndex * 3 + 1] = color.g;
                towerColors[towerIndex * 3 + 2] = color.b;
                towerIndex++;

                for (let j = 0; j < points.length - 1; j++) {
                    const startP = points[j];
                    const endP = points[j + 1];

                    linePos[vertexIndex * 3] = startP.x;
                    linePos[vertexIndex * 3 + 1] = startP.y;
                    linePos[vertexIndex * 3 + 2] = startP.z;
                    lineColors[vertexIndex * 3] = color.r;
                    lineColors[vertexIndex * 3 + 1] = color.g;
                    lineColors[vertexIndex * 3 + 2] = color.b;
                    beamProgress[vertexIndex] = j / (points.length - 1);
                    beamOffsets[vertexIndex] = randomOffset;
                    vertexIndex++;

                    linePos[vertexIndex * 3] = endP.x;
                    linePos[vertexIndex * 3 + 1] = endP.y;
                    linePos[vertexIndex * 3 + 2] = endP.z;
                    lineColors[vertexIndex * 3] = color.r;
                    lineColors[vertexIndex * 3 + 1] = color.g;
                    lineColors[vertexIndex * 3 + 2] = color.b;
                    beamProgress[vertexIndex] = (j + 1) / (points.length - 1);
                    beamOffsets[vertexIndex] = randomOffset;
                    vertexIndex++;
                }
                linesCreated++;
            }

            staticLines.geometry.attributes.position.needsUpdate = true;
            staticLines.geometry.attributes.color.needsUpdate = true;

            beams.geometry.attributes.position.needsUpdate = true;
            beams.geometry.attributes.color.needsUpdate = true;
            beams.geometry.attributes.aProgress.needsUpdate = true;
            beams.geometry.attributes.aOffset.needsUpdate = true;

            towers.geometry.attributes.position.needsUpdate = true;
            towers.geometry.attributes.color.needsUpdate = true;
        };

        // --- EARTH TEXTURE & GENERATION ---
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
            const validSeaCoords = [];

            let particleIndex = 0;
            let attempts = 0;
            const maxAttempts = 600000;

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

                const px = Math.floor((Math.atan2(x, z) / (2 * Math.PI) + 0.5) * canvas.width);
                const py = Math.floor((1 - (Math.asin(y / r) / Math.PI + 0.5)) * canvas.height);
                const index = (py * canvas.width + px) * 4;
                const red = imgData.data[index];

                if (red < 50) {
                    newPos[particleIndex * 3] = x;
                    newPos[particleIndex * 3 + 1] = y;
                    newPos[particleIndex * 3 + 2] = z;
                    newSizes[particleIndex] = Math.random() > 0.8 ? 0.05 : 0.03;
                    particleIndex++;
                    if (Math.random() > 0.98) validSeaCoords.push(new THREE.Vector3(x, y, z));
                }
            }

            if (oceanPoints.geometry) {
                oceanPoints.geometry.setAttribute('position', new THREE.BufferAttribute(newPos, 3));
                oceanPoints.geometry.setAttribute('size', new THREE.BufferAttribute(newSizes, 1));
                oceanPoints.geometry.attributes.position.needsUpdate = true;
                oceanPoints.geometry.attributes.size.needsUpdate = true;
            }

            generateBeams(validSeaCoords);
        };

        img.onerror = () => {
            const noisePos = new Float32Array(maxParticles * 3);
            const noiseSizes = new Float32Array(maxParticles);
            const validSeaCoords = [];

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
                    if (Math.random() > 0.98) validSeaCoords.push(new THREE.Vector3(x, y, z));
                }
            }
            if (oceanPoints.geometry) {
                oceanPoints.geometry.setAttribute('position', new THREE.BufferAttribute(noisePos, 3));
                oceanPoints.geometry.setAttribute('size', new THREE.BufferAttribute(noiseSizes, 1));
                oceanPoints.geometry.attributes.position.needsUpdate = true;
                oceanPoints.geometry.attributes.size.needsUpdate = true;
            }
            generateBeams(validSeaCoords);
        };

        // -- D. Atmosphere --
        const atmosGeo = new THREE.SphereGeometry(2.3, 64, 64);
        const atmosMat = new THREE.MeshBasicMaterial({
            color: 0x22d3ee,
            transparent: true,
            opacity: 0.05,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
        });
        const atmosphere = new THREE.Mesh(atmosGeo, atmosMat);
        scene.add(atmosphere);
        disposables.push(atmosGeo, atmosMat);

        // -- E. Background Blinking Stars --
        const starCount = 3000;
        const starGeo = new THREE.BufferGeometry();
        const starPos = new Float32Array(starCount * 3);
        const starSizes = new Float32Array(starCount);
        const starOffsets = new Float32Array(starCount);

        for (let i = 0; i < starCount; i++) {
            const r = 40 + Math.random() * 60; // Scatter far away
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            starPos[i * 3 + 2] = r * Math.cos(phi);

            starSizes[i] = Math.random() * 1.5;
            starOffsets[i] = Math.random() * 100.0;
        }

        starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
        starGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
        starGeo.setAttribute('offset', new THREE.BufferAttribute(starOffsets, 1));

        const starMat = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color(0xffffff) }
            },
            vertexShader: `
                attribute float size;
                attribute float offset;
                uniform float time;
                varying float vAlpha;
                void main() {
                    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                    gl_PointSize = size * ( 300.0 / -mvPosition.z );
                    gl_Position = projectionMatrix * mvPosition;
                    
                    float blink = sin(time * 1.0 + offset);
                    vAlpha = 0.2 + 0.8 * (0.5 + 0.5 * blink); 
                }
            `,
            fragmentShader: `
                uniform vec3 color;
                varying float vAlpha;
                void main() {
                    vec2 center = gl_PointCoord - 0.5;
                    float dist = length(center);
                    if (dist > 0.5) discard;
                    
                    float strength = 1.0 - (dist * 2.0);
                    strength = pow(strength, 2.0);
                    
                    gl_FragColor = vec4(color, vAlpha * strength);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        const starField = new THREE.Points(starGeo, starMat);
        scene.add(starField);
        disposables.push(starGeo, starMat);

        // 3. Lighting
        const ambientLight = new THREE.AmbientLight(0x000000, 1);
        scene.add(ambientLight);
        const dirLight = new THREE.DirectionalLight(0x22d3ee, 1.5);
        dirLight.position.set(5, 3, 5);
        scene.add(dirLight);

        // 4. Animation Variables
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        const domEl = renderer.domElement;

        // Handlers
        const onMouseDown = (e) => {
            isDragging = true;
            previousMousePosition = { x: e.clientX, y: e.clientY };
        };

        const onMouseMove = (e) => {
            if (isDragging) {
                const deltaX = e.clientX - previousMousePosition.x;
                const deltaY = e.clientY - previousMousePosition.y;
                const sensitivity = 0.005;
                mainGroup.rotation.y += deltaX * sensitivity;
                mainGroup.rotation.x += deltaY * sensitivity;
                previousMousePosition = { x: e.clientX, y: e.clientY };
            }
        };

        const onMouseUp = () => { isDragging = false; };

        const onWheel = (e) => {
            camera.position.z += e.deltaY * 0.01;
            camera.position.z = Math.max(4, Math.min(15, camera.position.z));
        };

        const onTouchStart = (e) => {
            if (e.touches.length === 1) {
                isDragging = true;
                previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
        };

        const onTouchMove = (e) => {
            if (isDragging && e.touches.length === 1) {
                const deltaX = e.touches[0].clientX - previousMousePosition.x;
                const deltaY = e.touches[0].clientY - previousMousePosition.y;
                const sensitivity = 0.005;
                mainGroup.rotation.y += deltaX * sensitivity;
                mainGroup.rotation.x += deltaY * sensitivity;
                previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                e.preventDefault();
            }
        };

        const onTouchEnd = () => { isDragging = false; };

        // Listeners
        domEl.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        domEl.addEventListener('wheel', onWheel, { passive: true });
        domEl.addEventListener('touchstart', onTouchStart, { passive: false });
        domEl.addEventListener('touchmove', onTouchMove, { passive: false });
        domEl.addEventListener('touchend', onTouchEnd);

        // 5. Animation Loop
        let animationId;
        const clock = new THREE.Clock();

        const animate = () => {
            animationId = requestAnimationFrame(animate);
            const time = clock.getElapsedTime();

            if (!isDragging && mainGroup) {
                mainGroup.rotation.y += 0.0015;
                mainGroup.rotation.x *= 0.98;
            }

            // Rotate stars slowly background
            if (starField) starField.rotation.y = time * 0.02;

            if (oceanPoints.material.uniforms) oceanPoints.material.uniforms.time.value = time;
            if (beamMat.uniforms) beamMat.uniforms.time.value = time;
            if (starMat.uniforms) starMat.uniforms.time.value = time;

            if (atmosphere) {
                const scale = 1 + Math.sin(time * 0.5) * 0.01;
                atmosphere.scale.set(scale, scale, scale);
            }

            renderer.render(scene, camera);
        };

        animate();

        // 6. Resize
        const handleResize = () => {
            if (!mountRef.current) return;
            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);

            domEl.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            domEl.removeEventListener('wheel', onWheel);

            domEl.removeEventListener('touchstart', onTouchStart);
            domEl.removeEventListener('touchmove', onTouchMove);
            domEl.removeEventListener('touchend', onTouchEnd);

            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }

            disposables.forEach(obj => {
                if (obj.dispose) obj.dispose();
            });
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />;
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