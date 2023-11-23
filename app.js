// Include parent grid container
const grid = document.getElementById('grid')
// Include config elements
const sizeSlider = document.getElementById('sizeSlider')
const sizeSlider_display = document.getElementById('sizeSlider-display')
const erase_btn = document.getElementById('erase-btn')
const gridLine_btn = document.getElementById('gridLine-btn')
const gridLine_display = document.getElementById('gridLine-display')
const clear_btn = document.getElementById('clear-btn')

// Control Boolean
let isDrawing = false
let isErase = false
let isGridLineToggle = false
let isClear = false
let isRandomColor = false

// Event Management State


// Handle on Click & MouseOver
const handleGridEvent = (event) => {
    if (isDrawing) {
        draw(event);
    }
};

// Handle on MouseDown
const handleMouseDown = (event) => {
    event.preventDefault();
    isDrawing = true;
    draw(event);
}

// Handle on MouseMove
const handleMouseMove = (event) => {
    if (isDrawing) {
        draw(event);
    }
}

// Handle on MouseUp
const handleMouseUp = () => {
    isDrawing = false;
}

gridLine_btn.addEventListener('click', () => {
    isGridLineToggle = !isGridLineToggle
    gridLine_display.innerText = isGridLineToggle ? 'Grid Line : On' : 'Grid Line : Off'
    // add grid-border to grid element
    // Need grid_element from gridSizing functuin
    const gridElements = document.querySelectorAll('.grid-element');
    gridElements.forEach(gridChild => {
        gridChild.classList.toggle('grid-border', isGridLineToggle);
    });
})

clear_btn.addEventListener('click', () => {
    isClear = true
    // Clear draw function
    clearDraw()
})

// When mouse leave grid container set toggle off draw function by set isDrawing to false
grid.addEventListener('mouseleave', () => {
    isDrawing = false
});

const addEvents = (grid_element) => {
    grid_element.addEventListener('mouseover', handleGridEvent);
    grid_element.addEventListener('click', handleGridEvent);
    grid_element.addEventListener('mousedown', handleMouseDown);
    grid_element.addEventListener('mousemove', handleMouseMove);
    grid_element.addEventListener('mouseup', handleMouseUp);
};

erase_btn.addEventListener('click', () => {
    const erase_display = document.getElementById('erase-display')
    isErase = !isErase
    erase_display.innerText = isErase ? 'Eraser : On' : 'Eraser : off'
})
// Event Management State


// Input event when user slide size select
sizeSlider.addEventListener('change', () => {
    // store sizeSlider value to newSize
    let newSize = parseInt(sizeSlider.value)
    // Make newSize to exponentiation x 2
    let newSizeX2 = Math.pow(newSize, 2)
    // update display of slider with the selected value
    sizeSlider_display.innerText = `${newSize} x ${newSize}`
    selectGrid(newSizeX2, newSize)
})


// Change Selection Grid Size
const selectGrid = (inputGridX2, inputGrid) => {
    // Clear old slection
    clearGridContainer()
    // Call function change grid
    gridSizing(inputGridX2, inputGrid)
}

// Change grid sizing
const gridSizing = (inputGridX2, inputGrid) => {
    // defind defaultSize = 256 (16 x 16)
    const defaultSize = 256;
    // If user change size on range input
    if (inputGridX2) {
        // Create loop for create grid-element via input from user (In case use x2 is mean input expotention 2 exp: 16 x 16 = 256)
        for (let i = 0; i < inputGridX2; i++) {
            // Create div is call grid-element
            const grid_element = document.createElement('div');
            // Add class 'grid-element'
            grid_element.classList.add('grid-element');
            // Add 'grid-border' class based on the default value of isGridLineToggle
            if (isGridLineToggle) {
                grid_element.classList.add('grid-border');
            }
            // Put all grid-element to grid parent
            grid.appendChild(grid_element);
            // Change gridTemplateColumns on Grid parent via input from user
            grid.style.gridTemplateColumns = `repeat(${inputGrid}, 1fr)`;
            // Change gridTemplateRows on Grid parent via input from user
            grid.style.gridTemplateRows = `repeat(${inputGrid}, 1fr)`;
            // Assign Event to 'grid-element'
            addEvents(grid_element);
        }
    }
    // Default setup
    else {
        // Create loop for create default grid-element via defaultSize is 256 because 256 is expotention 2 of 16 (Default display grid is rows 16 colums 16)
        for (let i = 0; i < defaultSize; i++) {
            // Create div is call grid-element
            const grid_element = document.createElement('div');
            // Add class 'grid-element'
            grid_element.classList.add('grid-element');
            // Add 'grid-border' class based on the default value of isGridLineToggle
            if (isGridLineToggle) {
                grid_element.classList.add('grid-border');
            }
            // Put all grid-element to grid parent
            grid.appendChild(grid_element);
            // Change gridTemplateColumns on Grid parent = 16 becuase is a default size
            grid.style.gridTemplateColumns = `repeat(16, 1fr)`;
            // Change gridTemplateRows on Grid parent = 16 becuase is a default size
            grid.style.gridTemplateRows = `repeat(16, 1fr)`;
            // Assign Event to 'grid-element'
            addEvents(grid_element);
        }
    }
};

// Drawing function
const draw = (event) => {
    // Handle all event on trigged target is pass to event managment
    const grid_element = event.target;
    // If target is 'grid-element'
    if (grid_element.classList.contains('grid-element')) {
        // Change the color of the grid element when drawing
        grid_element.style.backgroundColor = isErase ? '' : 'black';
    }
}

const clearDraw = () => {
    // Include all element contains class grid-element
    const grid_elements = document.querySelectorAll('.grid-element')
    grid_elements.forEach((gridChild) => {
        gridChild.style.backgroundColor = ''
    })
}

// Clear Grid functuion
const clearGridContainer = () => {
    // While grid frist child is created remove grid child
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild)
    }
}

// Load default after refresh
window.addEventListener('DOMContentLoaded', () => {
    gridSizing()
})

