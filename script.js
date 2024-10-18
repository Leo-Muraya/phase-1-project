const searchBar = document.getElementById('searchBar');
const resultsDiv = document.getElementById('results');
const recipeDetails = document.getElementById('recipeDetails');
const recipeContent = document.getElementById('recipeContent');
const searchForm = document.getElementById('searchForm');

fetch('recipes.json')
    .then(response => response.json())
    .then(data => {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent form submission
            const query = searchBar.value.toLowerCase();
            resultsDiv.innerHTML = ''; 
            
            const filteredRecipes = data.filter(item => 
                item.name.toLowerCase().includes(query)
            );
          
            filteredRecipes.forEach(recipe => {
                const div = document.createElement('div');
                div.textContent = recipe.name;
                div.className = 'result-item';
                div.addEventListener('click', () => showDetails(recipe));
                resultsDiv.appendChild(div);
            });

            if (filteredRecipes.length === 0) {
                resultsDiv.textContent = "No recipes found.";
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));

//Display recipe details
function showDetails(recipe) {
    recipeContent.innerHTML = `
        <h2>${recipe.name}</h2>
        <p><strong>Origin:</strong> ${recipe.origin}</p>
        <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
        <p><strong>Description:</strong> ${recipe.description}</p>
        <p><strong>Preparation Time:</strong> ${recipe.prepTime}</p>
        <p><strong>Nutritional Information:</strong></p>
        <ul>
            <li>Calories: ${recipe.nutrition.calories}</li>
            <li>Protein: ${recipe.nutrition.protein}</li>
            <li>Carbs: ${recipe.nutrition.carbs}</li>
            <li>Fat: ${recipe.nutrition.fat}</li>
        </ul>
        <p><strong>Instructions:</strong> ${recipe.instructions}</p>
    `;
    recipeDetails.style.display = 'block';
}

//Navigation bar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});