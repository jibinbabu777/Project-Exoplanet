const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];
function isHabitablePlanets(planet){
    return planet['koi_disposition']=='CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6
}

fs.createReadStream('exoplanet.csv')
.pipe(parse({
    comment: '#',
    columns: true
}))
.on('data', (data)=>{
    if(isHabitablePlanets(data)){
        habitablePlanets.push(data);
    }

})
.on('error',(error)=>{
    console.log(error);
})
.on('end',()=>{
    console.log(`Total habitable planet found is ${habitablePlanets.length}`)
    console.log("Done!")
})