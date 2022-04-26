import {CustomComponentWithErrorHandlingProps} from "@common/component/util/CustomComponentProps";
import {User} from "@module/user/model/User";
import {useEffect, useState} from "react";
import {MessageType} from "@module/errors/model/MessageType";
import {FormContainer, FormInputContainer} from "@common/component/base-form/FormUtil";
import {Button, TextField} from "@mui/material";
import {UserScope} from "@module/user/model/UserScope";
import withAppMessage from "@module/errors/component/AppMessage";

export interface UserFormProps extends CustomComponentWithErrorHandlingProps {
    user?: User
    onDataUpdate?: () => void
}


/**
 * Form used to edit and view user data across the app
 */
const UserForm = (props: UserFormProps) => {

    const [isEditable, setIsEditable] = useState<boolean>(false)
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [primaryEmail, setPrimaryEmail] = useState<string>("")
    const [scope, setScope] = useState<UserScope[]>([UserScope.ADMIN])

    useEffect(() => {
        getData()
    }, [])

    const getData = (setNewEditableTo?: boolean) => {
        const newIsEditable = setNewEditableTo || !props.user
        setIsEditable(newIsEditable)
        setFirstName(newIsEditable ? "" : props.user?.firstName!!)
        setLastName(newIsEditable ? "" : props.user?.lastName!!)
        setPrimaryEmail(newIsEditable ? "" : props.user?.primaryEmail!!)
        setScope(newIsEditable ? [UserScope.ADMIN] : props.user?.scope!!)
    }

    const handleSubmit = () => {
        const newUser = new User(
            null,
            firstName,
            lastName,
            primaryEmail,
            null,
            null,
            scope,
            null)

        if (!newUser.isValid()) {
            props.displayAppMessage(MessageType.ERROR, "Please check the data and try again.")
        }

        const options = {
            method: "POST",
            body: JSON.stringify(newUser)
        }

        fetch("/api/users", options).then((r) => {
            if(r.status.isSuccessful()) {
                props.displayAppMessage(MessageType.SUCCESS, "User created succesffuly.")
                getData(true)
            } else {
                props.displayAppMessage(MessageType.ERROR, "There was an error creating the user.")
            }
        })
    }

    return (
        <FormContainer>
            <h2>Create new user</h2>
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
                <Button variant={"contained"} onClick={handleSubmit}>Create new user</Button>
            </FormInputContainer>
        </FormContainer>
    )

}

export default withAppMessage(UserForm)