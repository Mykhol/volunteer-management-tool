import styled from "styled-components";
import {Paper} from "@mui/material";

export const FormContainer = styled(Paper).attrs(props => ({
    elevation: props.elevation || 6
}))`
  
  background: ${props => props.theme.palette.grey.A50};

  border-radius: 15px;
  height: min-content;
  width: 400px;
  
  padding: 20px;

  h2 {
    margin-bottom: 15px;
  }
  
  #skeleton {
    z-index: 1;
    border-radius: 2vw;
    position: absolute;
  }
`

export const FormInputContainer = styled.div`
  > * {
    margin-bottom: 20px;
    width: 100%;
  }

`