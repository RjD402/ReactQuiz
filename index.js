const aws = require('aws-sdk');
// const translateService = new aws.Translate();

exports.handler = async (event) => {
    let lang = 'hi';
    if(event.httpMethod === 'GET'){
        return getRequest(event);
    }
    if(event.httpMethod === 'POST')
    {
        const questionArr = JSON.parse(event.body);
        const translateService = new aws.Translate();
        console.log(`This was passed to the body ${questionArr}`);

        const getTranslation = async(msg, destLang) => {
            const params = {
                Text : msg, 
                SourceLanguageCode : 'en',
                TargetLanguageCode : destLang
            };

            const translatedMsg = await translateService.translateText(params,(err,data)=>{
                return data;
            }).promise()

            return translatedMsg
        }

            // console.log('starting translate');
            // let jsonArray = JSON.parse(event.body);
            // jsonArray = (jsonArray.qBank)   
            // var questions = jsonArray.map(function(o,i){
            //     return o.question;
            // })
        //    let data = new Object();
            // for(key in words)
            // {
            //     const translatedMsg = await getTranslation(words[key], lang)
            //     let translatedText = translatedMsg.TranslatedText
            //     // console.log(translatedText);
            //     data[`${key}`] = translatedText;
            // }
            let questionList = [];
            for(i in questionArr)
            {
                questionList.push(questionArr[i].question);
               console.log(questionArr[i].question);
            }
            
            return {
            statusCode: 200,
            body: JSON.stringify(
                {
                message: questionList
                },
                null,
                2
            ),
            };
     // return postRequest(event);
    }
 };
 
 const getRequest=event=>{
     const list = 'This is get requst';
     return {
         statusCode : 200,
         body : JSON.stringify(list)
     };
 };
 
//  const getTranslation = async (msg, destLang = 'hi') =>{
//      const params = {
//          Text : msg,
//          SourceLanguageCode : 'en',
//          TargetLanguageCode : destLang
//      };

//      const translatedMsg = await translateService.translateText(params,(err,data)=>{
//          return data; 
//      }).promise()

//      return translatedMsg
//  }

//  const postRequest=event=>{
//     const list = JSON.parse(event.body);
//     console.log(`This was passed to the body ${list}`);
//     var str = "";
//     var translatedMsg;
//     for(var key in list)
//     {
//         translatedMsg =  getTranslation(list[key],'hi');
//         console.log(key+","+list[key])
//         let translatedText = translatedMsg.TranslatedText
//         console.log(typeof(translatedText));
//         str = str+","+translatedText;
//     }
//     var data = JSON.stringify(str);
//     return {
//         statusCode :200,
//         body : data
//     };
//  } ;
 