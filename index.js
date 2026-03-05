const catagorisContainer = document.getElementById("catagorisContainer");
const cardsContainer = document.getElementById("cardsContainer");


// fetch("https://openapi.programming-hero.com/api/categories")
// .then((res) => res.json())
// .then((data)=> console.log(data.categories)); 

async function loadCatagoris() {
    const res = await fetch("https://openapi.programming-hero.com/api/categories");
    const data = await res.json();
    displayCatagoris(data.categories);
}
loadCatagoris();

function displayCatagoris(catagoris) {
    catagoris.forEach(catagori => {
        const btn = document.createElement("button");
        btn.className = "btn btn-outline btn-success w-full";
        btn.innerText = catagori.category_name
        catagorisContainer.append(btn);
    });
};

async function loadTreeCards() {
    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json();
    displayTrees(data.plants);
}
loadTreeCards();

function displayTrees(trees) {
    trees.forEach(tree => {
        const treeCard = document.createElement("div");
        treeCard.className = "card bg-base-100 shadow-sm";
        treeCard.innerHTML = `
                        <figure>
                            <img src="${tree.image}"
                                alt="Shoes" class="h-48 w-full object-cover"/>
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title">${tree.name}</h2>
                            <p class="line-clamp-2">${tree.description}</p>
                            <div class="flex justify-between">
                                <div class="badge badge-soft badge-success">${tree.category}</div>
                                <div><p>৳${tree.price}</p></div>
                            </div>
                            <div class="card-actions justify-end w-full text-white">
                                <button class="btn bg-[#15803D] w-full text-white rounded-full">Add to Cart</button>
                            </div>
                        </div>
        `;
        cardsContainer.append(treeCard);
        console.log(tree)
    });
}