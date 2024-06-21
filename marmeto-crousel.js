class SplideElement extends HTMLElement {
  constructor() {
    super();
    this.splideInstance = null;
  }

  connectedCallback() {
    // Get options from element attributes if needed
    const options = this.getOptionsFromAttributes();

    // Initialize Splide
    this.splideInstance = new Splide(this, options);
    this.splideInstance.mount();
  }

  getOptionsFromAttributes() {
    const options = {};
    // Example of extracting data-options attribute
    const dataOptions = this.getAttribute('data-options');
    if (dataOptions) {
      try {
        Object.assign(options, JSON.parse(dataOptions));
      } catch (e) {
        console.error('Invalid JSON in data-options attribute:', e);
      }
    }
    return options;
  }
}

customElements.define('marmeto-carousel', SplideElement);

// Ensure all instances of <splide-carousel> are initialized automatically
document.addEventListener('DOMContentLoaded', () => {
  const splideCarousels = document.querySelectorAll('marmeto-carousel');
  splideCarousels.forEach(carousel => {
    if (!carousel.splideInstance) {
      new SplideElement(carousel);
    }
  });
});
