import gsap from 'gsap'

class LoadingIndicator extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        .loading {
          display: flex; 
          visibility: hidden;
          opacity: 0;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
        }
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border-left-color: #09f;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      </style>
      <div class="loading">
        <div class="spinner"></div>
      </div>
    `
    this.loadingElement = this.shadowRoot.querySelector('.loading')
  }

  show() {
    this.loadingElement.style.visibility = 'visible'
    gsap.to(this.loadingElement, { opacity: 1, duration: 0.3 })
  }

  hide() {
    gsap.to(this.loadingElement, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        this.loadingElement.style.visibility = 'hidden'
      },
    })
  }
}

customElements.define('loading-indicator', LoadingIndicator)
