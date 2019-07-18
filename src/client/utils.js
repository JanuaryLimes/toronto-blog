var colorCache = {};

export function getColorFromClassName(className) {
  var color;

  if (colorCache[className]) {
    color = colorCache[className];
  } else {
    var dummy = document.createElement('div');
    dummy.classList.add(className);
    document.body.appendChild(dummy);
    color = getComputedStyle(dummy, null).getPropertyValue('background-color');
    document.body.removeChild(dummy);
    colorCache[className] = color;
  }

  return color;
}
