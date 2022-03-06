import NewBaseForm, {InputRow} from "./NewBaseForm";
import TextField from "../../../mui/TextField";

const NewMemberForm = () => {

    return (
        <NewBaseForm>
            <InputRow>
                <TextField label={"First name"} required={true} />
                <TextField label={"Last name"} required={true} />
            </InputRow>
            <TextField label={"Email"} required={true} />
        </NewBaseForm>
    )

}

export default NewMemberForm


