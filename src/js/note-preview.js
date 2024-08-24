import { getAllNotes, addNote, deleteNote } from "./api.js";

class NotePreview extends HTMLElement {
  constructor() {
    super();
  }

  setNoteTitle(title) {
    this.querySelector(".notes__title").value = title;
  }

  setNoteBody(body) {
    this.querySelector(".notes__body").value = body;
  }

  showNewNoteForm() {
    this.innerHTML = `
      <div class="notes__preview">
        <input type="text" class="notes__title" placeholder="Enter a title" required/>
        <textarea class="notes__body" placeholder="Enter your note here..." required></textarea>
        <button class="save-note" required>Save Note</button>
      </div>
    `;

    this.querySelector(".save-note").addEventListener("click", () => {
      this.saveNewNote();
    });
  }

  async saveNewNote() {
    const title = this.querySelector(".notes__title").value;
    const body = this.querySelector(".notes__body").value;

    if (!title || !body) {
      alert("Judul dan catatan harus diisi.");
      return;
    }

    try {
      await addNote(title, body);

      const newNote = {
        title,
        body,
        createdAt: new Date().toISOString(),
      };

      const event = new CustomEvent("noteAdded", { detail: newNote });
      document.dispatchEvent(event);

      this.setNoteTitle(newNote.title);
      this.setNoteBody(newNote.body);

      const saveButton = this.querySelector(".save-note");
      saveButton.textContent = "Save Completed";
      saveButton.disabled = true;
      saveButton.classList.add("save-completed");

      setTimeout(() => {
        saveButton.remove();
      }, 3000);
    } catch (error) {
      console.error("Failed to save note:", error);
      alert("Gagal menyimpan catatan.");
    }
  }

  connectedCallback() {
    this.render();
  }

  render(noteData = null) {
    if (noteData) {
      this.innerHTML = `
        <div class="notes__preview">
          <input type="text" class="notes__title" value="${noteData.title}" readonly />
          <textarea class="notes__body" readonly>${noteData.body}</textarea>
        </div>
      `;
    } else {
      this.innerHTML = `
        <div class="notes__preview">
          <input type="text" class="notes__title" placeholder="Enter a title" />
          <textarea class="notes__body" placeholder="Enter your note here..."></textarea>
        </div>
      `;
    }
  }
}

customElements.define("note-preview", NotePreview);
