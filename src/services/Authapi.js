import { supabase } from "./supabase";

export async function signInWithEmail({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  console.log("sign in data", data);

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

export async function getUser() {
  //this is getting session data from local storage
  const { data: session } = await supabase.auth.getSession();
  console.log("session", session);
  //no session = no user
  if (!session.session) {
    console.log("no session");
    return null;
  }

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  console.log("user", data.user);
  return data?.user;
}

export async function signupUser({ username, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  console.log("SIGN UP USER DATA", data);
  return data;
}
