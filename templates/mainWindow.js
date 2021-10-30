document.querySelector("#closeBtn").addEventListener("click", ()=> {
    if(confirm("Do you really want to leave?", "Istanbul Flight Hub")){
        window.api.send("closeBtn")
    }
})