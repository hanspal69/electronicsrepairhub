/*  Description: script for electronics repair hub webpage,  
    Author: Vineet W. Singh,
    Date: 2020-08-31
*/

/* check if an element is visible on a page */
function isVisible (ele) {
    var style = window.getComputedStyle(ele);
    return (style.width !== "0" &&
    style.height !== "0" &&
    style.opacity !== "0" &&
    style.display!=='none' &&
    style.visibility!== 'hidden');
}


/* add an event-listner to handle clicks on the navbar and menu items to set 
active item and collapse menu on a mobile device when clicked */
document.querySelector('.navbar').addEventListener('click', e => {
    if (e.target.matches('.navbar-brand')){
        document.getElementById("menuItemsList").querySelectorAll('.nav-item').forEach(
            e => e.firstElementChild.classList.remove("active")
        );
        document.getElementById("menuItemsList").firstElementChild.firstElementChild.classList.add("active");
    }
    else if (e.target.matches('.nav-link')){
        /* process each nav-item on the nav-bar */
        e.target.closest('.nav-item').parentElement.querySelectorAll('.nav-item').forEach(element => {
            element.firstElementChild.classList.remove("active");
            /* check if current element has been clicked */
            if (e.target===element.firstElementChild){
                element.firstElementChild.classList.add("active");
            }
        });
        /* collapse menu if viewed on a mobile device where collapse button
        is visible */
        if (isVisible(document.getElementById("menuButton"))){
            document.getElementById("menuButton").click();
        }
    }
});


/* add an event listener on the card deck and close all open cards when a card is clicked */
document.querySelector('.card-deck').addEventListener('click', e=> {
    /* process all cards*/
    const currentCard = e.target.closest('.card');
    currentCard.parentElement.parentElement.querySelectorAll('.card').forEach(e=> {
        /* process all cards*/
        if (e!==currentCard){
            /* check if not current card */
            const currentCardText = e.querySelector('.card-body').querySelector('.card-text');
            if (isVisible(currentCardText)) {
                /* check if card-text is open, if so hide it - use bootstrap jquery*/
                $(`#${currentCardText.id}`).collapse('hide');
            }
        }
    });
});


/* multiply pageYOffset (offset) by a number < 1 for different - slower scroll rate for background image
       multiply offset by 1 for fixed background image same as background-attachment: fixed;
       multiply offset by a number > 1 for a reverse scroll image will overflow and scroll in 
       the opposite direction - there should be no space between the number and px otherwise image will not scroll 
*/

/*
window.addEventListener("scroll", () => {
    document.getElementById("home").style.backgroundPositionY =  `${window.pageYOffset * 0.7}px`;
});
*/


window.setInterval(()=>{
    const element = document.getElementById("home");
    if (isVisible(element)){
        if (window.matchMedia('(min-width:320px) and (max-width:414px) and (orientation:portrait)').matches){
            document.getElementById("home").style.backgroundImage = 
                `url('assets/img/home${Math.floor(Math.random()*3)+3}.jpg')`;
        }
        else {
            document.getElementById("home").style.backgroundImage = 
                `url('assets/img/home${Math.floor(Math.random()*3)}.jpg')`;
        }
    }
}, 6000);
