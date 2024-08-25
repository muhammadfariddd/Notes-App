import { getAllNotes, addNote, deleteNote } from './api.js'
import './note-item.js'
import './note-preview.js'

class NoteList extends HTMLElement {
  constructor() {
    super()
    this.notes = []
  }

  async connectedCallback() {
    this.notes = await getAllNotes()
    this.render()

    document.addEventListener('noteDeleted', async (event) => {
      console.log('Note deleted event received with ID:', event.detail.id)
      await this.updateNotes()
    })
  }

  async updateNotes() {
    console.log('Updating notes...')
    this.notes = await getAllNotes()
    console.log('Notes updated:', this.notes)
    this.render()
  }

  render() {
    console.log('Rendering notes list...')
    this.innerHTML = `
      <div class="notes__sidebar">
        <button class="notes__add">Add note</button>
        <div class="notes__list">
          ${this.notes
            .map(
              (note, index) =>
                `<note-item class="notes__list-item ${
                  index === 0 ? 'notes__list-item--selected' : ''
                }" note-id="${note.id}" note-title="${note.title}" note-body="${
                  note.body
                }" note-created="${note.createdAt}"></note-item>`
            )
            .join('')}
        </div>
      </div>
    `

    this.querySelectorAll('note-item').forEach((item) => {
      item.addEventListener('click', () => {
        this.querySelectorAll('.notes__list-item').forEach((el) => {
          el.classList.remove('notes__list-item--selected')
        })
        item.classList.add('notes__list-item--selected')

        const event = new CustomEvent('noteSelected', {
          detail: {
            title: item.getAttribute('note-title'),
            body: item.getAttribute('note-body'),
          },
        })
        this.dispatchEvent(event)

        const notePreview = document.querySelector('note-preview')
        notePreview.render({
          title: item.getAttribute('note-title'),
          body: item.getAttribute('note-body'),
        })
      })
    })

    this.querySelector('.notes__add').addEventListener('click', () => {
      const notePreview = document.querySelector('note-preview')
      notePreview.showNewNoteForm()
    })
  }
}

customElements.define('note-list', NoteList)
