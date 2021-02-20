
export function cn(...classNames) {
    let classes =[];
  
    if (classNames[0] instanceof Array) {
      classes = classNames[0];
    } else {
      classes = classNames; 
    }
  
    return classes
      .filter((cls) => {
        return typeof cls === "string" && cls.trim() !== "";
      })
      .join(" ")
      .trim();
  }

  export function ranB(min, max) {
    const num = Math.round(Math.random() * (max - min + 1) + min);
    if (num > max) return max;
    if (num < min) return min;
    return num;
  }


  export function arraySum(arr) {
    return arr.reduce((a, v) => {
      return a + v;
    }, 0);
  }
  export function arrRandomItem(arr) {
    const index = ranB(0, arr.length - 1);
    return arr[index];
  }
  
  export const KEYCODES = {
    BACKSPACE: 8,
    DELETE: 46,
    DOWN: 40,
    END: 35,
    ESC: 27,
    HOME: 36,
    LEFT: 37,
    PAGE_DOWN: 34,
    PAGE_UP: 33,
    RETURN: 13,
    RIGHT: 39,
    SPACE: 32,
    TAB: 9,
    UP: 38,
  };
  