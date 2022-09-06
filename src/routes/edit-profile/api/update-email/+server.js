import supabase from '$lib/supabase';
import { json, error } from '@sveltejs/kit';

export function POST({ request }) {
	return json(request);
}
