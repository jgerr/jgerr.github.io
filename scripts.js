faces = ['◕‿◕', '´ヮ`', '´ ▽ `', '｡•́‿•̀｡', '･д･', '｡• ω •｡', '･ᴗ･', '・ ε ・','⁄⁄•⁄ω⁄•//', '´ д `',  '╥﹏╥', '＞＿＜;', '╬ Ò﹏Ó', '¬‿¬', '⊙_⊙',  
'. •́ _ʖ •̀ .', '˵◕ω◕˵', '•ㅅ•❀',  '◉‿◉',  '͡ಠ ʖ̯ ͡ಠ', '´〇`'];
pagename = '';
active = -1;
wiped = false;

function saveState(idx){
    names=['DESIGN','ANIMATION','GAMES']
    pN = gelm('pageName');
    pagename = names[idx];//pN.innerHTML;
}

function gelm(id){
    return document.getElementById(id);
}
function replay(elm){
    elm.src = elm.src;
}

function expand(elm, second){
    var innards = gelm(second);
    var content = gelm('responsive');
    
    if (content.style.maxHeight){
        if (content.innerHTML != innards.innerHTML){
            setTimeout(function(){expand(elm, second);}, 500);
        }
        content.style.maxHeight = null;
        content.style.overflow = 'hidden';
    }
    else {
        content.style.maxHeight = '100%'; 
        content.innerHTML = innards.innerHTML;
    } 
}

function showContent(elm, second, long){
    var innards = gelm(second);
    var content = gelm('qualityContent');
    
    if (content.classList.contains('fadeIn')){
        if (content.innerHTML != innards.innerHTML){
            setTimeout(function(){showContent(elm, second, long);}, 400);
        }
        //content.style.opacity = '0';
        content.classList.remove('fadeIn');
        void content.offsetWidth;
        content.classList.add('fadeOut');
    }
    else { //SHOW content
        setTimeout(function(){ 
            if (long == 0){
                content.classList.remove('longContent');
                content.classList.add('shortContent');
                content.classList.add('centerParent');
            }
            else{
                content.classList.remove('shortContent');
                content.classList.remove('centerParent');
                content.classList.add('longContent');
            }
            
            //content.style.opacity = '1'; 
            content.classList.remove('fadeOut');
            void content.offsetWidth;
            content.innerHTML = innards.innerHTML;
            content.classList.add('fadeIn');}, 200);
    } 
}

function wipe(elm){
    var fronts = document.getElementsByClassName("front");
    var easeIn_anims = ['ei1-4', 'ei2-4', 'ei3-4', 'ei4-4'];
    var easeOut_anims = ['eo1-4', 'eo2-4', 'eo3-4', 'eo4-4'];
    var up_anims = ['u1-1', 'u2-1', 'u3-1', 'u4-1'];
    var down_anims = ['d1-1', 'd2-1', 'd3-1', 'd4-1'];
    var scoot_anims = ['s1-1', 's2-2', 's3-3', 's4-4'];
    var scootBack_anims = ['sb1-1', 'sb2-2', 'sb3-3', 'sb4-4'];
    
    idx = 0;
    for (i = 0; i < fronts.length; i++){
        if (fronts[i] == elm){
            idx = i
        }
    }

    if (wiped == false){
       for (i = 0; i < fronts.length; i++){
            fronts[i].classList.remove('fadeInDown');
            fronts[i].classList.remove(scootBack_anims[i]);
            void fronts[i].offsetWidth;
            fronts[i].classList.add(scoot_anims[i]);
        } 
        active = idx;
        wiped = true;
    } else{
        if (active == idx){ 
            for (i = 0; i < fronts.length; i++){
                fronts[i].classList.remove(scoot_anims[i]);
                void fronts[i].offsetWidth;
                fronts[i].classList.add(scootBack_anims[i]); 
            }
            active = -1
            wiped = false;
        }
        else{
            active = idx;
        }
        
    }
}


function changeExpression(){
    face = gelm('mainExpression');
    face.innerHTML = faces[Math.floor(Math.random() * faces.length)]; 
}

function changeBg(src){
    document.body.style.backgroundImage = 'url(' + src + ')';
}

