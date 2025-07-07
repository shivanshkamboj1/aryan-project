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

const promise1 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve(5)
        // reject(5)
    }, 2000);
})
const promise2 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve(5)
        // reject(5)
    }, 4000);
})
const promise3= new Promise((resolve,reject)=>{
    setTimeout(() => {
        // resolve(5)
        reject(5)
    }, 6000);
})

async function a(){
    const result =await Promise.allSettled([promise1,promise2,promise3])
    // console.log(promise1,promise2,promise3)
    console.log(result)
}
a()