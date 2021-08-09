import React from "react";
import {
	Box,
	Button,
	Drawer,
	DrawerContent,
	DrawerOverlay,
	Flex,
	Icon,
	IconButton,
	Link,
	useColorMode,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiMenu, FiLogOut } from "react-icons/fi";

import { useRealmApp } from "./RealmApp";
import ProjectScreen from "./components/ProjectScreen";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import MobileSidebar from "./components/MobileSidebar";

export default function TaskApp() {
	const app = useRealmApp();
	const sidebar = useDisclosure();
	const [currentProject, setCurrentProject] = React.useState(
		// set the current project as  "My Project"
		app.currentUser.customData.memberOf[0]
	);
	const [isEditingPermissions, setIsEditingPermissions] = React.useState(false);
	const text = useColorModeValue("dark", "light");
	const SwitchIcon = useColorModeValue(FaMoon, FaSun);
	const { toggleColorMode: toggleMode } = useColorMode();

	return (
		<Box
			as="section"
			bg={useColorModeValue("gray.50", "gray.700")}
			minH="100vh"
		>
			<Sidebar
				display={{ base: "none", md: "unset" }}
				currentProject={currentProject}
				setCurrentProject={setCurrentProject}
				setIsEditingPermissions={setIsEditingPermissions}
			/>
			<Drawer
				isOpen={sidebar.isOpen}
				onClose={sidebar.onClose}
				onEsc={sidebar.onClose}
				placement="left"
			>
				<DrawerOverlay />
				<DrawerContent>
					<MobileSidebar
						currentProject={currentProject}
						setCurrentProject={setCurrentProject}
						setIsEditingPermissions={setIsEditingPermissions}
					/>
				</DrawerContent>
			</Drawer>
			<Box ml={{ base: 0, md: 60 }} transition=".3s ease">
				<Flex
					as="header"
					align="center"
					justify="space-between"
					w="full"
					px="4"
					bg={useColorModeValue("white", "gray.800")}
					borderBottomWidth="1px"
					borderColor="blackAlpha.300"
					h="14"
				>
					<IconButton
						aria-label="menu"
						display={{ base: "inline-flex", md: "none" }}
						onClick={sidebar.onOpen}
						icon={<FiMenu />}
						size="sm"
					/>
					<Flex
						justify="flex-end"
						w="full"
						maxW="824px"
						align="center"
						color="gray.400"
					>
						<Flex align="center">
							<Link isExternal aria-label="GitHub" href="">
								<Icon
									as={AiFillGithub}
									display="block"
									transition="color 0.2s"
									w="5"
									h="5"
									_hover={{ color: "gray.600" }}
								/>
							</Link>
						</Flex>
						<IconButton
							size="md"
							fontSize="lg"
							aria-label={`Switch to ${text} mode`}
							variant="ghost"
							color="current"
							ml={{ base: "0", md: "3" }}
							onClick={toggleMode}
							icon={<SwitchIcon />}
						/>
						<Button
							onClick={() => {
								app.logOut();
							}}
							colorScheme='blue'
							rightIcon={<FiLogOut />}
						>
							Log Out
						</Button>
					</Flex>
				</Flex>
				<Flex direction='column' as="main" p="4" >
					<ProjectScreen
						currentProject={currentProject}
						isEditingPermissions={isEditingPermissions}
						setIsEditingPermissions={setIsEditingPermissions}
					/>
					<Footer />
				</Flex>
			</Box>
		</Box>
	);
}
