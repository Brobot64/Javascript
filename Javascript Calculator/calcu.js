const summy = document.querySelector("#vals")
function display(val){
    document.getElementById("textval").value+=val
}

function evaluate() {
    document.getElementById("textval").value = eval(document.getElementById("textval").value)
    // let x = document.getElementById("textval").value
    // // let y = eval(x) i need help with this
    // // document.getElementById("textval").value = y
    // console.log(x)
}

// $("#vals").click(function() {
//     // document.getElementById("textval").value = eval(document.getElementById("textval").value)
//     let x = document.getElementById("textval").value
//     console.log(x)
// })
function clr() {
    document.getElementById("textval").value = ''
}
summy.addEventListener('click', function() {
    let x = document.getElementById("textval").value

    x === EvalError ? x = 'Error' : x = eval(x)
    // x = eval(x)
    // console.log(x)
    clr()
    display(x)
    
})