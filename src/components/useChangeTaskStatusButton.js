import React from "react";
import { Box } from "grommet";

import StatusChange from "./StatusChange";
import useTaskMutations from "../graphql/useTaskMutations";

// Use a hook to dynamically create status update buttons for the specified project
export default function useChangeTaskStatusButton(project) {
	const { updateTask } = useTaskMutations(project);
	const ChangeTaskStatusButton = ({ task, fromStatus, toStatus, children }) => {
		return (
			<Box width='medium' hoverIndicator onClick={() => updateTask(task, { status: toStatus })}>
					{children}
					<StatusChange from={fromStatus} to={toStatus} />
			</Box>
		);
	};
	return ChangeTaskStatusButton;
}