const parallaxBg = () => {
    const homeBackground = document.querySelector(".parallax-bg");
    const allPokemonView = document.querySelector(".all-pokemon-view");

    if (!homeBackground) return;

    window.addEventListener("mousemove", function(e) {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 2;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 2;

        homeBackground.style.transform = `translate(${xPos * 20}px, ${yPos * 20}px)`;

        if(allPokemonView) {
            allPokemonView.style.transform = `translate(${xPos * 5}px, ${yPos * 5}px)`;
        }
    });
};

parallaxBg();