export function arrayCheck(array, id) {
    let isFound = false;
    array.forEach((item) => {
      if (item.id === Number(id)) {
        isFound = true;
      }
    });
  
    return isFound;
  }
  