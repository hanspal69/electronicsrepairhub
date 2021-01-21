

/* check if an element is visible on a page */

function isVisible (ele) {
    const style = window.getComputedStyle(ele);
    return (style.width !== "0" &&
    style.height !== "0" &&
    style.opacity !== "0" &&
    style.display!=='none' &&
    style.visibility!== 'hidden');
}

const main=()=>{
    const cardDeck=document.querySelector(".card-deck");
    servicesData.forEach(ele=>{
        //prepare cardHtml starting code
        const cardHtmlPart1 = `
                <div class="col-12 col-sm-6 col-lg-4 d-flex justify-content-center">
                    <div class="card" id="card${ele.ID}">
                        <img class="card-img-top" src="./assets/img/${ele.ImageFileName}.jpg" alt="${ele.ImageAltText}">
                        <div class="card-body">
                            <h4 class="card-title text-center">
                                <a id="cardLink${ele.ID}" href="#cardDetail${ele.ID}" class="stretched-link" data-toggle="collapse"> ${ele.Title} </a>
                            </h4>`;

        //start card-text that collapses
        const cardHtmlPart2=`<div id="cardDetail${ele.ID}" class="collapse card-text">`;                    

        //if ele.ListDescription is not null add this description here
        let cardHtmlPart3="";
        if (ele.ListDescription!=null){
            cardHtmlPart3=`<h5> ${ele.ListDescription} </h5>`;
        }
        
        //get array of list items/points
        const liItems=ele.ListPoints;

        //make html ul - li  by looping through ListPoints array
        let cardHtmlPart4="";
        if (liItems.length!==0) {
            liItems.forEach(element=>cardHtmlPart4+=`<li>${element}</li>`);
            cardHtmlPart4=`<ul> ${cardHtmlPart4}  </ul>`; 
        }
        
        //if ele.Description is not null add this description here
        let cardHtmlPart5="";
        if (ele.Description!=null){
            cardHtmlPart5=`<h5> ${ele.Description} </h5>`;
        }

        // add all the closing div tags
        const cardHtmlPart6=`
                            </div>
                        </div>
                    </div>
                </div>`;

        //prepare card html by adding all card parts
        const cardHtml=cardHtmlPart1+cardHtmlPart2+cardHtmlPart3+cardHtmlPart4+cardHtmlPart5+cardHtmlPart6;

        // add cardHtml to the main div
        cardDeck.insertAdjacentHTML('beforeend', cardHtml);
    });
    //new BSN.Collapse('#cardLink1');
};



                    