import React from "react";
import {
	Box,
	Button,
	Heading,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spacer,
	useToast,
} from "@chakra-ui/react";

import TaskContent from "./TaskContent";
import useChangeTaskStatusButton from "./useChangeTaskStatusButton";

export default function TaskDetailModal({ project, task, unselectTask }) {
	const ChangeTaskStatusButton = useChangeTaskStatusButton(project);
	const toast = useToast();
	return (
		<Box>
			{task && (
				<Modal isOpen={task} onClose={unselectTask}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>
							<TaskContent task={task} />
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							{task.status === "Open" && (
								<Box>
									<ChangeTaskStatusButton
										task={task}
										fromStatus="Open"
										toStatus="InProgress"
									>
										<Heading fontSize="lg">Start Progress</Heading>
									</ChangeTaskStatusButton>
								</Box>
							)}
							{task.status === "InProgress" && (
								<Box pad="medium">
									<ChangeTaskStatusButton
										task={task}
										fromStatus="InProgress"
										toStatus="Open"
									>
										<Heading fontSize="lg">Stop Progress</Heading>
									</ChangeTaskStatusButton>
									<ChangeTaskStatusButton
										task={task}
										fromStatus="InProgress"
										toStatus="Complete"
									>
										<Heading fontSize="lg">Complete Task</Heading>
									</ChangeTaskStatusButton>
								</Box>
							)}
							{task.status === "Complete" && (
								<Box pad="medium">
									<ChangeTaskStatusButton
										task={task}
										fromStatus="Complete"
										toStatus="InProgress"
									>
										<Heading fontSize="lg">Resume Task</Heading>
									</ChangeTaskStatusButton>
								</Box>
							)}
						</ModalBody>
						{/* TODO: Add Edit and Delete */}
						<ModalFooter>
							<Button
								onClick={() =>
									toast({
										title: "Feature Coming Soon!",
										description:
											"I'm adding more functionality every day, so stay tuned for frequent updates",
										status: "warning",
										duration: 5000,
										isClosable: toast,
										position: "top",
									})
								}
							>
								Edit
							</Button>
							<Spacer />
							<Button
								onClick={() =>
									toast({
										title: "Feature Coming Soon!",
										description:
											"I'm adding more functionality every day, so stay tuned for frequent updates",
										status: "warning",
										duration: 5000,
										isClosable: toast,
										position: "top",
									})
								}
							>
								Delete
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			)}
		</Box>
	);
}
