var ALStorage = function () {
    var _this = this;
    var MCK_LATEST_MESSAGE_ARRAY = [];
    var MCK_MESSAGE_ARRAY = [];
    var MCK_MESSAGE_MAP = [];
    var MCK_CONTACT_NAME_ARRAY = [];
    var FRIEND_LIST_GROUP_NAME;
    var FRIEND_LIST_GROUP_TYPE;
    var ENCRYPTION_KEY;
    var STORAGE = w.sessionStorage;
    _this.setStorage = function (isLocalStorage) {
        STORAGE = isLocalStorage ? w.localStorage : w.sessionStorage;
    }
    _this.setEncryptionKey = function (encryptionKey) {
        if (_this.isStorageAvailable()) {
            w.sessionStorage.setItem('encryptionKey', encryptionKey);
        } else {
            ENCRYPTION_KEY = encryptionKey;
        }
    },
    _this.getEncryptionKey = function (encryptionKey) {
        return (_this.isStorageAvailable()) ? w.sessionStorage.getItem("encryptionKey") : ENCRYPTION_KEY;
    },
    _this.removeEncryptionKey: function () {
        if (_this.isStorageAvailable()) {
            w.sessionStorage.removeItem('encryptionKey');
        }
    },
    _this.updateLatestMessage = function (message) {
        var messageArray = [];
        messageArray.push(message);
        _this.updateLatestMessageArray(messageArray);
        _this.updateMckMessageArray(messageArray);
    },
    _this.getLatestMessageArray = function () {
        return (_this.isStorageAvailable()) ? $applozic.parseJSON(w.sessionStorage.getItem("mckLatestMessageArray")) : MCK_LATEST_MESSAGE_ARRAY;
    },
    _this.getFriendListGroupName = function () {
        return (ALStorage.isStorageAvailable()) ? w.sessionStorage.getItem("friendListGroupName") : FRIEND_LIST_GROUP_NAME;
    },
    _this.setFriendListGroupName = function (friendListGroupName) {
        if (ALStorage.isStorageAvailable()) {
            w.sessionStorage.setItem('friendListGroupName', friendListGroupName);
        } else {
            FRIEND_LIST_GROUP_NAME = friendListGroupName;
        }
    },
    _this.setFriendListGroupType = function (friendListGroupType) {
        if (ALStorage.isStorageAvailable()) {
            w.sessionStorage.setItem('friendListGroupType', friendListGroupType);
        } else {
            FRIEND_LIST_GROUP_TYPE = friendListGroupType;
        }
    },
    _this.getFriendListGroupType = function () {
        return (ALStorage.isStorageAvailable()) ? w.sessionStorage.getItem("friendListGroupType") : FRIEND_LIST_GROUP_TYPE;
    },
    _this.setLatestMessageArray = function (messages) {
        if (ALStorage.isStorageAvailable()) {
            w.sessionStorage.setItem('mckLatestMessageArray', w.JSON.stringify(messages));
        } else {
            MCK_LATEST_MESSAGE_ARRAY = messages;
        }
    },
    _this.updateLatestMessageArray = function (mckMessageArray) {
        if (ALStorage.isStorageAvailable()) {
            var mckLocalMessageArray = $applozic.parseJSON(w.sessionStorage.getItem('mckLatestMessageArray'));
            if (mckLocalMessageArray !== null) {
                mckLocalMessageArray = mckLocalMessageArray.concat(mckMessageArray);
                w.sessionStorage.setItem('mckLatestMessageArray', w.JSON.stringify(mckLocalMessageArray));
            } else {
                w.sessionStorage.setItem('mckLatestMessageArray', w.JSON.stringify(mckMessageArray));
            }
            return mckMessageArray;
        } else {
            MCK_LATEST_MESSAGE_ARRAY = MCK_LATEST_MESSAGE_ARRAY.concat(mckMessageArray);
            return MCK_LATEST_MESSAGE_ARRAY;
        }
    },
    _this.getMckMessageArray = function () {
        return (ALStorage.isStorageAvailable()) ? $applozic.parseJSON(w.sessionStorage.getItem("mckMessageArray")) : MCK_MESSAGE_ARRAY;
    },
    _this.clearMckMessageArray = function () {
        if (ALStorage.isStorageAvailable()) {
            w.sessionStorage.removeItem('mckMessageArray');
            w.sessionStorage.removeItem('mckLatestMessageArray');
        } else {
            MCK_MESSAGE_ARRAY.length = 0;
            MCK_LATEST_MESSAGE_ARRAY.length = 0;
        }
    },
    _this.clearAppHeaders = function () {
        if (ALStorage.isStorageAvailable()) {
            w.sessionStorage.removeItem('mckAppHeaders');
        }
    },
    _this.setAppHeaders = function (data) {
        if (ALStorage.isStorageAvailable()) {
            w.sessionStorage.setItem("mckAppHeaders", w.JSON.stringify(data));
        }
    },
    _this.getAppHeaders = function (data) {
        return (ALStorage.isStorageAvailable()) ? $applozic.parseJSON(w.sessionStorage.getItem('mckAppHeaders')) : {};
    },
    _this.getMessageByKey = function (key) {
        return MCK_MESSAGE_MAP[key];
    },
    _this.updateMckMessageArray = function (mckMessageArray) {
        for (var i = 0; i < mckMessageArray.length; i++) {
            var message = mckMessageArray[i];
            MCK_MESSAGE_MAP[message.key] = message;
        }
        if (ALStorage.isStorageAvailable()) {
            var mckLocalMessageArray = $applozic.parseJSON(w.sessionStorage.getItem('mckMessageArray'));
            if (mckLocalMessageArray !== null) {
                mckLocalMessageArray = mckLocalMessageArray.concat(mckMessageArray);
                w.sessionStorage.setItem('mckMessageArray', w.JSON.stringify(mckLocalMessageArray));
            } else {
                w.sessionStorage.setItem('mckMessageArray', w.JSON.stringify(mckMessageArray));
            }
            return mckMessageArray;
        } else {
            MCK_MESSAGE_ARRAY = MCK_MESSAGE_ARRAY.concat(mckMessageArray);
            return MCK_MESSAGE_ARRAY;
        }
    },
    _this.getMckContactNameArray = function () {
        return (ALStorage.isStorageAvailable()) ? $applozic.parseJSON(w.sessionStorage.getItem("mckContactNameArray")) : MCK_CONTACT_NAME_ARRAY;
    },
    _this.setMckContactNameArray = function (mckContactNameArray) {
        if (ALStorage.isStorageAvailable()) {
            w.sessionStorage.setItem('mckContactNameArray', w.JSON.stringify(mckContactNameArray));
        } else {
            MCK_CONTACT_NAME_ARRAY = mckContactNameArray;
        }
    },
    _this.updateMckContactNameArray = function (mckContactNameArray) {
        if (ALStorage.isStorageAvailable()) {
            var mckLocalcontactNameArray = $applozic.parseJSON(w.sessionStorage.getItem('mckContactNameArray'));
            if (mckLocalcontactNameArray !== null) {
                mckContactNameArray = mckContactNameArray.concat(mckLocalcontactNameArray);
            }
            w.sessionStorage.setItem('mckContactNameArray', w.JSON.stringify(mckContactNameArray));
            return mckContactNameArray;
        } else {
            MCK_CONTACT_NAME_ARRAY = MCK_CONTACT_NAME_ARRAY.concat(mckContactNameArray);
            return MCK_CONTACT_NAME_ARRAY;
        }
    },
    _this.clearMckContactNameArray = function () {

        if (ALStorage.isStorageAvailable()) {
            w.sessionStorage.removeItem('mckContactNameArray');
        } else {
            MCK_CONTACT_NAME_ARRAY.length = 0;
        }
    },
    _this.clearSessionStorageElements = function () {
        ALStorage.clearMckMessageArray();
        ALStorage.clearAppHeaders();
        ALStorage.clearMckContactNameArray();
        ALStorage.removeEncryptionKey();
    },
    _this.isStorageAvailable: function () {
        try {
            return typeof (STORAGE) !== 'undefined';
        } catch (error) {
            return false;
        }
    },
    _this.setLoggedInStatus = function (status) {
        w.localStorage.setItem('mckStatus', status);
        if (!status) {
            ALStorage.clearSessionStorageElements();
        }
    }
};
