import styled from "styled-components";
import {Paper} from "@mui/material";

export const TableContainer = styled(Paper).attrs(props => ({
    elevation: props.elevation || 6
}))`
  
  background: ${props => props.theme.palette.grey.A50};

  border-radius: 15px;
  width: 50%;
  height: 600px;
  
  padding: 20px;

  h2 {
    margin-bottom: 15px;
  }
  
  //#skeleton {
  //  z-index: 1;
  //  border-radius: 2vw;
  //  position: absolute;
  //}
`