import {useState} from "react";
import {ErrorType, getAppErrorSeverity} from "@module/errors/model/ErrorType";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {Slide} from "@mui/material";

/**
 * An HOC component that lets any other component display errors on the screen.
 * @param WrappedComponent
 */
const withAppErrorHandler = (WrappedComponent: any) => {

    return (props: any) => {
        const [open, setOpen] = useState<boolean>(false)
        const [errorType, setErrorType] = useState<ErrorType>(ErrorType.NONE)
        const [errorMessage, setErrorMessage] = useState<string>("")

        const handleAppError = (errorType: ErrorType, errorMessage: string) => {
            setErrorType(errorType)
            setErrorMessage(errorMessage)
            setOpen(true)
        }

        const handleClose = () => {
            setOpen(false)
        }

        return (
            <>
                <WrappedComponent {...props} handleAppError={handleAppError} />
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
                    }}
                    autoHideDuration={5000}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Slide}
                >
                    {/*// @ts-ignore*/}
                    <Alert variant="filled" onClose={handleClose} severity={getAppErrorSeverity(errorType)}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </>
        )
    }

}

export default withAppErrorHandler