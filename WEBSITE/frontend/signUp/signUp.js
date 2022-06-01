function next() {
    let options = document.querySelector('input[name="option"]:checked').value
    if (options == "schoolManager") {
        window.location = "../signUpSchoolManager/signUpSchoolManager.html"
    }
    else if (options == "networkManager") {
        window.location = "../signUpNetworkManager/signUpNetworkManager.html"
    }
    else {
        window.alert("Selecione uma das opções")
    }
}