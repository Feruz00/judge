const express = require('express')
const multer = require('multer')
const fs = require('fs')
const judge = require('./judge')

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.post('/judge', upload.single('task') , async (req, res)=>{
    
    fs.writeFileSync( `./solution.${req.body.lang}`, req.file.buffer )
    
    const {input, output, time, memory, lang} = req.body
    //memory mb
    const inp = JSON.parse(input)
    const out = JSON.parse(output)
    // console.log(typeof out)
    for (let i = 0; i < inp.length; i++) {
        const el = inp[i];
        const str = el.map(i=>i).join(' ')
        fs.writeFileSync('./test.txt', str)
        const result = await judge(lang, time, memory, `solution.${lang}`)
        console.log(result)
        // console.log( res )
        if(result.status){
            let k = out[i]
            // if( typeof k === "number" ) k=k*1
            // console.log(k)
            // console.log(result.stdout === k)
        }
    }

    res.send({})
})

app.listen(3009, ()=>{
    console.log("Judge server listening 3009 port!")
})