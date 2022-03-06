import {TextField as MUITextField} from "@mui/material";
import {CustomComponentProps} from "../util/CustomComponentProps";
import styled from "@emotion/styled";

export enum ComponentSize {
    SMALL = "small",
    NORMAL = "medium"
}

interface CustomTextFieldProps extends CustomComponentProps{
    label: string
    required?: boolean
    size?: ComponentSize
    onChange?: (text: string) => any
    isEditable?: boolean
    value?: string
    error?: boolean
}

const CustomTextField = (props: CustomTextFieldProps) => {

    return (
        <MUITextField variant={"standard"}
                      label={props.label}
                      size={props.size || "small"}
                      required={props.required || false}
                      error={props.error || false}
                      InputLabelProps={{
                          shrink: true
                      }}
                      value={props.value}
                      onChange={props.onChange ? (e) => {props.onChange!!(e.target.value)} : () => {}}
                      inputProps={{readOnly: props.isEditable ? !props.isEditable : false}}/>
    )

}

const TextField = styled(CustomTextField)`

  margin: 30px;

`

export default TextField