import {useState} from "react";
import {getAppErrorSeverity, MessageType} from "@module/errors/model/MessageType";
import Alert, {AlertColor} from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {Slide} from "@mui/material";

/**
 * An HOC component that lets any other component display errors on the screen.
 * @param WrappedComponent
 */
const withAppMessage = (WrappedComponent: any) => {

    return (props: any) => {
        const [isVisible, setIsVisible] = useState<boolean>(false)
        const [errorType, setErrorType] = useState<MessageType>(MessageType.INFO)
        const [errorMessage, setErrorMessage] = useState<string>("")

        const displayAppMessage = (errorType: MessageType, errorMessage: string, visible: boolean = true) => {
            setErrorType(errorType)
            setIsVisible(visible)
            setErrorMessage(errorMessage)
        }

        const handleClose = () => {
            setIsVisible(false)
        }

        return (
            <>
                <WrappedComponent {...props} displayAppMessage={displayAppMessage} />
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
                    }}
                    autoHideDuration={5000}
                    open={isVisible}
                    onClose={handleClose}
                    TransitionComponent={Slide}
                >
                    {/*// @ts-ignore*/}
                    <Alert variant="filled" onClose={handleClose}
                           severity={getAppErrorSeverity(errorType) as AlertColor}
                    >
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </>
        )
    }

}

export default withAppMessage