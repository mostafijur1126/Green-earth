const catagorisContainer = document.getElementById("catagorisContainer");
const cardsContainer = document.getElementById("cardsContainer");
const loadingSpenner = document.getElementById("loadingSpenner");
const allTrees = document.getElementById("allTrees");
const treeDetailsModal = document.getElementById("tree_details_modal");

const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalCatagory = document.getElementById("modalCatagory");
const modalDiscription = document.getElementById("modalDiscription");
const modalPrice = document.getElementById("modalPrice");
const totalPrice = document.getElementById("totalPrice");
const emptyCartMassage = document.getElementById("emptyCartMassage");

let cart = [];


// fetch("https://openapi.programming-hero.com/api/categories")
// .then((res) => res.json())
// .then((data)=> console.log(data.categories)); 

function ShowLoding() {
    loadingSpenner.classList.remove("hidden");
    cardsContainer.innerHTML = "";
};
function hideLoding() {
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

async function activeBtn(id, btn) {
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

allTrees.addEventListener("click", () => {
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
    cardsContainer.innerHTML = "";
    trees.forEach(tree => {
        const treeCard = document.createElement("div");
        treeCard.className = "card bg-base-100 shadow-sm";
        treeCard.innerHTML = `
                        <figure>
                            <img src="${tree.image}"
                                alt="Shoes"
                                class="h-48 w-full object-cover cursor-pointer" 
                                onclick="openTreeModal(${tree.id})"/>
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title hover:text-green-700 cursor-pointer" onclick="openTreeModal(${tree.id})">${tree.name}</h2>
                            <p class="line-clamp-2">${tree.description}</p>
                            <div class="flex justify-between">
                                <div class="badge badge-soft badge-success">${tree.category}</div>
                                <div><p>৳${tree.price}</p></div>
                            </div>
                            <div class="card-actions justify-end w-full text-white">
                                <button class="btn bg-[#15803D] w-full text-white rounded-full" onclick="updateCart(${tree.id} , '${tree.name}', ${tree.price})" >Add to Cart</button>
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

async function openTreeModal(id) {
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

function updateCart(id, name, price) {
    const existingItem = cart.find((item) => item.id === id);
    if(existingItem){
        existingItem.quntity += 1;
    }else{
        cart.push({
            id,
            name,
            price,
            quntity: 1
        });
    }
    addToCart(cart);
}

function addToCart(cards) {
    const addToCardContainer = document.getElementById("addToCardContainer");
    addToCardContainer.innerHTML = "";
    if(cards.length === 0){
        emptyCartMassage.classList.remove("hidden");
        totalPrice.textContent = `${0}`;
        return;
    }
    emptyCartMassage.classList.add("hidden");
    let total = 0;
    cards.forEach(card => {
        console.log(card);
        total += card.price * card.quntity;
        const cartBox = document.createElement("div");
        cartBox.className = "p-5 space-y-3 bg-[#F0FDF4] rounded-md";
        cartBox.innerHTML = `
            <div class="flex justify-between">
                                    <h3 class="text-xl font-bold">${card.name}</h3>
                                    <button class="text-2xl" onclick="deleteCart(${card.id})">X</button>
                                </div>
                                <div class="flex justify-between">
                                    <p>৳ <span>${card.price}</span> x <span>${card.quntity}</span></p>
                                    <p>Total: ৳ <span>${card.price * card.quntity}</span></p>
                                </div>
        `;
        addToCardContainer.append(cartBox);
        totalPrice.innerText = total;
        // console.log(card)
    });
};

function deleteCart(treeId){
    const updatededCartElement = cart.filter(item => item.id != treeId);
    cart = updatededCartElement;
    console.log(cart);
    addToCart(cart);
}
