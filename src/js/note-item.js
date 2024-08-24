class NoteItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="notes__small-title">${this.getAttribute("note-title")}</div>
      <div class="notes__small-body">${this.getAttribute("note-body")}</div>
      <div class="notes__small-updated">${this.getAttribute(
        "note-created"
      )}</div>
    `;
    this.classList.add("notes__list-item");
  }
}

customElements.define("note-item", NoteItem);
