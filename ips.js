import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	'https://vjgrihsdbsjkhpqwkjif.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqZ3JpaHNkYnNqa2hwcXdramlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE1MDQ3ODgsImV4cCI6MTk3NzA4MDc4OH0.uEugZeiuxqE2JXUq0zziAER6_iOXqfGF0_QUg7mJBfI'
);

let { data } = await supabase.from('IPs').select();

data = data.map((row) => row.ip);

console.log([...new Set(data)]);
