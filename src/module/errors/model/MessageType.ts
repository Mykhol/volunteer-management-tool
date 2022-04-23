export enum MessageType {

    NONE,

    ERROR,

    WARNING,

    SUCCESS,

    INFO

}

export const getAppErrorSeverity = (errorType: MessageType) : string => {

    switch (errorType) {
        case MessageType.NONE:
            return "️"

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