import React from "react";
import {
	Button,
	Input,
	InputGroup,
	InputRightElement,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Tag,
	TagCloseButton,
	TagLabel,
	Text,
	VStack,
	Wrap,
	WrapItem,
} from "@chakra-ui/react";

import { useRealmApp } from "../RealmApp";

const useTeamMembers = () => {
	const [teamMembers, setTeamMembers] = React.useState(null);
	const [newUserEmailError, setNewUserEmailError] = React.useState(null);
	const app = useRealmApp();
	const { addTeamMember, removeTeamMember, getMyTeamMembers } = app.functions;
	const updateTeamMembers = () => {
		getMyTeamMembers().then(setTeamMembers);
	};
	// display team members on load
	React.useEffect(updateTeamMembers, []);
	return {
		teamMembers,
		errorMessage: newUserEmailError,
		addTeamMember: async (email) => {
			const { error } = await addTeamMember(email);
			if (error) {
				setNewUserEmailError(error);
				return { error };
			} else {
				updateTeamMembers();
			}
		},
		removeTeamMember: async (email) => {
			await removeTeamMember(email);
			updateTeamMembers();
		},
	};
};

export default function EditPermissionsModal({
	isEditingPermissions,
	setIsEditingPermissions,
}) {
	const { teamMembers, errorMessage, addTeamMember, removeTeamMember } =
		useTeamMembers();

	const handleCancel = () => {
		setIsEditingPermissions(false);
	};

	return (
		<Modal isOpen={isEditingPermissions} onClose={handleCancel}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Team Members</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack spacing="4" align="start">
						<Text>
							These users can add, read, modify, and delete tasks in your
							project
						</Text>
						<Text>Add a new user by email:</Text>
						<AddTeamMemberInput
							addTeamMember={addTeamMember}
							errorMessage={errorMessage}
						/>
						<Wrap spacing="30px" justify="center">
							{teamMembers?.length ? (
								teamMembers.map((teamMember, i) => {
									return (
										<WrapItem>
											<Tag key={i} size="md" borderRadius="full">
												<TagLabel>{teamMember.name}</TagLabel>
												<TagCloseButton
													onClick={async () => {
														await removeTeamMember(teamMember.name);
													}}
												/>
											</Tag>
										</WrapItem>
									);
								})
							) : (
								<Text size="small" margin="xsmall">
									No team members
								</Text>
							)}
						</Wrap>
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}

const AddTeamMemberInput = ({ addTeamMember, errorMessage }) => {
	const [inputValue, setInputValue] = React.useState("");
	return (
		<InputGroup>
			<Input
				type="email"
				placeholder="some.email@example.com"
				onChange={(e) => {
					setInputValue(e.target.value);
				}}
				value={inputValue}
			/>
			<InputRightElement width="4.5rem">
				<Button
					disabled={!inputValue}
					h="1.75rem"
					size="sm"
					onClick={async () => {
						const result = await addTeamMember(inputValue);
						if (!result?.error) {
							setInputValue("");
						}
					}}
				>
					Add
				</Button>
			</InputRightElement>
		</InputGroup>
	);
};
