import React from "react";
import {
	Box,
	Button,
	Heading,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Popover,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Spacer,
	useToast,
} from "@chakra-ui/react";

import useTaskMutations from "../graphql/useTaskMutations";
import TaskContent from "./TaskContent";
import useChangeTaskStatusButton from "./useChangeTaskStatusButton";

export default function TaskDetailModal({ project, task, unselectTask }) {
	const ChangeTaskStatusButton = useChangeTaskStatusButton(project);
	const { deleteTask, updateTask } = useTaskMutations(project);
	let updateTaskName = null;
	let updateTaskDescription = null;
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
										<Heading paddingBottom="4" fontSize="lg">
											Start Progress
										</Heading>
									</ChangeTaskStatusButton>
								</Box>
							)}
							{task.status === "InProgress" && (
								<Box>
									<ChangeTaskStatusButton
										task={task}
										fromStatus="InProgress"
										toStatus="Open"
									>
										<Heading paddingBottom="4" fontSize="lg">
											Stop Progress
										</Heading>
									</ChangeTaskStatusButton>
									<ChangeTaskStatusButton
										task={task}
										fromStatus="InProgress"
										toStatus="Complete"
									>
										<Heading paddingBottom="4" fontSize="lg">
											Complete Task
										</Heading>
									</ChangeTaskStatusButton>
								</Box>
							)}
							{task.status === "Complete" && (
								<Box>
									<ChangeTaskStatusButton
										task={task}
										fromStatus="Complete"
										toStatus="InProgress"
									>
										<Heading paddingBottom="4" fontSize="lg">
											Resume Task
										</Heading>
									</ChangeTaskStatusButton>
								</Box>
							)}
						</ModalBody>
						{/* TODO: #1 Add Edit Functionality */}
						<ModalFooter>
							<Popover>
								<PopoverTrigger>
									<Button>Edit</Button>
								</PopoverTrigger>
								<PopoverContent>
									<PopoverHeader>Edit Task Name</PopoverHeader>
									<PopoverCloseButton />
									<PopoverBody>
										<Input
											placeholder={task.name}
											value={updateTaskName}
											onChange={(e) => {
												updateTaskName = e.target.value;
											}}
										/>
										<Input
											placeholder={task.description}
											value={updateTaskDescription}
											onChange={(e) => {
												updateTaskDescription = e.target.value;
											}}
										 />
										<Button
											onClick={() => {
												if (updateTaskName) {
													updateTask(task, {
														name: updateTaskName,
													});
												}
												if (updateTaskDescription) {
													updateTask(task, {
														description: updateTaskDescription,
													})
												}
											}}
										>
											Save
										</Button>
									</PopoverBody>
								</PopoverContent>
							</Popover>
							<Spacer />
							<Button
								onClick={() => {
									deleteTask(task);
									toast({
										title: "Task Deleted Successfully",
										status: "success",
										duration: 5000,
										isClosable: toast,
										position: "top",
									});
									unselectTask();
								}}
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
