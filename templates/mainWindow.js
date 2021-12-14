var inputObj = document.createElement('input');
inputObj.setAttribute('id', 'file');
inputObj.setAttribute('type', 'file');
inputObj.setAttribute('name','file');
inputObj.setAttribute('style', 'visibility:hidden');
inputObj.value
document.body.appendChild(inputObj);
var a = document.createElement('a');
var selectImg = document.querySelector("#selectImg")
var submit = document.querySelector("#submit")
var down = document.querySelector("#down")
var img_id = document.querySelector("#img_id")


var original_src,gt_src, fpn1,fpn2,fpn3,fpn4,fpn5

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

inputObj.addEventListener('change', e => {
    console.log(e.target.files)
    entry = e.target.files[0]
    document.querySelector('#display').src=entry.path
    original_src = entry.path
    var formData = new FormData();
    var fileField = document.querySelector("input[type='file']");

    formData.append('username', 'abc123');
    formData.append('file', fileField.files[0]);

    fetch("http://10.212.67.40:5000/uploader", {
        method: 'POST',
        body: formData,
        files: fileField.files[0]
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
    }
);

selectImg.addEventListener('change', e => {
    console.log(e.target.files)
    entry = e.target.files[0]
    document.querySelector('#display').src=entry.path
    original_src = entry.path
    gt_src = 'D:\\dataset\\VisDrone2019-DET-val-gt\\' + original_src.split('\\')[4]
    console.log(original_src)
    console.log(original_src.split('\\'))
    submit.click()
    }
    
);


document.querySelector("#closeBtn").addEventListener("click", ()=> {
    if(confirm("Do you really want to leave?", "Istanbul Flight Hub")){
        window.api.send("closeBtn")
    }
})

document.querySelector("#open_file").addEventListener("click", ()=> {
    // inputObj.click()
    selectImg.click()
    window.api.send("flash")
    
    
})
document.querySelector("#fpn1").addEventListener("click", ()=> {
    // window.api.send("downImg", 'asdf')
    // img_id.value="query.jpg"
    // down.click()
    // document.querySelector('#display').src = img_path
    
    a.href = "http://10.212.67.40:5000/download?name=fpn_0.png"
    a.click();
    sleep(300);
    document.querySelector('#display').src = "./img/fpn_0.png?"+Math.random()
    // window.URL.revokeObjectURL(url);
})
document.querySelector("#fpn2").addEventListener("click", ()=> {
    a.href = "http://10.212.67.40:5000/download?name=fpn_1.png"
    a.click();
    sleep(300);
    document.querySelector('#display').src = "./img/fpn_1.png?"+Math.random()
})
document.querySelector("#fpn3").addEventListener("click", ()=> {
    a.href = "http://10.212.67.40:5000/download?name=fpn_2.png"
    a.click();
    sleep(300);
    document.querySelector('#display').src = "./img/fpn_2.png?"+Math.random()
})
document.querySelector("#fpn4").addEventListener("click", ()=> {
    a.href = "http://10.212.67.40:5000/download?name=fpn_3.png"
    a.click();
    sleep(300);
    document.querySelector('#display').src = "./img/fpn_3.png?"+Math.random()
    
})
document.querySelector("#fpn5").addEventListener("click", ()=> {
    a.href = "http://10.212.67.40:5000/download?name=fpn_4.png"
    a.click();
    sleep(300);
    document.querySelector('#display').src = "./img/fpn_4.png?"+Math.random()
    
})
document.querySelector("#predict").addEventListener("click", ()=> {
    a.href = "http://10.212.67.40:5000/download?name=dynamic_result.png"
    a.click();
    sleep(300);
    document.querySelector('#display').src = "./img/dynamic_result.png?"+Math.random()
    
})
document.querySelector("#ufp").addEventListener("click", ()=> {
    a.href = "http://10.212.67.40:5000/download?name=ufp.png"
    a.click();
    sleep(300);
    document.querySelector('#display').src = "./img/ufp.png?"+Math.random()
    
})
document.querySelector("#ufpmp-det").addEventListener("click", ()=> {
    a.href = "http://10.212.67.40:5000/download?name=ufpmp_result.png"
    a.click();
    sleep(300);
    document.querySelector('#display').src = "./img/ufpmp_result.png?"+Math.random()
    
})
document.querySelector("#original").addEventListener("click", ()=> {
    
    document.querySelector('#display').src = original_src
})

document.querySelector("#gt").addEventListener("click", ()=> {
    
    document.querySelector('#display').src = gt_src
})
