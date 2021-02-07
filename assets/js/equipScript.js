import {equipData} from './data.js';

/* check if an element is visible on a page */

function isVisible (ele) {
    const style = window.getComputedStyle(ele);
    return (style.width !== "0" &&
    style.height !== "0" &&
    style.opacity !== "0" &&
    style.display!=='none' &&
    style.visibility!== 'hidden');
}

window.addEventListener('DOMContentLoaded', () => {
    /* get the card-deck element*/
    const cardDeck=document.getElementById("cardDeck");
    /* add a card for each element in the equipData array */
    equipData.forEach(ele=>{
        cardDeck.insertAdjacentHTML('beforeend', setCardContent(ele));
        //add a bootstrapcollapse remember to add data-parent="#cardDeck" data-toggle="collapse" to implement BSN collapse
        //new BSN.Collapse(`#cardLink${ele.ID}`);
    });
    /* add an event listener on the card deck*/
    cardDeck.addEventListener('click', e=> {
        /*get the card that was clicked*/
        const currentCard = e.target.closest('.card');
        /*get the id of the current card*/
        const currentCardId=parseInt(currentCard.id,10);
        /* check in which device/media this was called*/
        if (
            (window.matchMedia('(min-width:320px) and (max-width:480px) and (orientation:portrait)').matches)
        ||  (window.matchMedia('(min-width: 600px) and (max-width: 800px) and (orientation:portrait)').matches)
        || (window.matchMedia('(min-width:1024px)  and (min-height:1366px) and (orientation:portrait)').matches)
        || (window.matchMedia('(min-width:280px) and (max-width:319.98px) and (min-height:653px) and (orientation:portrait)').matches)    
        ) {
            /* phones or tablets in portrait - set modal  display */
             /* for tablets in portrait mode set modal display */
                /* update modal body */
                updateModalBody(currentCardId);
                /* add appropriate classes to modal elements */
                document.querySelector('#modalBodyImageCol').classList.add("col-12");
                document.querySelector('#modalBodyContentCol').classList.add("col-12");
                /* show modal */
                cardModalInstance.toggle();
        }
        else if (window.matchMedia('(min-width: 568px) and (max-width:869px) and (orientation:landscape)').matches)
        {
            /* for phones in landscape mode set modal display */
            /* update modal body */
            updateModalBody(currentCardId);
            /* add appropriate classes to modal elements */
            document.querySelector('#modalBodyContentCol').classList.add("col-12");
            /* show modal */
            cardModalInstance.toggle();
        }
        else{
                /* for all other screens set modal display */
                /* update modal body */
                updateModalBody(currentCardId);
                /* add appropriate classes to modal elements */
                document.querySelector('#modalBodyImageCol').classList.add("col-5");
                document.querySelector('#modalBodyContentCol').classList.add("col-7");
                /* show modal */
                cardModalInstance.toggle();
            }
    });

    const cardModalInstance = new BSN.Modal(
        // target selector
        '#cardModal', 
        // options object
        { 
        content: "", // sets modal content
        backdrop: 'static', // we don't want to dismiss Modal when Modal or backdrop is the click event target
        keyboard: false // we don't want to dismiss Modal on pressing Esc key
        }
    ); //end cardModalInstance

     //sub-function: update modal body with task details and set up a "mark as done" button
     const updateModalBody = id => {
        //get the content associated with the currently selected card and send it to the modal content setting function
        const ele = equipData.filter(element=>element["ID"]===id)[0];
        cardModalInstance.setContent(setModalContent(ele));
    }; //end sub-function --- updateModalBody 
});

function setModalContent(ele){
    //variables and constants used for modal 
    //prepare header
    const modalHeader = 
    `<!-- Modal Header -->
    <div class="modal-header">
        <h2 class="modal-title">${ele.Title}</h2>
        <span id="timesCloseButton">
            <button type="button" class="close" data-dismiss="modal" aria-label="close">&times;</button>
        </span>
    </div>`;
    //prepare footer
    const modalFooter = 
    `<!-- Modal Footer -->
    <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal" aria-label="close">Close</button>
    </div>`;
    //prepare description 
    //if ele.Description is not null add this description here
    const  modalBody4= 
    (ele.Description!=null)?
    `<div class="col-12 d-flex justify-content-center align-items-center" id="modalBodyContentColDesc">
        <h4> ${ele.Description} </h4>
    </div>` 
    :"";
    const modalBody1=`<!-- Modal Body -->
    <div class="modal-body">
    <div class="container-fluid">
        <div class="row d-flex align-items-center">` + modalBody4 +
            `<div class="d-flex align-items-center justify-content-center" id="modalBodyImageCol">
                <img class="img-fluid modalImage" src="./assets/img/${ele.ImageFileName}.jpg" alt="${ele.ImageAltText}">
            </div>
            <div class="d-flex justify-content-center" id="modalBodyContentCol">`;
    const modalBody2= 
    (ele.ListDescription!=null) ?
    `<div class="col-12" id="modalBodyContentColListHeading">
        <h4> ${ele.ListDescription} <h4>
    </div>`
    :"";
    //get array of list items/points
    const liItems=ele.ListPoints;
    //prepare the list 
    let modalBody3="";
    if (liItems.length!==0) {
        liItems.forEach(element=>modalBody3+=`<li>${element}</li>`);
        modalBody3=
        `<div class="row w-100">` + modalBody2 +
            `<div class="col-12" id="modalBodyContentColList">
                <ul> ${modalBody3}  </ul>
            </div>
        </div>`; 
    }
    const modalBody5=`</div> </div> </div> </div>`;
    const modalBody=modalBody1+modalBody3+modalBody5;
    return(modalHeader+modalBody+modalFooter);
}

function setCardContent(ele){
    //prepare cardHtml starting code
    const cardHtmlPart1 = `
    <div class="col-12 col-sm-6 d-flex justify-content-center">
        <div class="card" id="${ele.ID}">
            <img class="card-img-top" src="./assets/img/${ele.ImageFileName}.jpg" alt="${ele.ImageAltText}">
            <div class="card-body">
                <h4 class="card-title text-center">
                    <a id="cardLink${ele.ID}" href="#cardDetail${ele.ID}" class="stretched-link" > ${ele.Title} </a>
                </h4>`;

    //start card-text that collapses
    const cardHtmlPart2=`<div id="cardDetail${ele.ID}" class="card-text">`;                    

    //if ele.ListDescription is not null add this description here
    const cardHtmlPart3=(ele.ListDescription!=null)? 
    `<div class="row"> <div class="col-12"> <h5> ${ele.ListDescription} </h5> </div> </div>`:"";

    //get array of list items/points
    const liItems=ele.ListPoints;

    //make html ul - li  by looping through ListPoints array
    let cardHtmlPart4="";
    if (liItems.length!==0) {
        liItems.forEach(element=>cardHtmlPart4+=`<li>${element}</li>`);
        cardHtmlPart4=`<div class="row"> <div class="col-12" <ul> ${cardHtmlPart4}  </ul> </div> </div>`; 
    }

    //if ele.Description is not null add this description here
    const  cardHtmlPart5 =( ele.Description!=null)?
    `<div class="row"> <div class="col-12" <h5> ${ele.Description} </h5> </div> </div>`:"";

    // add all the closing div tags
    const cardHtmlPart6=`
                </div>
            </div>
        </div>
    </div>`;

    //prepare card html by adding all card parts
    const cardHtml=cardHtmlPart1+cardHtmlPart2+cardHtmlPart3+cardHtmlPart4+cardHtmlPart5+cardHtmlPart6;

    return(cardHtml);
}