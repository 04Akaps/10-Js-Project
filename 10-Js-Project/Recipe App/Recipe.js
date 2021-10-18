const meals = document.querySelector(".meals");

async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const respData = await resp.json();
  const randomMeal = respData.meals[0];
  addMeal(randomMeal, true);
}
function addMeal(mealData, random) {
  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `    
    <div class="meal-header">
    ${random ? `<span class="random"> Random Recipe </span>` : ""}
        <span class="random">
            Random Recipe
        </span>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
    </div>
    <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <button class="btn"><i class="far fa-heart"></i></button>
    </div>
    `;
  const button = meal.querySelector(".btn");

  button.addEventListener("click", () => {
    if (!button.classList.contains("active")) {
      button.classList.add("active");
      updateSt(mealData.idMeal);
    } else {
      button.classList.remove("active");
      removeSt(mealData.idMeal);
    }
    // button.classList.toggle("active");
  });

  meals.appendChild(meal);
}

function getMeals() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds === null ? [] : mealIds;
}

function updateSt(mealId) {
  const mealIds = getMeals();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeSt(mealId) {
  const mealIds = getMeals();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

async function getMealById(id) {
  const getMealById = await fetch(
    "www.themealdb.com/api/json/v1/1/lookup.php?i=52772" + id
  );
}

async function getMealsBySearch(term) {
  const getMealByName = await fetch(
    "www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata" + term
  );
}

getRandomMeal();
