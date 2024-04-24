import { useState, useEffect } from "react";
import { supabase } from "./utils/supabaseClient";
import Auth from "./components/Auth";
import Home from "./components/Home";

function App() {
	const [session, setSession] = useState(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	return <div>{!session ? <Auth /> : <Home />}</div>;
}

export default App;
