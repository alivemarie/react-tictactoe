const STYLES = new Map();
STYLES.set('012', {transform: 'rotate(90deg)', top: '-57px'})
STYLES.set('345', {transform: 'rotate(90deg)'})
STYLES.set('678', {transform: 'rotate(90deg)', top: '143px'})
STYLES.set('036', {left: '90px'})
STYLES.set('147', {left: '190px'})
STYLES.set('258', {left: '290px'})
STYLES.set('048', {transform: 'rotate(135deg)'})
STYLES.set('246', {transform: 'rotate(45deg)'})

const LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const POWER = {
    'X': 1,
    'O': -1,
    '': 0
}

export {STYLES, LINES, POWER};
