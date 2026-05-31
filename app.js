let your_Balance=document.querySelector("#your-balance");
let income_Balance=document.querySelector("#income-balance");
let expense_Balance=document.querySelector("#expense-balance");
let desc_Input=document.querySelector("#description");
let amount_Input=document.querySelector("#amount");
let type=document.querySelector("#type");
let add_btn=document.querySelector("#add-btn");
let history_Info=document.querySelector(".history-info2");
 


add_btn.addEventListener("click",()=>{
     if(desc_Input.value === "" || amount_Input.value === ""){
        alert("Please fill all fields");
        return;
    }
   const transaction={
    id: Date.now(),
    description: desc_Input.value,
    amount: amount_Input.value,
    type: type.value,
    date:new Date().toLocaleDateString()
};
transactions.unshift(transaction);
saveLocalStorage();
console.log(transactions);
clearData();
renderFunction();
updateSummary();
})
let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];
    

const saveLocalStorage=()=>{
 localStorage.setItem("transactions",JSON.stringify(transactions));
}
const clearData=()=>{
    desc_Input.value="";
    amount_Input.value="";
}

const updateSummary = () => {
    let income = 0;
    let expense = 0;
    transactions.forEach((transaction) => {
        if(transaction.type==="Income"){
            income+=Number(transaction.amount);
        }
        else if(transaction.type==="Expense"){
            expense+=Number(transaction.amount);
        }
        
    });
    let balance=income-expense;
        your_Balance.innerText = `₹${balance}`;
        income_Balance.innerText = `₹${income}`;
        expense_Balance.innerText = `₹${expense}`;
}
//render function
const renderFunction = () => {

    history_Info.innerHTML = "";

    transactions.forEach((transaction) => {

        const row = document.createElement("div");
        row.classList.add("transaction-item");

        // Left Section
        const left = document.createElement("div");
        left.classList.add("transaction-left");

        const icon = document.createElement("div");
        icon.classList.add("transaction-icon");

        const info = document.createElement("div");

        const title = document.createElement("p");
        title.innerText = transaction.description;

        const date = document.createElement("small");
        date.innerText = transaction.date;

        info.appendChild(title);
        info.appendChild(date);

        // Dynamic Icon
        if (transaction.type === "Income") {
            icon.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
            icon.classList.add("income-icon");
        } else {
            icon.innerHTML = '<i class="fa-solid fa-arrow-down"></i>';
            icon.classList.add("expense-icon");
        }
        left.appendChild(icon);
        left.appendChild(info);
        // Amount
        const amount = document.createElement("p");

        if (transaction.type === "Income") {
            amount.innerText = `+₹${transaction.amount}`;
            amount.classList.add("amount-income");
        } else {
            amount.innerText = `-₹${transaction.amount}`;
            amount.classList.add("amount-expense");
        }
        // Delete Button
        const deleteBtn = document.createElement("button");

        deleteBtn.innerHTML =
            '<i class="fa-solid fa-trash"></i>';
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            deleteTransaction(transaction.id);
        });

        // Append Everything
        row.appendChild(left);
        row.appendChild(amount);
        row.appendChild(deleteBtn);

        history_Info.appendChild(row);
    });
};

const deleteTransaction = (id) => {
    transactions = transactions.filter(
        transaction => transaction.id !== id
    );
    saveLocalStorage();
    renderFunction();
    updateSummary();
}
renderFunction();
updateSummary();

