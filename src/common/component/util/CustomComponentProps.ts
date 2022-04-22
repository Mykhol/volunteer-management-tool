import {ReactNode} from "react";
import {MessageType} from "@module/errors/model/MessageType";

export interface CustomComponentProps {
    className?: any
    children?: ReactNode
    css?: any
}

export interface CustomComponentWithErrorHandlingProps extends CustomComponentProps {
    displayAppMessage: (errorType: MessageType, errorMessage: string) => void
}
