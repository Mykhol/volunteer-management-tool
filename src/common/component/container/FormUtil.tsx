import styled from "styled-components";
import {Skeleton} from "@mui/material";

export const FormContainer = styled.div`

  width: 400px;

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