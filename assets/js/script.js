/*  Description: script for electronics repair hub webpage,  
    Author: Vineet W. Singh,
    Date: 2021-01-09
*/



/* var startImgNo=1; 
var id=null; */

/* check if an element is visible on a page */
function isVisible (ele) {
    const style = window.getComputedStyle(ele);
    return (style.width !== "0" &&
    style.height !== "0" &&
    style.opacity !== "0" &&
    style.display!=='none' &&
    style.visibility!== 'hidden');
}


/* 
window.setInterval(()=>{
    const element = document.getElementById("headerImage");
        if (isVisible(element)){
            startImgNo=startImgNo===6?1:startImgNo+1;
            if (window.matchMedia('(min-width:320px) and (max-width:414px) and (orientation:portrait)').matches){
                element.style.backgroundImage=`url('assets/img/home${smartImgNo+6}.jpg')`;
            }
            else {
                element.style.opacity=0;
                element.style.backgroundImage=`url('assets/img/home${startImgNo}.jpg')`; 
                let ctr = 1;
                id = setInterval(()=>fadeOut,10);   
                id = setInterval(fadeIn,40);   
                 
            }
        }
}, 5000);

function fade(type,element){
    /* get element opacity and do operation */
    if (type==='in'){
        if (ctr>1) clearInterval(id);
    }
    else
    {
        if (ctr<1) clearInterval(id);
    }
    element.style.opacity=vOp;
    ctr=type==='in'?ctr+0.04:ctr-0.04;
} 
 */