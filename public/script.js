window.onload=()=>{


    let conjunct=[]
    if(JSON.parse(localStorage.getItem('Atazak'))!==null){
        conjunct= JSON.parse(localStorage.getItem('Atazak'))
    }
    let ul= document.getElementById("ul")
    conjunct.forEach(e=>{
        let li= document.createElement('li')
        li.appendChild(document.createTextNode(e['text']))
        ul.appendChild(li)
    })

    let i=0
    document.addEventListener('keydown', (e)=>{
        if(e.key==="Enter"){
            let text=document.getElementById("texto").value
            conjunct.push({
                'text':text
            })
            localStorage.setItem('Atazak', JSON.stringify(conjunct))
            let li= document.createElement('li')
            li.appendChild(document.createTextNode(text))
            ul.appendChild(li)
            document.getElementById("texto").value=""

        }
    })

    document.getElementById("botonBorrar").addEventListener('click', ()=>{
        localStorage.clear()
        document.getElementById('ul').textContent=""
        i=0
        conjunct=[]
    })

    document.getElementById("botonSubir").addEventListener('click', ()=>{
        console.log("Se han subido correctamente")
        fetch('/', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(conjunct)
        })
            .then(r => r.text()) // use r.json() if you expect to get a json response
            .then(r => console.log(r))
    })

    document.getElementById("botonDescargar").addEventListener('click', async ()=>{
        let res=[]
        await fetch("/download").then(r=>r.json()).then(data=>res=data)
        console.log(res)
        localStorage.setItem('Atazak',res)
        res.forEach(e=>{
            let li= document.createElement('li')
            li.appendChild(document.createTextNode(e['text']))
            ul.appendChild(li)
        })
    })


}