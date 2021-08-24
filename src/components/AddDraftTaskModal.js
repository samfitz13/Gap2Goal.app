import React from "react";
import {
	Box,
	Button,
	HStack,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	VStack,
	Textarea,
} from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import { Formik } from "formik";

import useTaskMutations from "../graphql/useTaskMutations";

export function AddDraftTaskModal(props) {
	const { addTask } = useTaskMutations(props.currentProject);

	return (
		<Modal isOpen={props.isOpen} onClose={props.onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add Task</ModalHeader>
				<ModalCloseButton onClick={props.onClose} />
				<ModalBody>
					<Formik
						initialValues={{
							name: "",
							description: "",
						}}
						onSubmit={(values) => {
							addTask(values);
							props.onClose();
						}}
					>
						{({ values, handleChange, handleSubmit }) => (
							<VStack spacing={4}>
								<Input
									label="Task Name"
									placeholder="Task Name"
									name="name"
									onChange={handleChange}
									value={values.name}
								/>
								<Textarea
									label="Task Description"
									placeholder="Task Description"
									name="description"
									onChange={handleChange}
									value={values.description}
								/>
								<Box justify="center" direction="row-responsive">
									<HStack spacing={4}>
										<Button
											disabled={!values.name}
											colorScheme="blue"
											onClick={handleSubmit}
										>
											Add
										</Button>
										<Button
											rightIcon={<FiTrash2 />}
											colorScheme="red"
											onClick={props.onClose}
										>
											Cancel
										</Button>
									</HStack>
								</Box>
							</VStack>
						)}
					</Formik>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
