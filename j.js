console.clear()
function run(){
    for(var i=0;i<5;i++){
        function check(){
            var a=i;
            setTimeout(() => {
            console.log(a)
        }, i*1000);
        }
        check()
    }

}
run()