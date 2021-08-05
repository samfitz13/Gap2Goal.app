import React from "react";
import {
	Box,
	Button,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
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
	const {
		teamMembers,
		errorMessage,
		addTeamMember,
		removeTeamMember,
	} = useTeamMembers();

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
					<Text>
						These users can add, read, modify, and delete tasks in your project
					</Text>
					<Text>
						Add a new user by email:
					</Text>
					<AddTeamMemberInput
						addTeamMember={addTeamMember}
						errorMessage={errorMessage}
					/>
					<Box>
						{teamMembers?.length ? (
							teamMembers.map((teamMember, i) => {
								return (
									<Button
										secondary
										reverse
										margin="small"
										size="small"
										color={`accent-${(i + 1) % 4}`}
										onClick={async () => {
											await removeTeamMember(teamMember.name);
										}}
									>{teamMember.name}</Button>
								);
							})
						) : (
							<Text size="small" margin="xsmall">
								No team members
							</Text>
						)}
					</Box>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}

const AddTeamMemberInput = ({ addTeamMember, errorMessage }) => {
	const [inputValue, setInputValue] = React.useState("");
	return (
		<Box>
				<Input
					type="email"
					placeholder="some.email@example.com"
					onChange={(e) => {
						setInputValue(e.target.value);
					}}
					value={inputValue}
				/>
				<Button
					disabled={!inputValue}
					onClick={async () => {
						const result = await addTeamMember(inputValue);
						if (!result?.error) {
							setInputValue("");
						}
					}}
				>Add to Project</Button>
		</Box>
	);
};
