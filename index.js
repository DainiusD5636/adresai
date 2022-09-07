let usersArray = [];

document.querySelector("#addAdress").addEventListener("click", (event) => {
  let name = userInput("#name");
  let phone = userInput("#phone");
  let userObject = {
    name: name,
    phone: phone,
    isEdit: false,
    isChecked: false,
  };
  usersArray.push(userObject);

  clearList();
  document.querySelector("#users").appendChild(createList());
  window.localStorage.setItem("users", JSON.stringify(usersArray));
});

window.addEventListener("load", (event) => {
  let data = window.localStorage.getItem("users");
  if (data != null) {
    data = JSON.parse(data);
    usersArray = data;
    createList();
  }
});

function createList() {
  let container = document.createElement("ul");

  usersArray.forEach((user, index) => {
    let list = document.createElement("li");

    let fieldName = document.createElement(user.isEdit ? "input" : "span");
    let fieldPhone = document.createElement(user.isEdit ? "input" : "span");

    if (user.isEdit) {
      fieldName.type = "text";
      fieldPhone.type = "number";
    }

    fieldName[user.isEdit ? "value" : "textContent"] = user.name;
    list.appendChild(fieldName);

    fieldPhone[user.isEdit ? "value" : "textContent"] = user.phone;
    list.appendChild(fieldPhone);

    let checkbox = document.createElement("button");
    checkbox.textContent = usersArray[index].isChecked ? "🗹" : "☐";
    checkbox.type = "button";

    checkbox.addEventListener("click", (event) => {
      usersArray[index].isChecked = !usersArray[index].isChecked;
      clearList();
      createList();
      window.localStorage.setItem("users", JSON.stringify(usersArray));
    });

    let edditButton = document.createElement("button");
    if (user.isEdit) {
      edditButton.textContent = "Save";
    } else {
      edditButton.textContent = "Edit";
    }
    edditButton.type = "button";

    edditButton.addEventListener("click", (event) => {
      if (usersArray[index].isEdit) {
        usersArray[index].name = fieldName.value;
        usersArray[index].phone = fieldPhone.value;
      }

      usersArray[index].isEdit = !usersArray[index].isEdit;
      clearList();
      createList();
      window.localStorage.setItem("users", JSON.stringify(usersArray));
    });

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.type = "button";

    deleteButton.addEventListener("click", (event) => {
      usersArray.splice(index, 1);
      clearList();
      createList();
      window.localStorage.setItem("users", JSON.stringify(usersArray));
    });

    list.appendChild(checkbox);
    list.appendChild(edditButton);
    list.appendChild(deleteButton);
    container.appendChild(list);
  });

  let checked = usersArray.some((user) => user.isChecked);

  if (checked) {
    let deleteChecked = document.createElement("button");
    deleteChecked.textContent = "Delete checked";
    deleteChecked.type = "button";

    deleteChecked.addEventListener("click", (event) => {
      let notCheckedUsers = usersArray.filter((user) => !user.isChecked);
      usersArray = notCheckedUsers;
      clearList();
      createList();
      window.localStorage.setItem("users", JSON.stringify(usersArray));
    });

    container.appendChild(deleteChecked);
  }

  return document.querySelector("#users").appendChild(container);
}

const userInput = (selector) => {
  return document.querySelector(selector).value;
};

function clearList() {
  document.querySelector("#users").innerHTML = "";
}
