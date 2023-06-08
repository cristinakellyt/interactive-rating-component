import './../assets/sass/main.scss';

class ratingComponent {
  private submitButton!: HTMLButtonElement;
  private userRate!: string;
  private valueSelected!: HTMLInputElement;
  private modalRating!: HTMLElement;
  private textWithRateValue!: HTMLParagraphElement;

  constructor() {
    const ratings = document.querySelector('.rating-values') as HTMLFormElement;
    const mainEl = document.querySelector('.modal-rating') as HTMLElement;

    this.selectElements();
    this.submitButton.addEventListener(
      'click',
      this.rateTextInSubmitedStateHandler
    );
    mainEl.addEventListener('click', this.closeModalHandler);
    this.ratingValues(ratings);
  }

  private selectElements = () => {
    this.textWithRateValue = document.querySelector(
      '.selected-rate-text'
    ) as HTMLParagraphElement;
    this.modalRating = document.querySelector('.modal-rating') as HTMLElement;

    this.submitButton = document.getElementById(
      'submit-button'
    ) as HTMLButtonElement;
  };

  private ratingValues = (ratings: HTMLFormElement) => {
    for (const value of ratings) {
      value.addEventListener('click', this.storeUserRate as EventListener);
    }
  };

  private storeUserRate = (event: MouseEvent) => {
    if (!this.valueSelected) {
      this.valueSelected = event.target as HTMLInputElement;
    }

    if (this.valueSelected !== event.target) {
      this.valueSelected.removeAttribute('id');
    }

    if (event) {
      this.valueSelected = event.target as HTMLInputElement;
      (event.target as HTMLInputElement).id = 'active-state';
      this.userRate = (event.target as HTMLInputElement).value;
    }
  };

  private rateTextInSubmitedStateHandler = () => {
    if (!this.valueSelected) {
      alert('Should select some value');
      return;
    }
    this.updateTextWithRateValue();
    this.showModal();
  };

  private updateTextWithRateValue = () => {
    this.textWithRateValue!.textContent = `You selected ${this.userRate}
    out of 5`;
  };

  private showModal = () => {
    this.modalRating.classList.remove('slideout-animation');
    this.modalRating.classList.add('slidein-animation');
    this.modalRating!.style.display = 'flex';
  };

  private closeModalHandler = () => {
    this.modalRating.classList.remove('slidein-animation');
    this.modalRating.classList.add('slideout-animation');
    setTimeout(() => {
      this.modalRating!.style.display = 'none';
    }, 320);
    this.valueSelected.removeAttribute('id');
  };
}

new ratingComponent();
