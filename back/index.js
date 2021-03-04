const { google } = require('googleapis');

const { OAuth2 } = google.auth;


const oAuth2Client = new OAuth2('996490370597-qg1if6r94dfgcikrdq2imabd747cufdd.apps.googleusercontent.com', 'upBzsDL5d9ID3W95l-LOaXnK')

oAuth2Client.setCredentials({ refresh_token: '1//04m0f4JhSimhTCgYIARAAGAQSNwF-L9IrVgshHEekObXTsS9dr4GPRoi60EHqUNMvSqMehZh7M35BILk-halBmqXXspyZcqvMXtY' });

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

const eventStartTime = new Date();
eventStartTime.setDate(eventStartTime.getDate() + 2);

const eventEndTime = new Date();
eventEndTime.setDate(eventEndTime.getDate() + 2);
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);

const event = {
    summary: 'Meet with Yuliana to have some fun',
    location: '10 Arlington Ave, Clifton, NJ 07011',
    description: 'Meeting with Yuliana to talk about new project and how to add google calendar API',
    start: {
        dateTime: eventStartTime,
        timeZine: 'America/New_York'
    },
    end: {
        dateTime: eventEndTime,
        timeZine: 'America/New_York'
    },
    colorId: 1
}

calendar.freebusy.query({
    resource: {
        timeMin: eventStartTime,
        timeMax: eventEndTime,
        timeZine: 'America/New_York',
        items: [{ id: 'primary' }]
    }
}, (err, res) => {
    if(err) return console.error('Free Busy Query Error: ', err)
    const eventsArray = res.data.calendars.primary.busy;
    if(eventsArray.length === 0) return calendar.events.insert({
        calendarId: 'primary',
        resource: event
    }, (err)=>{
        if(err) return console.error('Calendar Event Creation Error: ', err)
        return console.log('Calendar Event Created. ');
    })
    return console.log('Sorry Im Busy');
});
