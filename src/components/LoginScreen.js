/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import * as Realm from "realm-web";
import validator from "validator";
import { Lock, User } from "grommet-icons";
import {
	Box,
	Button,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	Link,
	Spinner,
	Text,
	useColorModeValue,
	Stack,
	InputRightElement,
} from "@chakra-ui/react";

import { useRealmApp } from "../RealmApp";

export default function LoginScreen() {
	const app = useRealmApp();
	// Toggle between logging users in and registering new users
	const [mode, setMode] = React.useState("login");
	const toggleMode = () => {
		setMode((oldMode) => (oldMode === "login" ? "register" : "login"));
	};
	// Keep track of form input state
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [show, setShow] = React.useState(false);
	// Keep track of input validation/errors
	const [error, setError] = React.useState({});
	// Whenever the mode changes, clear the form inputs
	React.useEffect(() => {
		setEmail("");
		setPassword("");
		setError({});
	}, [mode]);

	const [isLoggingIn, setIsLoggingIn] = React.useState(false);
	const handleLogin = async () => {
		setIsLoggingIn(true);
		setError((e) => ({ ...e, password: null }));
		try {
			await app.logIn(Realm.Credentials.emailPassword(email, password));
		} catch (err) {
			handleAuthenticationError(err, setError);
		}
	};

	const handleRegistrationAndLogin = async () => {
		const isValidEmailAddress = validator.isEmail(email);
		setError((e) => ({ ...e, password: null }));
		if (isValidEmailAddress) {
			try {
				// Register the user and, if successful, log them in
				await app.emailPasswordAuth.registerUser(email, password);
				return await handleLogin();
			} catch (err) {
				handleAuthenticationError(err, setError);
			}
		} else {
			setError((err) => ({ ...err, email: "Email is invalid." }));
		}
	};

	return (
		<Box
			bg={useColorModeValue("gray.50", "inherit")}
			minH="100vh"
			py="12"
			px={{ base: "4", lg: "8" }}
		>
			{isLoggingIn ? (
				<Box align="center" justify="center">
					<Spinner size="lg" thickness="4px" speed="0.65s" />
				</Box>
			) : (
				<Box maxW="md" mx="auto">
					<Heading textAlign="center" size="xl" fontWeight="extrabold">
						{mode === "login" ? "Log In" : "Register"}
					</Heading>
					<br /> <br />
					<Box
						bg={useColorModeValue("white", "gray.700")}
						py="8"
						px={{ base: "4", md: "10" }}
						shadow="base"
						rounded={{ sm: "lg" }}
					>
						<Stack spacing="6">
							<InputGroup>
								<InputLeftElement
									pointerEvents="none"
									children={<User color="gray.300" />}
								/>
								<Input
									required
									autoComplete="email"
									placeholder="your.email@example.com"
									onChange={(e) => {
										setError((e) => ({ ...e, email: null }));
										setEmail(e.target.value);
									}}
									value={email}
									type="email"
									name="Email"
									state={
										error.email
											? "error"
											: validator.isEmail(email)
											? "valid"
											: "none"
									}
									errorMessage={error.email}
								/>
							</InputGroup>
							<InputGroup>
								<InputLeftElement
									pointerEvents="none"
									children={<Lock color="gray.300" />}
								/>
								<Input
									pr="4.5rem"
									placeholder="Enter Password"
									onChange={(e) => {
										setPassword(e.target.value);
									}}
									type={show ? "text" : "password"}
									label="Password"
									value={password}
									state={
										error.password ? "error" : error.password ? "valid" : "none"
									}
									errorMessage={error.password}
								/>
								<InputRightElement width="4.5rem">
									<Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
										{show ? "Hide" : "Show"}
									</Button>
								</InputRightElement>
							</InputGroup>
							<Button
								colorScheme="blue"
								size="lg"
								fontSize="md"
								onClick={
									mode === "login"
										? () => handleLogin()
										: () => handleRegistrationAndLogin()
								}
							>
								{mode === "login" ? "Log In" : "Register"}
							</Button>
						</Stack>
					</Box>
					<Box>
						<Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
							<Text as="span">
								{mode === "login"
									? "Don't have an account?"
									: "Already have an account?"}
							</Text>
							<Link
								marginStart="1"
								color={useColorModeValue("blue.500", "blue.200")}
								_hover={{ color: useColorModeValue("blue.600", "blue.300") }}
								display={{ base: "block", sm: "inline" }}
								onClick={(e) => {
									e.preventDefault();
									toggleMode();
								}}
							>
								{mode === "login" ? "Register one now." : "Log in instead."}
							</Link>
						</Text>
					</Box>
				</Box>
			)}
		</Box>
	);
}

const handleAuthenticationError = (err, setError) => {
	const { status, message } = parseAuthenticationError(err);
	const errorType = message || status;
	switch (errorType) {
		case "invalid username":
			setError((prevErr) => ({ ...prevErr, email: "Invalid email address." }));
			break;
		case "invalid username/password":
		case "invalid password":
		case "401":
			setError((err) => ({ ...err, password: "Incorrect password." }));
			break;
		case "name already in use":
		case "409":
			setError((err) => ({ ...err, email: "Email is already registered." }));
			break;
		case "password must be between 6 and 128 characters":
		case "400":
			setError((err) => ({
				...err,
				password: "Password must be between 6 and 128 characters.",
			}));
			break;
		default:
			break;
	}
};

function parseAuthenticationError(err) {
	const parts = err.message.split(":");
	const reason = parts[parts.length - 1].trimStart();
	if (!reason) return { status: "", message: "" };
	const reasonRegex = /(?<message>.+)\s\(status (?<status>[0-9][0-9][0-9])/;
	const match = reason.match(reasonRegex);
	const { status, message } = match?.groups ?? {};
	return { status, message };
}
