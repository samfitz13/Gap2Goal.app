import React from "react";
import { LinkNext } from 'grommet-icons'
import { Box } from 'grommet'

import StatusBadge from "./StatusBadge";


export default function StatusChange({ from, to }) {
  return (
    <Box direction='row' gap='small'>
      <StatusBadge status={from} />
      <LinkNext />      
      <StatusBadge status={to} />
    </Box>
  );
}

