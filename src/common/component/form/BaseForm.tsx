import styled from "@emotion/styled";
import {CustomComponentProps} from "@common/component/util/CustomComponentProps";

/**
 * Container for the base form.
 */
const Container = styled.div`
  
  // Ensures that the BaseForm remains as small as the content inside it.
  display: inline-block;
  
  height: min-content;
  
  padding: 35px 30px;
  //margin: 15px;

  // background-color: ${props => props.theme.palette.grey.A100};
  
  border-radius: 5px;
  border: 1px solid ${props => props.theme.palette.grey.A400};
  
  // Apply a bottom margin to all elements in this container.
  && > * {
    width: 100%;
    margin-bottom: 15px;
  }
  
  // This is styling for the submit button.
  && > :last-child {
    width: 50%;
    margin-top: 25px;
    margin-bottom: 0;
    
    background-color: ${props => props.theme.palette.primary.dark};
    
    color: ${props => props.theme.palette.primary.light};
  }
  

`

/**
 * Serves as the base for all data view and input forms across the app.
 */
const BaseForm = (props: CustomComponentProps) => {

    return (
        <Container css={props.css}>
            {props.children}
        </Container>
    )

}

export default BaseForm
