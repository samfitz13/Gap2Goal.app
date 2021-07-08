import React from "react";
import { Anchor, Box, Heading, Text } from "grommet";

import { useRealmApp } from "../RealmApp";
import useProjects from "../graphql/useProjects";

export default function Sidebar({
	currentProject,
	setCurrentProject,
	setIsEditingPermissions,
}) {
	const projects = useProjects();
	const app = useRealmApp();

	return (
		<Box round width="small" background="light-2" elevation="small">
			<Heading margin="small" level={4}>
				My Goals
			</Heading>
			<Box>
				{projects.map((project) => (
					<Box
						wrap
						pad="small"
						hoverIndicator
						onClick={() => setCurrentProject(project)}
						background={
							project.partition === currentProject?.partition
								? "light-5"
								: "light-2"
						}
					>
						<Text
							size="small"
							weight={
								project.partition === currentProject?.partition
									? "bold"
									: "normal"
							}
						>
							{project.name}
						</Text>
					</Box>
				))}
			</Box>
			<UserDetails
				user={app.currentUser}
				handleLogout={() => {
					app.logOut();
				}}
				handleEditPermissions={() => {
					setIsEditingPermissions(true);
				}}
			/>
		</Box>
	);
}

function UserDetails({ user, handleLogout, handleEditPermissions }) {
	return (
		<Box>
			<Heading margin="xsmall" textAlign="center" level={6}>
				{user.profile.email}
			</Heading>
			<Anchor
				margin="xsmall"
				alignSelf="center"
				onClick={handleEditPermissions}
			>
				Manage My Project
			</Anchor>
			<Anchor margin="xsmall" alignSelf="center" onClick={handleLogout}>
				Log Out
			</Anchor>
		</Box>
	);
}
