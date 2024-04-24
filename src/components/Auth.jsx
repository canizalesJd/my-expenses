import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Input,
	Button,
} from "@nextui-org/react";

export default function Auth() {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");

	const handleLogin = async (event) => {
		event.preventDefault();

		setLoading(true);
		const { error } = await supabase.auth.signInWithOtp({ email });

		if (error) {
			alert(error.error_description || error.message);
		} else {
			alert("Check your email for the login link!");
		}
		setLoading(false);
	};

	return (
		<div className="flex max-h-screen h-screen w-full justify-center items-center">
			<Card className="w-[400px] p-5 bg-zinc-900" shadow="md">
				<CardHeader>
					<h2 className="text-2xl font-semibold">Sign In</h2>
				</CardHeader>
				<CardBody>
					<Input
						isRequired
						type="email"
						label="Email"
						defaultValue="Your email"
						className="max-w-xs"
						value={email}
						required={true}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</CardBody>
				<CardFooter>
					<Button onClick={handleLogin} color="primary">
						{loading ? <span>Loading</span> : <span>Send magic link</span>}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
