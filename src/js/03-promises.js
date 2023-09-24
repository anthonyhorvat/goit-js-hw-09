import Notiflix from 'notiflix';
const button = document.querySelector('button');
const formEl = document.querySelector('.form');

formEl.addEventListener('input', event => {
  event.preventDefault();
  const elements = event.currentTarget;
  const refs = {
    delay: Number(elements.delay.value),
    step: Number(elements.step.value),
    amount: Number(elements.amount.value),
  };
});

const createPromise = function (position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        rejected({ position, delay });
      }
    }, delay);
  });
};

button.addEventListener('click', event => {
  event.preventDefault();
  let delay;
  for (let position = 1; position <= refs.amount; position++) {
    delay = refs.delay + refs.step * (position - 1);
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});
