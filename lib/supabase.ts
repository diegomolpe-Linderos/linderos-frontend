export default function LoginPage() {

  console.log("ENV CHECK FROM LOGIN PAGE:");
  console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const router = useRouter();
  const supabase = getSupabaseClient();
