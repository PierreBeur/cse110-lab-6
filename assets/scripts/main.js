// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  return JSON.parse(localStorage.getItem('recipes'));
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  // Get a reference to the <main> element
  const main = document.querySelector('main');
  // Loop through each of the recipes in the passed in array,
  // create a <recipe-card> element for each one, and populate
  // each <recipe-card> with that recipe data using element.data = ...
  // Append each element to <main>
  for (const recipe of recipes) {
    const recipeCard = document.createElement('recipe-card');
    recipeCard.data = recipe;
    main.appendChild(recipeCard);
  }
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {

  // Get a reference to the <form> element
  const form = document.querySelector('form');
  // Add an event listener for the 'submit' event,
  // which fires when the submit button is clicked
  form.addEventListener('submit', () => {
    // Create a new FormData object from the <form> element reference above
    const formData = new FormData(form);
    // Create an empty object
    const recipeObject = {};
    // Extract the keys and corresponding values from the
    // FormData object and insert them into recipeObject
    for (const [key, value] of formData) {
      recipeObject[key] = value;
    }
    // Create a new <recipe-card> element
    const recipeCard = document.createElement('recipe-card');
    // Add the recipeObject data to <recipe-card> using element.data
    recipeCard.data = recipeObject;
    // Append this new <recipe-card> to <main>
    document.querySelector('main').appendChild(recipeCard);
    // Get the recipes array from localStorage
    const recipes = getRecipesFromStorage();
    // Add this new recipe to it
    recipes.push(recipeObject);
    // Save the recipes array back to localStorage
    saveRecipesToStorage(recipes);
  });

  // Get a reference to the "Clear Local Storage" button
  const button = document.querySelector('button.danger');
  // Add a click event listener to clear local storage button
  button.addEventListener('click', () => {
    // Clear the local storage
    localStorage.clear();
    // Delete the contents of <main>
    document.querySelector('main').innerHTML = '<!-- Add Recipes Here -->';
  });

}
