import store from "redux/store";
import cookies from 'react-cookies'

export const formatTime = (createTime: string): string => {
    let tempDate = new Date(Number(createTime));
    let year = tempDate.getFullYear();
    let month = tempDate.getMonth() + 1;
    let date = tempDate.getDate();
    let hour = tempDate.getHours();
    let minute = tempDate.getMinutes();
    let seconds = tempDate.getSeconds()
    return `${year}-${month}-${date} ${hour}:${minute}:${seconds}`
}

export const getReduxUser = () => {
    const {
        user
    } = store.getState();
    return user;
}

export const simpleFormatTime = (createTime: string): string => {
    let tempDate = new Date(Number(createTime));
    let year = tempDate.getFullYear();
    let month = tempDate.getMonth() + 1;
    let date = tempDate.getDate();
    return `${year}-${month}-${date}`
}

export const deepCopy = (variate: any): any => {
    return JSON.parse(JSON.stringify(variate))
}

export const getToken = (): string => {
    return cookies.load('Authorization')
}