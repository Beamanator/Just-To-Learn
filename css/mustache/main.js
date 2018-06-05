// constants
const ROOT_ELEM = document.querySelector(':root');

// return value of style property
// ex: if '100px', return 100
getSpecificPropertyValue = key =>
    window.getComputedStyle( ROOT_ELEM )
        .getPropertyValue(key)
        .split('px')[0].trim();

// on keydown, move mustache
document.addEventListener("keydown", function (e) {
    let speed = 0, key = '';

    switch (e.key) {
        case 'ArrowRight':
            key = '--mustache-anchor-left';
            speed = 3;
            break;

        case 'ArrowLeft':
            key = '--mustache-anchor-left';
            speed = -3;
            break;

        case 'ArrowDown':
            key = '--mustache-anchor-top';
            speed = 3;
            break;

        case 'ArrowUp':
            key = '--mustache-anchor-top';
            speed = -3;
            break;

        default:
            console.log(`Key <${e.key}> not recognized. Quitting.`);
            return;
    }

    const newVal = +getSpecificPropertyValue( key );
    
    ROOT_ELEM.style.setProperty(key, `${newVal + speed}px`);
});