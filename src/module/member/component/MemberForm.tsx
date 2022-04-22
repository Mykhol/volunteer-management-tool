import {CustomComponentWithErrorHandlingProps} from "@common/component/util/CustomComponentProps";
import {Button, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/lab";
import {useState} from "react";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {FormContainer, FormInputContainer} from "@common/component/container/FormUtil";
import {Member} from "@module/member/model/Member";
import withAppMessage from "@module/errors/component/AppMessage";
import {MessageType} from "@module/errors/model/MessageType";

export interface MemberFormProps extends CustomComponentWithErrorHandlingProps {

}

/**
 * Form used to edit and view member data across the app.
 */
const MemberForm = (props: MemberFormProps) => {

    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [primaryEmail, setPrimaryEmail] = useState<string>("")
    const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date())

    const handleSubmit = () => {



        const newMember = new Member(null, null, firstName, lastName, primaryEmail, null, dateOfBirth, null)

        const options = {
            method: "POST",
            body: JSON.stringify(newMember)
        }

        fetch("/api/members", options).then((r) => {
            if (r.status.isSuccessful()) {
                props.displayAppMessage(MessageType.SUCCESS, "Member created!")
                setFirstName("")
                setLastName("")
                setPrimaryEmail("")
                setDateOfBirth(new Date())
            } else {
                props.displayAppMessage(MessageType.ERROR,"Something went wrong!");
            }
        })

    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormContainer>
                <h2>Create new member</h2>
                <FormInputContainer>
                    <TextField label={"First Name"}
                               variant={"outlined"}
                               value={firstName}
                               InputLabelProps={{ shrink: true }}
                               onChange={(e) => setFirstName(e.target.value)}
                    />

                    <TextField label={"Last Name"}
                               variant={"outlined"}
                               value={lastName}
                               InputLabelProps={{ shrink: true }}
                               onChange={(e) => setLastName(e.target.value)}
                    />

                    <TextField label={"Email"}
                               variant={"outlined"}
                               value={primaryEmail}
                               InputLabelProps={{ shrink: true }}
                               onChange={(e) => setPrimaryEmail(e.target.value)}
                    />

                    {/* Render the date picker */}
                    <DatePicker
                        label="Date of Birth"
                        inputFormat={"dd/MM/yyyy"}
                        value={dateOfBirth}
                        onChange={(newValue) => { setDateOfBirth(newValue || new Date())}}
                        renderInput={(params) => <TextField InputLabelProps={{ shrink: true }} {...params} />}
                    />

                    <Button variant={"contained"} onClick={handleSubmit}>Create Member</Button>
                </FormInputContainer>
            </FormContainer>
        </LocalizationProvider>
    )
}

export default withAppMessage(MemberForm)