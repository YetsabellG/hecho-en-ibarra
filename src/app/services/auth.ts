import { supabase } from "../lib/supabase";

export async function signUp(email: string, password: string) { return await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard` } }); }
export async function signIn(email: string, password: string) { return await supabase.auth.signInWithPassword({ email, password }); }
export async function resendConfirmation(email: string) { return await supabase.auth.resend({ type: "signup", email, options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard` } }); }
export async function signOut() { return await supabase.auth.signOut(); }
export async function getSession() { return await supabase.auth.getSession(); }
export async function getUser() { const { data: { user } } = await supabase.auth.getUser(); return user; }
export async function requestPasswordReset(email: string) { return await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth/reset-password` }); }
export async function updatePassword(password: string) { return await supabase.auth.updateUser({ password }); }
