//console.log("test me please")

//base Url
const baseUrl="http://localhost:3035"

//Create a function to take in the data when the user inputs details.
function collectData(){
//Access the element
    const form = document.querySelector("form")
    //console.log(form)
//Attach an eventlistener to the submit event
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const formData= {
            "name" : e.target.name.value,
            "product":e.target.product.value,
            "email":e.target.email.value,
            "phoneNumber":e.target.phoneNumber.value,
            "address":e.target.address.value

        }
        form.reset() 
            console.log(formData)
            postData(formData)
            
    })
}
collectData()

//Creation of API


//POST METHOD-DONE
function postData (formData) {
    fetch(`${baseUrl}/customers`, {
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
}

//GET METHOD-DONE
function fetchCustomers() {
    fetch(`${baseUrl}/customers`) 
        .then(resp => resp.json()) 
        .then(data => data.forEach((item)=>{
            displayCustomers(item)
        } ))
        .catch(error => console.error('Error:', error)); 
}

fetchCustomers();
//Add the data captured to the table.
//select the table.
//Append the data to table.



function displayCustomers(item){
    const tableBody = document.querySelector('#body')
  //console.log(tableBody)
    //Creating a Table row
    const row = document.createElement('tr');
    row.innerHTML = `
        <th scope='row'>${item.id}</th>
        <td>${item.name}</td>
        <td>${item.products}</td>
        <td>${item.email}</td>
        <td>${item.phoneNumber}</td>
        <td>${item.address}</td>
        <td>
            <button type="button" class="btn btn-warning" id ="update">Update</button>
            <button type="button" class="btn btn-danger" id ="delete">Delete</button>
        </td>
    `
    
    tableBody.appendChild(row);


// DELETE METHOD-DONE
const deleteButton = row.querySelector('#delete'); 
deleteButton.addEventListener('click', () => {
    fetch(`${baseUrl}/customers/${item.id}`, { 
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json' 
        }
    })
    .then(resp => {
        if (!resp.ok) {
            throw new Error('Not ok'); 
        }
        return resp.json(); 
    })
    .then(data => console.log(data)) 
    .catch(error => console.error('Error:', error)); 
})
}

//UPDATE METHOD

// Add event listener for the update button
// Ensure you are selecting the correct button using the appropriate selector(doc.querySelector)
const updateButton = row.querySelector('#update'); // Ensure this is after the row is appended
    updateButton.addEventListener('click', () => {
        const updatedData = {
            name: prompt("Enter new name:", item.name) || item.name,
            product: prompt("Enter new product:", item.product) || item.product,
            email: prompt("Enter new email:", item.email) || item.email,
            phoneNumber: prompt("Enter new phone number:", item.phoneNumber) || item.phoneNumber,
            address: prompt("Enter new address:", item.address) || item.address
        };

        fetch(`${baseUrl}/customers/${item.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
        .then(resp => {
            if (!resp.ok) {
                throw new Error('Network response was not ok');
            }
            return resp.json();
        })
        .then(data => {
            console.log(data);
          //  fetchCustomers(); // Refresh the customer list after update
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
