

const API_KEY = "5HcKUHkH2TJ8WFL33TOo4lV4Ueiibl259393KO4GhQE";

const aside = document.querySelector('aside');
const main = document.querySelector('#poster');

const ASIDEIMGNUM  = 6;
const MAINIMGNUM = 4;
const URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${ASIDEIMGNUM}`;


fetch(URL)
.then(res => res.json())
.then(data => showData(data))
.catch(e => {
    for(let i = 0; i < ASIDEIMGNUM; i++){
            
            let cont = document.createElement('div');
            cont.classList.add('savedimgCont');
            let img = document.createElement('img');
            img.classList.add('savedimg');
            img.setAttribute('src', `./img/img${i+1}.jpg`);
            cont.appendChild(img);
            aside.appendChild(cont); 
        }
});



function showData(data){
    data.forEach(item => {
        let cont = document.createElement('div');
        cont.classList.add('savedimgCont');
        let img = document.createElement('img');
        img.classList.add('savedimg');
        img.setAttribute('src', item.urls.full);
        cont.appendChild(img);
        aside.appendChild(cont);  
    });
    
}




for(let i = 0; i < MAINIMGNUM; i++){
    let field = document.createElement('div');
    field.classList.add('depot');
    field.style.backgroundImage = "./img/img1.jpg";
    
    let zone = document.createElement('h2');
    zone.innerText = `Zone ${i+1}`;

    field.appendChild(zone);

    main.appendChild(field);
}

function remplaceImage(){
    main.addEventListener('click', (e) => {
        initialiseSelection();
        if(e.target.matches('.depot, .depot *' )){
            let selectedZone;
            if(e.target.classList.contains('depot')){
                selectedZone = e.target;
            }else{
                selectedZone =  e.target.parentNode;
                
            }
            selectedZone.classList.add('selected');
            if(selectedZone.firstChild.src){
                verifySelected(selectedZone.firstChild.src);
            }
        }
    });
    aside.addEventListener('click', (e) => {
        let selectedZone = document.querySelector('.selected');
        if(selectedZone && e.target.matches('.savedimg')){
            
            
            let clickedItem = e.target;
            if(clickedItem.classList.contains('savedimg')){
                // let src = clickedItem.src.split('/')
                let img = document.createElement('img');
                img.classList.add('depotImg');
                img.setAttribute('src', clickedItem.src);
                
                selectedZone.innerHTML = "";
                selectedZone.appendChild(img);
                
            }

            
        }
    });
}

const initialiseSelection = () => {
    document.querySelectorAll('.depot').forEach(item => {
        item.classList.remove('selected');
    });
    document.querySelectorAll('.savedimgCont').forEach(item => {
        item.classList.remove('tick-mark');
    });
}

function verifySelected(src){
    document.querySelectorAll('.savedimgCont').forEach(item => {
        if(item.firstChild.src == src){
            // const check = document.createElement('div')
            // check.classList.add('tick-mark')
            item.classList.add('tick-mark');
            console.log("check", src, item.firstChild.src);
        }
        console.log("check",item.firstChild.src, src);
    });
}


remplaceImage();