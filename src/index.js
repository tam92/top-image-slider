import "./style.css";

const imagesSrc = [
    '/src/images/img1.jpg',
    '/src/images/img2.jpg',
    '/src/images/img3.jpg',
    '/src/images/img4.jpg',
    '/src/images/img5.jpg'
]
let currentImage = 0;

createNavigationDots(imagesSrc);
arrowNavigation();
activeDotNavigation();

// Changes the image every 5 seconds (simulates a click to right arrow)
setInterval(function() {
    document.getElementById("next-img-btn").click();
}, 5000)

/**
 * Creates the corresponding number of navigation dots to number of images in
 * the given array, and appends them to the 'navigation-dots' div.
 * @param {Array} imgArray 
 */
function createNavigationDots(imgArray) {
    const navigationDiv = document.getElementById('navigation-dots');
    imgArray.forEach((value, index) => {
        const dot = document.createElement("button");
        dot.setAttribute('id', 'nav-btn-'+ index);
        dot.classList.add('navigation-btn')
        navigationDiv.appendChild(dot);
        if (index === 0) {
            dot.classList.add('active') // first element active
        }
    })
}

/**
 * Adds the events listener to the navigation arrows.
 */
function arrowNavigation() {
    const navigationDots = document.getElementById('navigation-dots').children;
    const arrowBack = document.getElementById("back-img-btn")
    const arrowNext = document.getElementById("next-img-btn")
    
    arrowBack.addEventListener("click", () => {
        navigationDots[currentImage].classList.remove('active');
        if (currentImage === 0) {
            currentImage = navigationDots.length - 1;
        } else {
            currentImage = currentImage - 1;
        }
        navigationDots[currentImage].classList.add('active');
        changeBackgroundImage(currentImage)
    })

    arrowNext.addEventListener("click", () => {
        navigationDots[currentImage].classList.remove('active');
        if (currentImage === navigationDots.length -1) {
            currentImage = 0;
        } else {
            currentImage = currentImage + 1;
        }
        navigationDots[currentImage].classList.add('active');
        changeBackgroundImage(currentImage)
    })
}

/**
 * Changes the active class to the appropiate dot button
 */
function activeDotNavigation() {
    const navigationDots = document.getElementById('navigation-dots').children;
    for (let index = 0; index < navigationDots.length; index++) {
        const dot = navigationDots[index];
        dot.addEventListener('click', () => {
            for (const d of navigationDots) {   // removes the active class
                if (d.classList.contains('active')) {
                    d.classList.remove('active');
                }
            }
            // adds active class to the button clicked
            dot.classList.add('active')
            changeBackgroundImage(index)
            currentImage = index;   // modify current image variable
        })   
    }
}

// Changes the background of the page according to the images array index provided
function changeBackgroundImage(index) {
    const container = document.getElementById('container');
    container.setAttribute("style", "background-image: url(" + imagesSrc[index] + ");" )
}