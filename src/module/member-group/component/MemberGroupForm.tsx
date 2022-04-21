import {CustomComponentProps} from "@common/component/util/CustomComponentProps";
import {FormContainer, FormInputContainer} from "@common/component/container/FormUtil";
import {Button, Checkbox, ListItemText, MenuItem, SelectChangeEvent, TextField} from "@mui/material";
import {ChangeEvent, ChangeEventHandler, SetStateAction, useEffect, useState} from "react";
import {Member} from "@module/member/model/Member";
import useSWR from "swr";
import {Skeleton} from "@mui/lab";
import {MemberGroup} from "@module/member-group/model/MemberGroup";

interface MemberGroupFormProps extends CustomComponentProps {

}

const MemberGroupForm = (props: MemberGroupFormProps) => {

    const [memberGroupName, setMemberGroupName] = useState<string>("")
    const [selectedMembers, setSelectedMembers] = useState<{id: string, fullName: string}[]>([])

    const {data} = useSWR("/api/members")

    const members: Member[] = data

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {

        console.log(e.target)

        // Taken from MUI docs (see https://mui.com/material-ui/react-select/#MultipleSelectCheckmarks.tsx)
        const membersIds = e.target.value as unknown as string[]

        console.log(membersIds)

        const newMembers = membersIds.map((id: string) => {
            const foundMember = members.find((member) => {
                return member.id == id
            })
            return {id: id, fullName: foundMember!!.firstName + " " + foundMember!!.lastName}
        })

        setSelectedMembers(newMembers)

    }

    const handleSubmit = () => {

        const newMemberGroup = new MemberGroup(null, memberGroupName, selectedMembers)

        const options = {
            method: "POST",
            body: JSON.stringify(newMemberGroup)
        }

        fetch("/api/member-groups", options).then((r) => {
            console.log(r)
        })

    }

    if (!data) {
        return (
            <Skeleton variant={"rectangular"} width={'100%'} height={800}/>
        )
    }

    return (
        <FormContainer>
            <h2>Create new member group</h2>
            <FormInputContainer>
                {/* Render the group name field */}
                <TextField label={"Group name"} variant={"outlined"} InputLabelProps={{ shrink: true}} onChange={e => setMemberGroupName(e.target.value)}/>

                <TextField
                    variant={"outlined"}
                    label={"Members"}
                    value={selectedMembers.map((member) => {
                        return member.id
                    })}
                    onChange={(e) => handleChange(e)}
                    InputLabelProps={{ shrink: true}}
                    select={true}
                    SelectProps={{
                        multiple: true,
                        renderValue: () => selectedMembers.map((m) => m.fullName).join(", "),
                        MenuProps: {
                            style: {
                                maxHeight: 400,
                            }
                        }
                    }}
                >
                    {data.map((member: Member) => (
                        <MenuItem key={member.id!!} value={member.id!!}>
                            <Checkbox checked={selectedMembers.map((m) => m.id).includes(member.id!!)}/>
                            <ListItemText primary={member.firstName + " " + member.lastName} />
                        </MenuItem>
                    ))}
                </TextField>
                <Button variant={"contained"} onClick={handleSubmit}>Create Member Group</Button>

            </FormInputContainer>
        </FormContainer>
    )

}

export default MemberGroupForm