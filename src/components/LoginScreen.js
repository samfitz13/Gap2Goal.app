import React from "react";
import * as Realm from "realm-web";
import validator from "validator";
import { Lock, User } from "grommet-icons";
import {
	Anchor,
	Box,
	Button,
	Form,
	FormField,
	Heading,
	Spinner,
	Text,
	TextInput,
} from "grommet";

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
		<Box responsive>
			{isLoggingIn ? (
				<Box margin='xlarge' align="center" justify="center">
					<Spinner size='large' />
				</Box>
			) : (
				<Box
					pad="medium"
					round
					background="light-2"
					alignSelf="center"
					margin="large"
				>
					<Heading level="2">
						{mode === "login" ? "Log In" : "Register"}
					</Heading>
					<Form name="login" className="login-form" onFinish={handleLogin}>
						<FormField name="username" required>
							<TextInput
								plain
								focusIndicator
								icon={<User />}
								name="Email"
								placeholder="your.email@example.com"
								onChange={(e) => {
									setError((e) => ({ ...e, email: null }));
									setEmail(e.target.value);
								}}
								value={email}
								// state={
								// 	error.email
								// 		? "error"
								// 		: validator.isEmail(email)
								// 		? "valid"
								// 		: "none"
								// }
								// errorMessage={error.email}
							/>
						</FormField>
						<FormField name="password" required>
							<TextInput
								plain
								icon={<Lock />}
								type="password"
								label="Password"
								placeholder="Password"
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								// onPressEnter={
								// 	mode === "login" ? handleLogin : handleRegistrationAndLogin
								// }
								value={password}
								state={
									error.password ? "error" : error.password ? "valid" : "none"
								}
								//errorMessage={error.password}
							/>
						</FormField>
						<FormField>
							{mode === "login" ? (
								<Button primary label="Log In" onClick={() => handleLogin()} />
							) : (
								<Button
									primary
									label="Register"
									onClick={() => handleRegistrationAndLogin()}
								/>
							)}
						</FormField>
					</Form>
					<Box>
						<Text>
							{mode === "login"
								? "Don't have an account?"
								: "Already have an account?"}
						</Text>
						<Anchor
							onClick={(e) => {
								e.preventDefault();
								toggleMode();
							}}
						>
							{mode === "login" ? "Register one now." : "Log in instead."}
						</Anchor>
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
