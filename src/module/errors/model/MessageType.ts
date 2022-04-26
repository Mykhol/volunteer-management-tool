export enum MessageType {

    ERROR,

    WARNING,

    SUCCESS,

    INFO

}

export const getAppErrorSeverity = (errorType: MessageType) : string => {

    switch (errorType) {
        case MessageType.ERROR:
            return "error"

        case MessageType.WARNING:
            return "warning"

        case MessageType.SUCCESS:
            return "success"

        case MessageType.INFO:
            return "info"

    }
}