var core_toString = Object.prototype.toString
var core_hasOwn = Object.prototype.hasOwnProperty

var rword = /[^, ]+/g

var class2type = {}

// function each(obj, callback, args) {
//     var name,
//         i = 0,
//         length = obj.length,
//         isObj = lenght === undefined || isFunction(obj)

//     if (args) {
//         if (isObj) {
//             for (name in obj) {
//                 if (callback.apply(obj[name], args) === false) {
//                     break
//                 }
//             }
//         } else {
//             for (; i < length;) {
//                 if (callback.apply(obj[i++], args) === false) {
//                     break
//                 }
//             }
//         }
//     } else {
//         if (isObj) {
//             for (name in obj) {
//                 if (callback.call(obj[name], name, obj[name]) === false) {
//                     break
//                 }
//             }
//         } else {
//             for (; i < length;) {
//                 if (callback.call(obj[i], i, obj[i++]) === false) {
//                     break
//                 }
//             }
//         }
//     }

//     return obj
// }

function type(obj) {
    // String(null): 'null'
    // Object.prototype.toString.call(null): "[object Null]"
    return obj == null ?
        String(obj) : class2type[core_toString.call(obj)] || 'object'
}

function isFunction(obj) {
    return type(obj) === 'function'
}

function isArray(obj) {
    return Array.isArray ? Array.isArray(obj) : type(obj) === 'array'
}

function isWindow(obj) {
    // window
    // document.getElementsByTagName("iframe")[0].contentWindow
    return obj != null && obj == obj.window
}

function isDocument(obj) {
    // zepto
    return obj != null && obj.nodeType == obj.DOCUMENT_NODE
}

function isNumeric(obj) {
    // parseFloat('12px'): 12
    // +'12px': NaN

    // jquery 1.8.3
    // return !isNaN(parseFloat(obj)) && isFinite(obj)

    return !isArray(obj) && (obj - parseFloat(obj) + 1) >= 0
}

function isPlainObject(obj) {
    // jquery
    // 检查是否是纯对象，即通过 {} 或 new Object 创建的对象
    //
    // 非纯对象包括：
    // 1.任何 [[Class]] 属性不是 "[object Object]" 的对象或值
    // 2.DOM 节点或 Window

    // 确保是对象
    if (type(obj) !== 'object' || obj.nodeType || isWindow(obj)) {
        return false
    }

    // 排除自定义构造函数创建的对象
    if (obj.constructor &&
           !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
        return false
    }

    return true
}

function isPlainObjectZ(obj) {
    // zepto
    // getPrototypeof: IE9+
    return type(obj) == 'object' && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
}

function isEmptyObject(obj) {
    var name
    for (name in obj) {
        return false
    }
    return true
}

// each('Boolean Number String Function Array Date RegExp Object'.split(' '), function(i, name) {
//     class2type[ '[object ' + name + ']' ] = name.toLowerCase();
// });

'Boolean Number String Function Array Date RegExp Object'.replace(rword, function(name) {
    class2type[ '[object ' + name + ']' ] = name.toLowerCase();
})
