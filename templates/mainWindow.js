var inputObj = document.createElement('input');
inputObj.setAttribute('id', 'file');
inputObj.setAttribute('type', 'file');
inputObj.setAttribute('name','file');
inputObj.setAttribute('style', 'visibility:hidden');
inputObj.value
document.body.appendChild(inputObj);


var original_src, fpn1,fpn2,fpn3,fpn4,fpn5

inputObj.addEventListener('change', e => {
    console.log(e.target.files)
    entry = e.target.files[0]
    document.querySelector('#display').src=entry.path
    original_src = entry.path
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
document.querySelector("#fpn1").addEventListener("click", ()=> {
    document.querySelector('#display').src="./img/mask.jpg"
})
document.querySelector("#fpn2").addEventListener("click", ()=> {
    document.querySelector('#display').src="./img/mask.jpg"
})
document.querySelector("#fpn3").addEventListener("click", ()=> {
    document.querySelector('#display').src="./img/mask.jpg"
})
document.querySelector("#fpn4").addEventListener("click", ()=> {
    document.querySelector('#display').src="./img/mask.jpg"
    
})
document.querySelector("#fpn5").addEventListener("click", ()=> {
    document.querySelector('#display').src="./img/mask.jpg"
    
})
document.querySelector("#original").addEventListener("click", ()=> {
    
    document.querySelector('#display').src="./img/original.jpg"
})
