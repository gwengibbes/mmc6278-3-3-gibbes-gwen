require('dotenv').config()
const express = require('express')
// TODO: import the getCityInfo and getJobs functions from util.js
const {getJobs, getCityInfo} = require('./util')

const app = express()

// TODO: declare the GET route /api/city/:city
app.get('/api/city/:city', async (req, res)=>{

    const city = req.params.city;
    
    // This endpoint should call getCityInfo and getJobs and return the result as JSON.
    const cityInfo = await getCityInfo(city);
    const jobs = getJobs(city);

    // If no city info or jobs are found, the endpoint should return a 404 status
    if (!cityInfo || jobs === {}){
        return res.status(404).send({error: 'No results found'})
    } 
    
    // The returned JSON object should have two keys:
    // cityInfo (with value of the getCityInfo function)
    // jobs (with value of the getJobs function)
    res.json({
        cityInfo,
        jobs
    });

})

// TODO: Statically serve the public folder
app.use(express.static('public'))

module.exports = app
