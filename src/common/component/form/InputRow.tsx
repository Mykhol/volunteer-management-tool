import styled from "@emotion/styled";

/**
 * Used in forms to indicate a row of input fields.
 */
const InputRow = styled.div`

  // Each element will attempt to fill the entire row, essentially making each element equal width.
  width: 100%;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
  // The '&&' ensures that this style overwrites the default styling applied to the MUI components.
  // Apply a margin to all elements in this row.
  && > * {
    margin-right: 30px;
  }
  
  // Remove the margin from the last element in the row.
  && > :last-child {
    margin-right: 0;
  }
  
  
`

export default InputRow