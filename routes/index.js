var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//rota do post /upload
router.post('/upload', (req,res)=>{

  //instancia o IncomingForm (chamando formulario)
  let form = new formidable.IncomingForm({
    uploadDir: './upload', //diretório
    keepExtensions: true //mantém a extensao dos arquivos
  });

  //Interpreta os dados
  form.parse(req, (err, fields, files)=>{

    //resposta
    res.json({files: files});

  });  

});

//rota do delete
router.delete('/file', (req,res)=>{

   //instancia o IncomingForm (chamando formulario)
   let form = new formidable.IncomingForm({
    uploadDir: './upload', //diretório
    keepExtensions: true //mantém a extensao dos arquivos
  });

  //Interpreta os dados
  form.parse(req, (err, fields, files)=>{

    let path = "./" + fields.path;

    if(fs.existsSync(path)){
      //unlink: comando para remover arquivo fisico
      fs.unlink(path,err=>{
        if(err){
          res.status(400).json({err});
        }else{
          //resposta
          res.json({fields: fields});
        }
      });
    }   

  });  

});



module.exports = router;
