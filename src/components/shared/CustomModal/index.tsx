import {useAgentDetector} from "@/hooks/useAgentDetecor";
import {ReactNode} from "react";

type Props = {
    isOpened:boolean;
    onClose:VoidFunction;
    children:ReactNode
}

export default function CustomModal(props:Props) {
    const {isMobile} =useAgentDetector()
    return (
        <>
            {props.isOpened && (
                <div className=" absolute top-0 inset-0  bg-opacity-50 flex items-center justify-center z-50">
                    <div className={`bg-white ${isMobile ? "w-full h-full" : ""} rounded-lg shadow-lg w-96 p-6 relative`}>
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={props.onClose}
                        >
                            ✕
                        </button>
                        {props.children}
                    </div>
                </div>
            )}
        </>
    )
}