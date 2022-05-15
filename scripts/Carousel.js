
//get collection of projects user is working on
function sendProjects(userProjects){
    console.log('here')
    console.log(userProjects)
const n=userProjects.length;
let indicatorsText=
            `<!-- Carousel Menu -->
            <ol class="carousel-indicators">`;
let bodyText=
            `<!-- Carousel Body -->
            <div class="carousel-inner text-center">`;
let controlsText=
            `<!-- Carousel Controls -->
            <a class="carousel-control-prev" href="#blog-carousel" role="button" data-bs-slide="prev">
                <i class="carousel-control-prev-icon"></i>
            </a>
            <a class="carousel-control-next" href="#blog-carousel" role="button" data-bs-slide="next">
                <i class="carousel-control-next-icon"></i>
            </a>`;
let fullText=
            `<!--Carousel -->
            <div id="blog-carousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="1000">`;

if(n==0){
    fullText="There are no projects yet. Click the button to create one."
}

else{
    indicatorsText+=`<li data-bs-target="#blog-carousel" data-bs-slide-to="0" class="active"></li>`;
    for(let i=0; i<n; i++){
        if(i!=0){
            indicatorsText+=`<li data-bs-target="#blog-carousel" data-bs-slide-to="${i}"></li>`;
        }
        bodyText+=
                `<!-- Slide ${i+1} -->
                <div id="slide-${i+1}" class="carousel-item active">
                    <img class="img-fluid" src="assets/bg-image.jpg">
                    <div class="carousel-caption">
                        <h5> Project ${i+1} </h5>
                        <p> Project ${i+1} description </p>
                        <button onclick="document.location='tasks/project${i+1}.html'"> Start Work </button>
                    </div>
                </div>`;
    } 
    indicatorsText+=`</ol>`;
    bodyText+=`</div>`;
    fullText+=indicatorsText+bodyText+controlsText+`</div>`
}

document.getElementById("blog-carousel").innerHTML=fullText;
}