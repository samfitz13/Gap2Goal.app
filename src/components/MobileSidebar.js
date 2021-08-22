import React from "react";
import {
	Box,
	Button,
	DrawerBody,
	DrawerCloseButton,
	DrawerHeader,
} from "@chakra-ui/react";

import { useRealmApp } from "../RealmApp";
import { UserDetails } from "./UserDetails";
import useProjects from "../graphql/useProjects";
import Logo from "./Logo";

const MobileSidebar = (
	{ currentProject, setCurrentProject, setIsEditingPermissions },
	props
) => {
	const projects = useProjects();
	const app = useRealmApp();

	return (
		<Box>
			<DrawerHeader>
				<Logo />
				<DrawerCloseButton />
			</DrawerHeader>
			<DrawerBody>
				{projects.map((project) => (
					<Button
						key={project._id}
						onClick={() => setCurrentProject(project)}
						align="center"
						my={2}
						w="full"
						colorScheme={project.partition === currentProject.partition ? "blue" : null}
						fontWeight="semibold"
					>
						{project.name}
					</Button>
				))}
				<UserDetails
					user={app.currentUser}
					handleEditPermissions={() => setIsEditingPermissions(true)}
				/>
			</DrawerBody>
		</Box>
	);
};

export default MobileSidebar;
