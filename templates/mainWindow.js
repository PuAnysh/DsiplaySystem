var inputObj = document.createElement('input');
inputObj.setAttribute('id', 'file');
inputObj.setAttribute('type', 'file');
inputObj.setAttribute('name','file');
inputObj.setAttribute('style', 'visibility:hidden');
inputObj.value
document.body.appendChild(inputObj);

inputObj.addEventListener('change', e => {
    console.log(e.target.files)
    entry = e.target.files[0]
    document.querySelector('#display').src=entry.path
    }
);


document.querySelector("#closeBtn").addEventListener("click", ()=> {
    if(confirm("Do you really want to leave?", "Istanbul Flight Hub")){
        window.api.send("closeBtn")
    }
})

document.querySelector("#open_file").addEventListener("click", ()=> {
    inputObj.click()
    
})

