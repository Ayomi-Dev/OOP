//class converting currencies
// class Money{
//     constructor (dollar, pound){
//         this.dollar = dollar;
//         this.pound = pound;
//     }

//     get nairaValue() {
//         return ( (735.214 * this.dollar));
//     }
//     poundInNaira() {
//         return ( (932.378 * this.pound));
//     }  
// }

// let poundValue = document.querySelector('.pound');
// let dollarValue = document.querySelector('.dollar');

// async function calc(){
// dollarValue.addEventListener('input', () => {
//     let amount = (dollarValue.value)
//     const moneyValue = new Money (amount, '');
//     document.querySelector('.result').innerText = (moneyValue.nairaValue)
// });
// }
// calc();

// async function calcu(){
// poundValue.addEventListener('input', () => {
//     let amount = (poundValue.value)
//     const moneyValue = new Money ('', amount);
//     document.getElementById('result').innerText = (moneyValue.poundInNaira());
// })
// }
// calcu();

//sign up and login class
// const confirmUser = () => {
    
class Users{
    constructor(name, email, password) {
        this.name = name
        this.email = email
        this.password = password
    }
    signUp() {
        document.querySelector('.logoMsg').innerHTML = `Welcome, ${(this.name).toUpperCase()}`
       
    }
    login() {
        let loginValue = loginEmail.value
        let passWord = loginPassword.value

        let search = userArr.find(x => x.email === loginValue);
    
        return new Promise((resolve, reject) => {
            if(search && search.password === passWord){
                resolve(`Welcome back, ${(this.name).toUpperCase()}`)
            }
            else{
               reject('Incorrect email or password');
            }
        })
    }
}


    let userArr = [];
    let names = document.getElementById('name')
    let password = document.getElementById('password')
    let rptPass = document.getElementById('passRpt')
    let email = document.getElementById('email');
    let loginBtn = document.querySelector('.login');
    let loginEmail = document.getElementById('loginEmail');
    // let form = document.getElementById('form');
    let loginPassword = document.getElementById('loginPassword')
    
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
    })
    

     document.getElementById('form').addEventListener('submit', (event) => {
        event.preventDefault();

        let userName = names.value;
        let userEmail = email.value;
        let userPass = password.value
        let repeatPasword = rptPass.value

        let search = userArr.find(x => x.email === userEmail);

        const user = new Users(userName, userEmail, userPass);


        if(search){
            document.querySelector('.msg').innerText = 'User already exist'
            return;
        }else if(repeatPasword !== userPass){
            document.querySelector('.msg').innerText = 'password do not match'
            return;
        }
        else{
            userArr.push({
                name: userName,
                email: userEmail,
                password: userPass
            });
            user.signUp();
           setTimeout(() => {
            document.querySelector('.userPage').classList.add('active');
            form.reset();
           }, 2000)
        }
        console.log(userArr);

        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            user.login()
            .then(res => {document.querySelector('.logoMsg').innerHTML = res;
            document.querySelector('.userPage').classList.add('active');
            })
    
            .catch(err =>{document.querySelector('.notify').innerHTML = err
               setTimeout(() => {
                document.querySelector('.notify').innerHTML = ''
               }, 3000) 
            });
         });
    })
    
    
// }
// confirmUser();



let loginPage = document.querySelector('.logIn');
let signInBtn = document.querySelectorAll('.signIn')
let signUpBtn = document.querySelectorAll('.signUpBtn')

signInBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        loginPage.classList.add('active');
    });
})

signUpBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        loginPage.classList.remove('active');
    })
})
 document.querySelector('.fa-power-off').onclick = () => {
    document.querySelector('.userPage').classList.remove('active')
    loginPage.classList.add('active');
 }