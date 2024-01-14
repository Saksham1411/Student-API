const nameIn = document.getElementById('nameInput');
const rollno = document.getElementById('rollnoInput');
const Submitbtn = document.getElementById('submitBtn');
const getAllBtn = document.getElementById('getAllBtn');
let table = document.getElementById('output');

const URL = "http://localhost:3000/students";

Submitbtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(URL, {
            name: nameIn.value,
            rollno: rollno.value
        });
        nameIn.value = '';
        rollno.value = '';
        alert('Student added');
    // console.log(res);
    } catch (error) {
        alert('Student already exist');
    }
    
})

getAllBtn.addEventListener('click', showTasks);

async function showTasks() {
    const res = await axios.get(URL);
    const data = await res.data;

    table.innerHTML = ` <tr>
    <th>Name</th>
    <th>Rollno</th>
  </tr>`;
    data.forEach(student => {
        output = `
        <tr>
            <td>${student.name}</td>
            <td>${student.rollno}</td>
            <td><button><i class="fa-solid fa-trash del-btn" id=${student.rollno}></i></button></td>
            <td><button><i class="fa-solid fa-pen edit-btn" id=${student.rollno}></i></button></td>
        </tr>
        `
        table.innerHTML += output;
    });
    table.style.display = "block";
}

table.addEventListener('click', async (e) => {
    if (e.target.classList.contains('del-btn')) {
        let id = e.target.id;
        try{
            await axios.delete(`http://localhost:3000/students/${id}`);
            e.target.parentElement.parentElement.parentElement.remove();
        }catch(err){
            alert('Student cant deleted');
        }
    }

    if (e.target.classList.contains('edit-btn')) {
        let id = e.target.id;
        console.log(id);
        let changedName = prompt("Enter the new name");
        await axios.put(`http://localhost:3000/students/${id}`, { name: changedName });
        table.innerHTML = '';
        showTasks();
    }
})
