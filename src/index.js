import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';

Notiflix.Notify.init({ position: 'center-top' });

document.addEventListener('DOMContentLoaded', async () => {
  Notiflix.Loading.dots({
    svgColor: '#5897fb',
    svgSize: '130px',
    messageFontSize: '30px',
  });

  try {
    const breeds = await fetchBreeds();
    const breedSelect = document.querySelector('.breed-select');
    breedSelect.style.display = 'none'; 
    breedSelect.innerHTML = createMarkupOptions(breeds);

    setTimeout(() => {
      const slim = new SlimSelect({
        select: breedSelect,
      });

      breedSelect.style.display = 'flex'; 

      hideLoader();
      breedSelect.addEventListener('change', async (e) => {
        Notiflix.Loading.dots({
          svgColor: '#5897fb',
          svgSize: '130px',
          messageFontSize: '30px',
        });

        try {
          const catInfo = await fetchCatByBreed(e.target.value);
          const name = catInfo?.breeds?.[0]?.name || 'Unknown';
          const description = catInfo?.breeds?.[0]?.description || 'Unknown';
          const temperament = catInfo?.breeds?.[0]?.temperament || 'Unknown';
          const catCard = document.querySelector('.cat-info');
          catCard.style.display = 'flex';
          catCard.innerHTML = createMarkupCatCard({ url: catInfo.url, name, description, temperament });
          hideLoader();
        } catch (error) {
          Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
          hideLoader();
        }
      });
    }, 100);
  } catch (error) {
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    hideLoader();
  }
});


function createMarkupOptions(arr) {
  return arr
    .map(({ id, name }) => `<option value=${id}>${name}</option>`)
    .join('');
}


function createMarkupCatCard(data) {
  const { name, description, temperament, url } = data;

  return `
    <img class="cat-img" src="${url}" alt="${name}"  >
    <div class="cat-right">
      <h1 class="name">${name}</h1>
      <p class="description">${description}</p>
      <p class="temperament"><span class="temperament-span">Temperament:</span> ${temperament}</p>    
    </div>`;
}

function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.display = 'none';
  }
  Notiflix.Loading.remove(); 
}
