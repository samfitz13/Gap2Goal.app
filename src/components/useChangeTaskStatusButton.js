import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

import StatusChange from "./StatusChange";
import useTaskMutations from "../graphql/useTaskMutations";

// Use a hook to dynamically create status update buttons for the specified project
export default function useChangeTaskStatusButton(project) {
	const { updateTask } = useTaskMutations(project);
	const ChangeTaskStatusButton = ({ task, fromStatus, toStatus, children, unselectTask }) => {
		return (
			<Box
				mx="auto"
				px={8}
				py={4}
				maxW="2xl"
				shadow="lg"
				borderWidth="1px"
				onClick={() => {
					updateTask(task, { status: toStatus })
					unselectTask()
					}
				}
				bg={useColorModeValue("white", "gray.800")}
			>
				{children}
				<StatusChange from={fromStatus} to={toStatus} />
			</Box>
		);
	};
	return ChangeTaskStatusButton;
}
