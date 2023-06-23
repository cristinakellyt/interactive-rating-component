import './sass/main.scss';

class ratingComponent {
  private ratings: HTMLFormElement;
  private modal!: HTMLDivElement;

  constructor() {
    this.ratings = document.querySelector('.rating-values')!;
    this.ratings.addEventListener('submit', this.submitHandler);

    const backdrop = document.querySelector('.modal-rating')!;
    backdrop.addEventListener('click', this.hideModal);
  }

  private submitHandler = (event: Event) => {
    event.preventDefault();
    const selectedRate = document.querySelector('input[name=rating]:checked');

    if (!selectedRate) {
      alert('You have to select a value');
      return;
    }

    this.ratings.reset();
    const submitedValue = selectedRate.getAttribute('value')!;
    this.showModal(submitedValue);
  };

  private showModal = (submitedValue: string) => {
    this.modal = document.querySelector('.modal-rating')!;
    this.modal.setAttribute('opened', '');

    const modalTextWithRate = document.querySelector('.selected-rate-text')!;
    modalTextWithRate.textContent = `You selected ${submitedValue} out of 5`;
  };

  private hideModal = () => {
    this.modal.removeAttribute('opened');
  };
}

new ratingComponent();
