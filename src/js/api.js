const BASE_URL = 'https://notes-api.dicoding.dev/v2'

async function getAllNotes() {
  const response = await fetch(`${BASE_URL}/notes`)
  if (!response.ok) {
    throw new Error('Gagal mengambil catatan')
  }
  const data = await response.json()
  return data.data
}

async function addNote(title, body) {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body }),
  })
  if (!response.ok) {
    throw new Error('Gagal menambahkan catatan')
  }
  const data = await response.json()
  return data.message
}

async function deleteNote(id) {
  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Gagal menghapus catatan')
  }
  const data = await response.json()
  console.log(data)

  return data.message
}

export { getAllNotes, addNote, deleteNote }
