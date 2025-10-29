import {useEffect, useRef} from "react";



type Params = {
    onClose:VoidFunction;
    isMobile:boolean;
}

export const useCloseDrawerByOutSideClick = ({onClose, isMobile}:Params)=>{

    const startY = useRef<number | null>(null);
    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isMobile || !drawerRef.current) return;
        const drawer = drawerRef.current;

        const handleTouchStart = (e: TouchEvent) => { startY.current = e.touches[0].clientY; };
        const handleTouchMove = (e: TouchEvent) => {
            if (!startY.current) return;
            const diff = e.touches[0].clientY - startY.current;
            if (diff > 100) onClose();
        };
        drawer.addEventListener("touchstart", handleTouchStart);
        drawer.addEventListener("touchmove", handleTouchMove);
        return () => {
            drawer.removeEventListener("touchstart", handleTouchStart);
            drawer.removeEventListener("touchmove", handleTouchMove);
        };
    }, [isMobile, onClose]);


    return {drawerRef}
}