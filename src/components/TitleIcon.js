import { Grid } from "@mui/material";
import React from "react";
import { ReactComponent as AddIcon } from "../assets/images/add.svg";
import styled from "styled-components";

const Title = styled.span`
  color: #000;
  font-size: 23;
  font-weight: bold;
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
`;
const Icon = styled.div`
  display: flex;
  justify-content: flex-end;
  svg{
    cursor:pointer
  }
`;
const TitleIcon = ({ title, action }) => {
  return (
    <Grid container>
      <Grid item sm={4} />
      <Grid item sm={4}>
        <Title>{title}</Title>
      </Grid>
      <Grid item sm={4} onClick={() => action()}>
        <Icon>
          <AddIcon />
        </Icon>
      </Grid>
    </Grid>
  );
};

export default TitleIcon;
