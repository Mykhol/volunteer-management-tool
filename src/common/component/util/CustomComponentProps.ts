import {ReactNode} from "react";
import {ErrorType} from "@module/errors/model/ErrorType";

export interface CustomComponentProps {
    className?: any
    children?: ReactNode
    css?: any
}

export interface CustomComponentWithErrorHandlingProps extends CustomComponentProps {
    handleAppError: (errorType: ErrorType, errorMessage: string) => any
}