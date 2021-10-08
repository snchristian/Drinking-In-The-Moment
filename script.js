
function init() {
    getForm()
    getRandomDrink()
    handlesForms()
    favorties()
}


//getting a random drink for Dearler's Choice
function getRandomDrink() {
     const DCButton = document.querySelector('#DC')
     DCButton.addEventListener('click', handlesRandomDrink)
}

function handlesRandomDrink() {
    if(form.style.display === "block"){
        form.style.display = "none"
    }
     randomDrinkContainer.innerHTML= ''
     document.querySelector("#forms").hidden
     fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
     .then((resp) =>resp.json())
     .then(cocktail => {
         console.log(cocktail)
         cocktail.drinks.forEach(renderRandomDrink)
     })
 }

 function renderSearchDrink(cocktail) {
     if (randomDrinkContainer.innerHTML) {
       randomDrinkContainer.innerHTML = '';
   }
   const drinks = rendersDrink(cocktail)
   drinksContainer.appendChild(drinks)
 };
 
 function renderRandomDrink(cocktail) {

    randomDrinkContainer.innerHTML = '';
    if (drinksContainer.innerHTML) {
        drinksContainer.innerHTML = '';
    }
    const drinks = rendersDrink(cocktail)
    randomDrinkContainer.appendChild(drinks)
  }
  const drinksContainer = document.querySelector('#your-Drink');
  const randomDrinkContainer = document.querySelector('#drink-of-the-day'); 

  //load drink unto the page
   function rendersDrink(cocktail) {
    console.log(cocktail)
    const drink = document.createElement("div")
    drink.id=`${cocktail.idDrink}/* `
    
    
//add drinks name
    const p = document.createElement('p')
    p.innerHTML=`${cocktail.strDrink}`
    drink.appendChild(p)

// add drinks image
    const img = document.createElement('img')
    img.src =`${cocktail.strDrinkThumb}`
    img.alt =`${cocktail.strDrink}`
    drink.appendChild(img)
//add drinks glass
    const drinkGlass = document.createElement('p')
    drinkGlass.innerHTML = `Perfered Glass: ${cocktail.strGlass}`
    drink.appendChild(drinkGlass)
// adds drink ingredients container
 const  drinkIngredients = document.createElement('ul')
 drinkIngredients.innerHTML = "Ingredients"
drink.appendChild(drinkIngredients)

function addCocktailI(cocktail) {
          const ingredientsArray = Object.keys(cocktail).filter(function(keyName){
      
        if(cocktail[keyName] !== null &&  cocktail[keyName] !=="" && keyName.includes("strIngredient")) {
            return keyName
          
        }
  
      
        }).map(key => cocktail[key]);
        ingredientsArray.forEach(ingredient => ingredient) 
  
        //map(key => cocktail[key]);
        //ingredientsArray.forEach(ingredient => drinkIngredients.innerHTML+=
          //` <li>${ingredient}</li>`) 
        
         
         const measureArray = Object.keys(cocktail).filter(function(keyName){
      
          if(cocktail[keyName] !== null &&  cocktail[keyName] !=="" && keyName.includes("strMeasure")) {
              return keyName
            
          }
  
       }) .map(key => cocktail[key]);
       measureArray.forEach(measure => measure)
       
    function fullI() {
          for ( var i = 0; i < ingredientsArray.length; i++ ){
              if(measureArray[i]){
                  drinkIngredients.innerHTML +=`<li>${ingredientsArray[i]} ${measureArray[i]}</li>`
              }
              else{
                  drinkIngredients.innerHTML +=`<li>${ingredientsArray[i]}</li>`
              }   
  } 
       } fullI()
  } addCocktailI(cocktail)
  
   
  
      const drinkInstructions = document.createElement('div')
      drinkInstructions.innerHTML = "Directions"
      drink.appendChild(drinkInstructions)
  
    function addInstructions() {
      const instructionsArray = Object.keys(cocktail).filter(function(keyName){
      
          if(cocktail[keyName] !== null &&  cocktail[keyName] !=="" && keyName !=="strInstructionsDE" && keyName !=="strInstructionsIT" && keyName.includes('strInstructions')) {
              return keyName
          }
          }).map(key => cocktail[key])
          instructionsArray.forEach(instructions => drinkInstructions.innerHTML += 
            `<p>${instructions}</p>`
           )
         } addInstructions()

 function favorites(){
    const myFavoriteButton=document.createElement('button')
    myFavoriteButton.id = "favorite"
    myFavoriteButton.innerHTML = `<i class="fas fa-cocktail"></i> Add to Favorties <i class="fas fa-cocktail"></i> `
    drink.appendChild(myFavoriteButton)
    myFavoriteButton.addEventListener("click", handlesfavorite)
 }

favorites()

function handlesfavorite() {
    if(favoriteContainer.className === "hidden"){
        favoriteContainer.classList.remove("hidden")
    }
    const div =document.createElement('div')
    const p = document.createElement('p')
    p.innerHTML=`${cocktail.strDrink}`
    favoriteContainer.appendChild(div)
    let btn = document.createElement('button')
    btn.id="remove"
    btn.addEventListener('click', deleteTask)
    btn.textContent='remove'
    const span = document.createElement("span")
    span.appendChild(btn)
    p.appendChild(btn)
    div.appendChild(p)
 }
 function deleteTask(task){
    task.target.parentNode.remove()
  }
 

return drink
}

function favorties(){
const title = document.createElement("h3")
title.textContent =" Favorties"
favoriteContainer.appendChild(title)
}

const favoriteContainer=document.querySelector("#favorite-container")

      
function getForm() {
    const pypButton = document.querySelector('#pyp')
    return pypButton.addEventListener("click", hideForm)
    
}
const form = document.querySelector("#forms")
function hideForm() {
     if(form.style.display === "block"){
         form.style.display = "none"
     }
     else{
         document.getElementById('drink-of-the-day').innerHTML=''
         form.style.display ="block"
     }
    }

function handlesForms() {
     const form = document.getElementById('form')
     form.addEventListener('submit', event =>{
        event.preventDefault()
        if (drinksContainer.innerHTML) {
            drinksContainer.innerHTML = '';
        }
     const cocktailSearch =event.target.search1.value + event.target.search2.value 
     
     fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailSearch}`)
     .then((resp) =>resp.json())
     .then(data => data.drinks.forEach(renderSearchDrink))
     form.reset()
    })
 }

init()
