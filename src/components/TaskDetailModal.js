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
	Textarea,
	useToast,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { Formik, Form } from "formik";

import "react-datepicker/dist/react-datepicker.css";
import "../styles/datePickerStyle.css";

import useTaskMutations from "../graphql/useTaskMutations";
import TaskContent from "./TaskContent";
import useChangeTaskStatusButton from "./useChangeTaskStatusButton";

export default function TaskDetailModal({ project, task, unselectTask }) {
	const ChangeTaskStatusButton = useChangeTaskStatusButton(project);
	const { deleteTask, updateTask } = useTaskMutations(project);
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
										unselectTask={unselectTask}
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
										unselectTask={unselectTask}
									>
										<Heading paddingBottom="4" fontSize="lg">
											Stop Progress
										</Heading>
									</ChangeTaskStatusButton>
									<ChangeTaskStatusButton
										task={task}
										fromStatus="InProgress"
										toStatus="Complete"
										unselectTask={unselectTask}
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
										unselectTask={unselectTask}
									>
										<Heading paddingBottom="4" fontSize="lg">
											Resume Task
										</Heading>
									</ChangeTaskStatusButton>
								</Box>
							)}
						</ModalBody>
						{/* Complete: #1 Add Edit Functionality */}
						<ModalFooter>
							<Popover>
								<PopoverTrigger>
									<Button>Edit</Button>
								</PopoverTrigger>
								<PopoverContent>
									<PopoverHeader>Edit Task Name</PopoverHeader>
									<PopoverCloseButton />
									<PopoverBody>
										<Formik
											initialValues={{
												name: task.name,
												description: task.description,
												dueDate: null,
											}}
											onSubmit={(values, actions) => {
												actions.setSubmitting(true);
												updateTask(task, {
													name: values.name,
													description: values.description,
													dueDate: values.dueDate,
												}).then(() => {
													actions.setSubmitting(false);
													unselectTask();
													toast({
														title: "Task Updated Successfully",
														status: "success",
														duration: 5000,
														isClosable: toast,
														position: "top",
													});
												});
											}}
										>
											{({
												values,
												handleChange,
												handleBlur,
												handleSubmit,
												isSubmitting,
												setFieldValue,
											}) => (
												<Form onSubmit={handleSubmit}>
													<Input
														type="text"
														name="name"
														value={values.name}
														onBlur={handleBlur}
														onChange={handleChange}
													/>
													<Textarea
														type="text"
														name="description"
														value={values.description}
														onBlur={handleBlur}
														onChange={handleChange}
													/>
													<DatePicker
														label="Due Date"
														name="dueDate"
														placeholderText='Due Date'
														selected={values.dueDate}
														onChange={(date) => setFieldValue("dueDate", date)}
													/>
													<Button
														type="submit"
														loading={isSubmitting}
														disabled={isSubmitting}
													>
														Update Task
													</Button>
												</Form>
											)}
										</Formik>
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
