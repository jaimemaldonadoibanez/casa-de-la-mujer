import { supabase } from '../lib/supabase'

export async function createComplaint({ type, description, date }) {
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData.user) {
    throw new Error('Debes iniciar sesión.')
  }

  const payload = {
    user_id: userData.user.id,
    complaint_type: type,
    description: description.trim(),
    incident_date: date || null,
    status: 'RECIBIDA',
  }

  const { data, error } = await supabase
    .from('complaints')
    .insert(payload)
    .select()
    .single()

  if (error) throw error

  return data
}

export async function listMyComplaints() {
  const { data, error } = await supabase
    .from('complaints')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error

  return data ?? []
}

export async function getComplaint(id) {
  const { data, error } = await supabase
    .from('complaints')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error

  return data
}

export async function listCaseUpdates(complaintId) {
  const { data, error } = await supabase
    .from('case_updates')
    .select('*')
    .eq('complaint_id', complaintId)
    .order('created_at', { ascending: true })

  if (error) throw error

  return data ?? []
}