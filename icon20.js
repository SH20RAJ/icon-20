class IconElement extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.iconName = this.getAttribute('name');
      this.color = this.getAttribute('color');
      this.fontsize = this.getAttribute('fontsize') || '24px';
      this.renderIcon();
  }

  async renderIcon() {
      const iconUrl = `https://unpkg.com/ionicons@7.1.0/dist/svg/${this.iconName}.svg`;

      try {
          const response = await fetch(iconUrl);
          if (response.ok) {
              const svgText = await response.text();
              const parser = new DOMParser();
              const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
              const svgElement = svgDoc.querySelector('svg');

              if (this.color) {
                  svgElement.setAttribute('fill', this.color);
              }

              svgElement.setAttribute('width', this.fontsize);
              svgElement.setAttribute('height', this.fontsize);

              this.shadowRoot.appendChild(svgElement);
          } else {
              console.error(`Failed to fetch icon: ${this.iconName}`);
          }
      } catch (error) {
          console.error(error);
      }
  }
}

customElements.define('icon-20', IconElement);
