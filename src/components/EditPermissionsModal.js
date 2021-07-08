import React from "react";
import {
	Box,
	Button,
	Form,
	FormField,
	Heading,
	Layer,
	Text,
	TextInput,
} from "grommet";
import { Close } from "grommet-icons";

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
		<Box>
			{isEditingPermissions && (
				<Layer
					responsive
					modal
					animate="fadeIn"
					onEsc={handleCancel}
					onClickOutside={handleCancel}
				>
					<Box pad="medium">
						<Heading level={2}>Team Members</Heading>
						<Text size="small" margin="xsmall">
							These users can add, read, modify, and delete tasks in your
							project
						</Text>
						<Text margin="xsmall" size="small">
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
											margin='small'
											label={teamMember.name}
											icon={<Close />}
											size="small"
											color={`accent-${(i + 1) % 4}`}
											onClick={async () => {
												await removeTeamMember(teamMember.name);
											}}
										/>
									);
								})
							) : (
								<Text size="small" margin="xsmall">
									No team members
								</Text>
							)}
						</Box>
					</Box>
				</Layer>
			)}
		</Box>
	);
}

const AddTeamMemberInput = ({ addTeamMember, errorMessage }) => {
	const [inputValue, setInputValue] = React.useState("");
	return (
		<Form>
			<FormField>
				<TextInput
					type="email"
					placeholder="some.email@example.com"
					onChange={(e) => {
						setInputValue(e.target.value);
					}}
					value={inputValue}
				/>
			</FormField>
			<FormField>
				<Button
					primary
					label="Add to Project"
					disabled={!inputValue}
					onClick={async () => {
						const result = await addTeamMember(inputValue);
						if (!result?.error) {
							setInputValue("");
						}
					}}
				/>
			</FormField>
		</Form>
	);
};
