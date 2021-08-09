import React from "react";
import {
	Avatar,
	Box,
	Button,
	Center,
	DrawerBody,
	DrawerCloseButton,
	DrawerHeader,
	Flex,
	Heading,
	Icon,
	Image,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";

import { useRealmApp } from "../RealmApp";
import { UserDetails } from "./UserDetails";
import useProjects from "../graphql/useProjects";

const MobileSidebar = (
	{ currentProject, setCurrentProject, setIsEditingPermissions },
	props
) => {
	const projects = useProjects();
	const app = useRealmApp();

	return (
		<Box>
			<DrawerHeader>
				<Heading>Gap2Goal.app</Heading>
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
