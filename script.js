"use strict";
// recipe class
class Recipe {
  constructor(recipeData) {
    this.id = recipeData.idMeal;
    this.name = recipeData.strMeal;
    this.category = recipeData.strCategory;
    this.area = recipeData.strArea;
    this.image = recipeData.strMealThumb;
    this.ingredients = this.parseIngredients(recipeData);
    this.instructions = recipeData.strInstructions;
  }

  // method for parsing ingredients data
  parseIngredients(recipe) {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && measure) {
        ingredients.push(`${measure} ${ingredient}`);
      } else {
        break;
      }
    }
    return ingredients;
  }
}

// global variables
const baseUrl = "https://www.themealdb.com/api/json/v1/1";
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const recipeCardsContainer = document.getElementById("recipe-cards");
const modal = document.getElementById("myModal");
const modalName = document.getElementById("modal-name");
const modalCategory = document.getElementById("modal-category");
const modalArea = document.getElementById("modal-area");
const modalImg = document.getElementById("modal-img");
const modalIngredients = document.getElementById("modal-ingredients");
const modalInstructions = document.getElementById("modal-instructions");
const closeModal = document.getElementsByClassName("modal__close")[0];

// event listeners:
//search form btn
searchBtn.addEventListener("click", searchRecipes);
//closing modal
closeModal.addEventListener("click", closeModalHandler);
window.addEventListener("click", outsideModalClick);

// function to fetch data based off search value
async function searchRecipes(event) {
  try {
    event.preventDefault(); // prevent refreshing when entering a search input
    const keyword = searchInput.value.trim();
    if (keyword === "") {
      return;
    }
    const response = await fetch(`${baseUrl}/search.php?s=${keyword}`);
    const data = await response.json();
    displayRecipes(data.meals);
  } catch (error) {
    console.error("Error searching recipes:", error);
  }
}

// function to display recipe + create card
function displayRecipes(recipes) {
  recipeCardsContainer.innerHTML = "";

  if (!recipes) {
    recipeCardsContainer.innerHTML = `<p class="display__not-found">No recipes were found. Please try entering something else.</p>`;
    return;
  }

  recipes.forEach((recipeData) => {
    const recipe = new Recipe(recipeData);

    const card = document.createElement("div");
    card.classList.add("display__recipe-card");
    card.innerHTML = `
    <img class="display__recipe-img" src="${recipe.image}" alt="${recipe.name}"/>
    <h3>${recipe.name}</h3>
    <button class="display__recipe-btn btn" data-id="${recipe.id}">Get Recipe</button>
    `;
    recipeCardsContainer.appendChild(card);
  });

  document.querySelectorAll(".display__recipe-btn").forEach((button) => {
    button.addEventListener("click", displayRecipeDetails);
  });
}

// function to display recipe details when 'Get Recipe' btn is clicked
async function displayRecipeDetails(event) {
  try {
    const recipeId = event.target.dataset.id;
    const response = await fetch(`${baseUrl}/lookup.php?i=${recipeId}`);
    const data = await response.json();
    console.log("Recipe Data:", data.meals[0]);
    const recipe = new Recipe(data.meals[0]);

    modalName.textContent = recipe.name;
    modalCategory.textContent = recipe.category;
    modalArea.textContent = recipe.area;
    modalImg.src = recipe.image;
    console.log("Ingredients:", recipe.ingredients);
    modalIngredients.innerHTML = `<ul>${recipe.ingredients
      .map((ingredient) => `<li>${ingredient}</li>`)
      .join("")}</ul>`;
    modalInstructions.textContent = recipe.instructions;

    modal.style.display = "block";
  } catch (error) {
    console.error("Error displaying recipe details:", error);
  }
}

// functions to close modal - when span (x) is clicked
function closeModalHandler() {
  modal.style.display = "none";
}
// function closes modal - when click anywhere outside of modal
function outsideModalClick(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

// Featured Section:
//function to fetch random recipe data
async function getRandomRecipe() {
  try {
    const response = await fetch(`${baseUrl}/random.php`);
    const data = await response.json();
    return data.meals[0];
  } catch (error) {
    console.error("Error fetching random recipe:", error);
  }
}

//function to display random recipe card in featured section
async function displayRandomRecipe() {
  const featuredSection = document.querySelector(".featured__cards-container");
  featuredSection.innerHTML = ""; //clear existing cards

  try {
    // for loop to generate and display additional cards
    for (let i = 0; i < 3; i++) {
      const randomRecipeData = await getRandomRecipe();
      if (randomRecipeData) {
        const recipe = new Recipe(randomRecipeData);
        const card = createRecipeCard(recipe);
        featuredSection.appendChild(card);
      }
    }
  } catch (error) {
    console.error("Error displaying random recipes:", error);
  }
}

// function to create a recipe card
function createRecipeCard(recipe) {
  const card = document.createElement("div");
  card.classList.add("featured__card", "card");
  card.innerHTML = `
  <img src="${recipe.image}" alt="${recipe.name}" class="featured__card-img"/>
  <h3 class="featured__card-title">${recipe.name}</h3>
  <button class="featured__card-btn btn" data-id="${recipe.id}">Get Recipe</button>
  `;
  card
    .querySelector(".featured__card-btn")
    .addEventListener("click", displayRecipeDetails);
  return card;
}

//call/invoke function to display cards when page loads
displayRandomRecipe();
