const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  console.log("Intentando login con:", email, password);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log("SUPABASE RESPONSE:", { data, error });

  if (error) {
    setError(error.message);
    return;
  }

  router.push("/dashboard");
};

