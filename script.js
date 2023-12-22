const modal = document.querySelector('.modal');
const crossBtn = document.querySelector('.cross-btn');
const openBtn = document.querySelector('#open-modal');
const h2 = document.createElement('h2');
const dataTable = document.querySelector('#dataTable')
const table = document.querySelector('#table');
dataTable.style.display = 'none';
const arr = []

const getData = async () => {
    const res = await fetch('./data.json');
    const data = await res.json();
    return data;
}

openBtn.style.display = 'block';
modal.style.display = 'none';

crossBtn.addEventListener('click', ()=> {
    modal.style.display = 'none';
    openBtn.style.display = 'block';
    dataTable.style.display = 'block'
})

openBtn.addEventListener('click', ()=> {
    modal.style.display = 'flex';
    openBtn.style.display = 'none';
    h2.style.display = 'none'
    dataTable.style.display = 'none'
    
})

const userDiv = document.createElement('div');
userDiv.classList.add('user-name')




getData().then(data => {
    console.log(data);
    return data.users.map(user=>{
        console.log(user);
        const userDiv = document.createElement('div');
        userDiv.classList.add('user-name')
        const h1 = document.createElement('h1');
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        h1.innerHTML += user.username;
        modal.appendChild(userDiv);
        userDiv.appendChild(h1);
        userDiv.appendChild(checkbox);
    

        checkbox.addEventListener('click', ()=> {
            if(checkbox.checked){
                arr.push(user.username);
                console.log(arr);
                const tbody = document.createElement('tbody');
                const tr = document.createElement('tr');
                const td1 = document.createElement('td');
                const td2 = document.createElement('td');
                const td3 = document.createElement('td');
                const td4 = document.createElement('td');
                const td5 = document.createElement('td');
                const td6 = document.createElement('td');
                const td7 = document.createElement('td');
                td1.innerHTML += user.id;
                td2.innerHTML += user.username;
                td3.innerHTML += user.email;
                td4.innerHTML += user.age;
                td5.innerHTML += user.address.city;
                td6.innerHTML += user.phone;
                const del = document.createElement('button');
                del.innerHTML = 'Delete';
                td7.appendChild(del);
                table.appendChild(tbody);
                tbody.appendChild(tr);
                tr.appendChild(td1);    
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                tr.appendChild(td7);

                del.addEventListener('click', ()=> {
                    tr.remove();
                    arr.pop();
                    console.log(arr);
                    if(arr.length == 0){
                        dataTable.style.display = 'none';
                    }

                    if(arr.length < data.users.length){
                        openBtn.style.display = 'block';
                    }

                    if(!arr.includes(user.username)){
                        userDiv.style.display = 'flex';
                    }
                })
            }
        })

        openBtn.addEventListener('click', ()=> {
            modal.style.display = 'flex';
            openBtn.style.display = 'none';
            checkbox.checked = false;
            if(arr.includes(user.username)){
                userDiv.style.display = 'none';
            }
        })

        crossBtn.addEventListener('click', ()=> {
            modal.style.display = 'none';
            openBtn.style.display = 'block';
            h2.style.display = 'block';

            if(arr.length == data.users.length){
                openBtn.style.display = 'none';
            }

            if(arr.length < data.users.length){
                openBtn.style.display = 'block';
            }

        })
    })
})


