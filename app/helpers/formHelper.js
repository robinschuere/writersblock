export function buildOptionList(list){
  return list.map((item) => {
    return {
      value: item.id,
      label: item.name,
    }
  })
};

export function getOptionitem(list, id){
  return list.find((val) => { return val.id === id});
};

export function isMobile(){ return window.innerWidth <= 768;}