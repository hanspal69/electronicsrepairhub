/*  Description: script for electronics repair hub webpage,  
    Author: Vineet W. Singh,
    Date: 2021-01-09
*/



let startImgNo=1; 

/* check if an element is visible on a page */
function isVisible (ele) {
    const style = window.getComputedStyle(ele);
    return (style.width !== "0" &&
    style.height !== "0" &&
    style.opacity !== "0" &&
    style.display!=='none' &&
    style.visibility!== 'hidden');
}



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
               /*  var vOp = 1;
                var id = setInterval(fadeOut,10);   
                function fadeOut(){
                    if (vOp<0) clearInterval(id);
                    else {
                        element.style.opacity=vOp;
                        vOp=vOp-0.05;
                    }
                }  */
                let vOp = 0;
                id = setInterval(fadeIn,40);   
                function fadeIn(){
                    if (vOp>1) clearInterval(id);
                    else {
                        element.style.opacity=vOp;
                        vOp=vOp+0.04;
                    }
                }  
            }
        }
}, 5000);
