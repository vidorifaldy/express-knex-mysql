import yaml from "yamljs";
import moment from 'moment';

const config = yaml.load("config.yaml");

function getHostName(req:any) {
	const host = req.get('host');
  
	return host === `localhost:${process.env.PORT}` ? host : `${req.protocol}://${host}`;
};

// let clean = (object: Array<any>) => {
   
//   Object
//     .entries(object)
//     .forEach(([k, v]) => {
//       if (v && typeof v === 'object') {
//         clean(v);
//       }
//       if (v && typeof v === 'object' && !Object.keys(v).length || v === null || v === undefined) {
//         if (Array.isArray(object)) {
//           object.splice(k, 1);
//         } else {
//           delete object[k];
//         }
//       }
//     });
//   return object;

// };

// let cleanEmpty = (obj: object) => {
//   if (Array.isArray(obj)) { 
//     return obj
//         .map(v => (v && typeof v === 'object') ? cleanEmpty(v) : v)
//         .filter(v => !(v == null)); 
//   } else { 
//     return Object.entries(obj)
//         .map(([k, v]) => [k, v && typeof v === 'object' ? cleanEmpty(v) : v])
//         .reduce((a, [k, v]) => (v == null ? a : (a[k]=v, a)), {});
//   } 
// }

let nestedMenu = (items: any, ID: any = null, link = 'parent') => 
  items.filter((item: any) => item[link] === ID).map((item: any) => 
    (
      { ...item, children: nestedMenu(items, item.ID)}
    )
  );

export let recursiveData = (arr: Array<any>, parentId: any, unGroupName?: any) => {
  let data = [];

  for (let i in arr) {
    if (arr[i].parent_id === parentId) {
      let children = recursiveData(arr, arr[i].id);

      if ((children.length && typeof unGroupName === 'undefined') || arr[i].name !== unGroupName) {
        arr[i].children = children;
      } else {
        arr[i].children = [];
      }

      data.push(arr[i]);
    }
  }

  return data;
};

function getRouteAccess(req: any) {
    
    let route = req.baseUrl.substr(config.middleurlWeb.length);

    /** mode original url */
    let action = {};
    switch (req.method) {
        case 'POST':
        action = { C: 1 };
        break;
        case 'GET':
        action = { R: 1 };
        break;
        case 'PUT':
        action = { U: 1 };
        break;
        case 'DELETE':
        action = { D: 1 };
        break;
        default:
        action = { [req.url.substr(1)]: 1 };
        break;
    }
    
    return { route, action };
};

function port() { 
    switch (process.env.ENV) {
        case 'production': return process.env.production;
        case 'development': return process.env.development ;
        case 'live': return process.env.live;
        default: return process.env.development;
    }
};

function toInteger(value: any) {
    return parseInt(`${value}`, 10);
}
  
function toString(value: any) {
    return (value !== undefined && value !== null) ? `${value}` : '';
}

function getValueInRange(value: any, max: any, min: any = 0) {
    return Math.max(Math.min(value, max), min);
}

function isString(value: any) {
    return typeof value === 'string';
}

function isNumber(value: any) {
    return !isNaN(toInteger(value));
}

function isInteger(value: any) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}

function isDefined (value: any) {
    return value !== undefined && value !== null;
}

function padNumber (value: any) {
    if (isNumber(value)) {
        return `0${value}`.slice(-2);
    } else {
        return '';
    }
}

function regExpEscape(text: any) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function nullToZeroAndConvertInt(obj: any) {
    if (typeof obj === 'undefined') return {};
  
    Object.keys(obj).forEach(key => {
      if (obj[key] === null) {
        obj[key] = 0;
      }
      if (typeof obj[key] === 'string') {
        obj[key] = obj[key];
      }
    });
    return obj;
};

function isEmptyData(data: any) {
    if (typeof data === 'undefined' || !data) {
      return true;
    } else if (Array.isArray(data)) {
      return data.length < 1;
    } else {
      for (let key in data) {
        if (data.hasOwnProperty(key)) return false;
      }
      return true;
    }
};

function ESTN(data: any) {
    if ( data == 'undefined' || data == '') {
      return null;
    } else {
      return data;
    }
};

function FileLogger() {
    
    const FileLogger = moment().format('YYYY_MM') + '_' + 'iTransport.log';

    return FileLogger;
}

function validateEmail(email: any) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export { getHostName,
  nestedMenu,
  getRouteAccess,
  toInteger,
  toString,
  getValueInRange,
  isString,
  isNumber,
  isInteger,
  isDefined,
  padNumber,
  regExpEscape,
  nullToZeroAndConvertInt,
  isEmptyData,
  ESTN,
  FileLogger,
  validateEmail}