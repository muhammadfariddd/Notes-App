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

  connectedCallback() {
    this.innerHTML = `
    <div class="notes__preview">
      <input type="text" class="notes__title" placeholder="Enter a title" />
      <textarea class="notes__body" placeholder="Enter your note here..."></textarea>
    </div>
    `;
  }
}

customElements.define("note-preview", NotePreview);
