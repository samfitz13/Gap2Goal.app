import {
	Box,
	Button,
	chakra,
	CloseButton,
	Flex,
	Heading,
	HStack,
	Icon,
	IconButton,
	Link,
	useColorMode,
	useColorModeValue,
	useDisclosure,
	VStack,
} from "@chakra-ui/react";
import { AiFillGithub, AiOutlineMenu } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useViewportScroll } from "framer-motion";
import React from "react";
import { useRealmApp } from "../RealmApp";

export default function Header() {
  const app = useRealmApp();
	const mobileNav = useDisclosure();

	const { toggleColorMode: toggleMode } = useColorMode();
	const text = useColorModeValue("dark", "light");
	const SwitchIcon = useColorModeValue(FaMoon, FaSun);

	const bg = useColorModeValue("white", "gray.800");
	const ref = React.useRef();
	const [y, setY] = React.useState(0);
	const { height = 0 } = ref.current ? ref.current.getBoundingClientRect() : {};

	const { scrollY } = useViewportScroll();
	React.useEffect(() => {
		return scrollY.onChange(() => setY(scrollY.get()));
	}, [scrollY]);

	const MobileNavContent = (
		<VStack
			pos="absolute"
			top={0}
			left={0}
			right={0}
			display={mobileNav.isOpen ? "flex" : "none"}
			flexDirection="column"
			p={2}
			pb={4}
			m={2}
			bg={bg}
			spacing={3}
			rounded="sm"
			shadow="sm"
		>
			<CloseButton
				aria-label="close menu"
				justifySelf="self-start"
				onClick={mobileNav.onClose}
			/>
			<Button onClick={() => {
							app.logOut();
						}}>Sign Out</Button>
		</VStack>
	);

	return (
		<Box pos="relative">
			<chakra.header
				ref={ref}
				shadow={y > height ? "sm" : undefined}
				transition="box-shadow 0.2s"
				bg={bg}
				borderTop="6px solid"
				borderTopColor="brand.400"
				w="full"
				overflowY="hidden"
			>
				<chakra.div h="4.5rem" mx="auto" maxW="1200px">
					<Flex w="full" h="full" px="6" align="center" justify="space-between">
						<Flex align="center">
							<HStack>
								<Heading>Gap2Goal</Heading>
							</HStack>
						</Flex>

						<Flex
							justify="flex-end"
							w="full"
							maxW="824px"
							align="center"
							color="gray.400"
						>
							<HStack spacing="5" display={{ base: "none", md: "flex" }}>
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
							</HStack>
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
							<Button >Log Out</Button>
							<IconButton
								display={{ base: "flex", md: "none" }}
								aria-label="Open menu"
								fontSize="20px"
								color={useColorModeValue("gray.800", "inherit")}
								variant="ghost"
								icon={<AiOutlineMenu />}
								onClick={mobileNav.onOpen}
							/>
						</Flex>
					</Flex>
					{MobileNavContent}
				</chakra.div>
			</chakra.header>
		</Box>
	);
}
