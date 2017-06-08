import { NotificationManager } from 'react-notifications';

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

export function createNotification (type, msg, callback) {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info(msg);
          break;
        case 'success':
          NotificationManager.success(msg);
          break;
        case 'warning':
          NotificationManager.warning(msg, 3000);
          break;
        case 'error':
          NotificationManager.error(msg, 5000);
          break;
      }
    };
  };