function wipeBg(){
    document.body.style.backgroundImage = '';
}

function hover(str, elm){
    if (pagename != ''){
        pN = gelm('pageName');
        pN.innerHTML = str;
    }
}
function unhover(){
    if (pagename != ''){
        pN = gelm('pageName');
        pN.innerHTML = pagename;
    }
}

function swap(elm, match){
    elm.classList.remove('flipInX');
    elm.classList.add('flipOutXMatch');
    var back = gelm(match);
    back.classList.remove('flipOutXMatch');
    back.classList.add('flipInX');
    elm.style.zIndex = '0';
    back.style.zIndex = '1';
}

function zidx(elm){
    if (typeof(elm) == 'string'){
        elm = gelm(elm);
    }
    elm.style.zIndex=10;
}

function pulseOut(elm){
    if (typeof(elm) == 'string'){
        elm = gelm(elm);
    }
    elm.classList.remove('pulseIn');
    elm.classList.add('pulseOut');
}

function pulseIn(elm){
    if (typeof(elm) == 'string'){
        elm = gelm(elm);
    }
    elm.classList.remove('pulseOut');
    elm.classList.add('pulseIn');
}

function shakeIn(elm){
    if (typeof(elm) == 'string'){
        elm = gelm(elm);
    }
    elm.classList.add('shakeSmall');
    setTimeout(function(){shakeOut(elm);}, 2000);
}

function shakeOut(elm){
    if (typeof(elm) == 'string'){
        elm = gelm(elm);
    }
    elm.classList.remove('shakeSmall');
}
function fadeIn(elm, col, src, repeat, size){
    if (typeof(elm) == 'string'){
        elm = gelm(elm);
    }
    if (elm.style.backgroundImage == ''){
        rgba = 'rgba('+ col +')'
        elm.style.backgroundImage = 'linear-gradient(0deg,' + rgba + ',' + rgba + '), url(' + src + ')';
        elm.style.backgroundRepeat = repeat;
        elm.style.backgroundSize = size;
    
        elm.classList.remove('fadeOut');
        elm.classList.add('fadeIn');
    } else {
        elm.classList.remove('fadeIn');
        elm.classList.add('fadeOut');
        setTimeout(function(){elm.style.backgroundImage = ''; fadeIn(elm, col, src, repeat, size);}, 400);
    }
}

function fadeOut(elm){
    if (typeof(elm) == 'string'){
        elm = gelm(elm);
    }
    elm.classList.remove('fadeIn');
    elm.classList.add('fadeOut');
    setTimeout(function(){elm.style.backgroundImage = '';}, 400);
}

function fadeToggle(elm, col, src, repeat, size){
    if (typeof(elm) == 'string'){
        elm = gelm(elm);
    }
    if (elm.style.backgroundImage == ''){
        rgba = 'rgba('+ col +')'
        elm.style.backgroundImage = 'linear-gradient(0deg,' + rgba + ',' + rgba + '), url(' + src + ')';
        elm.style.backgroundRepeat = repeat;
        elm.style.backgroundSize = size;
    
        elm.classList.remove('fadeOut');
        elm.classList.add('fadeIn');
    } else {
        elm.classList.remove('fadeIn');
        elm.classList.add('fadeOut');
        if (active > -1){
            setTimeout(function(){elm.style.backgroundImage = ''; fadeIn(elm, col, src, repeat, size);}, 400);
        }
        else{
            setTimeout(function(){elm.style.backgroundImage = '';}, 400);
        }
    }
}

function flipIn(elm){
    if (typeof(elm) == 'string'){
        elm = gelm(elm);
    }
    elm.classList.remove('flipOutXMatch');
    elm.classList.add('flipInX');
}
function flipOut(elm){
    if (typeof(elm) == 'string'){
        elm = gelm(elm);
    }
    elm.classList.remove('flipInX');
    elm.classList.add('flipOutXMatch');
}
function flipToggle(elm){
    if (typeof(elm) == 'string'){
        elm = gelm(elm);
    }
    if (elm.style.opacity != 0){
        elm.classList.remove('flipInX');
        elm.classList.add('flipOutXMatch');

    }else{
        elm.classList.remove('flipOutXMatch');
        elm.classList.add('flipInX');
    }
}