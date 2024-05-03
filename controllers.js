const axios = require('axios');
const { createConfig } = require('./utils');
const nodemailer = require('nodemailer');
const CONSTANTS = require('./constants');
const { google } = require('googleapis');

require('dotenv').config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI,
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function getUser(req, res){
    try{
        const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/profile`;
        const { token } = await oAuth2Client.getAccessToken();
        const config = createConfig(url, token);
        const response = await axios(config);
        res.json(response.data);
    }
    catch(err){
        console.log(err);
        res.send(err);        
    }
} 

async function getMails(req, res) {
    try{
        const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/threads?maxResults=100`;
        const { token } = await oAuth2Client.getAccessToken();
        const config = createConfig(url, token);
        const response = await axios(config);
        res.json(response.data);
    }
    catch(error){
        console.log(error);
        res.send(error);
    }
}

async function getDrafts(req, res) {
    try{
        const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/drafts`;
        const { token } = await oAuth2Client.getAccessToken();
        const config = createConfig(url, token);
        const response = await axios(config);
        res.json(response.data);
    }
    catch(error){
        console.log(error);
        res.send(error);
    }
}

async function readMail(req, res) {
    try{
        const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/messages/${req.params.messageId}`;
        const { token } = await oAuth2Client.getAccessToken();
        const config = createConfig(url, token);
        const response = await axios(config);
        
        let data = await response.data;
        res.json(data);
    }
    catch(error){
        console.log(error);
        res.send(error);
    }
}

module.exports = {
    getUser,
    getMails,
    getDrafts,
    readMail,
};