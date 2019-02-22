document.addEventListener('DOMContentLoaded', () => {
// started at 1:38pm
const hogContainer = document.querySelector('#hog-container')
const hogForm = document.querySelector('#hog-form')

const getFetchHogs = () => {
  fetch(`http://localhost:3000/hogs`)
    .then(res => res.json())
    .then(arrayOfHogs => displayAllHogs(arrayOfHogs))
}

const displayAllHogs = (arrayOfHogs) => {
  arrayOfHogs.forEach(displayOneHog)
}

const displayOneHog = (hog) => {
  let id = hog.id
  let name = hog.name
  let specialty = hog.specialty
  // let greasedBoolean = hog.greased
  let checked = hog.greased == true ? 'checked' : ''
  let weightRatio = hog["weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"]
  let highestMedalAchieved = hog["highest medal achieved"]
  let image = hog.image

  hogContainer.innerHTML += `
    <div class="hog-card">
      <p>ID: ${id}
      <p>NAME: ${name}
      <p>SPECIALTY: ${specialty}
      <p>GREASED: <input class="greased-checkbox" data-id="${id}" type="checkbox" value="greased" ${checked}>
      <p>WEIGHT RATIO: ${weightRatio}
      <p>HIGHEST MEDAL ACHIEVED: ${highestMedalAchieved}
      <p><img src=${image}>
      <p><button data-id="${id}" class="delete-button">X</button>
    </div>
  `
}

// 2:10pm - took about 15 mins trying to figure out Boolean Checkbox

const addEventListenerToHogForm = () => {
  hogForm.addEventListener('submit', postNewHog)
}

const postNewHog = (event) => {
  event.preventDefault();
  let newHogName = hogForm.name.value
  let newHogSpecialty = hogForm.specialty.value
  let newHogMedal = hogForm.medal.value
  let newHogGreased = hogForm.greased.checked
  let newHogWeight = hogForm.weight.value
  let newHogImage = hogForm.img.value

  fetch('http://localhost:3000/hogs', {
    method: "POST",
    body: JSON.stringify({
      name: newHogName,
      specialty: newHogSpecialty,
      "highest medal achieved": newHogMedal,
      greased: newHogGreased,
      "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": newHogWeight,
      img: newHogImage
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(res => res.json())
  .then(data => displayOneHog(data))
  console.log('FETCH POSTED! WOO!!!')
  hogForm.reset();
}

// 3:36pm - spent a bunch of time trying to debug the Keys (they have spaces in them and are super long for no reason)
// Also, mistyped 'application/JSON' as 'applications/json' with the extra S and it was messing up my POST.

const addEventListenerToHogContainerForDeleteButton = () => {
  hogContainer.addEventListener('click', deleteHog)
}

const deleteHog = (event) => {
  if (event.target.classList.contains('delete-button')){
    let hogCard = event.target.parentElement.parentElement
    let id = event.target.dataset.id
    hogCard.remove()

    fetch(`http://localhost:3000/hogs`+`/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => console.log('hog successfully deleted!'))
  }
}

const addEventListenerToHogContainerForCheckbox = () => {
  hogContainer.addEventListener('change', updateHogCheckbox)
}

const updateHogCheckbox = (event) => {
  let id = event.target.dataset.id
  let newGreasedBoolean = event.target.checked
  if (event.target.classList.contains('greased-checkbox')){
    fetch(`http://localhost:3000/hogs`+`/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        greased: newGreasedBoolean
      }),
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      }
    })
  }
}








// CALLS
getFetchHogs();
addEventListenerToHogForm();
addEventListenerToHogContainerForDeleteButton();
addEventListenerToHogContainerForCheckbox();

}) // END OF DOMCONTENTLOADED
