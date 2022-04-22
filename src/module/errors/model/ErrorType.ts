import {VaccinationStatus} from "@module/member/model/VaccinationStatus";

export enum ErrorType {

    NONE,

    ERROR,

    WARNING,

    SUCCESS

}

export const getAppErrorSeverity = (errorType: ErrorType) : string => {

    switch (errorType) {
        case ErrorType.NONE:
            return "️"

        case ErrorType.ERROR:
            return "error"

        case ErrorType.WARNING:
            return "warning"

        case ErrorType.SUCCESS:
            return "success️"

    }
}