const meals = document.querySelector(".meals");
const favoriteContainer = document.querySelector("#fav-meals");
const searchTerm = document.querySelector("#search-term");
const searchBtn = document.querySelector("#search");
const mealPopUp = document.querySelector("body");

const mealInfo = document.querySelector(".meal-info");

// 기본적인 meal을 가져오는 함수
async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const respData = await resp.json();
  const randomMeal = respData.meals[0];
  addMeal(randomMeal, true);
}
async function getMealById(id) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );

  const respData = await resp.json();
  const meal = respData.meals[0];

  return meal;
}
async function getMealsBySearch(term) {
  const getMealByName = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );

  const resp = await getMealByName.json();
  const meals = await resp.meals;

  return meals;
}
// 로컬 저장소를 에서 값을 저장 및 가져오는 함수
function getMeals() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds === null ? [] : mealIds;
}
function removeSt(mealId) {
  const mealIds = getMeals();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}
function updateSt(mealId) {
  const mealIds = getMeals();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

async function addMeal(mealData, random) {
  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `    
    <div class="meal-header">
    ${random ? `<span class="random"> Random Recipe </span>` : ""}
        <span class="random">
            Random Recipe
        </span>
        <img src="${mealData.strMealThumb}" alt="${
    mealData.strMeal
  }" id="detail">
    </div>
    <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <button class="btn"><i class="far fa-heart"></i></button>
    </div>
    `;
  const button = meal.querySelector(".btn");
  const detail = meal.querySelector("#detail");

  button.addEventListener("click", () => {
    if (!button.classList.contains("active")) {
      button.classList.add("active");
      updateSt(mealData.idMeal);
    } else {
      button.classList.remove("active");
      removeSt(mealData.idMeal);
    }
    fethFavMeals();
  });

  detail.addEventListener("click", () => {
    seeMore(mealData);
  });
  meals.appendChild(meal);
}

async function fethFavMeals() {
  favoriteContainer.innerHTML = "";
  const mealIds = getMeals();
  const meals = [];
  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];

    const meal = await getMealById(mealId);

    addMealToFav(meal);
  }
}

function addMealToFav(mealData) {
  const favMeal = document.createElement("li");
  favMeal.innerHTML = `    
  <button class="btn_fav">X</button>
  <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
  <p>${mealData.strMeal}</p>
    `;

  const btn = favMeal.querySelector(".btn_fav");
  btn.addEventListener("click", () => {
    removeSt(mealData.idMeal);

    fethFavMeals();
  });

  favoriteContainer.appendChild(favMeal);
}

async function seeMore(mealData) {
  const meal = document.createElement("span");
  meal.innerHTML = `
  <div class="meal-info-container" id="meal-popup">
                <div class="meal-info">
                <button class="close" id="close_btn"><span>X</span></button>
                <h1>${mealData.strMeal}</h1>
                    <img src="${mealData.strMealThumb}" alt="${mealData.strMealThumb}">
                <p> 
                     ${mealData.strInstructions}
                </p>
                <ul>
                    <li>${mealData.strIngredient1}</li>
                    <li>${mealData.strIngredient2}</li>
                    <li>${mealData.strIngredient3}</li>
                    ......
                </ul>
                </div>
            </div>
  `;
  mealPopUp.appendChild(meal);

  const PopUpBtn = meal.querySelector("#close_btn");

  PopUpBtn.addEventListener("click", () => {
    meal.innerHTML = "";
  });
}

searchBtn.addEventListener("click", async () => {
  meals.innerHTML = "";
  const search = searchTerm.value;
  const item = await getMealsBySearch(search);

  if (item) {
    item.forEach((meal) => {
      addMeal(meal);
    });
  } else {
    alert("해당 음식은 정보에 없습니다.");
    alert("새로고침 해주세요~~!");
  }

  searchTerm.value = "";
});

getRandomMeal();
fethFavMeals();
