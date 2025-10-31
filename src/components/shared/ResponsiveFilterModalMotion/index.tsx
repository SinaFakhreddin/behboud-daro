"use client"
import { motion, AnimatePresence } from "framer-motion";
import {useAgentDetector} from "@/hooks/useAgentDetecor";
import {useCloseDrawerByOutSideClick} from "@/hooks/useCloseDrawerByOutSideClick";
import {ScrollArea} from "@mantine/core";

type Props = {
    isOpened: boolean;
    onClose: VoidFunction;
    children: React.ReactNode;
    type?:string
};

export default function ResponsiveFilterModal({ isOpened, onClose, children , type }: Props) {
    const {isMobile} = useAgentDetector()
    const {drawerRef} = useCloseDrawerByOutSideClick({isMobile , onClose})


    return (
        <AnimatePresence>
            {isOpened && (
                <>
                    <motion.div
                        key="overlay"
                        className="fixed inset-0 bg-black/50 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {isMobile ? (
                        <motion.div
                            key="drawer"
                            ref={drawerRef}
                            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-xl z-50 p-4"
                            style={{ height: `${type==="create" ? "70vh" : "50vh"}` }}
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                                {children}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="modal"
                            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 p-6 w-96"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {children}
                        </motion.div>
                    )}
                </>
            )}
        </AnimatePresence>
    );
}
