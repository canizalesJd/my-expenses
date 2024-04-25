import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Input, Button, Spinner } from "@nextui-org/react";
import GoogleIcon from "./icons/GoogleIcon";

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
		<div className="grid md:grid-cols-2 min-h-screen w-full gap-9">
			<div className="p-10 flex flex-col justify-evenly bg-zinc-950 max-w-lg">
				<div className="absolute top-10">
					<h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
						MyExpenses
					</h1>
				</div>
				<div className="max-w-md">
					<div className="mb-10">
						<h2 className="text-3xl font-semibold">Welcome back</h2>
						<p className="text-lg text-foreground-500">
							Enter your credentials to continue
						</p>
					</div>
					<Input
						isRequired
						type="email"
						label="Email"
						placeholder="johndoe@email.com"
						labelPlacement="outside"
						className="w-full max-w-full"
						value={email}
						required={true}
						variant="bordered"
						radius="sm"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Button
						radius="sm"
						onClick={handleLogin}
						color="primary"
						size="md"
						className="w-full mt-5 max-w-full">
						{loading ? (
							<div className="flex gap-2">
								Loading
								<Spinner color="white" size="sm" />
							</div>
						) : (
							"Continue with email"
						)}
					</Button>
					<span className="flex items-center my-5">
						<span className="h-px flex-1 bg-foreground-200"></span>
						<span className="shrink-0 px-3 text-foreground-400 text-sm">
							OR
						</span>
						<span className="h-px flex-1 bg-foreground-200"></span>
					</span>
					<Button
						endContent={<GoogleIcon />}
						radius="sm"
						color="default"
						size="md"
						variant="ghost"
						className="w-full max-w-full">
						{loading ? (
							<div className="flex gap-2">
								Loading
								<Spinner color="white" size="sm" />
							</div>
						) : (
							"Continue with Google"
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}
