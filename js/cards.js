import { supabase } from './supabase.js';

export async function listCards() {
  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function createCard(card) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('請先登入');
  const { data, error } = await supabase
    .from('cards')
    .insert({ ...card, user_id: user.id })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteCard(id) {
  const { error } = await supabase.from('cards').delete().eq('id', id);
  if (error) throw error;
}
