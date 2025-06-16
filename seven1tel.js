const axios = require('axios');
const cheerio = require('cheerio');

async function fetchOtp(username, password) {
    try {
        const loginUrl = 'http://94.23.120.156/ints/client/';
        const dashboardUrl = 'http://94.23.120.156/ints/client/SMSDashboard#';

        const session = axios.create({ withCredentials: true });

        await session.post(loginUrl, `username=${username}&password=${password}`, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const response = await session.get(dashboardUrl);
        const $ = cheerio.load(response.data);
        
        const rows = $('tr');
        const latest = rows.eq(1).find('td');

        const number = latest.eq(1).text().trim();
        const service = latest.eq(2).text().trim();
        const code = latest.eq(3).text().trim();
        const message = latest.eq(4).text().trim();
        const time = new Date().toISOString().replace('T', ' ').substring(0, 19);

        return { number, service, code, message, time };
    } catch (err) {
        console.error('Failed to fetch OTP:', err.message);
        return null;
    }
}

module.exports = fetchOtp;