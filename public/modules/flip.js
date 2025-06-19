const cards = document.querySelectorAll(".pokemon-card");

cards.forEach((card) => {
  card.addEventListener("click", async () => {
    const name = card.dataset.name;

    const frontCard = document.querySelector(
      `.pokemon-view.card-front[data-name="${name}"]`,
    );
    const backCard = document.querySelector(
      `.pokemon-view.card-back[data-name="${name}"]`,
    );

    if (!card.classList.contains("clicked")) {
      const response = await fetch(`/api/pokemon/${name}/details`);
      if (!response.ok) throw new Error(`Failed to get a response: ${response.status}`);

      const data = await response.json();

      const typesElement = document.querySelector(
        `.pokemon-view.card-back[data-name="${name}"] .types`,
      );
      typesElement.replaceChildren();

      data.types.forEach((type) => {
        const typeImg = document.createElement("img");
        typeImg.src = type.sprite;
        typeImg.alt = type.name;
        typeImg.classList.add("type-view");
        typesElement.appendChild(typeImg);
      });

      card.classList.add("clicked");
    }

    card.classList.toggle("active");
    frontCard.classList.toggle("active");
    backCard.classList.toggle("active");
  });
});
