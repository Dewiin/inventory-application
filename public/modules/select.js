const addPokemonCards = document.querySelectorAll(".add-pokemon-view");

addPokemonCards.forEach((card) => {
    card.addEventListener("click", () => {
        const name = card.dataset.name;
        const selectBox = document.querySelector(`.add-pokemon-view > div[data-name='${name}']`);
        const checkbox = document.querySelector(`.add-pokemon-view[data-name='${name}'] > input[type="checkbox"]`);

        const isAlreadySelected = selectBox.classList.contains("selected");

        let selectedPokemonCards = document.querySelectorAll(".add-pokemon-view .selected");
        if(isAlreadySelected) {
            selectBox.classList.remove("selected");
            checkbox.checked = false;
        }
        else if(selectedPokemonCards.length < 6) {
            selectBox.classList.add("selected");
            checkbox.checked = true;
        }
    })
})