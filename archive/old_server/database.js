const { json } = require('body-parser');
const mysql = require('mysql');
const {hash, compare} = require('./secret.js');

const conn = mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    database:"labirint",
    password:"serega2002A",
});

function base_connection(){
    conn.connect(err =>{
        if(err)
        {
            //console.log(err);
            return err;
        }
        else{
            console.log("Database connection")
        }});
};

function base_auntefication(login, password){
    return new Promise((res,rej)=>{
        compare_password(login,password).then(ans =>{
            console.log("Успешный вход!");
               res( {
                    status:"ok",
                    error:"null",
                    role:ans
              });
               
            }, err =>{
                rej( {
                    status:"error",
                    error:err,
                    role:"null"
                });
            });
    })
}


function compare_password(login,password){
    return new Promise((res,rej)=>{
        conn.query( "select login,pass,stat from accaunt",async(err,result)=>{
            if(err){
                //console.log(err);
                rej(err);
            }
            else{
                check = false;
                if(result.length!=0)
                {
                   i  = 0;
                   while(i<result.length && !check)
                   {
                        if(result[i].login==login)
                        {
                        check = await compare(password,result[i].pass);
                        }
                        if(check == true)
                        {
                            res(result[i].stat);
                        }
                        
                        i++;
                   }
                if(!check)
                {
                    rej("Ошибка входа! Проверьте введенные данные")
                }
            }
        }});
        });    
}

function base_registration(password,login,stat='user'){
    return new Promise((res,rej)=>{
        base_findUsers(login).then((ans)=>{
            if(login.includes("adm")){stat='ADM'}; // костыль убрать 
    
            base_add(login,password,stat).then((ans)=>{
                console.log("Пользователь зарегистрирован");
                res( {
                    status:"ok",
                    error:"null",
                    role:ans
                });
            },err =>{
                rej( {
                    status:"error",
                    error:err,
                    role:"null"
                });
            });  
            
        },err =>{
            rej( {
                status:"error",
                error:err,
                role:"null"
            });
        });
    })
   
}

function base_findUsers(login){
return new Promise((res,rej)=>{
    conn.query( "select login,stat from accaunt", async(err,result)=>{
        if(err){
            //console.log(err);
            rej(err);
        }
        else{
            check = true;
            if(result.length!=0)
            {
               i  = 0;
               while(i<result.length && check)
               {
                    if(result[i].login==login)
                    {
                        check = false;
                    }
                    i++;
               }
            }
            if(check)
            {
                res();
            }else{
                rej("Пользователь уже существует");
            }
        }
    });
    });   
}


function base_add(login,password,stat){
return new Promise((res,rej)=>{
        password = hash(password)
        conn.query(`INSERT INTO accaunt (login,pass,stat) VALUES ('${login}','${password}','${stat}');`,(err,result)=>{
            if(err)
            {
                rej(err);
            }else 
            {
                console.log(`Добавление пользователя ${login} || ${stat}`);
                res(stat);
            }
        });
    });
   
}


function base_end(){
    conn.end(err =>{
        if(err){
            //console.log(err);
            return err;
        }
        else{
            console.log("Database close")
        }
});}


module.exports = {
    base_connection,
    base_registration,
    base_end,
    base_add,
    base_findUsers,
    base_auntefication,
}




// Для бд
// use labirint;
// create table accaunt(
// login varchar(100),
// pass varchar(100),
// stat varchar(100)
// );

// select * from accaunt;
// drop table accaunt;
// INSERT INTO accaunt (login,pass,stat)
// VALUES ('3n@mail.ru','1111','ADM');