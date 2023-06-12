import './../assets/sass/main.scss';

class ratingComponent {
  private userRate!: string;
  private valueSelected!: HTMLInputElement | null;
  private modalRating!: HTMLDivElement;
  private textWithRateValue: HTMLParagraphElement;

  constructor() {
    const ratings = document.getElementById('rating-values') as HTMLFormElement;
    for (const value of ratings) {
      if (value.getAttribute('type') === 'button') {
        value.addEventListener('click', this.storeUserRate as EventListener);
      }

      if (value.getAttribute('type') === 'submit') {
        value.addEventListener(
          'click',
          this.rateTextInSubmitedStateHandler as EventListener
        );
      }
    }

    this.modalRating = document.querySelector(
      '.modal-rating'
    ) as HTMLDivElement;

    this.textWithRateValue = this.modalRating.querySelector(
      '.selected-rate-text'
    ) as HTMLParagraphElement;
  }

  private storeUserRate = (event: MouseEvent) => {
    if (!this.valueSelected) {
      this.valueSelected = event.target as HTMLInputElement;
    }

    if (this.valueSelected !== event.target) {
      this.valueSelected.removeAttribute('id');
    }

    this.valueSelected = event.target as HTMLInputElement;
    (event.target as HTMLInputElement).id = 'active-state';
    this.userRate = (event.target as HTMLInputElement).value;
  };

  private rateTextInSubmitedStateHandler = (event: MouseEvent) => {
    event.preventDefault();
    if (!this.valueSelected) {
      alert('Should select some value');
      (event.target as HTMLButtonElement).style.backgroundColor = '#fb7413';
      (event.target as HTMLButtonElement).style.color = '#fff';
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
    this.modalRating.setAttribute('opened', '');
    this.modalRating.addEventListener('click', this.closeModalHandler);
  };

  private closeModalHandler = () => {
    this.modalRating!.removeAttribute('opened');
    this.valueSelected!.removeAttribute('id');
    this.valueSelected = null;
  };
}

new ratingComponent();
