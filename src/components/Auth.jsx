import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Input, Button, Spinner } from "@nextui-org/react";
import GoogleIcon from "./icons/GoogleIcon";
import heroImg from "../assets/woman-laptop.webp";

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
		<div className="grid lg:grid-cols-[600px_minmax(0px,_1fr)_0px] min-h-screen w-full overflow-hidden">
			<div className="p-10 flex flex-col justify-center max-w-full relative">
				<h1 className="text-2xl font-black text-black absolute top-10 w-full">
					MyExpenses
				</h1>
				<div className="w-[400px] max-w-full mx-auto">
					<div className="my-10">
						<h2 className="text-3xl font-semibold">Welcome back</h2>
						<p className="text-lg text-foreground-500 mt-1">
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
						startContent={<GoogleIcon className="text-lg" />}
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
			<div className="hidden relative lg:block">
				<div className="absolute h-full w-full bg-black/[.6] bg-blend-normal flex flex-col justify-end">
					<div className="p-10 pb-20 max-h-full">
						<h2 className="text-5xl font-bold text-white max-w-4xl">
							Start taking care of your expenses
						</h2>
						<p className="text-xl text-white mt-3 font-semibold max-w-3xl">
							Login or create your account for free, and start tracking your
							personal expenses and budget.
						</p>
					</div>
				</div>
				<img
					src={heroImg}
					alt="Smiling Woman using a laptop"
					className="h-full w-full object-cover"
				/>
			</div>
		</div>
	);
}
