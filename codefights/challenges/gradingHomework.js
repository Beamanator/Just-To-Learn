// Name: gradingHomework
// URL: https://codefights.com/challenge/Jbv9PFmPbKD2MYgy8
gradingHomework = q => {
    let t = 0;
    
    for (let i of question) {
        let q = i[0];
        
        let y = +q.split('=')[0], r = q.split('=')[1];
        let m = +r.split('x')[0], b = +r.split('x')[1];
    
        if ((y-b)/m === +i[1]) t+=100;
    }
    
    return Math.round(t*1000/question.length)/1000;
}
