import request from './request';


export const verifyCode = (code, number) => {
  return request({
    url: `verifyCode/${code}/${number}`,
    method: 'GET'
  });
};

//#Liste des enfants ayant un abonnement
export const makeSubscription = (data) => {
  return request({
    url: `/send_cash`,
    method: 'POST',
    data: data,
  });
};