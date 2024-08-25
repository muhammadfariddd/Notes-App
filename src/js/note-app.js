import { getAllNotes, addNote, deleteNote } from './api.js'
import './note-list.js'
import './note-preview.js'
import './loading-indicator.js'
import Swal from 'sweetalert2'
import gsap from 'gsap'

class NoteApp extends HTMLElement {
  constructor() {
    super()
    this.loadingIndicator = document.createElement('loading-indicator')
    document.body.appendChild(this.loadingIndicator)
  }

  async connectedCallback() {
    this.render()

    const noteList = this.querySelector('note-list')
    const notePreview = this.querySelector('note-preview')

    this.loadingIndicator.show()

    try {
      const notes = await getAllNotes()

      this.loadingIndicator.hide()

      noteList.notes = notes
      noteList.render()

      gsap.from(noteList.querySelectorAll('.notes__list-item'), {
        opacity: 0,
        y: 50,
        duration: 0.5,
        stagger: 0.1,
      })

      if (notes.length > 0) {
        notePreview.setNoteTitle(notes[0].title)
        notePreview.setNoteBody(notes[0].body)
      }

      noteList.addEventListener('noteSelected', (event) => {
        notePreview.setNoteTitle(event.detail.title)
        notePreview.setNoteBody(event.detail.body)
      })

      document.addEventListener('noteAdded', async (event) => {
        this.loadingIndicator.show()
        await new Promise((resolve) => setTimeout(resolve, 500))

        const updatedNotes = await getAllNotes()

        this.loadingIndicator.hide()

        noteList.notes = updatedNotes
        noteList.render()

        gsap.from(noteList.querySelectorAll('.notes__list-item'), {
          opacity: 0,
          y: 50,
          duration: 0.5,
          stagger: 0.1,
        })

        notePreview.setNoteTitle(event.detail.title)
        notePreview.setNoteBody(event.detail.body)

        Swal.fire({
          title: 'Berhasil!',
          text: 'Catatan berhasil ditambahkan.',
          icon: 'success',
          confirmButtonText: 'Oke',
        })
      })

      document.addEventListener('noteDeleted', async (event) => {
        console.log(`Note deleted with ID: ${event.detail.id}`)

        if (typeof Swal !== 'undefined') {
          console.log('SweetAlert2 is ready to use.')
        } else {
          console.error('SweetAlert2 is not available.')
        }

        this.loadingIndicator.show()

        try {
          const updatedNotes = await getAllNotes()
          noteList.notes = updatedNotes
          noteList.render()

          if (notePreview.getAttribute('note-id') === event.detail.id) {
            notePreview.setNoteTitle('')
            notePreview.setNoteBody('')
          }

          Swal.fire({
            title: 'Catatan Terhapus!',
            text: 'Catatan berhasil dihapus.',
            icon: 'success',
            confirmButtonText: 'Oke',
          })
        } catch (error) {
          console.error('Failed to refresh notes:', error)
          Swal.fire({
            title: 'Gagal!',
            text: 'Gagal memperbarui daftar catatan setelah penghapusan.',
            icon: 'error',
            confirmButtonText: 'Oke',
          })
        } finally {
          this.loadingIndicator.hide()
        }
      })
    } catch (error) {
      console.error('Failed to fetch or add notes:', error)
      this.loadingIndicator.hide()
      Swal.fire({
        title: 'Gagal!',
        text: 'Gagal mengambil atau menambahkan catatan. Silakan coba lagi.',
        icon: 'error',
        confirmButtonText: 'Oke',
      })
    }
  }

  render() {
    this.innerHTML = `
      <div class="notes">
          <note-list></note-list>
          <note-preview></note-preview>
      </div>
    `
  }
}

customElements.define('note-app', NoteApp)
