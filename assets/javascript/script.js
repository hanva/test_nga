const SELECTORS = {
    buttons: '[data-js-id="nav_container"] button',
    content: '[data-js-id="features__content"] .features__content--item',
    cascadingImages: '[data-js-id="cascading_images"] .cascading__images--col',
    cascadingImagesContainer: '[data-js-id="cascading_images"]',
}
const OPTIONS = {
    col: [
        {transform: 'translateY(-300px)'}
    ],
    row: [
        {transform: 'translateX(-1500px)'}
    ],
}

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll(SELECTORS.buttons)
    const content = document.querySelectorAll(SELECTORS.content)
    const cascadingImages = document.querySelectorAll(SELECTORS.cascadingImages)
    const cascadingImagesContainer = document.querySelector(SELECTORS.cascadingImagesContainer)

    buttons.forEach(button => {
        button.addEventListener('click', () => displayRow(buttons, button, content))
    })
    scroll(cascadingImages, OPTIONS, cascadingImagesContainer)
    window.addEventListener('resize', () => {
        scroll(cascadingImages, OPTIONS, cascadingImagesContainer, true)
    })
})

/*
    This Function adds a scroll effect to two elements :
    the row when you are using a mobile device or the columns in
    dektop (it pauses the one not being effected)
*/
const scroll = (images, options, row, resize = false) => {
    let mobile = document.documentElement.clientWidth < 768
    if (!resize) {
        animateEle(row, options.row, 30000)
        pauseEle(row, mobile === true)
        images.forEach(column => {
            animateEle(column, options.col, 5000)
            pauseEle(column, mobile === false)
        })
    } else {
        pauseEle(row, mobile === true)
        images.forEach(column => {
            pauseEle(column, mobile === false)
        })
    }
}

const pauseEle = (el, play = true) => {
    el.getAnimations().forEach((animation) => {
        if (play === true) {
            animation.cancel()
            animation.play()
        } else {
            animation.pause()
        }
    });
}

const animateEle = (el, options, duration) => {
    el.animate(options, {
        duration: duration,
        iterations: Infinity,
        direction: 'alternate',
    })
}

/* This function removes the class active on all button and content ,and add active to the ones being clicked */
const displayRow = (buttons, el, content) => {
    const id = `[data-js-id="${el.getAttribute('data-js-id')}_content"]`

    buttons.forEach(button => {
        button.classList.remove('active')
    })
    content.forEach(item => {
        item.classList.remove('active')
    })

    document.querySelector(id).classList.add('active')
    el.classList.add('active')
}