import React, { useState, useEffect } from 'react';

const SystemStatus = () => {
    const [visitorCount, setVisitorCount] = useState('00000');

    useEffect(() => {
        // Check if we are in development mode
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

        // 1. If on localhost, don't mess up the real stats
        if (isLocalhost) {
            setVisitorCount('DEV_MODE'); // Or just set it to '00000'
            return;
        }

        // 2. Real API call (only runs on the live site)
        const namespace = 'your-portfolio-namespace';
        const key = 'visits';

        fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`)
            .then((response) => response.json())
            .then((data) => {
                const formatted = String(data.count).padStart(5, '0');
                setVisitorCount(formatted);
            })
            .catch((err) => {
                console.error(err);
                setVisitorCount('ERR_01');
            });
    }, []);

    return (
        <div className="inline-block mb-4 px-3 py-1 bg-gradient-to-b from-[#222] to-black border border-white/10  rounded-full text-green-400 text-sm font-mono animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.2)]">
            System Online. Welcome, User <span className="font-bold">{visitorCount}</span>
        </div>
    );
};

export default SystemStatus;