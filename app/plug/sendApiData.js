module.exports = (status, message, data, convert) => {

    status = status === null ? false : status
    message = message === null ? false : message
    data = data === null ? false : data

    let wait = {
        status:status
    }

    if ( message !== false && message !== '' && message !== undefined ){
        wait['message'] = message
    }

    if ( data !== false && data !== '' && data !== undefined){
        wait['content'] = data
    }

    if ( convert === true ){
        return JSON.stringify(wait)
    }

    if ( convert === false ){
        return wait
    }



}