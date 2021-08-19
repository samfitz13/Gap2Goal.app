import React from "react";
import {
	Box,
	DrawerBody,
	DrawerCloseButton,
	DrawerHeader,
	Flex,
	Heading,
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
		<Box height='100vh'>
			<DrawerHeader>
				<Logo />
				<DrawerCloseButton />
			</DrawerHeader>
			<DrawerBody>
				{projects.map((project) => (
					<Flex
						align="center"
						p="4"
						mx="2"
						role="group"
						fontWeight="semibold"
						outline=""
						onClick={() => setCurrentProject(project)}
					>
						{project.name}
					</Flex>
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
