/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import * as Realm from "realm-web";
import validator from "validator";
import {
	Box,
	Button,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Link,
	Text,
	useColorModeValue,
	Stack,
	FormErrorMessage,
	FormControl,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";

import Logo from "./Logo";
import { useRealmApp } from "../RealmApp";

export default function LoginScreen() {
	const app = useRealmApp();

	// Toggle between logging users in and registering new users
	const [mode, setMode] = React.useState("login");
	const toggleMode = () => {
		setMode((oldMode) => (oldMode === "login" ? "register" : "login"));
	};

	const [show, setShow] = React.useState(false);

	const [error, setError] = React.useState({}); // Keep track of input validation/errors
	// Whenever the mode changes, clear the form inputs
	React.useEffect(() => {
		setError({});
	}, [mode]);

	const handleLogin = async (userData) => {
		setError((e) => ({ ...e, password: null }));
		try {
			await app.logIn(
				Realm.Credentials.emailPassword(userData.email, userData.password)
			);
		} catch (err) {
			handleAuthenticationError(err, setError);
		}
	};

	const handleRegistrationAndLogin = async (userData) => {
		const isValidEmailAddress = validator.isEmail(userData.email);
		setError((e) => ({ ...e, password: null }));
		if (isValidEmailAddress) {
			try {
				// Register the user and, if successful, log them in
				await app.emailPasswordAuth.registerUser(
					userData.email,
					userData.password
				);
				return await handleLogin(userData);
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
			align="center"
			py="12"
			px={{ base: "4", lg: "8" }}
			minH="100vh"
		>
			<Box maxW="md" mx="auto">
				<Logo />
				<Heading pt="8" textAlign="center" size="xl" fontWeight="extrabold">
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
					<Formik
						initialValues={{ email: "", password: "" }}
						onSubmit={(values, actions) => {
							actions.setSubmitting(true);
							mode === "login"
								? handleLogin(values)
								: handleRegistrationAndLogin(values);
							actions.setSubmitting(false);
						}}
					>
						{({
							values,
							handleChange,
							handleBlur,
							handleSubmit,
							isSubmitting,
						}) => (
							<Form onSubmit={handleSubmit}>
								<Stack spacing="6">
									<FormControl isInvalid={error.email}>
										<Input
											type="email"
											name="email"
											placeholder="your.email@example.com"
											value={values.email}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										<FormErrorMessage>{error.email}</FormErrorMessage>
									</FormControl>
									<FormControl isInvalid={error.password}>
										<InputGroup>
											<Input
												type={show ? "text" : "password"}
												name="password"
												placeholder="Enter Password"
												value={values.password}
												onChange={handleChange}
												onBlur={handleBlur}
												pr="4.5rem"
											/>
											<InputRightElement width="4.5rem">
												<Button
													h="1.75rem"
													size="sm"
													onClick={() => setShow(!show)}
												>
													{show ? "Hide" : "Show"}
												</Button>
											</InputRightElement>
										</InputGroup>
										<FormErrorMessage>{error.password}</FormErrorMessage>
									</FormControl>
									<Button
										type="submit"
										isLoading={isSubmitting}
										colorScheme="blue"
										size="lg"
										fontSize="md"
									>
										{mode === "login" ? "Log In" : "Register"}
									</Button>
								</Stack>
							</Form>
						)}
					</Formik>
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
