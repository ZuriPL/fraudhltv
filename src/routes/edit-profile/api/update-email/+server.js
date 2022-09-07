import { json, error } from '@sveltejs/kit';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_SECRETKEY
);

export async function POST({ request }) {
	let body = await request.json();
	// console.log(body);

	let { data, error } = await supabase.auth.admin.updateUserById(
		'f6642447-9345-4e4a-8560-0ff39a77ab1e',
		{ email: body.newEmail }
	);

	console.log(data);
	console.log(error);

	return json(body);
}
