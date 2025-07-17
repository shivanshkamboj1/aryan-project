// const allowedSettingKeys = ['allowChat', 'allowMic', 'allowPause', 'allowSeek', 'allowForward'];
// const body={
//     allowChat:true,
//     allowMic:false,
//     allow:false
// }
// const cleaned={}
// for(let i of allowedSettingKeys){
//     if(body.hasOwnProperty(i)){
//         const value =body[i]
//         cleaned[i]=value
//     }
// }
// console.table(cleaned)

const promise1 =()=> new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve(5)
        // reject(5)
    }, 2000);
})
const promise2 = ()=> new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve(5)
        // reject(5)
    }, 4000);
})
const promise3=()=>  new Promise((resolve,reject)=>{
    setTimeout(() => {
        // resolve(5)
        resolve(5)
    }, 6000);
})
function getUser(userId, callback) {
  setTimeout(() => {
    console.log('Fetched user');
    callback(null, { id: userId, name: 'Alice' });
  }, 1000);
}

function getOrders(user, callback) {
  setTimeout(() => {
    console.log('Fetched orders');
    callback(null, [{ orderId: 1 }, { orderId: 2 }]);
  }, 1000);
}

function getShippingInfo(order, callback) {
  setTimeout(() => {
    console.log('Fetched shipping info');
    callback(null, { orderId: order.orderId, shippingDate: '2025-07-15' });
  }, 1000);
}

// "Callback hell" style nesting
console.log('Start');
getUser(42, (err, user) => {
  if (err) {
    console.error('Error getting user', err);
    return;
  }

  getOrders(user, (err, orders) => {
    if (err) {
      console.error('Error getting orders', err);
      return;
    }

    getShippingInfo(orders[0], (err, shipping) => {
      if (err) {
        console.error('Error getting shipping info', err);
        return;
      }

      console.log('Final shipping info:', shipping);
    });
  });
});

function school(name,cb){
    console.log(name)
    cb(null,"10th")
}
function standard(std,cb){
    console.log(std);
    cb(null,"shiv")
}
function name1(name){
    console.log(name)
}
school("ips",(err,std)=>{
    standard(std,(err,name)=>{
        name1(name)
    })
})
console.log(typeof JSON.stringify(5))