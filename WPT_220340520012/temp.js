
const dbpar = ({
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'ajinkya',
	port:3306
});


const mysql = require('mysql2');
const con=mysql.createConnection(dbpar);
console.log("Database Connected");

const express = require('express');
const app = express();

app.use(express.static('abc'));

app.get('/showinfo',(req,res)=>{
	let  bid=req.query.bookid;
	let  output={status :false,bname:"",price:"",message:"book not in database"}

	con.query('select * from book where bid=?',[bid],(err,rows)=>{
   if(err){
   console.log('error'+err);
}
  else{

	if(rows.length>0){
		output.status=true;
		output.message="book already exists";
		output.bname=rows[0].bname;
		output.bprice=rows[0].bprice;
		res.send(output)
		}
	
        else {
	console.log("no rows affected");
	res.send(output)
  }
}
	
	});
	
});



app.get('/update',(req,res)=>{
	let  bid=req.query.bookid;
	let  bname=req.query.bookname;
	let  bprice=req.query.price;
	console.log("bid,bname,bprice");
  
	let output={status:false};

	con.query('update book set bname=?,bprice=? where bid=?',[bname,price,bid],(err,rows)=>{
   if(err){
   console.log('error'+err);
}
  else{
	if(rows.affectedRows>0){
		console.log(rows.affectedRows>0)
		output.status=true;
	}
  }
 res.send(output)

	})
	
});






app.listen(8081, function () {
    console.log("server listening at port 8081...");
});