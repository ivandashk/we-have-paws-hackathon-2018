var actions = [];
export const DOCUMENT_LOADED_EVENT = "DOCUMENT_LOADED_EVENT";
export const VIEWABLE_LOADED_EVENT = "VIEWABLE_LOADED_EVENT";

function listen(id, callback) {
    if (!actions[id]) {
        actions[id] = new Array();
    }
    return actions[id].push(callback);
}

function trigger(id, data) {
    var callback, key, _ref, _results;
    if (data == null) {
        data = {};
    }
    if (actions[id]) {
        _ref = actions[id];
        _results = [];
        for (key in _ref) {
            callback = _ref[key];
            _results.push(callback(data));
        }
        return _results;
    }
}

export {listen, trigger}