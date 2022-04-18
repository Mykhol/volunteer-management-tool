import BaseForm from "@common/component/form/BaseForm";
import {CustomComponentProps} from "@common/component/util/CustomComponentProps";
import TextField from "@common/component/mui/TextField";
import InputRow from "@common/component/form/InputRow";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField as MUITextField} from "@mui/material";
import {DatePicker, DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import {useEffect, useState} from "react";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {getVaccinationStatusText, VaccinationStatus} from "@module/member/model/VaccinationStatus";
import {Member} from "@module/member/model/Member";
import {css, SerializedStyles} from "@emotion/react";

export interface MemberFormProps extends CustomComponentProps {
    member: Member | null
    onSubmit: (member: Member) => any
}

/**
 * Form used to edit and view member data across the app.
 */
const MemberForm = (props: MemberFormProps) => {

    const [memberData, setMemberData] = useState(props.member || Member.empty)

    // Each time member changes, update memberData.
    useEffect(() => {
        setMemberData(props.member || Member.empty)
    }, [props.member])

    return (
        <BaseForm>
            <InputRow>
                <TextField required={true} label={"First name"} value={memberData.firstName} onChange={(firstName) => setMemberData({...memberData, firstName: firstName})}/>
                <TextField required={true} label={"Last name"} value={memberData.lastName} onChange={(lastName) => setMemberData({...memberData, lastName: lastName})}/>
            </InputRow>
            <TextField required={true} label={"Email"} value={memberData.primaryEmail} onChange={(email) => setMemberData({...memberData, primaryEmail: email})}/>
            <InputRow>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Basic example"
                            inputFormat={"dd/MM/yyyy"}
                            value={memberData.dateOfBirth || "2022-01-01T00:00:00"}
                            onChange={(newValue) => {setMemberData({...memberData, dateOfBirth: newValue || ""});}}
                            renderInput={(params) => <MUITextField variant={"standard"} required={true} sx={{width: '100%'}} {...params} />}
                        />
                </LocalizationProvider>
            </InputRow>
            <FormControl variant="standard" required={true}>
                <InputLabel>Vaccination Status</InputLabel>
                <Select
                    value={memberData.vaccinationStatus}
                    onChange={(value) => setMemberData({...memberData, vaccinationStatus: value.target.value as VaccinationStatus})}
                    label="Age"
                >
                    <MenuItem value={VaccinationStatus.UNKNOWN}>{getVaccinationStatusText(VaccinationStatus.UNKNOWN)}</MenuItem>
                    <MenuItem value={VaccinationStatus.VALID}>{getVaccinationStatusText(VaccinationStatus.VALID)}</MenuItem>
                    <MenuItem value={VaccinationStatus.INVALID}>{getVaccinationStatusText(VaccinationStatus.INVALID)}</MenuItem>
                    <MenuItem value={VaccinationStatus.NO_PASS}>{getVaccinationStatusText(VaccinationStatus.NO_PASS)}</MenuItem>
                </Select>
            </FormControl>
            <Button sx={{
                width: 100
            }}
            onClick={() => {
                console.log("Clicked")
                props.onSubmit(memberData)
            }}
            >{props.member ? "Update member" : "Create member"}</Button>
        </BaseForm>
    )

}

export default MemberForm