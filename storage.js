class Storage {

    static getSearchedUsersFromStorage(){
        // Tüm kullanıcıları al

        let users;

        if(localStorage.getItem("searched") === null){
            users = [];
        }
        else {
            users = JSON.parse(localStorage.getItem("searched"));
        }

        return users;
    }

    static addSearchedUserToStorage(username){
        // Kullanıcı Ekle

        let users = this.getSearchedUsersFromStorage();

        if(users.indexOf(username) === -1) { // -1 değeri dönüyorsa username, users içinde yok demektir
            users.push(username);
        }

        localStorage.setItem("searched",JSON.stringify(users));
    }

    static clearAllSearchedUsersFromStorage(){
        // Tüm Kullanıcıları Sil
        localStorage.removeItem("searched");
    }
}