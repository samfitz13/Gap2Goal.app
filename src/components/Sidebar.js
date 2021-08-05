import React from "react";
import {
	Avatar,
	Box,
	Button,
	Center,
	Flex,
	Heading,
	Image,
	Link,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";

import { useRealmApp } from "../RealmApp";
import useProjects from "../graphql/useProjects";

function UserDetails({ user, handleLogout, handleEditPermissions }) {
	return (
		<Center py={6}>
			<Box
				maxW={"270px"}
				w={"full"}
				bg={useColorModeValue("white", "gray.800")}
				boxShadow={"2xl"}
				rounded="md"
				overflow="hidden"
				p="5"
			>
				<Image
					h={"120px"}
					w={"full"}
					src={
						"https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
					}
					objectFit={"cover"}
				/>
				<Flex justify={"center"} mt={-12}>
					<Avatar
						size={"xl"}
						alt={"Author"}
						css={{
							border: "2px solid white",
						}}
					/>
				</Flex>
				<Box p={6}>
					<Stack spacing={2} align="center" mb={5}>
						<Heading fontSize="2xl" fontWeight={500} fontFamily="body">
							{user.profile.email}
						</Heading>
						<Button onClick={handleEditPermissions}>Manage My Project</Button>
						<br />
						<Button onClick={handleLogout}>Log Out</Button>
					</Stack>
				</Box>
			</Box>
		</Center>
	);
}

const Sidebar = (
	{ currentProject, setCurrentProject, setIsEditingPermissions },
	props
) => {
	const projects = useProjects();
	const app = useRealmApp();

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
			w={{ base: "full", md: 60 }}
			{...props}
		>
			<Flex px="4" py="5" align="center">
				<Text fontSize="lg" fontWeight="extrabold">
					Gap2Goal.app
				</Text>
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
						<>
							<Link
								style={{ textDecoration: "none" }}
								onClick={() => setCurrentProject(project)}
							>
								<Flex
									align="center"
									p="4"
									mx="4"
									borderRadius="lg"
									role="group"
									cursor="pointer"
									_hover={{
										bg: "teal.400",
										color: "white",
									}}
								>
									<Text
										fontWeight={
											project.name === currentProject ? "bold" : "normal"
										}
									>
										{project.name}
									</Text>
								</Flex>
							</Link>
						</>
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
			</Flex>
		</Box>
	);
};

export default Sidebar;
