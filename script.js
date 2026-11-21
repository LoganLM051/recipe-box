// Const for element ids// 
const input = document.getElementById("recipe-id");
const getBtn = document.getElementById("get-btn");
const getStatus = document.getElementById("status");
const recipeArea = document.getElementById("recipe");
// async function for the recipe//
async function getRecipe() {
    recipeArea.textContent = "";

    if (input.value === "") {
        getStatus.textContent = "Type a number first.";
        return;
    }

     try {

    getStatus.textContent = "Loading...";
    const response = await fetch(`https://dummyjson.com/recipes/${input.value}`);  
    
    
    
        if (!response.ok) {
        getStatus.textContent = "No recipe with that number. Try 1 to 50.";
        return;
    }


    const recipe = await response.json();
    console.log(recipe);
    getStatus.textContent = "";



    const card = document.createElement("div");
    card.className = "card p-3";

    const title = document.createElement("h3");
    title.textContent = recipe.name;
    card.appendChild(title);

    const cuisine = document.createElement("p");
    cuisine.textContent =  "Cuisine: " + recipe.cuisine;
    card.appendChild(cuisine);

    const img = document.createElement("img");
    img.src =  recipe.image;
    img.alt = recipe.name;
    img.className = "rounded-2";
    card.appendChild(img);

    recipeArea.appendChild(card);

    input.value = "";
    } catch (error) {
        getStatus.textContent = "Can't reach the recipe server. check your internet,";
    }
}

getBtn.addEventListener("click", getRecipe);

// Add a dish in post
const dishInput = document.getElementById("dish-name");
const postBtn = document.getElementById("post-btn");
const postStatus = document.getElementById("post-status");
const savedArea = document.getElementById("saved");

// async function
async function addDish() {
    // text content clear to make the field empty upon clicking button repeatably
    savedArea.textContent = "";

    // if statement to say on the input line to insert a dish name

    if (dishInput.value === "") {
        postStatus.textContent = "Type a dish name first.";
        return;
    }

    try {
        // textContent for when the server loads the new dish into the server
        postStatus.textContent = "Sending to server...";

        // const response to fetch a new dish name

    const response = await fetch("https://dummyjson.com/recipes/add", {
        method: "POST",
        headers:{ "Content-Type": "application/json" },
        body: JSON.stringify({ name: dishInput.value })
    });

    //if statement for a possible error

    if (!response.ok) {
    postStatus.textContent = "The server didn't add it. Try again.";
    return;
    }

        const newDish = await response.json();
        console.log(newDish);
        postStatus.textContent = "";

        const message = document.createElement("p");
        message.className = "alert alert-success";
        message.textContent =   'Added "' + newDish.name + '" as recipe #' + newDish.id + " (practice server: not really saved)";
        savedArea.appendChild(message);
        

        dishInput.value = "";

    } catch (error) {
        postStatus.textContent = "Can't reach the recipe server. Check your internet.";
    }
}
postBtn.addEventListener("click", addDish);