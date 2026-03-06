const catagorisContainer = document.getElementById("catagorisContainer");
const cardsContainer = document.getElementById("cardsContainer");
const loadingSpenner = document.getElementById("loadingSpenner");
const allTrees = document.getElementById("allTrees");
const treeDetailsModal = document.getElementById("tree_details_modal");

const modalTitle =document.getElementById("modalTitle");
const modalImage =document.getElementById("modalImage");
const modalCatagory =document.getElementById("modalCatagory");
const modalDiscription =document.getElementById("modalDiscription");
const modalPrice =document.getElementById("modalPrice");


// fetch("https://openapi.programming-hero.com/api/categories")
// .then((res) => res.json())
// .then((data)=> console.log(data.categories)); 

function ShowLoding(){
    loadingSpenner.classList.remove("hidden");
    cardsContainer.innerHTML="";
};
function hideLoding(){
    loadingSpenner.classList.add("hidden");
}

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
        btn.innerText = catagori.category_name;
        btn.onclick = () => activeBtn(catagori.id, btn);
        catagorisContainer.append(btn);
        // console.log(catagori)
    });
};

async function activeBtn(id, btn){
    ShowLoding();
    const allBtns = document.querySelectorAll("#catagorisContainer button , #allTrees");
    allBtns.forEach(allBtn => {
        allBtn.classList.remove("btn-active");
        allBtn.classList.add("btn-outline");
    });
    
    btn.classList.add("btn-active");
    btn.classList.remove("btn-outline");

    const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
    const data = await res.json();
    displayTrees(data.plants);
    hideLoding();
    // console.log(data);
}

allTrees.addEventListener("click", ()=>{
    const allBtns = document.querySelectorAll("#catagorisContainer button , #allTrees");
    allBtns.forEach(allBtn => {
        allBtn.classList.remove("btn-active");
        allBtn.classList.add("btn-outline");
    });
    
    allTrees.classList.add("btn-active");
    allTrees.classList.remove("btn-outline");
    loadTreeCards();
})

function displayTrees(trees) {
    cardsContainer.innerHTML="";
    trees.forEach(tree => {
        const treeCard = document.createElement("div");
        treeCard.className = "card bg-base-100 shadow-sm";
        treeCard.innerHTML = `
                        <figure>
                            <img src="${tree.image}"
                                alt="Shoes" class="h-48 w-full object-cover"/>
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title" onclick="openTreeModal(${tree.id})">${tree.name}</h2>
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
    });
    hideLoding();
}

async function loadTreeCards() {
    ShowLoding();
    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json();
    displayTrees(data.plants);
}
loadTreeCards();

async function openTreeModal (id){
    const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
    const data = await res.json();
    const plantDetails = data.plants;

    modalTitle.textContent = plantDetails.name;
    modalImage.src = plantDetails.image;
    modalCatagory.textContent = plantDetails.category;
    modalDiscription.textContent = plantDetails.description;
    modalPrice.textContent = plantDetails.price;
    treeDetailsModal.showModal();

}


// {
//     "id": 1,
//     "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
//     "name": "Mango Tree",
//     "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
//     "category": "Fruit Tree",
//     "price": 500
// }