import React from "react";
import { Box } from "@chakra-ui/react";

import StatusBadge from "./StatusBadge";

export default function TaskContent({ task }) {
	return (
		<Box borderWidth="1px" >
				<h4>{task.name}</h4>
				<StatusBadge status={task.status} />
				<p>{task.description}</p>
		</Box>
	);
}
