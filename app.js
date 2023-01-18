// Elementleri Seçme

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");

const github = new Github();
const ui = new UI();

eventListeners();


function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
}

function getData(e) {
    let username = nameInput.value.trim(); // sağ ve solda bırakılan gereksiz boşlukları temizlemek için trim kullanıldı.

    if(username === ""){
        alert("Lütfen geçerli bir kullanıcı adı girin!");
    }
    else {
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
                ui.showError("Kullanıcı bulunamadı!");
            }
            else {
                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err => ui.showError(err));
    }

    ui.clearInput(); // Input temizleme
    e.preventDefault();
}

function clearAllSearched(){
    // Tüm arananları temizle
    if(confirm("Emin misiniz?")){
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedFromUI();
        ui.showSuccess("Son arananlar başarıyla silindi!");
    }
    
}

function getAllSearched(){
    // Arananları storage dan al ve ui ya ekle
    let users = Storage.getSearchedUsersFromStorage();

    let result = "";
    users.forEach(user => {
        // <li class="list-group-item">asdaskdjkasjkşdjşasjd</li>
        result += `<li class="list-group-item">${user}</li>`

    });

    lastUsers.innerHTML = result;
}