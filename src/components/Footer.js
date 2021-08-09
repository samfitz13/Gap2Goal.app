import {
	Box,
	Button,
	Container,
	Spacer,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import React from "react";

export default function Footer() {
	return (
		<Box
			bg={useColorModeValue("gray.50", "gray.900")}
			color={useColorModeValue("gray.700", "gray.200")}
		>
			<Container
				as={Stack}
				maxW={"6xl"}
				py={4}
				direction={{ base: "column", md: "row" }}
				spacing={4}
				justify={{ base: "center", md: "space-between" }}
				align={{ base: "center", md: "center" }}
			>
				<Text>Made by samfitz. All rights reserved</Text>
				<Spacer />
				<Stack direction={"row"} spacing={6}>
					<Button
						bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
						rounded={"full"}
						w={12}
						h={12}
						cursor={"pointer"}
						as={"a"}
						href="https://www.twitter.com/therealsamfitz"
						display={"inline-flex"}
						alignItems={"center"}
						justifyContent={"center"}
						transition={"background 0.3s ease"}
						_hover={{
							bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
						}}
					>
						<FaTwitter />
					</Button>
					<Button
						bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
						rounded={"full"}
						w={12}
						h={12}
						cursor={"pointer"}
						as={"a"}
						href="https://www.github.com/samfitz13"
						display={"inline-flex"}
						alignItems={"center"}
						justifyContent={"center"}
						transition={"background 0.3s ease"}
						_hover={{
							bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
						}}
					>
						<FaGithub />
					</Button>
					<Button
						bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
						rounded={"full"}
						w={12}
						h={12}
						cursor={"pointer"}
						as={"a"}
						href="https://www.instagram.com/therealsamfitz"
						display={"inline-flex"}
						alignItems={"center"}
						justifyContent={"center"}
						transition={"background 0.3s ease"}
						_hover={{
							bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
						}}
					>
						<FaInstagram />
					</Button>
					<Button
						bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
						rounded={"full"}
						w={12}
						h={12}
						cursor={"pointer"}
						as={"a"}
						href="https://www.linkedin.com/in/samfitzofficial"
						display={"inline-flex"}
						alignItems={"center"}
						justifyContent={"center"}
						transition={"background 0.3s ease"}
						_hover={{
							bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
						}}
					>
						<FaLinkedin />
					</Button>
				</Stack>
			</Container>
		</Box>
	);
}
