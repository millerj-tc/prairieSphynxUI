// load existing submission, if any
// display leaderboard
// allow player to choose from their collection
// warn if submission within the last 24 hours and do not submit
// push submission to firebase with timestamp
// retrieve top 10 submissions by win rate (ties broken by earliest submission time)
// run each match, pausing between w/"continue" button to keep going
// adjust win rates
// some kind of overall tournament result message
// adjust leaderboard

//firebase scenario structure:
//gag101scenarios
//-scenario name
//--leaderboard
//---username
//---team
//----member01,etc.
//--submissions
//---submission
//----timestamp
//----username
//----team
//-----member01,etc.