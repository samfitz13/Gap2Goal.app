import React from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

import { useRealmApp } from "../RealmApp";
import useProjects from "../graphql/useProjects";
import { UserDetails } from "./UserDetails";
import Logo from "./Logo";

const Sidebar = (
	{ currentProject, setCurrentProject, setIsEditingPermissions },
	props
) => {
	const projects = useProjects();
	const app = useRealmApp();
	const selectedProjectColor = useColorModeValue("gray.300", "gray.700");
	const selectedProjectTextColor = useColorModeValue("black", "white");

	return (
		<Box
			as="nav"
			pos="fixed"
			top="0"
			left="0"
			zIndex="sticky"
			h="full"
			pb="10"
			overflowX="hidden"
			overflowY="auto"
			bg={useColorModeValue("gray.100", "gray.900")}
			borderColor="blackAlpha.300"
			borderRightWidth="1px"
			w={{ base: "0", md: 60 }}
			{...props}
		>
			<Flex px="4" py="5" align="center">
				<Logo />
			</Flex>
			<Flex
				direction="column"
				as="nav"
				fontSize="sm"
				color="gray.600"
				aria-label="Nav"
			>
				<Box>
					{projects.map((project) => (
						<Flex
							align="center"
							px="4"
							mx="2"
							my="2"
							rounded="md"
							py="3"
							cursor="pointer"
							bg={
								project.partition === currentProject.partition
									? selectedProjectColor
									: null
							}
							color={
								project.partition === currentProject.partition
									? selectedProjectTextColor
									: null
							}
							onClick={() => setCurrentProject(project)}
							_hover={{
								bg: "blackAlpha.300",
								color: "whiteAlpha.900",
							}}
							role="group"
							fontWeight="semibold"
							transition=".15s ease"
						>
							{project.name}
						</Flex>
					))}
				</Box>
				<UserDetails
					user={app.currentUser}
					handleEditPermissions={() => setIsEditingPermissions(true)}
				/>
			</Flex>
		</Box>
	);
};

export default Sidebar;
