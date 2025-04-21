'use client'

import { useEffect, useState } from 'react'

export default function useMediaQuery() {
    const [width, setWidth] = useState(0);


    useEffect(() => {
        const handleWindowChange = () => {
            setWidth(window.innerWidth);
        };

        handleWindowChange()
        window.addEventListener('resize', handleWindowChange)
        return () => window.removeEventListener('resize', handleWindowChange)
    }, [])

    const mobile = width > 0 && width <= 768;
    const tablet = width > 0 && width <= 1024;
    const desktop = width === 0 || width > 1024;

    return { mobile, tablet, desktop };
}
