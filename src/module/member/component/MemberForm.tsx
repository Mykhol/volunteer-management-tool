import {CustomComponentWithErrorHandlingProps} from "@common/component/util/CustomComponentProps";
import {Button, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/lab";
import {useEffect, useState} from "react";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {FormContainer, FormInputContainer} from "@common/component/base-form/FormUtil";
import {Member} from "@module/member/model/Member";
import withAppMessage from "@module/errors/component/AppMessage";
import {MessageType} from "@module/errors/model/MessageType";

export interface MemberFormProps extends CustomComponentWithErrorHandlingProps {
    member?: Member
    onDataUpdate?: () => void
}

/**
 * Form used to edit and view member data across the app.
 */
const MemberForm = (props: MemberFormProps) => {

    const [isEditable, setIsEditable] = useState<boolean>(false)
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [primaryEmail, setPrimaryEmail] = useState<string>("")
    const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date())

    useEffect(() => {
        update()
    }, [props.member])

    const update = () => {
        const newIsEditable = !props.member
        setIsEditable(newIsEditable)
        setFirstName(newIsEditable ? "" : props.member?.firstName!!)
        setLastName(newIsEditable ? "" : props.member?.lastName!!)
        setPrimaryEmail(newIsEditable ? "" : props.member?.primaryEmail!!)
        setDateOfBirth(newIsEditable ? new Date() : props.member?.dateOfBirth!!)
    }

    const handleSubmit = () => {
        const newMember = new Member(null, null, firstName!!, lastName!!, primaryEmail!!, null, dateOfBirth!!, null)

        if (!newMember.isValid()) {
            props.displayAppMessage(MessageType.ERROR, "Please check the data and try again.")
            return
        }

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
                <h2>{isEditable ? "Create new member" : "View member's details"}</h2>
                <FormInputContainer>
                    <TextField label={"First Name"}
                               required
                               variant={"outlined"}
                               value={firstName}
                               InputLabelProps={{ shrink: true }}
                               InputProps={{ readOnly: !isEditable }}
                               onChange={(e) => setFirstName(e.target.value)}
                    />

                    <TextField label={"Last Name"}
                               required
                               variant={"outlined"}
                               value={lastName}
                               InputLabelProps={{ shrink: true }}
                               InputProps={{ readOnly: !isEditable }}
                               onChange={(e) => setLastName(e.target.value)}
                    />

                    <TextField label={"Email"}
                               required
                               variant={"outlined"}
                               value={primaryEmail}
                               InputLabelProps={{ shrink: true }}
                               InputProps={{ readOnly: !isEditable }}
                               onChange={(e) => setPrimaryEmail(e.target.value)}
                    />

                    {/* Render the date picker */}
                    <DatePicker
                        readOnly={!isEditable}
                        label="Date of Birth"
                        inputFormat={"dd/MM/yyyy"}
                        value={dateOfBirth}
                        onChange={(newValue) => { setDateOfBirth(newValue || new Date())}}
                        renderInput={(params) => <TextField required
                                                            InputLabelProps={{ shrink: true }}
                                                            value={dateOfBirth}
                                                            {...params} />}
                    />

                    {isEditable
                        ? <Button variant={"contained"} onClick={handleSubmit}>Create Member</Button>
                        : <Button variant={"contained"} sx={{ bgcolor: "secondary.main" }}>Edit Member</Button>}
                </FormInputContainer>
            </FormContainer>
        </LocalizationProvider>
    )
}

export default withAppMessage(MemberForm)