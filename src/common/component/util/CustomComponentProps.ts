import {ReactNode} from "react";
import {MessageType} from "@module/errors/model/MessageType";
import {Theme} from "@mui/material";

export interface CustomComponentProps {
    className?: any
    children?: ReactNode
    css?: any
    theme?: Theme
}

export interface CustomComponentWithErrorHandlingProps extends CustomComponentProps {
    displayAppMessage: (errorType: MessageType, errorMessage: string) => void
}
